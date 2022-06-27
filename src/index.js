
import handleRouter from './handleRouter'
import routerListener from './routerListener'
export { default as registerMicroApps } from './register'


export const start = () => {
  /**
   * 匹配到 activeRule ，获取entry ,渲染到对应的container
   * 1. 监听路由改变
   */
  routerListener()
  
  handleRouter()
}