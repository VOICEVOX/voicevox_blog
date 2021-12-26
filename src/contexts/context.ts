import React from "react"

export interface DownloadModalContextProps {
  showing: boolean
  show: () => void
  hide: () => void
}

export const DownloadModalContext =
  React.createContext<DownloadModalContextProps>({
    showing: false,
    show: () => {},
    hide: () => {},
  })
