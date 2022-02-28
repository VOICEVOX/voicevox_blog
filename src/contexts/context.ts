import React from "react"
import { CharacterKey } from "../types/dormitoryCharacter"

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

export interface CharacterContextProps {
  characterKeys: CharacterKey[]
  characterInfos: {
    [key in CharacterKey]: {
      name: string
      policyUrl: string | undefined
    }
  }
}

export const CharacterContext = React.createContext<CharacterContextProps>({
  characterKeys: [
    "四国めたん",
    "ずんだもん",
    "春日部つむぎ",
    "雨晴はう",
    "波音リツ",
    "玄野武宏",
    "白上虎太郎",
    "青山龍星",
    "冥鳴ひまり",
  ],
  characterInfos: {
    四国めたん: {
      name: "四国めたん",
      policyUrl: "https://zunko.jp/con_ongen_kiyaku.html",
    },
    ずんだもん: {
      name: "ずんだもん",
      policyUrl: "https://zunko.jp/con_ongen_kiyaku.html",
    },
    春日部つむぎ: {
      name: "春日部つむぎ",
      policyUrl:
        "https://tsukushinyoki10.wixsite.com/ktsumugiofficial/利用規約",
    },
    雨晴はう: {
      name: "雨晴はう",
      policyUrl: "https://amehau.com/?page_id=225",
    },
    波音リツ: {
      name: "波音リツ",
      policyUrl: "http://canon-voice.com/kiyaku.html",
    },
    玄野武宏: {
      name: "玄野武宏",
      policyUrl:
        "https://virvoxproject.wixsite.com/official/voicevoxの利用規約",
    },
    白上虎太郎: {
      name: "白上虎太郎",
      policyUrl:
        "https://virvoxproject.wixsite.com/official/voicevoxの利用規約",
    },
    青山龍星: {
      name: "青山龍星",
      policyUrl:
        "https://virvoxproject.wixsite.com/official/voicevoxの利用規約",
    },
    冥鳴ひまり: {
      name: "冥鳴ひまり",
      policyUrl: "https://kotoran8zunzun.wixsite.com/my-site/利用規約",
    },
  },
})
