import handleRouter from "./handleRouter"

const routerListener = () => {
  const { pushState, replaceState } = window.history
  // history.go history.back history.forward 使用 popstate
  window.addEventListener('popstate', () => {
    handleRouter()
  })

  // pushState
  window.history.pushState = (... args) => {
    pushState.apply(window.history, args)
    handleRouter()
  }

  // replaceState
  window.history.replaceState = (... args) => {
    replaceState.apply(window.history, args)
    handleRouter()
  }
}
export default routerListener