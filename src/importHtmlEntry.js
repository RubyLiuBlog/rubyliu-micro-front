import { fetchResource } from "./util"

const importHtmlEntry = async (url) => {
  const html = await fetchResource(url)
  const template = document.createElement('div')
  template.innerHTML = html
  /**
   * 获取所有的script 标签代码
   */
  function getExternalScripts () {
    const scripts = template.querySelectorAll('script') || []
    return Promise.all(Array.from(scripts).map(script => {
      const src = script.getAttribute('src')
      if(!src) {
        return Promise.resolve(script.innerHTML)
      } else {
        return fetchResource(src.startsWith('http') ? src : `${url}${src}`)
      }
    }))
  }
  /**
   * 获取并执行执行所有script 标签代码
   */
  async function execScripts () {
    const codes = await getExternalScripts()
    const eval2 = eval
    codes.forEach(code => {
      eval2(code)
    })
  }
  return {
    template,
    getExternalScripts,
    execScripts
  }
}
export default importHtmlEntry
