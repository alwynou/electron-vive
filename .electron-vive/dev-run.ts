import { createServer } from "vite"
import { PACKAGES_DIR, ROOT_DIR } from "./utils"
import { join } from "node:path"
import pic from "picocolors"
const devPort =  8990
function mainRun() {

}
async function rendererRun() {
  const server = await createServer({
    root: join(PACKAGES_DIR, 'renderer'),
    configFile: join(ROOT_DIR, './.electron-vive/vite.renderer.config.ts')
  })

  await server.listen(devPort)

  console.log(`\n  ${pic.green(`${pic.bold('ELECTRON-VIVE-SERVER')}`)}\n`)

  return server
}


async function run() {
  const startTime = performance.now()
  Promise.all([
    rendererRun()
  ]).then(([server]) => {
    console.log(`start..:${performance.now() - startTime} ms`)
    server.printUrls()
  }).catch(e => {
    console.error(e)
    process.exit(0)
  })
}

run()
