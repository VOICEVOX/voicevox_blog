import { useState } from "react"

export const useModalController = () => {
  const [showing, setShowing] = useState(false)
  const show = () => {
    setShowing(true)
  }
  const hide = () => {
    setShowing(false)
  }

  return { showing, show, hide }
}
