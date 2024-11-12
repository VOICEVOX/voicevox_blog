import type { CharacterInfo } from "./type";
import type { CharacterKey } from "./characterEntry";

import shikoku_metan_info from "./characterInfos/shikoku_metan";
import zundamon_info from "./characterInfos/zundamon";
import kasukabe_tsumugi_info from "./characterInfos/kasukabe_tsumugi";
import amehare_hau_info from "./characterInfos/amehare_hau";
import namine_ritsu_info from "./characterInfos/namine_ritsu";
import kurono_takehiro_info from "./characterInfos/kurono_takehiro";
import shirakami_kotarou_info from "./characterInfos/shirakami_kotarou";
import aoyama_ryusei_info from "./characterInfos/aoyama_ryusei";
import meimei_himari_info from "./characterInfos/meimei_himari";
import kyushu_sora_info from "./characterInfos/kyushu_sora";
import mochikosan_info from "./characterInfos/mochikosan";
import kenzaki_mesuo_info from "./characterInfos/kenzaki_mesuo";
import white_cul_info from "./characterInfos/white_cul";
import goki_info from "./characterInfos/goki";
import number_seven_info from "./characterInfos/number_seven";
import chibishikiji_info from "./characterInfos/chibishikiji";
import ouka_miko_info from "./characterInfos/ouka_miko";
import sayo_info from "./characterInfos/sayo";
import nurserobo_typet_info from "./characterInfos/nurserobo_typet";
import horinaito_benizakura_info from "./characterInfos/horinaito_benizakura";
import wakamatsu_akashi_info from "./characterInfos/wakamatsu_akashi";
import kigashima_sourin_info from "./characterInfos/kigashima_sourin";
import haruka_nana_info from "./characterInfos/haruka_nana";
import nekotsuka_aru_info from "./characterInfos/nekotsuka_aru";
import nekotsuka_bi_info from "./characterInfos/nekotsuka_bi";
import chugoku_usagi_info from "./characterInfos/chugoku_usagi";
import kurita_maron_info from "./characterInfos/kurita_maron";
import aierutan_info from "./characterInfos/aierutan";
import manbetsu_hanamaru_info from "./characterInfos/manbetsu_hanamaru";
import kotoyomi_nia_info from "./characterInfos/kotoyomi_nia";
import voidoll_info from "./characterInfos/voidoll";

export const characterInfos = {
  四国めたん: shikoku_metan_info,
  ずんだもん: zundamon_info,
  春日部つむぎ: kasukabe_tsumugi_info,
  雨晴はう: amehare_hau_info,
  波音リツ: namine_ritsu_info,
  玄野武宏: kurono_takehiro_info,
  白上虎太郎: shirakami_kotarou_info,
  青山龍星: aoyama_ryusei_info,
  冥鳴ひまり: meimei_himari_info,
  九州そら: kyushu_sora_info,
  モチノキョウコ: mochikosan_info,
  剣崎雌雄: kenzaki_mesuo_info,
  WhiteCUL: white_cul_info,
  後鬼: goki_info,
  No7: number_seven_info,
  ちび式じい: chibishikiji_info,
  櫻歌ミコ: ouka_miko_info,
  小夜_SAYO: sayo_info,
  ナースロボ＿タイプＴ: nurserobo_typet_info,
  聖騎士紅桜: horinaito_benizakura_info,
  雀松朱司: wakamatsu_akashi_info,
  麒ヶ島宗麟: kigashima_sourin_info,
  春歌ナナ: haruka_nana_info,
  猫使アル: nekotsuka_aru_info,
  猫使ビィ: nekotsuka_bi_info,
  中国うさぎ: chugoku_usagi_info,
  栗田まろん: kurita_maron_info,
  藍田ノエル: aierutan_info,
  満別花丸: manbetsu_hanamaru_info,
  琴詠ニア: kotoyomi_nia_info,
  Voidoll: voidoll_info,
} as const satisfies {
  [key in CharacterKey]: CharacterInfo;
};
