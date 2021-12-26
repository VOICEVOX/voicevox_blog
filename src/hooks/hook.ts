import { useState } from "react"

export const useModalController = () => {
  const [showing, setShowing] = useState(false)
  const show = () => {
    document.documentElement.classList.add("is-clipped")
    setShowing(true)
  }
  const hide = () => {
    document.documentElement.classList.remove("is-clipped")
    setShowing(false)
  }

  return { showing, show, hide }
}
