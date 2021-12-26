import React from "react"

export interface GlobalContextProps {
  sendEvent: (event: string, eventCategory: string) => void
  downloadModal: {
    showing: boolean
    show: () => void
    hide: () => void
  }
}

export const GlobalContext = React.createContext<GlobalContextProps>({
  sendEvent: (event: string, eventCategory: string) => {
    typeof window !== "undefined" &&
      window.gtag &&
      window.gtag("event", event, { event_category: eventCategory })
  },
  downloadModal: {
    showing: false,
    show: () => {},
    hide: () => {},
  },
})
