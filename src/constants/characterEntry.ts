export const characterKeys = [
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
  "ちび式じい",
  "櫻歌ミコ",
  "小夜_SAYO",
  "ナースロボ＿タイプＴ",
  "聖騎士紅桜",
  "雀松朱司",
  "麒ヶ島宗麟",
  "春歌ナナ",
  "猫使アル",
  "猫使ビィ",
  "中国うさぎ",
  "栗田まろん",
  "藍田ノエル",
  "満別花丸",
  "琴詠ニア",
  "Voidoll",
  "ぞん子",
  "中部つるぎ",
  "離途",
  "黒沢冴白",
  "ユーレイちゃん",
  "東北ずん子",
  "東北きりたん",
  "東北イタコ",
] as const;

export type CharacterKey = (typeof characterKeys)[number];

export type CharacterEntry = {
  name: string;
  id: string;
};

export const characterEntries = {
  四国めたん: {
    name: "四国めたん",
    id: "shikoku_metan",
  },
  ずんだもん: {
    name: "ずんだもん",
    id: "zundamon",
  },
  春日部つむぎ: {
    name: "春日部つむぎ",
    id: "kasukabe_tsumugi",
  },
  雨晴はう: {
    name: "雨晴はう",
    id: "amehare_hau",
  },
  波音リツ: {
    name: "波音リツ",
    id: "namine_ritsu",
  },
  玄野武宏: {
    name: "玄野武宏",
    id: "kurono_takehiro",
  },
  白上虎太郎: {
    name: "白上虎太郎",
    id: "shirakami_kotarou",
  },
  青山龍星: {
    name: "青山龍星",
    id: "aoyama_ryusei",
  },
  冥鳴ひまり: {
    name: "冥鳴ひまり",
    id: "meimei_himari",
  },
  九州そら: {
    name: "九州そら",
    id: "kyushu_sora",
  },
  モチノキョウコ: {
    name: "もち子さん",
    id: "mochikosan",
  },
  剣崎雌雄: {
    name: "剣崎雌雄",
    id: "kenzaki_mesuo",
  },
  WhiteCUL: {
    name: "WhiteCUL",
    id: "white_cul",
  },
  後鬼: {
    name: "後鬼",
    id: "goki",
  },
  No7: {
    name: "No.7",
    id: "number_seven",
  },
  ちび式じい: {
    name: "ちび式じい",
    id: "chibishikiji",
  },
  櫻歌ミコ: {
    name: "櫻歌ミコ",
    id: "ouka_miko",
  },
  小夜_SAYO: {
    name: "小夜/SAYO",
    id: "sayo",
  },
  ナースロボ＿タイプＴ: {
    name: "ナースロボ＿タイプＴ",
    id: "nurserobo_typet",
  },
  聖騎士紅桜: {
    name: "†聖騎士 紅桜†",
    id: "horinaito_benizakura",
  },
  雀松朱司: {
    name: "雀松朱司",
    id: "wakamatsu_akashi",
  },
  麒ヶ島宗麟: {
    name: "麒ヶ島宗麟",
    id: "kigashima_sourin",
  },
  春歌ナナ: {
    name: "春歌ナナ",
    id: "haruka_nana",
  },
  猫使アル: {
    name: "猫使アル",
    id: "nekotsuka_aru",
  },
  猫使ビィ: {
    name: "猫使ビィ",
    id: "nekotsuka_bi",
  },
  中国うさぎ: {
    name: "中国うさぎ",
    id: "chugoku_usagi",
  },
  栗田まろん: {
    name: "栗田まろん",
    id: "kurita_maron",
  },
  藍田ノエル: {
    name: "あいえるたん",
    id: "aierutan",
  },
  満別花丸: {
    name: "満別花丸",
    id: "manbetsu_hanamaru",
  },
  琴詠ニア: {
    name: "琴詠ニア",
    id: "kotoyomi_nia",
  },
  Voidoll: {
    name: "Voidoll",
    id: "voidoll",
  },
  ぞん子: {
    name: "ぞん子",
    id: "zonko",
  },
  中部つるぎ: {
    name: "中部つるぎ",
    id: "chubu_tsurugi",
  },
  離途: {
    name: "離途",
    id: "rito",
  },
  黒沢冴白: {
    name: "黒沢冴白",
    id: "kurosawa_kohaku",
  },
  ユーレイちゃん: {
    name: "ユーレイちゃん",
    id: "yureichan",
  },
  東北ずん子: {
    name: "東北ずん子",
    id: "tohoku_zunko",
  },
  東北きりたん: {
    name: "東北きりたん",
    id: "tohoku_kiritan",
  },
  東北イタコ: {
    name: "東北イタコ",
    id: "tohoku_itako",
  },
} as const satisfies {
  [key in CharacterKey]: CharacterEntry;
};
