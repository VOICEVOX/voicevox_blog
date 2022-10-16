import React from "react"
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

export const characterKeys: CharacterContextProps["characterKeys"] = [
  "四国めたん",
  "ずんだもん",
  "春日部つむぎ",
  "雨晴はう",
  "波音リツ",
  "玄野武宏",
  "白上虎太郎",
  "青山龍星",
  "冥鳴ひまり",
  "九州そら",
  "モチノキョウコ",
  "剣崎雌雄",
  "WhiteCUL",
  "後鬼",
  "No7",
]

export const characterInfos: CharacterContextProps["characterInfos"] = {
  四国めたん: {
    name: "四国めたん",
    id: "shikoku_metan",
    policyUrl: "https://zunko.jp/con_ongen_kiyaku.html",
  },
  ずんだもん: {
    name: "ずんだもん",
    id: "zundamon",
    policyUrl: "https://zunko.jp/con_ongen_kiyaku.html",
  },
  春日部つむぎ: {
    name: "春日部つむぎ",
    id: "kasukabe_tsumugi",
    policyUrl: "https://tsumugi-official.studio.site/rule",
  },
  雨晴はう: {
    name: "雨晴はう",
    id: "amehare_hau",
    policyUrl: "https://amehau.com/?page_id=225",
  },
  波音リツ: {
    name: "波音リツ",
    id: "namine_ritsu",
    policyUrl: "http://canon-voice.com/kiyaku.html",
  },
  玄野武宏: {
    name: "玄野武宏",
    id: "kurono_takehiro",
    policyUrl: "https://virvoxproject.wixsite.com/official/voicevoxの利用規約",
  },
  白上虎太郎: {
    name: "白上虎太郎",
    id: "shirakami_kotaro",
    policyUrl: "https://virvoxproject.wixsite.com/official/voicevoxの利用規約",
  },
  青山龍星: {
    name: "青山龍星",
    id: "aoyama_ryusei",
    policyUrl: "https://virvoxproject.wixsite.com/official/voicevoxの利用規約",
  },
  冥鳴ひまり: {
    name: "冥鳴ひまり",
    id: "meimei_himari",
    policyUrl: "https://meimeihimari.wixsite.com/himari/terms-of-use",
  },
  九州そら: {
    name: "九州そら",
    id: "kyushu_sora",
    policyUrl: "https://zunko.jp/con_ongen_kiyaku.html",
  },
  モチノキョウコ: {
    name: "もち子さん",
    id: "mochikosan",
    policyUrl: "https://vtubermochio.wixsite.com/mochizora/利用規約",
  },
  剣崎雌雄: {
    name: "剣崎雌雄",
    id: "kenzaki_mesuo",
    policyUrl: "https://frontier.creatia.cc/fanclubs/413/posts/4507",
  },
  WhiteCUL: {
    name: "WhiteCUL",
    id: "white_cul",
    policyUrl: "https://www.whitecul.com/guideline",
  },
  後鬼: {
    name: "後鬼",
    id: "goki",
    policyUrl: "https://ついなちゃん.com/voicevox_terms/",
  },
  No7: {
    name: "No.7",
    id: "number_seven",
    policyUrl: "https://voiceseven.com/#j0400",
  },
}

export const CharacterContext = React.createContext<CharacterContextProps>({
  characterKeys,
  characterInfos,
})
