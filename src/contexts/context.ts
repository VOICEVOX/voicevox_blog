import React from "react"
import { characterInfos, characterKeys } from "../constants"
import { CharacterKey } from "../types/dormitoryCharacter"

export interface GlobalContextProps {
  sendEvent: (event: string, eventCategory: string) => void
  downloadModal: {
    showing: boolean
    show: () => void
    hide: () => void
  }
  experiments: boolean
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
  experiments: process.env.GATSBY_VOICEVOX_EXPERIMENTS === "true",
})

export interface CharacterContextProps {
  characterKeys: CharacterKey[]
  characterInfos: {
    [key in CharacterKey]: {
      name: string
      id: string
      policyUrl: string | undefined
    }
  }
}

export const CharacterContext = React.createContext<CharacterContextProps>({
  characterKeys,
  characterInfos,
})
