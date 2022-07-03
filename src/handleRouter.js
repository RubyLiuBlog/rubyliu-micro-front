import importHtmlEntry from "./importHtmlEntry"
import { getAppArray } from "./register"
import { getNextRouter, getPrevRouter } from "./routerListener"

const handleRouter = async () => {
  // 2. 匹配子应用
  const appList = getAppArray()

  const prevApp = appList.find(item => getPrevRouter().startsWith(item.activeRule))
  const currentApp = appList.find(item => getNextRouter().startsWith(item.activeRule))
  // 卸载上一个应用
  if(prevApp){
    await unmount(prevApp)
  }
  // 加载下一个应用
  if(!currentApp) { return }
  // 3. 加载子应用
  const container = document.querySelector(currentApp.container)
  const {template, getExternalScripts, execScripts} = await importHtmlEntry(currentApp.entry)
  container.appendChild(template)

  // 配置全局环境变量
  window.__POWERED_BY_QIANKUN__ = true;
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = currentApp.entry;

  await execScripts()
  const exportApp = window[currentApp.name]

  currentApp.bootstrap = exportApp.bootstrap
  currentApp.mount = exportApp.mount
  currentApp.unmount = exportApp.unmount
 
  // 4. 渲染子应用
  bootstrap(currentApp)
  mount(currentApp)
}

async function bootstrap(app) {
  app.bootstrap && await app.bootstrap
}
async function mount(app) {
  app.mount && await app.mount({
    container: document.querySelector(app.container)
  })
}
async function unmount(app) {
  const container = document.querySelector(app.container)
  app.unmount && await app.unmount({
    container: document.querySelector(app.container)
  })
}
export default handleRouter