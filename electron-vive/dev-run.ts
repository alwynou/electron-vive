import { join } from 'node:path'
import type { ChildProcess } from 'node:child_process'
import { spawn } from 'node:child_process'
import { build, createServer } from 'vite'
import pic from 'picocolors'
import type { Colors } from 'picocolors/types'
import type { RollupWatcher } from 'rollup'
import { DEV_SERVER_PORT, DIST_DIR, ROOT_DIR, SRC_DIR } from './helper'

let manualRestart = false
let electronProcess: ChildProcess | null
async function mainRun() {
  const ret = await build({
    configFile: join(ROOT_DIR, './electron-vive/vite.main.config.ts'),
    mode: 'development',
    build: {
      minify: false,
      watch: {},
    },
  })
    ; (ret as unknown as RollupWatcher).on('change', () => {
    if (electronProcess) {
      manualRestart = true
      process.kill(electronProcess.pid!)
      electronProcess = null
      startElectron()
      setTimeout(() => {
        manualRestart = false
      }, 5000)
    }
  })
}

async function rendererRun() {
  const server = await createServer({
    root: join(SRC_DIR, 'renderer'),
    configFile: join(ROOT_DIR, './electron-vive/vite.renderer.config.ts'),
  })
  await server.listen(DEV_SERVER_PORT)
  // console.log(`\n  ${pic.green(`${pic.bold('ELECTRON-VIVE-SERVER')}`)}\n`)
  // console.log(`renderer 用时: ${Math.ceil(performance.now() - startTime)} ms\n`)
  return server
}
function startElectron() {
  electronProcess = spawn('electron', [
    // '--inspect=5858',
    // '--remote-debugging-port=8315',
    // '--nolazy',
    join(DIST_DIR, 'electron/index.js'),
  ])

  electronProcess.stdout!.on('data', (data) => {
    electronLog(data, 'blue')
  })
  electronProcess.stderr!.on('data', (data) => {
    electronLog(data, 'red')
  })

  electronProcess.on('close', () => {
    if (!manualRestart)
      process.exit()
  })
}

function electronLog(data: any, color: keyof Colors) {
  let log = ''
  data = data.toString().split(/\r?\n/)
  data.forEach((line: any) => {
    log += `  ${line}\n`
  })
  if (/[0-9A-z]+/.test(log)) {
    // eslint-disable-next-line no-console
    console.log(
      `${pic.bold((pic[color] as any)('┏ Electron -------------------'))
      }\n\n${log
      }${pic.bold((pic[color] as any)('┗ ----------------------------'))
      }\n`,
    )
  }
}

async function run() {
  Promise.all([
    rendererRun(),
    mainRun(),
  ]).then(() => {
    startElectron()
  }).catch((e) => {
    console.error(e)
    process.exit(0)
  })
}

run()
