import handleRouter from "./handleRouter"

let prevRouter = '' // 上一个路由
let nextRouter = window.location.pathname //下一个路由

export const getPrevRouter = () => prevRouter
export const getNextRouter = () => nextRouter

const routerListener = () => {
  const { pushState, replaceState } = window.history
  // history.go history.back history.forward 使用 popstate
  window.addEventListener('popstate', () => {
    handleRouter()
    prevRouter = nextRouter
    nextRouter = window.location.pathname
  })

  // pushState
  window.history.pushState = (... args) => {
    prevRouter = window.location.pathname
    pushState.apply(window.history, args)
    nextRouter = window.location.pathname
    handleRouter()
  }

  // replaceState
  window.history.replaceState = (... args) => {
    prevRouter = window.location.pathname
    replaceState.apply(window.history, args)
    nextRouter = window.location.pathname
    handleRouter()
  }
}
export default routerListener