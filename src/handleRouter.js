import importHtmlEntry from "./importHtmlEntry"
import { getAppArray } from "./register"

const handleRouter = async () => {
  const currentPath = window.location.pathname
  // 2. 匹配子应用
  const appList = getAppArray()
  const currentApp = appList.find(item => currentPath.startsWith(item.activeRule))

  if(!currentApp) { return }
  // 3. 加载子应用
  const html = await fetch(currentApp.entry).then(res => res.text())
  const container = document.querySelector(currentApp.container)
  console.log(container)

  container.innerHTML = html

  // 3.1 加载html
  importHtmlEntry(currentApp.entry)



  // 4. 渲染子应用
}
export default handleRouter