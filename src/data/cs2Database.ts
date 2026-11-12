import {
  CaseContainer,
  CS2RankInfo,
  DailyCareReward,
  InventoryItem,
  MarketTrendInfo,
  PremierRatingInfo,
  QuestItem,
  RARITIES,
  RarityKey,
  SkinTemplate,
  WearShort,
} from '../types/cs2';

const STEAM_CDN = 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocG';
function u(path: string): string {
  return path.startsWith('@') ? STEAM_CDN + path.slice(1) : path;
}
function s(id: string, weapon: string, name: string, rarity: RarityKey, basePrice: number, img: string, isSticker = false): SkinTemplate {
  return { id, weapon, name, rarity, basePrice, image: u(img), isSticker };
}

export const TOURNAMENT_STICKERS = [{"name":"Natus Vincere | Copenhagen 2024","image":u("@Jai0ki7VeTHjMmxPSnHtwI6-obi4xe_F0SpycTm_3NfuauvafFpIfHBXmTImLoj5bVtSSqxkxx04GzQn9esbzvJOV84pacW")},{"name":"Virtus.pro | Copenhagen 2024","image":u("@Jai0ki7VeTHjMmxPSnHtwI64pe6ugvkFUWgnc6xrnsKuKP9bPNscqjFDzHHlu90sbM5TX2wxkp14WTUnMHpLyyrjSYF-g")},{"name":"G2 Esports | Copenhagen 2024","image":u("@Jai0ki7VeTHjMmxPSnHtwI689W6vwzjRU3zzZW4rncCuPf_OvY_I6KRX2HEwO0ltuQ8GS_gxUt_4juAnsHpLyxV8rB6kA")},{"name":"FaZe Clan | Copenhagen 2024","image":u("@Jai0ki7VeTHjMmxPSnHtwI68obu7xfjQB7zyMLlqHRdvPSsMaY5I6fDXjLFk-8ls7Y_HH7jlksl4jjcztqhbzvJOdEYnDi_")},{"name":"Team Spirit | Copenhagen 2024","image":u("@Jai0ki7VeTHjMmxPSnHtwI655f9-BflEhimnc_i_nID7KD9MPVsIfPBCDCTlLly5LRoTirnzRxx4WzSyt36bzvJOfPBN-a5")},{"name":"Vitality | Copenhagen 2024","image":u("@Jai0ki7VeTHjMmxPSnHtwI64o7g6xeyFET3n5Dm_yEDuqqvPPdrcPPCVjfHxblw4LZsH33rxEtz4WrWztehbzvJOfadTm_6")},{"name":"MOUZ | Copenhagen 2024","image":u("@Jai0ki7VeTHjMmxPSnHtwI6-Yjh8Be0Eh6in8WypHtevaf9PfNsJqPECjLGl-wh57doG3_hk05wsGXRyIqhbzvJOX5ask-j")},{"name":"Complexity Gaming | Copenhagen 2024","image":u("@Jai0ki7VeTHjMmxPSnHtwI695f48he3EEr1yJKxqHECt_esaqU9JaTHDDTHwr8vtbk-GHznlx525GTTw9_8bzvJOSvtUTwO")},{"name":"PGL | Copenhagen 2024","image":u("@Jai0ki7VeTHjMmxPSnHtwI65ID4pFrhR0ilx5C5rXoI6aX4aqZpcfWSVmbAk7l0trE_GHjiwx9-5zjUn4q3MSXAPkkBAAI")},{"name":"Natus Vincere (Glitter) | Copenhagen 2024","image":u("@Jai0ki7VeTHjMmxPSnHtwI6-obi42bgTRTlipPys3YKuqKrO6c6cPGSDDLGxbcm4eRqGiuxxUsh522BztmuJH-QaQ8hCcNuBblds-7MWqE")}];

export const INITIAL_CASES: CaseContainer[] = [
  // ==================== BLACK MARKET CUSTOM CASES ====================
  {
    "id": "case_bm_knives",
    "name": "★ Только Ножи (Knife Only)",
    "subtitle": "Гарантированный редкий нож CS2: Керамбиты, Бабочки, M9",
    "category": "black_market",
    "price": 149.99,
    "accentColor": "#FFD700",
    "badgeTag": "100% НОЖ",
    "customChances": { "gold": 100 },
    "image": u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnEVvqf_a6VoIfGSXz7Hlbwg57QwSS_mxhl15jiGyN37c3_GZw91W8BwRflK7EfKsa2sfw"),
    "items": [
      s("skin-vanilla-weapon_knife_kukri","★ Kukri Knife","Classic","gold",219.97,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2lfa9_Kb6VXmPGwuogsbNvSyi3zR4jsTnQztyqdS6QP1IoXpoiEeAC5Be5l9CxKaq8sIvgdE5J"),
      s("skin-6dbefc59c1b9","★ Kukri Knife","Fade","gold",252.98,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsIc-VD2OV_uJ_t-l9AXyyzEohsGvVn4moIi-VO1N2CJR1E-UD4BXtkIXhMe2x7lbej4tEnyzgznQeN9c5PgA"),
      s("skin-0808024a639a","★ Kukri Knife","Slaughter","gold",233.6,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsLc-JC2WCwNF6ueZhW2fmwkwj62TWmdyuc3nEOFB1Csd5ReFZtUTpxtXvYb_k4waPj4wXxXitkGoXuVwivb-T"),
      s("skin-bc9e87f3c013","★ Kukri Knife","Blue Steel","gold",252.72,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsMc-RAnKVxdF6ueZhW2exzE0h62nVyd6qeXjEbgF0X8EiEbZesRS_wIXkPujq7wPWjNpDyn6vkGoXudm1ivk1"),
      s("skin-d1ab66316ff3","★ Kukri Knife","Stained","gold",180.52,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsMc-VAXWTxOpJvOhuRz39lkgl52TXzdiscH2TOgAkX8QiRuFftxW6kNW1Yrzr7wOK2YkWxXr43zQJsHia9a0bCA"),
      s("skin-bd871a344e30","★ Bowie Knife","Gamma Doppler","gold",187.67,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5sQiyhlBEjjDCEiI31JCLdO1JPVssnHaMU4EG-ltyyPuLq5gHYj9lMzyz7hyxNuCs-5OoDVKImrKTe21mXZ-Zu5I5Deqhh5Zn_hA"),
      s("skin-2c801d044315","★ Bowie Knife","Gamma Doppler","gold",278.08,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5uTiS-lCIjvC2VlorrHjvPP0V1C_0sHLBS9g67l9G0Mu_q5ATZ3t1BxSn6in5B6yc9t7kHBaFw_aPQ3QiTNLQ_ssICOr_5Gko8dFgH"),
      s("skin-e70487f0da3a","★ Bowie Knife","Gamma Doppler","gold",189.63,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5uTiS-lCIjvC2VlorrHjvPP0V1CP0sHLBS9g7tl4fgPujh71CNg91En36si3kY6ns-4OlQWfclqPbQ21zHZbVp4ZdWOr_5GrvoSFRK"),
      s("skin-9143e6d4868c","★ Bowie Knife","Gamma Doppler","gold",304.35,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5uTiS-lCIjvC2VlorrHjvPP0V1Cf0sHLBS9g7sl9WzN-q27gLWiYxDxH3_2y4avyxp575WAvck_aGGjADAYrU6s8EBOr_5Gs3270vO"),
      s("skin-965132fa7c08","★ Bowie Knife","Gamma Doppler","gold",343.86,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5uTiS-lCIjvC2VlorrHjvPP0V1Dv0sHLBS9g6-xoXnNr6xsQze2IxFy377iX4d7itr4ehWA_V0_aPT2VyTMudrs8YLOr_5GgyA1D52"),
      s("skin-vanilla-weapon_knife_outdoor","★ Nomad Knife","Classic","gold",139.65,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2hfbBpL_-BQDPEw-hz57cxTnCxkEh_5jnVzor8dymXbgAiAsFyEOEMsBW8l9O1Ne38p1uJmh0Kkm0"),
      s("skin-47d49e017564","★ Nomad Knife","Fade","gold",120.16,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GSMWGRxetJvOhuRz39wUUksW7Vm4n7d3yUO1InXsdxTeQDukO4l9zuN7_j5QzYjIlFy3n6jDQJsHjNMoy1vA"),
      s("skin-f18965313816","★ Nomad Knife","Crimson Web","gold",169.83,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_iKMXCVw_1JvOhuRz39xEV_sT6Bn9mueX3EP1QjApd4QbZe5EW6wIDmNO7islfW391EzCWt3TQJsHib9FqZhg"),
      s("skin-74f72ddc6769","★ Nomad Knife","Slaughter","gold",75.2,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GeMX2Vw_x3j-1gSCGn20R15TyGnNv_cS3GZlUnA5smTLEM4xDpx4bmY77h51OMiIJNziX53SJXrnE8R49sMsc"),
      s("skin-2f7326c83e40","★ Nomad Knife","Case Hardened","gold",113.95,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GCMWiZzetyj-1gSCGn2xhz5GyHwtr_dS7EOlR1DZtyEe8MsBO-xNKyNbnq7w3b2d8WzC7-jSNXrnE8rdGSE7w"),
      s("skin-vanilla-weapon_knife_gypsy_jackknife","★ Navaja Knife","Classic","gold",102.46,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2pcbR-Oc-ZD2SbyuB_tuQnGXu1kBxw62_dwtird3qXZwQgXJV0E-4PtESxl4ezYr6x4FaMjI4UyzK-0H1iy36efQ"),
      s("skin-39fd7c139081","★ Navaja Knife","Marble Fade","gold",198.29,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWQiihlxEijDuEnorGLSLANkI-DpolR7Vf5hK5kdTlNbiwsg3YiNlCm3mq3Cgd6iZusetRUPJx-qTT2xaBb-MDauzVhA"),
      s("skin-f69247021864","★ Navaja Knife","Tiger Tooth","gold",97.19,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJse9WWyC0kA8YvC-ElIj8HifOOV5kFMMlRLJf4BK4k9LlZuy35QTYg95NzXmri3tB6yk4sO5XBaoh_PDRhgHfcepqTt5nFFY"),
      s("skin-3b5885a4c77d","★ Navaja Knife","Doppler","gold",179.2,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWXTyxjCIqsi-HlorwOy7DAVp5Xco0W-cMsRO5x92yMe3r51Pd3d5Nn3isiy9LvSli5OZRAqYmq6OEiAuQZeIjoc5Uu2hkHeU"),
      s("skin-b790da07f599","★ Navaja Knife","Doppler","gold",216.31,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWXCijhRUuoTi6l47rIyfCN0x1Xv0sHLBS9g6_m4GzMr-xsgOIidhMyC743C1O53ti5ecCWPAmrqeCjg2QNbU06ZBROr_5GjZZEpGb"),
      s("skin-b9e7dc445655","★ Navaja Knife","Fade","gold",247.97,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJseBWSSi3kCIrujqNjsH7c3qVOwV2DcZyQbQOukG5m4CyMeqz4laIgoxAnH_93Ckbvyw5troCT-N7rT3KN2DN"),
      s("skin-8a6e4435f652","★ Navaja Knife","Crimson Web","gold",172.52,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJuPhWWCyxhiIrujqNjsGtJS-eag4iCpN4QrZYsEK_m9K0ZLzl4gOLiYgQxSj2in9Buis_5OZRT-N7rdEUHJYn"),
      s("skin-4facadf19ddb","★ Navaja Knife","Slaughter","gold",118.39,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWVSyxhxwYvzSCkpu3JSjFaQR0WZFwFOFYtBLtl4e2Nrmz4FHci4tAxCT8iipK6yc6sekKUL1lpPNhGLzFnw"),
      s("skin-d3e9d06ca1c0","★ Navaja Knife","Case Hardened","gold",137.84,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsfBWQCC_kBkYvzSCkpu3eHKWaQ8jXpQkReZZtxa_x4HvYujh41HZg9pNzX2ojCJA7itpteYHBb1lpPM10bWGng"),
      s("skin-fcaadd7c92cc","★ Bowie Knife","Marble Fade","gold",237.32,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5kTjuxmRgYtTyBn7D1KCzPKhgpXMdyTeBb5BPuktPvZOi2sgWM2d9HmSr-i3xAuidssO8HBKcsrvLXkUifZhxP_T8X"),
      s("skin-90d3cf089321","★ Bowie Knife","Tiger Tooth","gold",374.73,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vt59Ri62hyIooTyLnYrGLSLANkI-XJJ0FLNY5BOxw4XjNu-zsQDd2IpFyy32jS0b7Ss95L5RVaIk_qyE3RaBb-Pz4OFuTg"),
      s("skin-3ca96a918c35","★ Bowie Knife","Doppler","gold",232.31,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd57WiuqqhAmoT-Jn4bjJC_4Ml93UtZuQe5Y50O-wNzhMuji5w3e344Rny-q3H5K7iZtsekLU6El-6eBi1vHY6p9v8dqQrLELQ"),
      s("skin-dfd71b7017a4","★ Bowie Knife","Doppler","gold",197.24,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd56TjmjnRQ1tgKIm537LS7OJFN0Zc4pEr9OrBaxl4KxNr7r5VHZiYtBzH-qiShJ7y1v4roHAvZ2qfLTjlvDOLw_sMIdZKHwjx9VvzI"),
      s("skin-793b9eb6b4b7","★ Bowie Knife","Doppler","gold",212.17,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5rQyiwng0isi-JpYL4MynLO19qX8YfGb5d6lSmxt2yZeLq5QeI2dgWzSmsjiMauyxr5O4LB6Ej-6PXjVyQZLc54pZRJOHnE0pg4-kgmA"),
      s("skin-9af6c8a5a9c1","★ Bayonet","Gamma Doppler","gold",177.16,"https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJH4dmklYyPqPr1Ibndk2JL7cFOhuDG_Zi73VG2qUQ_am36LNKWcwM2Ml3X_FS8wL3vhMC0vJXOn3ZkuSAl7HiOmwv3308XDHXucw")
    ]
  },
  {
    "id": "case_bm_gloves",
    "name": "★ Только Перчатки (Glove Special)",
    "subtitle": "Sport Gloves, Specialist, Moto и Driver",
    "category": "black_market",
    "price": 119.99,
    "accentColor": "#EAB308",
    "badgeTag": "100% ПЕРЧАТКИ",
    "customChances": { "gold": 100 },
    "image": u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnEVvqf_a6VoIfGSXz7Hlbwg57QwSS_mxhl15jiGyN37c3_GZw91W8BwRflK7EfKsa2sfw"),
    "items": [
      s("skin-7b51c8bd957b","★ Driver Gloves","Imperial Plaid","gold",233.37,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t9LPGaCliA1PxmvORWQyC0nQlp4W-Hw9-ocy2fbwB2X8YkFucCtRe4xNzhYrjl4Fff39lMyn78iiJLuzErvbgqDAMwGQ"),
      s("skin-ead101bfb2c9","★ Driver Gloves","King Snake","gold",213.58,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-LvGYC3SbyOBJp-lgWyyMmRQguynLz4r6Iy7EbFchApNyR-dbtEbuw4XkN7jq7gHdjtoQzi37hiwYvytvt_FCD_Ql24JgJg"),
      s("skin-5e8f5f1fecb1","★ Driver Gloves","Racing Green","gold",205.73,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-NPmHDW-VxdFxouRsQRa0hxg-jDGMnYftb3mXblQnWJclRuNYtETux9DlYr-wtVaK2IsTmCT-jC4Y6ihjtr0FUaA7uvqAQikoKDk"),
      s("skin-56be8a3a2bb8","★ Driver Gloves","Overtake","gold",110.31,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-NPmHDW-VxdF0vOBqRBa8hxwptDi6lob-KT-JOwYkXppzQO4OsRbqltfiMOvm41TYi44XySqqj35OvS4_57oKA6cl_LqX0V9d-bhOMA"),
      s("skin-a4133c8cedcb","★ Hand Wraps","Cobalt Skulls","gold",112.31,"@IGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqhsmsS-MmbD7LT7CAUV7T84sBohW60fg1srnZb6zsw2Ng41MmST43C1L7is9574CBKIh_q2Big_IMOdutcNRd_iuU13QD7PQAmaY"),
      s("skin-ac0c22b15c7c","★ Broken Fang Gloves","Yellow-banded","gold",136.66,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YozKMiYD3Hi3VMVFPWM4hFrxl-0XkzougWLa7sF2alYpAyX__iClA5ntstuoEUqUirKeG2w3IYrZo4JRSLa2vRRvdWhwJsa98BNe077TKBCc"),
      s("skin-27555a08b61e","★ Broken Fang Gloves","Unhinged","gold",171.07,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YoDOEkYrqKiLJAVR8W8ErKrtT5Uj8jNfuN-2wtgeNioNDxS7_jS4av31j5L4CVqV0rvLTigzCNeE5tZkCJqm5DUPZGadTirc"),
      s("skin-a371f5d8dddc","★ Broken Fang Gloves","Needle Point","gold",80.69,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YtTGKiI71HifOOV5kFJQlQbUL4RHukofjY-227wDaidpHnCqs3H5K6So95ekLVKck__bW3Q_fcepqSI673wM"),
      s("skin-82516a2fa315","★ Broken Fang Gloves","Jade","gold",184.96,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YvjiRm4PwIhTALFN1VP0sHLBS9g65w9exM-Pl5gaKidkRziX22yNIv306571QA6pwrKGDiluTZLxs5ZdXOr_5GlzOqAIa"),
      s("skin-30ad2640a228","★ Driver Gloves","Snow Leopard","gold",174.11,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5tnIfeGD3Wv1uZ_pORWQyC0nQlp4TnUw9f6J3PCOw4oW8ZxRuEOshK8l9fgZbnqswHX3owXmSisjCIfuzErvbiEoDwfJQ"),
      s("skin-de7d4238a5c9","★ Bloodhound Gloves","Snakebite","gold",4020.84,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSI0vTyOn5zyKCX4PERxSdEfGb5d6lSmxIfuMezmtFfb39lAxCivh3hI6Chi4eYGWfAt8vXTiw_EM7Q_t5NWIeHnE0qrynbE1A"),
      s("skin-4e17d497a43e","★ Bloodhound Gloves","Bronzed","gold",3443.19,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIqtimEloPwIhTLN1F4Tox2Q7UJ4RLrltDkMuyz4ASIg4kUxCr5jy8fvC46sLtWWaojqKze2giTL_Rjtvi23tdj"),
      s("skin-c9241d03e33b","★ Bloodhound Gloves","Charred","gold",3152.99,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIlvzyGkbDqKCfRO0RPVssnHaMUsES-k9HjNrixsgbd3YIRni7-inlO5i5t6-pRAqIs_aOFjg_JZbU5sI5Deqh-Veq-pA"),
      s("skin-cd619968abb9","★ Bloodhound Gloves","Guerrilla","gold",1618.09,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIgpjiXiIb1LSr4Ml93UtZuR7QKthCwl4fkNuqw4lPXgosRzi78inwdvyk45e5UUqQkq_aDi1rEZap9v8fy7GQdug"),
      s("skin-941014ee5a6e","★ Driver Gloves","Crimson Weave","gold",3507.09,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t_JfSsAm6Xyfo4trVoSnGxlh9x5DmEzt6rJS2RagYiA5siQ-MLthW9xtDlM7uxtFCNgpUFk3thcTnRAg"),
      s("kg_5","★ Sport Gloves","Vice (Порок)","covert",1950,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_KfG2Kv0ed4u95lRi67gVNx4T-Bw434IHyVb1QlAsd1FOUDthG4xNznMu3m4QXXg90Wzn_33C1I8G81tLaDi_rK"),
      s("kg_6","★ Sport Gloves","Pandora's Box","gold",5900,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H-CGHHecxNF6ueZhW2exk01w4j7cmYn4eHPCbAMhApdwTOIN5BPsx9yyYu605FTeid0Uy3j3kGoXueKyz5wo")
    ]
  },
  {
    "id": "case_bm_awp",
    "name": "Кейс AWP Empire",
    "subtitle": "Dragon Lore, Gungnir, Medusa, Asiimov и Fade",
    "category": "black_market",
    "price": 49.99,
    "accentColor": "#10B981",
    "badgeTag": "ТОЛЬКО AWP",
    "customChances": { "classified": 60, "covert": 40 },
    "image": u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnEVvqf_a6VoIfGSXz7Hlbwg57QwSS_mxhl15jiGyN37c3_GZw91W8BwRflK7EfKsa2sfw"),
    "items": [
      s("skin-b986a2456e28","AWP","Chrome Cannon","covert",41.01,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0OarZbRoMvWXMWuZxuZi_uM6SXngxR5-smTXw4ugIi6RbVcpXsN1ELUDtxPrktOyNL7h4g2P2tpbjXKpKIbjbD4"),
      s("skin-d42f9ca97ef6","AWP","Duality","classified",11.52,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6hkLfKcMXSewOVzj-1gSCGn20p_62-HnN7_cH-XblQjDZYhR-FZsETqmoXjYry2s1DX3d5AyyT62ipXrnE8bpg5yZk"),
      s("skin-3a4cc2c7a86f","AWP","Chromatic Aberration","covert",39.83,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6dlMv-eD1iAyOB9j-1gSCGn2x50tT_Tm9f4cXORPA4oWJckFOMLtha_x9e1Nu-35QfbjYtHyiythitXrnE8ylr09zg"),
      s("skin-29f83d73bb6a","AWP","Capillary","milspec",0.86,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JoKf6sAm6Xyfo44bE5HSrmlx5z4GTUzt__I3yebQAgA8R3FuFfsBTqx9W2Y7vq5lbfjZUFk3ugIlCuqg"),
      s("skin-d6cf8565026b","AWP","Atheris","restricted",3.05,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JkMPWBMWuZxuZi_rZsS3zgzU8isW3dnIr6eHKfPVAhDpojEe9YsUW4xta1Nuzm5FDci4NbjXKpmWVQppo"),
      s("skin-c41637779316","AWP","Mortis","classified",8.28,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6BoIeSbMWuZxuZi_rNtHiuwwRwismWEnNn8JymSZgUiDpd3Ru9ZsxG-xNy2NLzn41DWg41bjXKp5oOAt0A"),
      s("skin-7b1ef066823d","AWP","Neo-Noir","covert",22.51,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6poL_6cB3WvzedxuPUnHirrxR4l423SyI39I3KXPwdxWZclQeNZ5EXskYfnNeyw71OMi9lNzDK-0H3r66pOTw"),
      s("skin-860a0652d07a","AWP","PAW","restricted",3.13,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k7uW-V7RsN-CSGVicyOl-pK84Tn-3xkgltWWGnI39c3LDaA4lD5V0QO8It0LqktfuMOrq7gDajYJG02yg2bUm5WIV"),
      s("skin-d85f6159fe4a","AWP","Fever Dream","classified",18.78,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7R-OfObAXeR1eZJvOhuRz39kE1w4jiAzNiod3qTOgcgXpAlQ-ML5hjqxtHjZOrrtlHWit9EyCj9iDQJsHhCZP-wUg"),
      s("skin-78882aeeb9a7","AWP","Phobos","restricted",3.01,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V7RlL_KcHVicyOl-pK84GXHmwk115D6GzdqudHyUbwRxW5R3ROZbtEG8wYDiY7-x5VOKgotB02yg2bdJjfAf"),
      s("skin-c97e27944006","AWP","Worm God","restricted",3.76,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DNk7uW-V7B6Kf6WMWuZxuZi_uRoGH3iw0wh4j7cnt6ucSqSZwUkCMB5TLIPsES_kNbuYeOwtgXai4NbjXKpZ4kj0o0"),
      s("skin-67b936c9cb52","AWP","Man-o'-war","covert",80.84,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k7uW-V6NhL-KKMWuZxuZi_uM5HXG3xhh_t2iBnI2ucn3EZwEjDpJ0Q-dY5EPrxNTiYevj7gXa2IhbjXKpQIFOiXU"),
      s("skin-69390026d135","AWP","Lightning Strike","covert",875.7,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k4_upYLBjKf6UMWaH0dF6ueZhW2frwU1_sW2EmNyvc32RZwMpCpcjQ-EJ4xbtmt3gYezk4wzb3tpAy3mrkGoXubsGIfVN"),
      s("skin-278adf18c50e","AWP","Graphite","classified",232.07,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k7OC7ZbRhJc-RHGaGztF6ueZhW2e2k0l2sW_WzN7_cS6SbgV1CsF3TOEI4EOwloGzNLzg5g3fiIpHxC78kGoXuTqeOjwH"),
      s("skin-cfaaa2fab447","AWP","Oni Taiji","covert",836.09,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6xsLv6KD1icyOl-pK9vGCqwkx524G_WnNmsInyXOAVyXJJ0TbNb5EOxxIflYbzj4gDdiNlC02yg2XaKgrAq"),
      s("skin-bb633c21fc25","AWP","Asiimov","covert",180.18,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6V-Kf2cGFidxOp_pewnF3nhxEt0sGnSzN76dH3GOg9xC8FyEORftRe-x9PuYurq71bW3d8UnjK-0H0YSTpMGQ"),
      s("skin-f2cdadd8b557","AWP","Elite Build","classified",24.76,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6lsM-SWHH6vzedxuPUnSnHmk0Qh4G6HmN-scXmSaQRxXJpwRuZYsxTqxtTnM7nl4gTW2dlFyjK-0H0d8XeEBg"),
      s("skin-f8cd1aa7fa55","AWP","Containment Breach","covert",185.5,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JkMuWAMWuZxuZi_rQ6SXq1xURysj_Vw4uhJHOVPQ8oCZt4QrRbtRi6ldPlPu_g4FHaiYNbjXKpcPI_17A"),
      s("skin-a89bff508437","AWP","Exoskeleton","restricted",8.97,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6F1L-OYC2uV1eF4j-1gSCGn20km5zyEmd2qc3uWZwcnA5MiELIJtxa_w9OyN-nh5wKKj4kTyn78hyNXrnE83OTew2I"),
      s("skin-f787cc672771","AWP","Hyper Beast","covert",75.03,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6x0MPWBMWWVwP1ij-1gSCGn20pxtm_WzNuoeHKeaFAnCZUiTe5bt0HqxofmZOrm5Q2IjoMQzS_5iShXrnE8NzWs__c"),
      s("bm_awp_medusa","AWP","Medusa (Медуза)","covert",1850,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk4veqfbdsH_GEHlicyOl-pK85TC23wk12tWSGnNr6JXqRPVUnA5J5RLIKshS-l4HuYbji7lfajdgU02yg2bOcOBD3"),
      s("bm_awp_gungnir","AWP","Gungnir (Гунгнир)","gold",6400,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6N4LvedB3WvzedxuPUnHnjnzUl0sWrdztitI3rDZgJzAsZ1QOFY4UPqldDgMO_l41HXit9AmTK-0H227dAsvQ"),
      s("bm_awp_dlore","AWP","Dragon Lore (История о драконе)","gold",8500,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk4veqYaF7IfysCnWRxuF4j-B-Xxa_nBovp3Pdwtj9cC_GaAd0DZdwQu9fuhS4kNy0NePntVTbjYpCyyT_3CgY5i9j_a9cBkcCWUKV"),
      s("skin-4f8d99d09ded","AWP","Dragon Lore","covert",665.62,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk4veqYaF7IfysCnWRxuF4j-B-Xxa_nBovp3Pdwtj9cC_GaAd0DZdwQu9fuhS4kNy0NePntVTbjYpCyyT_3CgY5i9j_a9cBkcCWUKV"),
      s("skin-05f333baf59c","AWP","Black Nile","milspec",1.64,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V7d5Mv-dC1icyOl-pK89Gyvhlhsit2-BwoyrICmWPQcmDpEkQOdeskOxwNKzN7vm4VeP2oMR02yg2Z2CmmVC"),
      s("skin-9e9b9cd050d5","AWP","Acheron","milspec",1.94,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk4eetZKFsMs-ABXKczf1JouRtTSWmkCIrujqNjsH4eC-ROFMkDccjR7EDsBCxlN2xZu7jtlaNj4pMxSr8hiIc53tt67kHT-N7rafi4HxI"),
      s("skin-665b5d16532c","AWP","Pink DDPAT","restricted",5.59,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk6_a-abBSMPmdBVicyOl-pK9qHXC2zUpz5DiBn9arJCmXOFd0DZpxQOUDtBC6wNK0MOzl4wXWjYpG02yg2c9nQ1pb")
    ]
  },
  {
    "id": "case_bm_5050",
    "name": "Кейс 50/50: Всё или Ничего",
    "subtitle": "Либо AWP Dragon Lore / M9 Doppler, либо P250 Sand Dune за $0.10",
    "category": "black_market",
    "price": 79.99,
    "accentColor": "#EF4444",
    "badgeTag": "50% ДЖЕКПОТ",
    "customChances": { "milspec": 50, "covert": 25, "gold": 25 },
    "image": u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnEVvqf_a6VoIfGSXz7Hlbwg57QwSS_mxhl15jiGyN37c3_GZw91W8BwRflK7EfKsa2sfw"),
    "items": [
      s("skin-p250-sanddune", "P250", "Sand Dune", "milspec", 0.12, "@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_PX-MJtpJeqSHXOCxNF6ueZhW2exwEp2tmmEw9epdCjCalQhX5ImQOZbtRixxNTgN-u24AHb2okTmX2vkGoXuacR7BX3"),
      s("skin-b986a2456e28","AWP","Chrome Cannon","covert",41.01,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0OarZbRoMvWXMWuZxuZi_uM6SXngxR5-smTXw4ugIi6RbVcpXsN1ELUDtxPrktOyNL7h4g2P2tpbjXKpKIbjbD4"),
      s("skin-vanilla-weapon_knife_kukri","★ Kukri Knife","Classic","gold",219.97,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2lfa9_Kb6VXmPGwuogsbNvSyi3zR4jsTnQztyqdS6QP1IoXpoiEeAC5Be5l9CxKaq8sIvgdE5J"),
      s("skin-6dbefc59c1b9","★ Kukri Knife","Fade","gold",252.98,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsIc-VD2OV_uJ_t-l9AXyyzEohsGvVn4moIi-VO1N2CJR1E-UD4BXtkIXhMe2x7lbej4tEnyzgznQeN9c5PgA")
    ]
  },
  {
    "id": "case_bm_covert",
    "name": "Кейс Только Тайное",
    "subtitle": "Красные скины: AK-47, M4A1-S, USP-S, AWP",
    "category": "black_market",
    "price": 24.99,
    "accentColor": "#EB4B4B",
    "badgeTag": "100% ТАЙНОЕ",
    "customChances": { "covert": 100 },
    "image": u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnEVvqf_a6VoIfGSXz7Hlbwg57QwSS_mxhl15jiGyN37c3_GZw91W8BwRflK7EfKsa2sfw"),
    "items": [
      s("skin-b986a2456e28","AWP","Chrome Cannon","covert",41.01,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0OarZbRoMvWXMWuZxuZi_uM6SXngxR5-smTXw4ugIi6RbVcpXsN1ELUDtxPrktOyNL7h4g2P2tpbjXKpKIbjbD4"),
      s("skin-82dc98e09ba6","AK-47","Inheritance","covert",32.34,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQ0OKheqdoLPGaAFicyOl-pK8xGH_nwUt1sGrSz9ivcHKQOAcjXMYkRu5Yuxe4lYCyZOq25VSM2oMT02yg2UxBSEgA"),
      s("skin-5bd16f2599cf","Glock-18","Gold Toof","covert",49.08,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5tuKP-eHmKC_uJ_t-l9ASvik00m5TmEzd-geSiQPARxX5IiTLIMtBW4l9zmNuPr4VbbjItHxC_gznQeqLQCTjk"),
      s("skin-aa9558c8a01f","M4A1-S","Vaporwave","covert",30.01,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_vh3oO57WCilkCIrujqNjsH_In7DZgYnWcAiR-MJshO6koDlN7vhsQyLi41HySX6iXlAvCZrsb0HT-N7rW-9qIHE"),
      s("skin-405f5570d1f6","AK-47","Nightwish","covert",42.19,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSLvmUBnOHyP1-j-1gSCGn20glt2nXnt78cnKUbwN2XJp2R-ZbuxHqlNXlMLiw5AHc3toWnCur23hXrnE8p0T2bx4"),
      s("skin-feae180c4968","MP9","Starlight Protector","covert",31.64,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f-jFk4uL3V7d5IeKfB2CY1dF6ueZhW2flkUtztz_SzYypJSqRalUhDJNwQO4PsBXtx9HkN-K37w3bgohGmHn3kGoXuZ3lRdvF"),
      s("skin-1aba3ea9ecc5","M4A4","Temukau","covert",28.74,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSNPWeG2yR1NF6ueZhW2ewlBtx5W6AmYv9JS6XaAV1CJEmTeUL4UTpxNzjZO3jtgaIjN9ExCuskGoXuRnyRhBA"),
      s("skin-1f95db2031e4","AK-47","Head Shot","covert",39.65,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV6xoIfSsHW-f1dF-v-1mcCW6khUz_TzRnNigd3-SOg4lAsF1QOQN4xS4wdHnMu-0swaMjIxExSSoiyof6ih1o7FVGHIdVhw"),
      s("skin-be37abed2b4d","USP-S","Printstream","covert",34.15,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_v5kue99XD2hkBwqjDGMnYftb3yUPFR0XsNyRrNc5kO5ltziMenr5lONj4kXyi2riywc7y9o5LtQAqQ7uvqAkScWnv4"),
      s("skin-3a4cc2c7a86f","AWP","Chromatic Aberration","covert",39.83,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6dlMv-eD1iAyOB9j-1gSCGn2x50tT_Tm9f4cXORPA4oWJckFOMLtha_x9e1Nu-35QfbjYtHyiythitXrnE8ylr09zg"),
      s("skin-32a30647e564","Desert Eagle","Printstream","covert",35.83,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ8-DHG6e1f1iouRoQha_nBovp3OGmdeqInyVP1V0XsYlRbEI50a5wNyzZr605AyI3t5MmCSohylAuC89_a9cBoMY9UkV"),
      s("skin-dfd42a079f44","AK-47","Legion of Anubis","covert",29.49,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIf6GDG6D_uJ_t-l9AX_nzBhw4TvWwo6udC2QbgZyWcN2RuMP4xHrlYDnYezm7geP3d5FyH3gznQeY_Oe4QY"),
      s("skin-7dc4b0b65850","USP-S","The Traitor","covert",37.77,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSJ-OsG3SA0tF-se9uSi2-lBMYvzSCkpu3eX7EP1MpApdwR-8NsxbukoXuNLnj4QOMiN8XzHn_iC8a7Spi4upRWb1lpPOCQNKXgA"),
      s("skin-c62d08aa8da1","M4A4","In Living Color","covert",17.78,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSLP-FC1icyOl-pK84GH2wxhty4DjcyNuhdHyXbAVxW8QjTbEMthC8kNa0MLmzs1Hbj95E02yg2bbWGcKW"),
      s("skin-4dd5dccd2fdd","M4A1-S","Player Two","covert",42.82,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj-J6SCbhxUl_jDGMnYftby7BbVdyCsB0EeZY4RPukNfhZOO2sQ3W398Qy3_6jHxIunptsO9TUqs7uvqAAWrfZoM"),
      s("skin-3596d60709cc","Glock-18","Bullet Queen","covert",19.67,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK6HLMXCR0-N3ueVsQRa_nBovp3PQydf4dXuSalUgCJZwRrILthi9kYDlMe_m4g2Ij90Um3moiXkc6SZj_a9cBgLxwlYC"),
      s("skin-f971772d4996","Five-SeveN","Angry Mob","covert",35.81,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC1iDxPhzvt5oQS6hjCIrujqNjsH_cy2RagUjA8BwR-de5hjskNflNrnqsgaLiYgRyyythitM7Hw-sekKT-N7rXEld5dH"),
      s("skin-8c5b9b7ce9f2","M4A4","The Emperor","covert",39.1,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSJf2DC3Wf09F6ueZhW2exwBh_6m3dnt36InjDPQ4oXJt1TbJeshW_mtfjN-vrsgaKiokWy333kGoXuRj4z9Nd"),
      s("skin-e8144faeae9f","M4A4","Neo-Noir","covert",32.19,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSLvWcMWmfyPxJvOhuRz39wE1142vSztmvInvBOgV0W5R1FLYNuxW4wIbgNrmx4g2Kj4tMmCX93zQJsHgJr0dqFw"),
      s("skin-d11a70424dd7","MP7","Bloodsport","covert",46.08,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf-jFk4uL5V6ZhL_-XHXef0_pJvOhuRz39lxsk4W3Ry96pIHrFOgElDZN2Q-9etUSwk4LnYu3h5wLejYwWxSr43zQJsHiIGMoJQA"),
      s("skin-09205674e246","AK-47","Asiimov","covert",33.38,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIeOaB2qf19F6ueZhW2e2wEt-t2jcytf6dymSO1JxA5oiRecLsRa5kIfkYr-241aLgotHz3-rkGoXuUp8oX57"),
      s("skin-7b1ef066823d","AWP","Neo-Noir","covert",22.51,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6poL_6cB3WvzedxuPUnHirrxR4l423SyI39I3KXPwdxWZclQeNZ5EXskYfnNeyw71OMi9lNzDK-0H3r66pOTw"),
      s("skin-74e670c4b279","AK-47","Neon Rider","covert",38.14,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV6poL_6sHG6UxPxJvOhuRz39xkQhsTnVzoygdy7Ea1UoCZQkRe9bs0brl9TvN-m0tVHYjY5CyS35jjQJsHhk4o5zcA"),
      s("skin-87ee5eacc505","Desert Eagle","Code Red","covert",43.05,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6OGRbKFsJ_yWMWaXxvxzo_JmXRa_nBovp3PRmNj4c3mTb1RxC5cjF-EItRnrlNzkYrnk5gaI3Y0UmyX52H9K7ixs_a9cBsGEcOCn"),
      s("skin-1b3ca668024e","AK-47","The Empress","covert",68.8,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSJf2DHGKD0tF6ueZhW2exxEt152rWzI7_Ii-Ubw90DMB0Ee4C5xOwx9GxZbjk71PXgogWn36tkGoXudZeYvlo"),
      s("skin-491a70af3255","P250","See Ya Later","covert",54.66,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSI-mRC3WT0-F1j-1gSCGn2x9ytmzWnN6pInjGOwMlDZp0EORe5BHsx93lP7zr5wzbiI5AyXr_jS9XrnE8gQrIgng"),
      s("skin-ba052cf18c66","AK-47","Bloodsport","covert",73.91,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSIvycAWOD0eFkpN5lRi67gVN15mmDw9egci_EPFAkDMQlTeZe4EXplNa0Yrvr5wbd345GyHioiC4b8G81tFuqg_k_"),
      s("skin-0770dabcd885","USP-S","Neo-Noir","covert",88.91,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA0tF4v-h7cCW6khUz_WXdmd-vI3uRPwEkApR4QuBcu0Xrk4biYr_mtQXdidlCz3r63Ska7Hx1o7FVWuokIcU"),
      s("skin-1a5e885d9d28","AK-47","Neon Revolution","covert",83.75,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIf6SHGSY2NF6ueZhW2e3w0524mjQzomreXqVbAAhWJF3RuZfuxC5x920Yurh7gONjY0RxHr4kGoXuT5bpI-V"),
      s("skin-0305a5aaa4eb","FAMAS","Roll Cage","covert",42.87,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2oaalsM8-BD2uc2NF6ueZhW2exzUhz4WjWmNqpdy-UbwJxDJtxReEMtRGwloflP7m04wfXi94QyXj9kGoXuV3JhaXD")
    ]
  }
,
  {"id":"case_kilowatt","name":"Кейс «Киловатт»","subtitle":"Ножи Кукри и AK-47 Inheritance","category":"base_cases","price":2.49,"accentColor":"#00F0FF","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnEVvqf_a6VoIfGSXz7Hlbwg57QwSS_mxhl15jiGyN37c3_GZw91W8BwRflK7EfKsa2sfw"),
    "items": [
      s("skin-8d6879f0a2bc","Dual Berettas","Hideout","milspec",0.89,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1f-vOiV6ZoMvWHGmaD_uJzpOloQxa0hxQpjDGMnYftb3-WbQ92WcZ4EeFZs0TtxIfvZr_m7wXW2I0TySv93ywd5yxu5-0FAPE7uvqA-FxXgtE"),
      s("skin-543d85d8ca60","MAC-10","Light Box","milspec",0.72,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1W7vH_OJtkLPyGHW6fz9F6ueZhW2e2lBsk4WvXw974diiSblV1DMBxRrEJu0PrwNy1Mruw4gKK3d0TynmskGoXuUBgCcQQ"),
      s("skin-baa1adba3189","Nova","Dark Sigil","milspec",0.94,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwixU-fORbLZsK_uSHFicyOl-pK8xG3q1lk0l4m2HmI6odXiRbwF1CJchQbEI4RK8kNPiMb-24A3W3YoX02yg2YjfpjSA"),
      s("skin-c176fd51f6b9","SSG 08","Dezastre","milspec",0.71,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_PX-MJtpJeqSHXOCxNF6ueZhW2exwEp2tmmEw9epdCjCalQhX5ImQOZbtRixxNTgN-u24AHb2okTmX2vkGoXuacR7BX3"),
      s("skin-80f2ee4e940f","Tec-9","Slag","milspec",1.01,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wjZe7KuRYrFjK-mSHGOvxOBxue9sSju6mxoYvzSCkpu3eHPFZwMkWZBzR-cDsEbpm9DvY-yx51fajd8WyXn4hntBvX465OkBVL1lpPMDDuBGag"),
      s("skin-806137e84f73","UMP-45","Motorized","milspec",0.48,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1O4uL6PZtsM-OWA2WcxOpJte9uRie2qhEutDWR1N2gcy7DalAhCMd3QucO5EPukN2yN-iw5QyN2IkRzSr6iXtO6StrsL0cEf1y62CUsqE"),
      s("skin-8c2ae17ac090","XM1014","Irezumi","milspec",0.89,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk9___OPU5H_mBC32FzOdJvOhuRz39k0h14juBztapc3-fPVIjWZomFucMtxe9m9zmNOjltQ2N2dgTnCr_3zQJsHjkNdtnHQ"),
      s("skin-2c04c0201892","Glock-18","Block-18","restricted",1.98,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5tvMvmQBVidzuByouhoQRa_nBovp3PXzov9cyjDbwckXMMkF7IIthOwwNDmY-rq4AzfjItMyH_9iC0YuC04_a9cBk5_kH3q"),
      s("skin-0e160542d6d4","M4A4","Etch Lord","restricted",2.55,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwi8P7qaRe6psK_WRB3OV_uJ_t-l9AXjnw0Qh5GqGn9b_dH3Cbg4nCcAhRLIM4BW7mtXmM7jjtAXai40WmHngznQeK6EUrpc"),
      s("skin-204c9ef36369","Five-SeveN","Hybrid","restricted",1.9,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRbq17JeOWGGKe_uZvsvNgSxa_nBovp3OBmd6oJXyeaQ9yCsZxEOICsUO7kdK0Y-qxtFCN2YsQnCv7i39N7ixp_a9cBsh2vVQD"),
      s("skin-48f9126df040","MP7","Just Smile","restricted",2.01,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf8DIM0Pi7e7BSM_2aAmKvzedxuPUnHXrkzU4i4z-Dno6sci3BaQApDpN4R-cCthnqx4W2MunhtgCI3d0QmzK-0H0MYFOvtA"),
      s("skin-d0653c0aaf2f","Sawed-Off","Analog Input","restricted",3.2,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c29abNoJP-VCFiXwONzot5lRi67gVN3tWTdyNipdCiQPwdxCJV2RuBY4xa_wILgMLu37leK3otMzHmo3H5J8G81tFoL-ETi"),
      s("skin-63c1d72b8501","M4A1-S","Black Lotus","classified",10.22,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_ux6seJicCW8gQg0jDGMnYftb3-eOgEpDcFyQuMMtRG8kIbhMuK051ba2IMQyH6r3yof5ilv4bwLWfU7uvqA7qRNHGA"),
      s("skin-9eb2feb216c5","Zeus x27","Olympus","classified",12.73,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLln4Xl7x1B6ue9V7BlNf6XC3WvxuFyj-1gSCGn2xl2sm7XnI6hdC-XPAcmXsF2RLIP4xbslty2NLvqswePjYlEySn33S9XrnE8cYTqlUY"),
      s("skin-803657465fa6","USP-S","Jawbreaker","classified",8.15,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODHViUzulxqd5lRi67gVMl62nUyd2scnOVPAcgA5J2TOFY5xLrlN22YbzgsQaI2IlHyiWojnwa8G81tErOD-_J"),
      s("skin-b986a2456e28","AWP","Chrome Cannon","covert",41.01,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0OarZbRoMvWXMWuZxuZi_uM6SXngxR5-smTXw4ugIi6RbVcpXsN1ELUDtxPrktOyNL7h4g2P2tpbjXKpKIbjbD4"),
      s("skin-82dc98e09ba6","AK-47","Inheritance","covert",32.34,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQ0OKheqdoLPGaAFicyOl-pK8xGH_nwUt1sGrSz9ivcHKQOAcjXMYkRu5Yuxe4lYCyZOq25VSM2oMT02yg2UxBSEgA"),
      s("skin-vanilla-weapon_knife_kukri","★ Kukri Knife","Classic","gold",219.97,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2lfa9_Kb6VXmPGwuogsbNvSyi3zR4jsTnQztyqdS6QP1IoXpoiEeAC5Be5l9CxKaq8sIvgdE5J"),
      s("skin-6dbefc59c1b9","★ Kukri Knife","Fade","gold",252.98,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsIc-VD2OV_uJ_t-l9AXyyzEohsGvVn4moIi-VO1N2CJR1E-UD4BXtkIXhMe2x7lbej4tEnyzgznQeN9c5PgA"),
      s("skin-0808024a639a","★ Kukri Knife","Slaughter","gold",233.6,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsLc-JC2WCwNF6ueZhW2fmwkwj62TWmdyuc3nEOFB1Csd5ReFZtUTpxtXvYb_k4waPj4wXxXitkGoXuVwivb-T"),
      s("skin-bc9e87f3c013","★ Kukri Knife","Blue Steel","gold",252.72,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsMc-RAnKVxdF6ueZhW2exzE0h62nVyd6qeXjEbgF0X8EiEbZesRS_wIXkPujq7wPWjNpDyn6vkGoXudm1ivk1"),
      s("skin-d1ab66316ff3","★ Kukri Knife","Stained","gold",180.52,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsMc-VAXWTxOpJvOhuRz39lkgl52TXzdiscH2TOgAkX8QiRuFftxW6kNW1Yrzr7wOK2YkWxXr43zQJsHia9a0bCA")
    ]
  },
  {"id":"case_gallery","name":"Кейс «Галерея»","subtitle":"M4A1-S Vaporwave и Gold Toof","category":"base_cases","price":2.79,"accentColor":"#FF2E93","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnYVuPD5baE6IfTFCmSRme0j5eU5SXrjkRwmt2rWnoqhdnjEPQQiDpRxTflK7EePRV2-Kg"),
    "items": [
      s("skin-5b2502fc6ca2","USP-S","27","milspec",0.66,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODMWGZxOJyj_JnTiK2qhEutDWR1Nf8dSieZlciX5skF-INsRe_l9HuMurn5QDZ2tgTnyT82ysduHo_tekcEf1yefDz68I"),
      s("skin-48039a85c871","Desert Eagle","Calligraffiti","milspec",1.13,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6_evb6hoH_OSAmuZxvx3tudWQyC0nQlp52rQmNv_IC7DaFR0ApB4QbMKs0W8k9zuPr6xtAGMjoITmymohyMa6jErvbhrxmEjWA"),
      s("skin-63ed7bb762a0","MP5-SD","Statics","milspec",1.09,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1W_6eRe7BsNPmQHViSzftzj-1gSCGn20l252_Tz478Jy3EbAYnX8FzFuAI5kO5wNK1P-uz4lSP2doRyS_6iipXrnE8LnlBQOA"),
      s("skin-f0c2d895b50d","AUG","Luxe Trim","milspec",0.36,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_Ddc0OK7bqJoMs-fB2CY1aAntOUwSivrwksmtTyBnI2udijFZ1cmDZt0QeUCsRG7xoWzNu3r5gPelcsbmlZvKhNj"),
      s("skin-c7c133807ad6","M249","Hypnosis","milspec",0.58,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wi8Ju6uRYL19Lv-AB3SvzedxuPUnTny1wkgm5znWyon4dC2TPFRxX8AmROcLthW8kdTgMrm051fcjIsQzTK-0H3IfNSRpg"),
      s("skin-3604c7754aa6","R8 Revolver","Tango","milspec",1.09,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c28MJt_L-OWHViRz-pJt_RnXBa_nBovp3PSm4urdy7Da1UjWJolF-RbshfqldXuMuqxsgGKi45HmXj4iS5IuCxi_a9cBo6oJFLo"),
      s("skin-03f6e200c8b6","SCAR-20","Trail Blazer","milspec",0.68,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk_PGvevY9H_aGHH6v1eFmv95lRi67gVN_5D6Bzo38cXOVOA52DZolReBbt0K5k9DvM-Pr4VHXjI9Enn6sjHkb8G81tIsMy8R0"),
      s("skin-6bdcfb1366c6","M4A4","Turbine","restricted",3.84,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwi8P7qaRbrF-Kf-dMWuZxuZi_rRtGiriwUgh5m6Bn9z4IHLEOA4gDpZxQOULsUW9k4eyMOLitQzd3opbjXKpOa4i6Kc"),
      s("skin-8300a7de7ac6","Dual Berettas","Hydro Strike","restricted",3.95,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1f-vOiV6FhKeSWMW-Jxfx5j_J9XSC4kCIrujqNjsGgeHrGa1B2W5t1Q7NetkOwk4C2Ybzq4FDWjI0TzS6viilLv3tp6rwLT-N7rWtjCU_P"),
      s("skin-1328a63c72b5","MAC-10","Saibā Oni","restricted",3.19,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1W7vH_OJtiOvGYB1icyOl-pK89HXuxkRt2627Syt2udn6TZlJyW5R0QuMKsRm6lNflNO3g7lfbi49H02yg2Yk7YeQ4"),
      s("skin-39f40ce9d13d","P90","Randy Rush","restricted",3.72,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7XsL0OCvZqB0H-KGHW-vzedxuPUnGCy3lhsj6zmAyYn6eXyQbwMhApAmFu8C5xTpktHjMejl71aPjtkQnjK-0H3AcMEIag"),
      s("skin-05b22d280618","SSG 08","Rapid Transit","restricted",2.57,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_PX-MJt5MvGdHW6E_vl-ufVscCW6khUz_WTSw479d3vDalIkCJNzFuIN4RHqw9K2P7nktQHf340Wyn-vh3wY7Sd1o7FV_lj0Yvg"),
      s("skin-ad56dc47a4c4","AK-47","The Outsiders","classified",11.94,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQu6WRfJtvNeOsAm6Xyfo4tbg7G3-wxxwl5mzRyYqodSrBagMjCZJxELMPthi8lNLgYuzltgHc3ZUFk3sO-7HKrg"),
      s("skin-71be2ee4feeb","P250","Epicenter","classified",8.37,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjIJuqKRYal9IfOHMWuZxuZi_rg5TnvmzB916m_dm92pdH6eOwJ2DpVyQ7JftUXtwIK2MLiz7wTXjYtbjXKpkd0OdLY"),
      s("skin-52c02605493f","UMP-45","Neo-Noir","classified",8.37,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1O4uL6PZtjJf-sAGiZ09F6ueZhW2flw0R0sGrcy4z9cn6XagVxCpR4F7Rb5BPplIbjY7vj4AOLjt0TzSj9kGoXuYU0ZhpI"),
      s("skin-5bd16f2599cf","Glock-18","Gold Toof","covert",49.08,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5tuKP-eHmKC_uJ_t-l9ASvik00m5TmEzd-geSiQPARxX5IiTLIMtBW4l9zmNuPr4VbbjItHxC_gznQeqLQCTjk"),
      s("skin-aa9558c8a01f","M4A1-S","Vaporwave","covert",30.01,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_vh3oO57WCilkCIrujqNjsH_In7DZgYnWcAiR-MJshO6koDlN7vhsQyLi41HySX6iXlAvCZrsb0HT-N7rW-9qIHE"),
      s("skin-vanilla-weapon_knife_kukri","★ Kukri Knife","Classic","gold",128.61,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2lfa9_Kb6VXmPGwuogsbNvSyi3zR4jsTnQztyqdS6QP1IoXpoiEeAC5Be5l9CxKaq8sIvgdE5J"),
      s("skin-6dbefc59c1b9","★ Kukri Knife","Fade","gold",267.07,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsIc-VD2OV_uJ_t-l9AXyyzEohsGvVn4moIi-VO1N2CJR1E-UD4BXtkIXhMe2x7lbej4tEnyzgznQeN9c5PgA"),
      s("skin-0808024a639a","★ Kukri Knife","Slaughter","gold",127.7,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsLc-JC2WCwNF6ueZhW2fmwkwj62TWmdyuc3nEOFB1Csd5ReFZtUTpxtXvYb_k4waPj4wXxXitkGoXuVwivb-T"),
      s("skin-bc9e87f3c013","★ Kukri Knife","Blue Steel","gold",181.53,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsMc-RAnKVxdF6ueZhW2exzE0h62nVyd6qeXjEbgF0X8EiEbZesRS_wIXkPujq7wPWjNpDyn6vkGoXudm1ivk1"),
      s("skin-d1ab66316ff3","★ Kukri Knife","Stained","gold",191.9,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsMc-VAXWTxOpJvOhuRz39lkgl52TXzdiscH2TOgAkX8QiRuFftxW6kNW1Yrzr7wOK2YkWxXr43zQJsHia9a0bCA")
    ]
  },
  {"id":"case_dreams","name":"Кейс «Грёзы и кошмары»","subtitle":"Изумрудные Ножи-бабочки","category":"base_cases","price":3.19,"accentColor":"#A855F7","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnIV7Kb5OaU-JqfHDzXFle0u4LY8Gy_kkRgisGzcm4v4J3vDOAQmDMdyRvlK7EcmeCU3yw"),
    "items": [
      s("skin-ee6dee51b1f5","Five-SeveN","Scrawl","milspec",0.81,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-BlXyGyqhIqtjqEpYPwJiPTcAInA5J0FO9csBSww4bhZruzswLcjIsXmCusjCsbuno_57tXUqB386HJz1aW2pI_m5Q"),
      s("skin-7b9cc6bc31ef","MAC-10","Ensnared","milspec",1.07,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-DB3-ZxNF6ueZhW2fikB935ziGztj7JHyQbgIkWZsmFrJY4xTpwdOzP-Oz7laNj4lFyy2tkGoXudbL5uIf"),
      s("skin-c8ccc993ef98","MAG-7","Foresight","milspec",0.97,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiFO0P-vb_NSMOKWCm6T1eFkj-1gSCGn2xgmsWvRm96seXOfbFMjXJR1R-NY4xjukNLlYurn4QeN3t5CmCT7jHxXrnE8UENGXls"),
      s("skin-0571189c0ca3","MP5-SD","Necro Jr.","milspec",0.76,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePFSK_mXMWmVwvx5vu5kRiq8myIrujqNjsH8JXqXPVAhDZVyR7YO4ETrxtLvZbmxtAXfiIpCzHr5h3tB635j4-gCT-N7reJfmdfh"),
      s("skin-75edb16f0014","P2000","Lifted Spirits","milspec",1.12,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_K8-VAn6Zz-lJtPNsTiSMmRQguynLydatcHrEOgIhXJZxReINtRO7ltexZuiwtQPd34lFxXqqjisYun444fFCD_R1ajI6RQ"),
      s("skin-2c6b935bb4eb","SCAR-20","Poultrygeist","milspec",1.32,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk_OKRe6dsMs-QBm6Tyut4tuhuRz2MmRQguynLno2pdnnGOw9xWcFwEbMCtkHsmoXuNe23tVGNiINCyyv6iylJuyZi5_FCD_Tlwp1EIg"),
      s("skin-3da25779ee2d","Sawed-Off","Spirit Board","milspec",0.63,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZt-IeeWCmiWx9F5pehjTha_nBovp3OEyN-ocCmWPwYkCpoiE-QMt0bsxNbnNLm25waK345DyST23CpP5ytp_a9cBm4mGqdG"),
      s("skin-10f8a820b8dc","PP-Bizon","Space Cat","restricted",3.26,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1Y-s2sYb5iLs-AHmaTxO13pN5lRi67gVN04jvcmYv6IHnGbw51XsYmQO5ftBG9xoexNrix4gPYjIJEzX_2iX9I8G81tOIzQC5J"),
      s("skin-a5efcaeb15ee","G3SG1","Dream Glade","restricted",4,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1Y-s2pO7dqcc-UAmaUxNF6ueZhW2e3wkl162TVmdqvd3mUPw9yDJZ4FOYJ4UKxkNfiNrvn4QCMjdlHmHj6kGoXub9gXKkW"),
      s("skin-ec2dd0814c74","M4A1-S","Night Terror","restricted",3.49,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj-hnXCa-mxQmjDGMnYftby3FPFVxA5ZwRecOtUXuxtPiNL_jsQLc2NkTzS38jC5L7ydj5u8EUKo7uvqAgGSM4LM"),
      s("skin-5f6eb8a4271e","XM1014","Zombie Offensive","restricted",2.87,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7v-RcKlSOv-eDG6V_uFwtuRnXCClkCIrujqNjsGqdnzEOFUjW5omROQNt0LuwNKyYeKwslfYiN0Qmyr83Hsd6iZj5esAT-N7rRccpDyZ"),
      s("skin-f3392bb443bc","USP-S","Ticket to Hell","restricted",4.21,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_vp5j-lsQyWMmRQguynLzt_8JXiVOwF2AsF4R-ECshftltKxZe6x41CKjotExST8jn8f7ilr5PFCD_TZVvgG5g"),
      s("skin-53e4dc76b3e5","Dual Berettas","Melondrama","classified",9.37,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s2rZK15JeOsDGKHwPxzj-1gSCGn20t_5TiBmdf9Jy-QaQIiW5F1E-BesxG9lIaxNuLj41He340Ryi79ii5XrnE8Xl7Qhlk"),
      s("skin-c1ded03e3025","FAMAS","Rapid Eye Movement","classified",8.97,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2oaalsM8-BD3eZxdFzqeR6cCW6khUz_WjRmN79JXmePABxDsB1QeZetxnqx9XhN-nk4A3f399CzX2qiCsa7yd1o7FVINiMH98"),
      s("skin-335f1a313262","MP7","Abyssal Apparition","classified",17.13,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_jdk4uL5V6JoIeKsAm6Xyfo45uc9GnnnzBh-5zzTw9n9I3mQPAEgD5YlFuIOthC6wNK1MeKwsgHeiZUFk3vcOiyhPQ"),
      s("skin-405f5570d1f6","AK-47","Nightwish","covert",42.19,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSLvmUBnOHyP1-j-1gSCGn20glt2nXnt78cnKUbwN2XJp2R-ZbuxHqlNXlMLiw5AHc3toWnCur23hXrnE8p0T2bx4"),
      s("skin-feae180c4968","MP9","Starlight Protector","covert",31.64,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f-jFk4uL3V7d5IeKfB2CY1dF6ueZhW2flkUtztz_SzYypJSqRalUhDJNwQO4PsBXtx9HkN-K37w3bgohGmHn3kGoXuZ3lRdvF"),
      s("skin-bd871a344e30","★ Bowie Knife","Gamma Doppler","gold",187.67,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5sQiyhlBEjjDCEiI31JCLdO1JPVssnHaMU4EG-ltyyPuLq5gHYj9lMzyz7hyxNuCs-5OoDVKImrKTe21mXZ-Zu5I5Deqhh5Zn_hA"),
      s("skin-2c801d044315","★ Bowie Knife","Gamma Doppler","gold",278.08,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5uTiS-lCIjvC2VlorrHjvPP0V1C_0sHLBS9g67l9G0Mu_q5ATZ3t1BxSn6in5B6yc9t7kHBaFw_aPQ3QiTNLQ_ssICOr_5Gko8dFgH"),
      s("skin-e70487f0da3a","★ Bowie Knife","Gamma Doppler","gold",189.63,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5uTiS-lCIjvC2VlorrHjvPP0V1CP0sHLBS9g7tl4fgPujh71CNg91En36si3kY6ns-4OlQWfclqPbQ21zHZbVp4ZdWOr_5GrvoSFRK"),
      s("skin-9143e6d4868c","★ Bowie Knife","Gamma Doppler","gold",304.35,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5uTiS-lCIjvC2VlorrHjvPP0V1Cf0sHLBS9g7sl9WzN-q27gLWiYxDxH3_2y4avyxp575WAvck_aGGjADAYrU6s8EBOr_5Gs3270vO"),
      s("skin-965132fa7c08","★ Bowie Knife","Gamma Doppler","gold",343.86,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5uTiS-lCIjvC2VlorrHjvPP0V1Dv0sHLBS9g6-xoXnNr6xsQze2IxFy377iX4d7itr4ehWA_V0_aPT2VyTMudrs8YLOr_5GgyA1D52")
    ]
  },
  {"id":"case_revolution","name":"Кейс «Революция»","subtitle":"Перчатки Порок и M4A4 Temukau","category":"base_cases","price":2.25,"accentColor":"#EC4899","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnAVvfb6aqduc_TFVjTCxbx05OU4S3jilE9w4DzRnImtIy2Sa1JzDJEhRPlK7EcO4U8gfA"),
    "items": [
      s("skin-e6a7543c4187","MAG-7","Insomnia","milspec",0.44,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiFO0P-vb_NSKf6AAWqeyO9JvOhuRz39wh4k4TzUnN_9cC6WO1J2DJdyROcI4BC9x9XmN-vj71eN34xAzC33hzQJsHiziLtbUA"),
      s("skin-2f564d56b7ff","MP9","Featherweight","milspec",0.88,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_jdk4uL3V7d4MPWBAm6XyfpJvOhuRz39wB9x6jncwtyvd3jBPw8gCJFwR7YItRW8kNK0P--27wLe391NzCyq3zQJsHiOu4WQDA"),
      s("skin-05d5c801f287","SCAR-20","Fragments","milspec",0.77,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk6OGRe6dsMs-VHGaXzOt4pPJWTSWylhYYvzSCkpu3dnmXbAZyX5pzQLQO4Ri_lIbgMOzktg2P3t8Uni32iHwc7i856r1UAL1lpPP6-FL_6g"),
      s("skin-db200bb3a1ef","P250","Re.built","milspec",0.32,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSMvWRG26c1dF6ueZhW2flkRh_sjjXmNb8cCnDPVUnW5ByQ-JZ5hG_xN3gZuPltAHegogWzH7-kGoXuSIylluX"),
      s("skin-d87f89df4191","MP5-SD","Liquidation","milspec",0.74,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1Y-s2jePF-JM-CG26TytF6ufB8Ri2ygRQovQKJk4jxNWXBOgUmDsN5FrIM5xi4lIHgNe7q51Pdi4pGni-t2ntA5ids5LxRVPUj5OSJ2Kcl14st"),
      s("skin-79472cd37595","SG 553","Cyberforce","milspec",0.47,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-QF2WV0-h5ouJscCW6khUz_Wjdntr6Iy6WbgEjA5MlRedctxG5kNKyNbi3sgTfi9oUnyj9234b5n51o7FVairOMAY"),
      s("skin-e5141cf036fa","Tec-9","Rebel","milspec",0.6,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SJuKWC2OfzNF6ueZhW2fgkU0k5GmBzIn6eHjBagBxDZMhReYN5hC5ldbgNb7jtFbfgt5Ey3_3kGoXuRiiuNrn"),
      s("skin-e4cd5a266934","M4A1-S","Emphorosaur-S","restricted",2.05,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj-dsSi26mxoYtS-AlJXgHifOOV5kFJt4F-8KukXtldyyMLjjtVOIjIsWzXj8iylJ5ig6tbsKV_ItqaaB3gHfcepq28_00F4"),
      s("skin-99526dbb85e6","Glock-18","Umbral Rabbit","restricted",2.42,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-eAWie_vx3suNgWxa_nBovp3PXyo76Ii_FPAQmDMYiTLYDthm_kdbmZry2slCLjoMQzC7_3y1J7nts_a9cBi_qumx0"),
      s("skin-7815c7fae965","MAC-10","Sakkaku","restricted",2.17,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-AD2ybwOVjj-xsSyCmmFMk5mnRzdeqdSnCPVN2DpV3QeELtELrlIbiPrzqsVOMjdlBnySvjH5O8G81tOTP5a5f"),
      s("skin-f1184959b60b","R8 Revolver","Banana Cannon","restricted",1.61,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2pe5t_eM-RD2mRz-9JvOhuRz39kU4msjzdmd6peXKTOFd2DcchEOEP40btlt3lN7iz5FbeiNpFzi_83zQJsHgWY2btRg"),
      s("skin-2e0afbc14204","P90","Neoqueen","restricted",2.03,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf-jFk_6v-V6poL-GGC2Ke_uJ_t-l9ASyyxhl04zuDn4muInOXPAF2W5shQOAMs0G7xNfkZOuwswbej4JDnyvgznQe6S6_YqA"),
      s("skin-d42f9ca97ef6","AWP","Duality","classified",11.52,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6hkLfKcMXSewOVzj-1gSCGn20p_62-HnN7_cH-XblQjDZYhR-FZsETqmoXjYry2s1DX3d5AyyT62ipXrnE8bpg5yZk"),
      s("skin-f04de3b20f62","UMP-45","Wild Child","classified",7.89,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1Y-s27ZbRSI_yGGmSY_uV_s-pWQyC0nQlpt2iHmNyqd3KVOlB0D5YlTeZb5xjsx9PjZOjl4VCNgt1EnC77iSMf7jErvbhWyVIDbA"),
      s("skin-c36fdc469906","P2000","Wicked Sick","classified",10.09,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMWOVwuJ_vuRWQyC0nQlp4jnTyNqodHyXOlQkDZtzF-UN4BjukYeyZuLn5Qbaj4NEzy3_3ywd5zErvbh-3lU8Iw"),
      s("skin-1aba3ea9ecc5","M4A4","Temukau","covert",28.74,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSNPWeG2yR1NF6ueZhW2ewlBtx5W6AmYv9JS6XaAV1CJEmTeUL4UTpxNzjZO3jtgaIjN9ExCuskGoXuRnyRhBA"),
      s("skin-1f95db2031e4","AK-47","Head Shot","covert",39.65,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV6xoIfSsHW-f1dF-v-1mcCW6khUz_TzRnNigd3-SOg4lAsF1QOQN4xS4wdHnMu-0swaMjIxExSSoiyof6ih1o7FVGHIdVhw"),
      s("skin-7b51c8bd957b","★ Driver Gloves","Imperial Plaid","gold",233.37,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t9LPGaCliA1PxmvORWQyC0nQlp4W-Hw9-ocy2fbwB2X8YkFucCtRe4xNzhYrjl4Fff39lMyn78iiJLuzErvbgqDAMwGQ"),
      s("skin-ead101bfb2c9","★ Driver Gloves","King Snake","gold",213.58,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-LvGYC3SbyOBJp-lgWyyMmRQguynLz4r6Iy7EbFchApNyR-dbtEbuw4XkN7jq7gHdjtoQzi37hiwYvytvt_FCD_Ql24JgJg"),
      s("skin-5e8f5f1fecb1","★ Driver Gloves","Racing Green","gold",205.73,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-NPmHDW-VxdFxouRsQRa0hxg-jDGMnYftb3mXblQnWJclRuNYtETux9DlYr-wtVaK2IsTmCT-jC4Y6ihjtr0FUaA7uvqAQikoKDk"),
      s("skin-56be8a3a2bb8","★ Driver Gloves","Overtake","gold",110.31,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-NPmHDW-VxdF0vOBqRBa8hxwptDi6lob-KT-JOwYkXppzQO4OsRbqltfiMOvm41TYi44XySqqj35OvS4_57oKA6cl_LqX0V9d-bhOMA"),
      s("skin-a4133c8cedcb","★ Hand Wraps","Cobalt Skulls","gold",112.31,"@IGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqhsmsS-MmbD7LT7CAUV7T84sBohW60fg1srnZb6zsw2Ng41MmST43C1L7is9574CBKIh_q2Big_IMOdutcNRd_iuU13QD7PQAmaY")
    ]
  },
  {"id":"case_recoil","name":"Кейс «Отдача»","subtitle":"USP-S Printstream и Перчатки","category":"base_cases","price":1.85,"accentColor":"#F59E0B","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnMVu6b-avA-JqSSCjSWwuhz47U9TCzlxh9yt2WGnNqgIi-fbgUkWMNxFPlK7EdIJF6a2Q"),
    "items": [
      s("skin-14669f15615e","FAMAS","Meow 36","milspec",0.46,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2oaalsM8-QAXWA_uNzv_ZWQyC0nQlp6jvVztaudCnEbAUgDsckFOAJsBLtlN2yP7zqslGMiooXyCX43H8Y5zErvbiVlZtU7g"),
      s("skin-8300d759e7a9","Galil AR","Destroyer","milspec",0.49,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWOV0vpkv_hsXRa_nBovp3PWwougcHvBP1IpWJohEOdc5hLrwNTiZbjh7gbaithNnnqsjX4f7y8-_a9cBt1aCBEk"),
      s("skin-35998e06d00e","M4A4","Poly Mag","milspec",0.28,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSJfyaGmKv1e91pOhqTiWMmRQguynLzY2pIi2QawR0CpdwTOdeuhXrw9XjZeq04QLYjIlFxSz9hn9MvCw44vFCD_Q07cip4Q"),
      s("skin-cf8d25d8a85c","MAC-10","Monkeyflage","milspec",0.66,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-eAWmbxPdwvOBuSha_nBovp3OBzdisJHPDaQ5xXpF2Ru4M5BTtlYHnYr7h5lbZg4gQzC_22ikfvSZt_a9cBiKJuAuZ"),
      s("skin-128166c2642e","Negev","Drop Me","milspec",0.74,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-QAmKR09Flu_hWQyC0nQlpsDnVy4mpcSiQOlB2CJRxR-AK4BDrw4azN-225lfc2t0Tznr6iX4f6zErvbg1B8-kIw"),
      s("skin-de854ad43079","UMP-45","Roadblock","milspec",0.58,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1c_M27ZbRSMv-SCmWczu19j-1gSCGn2xgi5GnWmdmodXyUbwUhA5RyF-FcthS8w4ayMrjgtAzX2t9Byir83HtXrnE8YWMltLM"),
      s("skin-2a4119de0db9","Glock-18","Winterized","milspec",0.36,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK8-WAm6ExNF1sexmcCW6khUz_W6Azdn6eCrBalcjXJpzE7EO5xa_l4DuNu6ws1Hb2IgUn32si39B5y11o7FVC5qcAFg"),
      s("skin-ab0f49fac59d","R8 Revolver","Crazy 8","restricted",2.3,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2pe5t_JeacAnGV09FmpfN5QyyMkBEupzi6lob-KT-JZlJ0X5MhEOFcthO9wIHuZrng5A3XgotFmSv82ClAuHo46-wHU6p38rqX0V9gOeDH5A"),
      s("skin-302f05527562","M249","Downtown","restricted",2.16,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiFO0P_8PP1SJP-EAHGf1etJvOhuRz39wUh-5GuGz4mrJHuSbg4jWJp1FLINsRCxwdDuZezm7leK3d5GmSr_jTQJsHj3YwoNRA"),
      s("skin-9acc418fe0ad","SG 553","Dragon Tech","restricted",1.28,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-QF2WV09FyouBuQCeMmRQguynLw9ygIHnGbgYlDpciEeBYsEPux9ThMuOz4ACLjY1FmX-viitMvCZp5_FCD_QeAJd5TA"),
      s("skin-e2b145a9faa7","P90","Vent Rush","restricted",2.56,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf-jFk_6v-V7BsLvefC2OvzedxuPUnTXywwElz52XXzIz4dn2RalcoC8FzQrJfsRe-moG0YeK2sQPZ3YpEmzK-0H18Z6zceQ"),
      s("skin-459ac0342b48","Dual Berettas","Flora Carnivora","restricted",1.88,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s2qfaVhH_WfB3OV0tFzpuhlcC-_mg8mjDGMnYftbynGOA4lDZd4FOZYuxi6kdPvZuLrsgTW2IIQxXn7iSNJ6ic96-YCB_I7uvqA4cV5qzc"),
      s("skin-f10cd3871578","AK-47","Ice Coaled","classified",8.7,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-UGm-Zz-llj-1gSCGn2x4l5z_RyNj6JXnEbgFzXMYjEOUIsBe5m9exP-zg4leMj4pGxXn7jCJXrnE84asPq_0"),
      s("skin-5f1071439b89","P250","Visions","classified",9.65,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiVI0OL8PfRSNvmAB2ie0tF6ueZhW2fmzERx5jyHm4v_dXvGaQR2WJF2QrIMsxW_w9PvN-zhtgXXiokWn3_6kGoXuc_iGAKZ"),
      s("skin-6f81f65a9d91","Sawed-Off","Kiss♥Love","classified",5.12,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZt-IeeWCmiWx9F9ufJ6QyalkCIrujqNjsGoI3-QZwZzD5F5TbUDsBi_xtW1NuqwsVaPjoxFmST93ClI6S1osuYDT-N7rb6xkGzX"),
      s("skin-be37abed2b4d","USP-S","Printstream","covert",34.15,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_v5kue99XD2hkBwqjDGMnYftb3yUPFR0XsNyRrNc5kO5ltziMenr5lONj4kXyi2riywc7y9o5LtQAqQ7uvqAkScWnv4"),
      s("skin-3a4cc2c7a86f","AWP","Chromatic Aberration","covert",39.83,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6dlMv-eD1iAyOB9j-1gSCGn2x50tT_Tm9f4cXORPA4oWJckFOMLtha_x9e1Nu-35QfbjYtHyiythitXrnE8ylr09zg"),
      s("skin-ac0c22b15c7c","★ Broken Fang Gloves","Yellow-banded","gold",136.66,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YozKMiYD3Hi3VMVFPWM4hFrxl-0XkzougWLa7sF2alYpAyX__iClA5ntstuoEUqUirKeG2w3IYrZo4JRSLa2vRRvdWhwJsa98BNe077TKBCc"),
      s("skin-27555a08b61e","★ Broken Fang Gloves","Unhinged","gold",171.07,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YoDOEkYrqKiLJAVR8W8ErKrtT5Uj8jNfuN-2wtgeNioNDxS7_jS4av31j5L4CVqV0rvLTigzCNeE5tZkCJqm5DUPZGadTirc"),
      s("skin-a371f5d8dddc","★ Broken Fang Gloves","Needle Point","gold",80.69,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YtTGKiI71HifOOV5kFJQlQbUL4RHukofjY-227wDaidpHnCqs3H5K6So95ekLVKck__bW3Q_fcepqSI673wM"),
      s("skin-82516a2fa315","★ Broken Fang Gloves","Jade","gold",184.96,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YvjiRm4PwIhTALFN1VP0sHLBS9g65w9exM-Pl5gaKidkRziX22yNIv306571QA6pwrKGDiluTZLxs5ZdXOr_5GlzOqAIa"),
      s("skin-30ad2640a228","★ Driver Gloves","Snow Leopard","gold",174.11,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5tnIfeGD3Wv1uZ_pORWQyC0nQlp4TnUw9f6J3PCOw4oW8ZxRuEOshK8l9fgZbnqswHX3owXmSisjCIfuzErvbiEoDwfJQ")
    ]
  },
  {"id":"case_fracture","name":"Кейс «Разлом»","subtitle":"Desert Eagle Printstream и Ножи Скелет","category":"base_cases","price":1.79,"accentColor":"#38BDF8","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fr3QV7aD7OP01IfbGDzPCmbsm4LU5GnvkzUsi4WvUmIqtci_CPQNyApsjE_lK7EfrhW545A"),
    "items": [
      s("skin-2c80164190d1","Negev","Ultralight","milspec",0.54,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-GAnOCwOJ_t-l9cCW6khUz_WSAnNj_cX6VZlQlX8Z0TeVc4RG5w4ayM-2w5wzYidhGyXr-iC0f6Cl1o7FVuI8WfEM"),
      s("skin-d45805538999","P2000","Gnarled","milspec",0.64,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PO_V7Q_cKDDMWuf0vpJp-57Qy2MmRQguynLyt38dXjDaA5zC5YlQ-Nc5BG5k93mP-jhsVeKiY8XmSr5iy5J7C1s6_FCD_TbNBDIDw"),
      s("skin-d4fffad08ab6","SG 553","Ol' Rusty","milspec",0.63,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1c_M29b_E4c8-BG3SE2NF6ueZhW2e3xxt35GzSw9_8J3yePFIpCMEiRrJZukO7x4exZLiw4AGLiNgRy32rkGoXuZqsEgp2"),
      s("skin-4bcbe71aa61d","SSG 08","Mainframe 001","milspec",0.64,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-eD26ex_x3veRWQyC0nQlptzjSntqgJS6Wbg5xDZVwTbUN5EO5ldWxYem04waP2IsUyX_5in4c6zErvbh54g-58w"),
      s("skin-94b035806a51","P250","Cassette","milspec",0.59,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSI_GAHWKE1etJvOhuRz39lkwltT7Ww4ugc3PGOwd0DpQkQbUPshbpm93lMuy25QGIjIwUn3_72DQJsHjyHnRH0Q"),
      s("skin-7e9cf6e60b9f","P90","Freight","milspec",0.72,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf-jFk_6v-V6diLuSSB2mV09F6ueZhW2fhk09ytjmDm4n8JHOebQEgCMAmQrEMuhi4k4W0MurntVHfid5GnC38kGoXuRB1lB54"),
      s("skin-aba458e888aa","PP-Bizon","Runic","milspec",0.73,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1c_M2sYb5iLs-bC2uc0-9_tOR7cCW6khUz_WiGm42pJXyUPwFzXJJxRrZf4xS7x4fvN7ix4gHX3o9HzX32hipBuyp1o7FVwd1bSh8"),
      s("skin-0fd1ba0e61e0","MAG-7","Monster Call","restricted",2.54,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiFO0P-vb_NSLf-dHXOV09F1se1lcCW6khUz_WncmIz8JHmTa1JyApd5FLEMsES-kNDhM-3i5QKM2Y5AzSr9jngY6Cp1o7FV7cAHRyI"),
      s("skin-609ca5fc7896","Tec-9","Brother","restricted",1.97,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiVI0Oara_1SJ-WWHG6cze9JvOhuRz39xBsj4GmEyt-vIHjEbgJ2CsR2RONfu0K_lYXvZrjg4ADYg4wXzin42DQJsHgTPX1sbQ"),
      s("skin-c16825526581","MAC-10","Allure","restricted",2.06,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-aHWifz-B3j-1gSCGn209w626GnNuucC2SaFMiC8B3FuUJ5kW7wdPnZe7g7gyP2Y4Ry3_5hnlXrnE8RS4Y9Xw"),
      s("skin-736275bed39d","Galil AR","Connexion","restricted",1.75,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMXeYzut4uflWQyC0nQlpt22Dzd_4cS7Db1NzDZYkQuIKsBW4xt3jPurq7gPag4oXnCqrhipB7TErvbi_0k78nw"),
      s("skin-527de8ce168e","MP5-SD","Kitbash","restricted",1.94,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePF-JM-ED3SExOJ3vuVWQyy0lB4-jDGMnYftb32XZ1NyX5B5QuJcthi7k9K0Ye6zsQeP2IMRyiX4iSJLvC5q6-4HUaY7uvqAsG-atjE"),
      s("skin-1e9229953491","M4A4","Tooth Fairy","classified",6.96,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSMeWWC2mWwOdkqd5lRi67gVN35WyDwtv8IC-RblVxCpchQLIOuhK8xNG2YbnktAXZjthFxCiohntP8G81tOVu8Qhw"),
      s("skin-6e390882e9a0","Glock-18","Vogue","classified",6.5,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-WF2KTzuBiseJ9cCW6khUz_T-GyNavdCqRawN1CMFwTOcO5hO7loXiY-zmsQKPi44QzHj22ikcvy11o7FVfFOBmfY"),
      s("skin-daae504f859c","XM1014","Entombed","classified",6.82,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7OeRcKk8cKHHMWad1OJzpN5rQzy2qhEutDWR1N-hI3yWbVRyD8YiEOVZ50TqmoKyZb7rtVfWgosQzX7-3X9K5yc4tr4cEf1yVvkijss"),
      s("skin-32a30647e564","Desert Eagle","Printstream","covert",35.83,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ8-DHG6e1f1iouRoQha_nBovp3OGmdeqInyVP1V0XsYlRbEI50a5wNyzZr605AyI3t5MmCSohylAuC89_a9cBoMY9UkV"),
      s("skin-dfd42a079f44","AK-47","Legion of Anubis","covert",29.49,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIf6GDG6D_uJ_t-l9AX_nzBhw4TvWwo6udC2QbgZyWcN2RuMP4xHrlYDnYezm7geP3d5FyH3gznQeY_Oe4QY"),
      s("skin-vanilla-weapon_knife_outdoor","★ Nomad Knife","Classic","gold",139.65,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2hfbBpL_-BQDPEw-hz57cxTnCxkEh_5jnVzor8dymXbgAiAsFyEOEMsBW8l9O1Ne38p1uJmh0Kkm0"),
      s("skin-47d49e017564","★ Nomad Knife","Fade","gold",120.16,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GSMWGRxetJvOhuRz39wUUksW7Vm4n7d3yUO1InXsdxTeQDukO4l9zuN7_j5QzYjIlFy3n6jDQJsHjNMoy1vA"),
      s("skin-f18965313816","★ Nomad Knife","Crimson Web","gold",169.83,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_iKMXCVw_1JvOhuRz39xEV_sT6Bn9mueX3EP1QjApd4QbZe5EW6wIDmNO7islfW391EzCWt3TQJsHib9FqZhg"),
      s("skin-74f72ddc6769","★ Nomad Knife","Slaughter","gold",75.2,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GeMX2Vw_x3j-1gSCGn20R15TyGnNv_cS3GZlUnA5smTLEM4xDpx4bmY77h51OMiIJNziX53SJXrnE8R49sMsc"),
      s("skin-2f7326c83e40","★ Nomad Knife","Case Hardened","gold",113.95,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GCMWiZzetyj-1gSCGn2xhz5GyHwtr_dS7EOlR1DZtyEe8MsBO-xNKyNbnq7w3b2d8WzC7-jSNXrnE8rdGSE7w")
    ]
  },
  {"id":"case_snakebite","name":"Кейс «Змеиный укус»","subtitle":"USP-S The Traitor и Перчатки","category":"base_cases","price":1.65,"accentColor":"#10B981","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fr3oVvvT4bfI4dvTLCGTCmLl16ec7TX_mk08k42iHwtqscy-WPVUmCZJ4R_lK7Ed8Q6OYtw"),
    "items": [
      s("skin-fff2ecbae8e7","SG 553","Heavy Metal","milspec",0.28,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1c_M29b_E4c8-XC2aEyeNzpOBlcCW6khUz_W6Gw9aqcH3EOAUlCcR5Qu4J50O5ltbhMrnltgbdg4tDmSus3ClOuCp1o7FV59kcj5o"),
      s("skin-955f32e49387","Glock-18","Clear Polymer","milspec",0.64,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK8-DAWuJzOtkj-1gSCGn200h4TnQwtqoci_CPQYlDsAiRuZc5hK7kd2zZbm37lGK2o5HnH2v2ixXrnE85Jt4rDY"),
      s("skin-c6f056b9dbbc","M249","O.S.I.P.R.","milspec",0.69,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiVI0P_8PP1SI_-eDG6exNF6ueZhW2fhwB53smmAzIr_cy2fa1N0D5J0E-Je4BG_lt22N-63sQLYid0UxCytkGoXuS8jTKqZ"),
      s("skin-feea98c5ab41","CZ75-Auto","Circaetus","milspec",0.44,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2tcvM4H-ebB3Wc1ud4tN5lRi67gVN242-AzNuoIyieOg8lDJdyEeVe40TqxoDvZLixtVPZ2IhFmC333yNJ8G81tFbyihAW"),
      s("skin-cfdaf2a78083","UMP-45","Oscillator","milspec",0.22,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1a4s27ZbQ5dc-WAmKT1fx5p-B_Sha_nBovp3PTztuvd3jDOlMhX5IjR7YPtRTtx4XjNum2tQOLjItHmyj5j34b6Spt_a9cBq1OnGjK"),
      s("skin-503060091440","R8 Revolver","Junk Yard","milspec",0.31,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2pe5t_eM-BG3SEyud4t95lRi67gVMj4WTdzY2qcXjFbwUmDpcmTOEO5xC-x9XgYb7h71eM2dlMmCX_3CpK8G81tNsMj6E-"),
      s("skin-0c7be2632ca1","Nova","Windblown","milspec",0.35,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwjFL0PyhfqVSN_mdCliUyP1mtfN6TiWMmRQguynLnN_4JXyWbwN1CZN2QbEMthm6k9bjMemw7lTc2N4QySr7h38f7Hxp5fFCD_RpV_ibxw"),
      s("skin-24c6ed776121","P250","Cyber Shell","restricted",2.08,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiVI0OL8PfRSI-mRC3WDyet6vN5lRi67gVMl6mzUm9n8IHzCaQUmA5Z3RLJb4xC9m4bhMbzn7lOL2Y5Am3j73HxI8G81tOdaiAQT"),
      s("skin-bce9af58ff21","Negev","dev_texture","restricted",1.93,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-XC3GExPZipfNscCW6khUz_W_QzdmhJy7EOFAkWMdzF-dbtEK9moGyZbi37gTZi4xMxH36iipK73p1o7FVNCisfvA"),
      s("skin-d5acd24fcb47","MAC-10","Button Masher","restricted",1.75,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-DAXWEwOx6td5lRi67gVN04GjXnIr7JyiSbQJ2W8Z4QuEItBS_kdyxZurnsVfcjYgTzH6r2ClN8G81tG_8yXMP"),
      s("skin-337794166cad","Desert Eagle","Trigger Discipline","restricted",1.96,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ8-HHG6Xxutkj-VgXCq6hREuvTi6lob-KT-Ja1UlWMAkTOMCt0G9kIHlP77l5FbW344XxX_4iSJJv31r4bxRUKUn_rqX0V-d-rquYA"),
      s("skin-48e1c7c5df5e","AK-47","Slate","restricted",1.81,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSMOKcCGKD0ud5vuBlcCW6khUz_W3Sytb4cCqTOFUpWJtzTOUD5hPsw9a0Yrnrs1SK3ooXzy6shilM5311o7FVYrIufmI"),
      s("skin-6d14d557c648","MP9","Food Chain","classified",7.81,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_jdk4uL3V6JiL_SsDW-RyOBJvOhuRz39xB5-sGrTnt2tdymVOFApD8dxQLUCuxWxldLkNezjtVDd2t8Uyy_7izQJsHisCKzN8w"),
      s("skin-dad23c017c83","XM1014","XOXO","classified",8.99,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7uORcKk8cKHHMXeFz-VJvOhuRz39xE8j5GXQztepd3OUOwJ2C5JwELYKsULslobuY-7htlDditkUnyn73zQJsHgY6bTDGg"),
      s("skin-69f2e17b78f2","Galil AR","Chromatic Aberration","classified",4.81,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWSY0-F7sd55Rie4qhEutDWR1NivcH2VOAchC8B4ReZesxa5l4LlPu6z7wTa2IhHmCj4jyNJ7Sls4LscEf1yskqHCW4"),
      s("skin-7dc4b0b65850","USP-S","The Traitor","covert",37.77,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSJ-OsG3SA0tF-se9uSi2-lBMYvzSCkpu3eX7EP1MpApdwR-8NsxbukoXuNLnj4QOMiN8XzHn_iC8a7Spi4upRWb1lpPOCQNKXgA"),
      s("skin-c62d08aa8da1","M4A4","In Living Color","covert",17.78,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSLP-FC1icyOl-pK84GH2wxhty4DjcyNuhdHyXbAVxW8QjTbEMthC8kNa0MLmzs1Hbj95E02yg2bbWGcKW"),
      s("skin-ac0c22b15c7c","★ Broken Fang Gloves","Yellow-banded","gold",93.4,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YozKMiYD3Hi3VMVFPWM4hFrxl-0XkzougWLa7sF2alYpAyX__iClA5ntstuoEUqUirKeG2w3IYrZo4JRSLa2vRRvdWhwJsa98BNe077TKBCc"),
      s("skin-27555a08b61e","★ Broken Fang Gloves","Unhinged","gold",101.03,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YoDOEkYrqKiLJAVR8W8ErKrtT5Uj8jNfuN-2wtgeNioNDxS7_jS4av31j5L4CVqV0rvLTigzCNeE5tZkCJqm5DUPZGadTirc"),
      s("skin-a371f5d8dddc","★ Broken Fang Gloves","Needle Point","gold",98.82,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YtTGKiI71HifOOV5kFJQlQbUL4RHukofjY-227wDaidpHnCqs3H5K6So95ekLVKck__bW3Q_fcepqSI673wM"),
      s("skin-82516a2fa315","★ Broken Fang Gloves","Jade","gold",168.43,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YvjiRm4PwIhTALFN1VP0sHLBS9g65w9exM-Pl5gaKidkRziX22yNIv306571QA6pwrKGDiluTZLxs5ZdXOr_5GlzOqAIa"),
      s("skin-30ad2640a228","★ Driver Gloves","Snow Leopard","gold",162.79,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5tnIfeGD3Wv1uZ_pORWQyC0nQlp4TnUw9f6J3PCOw4oW8ZxRuEOshK8l9fgZbnqswHX3owXmSisjCIfuzErvbiEoDwfJQ")
    ]
  },
  {"id":"case_prisma2","name":"Кейс «Призма 2»","subtitle":"M4A1-S Player Two и Ножи Коготь","category":"base_cases","price":2.1,"accentColor":"#6366F1","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fr3cV6vT9avBvefWWDDGTxbZ14rhsTX7qkE90sDiHwt2pdC-TblJ2DsB1QPlK7Ee9riHKAA"),
    "items": [
      s("skin-42cc631beb8c","AUG","Tom Cat","milspec",0.45,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV7BlNf6XC3WD1eFkvd5lRi67gVMm5GrRzt2sJXqUag4kDZAmFuBYtUTslIXuPui2s1Hb2o4Wyir2hy1N8G81tF6C_jtH"),
      s("skin-29f83d73bb6a","AWP","Capillary","milspec",0.86,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JoKf6sAm6Xyfo44bE5HSrmlx5z4GTUzt__I3yebQAgA8R3FuFfsBTqx9W2Y7vq5lbfjZUFk3ugIlCuqg"),
      s("skin-9a5ab653ba62","CZ75-Auto","Distressed","milspec",0.81,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2tcvM4H_OWHGabzvpzj-1gSCGn208hsTyHw9z6eS2faQEoX5p1ELECtBi7xtG2Pr7j5APZjopDynj_iHtXrnE8XiCan1o"),
      s("skin-5293f56bb6b8","Desert Eagle","Blue Ply","milspec",0.71,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ_yWMXWV0eJ_s-BWQyC0nQlpsjzdwtqgIHqfZgAgDZBwROBbtRDsm4HiM7zislfYitpBniz6iy5K7DErvbjLUTqBnA"),
      s("skin-d536309c3714","MP5-SD","Desert Strike","milspec",0.56,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1Y-s2jePFSJPWAC3WE_v1iouhiSha_nBovp3PUzYyqdHKfOgJ1CpAhROQJukW4lYDuMr7jswfWjdpNyimsi35O53s-_a9cBg0oJUav"),
      s("skin-c31f180e6a50","Negev","Prototype","milspec",0.79,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-DHGiEzvpvoORWQyC0nQlp6juDydugcHvEawVxApB3F7JftxTsloDgZOqx51PY345AxXr33SNPuzErvbi5RDlayg"),
      s("skin-3c54e05cbb62","R8 Revolver","Bone Forged","milspec",0.28,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2pe5t_eM-fC3GZwPp-se9WQyC0nQlp5jmEydqpci2SaQdyDZEjEeFe4Re4wdznNu6ztgbWidkQzSz6jiJKuDErvbgK8jU85g"),
      s("skin-dd7837484577","P2000","Acid Etched","restricted",2.64,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PO_V7Q_cKDDMWaTyOpJs-1mWSyhqhEutDWR1NmhJH6VZ1BzCZtzTeQKuxe_x4fuYenj4Q3bgtkXyHn-iC5MvC864OccEf1ypheGRTI"),
      s("skin-db4ae843fbd7","Sawed-Off","Apocalypto","restricted",2.02,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZt-IeeWCmiWx9F3oO5qTiWqhQkojDGMnYftb3vFbVcmDsRwEOdbtkW4lIbiMOrh4FaIiYMQxXmoiXkd7n1o5b4AWKM7uvqARUQpSmk"),
      s("skin-803029f01b68","SCAR-20","Enforcer","restricted",2.23,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk6OGRe6dsMqLDMWKex-Fks-R7cCW6khUz_TmEn4qudiqVPVB0X5t3QbEN4ELqxNHlY-O27gCLg9oXmyqsjCtN73x1o7FVEvhkFhM"),
      s("skin-d00c49e52bd9","SG 553","Darkwing","restricted",3.04,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-XD3Wb1ud4t95lRi67gVN24D7WmN2sdSqSalAmDpR2F-IDtxTpkYKyZrmzsQffgtgXzSmqjSNA8G81tFvCRYkS"),
      s("skin-e5f08d307bdd","SSG 08","Fever Dream","restricted",1.77,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-VC3GV09FyouRoQha_nBovp3PTmYmqJHmeb1N1CpJyFOZftkO8x9ezNOOztg2MjYwRyyWsjn4d7n1q_a9cBq7gpQcW"),
      s("skin-45686ca4a063","AK-47","Phantom Disruptor","classified",7.54,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlJfA6H-CbD2mEzuNJtOh6XTyjgRI1jDGMnYftb3qTbQMpCZVxF-8Ku0Xtw4XkYu2xtQSL3d5FxSz-3H5Ovy895epRA6E7uvqAsbzZtpo"),
      s("skin-f5a050fa5280","MAC-10","Disco Tech","classified",8.21,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-dD2SCxNF6ueZhW2frkR5z4m_SyY37cnKRblIpW5smQOcO4EW7lYa1ZOjgtFCLg4wXnn72kGoXuTa4h8QB"),
      s("skin-a71a424b6eb1","MAG-7","Justice","classified",9.5,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiVI0P-vb_NSKuWAGm6TxNF6ueZhW2fikUt36znWyNz_dn2ROgMhD5EiR7EO5BKxl4DlMLyx7gyNi4hAniz5kGoXuQ9OXJLa"),
      s("skin-4dd5dccd2fdd","M4A1-S","Player Two","covert",42.82,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj-J6SCbhxUl_jDGMnYftby7BbVdyCsB0EeZY4RPukNfhZOO2sQ3W398Qy3_6jHxIunptsO9TUqs7uvqAAWrfZoM"),
      s("skin-3596d60709cc","Glock-18","Bullet Queen","covert",19.67,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK6HLMXCR0-N3ueVsQRa_nBovp3PQydf4dXuSalUgCJZwRrILthi9kYDlMe_m4g2Ij90Um3moiXkc6SZj_a9cBgLxwlYC"),
      s("skin-vanilla-weapon_knife_gypsy_jackknife","★ Navaja Knife","Classic","gold",102.46,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2pcbR-Oc-ZD2SbyuB_tuQnGXu1kBxw62_dwtird3qXZwQgXJV0E-4PtESxl4ezYr6x4FaMjI4UyzK-0H1iy36efQ"),
      s("skin-39fd7c139081","★ Navaja Knife","Marble Fade","gold",198.29,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWQiihlxEijDuEnorGLSLANkI-DpolR7Vf5hK5kdTlNbiwsg3YiNlCm3mq3Cgd6iZusetRUPJx-qTT2xaBb-MDauzVhA"),
      s("skin-f69247021864","★ Navaja Knife","Tiger Tooth","gold",97.19,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJse9WWyC0kA8YvC-ElIj8HifOOV5kFMMlRLJf4BK4k9LlZuy35QTYg95NzXmri3tB6yk4sO5XBaoh_PDRhgHfcepqTt5nFFY"),
      s("skin-3b5885a4c77d","★ Navaja Knife","Doppler","gold",179.2,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWXTyxjCIqsi-HlorwOy7DAVp5Xco0W-cMsRO5x92yMe3r51Pd3d5Nn3isiy9LvSli5OZRAqYmq6OEiAuQZeIjoc5Uu2hkHeU"),
      s("skin-b790da07f599","★ Navaja Knife","Doppler","gold",216.31,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWXCijhRUuoTi6l47rIyfCN0x1Xv0sHLBS9g6_m4GzMr-xsgOIidhMyC743C1O53ti5ecCWPAmrqeCjg2QNbU06ZBROr_5GjZZEpGb")
    ]
  },
  {"id":"case_prisma1","name":"Кейс «Призма»","subtitle":"M4A4 Император и Ножи Стилет","category":"base_cases","price":2.15,"accentColor":"#8B5CF6","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fr3AV6aD8O6BpdKKQVmPEwr1zs-c8Tnngl09w52zTmY2sc3jBag8jXpohE_lK7Ede7E2Kfw"),
    "items": [
      s("skin-c5816102c9ab","FAMAS","Crypsis","milspec",0.4,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I_82oaalsM8-UBmiD1dF_vvJsTD2gqhEutDWR1IyudXKSOFIkC8QhTbEK5kK8x9C2NOK3slbYg48Rnyr_hixI6i85sr0cEf1yzP52oWI"),
      s("skin-9a7c16468868","AK-47","Uncharted","milspec",0.37,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIeqHC2SvzedxuPUnFnCwwBl_5D_Syon8dnyUaQUlD5oiQ7ECuxW7l920ZL-w4AfX2IlByTK-0H0PRM7cOA"),
      s("skin-1541026f04e1","MAC-10","Whitefish","milspec",0.53,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1c_M2jaac8cM-VB3SY_ux3ufVWQyC0nQlp52jdwt-vdnyeP1QoDZQlTeQNtRO-w4e1ZeKzswCM2INHynn3hixPujErvbg9KuBZSA"),
      s("skin-ea691ab700a8","Galil AR","Akoben","milspec",0.59,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OG-V6NsLPmfMWabzuxzvt5lRi67gVMlt2_dzd6qcH2TOgN0CpIlE7Ve5hbukdW0MrixslPW2IgQzyv8jypI8G81tJzCUipD"),
      s("skin-5c41a3861543","MP7","Mischief","milspec",0.46,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_jdk4uL5V7ZsI_uWGmKV09F6ueZhW2fnlE5x52Tdz4mscn6XOAFzXppyQ7RZtkTpwNzuMejn5wyPjYoTy336kGoXuS747mDn"),
      s("skin-a29bf383aa7d","P250","Verdigris","milspec",0.88,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiNK0OL8PfRSNvWBCm6X0-dlj-1gSCGn20R35DnRn42udXiVOg91CpZ4ReACthC4wYexZuuw5VeIjdkUzyqq3CNXrnE8Cr6wnKw"),
      s("skin-b37ee36feb54","P90","Off World","milspec",0.31,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_jdk_6v-V6trJuecHGuU_uJ_t-l9AS_jwBwisG3SzN-rcX-SbA4lCsR4R-EDuhi6wIG1NuzjtFba2N8WxS3gznQePPXjzOg"),
      s("skin-d6cf8565026b","AWP","Atheris","restricted",3.05,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JkMPWBMWuZxuZi_rZsS3zgzU8isW3dnIr6eHKfPVAhDpojEe9YsUW4xta1Nuzm5FDci4NbjXKpmWVQppo"),
      s("skin-c310cd1bc7ff","Tec-9","Bamboozle","restricted",1.43,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SIvGeDGif_uJ_t-l9ASi2xxhzsT6Emdr6JCqTPQJyXpR4RLMI5hm_wNHjZe3r5Qzci41Dy3jgznQeOWU5G3g"),
      s("skin-2a0e222beb58","Desert Eagle","Light Rail","restricted",2.36,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6OGRbKFsJ_yWMWKIztF6ueZhW2fhlhlw6m-GnNyvIiiXOwQoDMR2QbZe5hi5k9KxN-vhtFbciN1FnyqskGoXuU4JtHUo"),
      s("skin-640691d10403","MP5-SD","Gauss","restricted",1.61,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePF-JM-SHXOCzuN3pOhqcCW6khUz_WzTzYmhJXuSaANzW8EkQ7JZ4BjsxtSzYezr5lbfidlEzC-vjnxK7ih1o7FVYPX5q0o"),
      s("skin-b720620ba156","UMP-45","Moonrise","restricted",2.58,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1a7s27ZbQ5dc-eAWie0-dltd56WiegkAkYvzSCkpu3IHzGbQFxCMByE7MJsxC6w9ayN-3ntgPf3YtGmX6tiyxM6X1pt-cCUr1lpPMz7bPahA"),
      s("skin-1a044032aec8","R8 Revolver","Skull Crusher","classified",10.14,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2tfZt_JeacAnGV09F5oPF7Sjqgmg8YvjiBk5r0b3uSaQUiCsZ2E-EI5EKwldW2NOzqslffgopHxHj-jHxLvH4_tbwHWaQ7uvqApie1xz8"),
      s("skin-4280698b46ee","AUG","Momentum","classified",7.32,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk7uepV6liLfWdGnKd_uJ_t-l9ASi2zUp042SBno6sICrFbFMnCZR5EedftkPqk9ayMr_j71fXjo8XmXrgznQeFjVtTWM"),
      s("skin-ee5f48068381","XM1014","Incinegator","classified",6.1,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7OeRcKk8cKHHMW6ewud4tfNoWyahqhEutDWR1NuuJXqWO1d0CsdyE-9ctxPpkYDmYr6zsgKLgt5NnC33in9B7idi4u8cEf1ypt9Mlvk"),
      s("skin-f971772d4996","Five-SeveN","Angry Mob","covert",35.81,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC1iDxPhzvt5oQS6hjCIrujqNjsH_cy2RagUjA8BwR-de5hjskNflNrnqsgaLiYgRyyythitM7Hw-sekKT-N7rXEld5dH"),
      s("skin-8c5b9b7ce9f2","M4A4","The Emperor","covert",39.1,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSJf2DC3Wf09F6ueZhW2exwBh_6m3dnt36InjDPQ4oXJt1TbJeshW_mtfjN-vrsgaKiokWy333kGoXuRj4z9Nd"),
      s("skin-vanilla-weapon_knife_gypsy_jackknife","★ Navaja Knife","Classic","gold",157.75,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2pcbR-Oc-ZD2SbyuB_tuQnGXu1kBxw62_dwtird3qXZwQgXJV0E-4PtESxl4ezYr6x4FaMjI4UyzK-0H1iy36efQ"),
      s("skin-39fd7c139081","★ Navaja Knife","Marble Fade","gold",156.81,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWQiihlxEijDuEnorGLSLANkI-DpolR7Vf5hK5kdTlNbiwsg3YiNlCm3mq3Cgd6iZusetRUPJx-qTT2xaBb-MDauzVhA"),
      s("skin-f69247021864","★ Navaja Knife","Tiger Tooth","gold",156.03,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJse9WWyC0kA8YvC-ElIj8HifOOV5kFMMlRLJf4BK4k9LlZuy35QTYg95NzXmri3tB6yk4sO5XBaoh_PDRhgHfcepqTt5nFFY"),
      s("skin-3b5885a4c77d","★ Navaja Knife","Doppler","gold",200.17,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWXTyxjCIqsi-HlorwOy7DAVp5Xco0W-cMsRO5x92yMe3r51Pd3d5Nn3isiy9LvSli5OZRAqYmq6OEiAuQZeIjoc5Uu2hkHeU"),
      s("skin-b790da07f599","★ Navaja Knife","Doppler","gold",176.09,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWXCijhRUuoTi6l47rIyfCN0x1Xv0sHLBS9g6_m4GzMr-xsgOIidhMyC743C1O53ti5ecCWPAmrqeCjg2QNbU06ZBROr_5GjZZEpGb")
    ]
  },
  {"id":"case_clutch","name":"Кейс «Решающий момент»","subtitle":"M4A4 Neo-Noir и Перчатки Vice","category":"base_cases","price":2.95,"accentColor":"#EF4444","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frHsVtqr8a_dsdKTAWDWVxLgjsrAwHSvgwEQk4m-ByYuqIC2eO1VyD5QiR_lK7EcxQQPYQA"),
    "items": [
      s("skin-906fd7b3b38a","PP-Bizon","Night Riot","milspec",0.53,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1Y-s2sYb5iLs-BB2iE_uJ_t-l9AXqxzUQisWTWz9egc3KWbAJ0XJt5Q7YN5xnuxNDiN7iz4waLgtkWzS7gznQeDJdgNeg"),
      s("skin-42a677e4f00a","Five-SeveN","Flame Test","milspec",0.42,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRb7dSJvmFC3SV1-t4j-lmWxahmhkYpTSKlortHifOOV5kFJt1FOVYsBC_lobmNe3q4AOK3dhDnimrhyoa7i9ssO4CU6F0rvWBiwvfcepqcNk1MwM"),
      s("skin-cbffebebb7f3","MP9","Black Sand","milspec",0.85,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_jdk4uL3V6ZhIfOYMXSRz-pJvOhuRz39xxsj5GWDn9z6d3rCOFV1CJpwTO4IsEG8x4WzPr6xtlTZ2YlEzX-vhzQJsHjCKAg7iw"),
      s("skin-87386812a8f9","P2000","Urban Hazard","milspec",0.94,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMXKCw-94j-loVSihkSIrujqNjsGsJXnFPw4gCcZ1TOIPt0LukoG2ZuqxtAXaj4sTzy6q3SpN7C9u6-YCT-N7rcTI-daA"),
      s("skin-a70d55eb979d","R8 Revolver","Grip","milspec",0.85,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2pe5t_JeacAnGV09FiouRoSxa_nBovp3PTwt-hJH-WbFMnWJdwRuUPtEG7k93iN7uw4wLf2I9FxCr733hBvXxj_a9cBlQvB05B"),
      s("skin-cb5484f7948e","SG 553","Aloha","milspec",0.75,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I_829b_E-c8-SAmiYwNF6ueZhW2fjxE5x5W_SnNz8eXmQaVN2WJUmF7RZuhS8wYbiZeO04VPa3YlCmHr7kGoXuWs6bs2V"),
      s("skin-ae8080ca847c","XM1014","Oxide Blaze","milspec",0.67,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7OeRcKk8cKHHMWiIyOpzj-NlTjO2qhEutDWR1N-tJ3zDOFAoDZMhRrNbsUa_x9fuMrvrsgDW3YJGxHn22ixO6C9j5uscEf1ygXv9Ksw"),
      s("skin-52971a3886a2","Glock-18","Moonrise","restricted",4.13,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a7s2pZKtuK8_CVliF0-x3vt5kQCa9qhsipTiXpYPwJiPTcANzXJNyFOEMthXsktHhMLzl4FaK3toWn3iqhi9BvHw9su5UU6Zw-_bJz1aWcX-Jd_0"),
      s("skin-58651a482529","Negev","Lionfish","restricted",3.44,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1I_82gbaNoNs-fB2iex-dluN5lRi67gVNx62XXzI74InPGbQMpDpMiRLMOsRG4lNXvPuritFeN3YpMzSSo2yhN8G81tOHyHega"),
      s("skin-85bee1ae1898","Nova","Wild Six","restricted",1.96,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiVI0PyhfqVSIf6QBmiCyPpzj-1gSCGn20t-4jnUzI7_IHifblIpDJJzF7UP5kPpxtHgMu62tAPZjY4Ryn72hnlXrnE8sT3rGLc"),
      s("skin-f0063cb51e43","MAG-7","SWAG-7","restricted",3.33,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiNK0P-vb_NSM-eSCTCvzedxuPUnHirhkxhxtzvRzI38dnLEOlQnW5N1F-FZtRG6kYLvPu205ADaj40RnDK-0H0F4y2tgg"),
      s("skin-a4ca18460f2c","UMP-45","Arctic Wolf","restricted",2.58,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1Y-s27ZbQ5dc-EBm6ExNFwse9ucCW6khUz_WiGzY6pJyjCZwN1A5p5Q-MCuxa7ldW0Ne3ntQHW2YpFmSv63S1B73t1o7FVFkKgM50"),
      s("skin-808553c51871","AUG","Stymphalian","classified",13.93,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV7d5Of2DBmacyO94j-NgXS2gqhEutDWR1Iz6cnqXOA8mD5shTOEPuhm-moHlZLnj4gLWjdhEzimr2n8bvC5q4e8cEf1yYjdCpmM"),
      s("skin-c41637779316","AWP","Mortis","classified",8.28,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6BoIeSbMWuZxuZi_rNtHiuwwRwismWEnNn8JymSZgUiDpd3Ru9ZsxG-xNy2NLzn41DWg41bjXKp5oOAt0A"),
      s("skin-3901933d5e47","USP-S","Cortex","classified",12.33,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_u1jpN5lRi67gVNz4G7Qm938cS_Da1AhXpB1EeVb4xm4mtDjN7vj4A3b2NpGyCr52i4Y8G81tMzdoYZ7"),
      s("skin-e8144faeae9f","M4A4","Neo-Noir","covert",32.19,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSLvWcMWmfyPxJvOhuRz39wE1142vSztmvInvBOgV0W5R1FLYNuxW4wIbgNrmx4g2Kj4tMmCX93zQJsHgJr0dqFw"),
      s("skin-d11a70424dd7","MP7","Bloodsport","covert",46.08,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf-jFk4uL5V6ZhL_-XHXef0_pJvOhuRz39lxsk4W3Ry96pIHrFOgElDZN2Q-9etUSwk4LnYu3h5wLejYwWxSr43zQJsHiIGMoJQA"),
      s("skin-7b51c8bd957b","★ Driver Gloves","Imperial Plaid","gold",117.77,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t9LPGaCliA1PxmvORWQyC0nQlp4W-Hw9-ocy2fbwB2X8YkFucCtRe4xNzhYrjl4Fff39lMyn78iiJLuzErvbgqDAMwGQ"),
      s("skin-ead101bfb2c9","★ Driver Gloves","King Snake","gold",288.2,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-LvGYC3SbyOBJp-lgWyyMmRQguynLz4r6Iy7EbFchApNyR-dbtEbuw4XkN7jq7gHdjtoQzi37hiwYvytvt_FCD_Ql24JgJg"),
      s("skin-5e8f5f1fecb1","★ Driver Gloves","Racing Green","gold",135.15,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-NPmHDW-VxdFxouRsQRa0hxg-jDGMnYftb3mXblQnWJclRuNYtETux9DlYr-wtVaK2IsTmCT-jC4Y6ihjtr0FUaA7uvqAQikoKDk"),
      s("skin-56be8a3a2bb8","★ Driver Gloves","Overtake","gold",195.76,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-NPmHDW-VxdF0vOBqRBa8hxwptDi6lob-KT-JOwYkXppzQO4OsRbqltfiMOvm41TYi44XySqqj35OvS4_57oKA6cl_LqX0V9d-bhOMA"),
      s("skin-a4133c8cedcb","★ Hand Wraps","Cobalt Skulls","gold",319.31,"@IGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqhsmsS-MmbD7LT7CAUV7T84sBohW60fg1srnZb6zsw2Ng41MmST43C1L7is9574CBKIh_q2Big_IMOdutcNRd_iuU13QD7PQAmaY")
    ]
  },
  {"id":"case_dangerzone","name":"Кейс «Запретная зона»","subtitle":"AK-47 Азимов и Ножи Коготь","category":"base_cases","price":2.4,"accentColor":"#F97316","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fr3MVv_H4a6FucPPBWjDIkbdz4rg4Syyyxxsi5mzRntuvJCqVbwAgDZBwRPlK7EcZJ5GkQA"),
    "items": [
      s("skin-53d8377fc006","MP9","Modest Threat","milspec",0.73,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f-jFk4uL3V6diLP-dFzfB_uJ_t-l9AXGylx4ktmqAydmrInvBOAByWcN1EOUOtxe8mtS2P-vl4FaLioJMz3ngznQehlZuXhE"),
      s("skin-0b23f3cc7633","Glock-18","Oxide Blaze","milspec",0.55,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK6HLMWSf0_x5tORncCW6khUz_T_Xn9f6dnvDb1UkDsdwF7IItES6kYK1M-7k7wSI3YwQm3_63XlAvH51o7FVwJirs7M"),
      s("skin-3a61ea6e759f","Nova","Wood Fired","milspec",0.93,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiVI0PyhfqVSKOWdGmKC_uxkpfVscCW6khUz_WiByIr8IyiXbQYlD5d1E-BftxW_lNbgMb7n7gyM3tkXnimr3C1O6n11o7FVLv86c40"),
      s("skin-a5017daf162c","M4A4","Magnesium","milspec",0.61,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSI_icHneV09FxuO56Wxa_nBovp3OAzo2vdHPFPFUmCJRxRbNZ4xewx9W1Nb7j4gzXg99Ayy73iC1Aun1q_a9cBiEfMG3G"),
      s("skin-d85d77873f80","Sawed-Off","Black Sand","milspec",0.6,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZt-IeeWCmiWx9F0vOBqRBaglBMjjDGMnYftb3qSOAF2XpV0ELMJsUS_ldGzMO_isVHagt9Az32ojiob6Hk9sbtXB6o7uvqARF8zTjE"),
      s("skin-dd5985c30bd8","SG 553","Danger Close","milspec",0.37,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1c_M29b_E4c8-cGGKC_uZzsfVsSxa_nBovp3PSn4z_eH7Fb1V2DpckQeUJsRe8wNflMui0tVTX34MUyH2sjX8b7Xxu_a9cBmrf7Gwc"),
      s("skin-876587e47bdc","Tec-9","Fubar","milspec",0.45,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiVI0Oara_1SJuWRD3WvzedxuPUnGiq1xBh_4D6Bytmrcn_CaFUlX8NyR-5ZtBG7kdzgZe-z5gTb3o9NyDK-0H2rKvLQog"),
      s("skin-aa544d78f97f","G3SG1","Scavenger","restricted",2.99,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-AD3GRxutJvOhuRz39xkl2tziGmNf9JX-WPQcpAsEiQOUNsBixx4bmN7nj5FHb3Y9Cyiz-hzQJsHglCU9Y5w"),
      s("skin-21f65eaf09eb","Galil AR","Signal","restricted",1.65,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V6NsLPmfMXSZxuB3vN57Si2MmRQguynLnIqvIy-TO1UlXJMjEeAN4UGwk9DkZLnltgPYjYkTnCn6iy8buips5PFCD_QZl2QaUg"),
      s("skin-5bd6cfc7249e","MAC-10","Pipe Down","restricted",3.46,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1c_M2jaac8cM-WFmiv0edmtfJWQyC0nQlpt2rRwtqhdHjFa1N1A5ZxEO4MukW4lNayNrnhsVDc3YxGzir9iXkc7DErvbgEiQoeZQ"),
      s("skin-f0ba15d1b486","P250","Nevermore","restricted",2.86,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiNa0OL8PfRSJ-KSGGKUyOlxtfN6cCW6khUz_TjdmdeqdymfbVQlXpp0QuVYtBSwk9zmN-634gXd2tpCyH_2hipKunl1o7FVDpyoDiY"),
      s("skin-9e44f13c59da","USP-S","Flashback","restricted",2.5,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_uh6sfJhTSiwniIrujqNjsH6dnKfbAdxAsF3ELQCu0Hsmty1N76z71GIit4RySX_2CJI6yk9tucLT-N7rUYlhjC0"),
      s("skin-84a10128334c","UMP-45","Momentum","classified",7.13,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1Y-s27ZbRSIeKBAXCD_uJ_t-l9ASzrx0txsWiBydv4JCmSaFdzDJt0TOYN5hbtwYWzNerl5QeIj4IXyX3gznQeadzF8t4"),
      s("skin-a79b5b4ad623","Desert Eagle","Mecha Industries","classified",9.7,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6OGRbKFsJ_yWMWqVwuZ3j-1gSCGn20h042vSyY2tdyjCZwIlXJBxQeNe4EWxxoHkMOq0sQGIid5Fnyr42HtXrnE8p4gbgvE"),
      s("skin-aa2d649aeaf6","MP5-SD","Phosphor","classified",6.29,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePFSJvWAGm6GwOJJtPNgXxa_nBovp3PRzd-vdCqQOgYgCMYkRrECskLuwdfkZeqz5QKMjYwUnHj33SlI630__a9cBl0Wy4S-"),
      s("skin-09205674e246","AK-47","Asiimov","covert",33.38,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIeOaB2qf19F6ueZhW2e2wEt-t2jcytf6dymSO1JxA5oiRecLsRa5kIfkYr-241aLgotHz3-rkGoXuUp8oX57"),
      s("skin-7b1ef066823d","AWP","Neo-Noir","covert",22.51,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6poL_6cB3WvzedxuPUnHirrxR4l423SyI39I3KXPwdxWZclQeNZ5EXskYfnNeyw71OMi9lNzDK-0H3r66pOTw"),
      s("skin-vanilla-weapon_knife_gypsy_jackknife","★ Navaja Knife","Classic","gold",147.34,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2pcbR-Oc-ZD2SbyuB_tuQnGXu1kBxw62_dwtird3qXZwQgXJV0E-4PtESxl4ezYr6x4FaMjI4UyzK-0H1iy36efQ"),
      s("skin-b9e7dc445655","★ Navaja Knife","Fade","gold",247.97,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJseBWSSi3kCIrujqNjsH7c3qVOwV2DcZyQbQOukG5m4CyMeqz4laIgoxAnH_93Ckbvyw5troCT-N7rT3KN2DN"),
      s("skin-8a6e4435f652","★ Navaja Knife","Crimson Web","gold",172.52,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJuPhWWCyxhiIrujqNjsGtJS-eag4iCpN4QrZYsEK_m9K0ZLzl4gOLiYgQxSj2in9Buis_5OZRT-N7rdEUHJYn"),
      s("skin-4facadf19ddb","★ Navaja Knife","Slaughter","gold",118.39,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWVSyxhxwYvzSCkpu3JSjFaQR0WZFwFOFYtBLtl4e2Nrmz4FHci4tAxCT8iipK6yc6sekKUL1lpPNhGLzFnw"),
      s("skin-d3e9d06ca1c0","★ Navaja Knife","Case Hardened","gold",137.84,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsfBWQCC_kBkYvzSCkpu3eHKWaQ8jXpQkReZZtxa_x4HvYujh41HZg9pNzX2ojCJA7itpteYHBb1lpPM10bWGng")
    ]
  },
  {"id":"case_horizon","name":"Кейс «Горизонт»","subtitle":"AK-47 Неоновая революция и Ножи","category":"base_cases","price":2.3,"accentColor":"#14B8A6","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fr3IV6vSrbfw8eaiWCjWVkewgseM9TXyxl0wi6mSHn9-tIHqUbg5yDpEmEPlK7EcXFmSLsw"),
    "items": [
      s("skin-95fae4f18169","AUG","Amber Slipstream","milspec",0.95,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk7uepV7BiMv6sAXWRz-lzj-1gSCGn2x8msm2Dn9-oeSnGbAAiXppxE-cMs0Prm9a0Mrnqtg2L3dgQzS2vh3lXrnE8QYlxFJI"),
      s("skin-f52c5b815155","Dual Berettas","Shred","milspec",0.39,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I_82rZK15JeOsGW6e1etkj_NoRi22hyIrujqNjsGrJ3rGbQAgDsEhE-YJ5he7w9TgZOnrtgWI2oNNxCv6hixP7SZitrpRT-N7rUuDq4Qp"),
      s("skin-232f3ddb22d4","Glock-18","Warhawk","milspec",0.31,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK8-HBnKexetkj-V8XD2MmRQguynLwo34eXjBbgQnCMB1Q-QN5EXrkdfkNu7m5Ffd2YoTzyr52H5B7nk-5PFCD_Q2xs5K0Q"),
      s("skin-9b785997e60c","MP9","Capillary","milspec",0.83,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_jdk4uL3V7JoKf6sAm6Xyfo457c6SXDrw0VxsmmAzor6IimePwApApYkQLFY5ES9lYCzZO7j7lTZiZUFk3t71H43DQ"),
      s("skin-51560c383375","P90","Traction","milspec",0.47,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf-jFk_6v-V7B_JfGXMWuZxuZi_udvTHDjzUVxsm-Aw9auIniRPQJ2XJVyEONetxDuk4HiNeu24VSP391bjXKpopWoUos"),
      s("skin-82eac137c2ae","R8 Revolver","Survivalist","milspec",0.73,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2tfZt_eM-AG3WGyPh3vOh6Wxa_nBovp3OBzditcSmSOFUnDsEiE-4MuhPqw4bmY-jisQff2dhGnCyq2n4a631v_a9cBkWPt9yi"),
      s("skin-3c454adf5bdd","Tec-9","Snek-9","milspec",0.64,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SM_6SBWKvzedxuPUnHH23wEpz6j7Rydqqdy6SPwcoDpV0RrEN4Ra_x921ZOPitVDdiIpDmDK-0H1esiynQw"),
      s("skin-25f54c22ac43","CZ75-Auto","Eco","restricted",1.84,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2tcvM4H_WQAVicyOl-pK87HivqxR5xt2_Qnt6qI3-fPFciWJBzRuFZ5Ba_moG0Mrm04lfajYwQ02yg2Q7xomN1"),
      s("skin-d08b1f9525cb","G3SG1","High Seas","restricted",3.18,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-RG2STwOBztfNWQyC0nQlp4j7Syt-rdHPEOAIjCpV5TLQK40K5wdLjY-_r7wfeio1AySiriCIf6DErvbj1Mwus0A"),
      s("skin-069a62a128f1","Nova","Toy Soldier","restricted",3.23,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiFO0PyhfqVSNP-KMXSfzep_tfNWQyC0nQlp42zVytutcCmTZgchW5omTbNc5ka8l9XvM77jtACL34lBm3__iShI6TErvbjr52W2-A"),
      s("skin-860a0652d07a","AWP","PAW","restricted",3.13,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k7uW-V7RsN-CSGVicyOl-pK84Tn-3xkgltWWGnI39c3LDaA4lD5V0QO8It0LqktfuMOrq7gDajYJG02yg2bUm5WIV"),
      s("skin-30b1165ab5bc","MP7","Powercore","restricted",2.48,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf-jFk__25bbZuL-KWMWqAltF6ueZhW2fjkE114W7Vzduqdn2XOAYhXpMlEeQI4BW9kofiZOzq4VHXg9hGzi78kGoXuRPPGxs7"),
      s("skin-2746c427a1c5","M4A1-S","Nightmare","classified",12.1,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj-9gSCGnmBw1tgKJk4jxNWXCbAUpXpp0FrYPthC7k4fnZOm04laMjYxHn3r52HxJ6i065e0FVKV05OSJ2IHiKyzQ"),
      s("skin-9d723cee972d","Sawed-Off","Devourer","classified",9.85,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZt-IeeWCmiWx9FytfdmWju2hyIrujqNjsH8JSnBPQdxDcEiF-FZshS7kdG1NOyz4wKKiYNDmXn3jHkd5n055ulTT-N7rdPAUyyq"),
      s("skin-5af9f375159d","FAMAS","Eye of Athena","classified",12.08,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1Y-s2oaalsM8-cGWuvzvx3vuZscCW6khUz_WzUnNb6eXjCbFV2WcAlTO5ct0G-xIfgZe63tADb34wTzX2qjXlO6Xx1o7FV19iwjVc"),
      s("skin-74e670c4b279","AK-47","Neon Rider","covert",38.14,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV6poL_6sHG6UxPxJvOhuRz39xkQhsTnVzoygdy7Ea1UoCZQkRe9bs0brl9TvN-m0tVHYjY5CyS35jjQJsHhk4o5zcA"),
      s("skin-87ee5eacc505","Desert Eagle","Code Red","covert",43.05,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6OGRbKFsJ_yWMWaXxvxzo_JmXRa_nBovp3PRmNj4c3mTb1RxC5cjF-EItRnrlNzkYrnk5gaI3Y0UmyX52H9K7ixs_a9cBsGEcOCn"),
      s("skin-vanilla-weapon_knife_gypsy_jackknife","★ Navaja Knife","Classic","gold",223.11,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2pcbR-Oc-ZD2SbyuB_tuQnGXu1kBxw62_dwtird3qXZwQgXJV0E-4PtESxl4ezYr6x4FaMjI4UyzK-0H1iy36efQ"),
      s("skin-b9e7dc445655","★ Navaja Knife","Fade","gold",182.13,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJseBWSSi3kCIrujqNjsH7c3qVOwV2DcZyQbQOukG5m4CyMeqz4laIgoxAnH_93Ckbvyw5troCT-N7rT3KN2DN"),
      s("skin-8a6e4435f652","★ Navaja Knife","Crimson Web","gold",207.85,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJuPhWWCyxhiIrujqNjsGtJS-eag4iCpN4QrZYsEK_m9K0ZLzl4gOLiYgQxSj2in9Buis_5OZRT-N7rdEUHJYn"),
      s("skin-4facadf19ddb","★ Navaja Knife","Slaughter","gold",226.38,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWVSyxhxwYvzSCkpu3JSjFaQR0WZFwFOFYtBLtl4e2Nrmz4FHci4tAxCT8iipK6yc6sekKUL1lpPNhGLzFnw"),
      s("skin-d3e9d06ca1c0","★ Navaja Knife","Case Hardened","gold",119.47,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsfBWQCC_kBkYvzSCkpu3eHKWaQ8jXpQkReZZtxa_x4HvYujh41HZg9pNzX2ojCJA7itpteYHBb1lpPM10bWGng")
    ]
  },
  {"id":"case_spectrum2","name":"Кейс «Спектр 2»","subtitle":"AK-47 Императрица и Бабочки Волны","category":"base_cases","price":3.8,"accentColor":"#EC4899","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frHoVu6D7PaA0JaDACjKUwOom47VrTSzrw0Vx4W_Sydz9JC7FZgckCZYjRPlK7EcPuDAQzw"),
    "items": [
      s("skin-9be5df6c224c","Sawed-Off","Morris","milspec",1.29,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2veZt-IeeWCiqfx-hJtu1mWCyhqhEutDWR1NypJSnDPQF2C8N2EOEL4xjqkd20Ze7q4APW3dkWxSit2i4a7Ctp4LkcEf1yx89MV8Y"),
      s("skin-9ecc088bd04a","AUG","Triqua","milspec",1.4,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk7uepV6t_If6UC1iE0-d3vuZlSha_nBovp3OGyd-hdXzDZwApApYjF7UJtUK5l9LnYe_g4wDWjd5NmHqojnxJuCw-_a9cBrjnwKiq"),
      s("skin-b2c0d4a8e5c4","G3SG1","Hunter","milspec",1.22,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-QC3OdxNFkteV8Vxa_nBovp3Pdw9arJCrCP1N1DZFyR7EDskO4wd3mYr_ltVHa2oNNziWshn5Nunlp_a9cBi4_3bmx"),
      s("skin-bd5f006d65a3","Glock-18","Off World","milspec",0.96,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-aAGOZxuFJvOhuRz39xRly4WSDm4z9dHvCOg8iC5pxQrZethbsk4C1MbnnsQTag4pFyy_9hzQJsHjSW_TM0g"),
      s("skin-9b16f88ae206","MAC-10","Oceanic","milspec",0.82,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a4s2jaac8cM-cDWKRz-dJvOhuRz39lh4h52qGm9z7cCjBZ1IpCJp5QbRZtxXql9LnPrnr5wLXiY5EzX_2jjQJsHjZHPDEEg"),
      s("skin-45168379dce2","Tec-9","Cracked Opal","milspec",1.52,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SI-KSDWyVxdF5oOBlcCW6khUz_WvSwo2geHiUbFAkD8EkTOFetxi4w9ThZLnm5lfdj4JDznmqjixA6Sd1o7FVGUODCFM"),
      s("skin-5c7aa5998b21","SCAR-20","Jungle Slipstream","milspec",1.48,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk5-uRe6dsMqLDMW2Fz-l6td56QyCjhgk1tjyIpYPwJiPTcFIgX5tyFOEJtxm_wdDkZOrq5gHcjIIRzyX_hiJP7io55O9WUKUgr_fJz1aWgsoiFrs"),
      s("skin-679351fdbe47","MP9","Goo","restricted",4.2,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_jdk4uL3V6NiL8-fB2CY1aAv5LYwSn23xE4l5GrXn9aqIH-SZlMiD8MjEbYK4UW_x9TmM-Lh4FHYlcsbmqGCM0DC"),
      s("skin-a3acd40fcd30","SG 553","Phantom","restricted",4.39,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1c_M29b_E4c8-DBmae1eF7j-1gSCGn204k5WXSz4ysJSnDPQ5xDsZ0Ru4PtUKxw9XhMO-0tAON3YpMyS-v23lXrnE80YpLcJc"),
      s("skin-0ba56fdaa179","CZ75-Auto","Tacticat","restricted",4.48,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1c_M2tcvM4H-SSDXOZwu9ij-1gSCGn2x4k5zvVm9z8IH7FZwFyCJckR7NfshSwwNGyMLzn41fejINHn3r6jy5XrnE8D8_CCNo"),
      s("skin-fe7065d1a17d","UMP-45","Exposure","restricted",3.22,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1Y-s27ZbQ5dc-LQ3WR2NF7seJhRie2qhEutDWR1Nutci2WbwBzWZFyF-Fetka_ltbgM7nh5AKKiYoRmXr73H4b7ilvsekcEf1y88bI5DM"),
      s("skin-56ee85216316","XM1014","Ziggy","restricted",4.87,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7uORcKk8cKHHMX2Zxulvj-BnTjuwnQQYvzSCkpu3In6XPA4lAsZ5E-JbukWwwd3nY-zn4gLe2thNmCiv2ixK6SZs5ucHVb1lpPO5jVz-xA"),
      s("skin-a0695188a122","PP-Bizon","High Roller","classified",12.42,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1Y-s2sYb5iLs-SAmuvyOBJvOhuRz39kEx1smnczomgJX2XbA4hC8BzRe9etxntldblMuyx5wfc2ooWni7_3DQJsHhZ08njvA"),
      s("skin-c9be0566433c","M4A1-S","Leaded Glass","classified",20.29,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9Jo-loWz22hyIrujqNjsH8dn6ePwB2DpEmFuAMt0HulYa1Nu2z4QWPjt9NnCX63H9M5ys96r1QT-N7rZDTLd1E"),
      s("skin-4cb968c36e88","R8 Revolver","Llama Cannon","classified",19.51,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2pe5t_eM-fAmadwO13vu9mQRa_nBovp3OEz9n7JH-UPwEoA5t2TLFYtBmxlNzhYuOztgHZjo9Mzyqq3C9O63o5_a9cBr5nn1G8"),
      s("skin-1b3ca668024e","AK-47","The Empress","covert",68.8,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSJf2DHGKD0tF6ueZhW2exxEt152rWzI7_Ii-Ubw90DMB0Ee4C5xOwx9GxZbjk71PXgogWn36tkGoXudZeYvlo"),
      s("skin-491a70af3255","P250","See Ya Later","covert",54.66,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSI-mRC3WT0-F1j-1gSCGn2x9ytmzWnN6pInjGOwMlDZp0EORe5BHsx93lP7zr5wzbiI5AyXr_jS9XrnE8gQrIgng"),
      s("skin-fcaadd7c92cc","★ Bowie Knife","Marble Fade","gold",237.32,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5kTjuxmRgYtTyBn7D1KCzPKhgpXMdyTeBb5BPuktPvZOi2sgWM2d9HmSr-i3xAuidssO8HBKcsrvLXkUifZhxP_T8X"),
      s("skin-90d3cf089321","★ Bowie Knife","Tiger Tooth","gold",374.73,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vt59Ri62hyIooTyLnYrGLSLANkI-XJJ0FLNY5BOxw4XjNu-zsQDd2IpFyy32jS0b7Ss95L5RVaIk_qyE3RaBb-Pz4OFuTg"),
      s("skin-3ca96a918c35","★ Bowie Knife","Doppler","gold",232.31,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd57WiuqqhAmoT-Jn4bjJC_4Ml93UtZuQe5Y50O-wNzhMuji5w3e344Rny-q3H5K7iZtsekLU6El-6eBi1vHY6p9v8dqQrLELQ"),
      s("skin-dfd71b7017a4","★ Bowie Knife","Doppler","gold",197.24,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd56TjmjnRQ1tgKIm537LS7OJFN0Zc4pEr9OrBaxl4KxNr7r5VHZiYtBzH-qiShJ7y1v4roHAvZ2qfLTjlvDOLw_sMIdZKHwjx9VvzI"),
      s("skin-793b9eb6b4b7","★ Bowie Knife","Doppler","gold",212.17,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5rQyiwng0isi-JpYL4MynLO19qX8YfGb5d6lSmxt2yZeLq5QeI2dgWzSmsjiMauyxr5O4LB6Ej-6PXjVyQZLc54pZRJOHnE0pg4-kgmA")
    ]
  },
  {"id":"case_spectrum1","name":"Кейс «Спектр»","subtitle":"AK-47 Кровавый спорт и Ножи-бабочки","category":"base_cases","price":4.1,"accentColor":"#D946EF","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frHQV7qCra_JscqPGCzLCl78ktuAxHSzmzUh_sjvWzdqoI33CaQF2DscjR_lK7EeF3oM7TA"),
    "items": [
      s("skin-f945b5be9ee1","PP-Bizon","Jungle Slipstream","milspec",0.87,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1T9s2sYb5iLs-HAXWe_ulkteRncCW6khUz_WjQn9msInvFOlIjCZJyFuMKsEG-l4blY-zh5lDWi4lFnCr53S1Juip1o7FVTY_WZWI"),
      s("skin-2501d2df72d4","SCAR-20","Blueprint","milspec",1.38,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk7OeRaqh4JeCBB2mE_v11sfNWQyC0nQlp4jvQn92oJX-VaVIgW5QkQuYM5kLswNTnNL-w4QaK2YNFmXqqjSxJuzErvbi8Z0332w"),
      s("skin-8f997b65f837","Desert Eagle","Oxide Blaze","milspec",1.42,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKF-JeKHMWKRxuJzj-JmXTu8kRgpjDGMnYftb32UPwJxDJokRuUIsRi_lNPhM7izsgXZi49GySiq2nxNuCdttbtUB_A7uvqAjSk2l_c"),
      s("skin-32ee365f968a","Five-SeveN","Capillary","milspec",0.8,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j_dsRieMmRQguynLmY79IinFbA90CZN2Q-Bc4UW6x9KyZLnjtQCMjo8WyXr7jy1O6Ck_sfFCD_SqR6qLvA"),
      s("skin-fa522c8e6ebb","MP7","Akoben","milspec",1.36,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf7jJk4uL5V7B_KfKSAliJxOJ6v_ZWQyC0nQlpsWmHyIquci7EPQQgCZMkE7FZsUXpx9y2Mu6wsgbWjINFyir9iXlNujErvbjY0_iNfw"),
      s("skin-bce064b53f43","P250","Ripple","milspec",1.65,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiNW0OL8PfRSM-CGGmmZytF6ueZhW2fnlht-5juGyY2vIC2SalQjX8Z1RbVesUG4m9XlN-_ntQPa3YNBn332kGoXubXJFvZo"),
      s("skin-68e37aff8fd3","Sawed-Off","Zander","milspec",1.35,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2veZt-IeeWCmiWx9Fsse9tSjvhqhEutDWR1N79dXrBbFUgXpt4QrJb5hfuktTgYuLrtAXXiNpGySuvjS8b6i9j4escEf1ycSPZoqI"),
      s("skin-1f899f97bd99","Galil AR","Crimson Tsunami","restricted",3.68,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OG-V6NsLPmfMXCR1-tJvOhuRz39x0Qm6mjQzo6qeHLGOg8nXJUiE-UKtxa5mtPgZu3rtFGMiIwXxH-viDQJsHh48m4KFg"),
      s("skin-61f4c5cf38a6","M249","Emerald Poison Dart","restricted",5.53,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wjFL0P_8PP1SJuKcCVif0-dxue9oQxa_nBovp3PRzNb8JX2VO1IpDsclRrEPtxXtxNSxYuuw4QHai9gWyCT2j3gYuHlt_a9cBlcR8wa2"),
      s("skin-d3caeffc5ec8","MAC-10","Last Dive","restricted",4.94,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a7s2jaac8cM-HBmKvze9lpN5tRj-2qhEutDWR1N76Iy_BblUnCZd5QLFesEXrmtWzMui05wPc3o4TnnqojS8au3094ekcEf1ydsF2boo"),
      s("skin-b0c874f3f971","UMP-45","Scaffold","restricted",3.24,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1c_M27ZbRSIfKKHXSvzedxuPUnGi2ywBwhsmuDnNn9cX_EbA4mCcF1QbJZ5BPtm9fjZejnslDciNgUzTK-0H2MLp31Hw"),
      s("skin-bc2d596ca9ca","XM1014","Seasons","restricted",5.2,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7uORcKlSLPWSCFiWwOpzj-1gSCGn200i6mvRn4mpdCiVblRxDJd3FuILuxi7ktHuNb-04wzW2dpGzin-2ihXrnE8PcTco88"),
      s("skin-d85f6159fe4a","AWP","Fever Dream","classified",18.78,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7R-OfObAXeR1eZJvOhuRz39kE1w4jiAzNiod3qTOgcgXpAlQ-ML5hjqxtHjZOrrtlHWit9EyCj9iDQJsHhCZP-wUg"),
      s("skin-d1f0620f06f3","CZ75-Auto","Xiangliu","classified",20.78,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1c_M2tcpt-LvGYC3Sv0ftkoO1scCW6khUz_WTcw9r7JH7BOgApApojQuBb5kO5lNO1ZO_h4VaM2o5Gm36s3HgbvH51o7FVgkdxNDg"),
      s("skin-7b3af96bd1e4","M4A1-S","Decimator","classified",18.26,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9JtORqRiSygRI1jDGMnYftb3iUb1dxW5ImFLNftxCxktflZLm2tgaP2otGyn_-hytOvy9q5elQV_A7uvqA6CRSoZY"),
      s("skin-ba052cf18c66","AK-47","Bloodsport","covert",73.91,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSIvycAWOD0eFkpN5lRi67gVN15mmDw9egci_EPFAkDMQlTeZe4EXplNa0Yrvr5wbd345GyHioiC4b8G81tFuqg_k_"),
      s("skin-0770dabcd885","USP-S","Neo-Noir","covert",88.91,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA0tF4v-h7cCW6khUz_WXdmd-vI3uRPwEkApR4QuBcu0Xrk4biYr_mtQXdidlCz3r63Ska7Hx1o7FVWuokIcU"),
      s("skin-fcaadd7c92cc","★ Bowie Knife","Marble Fade","gold",189.56,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5kTjuxmRgYtTyBn7D1KCzPKhgpXMdyTeBb5BPuktPvZOi2sgWM2d9HmSr-i3xAuidssO8HBKcsrvLXkUifZhxP_T8X"),
      s("skin-90d3cf089321","★ Bowie Knife","Tiger Tooth","gold",160.68,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vt59Ri62hyIooTyLnYrGLSLANkI-XJJ0FLNY5BOxw4XjNu-zsQDd2IpFyy32jS0b7Ss95L5RVaIk_qyE3RaBb-Pz4OFuTg"),
      s("skin-3ca96a918c35","★ Bowie Knife","Doppler","gold",217.47,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd57WiuqqhAmoT-Jn4bjJC_4Ml93UtZuQe5Y50O-wNzhMuji5w3e344Rny-q3H5K7iZtsekLU6El-6eBi1vHY6p9v8dqQrLELQ"),
      s("skin-dfd71b7017a4","★ Bowie Knife","Doppler","gold",316.4,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd56TjmjnRQ1tgKIm537LS7OJFN0Zc4pEr9OrBaxl4KxNr7r5VHZiYtBzH-qiShJ7y1v4roHAvZ2qfLTjlvDOLw_sMIdZKHwjx9VvzI"),
      s("skin-793b9eb6b4b7","★ Bowie Knife","Doppler","gold",244.01,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5rQyiwng0isi-JpYL4MynLO19qX8YfGb5d6lSmxt2yZeLq5QeI2dgWzSmsjiMauyxr5O4LB6Ej-6PXjVyQZLc54pZRJOHnE0pg4-kgmA")
    ]
  },
  {"id":"case_gamma2","name":"Кейс «Гамма 2»","subtitle":"AK-47 Неоновая революция и Гамма-ножи","category":"base_cases","price":4.4,"accentColor":"#22C55E","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bjz61TqQCKj0JfipHMN7aX2bfM9eaPDXT7Glbx1s7Y8HHHnw0sltWXSmYmqcH-UaAU-Sswn_16VNj0"),
    "items": [
      s("skin-44edcae0251b","CZ75-Auto","Imprint","milspec",1.69,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1c_M2tcvM4H-SBC2aU_uJ_t-l9AX_ql0kksWTVyYupJC7FOAUiAptxQudbs0KxkNK1MLzl4wOPjIsWyCngznQeZTDWXeo"),
      s("skin-034f9e819612","Five-SeveN","Scumbria","milspec",1.15,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRabVSJvmFC1iDxPhzvt56TDy-lw8usgKJk4jxNWXBP1JzAppxQ-UN5hm_mtLgZbjn5wPdi49Bnyqr3SJPvChq4-tWB6Ak5OSJ2BFWlPNZ"),
      s("skin-2455f7e4f242","G3SG1","Ventilator","milspec",0.88,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-FC2mEyOJ3pO57cCW6khUz_W_Rwo36cC6SagZzDZZyQbMN5kTtwNC0Mb60sg3cjo8UnHn4j3hPuid1o7FVSaKTKS0"),
      s("skin-3470c859db1d","Negev","Dazzle","milspec",0.66,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1T9s2gbaNoNs-XD32KzetJvOhuRz39xxxzsmWEz9v9I3zFaQQiA5pzE7YLt0WwwdHkZrjktQXeg4gXyXj62zQJsHixNFIgjA"),
      s("skin-b15a3a34433b","P90","Grim","milspec",1.64,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_jdk_6v-V6N_Kf2eMWuZxuZi_rA9GHDrlh8h6m7dw4qpciiUOgQkAsF2ELYPsBjploe2P7ngsQaIjN5bjXKpNUOMolU"),
      s("skin-2826d766adf3","UMP-45","Briefing","milspec",0.95,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1Y-s27ZbQ5dc-eC3OCyPpzouBWQyC0nQlp627XyNigJHjBOwIiXMNyQuUKsRKwktK2Zu_j5FOKi9lCzHmtjCNKvDErvbgMSlL6rA"),
      s("skin-081963f17f9c","XM1014","Slipstream","milspec",1.77,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk5-uRcKk8cKHHMWGCwO1ise1WTSWmkCIrujqNjsGrdn-WZw51ApR5FO4K5xDuk9O0Zunm5lGIio4Rnn2rjyhA7Cw_se1WT-N7rYJQ1fMT"),
      s("skin-02e5c0a4a714","Desert Eagle","Directive","restricted",4.52,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uORbKF-JeKHMWKRxuJzj-JmQTqnlB8rtgKJk4jxNWXGPQ9yA8Z0R7FbtBi7w9S2M7_msgCIid1CmH6viH5I7ilr4-oEUKst5OSJ2LTZlHwR"),
      s("skin-0e48389f836a","Glock-18","Weasel","restricted",4.07,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK6HLMXCVwP1zvN5lRi67gVN_4j7Qzdj8dimQblQkX8YkTeNe5Bmxkd2zNr_j5QbdjthCzX-qjylI8G81tDMJpR5Y"),
      s("skin-18a6943d8cc2","MAG-7","Petroglyph","restricted",6,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiFO0P-vb_NSNOKaDGac_uJ_t-l9AXm1kUQl4TzcytqpeSjFagMkW5AiQbZYsEG_mtTnN-jq4AWLidpNnC3gznQeOK4te4s"),
      s("skin-9c61185e3e75","SCAR-20","Powercore","restricted",4.12,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk6OGRe6dsMqLDMXef1utks-57Sha_nBovp3OAzd2qIy_DPVMkXMEiE7UL5ES-l9yyP76wswWP3Y1Nyyn2i35L6S5s_a9cBj_cXeyl"),
      s("skin-1dad3beb1452","SG 553","Triarch","restricted",6.33,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4ds-HHG6R0-1-j-1gSCGn20Qk6m3UmY77IHOeOlNxCJQmQbYMuhC6mtaxP-K0sQLYi94RzC_8iH5XrnE8WPSRipg"),
      s("skin-ba00fd57f9ef","AUG","Syd Mead","classified",19.61,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV7d0JM-eC2aU_uJ_t-l9AX_rkU9-5j_Ry42qcnuQbw5zCcMhQrINtRO-xIHvY-Ow4gPY2Y4UmSngznQeqqNNbYw"),
      s("skin-f07fb63926b7","MP9","Airlock","classified",13.89,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_jdk4uL3V6psMvOaHVicyOl-pK8xGXq2xE536m7dnI2vdS6WagZ2CMFyFrNcsBjuw4G1Ne23tQGN3olH02yg2ZxyeudA"),
      s("skin-23a0601d3273","Tec-9","Fuel Injector","classified",24.14,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiVI0Oara_1SM-WDC3WTye9kt-RtcCW6khUz_Wvcy9qgdCnEPQ8hApBzRrQJ4RW7moDgMLzktFDZiI5HnyWr3ChN5yp1o7FVg4hNKG8"),
      s("skin-1a5e885d9d28","AK-47","Neon Revolution","covert",83.75,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIf6SHGSY2NF6ueZhW2e3w0524mjQzomreXqVbAAhWJF3RuZfuxC5x920Yurh7gONjY0RxHr4kGoXuT5bpI-V"),
      s("skin-0305a5aaa4eb","FAMAS","Roll Cage","covert",42.87,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2oaalsM8-BD2uc2NF6ueZhW2exzUhz4WjWmNqpdy-UbwJxDJtxReEMtRGwloflP7m04wfXi94QyXj9kGoXuV3JhaXD"),
      s("skin-9af6c8a5a9c1","★ Bayonet","Gamma Doppler","gold",177.16,"https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJH4dmklYyPqPr1Ibndk2JL7cFOhuDG_Zi73VG2qUQ_am36LNKWcwM2Ml3X_FS8wL3vhMC0vJXOn3ZkuSAl7HiOmwv3308XDHXucw"),
      s("skin-a3f12ab576f2","★ Bayonet","Gamma Doppler","gold",258.58,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6NsLf2SMWOf0f56tfNWXyGyhhh2jDGMnYftb3KfOlVxDpt5RbRf5ES8kdfhZenq7lPc3tgQySj5hyNL53k9troLUvI7uvqAwkE80cI"),
      s("skin-6ce7bf3dffbe","★ Bayonet","Gamma Doppler","gold",471.99,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6NsLf2SMWOf0f56tfNWXyGyhhh1jDGMnYftby7FbARxDZUkF7NfsUK5lYbmZO3ktAWKj40Qznn_intPvX1i5e4DVfI7uvqAz_bVj6c"),
      s("skin-d637b48f728a","★ Bayonet","Gamma Doppler","gold",263.7,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6NsLf2SMWOf0f56tfNWXyGyhhh0jDGMnYftb3ifPQd2ApZ3Redb5xG-mtzkNuPr5ADXg4tGm33_23hLvCZrt-9XV_Y7uvqA1Mz9WrE"),
      s("skin-f79a7a168c94","★ Bayonet","Gamma Doppler","gold",255.27,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6NsLf2SMWOf0f56tfNWXyGyhhhzjDGMnYftb3_CO1ciCJYhEOID4UW_kNayPuPktVbZg9pBmC_8jC5PvStp5L1QWPY7uvqA1BNTDgI")
    ]
  },
  {"id":"case_gamma1","name":"Кейс «Гамма»","subtitle":"M4A1-S Механо-пушка и Керамбит Изумруд","category":"base_cases","price":4.6,"accentColor":"#10B981","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frHEVtvP5bPZrd6XECmOSxe0v4bRoTnnjwBkitWrRm4yoeX3GagMnCZZ2FPlK7EcEv22BnQ"),
    "items": [
      s("skin-f4418cce494a","Five-SeveN","Violent Daimyo","milspec",0.71,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC1iDxPhzvt5tTiC-jBIYvzSCkpu3cXjCPAB2WZMmQ-EK4BTqlNSzNOLk71GI3tpGmX2oii5N6nk667kDWL1lpPNv4wCTtw"),
      s("skin-5c202c8939b2","MAC-10","Carnivore","milspec",1.11,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a_s2jaadScaCsD2uZxOBJs-BkQBa_nBovp3PSmdqpcy2fPwEoWMciQLYKtBa9lYDmN-zlsVDXiNpAnnmqiHwcv3w5_a9cBiTJtAYY"),
      s("skin-aa93f10a9c96","Nova","Exo","milspec",1.26,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiNK0PyhfqVSM_OaMWGZ_uJ_t-l9AS3lxE8k4zuGz42qciiVPQIkDcF0TLNeuhmwxtfhYbzm4wfci95FnC_gznQeGrfN1lI"),
      s("skin-6736df07aec5","P250","Iron Clad","milspec",1.67,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiVI0OL8PfRSLfWHD2uv0e94te16cCW6khUz_W2Hzd6heSjBbFd1CsFxF-8DsULulNLjZu6xtQDfitlCyiWt3HtNu3p1o7FVE3GEpAE"),
      s("skin-63aa6463689b","PP-Bizon","Harvester","milspec",1.56,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1c_M2-eJtvKeqcAFiYwPxgtfJ9SjuMmRQguynLyd76dSqfZlUoA5dwFOBb5BGxxNDlP-Lg5QKM2IoUyyqv2ixL7ihr6vFCD_SgdFoAow"),
      s("skin-f7201f00d647","SG 553","Aerial","milspec",0.96,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-SC3WZwOJJvOhuRz39wkQj4TzXw9igJXrEbAJ1C5VyQeVZ5hHslIXjMOyz41begt9Myiiq3zQJsHi7xfgn5g"),
      s("skin-82e19c21d6d0","Tec-9","Ice Cap","milspec",1.2,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiNW0Oara5s0H-OWD1iDwOJij-1gSCGn2xtz5TjdyNquJX-XaVV0CMd3EOUP5Bjsw93uP77jsVHejohEyH6t339XrnE8zMglqPs"),
      s("skin-d88fbf7ef8e1","AUG","Aristocrat","restricted",4.86,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV6V_KeOHAWSCwPpJvOhuRz39w00j5WSDytyqI3_CPwAgXMd2E-Vc4US-koCxNOzq5AaMithNyij32DQJsHjdc8VZyg"),
      s("skin-78882aeeb9a7","AWP","Phobos","restricted",3.01,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V7RlL_KcHVicyOl-pK84GXHmwk115D6GzdqudHyUbwRxW5R3ROZbtEG8wYDiY7-x5VOKgotB02yg2bdJjfAf"),
      s("skin-31a18fdabe59","P90","Chopper","restricted",4.48,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf-jFk_6v-V6J4LPysGm-CzvpivORWQyC0nQlptWTXzt-tIyrFPQMjCpImQbED5xm5kIDhZePitlbdjotBnH783H9L7jErvbjpMmMyTQ"),
      s("skin-1b8d8987488f","R8 Revolver","Reboot","restricted",4.91,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2tfZt_eM-QF2WV0_1mv_N9cCW6khUz_WjRyouseHqUPwQoXMNyQbMM4ETulNSxNuq3s1DZi95CzH_-2Cgf7Hp1o7FVySZFkkA"),
      s("skin-33872c48a8e5","Sawed-Off","Limelight","restricted",4.53,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZt-IeeWClifx-hJvOhkSha_nBovp3ODz4utJHrBZ1MjD5YkFO8NtBjqwdXvP-nn4QLZjIJNnHio2Hwd5npq_a9cBh09Jdi8"),
      s("skin-ca4eb6f53d0e","M4A4","Desolate Space","classified",22.96,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSJPWAAWuR1etJo_FoTCyMmRQguynLnNepJXPEaQJyDZJ0QOdbsxi7ktS0Y-Li4ADegthGn32ojCJJ7CxosfFCD_SyjfEkHg"),
      s("skin-76967e1c919f","P2000","Imperial Dragon","classified",15.93,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PW9V7Q_cKDDMW6d0etkueBlcC2hlBoovQKJk4jxNWXEbAQmDsQmRbNYsxGwxoC1YrvrsQXXg40QxCX533tJ7Xs-4eYKWKAl5OSJ2JuLIVNl"),
      s("skin-9a2cefa49e12","SCAR-20","Bloodsport","classified",12.76,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk6OGRe6dsMqLDMWWczuFyo_FmXT2MmRQguynLnoqrcHPCaFdzDMF5F-8P4Bbum9fkYuvrsVffjI5AyS75inlL5ixjsvFCD_R20nqesQ"),
      s("skin-73cc8d5fcd85","Glock-18","Wasteland Rebel","covert",92.82,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-ED3SExOJ3vuVWXSyxkBEYvzSCkpu3Iy7GPFUnC5t3EO4I4Bm6w4DmNu3k4lCN3YNNniz23HsY6Xxv5rwCU71lpPMpvj9PCw"),
      s("skin-102a47219b11","M4A1-S","Mecha Industries","covert",61.79,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9JveRqRyiMnBMjpi6RiIb8MhTLN1F4TowiE7EMtRW7ltzlMbvi5wPej4pDmCT2i3tKuHo4sOoEWKFz8qPS3F7BL_Rjtn0I4s52"),
      s("skin-9af6c8a5a9c1","★ Bayonet","Gamma Doppler","gold",297.06,"https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJH4dmklYyPqPr1Ibndk2JL7cFOhuDG_Zi73VG2qUQ_am36LNKWcwM2Ml3X_FS8wL3vhMC0vJXOn3ZkuSAl7HiOmwv3308XDHXucw"),
      s("skin-a3f12ab576f2","★ Bayonet","Gamma Doppler","gold",416.32,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6NsLf2SMWOf0f56tfNWXyGyhhh2jDGMnYftb3KfOlVxDpt5RbRf5ES8kdfhZenq7lPc3tgQySj5hyNL53k9troLUvI7uvqAwkE80cI"),
      s("skin-6ce7bf3dffbe","★ Bayonet","Gamma Doppler","gold",190.46,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6NsLf2SMWOf0f56tfNWXyGyhhh1jDGMnYftby7FbARxDZUkF7NfsUK5lYbmZO3ktAWKj40Qznn_intPvX1i5e4DVfI7uvqAz_bVj6c"),
      s("skin-d637b48f728a","★ Bayonet","Gamma Doppler","gold",341.52,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6NsLf2SMWOf0f56tfNWXyGyhhh0jDGMnYftb3ifPQd2ApZ3Redb5xG-mtzkNuPr5ADXg4tGm33_23hLvCZrt-9XV_Y7uvqA1Mz9WrE"),
      s("skin-f79a7a168c94","★ Bayonet","Gamma Doppler","gold",348.48,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6NsLf2SMWOf0f56tfNWXyGyhhhzjDGMnYftb3_CO1ciCJYhEOID4UW_kNayPuPktVbZg9pBmC_8jC5PvStp5L1QWPY7uvqA1BNTDgI")
    ]
  },
  {"id":"case_chroma3","name":"Хромированный кейс #3","subtitle":"M4A1-S Огонь Чантико и Сапфировые ножи","category":"base_cases","price":3.4,"accentColor":"#06B6D4","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frHAVuKf7PaJucPLHW2TExb9z4OdvHirixEomtW7cyduvci2VZ1AiCsR2Q_lK7EdW_VBhrw"),
    "items": [
      s("skin-3de8a2cd3d43","Dual Berettas","Ventilators","milspec",0.93,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhIvWBC3OEwP1JpuRnWyC_lAkooS66lob-KT-JblNxDcMiQe8M5hDtxtfnNrvrswyLjdgWzCyvhytP7ilqt7pXBfdz-rqX0V-MxKZG7g"),
      s("skin-8e1bb1b66b99","G3SG1","Orange Crash","milspec",0.93,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1I_82pO7dqcc-eB2uZ1ed3v_NoQS62qhEutDWR1Iv_IC2eZgUkA5Z0RbEL5BLqw9flMby2swba34JBnHr22CMd5i1r67ocEf1y0mrzb0E"),
      s("skin-fc1505f10422","M249","Spectre","milspec",0.83,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiFO0P_8PP1SM-CWDXOCxNF6ueZhW2fqwklx4j_Wyd_6J3yeOlcoXMclQuQI4xbrw4fmNrziswLX2IhHziqrkGoXuVEVHa_j"),
      s("skin-6e2ddbfa3638","MP9","Bioleak","milspec",0.92,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_C9k4uL3V6ZkL_yWD2yvzedxuPUnHSi3xhgm4GSGm4mpcnyTbVQjWcZ5EeIL50LultzgNbvmtAPf3oJByDK-0H0NB5p7wQ"),
      s("skin-3903899a4282","P2000","Oceanic","milspec",0.49,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0Pq3V7Q_cKDDMWiTxO94ud5lRi67gVNysmuGzt_9JSiQaQJ0C8MkTLJbskHrk4fnZe3isgfZg4tMnySoiX8Y8G81tHDFigbI"),
      s("skin-a7997cc94140","Sawed-Off","Fubar","milspec",1.05,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2pe5t-IeeWCmiWx9FwpeNoXRa-kBkupjDLmN39d3jDb1VzApsjFu4DuxC5ltKyMbi2sVbZ2tpNyiuvjH8Y7HpqsPFCD_SxQd5sJw"),
      s("skin-b86e591b7a8e","SG 553","Atlas","milspec",0.51,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-SGmuR0tF6ueZhW2fgkxt_tTndn46rJX6QOAEoC5QhEe5f5hHqltfgMeO0tQHY2IsTyyyokGoXuYh0VG-5"),
      s("skin-e4311574b36e","CZ75-Auto","Red Astor","restricted",4.87,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1c_M2tcvM4Ic-BC2OR0vp5ot5lRi67gVMh5D_cwor7cy7GZ1UpA8F0QrQP5BjuwdHiZr7r5FeNjIpAmyT8hnlI8G81tORsc2LX"),
      s("skin-b60d3982f423","Galil AR","Firefight","restricted",3.27,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfD3WvyOB1te9sXSinmg8YvzSCkpu3eH_EZ1IgDsR1ReYPshm6x9XnZe204VCMiIsXzS_33S0b7X5t4-dQUb1lpPOTHSUAOw"),
      s("skin-896626717e7c","SSG 08","Ghost Crusader","restricted",4.19,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1c_M29e6M9eM-SHGqRwuFktd5lRi67gVN_6jnQzYmhc3jFbgUoA5J3ReYIsRO8ktGyM-iz4AaMi4hDzyqsiSJJ8G81tKe_wmAg"),
      s("skin-0705abcdd5df","Tec-9","Re-Entry","restricted",3.93,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiNW0Oara_1SMvWXDGuR0vpJvOhuRz39lkp-4j_QnoytcS-RPwEgDZt1FuAJshG6ktW1NLy34gCPj44WmH7-jzQJsHhOKqOsYw"),
      s("skin-8a7c514126f7","XM1014","Black Tie","restricted",2.23,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7OeRcKk8cKHHMXSAxO1iovRkcCW6khUz_Wncm4v6dnuVawImXsZzTONcsRK5xofkYeywtgWKioNDxCX9in8cvy91o7FVLrGdyvk"),
      s("skin-cdca99fe25ed","AUG","Fleet Flock","classified",14.79,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk7uepV7d6IfyfAXCD_uJ_t-l9AXnmw0t252TVztercCmTZ1AmDMZ2RuBftRnsx4LhN-O0s1DYi9pEmCTgznQesuSvNik"),
      s("skin-b10fdec34656","P250","Asiimov","classified",18.06,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSIeOaB2qf19F6ueZhW2fixx53tWqEm4ugeXuebQN0CZJyRrMJuxm4loCyPr_i51TfjtgXzi79kGoXuUXmUJzm"),
      s("skin-edb13cbc1a57","UMP-45","Primal Saber","classified",10.93,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1Y-s27ZbQ5dc-DHG6dwOJlseNsXRa_nBovp3PRn478JHmePQ8hDcF2Q7YDtxXrk92zYbyw7gXYjIhEyCn_3Hsbui44_a9cBklqRdMs"),
      s("skin-8599a25e2c67","PP-Bizon","Judgement of Anubis","covert",75.67,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1Y-s2sYb5iLs-QG3WDxNF6ueZhW2fkzU0isDvTnomsdS7BbwF0A8ElROJfshC8wN3jYu-2tQ3c2osTxCitkGoXuVioOA3_"),
      s("skin-815a9f1c0092","M4A1-S","Chantico's Fire","covert",52.59,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj_JmWiWnlBYioQKJk4jxNWXFZ1IgC5MiQuZeuhK4wIXnMuPhslCM2oMTxH75hnxK6Htjse4BVqd25OSJ2DU2Q_CD"),
      s("skin-352633fab46b","★ Bayonet","Marble Fade","gold",177.34,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6lsMvKfC1iWwOpzj-1gSCGn2xhysWrTn42rdH2SawQnDccjE-ELsxa-mtTjMejr7wXZgoxFn3n2hnhXrnE8oMvxYMA"),
      s("skin-65d7965e0e39","★ Bayonet","Tiger Tooth","gold",241.15,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POgV7BkJ_WBMWiCwOBxtd5lRi67gVMhsGrTntn4ci-ROAYlXMBwE7YL5BaxxIHjY-vq7w3X398RxS78iylK8G81tBow9RWL"),
      s("skin-d6f209a51abb","★ Bayonet","Doppler","gold",162.51,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV7Z4IumsA2aCw-JzuftsSxa_nBovp3PWnomsdn2QPVN0D5UiEOUP50LtltTvY-Ll4g3YjItFmSv-2i9A6X4-_a9cBu2YVmHc"),
      s("skin-b28c8d3ffc15","★ Bayonet","Doppler","gold",206.86,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV7dsMOCbB3WV_uN3ouNlSiCpkBkYvzSCkpu3d3_FaFUnXpRwEO4O50G5xoW1Y7zn5wLe3oxBxHn6jiwf7XposO8LBb1lpPPeBvHrwA"),
      s("skin-d466b1683b88","★ Bayonet","Doppler","gold",180.01,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6ZhIfOYHmKR0-JJveB7TSW2nAcitwKJk4jxNWWVZ1AmDJIlQuZcu0btx9e0Y-205gOL3dhGzS333CpBvHxi6ucEBfcg5OSJ2MqXuBCE")
    ]
  },
  {"id":"case_chroma2","name":"Хромированный кейс #2","subtitle":"M4A1-S Скоростной зверь и Допплеры","category":"base_cases","price":3.6,"accentColor":"#3B82F6","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fqmwOuKD2PqI6caDBWDeUkO8uteM9SnDglklw6miEn9j6IHKfblNxA5pxW6dU5UH4LtBe"),
    "items": [
      s("skin-ea4e27f0cd16","AK-47","Elite Build","milspec",0.77,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSLfGAGmKC2NF6ueZhW2e2wh9y5GjTztirdSqfP1dyCpclR7FZ5xe9wNbhZei25FGPjokXxC2vkGoXuQLr5jvs"),
      s("skin-0789e14af0b1","MP7","Armor Core","milspec",0.96,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_DNk4uL5V7FhNOKSA2iUxPx4j-1gSCGn2xhw6zjSzYysICiUOgV0Cpd1TORe5BW9w922Nrux5gKLitpGz3irhnlXrnE866qixJk"),
      s("skin-7698ea25d00a","Desert Eagle","Bronze Deco","milspec",0.48,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7v-RarZiLuqWMXSAwPx9vORWQyC0nQlp4zzdydqtJXuTOgZzW5F4QbNZ4UK7l9e1N-Pq5AeNj9hHmH783S9J6zErvbgcMfnnyA"),
      s("skin-4b8851edb204","P250","Valence","milspec",0.59,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiNK0OL8PfRSI_-dGmiF09F6ueZhW2fiwUx14zmDnNagcC-WagUkApslQuBYsUW_ktexPry3swPfiogTyyiqkGoXuQius2mt"),
      s("skin-fd5699e808a0","Negev","Man-o'-war","milspec",0.44,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1a4s2gbaNoNs-UAmiC2NF6ueZhW2fikBh352vQyt-sI3mRbQ8lDJpxTLVfuxC5k4W0MLvm5VfeithHnij5kGoXuSdORNFb"),
      s("skin-628ddc6f56d0","Sawed-Off","Origami","milspec",0.63,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZt-IeeWCmiWx9F5ouhuTiS6qhEutDWR1IutIyqSalBzWZQjQbUD4UaxltCzNuLgslTejYwTxSn2jCIc5n1jtbscEf1yxjZ09aw"),
      s("skin-c97e27944006","AWP","Worm God","restricted",3.76,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DNk7uW-V7B6Kf6WMWuZxuZi_uRoGH3iw0wh4j7cnt6ucSqSZwUkCMB5TLIPsES_kNbuYeOwtgXai4NbjXKpZ4kj0o0"),
      s("skin-fadb57cf0d51","MAG-7","Heat","restricted",5.06,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiFO0P-vb_NSMvWXBmiE_uJ_t-l9AX7nzBsk623dm46odHmUbFd1Dcd2RbINtBXtkNDjMbzj5AGKjt4UyijgznQe8JftFTE"),
      s("skin-e2e874d00715","CZ75-Auto","Pole Position","restricted",2.41,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2tcvM4H-CBC2SZ0ud5vt5lRi67gVNy4mTdzdmgc33COg90DcB2FuMPtxLpldSxZeLn4w2K34NCzXj9hnsY8G81tCL36RK-"),
      s("skin-162f16955942","UMP-45","Grand Prix","restricted",4.33,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1a4s27ZbRSMvGQC3WvzOtyufRkASjjxU1x42nVyo2rdnKQbA9xX5ohRrYMtBntmtW1N7zj5lDZgthFzC3gznQezoUeLLY"),
      s("skin-b2a5203033ee","Five-SeveN","Monkey Business","classified",19.46,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-NoQSi9lCIrujqNjsGheXmXPQcoWMFzEO5ZtUOwkILjY7yzsg3ci91DySiohn4buCht4eYET-N7rZVO80Su"),
      s("skin-5224ccf55371","Galil AR","Eco","classified",12.32,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWKTztF6ueZhW2exwExw4WrcyImrcHmTbQAlWcQkQudYt0O5lNfgP-nh5AOL3otAziz7kGoXua-HTb4P"),
      s("skin-4fa9c490db80","FAMAS","Djinn","classified",19.28,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a_s2oaalsM8-ZB2me_uJ_t-l9AXzhwxt-5TiAzdmgd3yeaQ50DZRxEe5b4BXrm4HkPr7kslfcg9pCznjgznQepOOy8CM"),
      s("skin-7b1351c2adba","M4A1-S","Hyper Beast","covert",76.63,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9JuPh5SjuMlxgmoCm6lob-KT-JbwF1WZEjR-YJskK9k9XiYePltAeNjYlAxSn5j34dvCZstb4LB6Ut-7qX0V8Xkv5_2A"),
      s("skin-bb6ba9602776","MAC-10","Neon Rider","covert",67.5,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-dC2ie0-dytfNWQyC0nQlp5DzTntmgdC7COABxX5NxQrUOtUS5w4LgMu6zsVCK2IJCmyisjitM6DErvbicsEA0SQ"),
      s("skin-352633fab46b","★ Bayonet","Marble Fade","gold",293.73,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6lsMvKfC1iWwOpzj-1gSCGn2xhysWrTn42rdH2SawQnDccjE-ELsxa-mtTjMejr7wXZgoxFn3n2hnhXrnE8oMvxYMA"),
      s("skin-65d7965e0e39","★ Bayonet","Tiger Tooth","gold",375.02,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POgV7BkJ_WBMWiCwOBxtd5lRi67gVMhsGrTntn4ci-ROAYlXMBwE7YL5BaxxIHjY-vq7w3X398RxS78iylK8G81tBow9RWL"),
      s("skin-d6f209a51abb","★ Bayonet","Doppler","gold",163.27,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV7Z4IumsA2aCw-JzuftsSxa_nBovp3PWnomsdn2QPVN0D5UiEOUP50LtltTvY-Ll4g3YjItFmSv-2i9A6X4-_a9cBu2YVmHc"),
      s("skin-b28c8d3ffc15","★ Bayonet","Doppler","gold",215.26,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV7dsMOCbB3WV_uN3ouNlSiCpkBkYvzSCkpu3d3_FaFUnXpRwEO4O50G5xoW1Y7zn5wLe3oxBxHn6jiwf7XposO8LBb1lpPPeBvHrwA"),
      s("skin-d466b1683b88","★ Bayonet","Doppler","gold",378.56,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6ZhIfOYHmKR0-JJveB7TSW2nAcitwKJk4jxNWWVZ1AmDJIlQuZcu0btx9e0Y-205gOL3dhGzS333CpBvHxi6ucEBfcg5OSJ2MqXuBCE")
    ]
  },
  {"id":"case_chroma1","name":"Хромированный кейс #1","subtitle":"AWP Боец и Классические Допплеры","category":"base_cases","price":3.9,"accentColor":"#6366F1","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fq2wP7qr6bqI5cvHDCzfBlbcv57JqF3zrxRkj4W6Dwo34dy6QPQAoC5ZyW6dU5cxvklfG"),
    "items": [
      s("skin-db73213412f6","Glock-18","Catacombs","milspec",1.26,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-XC2aEyfp5vO1WQyC0nQlptWWDzIz8dy6QalMgXsMiQbEJtRjskdW2M7nn71Dcj49Fm3qsiClB7jErvbhnnfwjgw"),
      s("skin-4c2aae5b0b8d","M249","System Lock","milspec",1.31,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiFO0P_8PP1SM_WYGmiC_uJ_t-l9AXzhzEt25Wjcn4n4dHKebgMlCMB2RO5b40S-x9TnN-KztFDf3ohDzirgznQedTUXMuU"),
      s("skin-f982be094874","MP9","Deadly Poison","milspec",1.39,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_jdk4uL3V6BoIfSfF1iAzudlv-9WQyC0nQlpsm3Vy9f4eXvEPwcoCcNyQOBY5EWxwN3gNru0tFGK2d5Mny__iS8c5zErvbjRwweEJA"),
      s("skin-d38eab775911","SCAR-20","Grotto","milspec",0.6,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk7uORe6dsMqLDMWuVwOVJvOhuRz39zRtx62uGm9z8JHnFaFR0AsAjRuQI40Sww9HvNunqtQTego5MmSX4izQJsHiOao_ijg"),
      s("skin-024f8ae1278e","XM1014","Quicksilver","milspec",1.56,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7uORcKk8cKHHMXSZxuJ3j-1gSCGn20oksGTXy4yrIC3GbwYpCJF1RuQMtkG-koCyNO22tVSIiY1GxXn6iyhXrnE8nW2Det4"),
      s("skin-25ead8f88d62","Dual Berettas","Urban Shock","restricted",3.6,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s2rZK15JeOsG3WSwOBlpO57Qha_nBovp3PQzI6pc3iRZ1cjC5dzQe4CsxPtwdHjMevq41CLjIpMm3_5jypN7Cxp_a9cBoxgoAoS"),
      s("skin-75138a0c07b3","Desert Eagle","Naga","restricted",4.32,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uORbKFsJ_yWMWmRxu9JvOhuRz39zEx06jjWm4n8Ii6WPFQhA5YjE7MJskPrwdTuZb7htlHbg9oTzCn2hjQJsHhQd9ynBw"),
      s("skin-4938e7b7b6cd","MAC-10","Malachite","restricted",2.55,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a4s2jaac8cM-eD2uRwuZ_pORWQyC0nQlpt27Uw4yrJy_FOlQpCJp2Te5Y5hPqw9HuYePksVaKjt0TmS_2hihJuDErvbgNFzWT1Q"),
      s("skin-43a9e7d8242e","Sawed-Off","Serenity","restricted",4.49,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZt-IeeWCmiWx9FytfdocCW6khUz_W2Dwtv6cXLFZgUnD5VzQrMPtxjrx9K0Ye637wzYj4gXzimqiH9KuC91o7FV9mPR2UI"),
      s("skin-2a8ebacc14e8","AK-47","Cartel","classified",13.46,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNK0POlPPNSI_GBGmKc_uJ_t-l9ASuywktwtW3dwt79eX6fZlUiCJJ1RbUPtkW8w4LiZe_i4ATYjN8WmH7gznQeZkk4ehM"),
      s("skin-d6f2e7995a15","M4A4","龍王 (Dragon King)","classified",17.24,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSIf6QC3SE0-96j-1gSCGn20x062mAwtb8cX3CaAMoApV3EeFZ50Wwk9fuM-vqtAHW3opHn3iqiSxXrnE8PytIGFg"),
      s("skin-add7770f46d1","P250","Muertos","classified",18.28,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSLfGdCmacwNF6ueZhW2e1lh51sm3UmN37cHuUbQQhXJtwQO4C4BXsxtHjM-624A3a2IoWySiskGoXuSIJMqiP"),
      s("skin-67b936c9cb52","AWP","Man-o'-war","covert",80.84,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k7uW-V6NhL-KKMWuZxuZi_uM5HXG3xhh_t2iBnI2ucn3EZwEjDpJ0Q-dY5EPrxNTiYevj7gXa2IhbjXKpQIFOiXU"),
      s("skin-94878071c8d9","Galil AR","Chatterbox","covert",72.66,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWaS0-9lue5ncCS2kRQyvnPXnIn7eSrEZ1AnD5NxTeII4ESwxN3jN7zl5QHXjdhAnyuo2y9Nv3xs_a9cBuAhdjfO"),
      s("skin-352633fab46b","★ Bayonet","Marble Fade","gold",209.81,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6lsMvKfC1iWwOpzj-1gSCGn2xhysWrTn42rdH2SawQnDccjE-ELsxa-mtTjMejr7wXZgoxFn3n2hnhXrnE8oMvxYMA"),
      s("skin-65d7965e0e39","★ Bayonet","Tiger Tooth","gold",352.71,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POgV7BkJ_WBMWiCwOBxtd5lRi67gVMhsGrTntn4ci-ROAYlXMBwE7YL5BaxxIHjY-vq7w3X398RxS78iylK8G81tBow9RWL"),
      s("skin-d6f209a51abb","★ Bayonet","Doppler","gold",149.53,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV7Z4IumsA2aCw-JzuftsSxa_nBovp3PWnomsdn2QPVN0D5UiEOUP50LtltTvY-Ll4g3YjItFmSv-2i9A6X4-_a9cBu2YVmHc"),
      s("skin-b28c8d3ffc15","★ Bayonet","Doppler","gold",419.24,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV7dsMOCbB3WV_uN3ouNlSiCpkBkYvzSCkpu3d3_FaFUnXpRwEO4O50G5xoW1Y7zn5wLe3oxBxHn6jiwf7XposO8LBb1lpPPeBvHrwA"),
      s("skin-d466b1683b88","★ Bayonet","Doppler","gold",350.18,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6ZhIfOYHmKR0-JJveB7TSW2nAcitwKJk4jxNWWVZ1AmDJIlQuZcu0btx9e0Y-205gOL3dhGzS333CpBvHxi6ucEBfcg5OSJ2MqXuBCE")
    ]
  },
  {"id":"bm_weapon1","name":"Оружейный кейс CS:GO #1","subtitle":"AK-47 Case Hardened #661 & AWP Lightning","category":"black_market","price":85,"accentColor":"#38BDF8","customChances":{"milspec":74,"restricted":18,"classified":5,"covert":2,"gold":1},"image":u("@JKz2lu_XsnXwtmkJjSU91dh8bji61XxRCKg0MSz_nUDvPb-OPFvdKTFDzbAkbp16bY5Gn6wkx9ysj7Xntf9IC6WZgA-Sswnnj45WXo"),
    "items": [
      s("skin-2ca8cb95f31e","MP7","Skulls","milspec",35.44,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Ttk_Pm7ZKh-H_yaCW-Ej7l35OBoTCrmzUQht2mDwon7cHuWPFUlDcFxQ7EDtxbpx4W1Y-LltAfAy9USYNky6pY"),
      s("skin-b4a128e52d9e","AUG","Wings","milspec",23.26,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk6fevfKxoMuOsD3KX_uJ_t-l9AX7qzE5_sGmEw9uoJCrBOgMoDsN2ReMI4EPrm4fvY-m04ASPgt8Uz3_gznQePzx-iqc"),
      s("skin-679e953fac9d","SG 553","Ultraviolet","milspec",34.39,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I4M2-fbZ9LPWsAm6Xyfo44bQ-Tn7gwRt-t2uAw96tIn7FOAF1CsckQLUJ4xXskdO2NLzrtAyIi5UFk3tU_MwgmA"),
      s("skin-75c8474d12a2","Glock-18","Dragon Tattoo","restricted",121.09,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2qeqVqL_6sCWufwuVJvOhuRz39xUl-6miDzI37dHyXOlIkA8MmROVfshO9w9G1Ye-ztgPX34tEyi74jjQJsHi_DRfxVg"),
      s("skin-3061aea08996","USP-S","Dark Water","restricted",100.41,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSIf2sFGKS0-9JtOB7RBa_nBovp3OHy9v8J3vFbgIhC5UmQ7UIsxm7wNDnNr_rswOMiNlGmCWoiH9Juis9_a9cBl2xnYuj"),
      s("skin-795d725893f2","M4A1-S","Dark Water","restricted",90.94,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GeMX2Vw_x3j-VoXSKMmRQguynLzI6td3-TPQAlD5slR-EJ5hDux9XmMe7i71CI2t8UzSuthi9OvSlo6vFCD_TltxSe0A"),
      s("skin-5fd3ee42a6c4","AK-47","Case Hardened","classified",311.14,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNK0P2nZKFpH_yaCW-Ej7sk5bE8Sn-2lEpz4zndzoyvdHuUPwFzWZYiE7EK4Bi4k9TlY-y24FbAy9USGSiZd5Q"),
      s("skin-be4448a9c6e2","Desert Eagle","Hypnotic","classified",321.36,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7vORfqF_NPmUAVicyOl-pK9qSyyywxgjtmnVytyocnLGPA4iWcYmRLYIu0S-xtbuMLjg51DXjoJC02yg2VjGnh4J"),
      s("skin-69390026d135","AWP","Lightning Strike","covert",875.7,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k4_upYLBjKf6UMWaH0dF6ueZhW2frwU1_sW2EmNyvc32RZwMpCpcjQ-EJ4xbtmt3gYezk4wzb3tpAy3mrkGoXubsGIfVN"),
      s("skin-vanilla-weapon_bayonet","★ Bayonet","Classic","gold",4431.35,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKni_DtU4fe6Jv07IfTDDT_JkL4htLI7HCvmwE9z42_Vzov4ci2Wa1IgWMN3R7IMuxCm0oqwYUAZNBA"),
      s("skin-95831ce7c492","★ Bayonet","Fade","gold",6516.05,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POvV6JsJPWsAm6Xyfo45-BrHniwzUh24jjVm4qgInnCOA4mDscmEeVcsBXtkN22P-yx5waNg5UFk3tAoG85FQ"),
      s("skin-8084beee1235","★ Bayonet","Slaughter","gold",5334.07,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV75oIuKSMWuZxuZi_uU7HyjhwUh-tm_Xydmuc3nGbwN2ApAmQeNfsUXtktOzYuLm5FPajN9bjXKpLQ8HVlE"),
      s("skin-1a4722df3bb9","★ Bayonet","Case Hardened","gold",7869.37,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PO_V6tkLPWXMWuZxuZi_uRrSXDlzUtw4WTRwtj4eX6XPAd0XsEiROcNthm-w4HhP-Pq7waKiItbjXKppDMdu0I"),
      s("skin-d90370c635f2","★ Bayonet","Night","gold",4300.22,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0OGhV6pkJ_iHMWuZxuZi_rQ4Snzhxkkj4m3Tm4uqcS2fagNxDZJ0QOMNuha6kIfhYumx4gDeidlbjXKpXW1AuvM")
    ]
  },
  {"id":"bm_bravo","name":"Кейс операции «Браво»","subtitle":"AK-47 Огненный змей (Fire Serpent)","category":"black_market","price":65,"accentColor":"#F59E0B","customChances":{"milspec":74,"restricted":18,"classified":5,"covert":2,"gold":1},"image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj7-lz1QAn4kZjf9CsVuvf7OfQ5IabBVzbHlb915bcwHCjikEp_sTnTn4z6eH6RblQlC8RwFPlK7EdXSP0Ibg"),
    "items": [
      s("skin-2d74b85300d2","SG 553","Wave Spray","milspec",8.25,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I_829eLZsOc-ED3GV0tF0ouB_QBa_nBovp3PcwoqtdC3BOwQkCZB3QOIIsxm_kNyyZuzg7w3f2YNEnn6qjS0Y6Clq_a9cBmkkHSs4"),
      s("skin-d3c029086736","Dual Berettas","Black Limba","milspec",20.62,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s29baV-L_6sC2uZ1etlj-N7Tj-8qhEutDWR1NyuJC6SPQQoC8N1TLYMthC_kNTmMOKw4gLe2osWmC6vhylB6C5i4OscEf1yNRLqhkE"),
      s("skin-353d0fe2cbd6","Nova","Tempest","milspec",25.23,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwipC0OGrabdkJPWsDHWR1-FJvOhuRz39xUUk4jiHyt_9cXzGZwV2CJJyQbYN4Ua9wdPiZr6x4FTcjIhMzXmsjjQJsHjYOlWGdQ"),
      s("skin-9dc89a8890a8","Galil AR","Shattered","milspec",11.93,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V6d_Nf2DAmKvw_x3pu5WQyC0nQlpsm7dn96tcniROgMoX8RzFuIJtRPqxtXhMujjsgLYjIlEzS-ojiIa5jErvbio8HB-SQ"),
      s("skin-8d4ed32149ee","UMP-45","Bone Pile","milspec",27.26,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1I_829Y7FhLM-XB2aX0-97j-N7Tj-8qhEutDWR1I6rcX3GblRyD5V1TecIsxPukdbuYeqz4Q3ZjopMyiyrjHgfuCdqt-kcEf1yvOcVYJ0"),
      s("skin-936ee5da3f8c","G3SG1","Demeter","milspec",21.75,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1T9s2sZLFoMP-fF2Cfz9F0ouB_QBa_nBovp3OEnoz4cHnFZgMnD5R5TeQP40Swx4XgNLm34g3ei49FxC2qiXgbuy9t_a9cBh-mV6Cr"),
      s("skin-acea8e851fd7","USP-S","Overgrowth","restricted",79.12,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSKOmsHW6VxutJsvNoWSaMmRQguynLytyqdy2eaVUgAsB0QeIIsxfuldy2MO3gtFSI2ooRzSiq3HxA7SlvtfFCD_RGjmYWyQ"),
      s("skin-1d49604dde9e","M4A4","Zirka","restricted",67.58,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFL0OG6abZSIuKSGGivzedxuPUnSXnqkBwj62vTn9b8cyjBOlNxD8Z2Te8L5Ea8xtbkNe6z7lTajotCmDK-0H35HfkCFQ"),
      s("skin-2af390dd512c","MAC-10","Graven","restricted",93.18,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a_s2rfKdlJfSsA2aTkL5JsvNoWSaMmRQguynLztytdHieOA92W8N5Re4D4ELtk9O2Nbnq5FfWjIkRn333hn9O731j4_FCD_RXlm8jng"),
      s("skin-e31ccc486589","M4A1-S","Bright Water","restricted",87.28,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_iKMWiTxO94j-N7Tj-8qhEutDWR1N2scy2Sa1UkC8NyRbMPuhexx4fgYrziswHf395Az3-qiStK5i864-kcEf1ycufvRr8"),
      s("skin-da401ae2ca2e","P90","Emerald Dragon","classified",249.91,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_jdk6-Cvb6tjH-DKXliS0-9gv95lRi67gVMm4m3Vzdmqci-SO1clX8Z1QeYO5xi5mtTuPu7l4FDc2o4TmH32jC1P8G81tLxM49od"),
      s("skin-b4a45f1fac9d","P2000","Ocean Foam","classified",176.41,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0POjV6t-M_mVF1iSzftzj_E7H3njqh81siuKpYPwJiPTcA91W5N0EOMNskGwkt3gP-vh41GNiNpDn3r83ShL6itj4bsKA6Im-_XJz1aWVAZrXOc"),
      s("skin-278adf18c50e","AWP","Graphite","classified",232.07,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k7OC7ZbRhJc-RHGaGztF6ueZhW2e2k0l2sW_WzN7_cS6SbgV1CsF3TOEI4EOwloGzNLzg5g3fiIpHxC78kGoXuTqeOjwH"),
      s("skin-2599a8720f89","AK-47","Fire Serpent","covert",972.12,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0PSneqF-JeKDC2mE_u995LZWTTuygxIYvzSCkpu3cnvFPQB2DpUkROFY4Rntw93lP7i241DbiI1BxSuviHlKunk_6-sHU71lpPMTRLyP4Q"),
      s("skin-706c54974c2f","Desert Eagle","Golden Koi","covert",1096.7,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7v-Re6dsLPWAMWWCwPh5j-1gSCGn20om6jyGw9qgJHmQaAcgC8MmR7IMthm5m4W2M7zj7wOIj4pGn32o23hXrnE8VHBG1O4"),
      s("skin-vanilla-weapon_bayonet","★ Bayonet","Classic","gold",6276.8,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKni_DtU4fe6Jv07IfTDDT_JkL4htLI7HCvmwE9z42_Vzov4ci2Wa1IgWMN3R7IMuxCm0oqwYUAZNBA"),
      s("skin-95831ce7c492","★ Bayonet","Fade","gold",4759.33,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POvV6JsJPWsAm6Xyfo45-BrHniwzUh24jjVm4qgInnCOA4mDscmEeVcsBXtkN22P-yx5waNg5UFk3tAoG85FQ"),
      s("skin-8084beee1235","★ Bayonet","Slaughter","gold",5728.11,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV75oIuKSMWuZxuZi_uU7HyjhwUh-tm_Xydmuc3nGbwN2ApAmQeNfsUXtktOzYuLm5FPajN9bjXKpLQ8HVlE"),
      s("skin-1a4722df3bb9","★ Bayonet","Case Hardened","gold",4691.26,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PO_V6tkLPWXMWuZxuZi_uRrSXDlzUtw4WTRwtj4eX6XPAd0XsEiROcNthm-w4HhP-Pq7waKiItbjXKppDMdu0I"),
      s("skin-d90370c635f2","★ Bayonet","Night","gold",4857.26,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0OGhV6pkJ_iHMWuZxuZi_rQ4Snzhxkkj4m3Tm4uqcS2fagNxDZJ0QOMNuha6kIfhYumx4gDeidlbjXKpXW1AuvM")
    ]
  },
  {"id":"bm_hydra","name":"Кейс операции «Гидра»","subtitle":"AWP Они Тайдзи и Перчатки Гидра","category":"black_market","price":39,"accentColor":"#10B981","customChances":{"milspec":72,"restricted":19,"classified":6,"covert":2,"gold":1},"image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frHUVt_b6PfY1JfOSXDXJxbgjtLFqHnDqx0Qmtm_Vzdf4ICmUZlJ2C5F2TPlK7EdjN0FcPg"),
    "items": [
      s("skin-d2ff95e10b1f","USP-S","Blueprint","milspec",10.05,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA0tF0vPRsXzu6mwkYvzSCkpu3IiqTZgAmCJIlRLEP5BXpxtPlMOOxswPZithFyyj3iyNPvCo96r1QBb1lpPPa5SpubA"),
      s("skin-72470f196aad","FAMAS","Macabre","milspec",6.34,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I_82oaalsM8-eD2SRw_xzj-1gSCGn2xkm5myEzo2sdXPBagInW5pxTLICshnswdOxNrzj71fc2d5CzC76iSJXrnE8xi9ndzw"),
      s("skin-c254f71da49b","M4A1-S","Briefing","milspec",5.64,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj-xsWzu6gRg1sgKJk4jxNWWTZgclDpNzQ7FZsESxxNPgZujksVDf2dkTmS343S1M731t5OcLAvZ05OSJ2NaAMPYY"),
      s("skin-3f4120c9e552","MAC-10","Aloha","milspec",7.44,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a4s2jaac8cM-SAmiYwNF6ueZhW2flxhsmtW3RnNiscnOWPA9xC5MiTeUKtRXqk9HgMOvh4wPd3tkQmXn6kGoXucQMChaB"),
      s("skin-f316468861b1","MAG-7","Hard Water","milspec",14.68,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiNW0P-vb_NSI_GGHXOZwtF6ueZhW2eykx534j_VydygIi6fPQJ0DJcmQrIMukK7k9HvZO224FbajI8WnC-tkGoXudK2z8cj"),
      s("skin-83039fec2ec8","Tec-9","Cut Out","milspec",12.16,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiNK0Oara_1SI_iSAmyv0e9ipOR7QRa_nBovp3OGnNb4dHiTaFdzX5EjRLVY5EG6mtOzYu7q4FDb2IxBynmvi34bvCo__a9cBktm4Qsf"),
      s("skin-289b0ffc81ae","UMP-45","Metal Flowers","milspec",6.98,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1a_s27ZbQ5dc-VAmadxOh6v_ZsXRa_nBovp3PTnN2vc3zGaFAgWMZ4F-MDsBW7kNXhP7i04gCI2oNDyij8iSpI7S84_a9cBuxmxCPI"),
      s("skin-b54386e7c78c","AK-47","Orbit Mk01","restricted",51.29,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlV6diLP-dFzfB_vxztN5lRi67gVMk4TmEn9n_c3PGPwZyDMckTO8JsEPuktG1ZOrjsgPX2IwUyiyv3S0f8G81tLnuvOvF"),
      s("skin-ebbde3e289ee","P2000","Woodsman","restricted",25.58,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMW-Fz_pzot5lRi67gVMi5GuBzo6sJXiSOAJxCMR2RuECthTskNG1Yrm3sgCM345CyCj32yJP8G81tLtUlzXH"),
      s("skin-a73d69feecaf","P250","Red Rock","restricted",34.33,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSIeiaAWqvzedxuPUnSizhkEh05zzQmIr8JX6UbAZ2DsMhTOEOthexl9e2NuLktAzaiIpGnjK-0H2BmRk7ww"),
      s("skin-73449301d7a3","P90","Death Grip","restricted",46.82,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf9Ttk_6v-V6ZsMvWRAWmV0tF0vPRscCW6khUz_WqAy4z6cX2Tbg8hWJN2RLQMsRPplNDmYr63sVPciIkTyij3iX5M7yt1o7FVUmFnInA"),
      s("skin-d9516fc63729","SSG 08","Death's Head","restricted",44.61,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-XC2aEyf1-teBtcCW6khUz_WTXyNipeX-QOlQhXpJwFuYO4xLqxobuN7vn4QaNgthBnHn7iSJPv351o7FVSPuLyfc"),
      s("skin-81ad76182a96","Dual Berettas","Cobra Strike","classified",114.63,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhIvWBC3OEwP1Js-5rXSiMmRQguynLydn9JXmUOwMgCsN1EbMPsRHtxoDuZrzm4VTait4Tzn_-jn4f7ipu4fFCD_Qo-zseRg"),
      s("skin-99def93a5fe2","Galil AR","Sugar Rush","classified",139.79,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWSRz-pvs-loQDqMmRQguynLyNqpJX_CPwUpXpEmEOMLs0K-kdPiN-uz4wfW2IgWyySr2ixKvCht4fFCD_QYspg1jQ"),
      s("skin-12d0c696aacd","M4A4","Hellfire","classified",144.34,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSKPWfAmGZ0-tJvOhuRz39zEp24GTXmImsInqWP1AkXpBwE7FetUTswdfkPu7h5QXXithBy32t2DQJsHhDPmtuAA"),
      s("skin-06e2ad662c73","Five-SeveN","Hyper Beast","covert",673.86,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-lwXyyhlxgmoCm6lob-KT-JO1QgWZVyELEPu0W4l9KzYbzn5Fbf3YkTzn_8hihIvXxtsOoFUKYirLqX0V_f6-eqCw"),
      s("skin-cfaaa2fab447","AWP","Oni Taiji","covert",836.09,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6xsLv6KD1icyOl-pK9vGCqwkx524G_WnNmsInyXOAVyXJJ0TbNb5EOxxIflYbzj4gDdiNlC02yg2XaKgrAq"),
      s("skin-de7d4238a5c9","★ Bloodhound Gloves","Snakebite","gold",4020.84,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSI0vTyOn5zyKCX4PERxSdEfGb5d6lSmxIfuMezmtFfb39lAxCivh3hI6Chi4eYGWfAt8vXTiw_EM7Q_t5NWIeHnE0qrynbE1A"),
      s("skin-4e17d497a43e","★ Bloodhound Gloves","Bronzed","gold",3443.19,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIqtimEloPwIhTLN1F4Tox2Q7UJ4RLrltDkMuyz4ASIg4kUxCr5jy8fvC46sLtWWaojqKze2giTL_Rjtvi23tdj"),
      s("skin-c9241d03e33b","★ Bloodhound Gloves","Charred","gold",3152.99,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIlvzyGkbDqKCfRO0RPVssnHaMUsES-k9HjNrixsgbd3YIRni7-inlO5i5t6-pRAqIs_aOFjg_JZbU5sI5Deqh-Veq-pA"),
      s("skin-cd619968abb9","★ Bloodhound Gloves","Guerrilla","gold",1618.09,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIgpjiXiIb1LSr4Ml93UtZuR7QKthCwl4fkNuqw4lPXgosRzi78inwdvyk45e5UUqQkq_aDi1rEZap9v8fy7GQdug"),
      s("skin-941014ee5a6e","★ Driver Gloves","Crimson Weave","gold",3507.09,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t_JfSsAm6Xyfo4trVoSnGxlh9x5DmEzt6rJS2RagYiA5siQ-MLthW9xtDlM7uxtFCNgpUFk3thcTnRAg")
    ]
  },
  {"id":"bm_glove","name":"Перчаточный кейс (Glove)","subtitle":"Изумрудные и Кровавые Перчатки","category":"black_market","price":29,"accentColor":"#FACC15","customChances":{"milspec":72,"restricted":19,"classified":6,"covert":2,"gold":1},"image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frHcVuPaoafU1JqiVWWSVkux15OQ8Giiylk0k5mvTnIqpd3PCaQIhWMYkE_lK7EcNeCKW-w"),
    "items": [
      s("skin-6f20b68a8c63","CZ75-Auto","Polymer","milspec",9.36,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2tcrI_H_2VMWuZxuZi_rcwSnHjwxgh527SzI6oIHKUZ1dxA8ckTbUCskG6ldTuY-nh5FTf34JbjXKpj6qz0B4"),
      s("skin-19a7e921eb77","Glock-18","Ironwork","milspec",4.13,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a_s2pZKtuK8-XD3WbjOh3vO1WQyC0nQlp5jmEmNaodH6VbwMnApshEOcPskOww4e0N-qz5lPZ2YlGyCSviika6zErvbhhWFzqpw"),
      s("skin-df49957ef56b","MP7","Cirrus","milspec",8.78,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf-jFk6fugaahSMP-cAmOVwOpg4t5lRi67gVMj5j6Dwtaocy6UOAIgApNyQrQOshS7lIXlMbvqslHfi41Eyi7823xK8G81tHGGql6L"),
      s("skin-2c0ae1658110","Galil AR","Black Sand","milspec",6.41,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWaCjO13ve5WQyC0nQlp5T7dzoqpeX3FZ1R2DZd4Qe4CtRS_k9y0Ye7qtQOP2oxAyX73iytK6TErvbi0QhR0PQ"),
      s("skin-40273e06d839","MP9","Sand Scale","milspec",9.9,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_CNk5_uqbelgMKmsAm6Xyfo4tuA9TnDrzB5w5GTczo74cnyTblAkWcclRuYIuhXplde2ZePl4FTc2ZUFk3tXKn8xpQ"),
      s("skin-cc6ec471ea94","MAG-7","Sonar","milspec",6.95,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiNW0P-vb_NSLfGfCGiCzNF6ueZhW2fgxEol4TnQyo2qd3qTPwQhD5d0F-YPuhHpwNHlZLvi5VTY3dhAy339kGoXufaFAiYQ"),
      s("skin-d044427dd6f6","P2000","Turf","milspec",10,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PW9V7Q_cKDDQ3SAzvxij-1gSCGn20h14mSByd6vJXmUagQoXpMkQecN40Xsm4DhM-3k4lTY340UxCn53HhXrnE88VIlnLo"),
      s("skin-54963e630d31","Dual Berettas","Royal Consorts","restricted",26.39,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhH_KWHGKE1e9lj-ZmQy22myIxtjOMmYrGLSLANkI-C5AjFOcM5EaxxtTmPrnl4Q2Ki91Eyyz32y1Luyk44u4LUqEjr_ff3BaBb-MmOWu8Lw"),
      s("skin-00b8673938d7","G3SG1","Stinger","restricted",36.91,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-FB3eV09Fvte1lQD6MmRQguynLyo6rdH-RPAZ0D8chQeIL50TukdK2P-_rtFPejN8WmH34jylJvHtq5fFCD_TvHmnxYA"),
      s("skin-3795f6827a11","M4A1-S","Flashback","restricted",26.49,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9Jtu1oXCGxlB4sjDGMnYftb3yVPQFyDMB3EbJZ5xC4kNPvMOO35AHW3d1AnC_3iHlNuytqtuYDVfI7uvqAZWXE-YM"),
      s("skin-b935cdf1da4b","Nova","Gila","restricted",27.95,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiNW0PyhfqVSM_GdClicyOl-pK8wHnrrwU8hsW2DyoqgeSieblIkDJZwQu8Cs0TultLgP76051SPid9N02yg2S7-0Sao"),
      s("skin-95653cc7fb0e","USP-S","Cyrex","restricted",21.85,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_u1vouRxcCW6khUz_TjdzdmsJyiTZg8kX8N4ELUP5EPsw9G1YeLn5VTXjY0WxS6rhiIYuCd1o7FV2N83Spg"),
      s("skin-ea2876c00b6b","FAMAS","Mecha Industries","classified",82.6,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2oaalsM8-eC2SYwNF6ueZhW2ewwx4hsm3dz46heSjCPVUjC8chEOYMtxOwkNHiYb63swXY3Y9Nn32skGoXuc3DGOrc"),
      s("skin-6772919e8e84","P90","Shallow Grave","classified",120.71,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf-jFk_6v-V7dlIfyfAXCvxvx3puRWQyC0nQlpsWzUyIqvcCiVPFQnW8YmEO4P5xi6xNS2Num35FbX34lCzX7_hytK5zErvbi02RizsA"),
      s("skin-9a257b12e3fd","Sawed-Off","Wasteland Princess","classified",87.65,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZt6MM-AD3CVxeFwtt5lRi67gVMksWuEmduuIH2fPwUkWJojQuMP5xi8lNzlY-234lDag4xFnin_jihN8G81tH9UxALW"),
      s("skin-318f343e125d","SSG 08","Dragonfire","covert",628.38,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-XHGaXzuBwufNscDqwmg0ijDGMnYftbyrFPVAoWcQjELQOuxO4k4e1N-nnsQfW2I5Mz3ivi3wb7Stj5ukAUKY7uvqAqS55_Pw"),
      s("skin-01d7c60eddbb","M4A4","Buzz Kill","covert",650.94,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSM_WQGmiC_uJ_t-l9AX22kBh0tm3Qn92qdS7GPARyW5t0QLQD4xi6w9XkZe3jsgDW3ogUnH3gznQeqfpfmso"),
      s("skin-de7d4238a5c9","★ Bloodhound Gloves","Snakebite","gold",2212.25,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSI0vTyOn5zyKCX4PERxSdEfGb5d6lSmxIfuMezmtFfb39lAxCivh3hI6Chi4eYGWfAt8vXTiw_EM7Q_t5NWIeHnE0qrynbE1A"),
      s("skin-4e17d497a43e","★ Bloodhound Gloves","Bronzed","gold",2753.13,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIqtimEloPwIhTLN1F4Tox2Q7UJ4RLrltDkMuyz4ASIg4kUxCr5jy8fvC46sLtWWaojqKze2giTL_Rjtvi23tdj"),
      s("skin-c9241d03e33b","★ Bloodhound Gloves","Charred","gold",1213.76,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIlvzyGkbDqKCfRO0RPVssnHaMUsES-k9HjNrixsgbd3YIRni7-inlO5i5t6-pRAqIs_aOFjg_JZbU5sI5Deqh-Veq-pA"),
      s("skin-cd619968abb9","★ Bloodhound Gloves","Guerrilla","gold",1773.96,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIgpjiXiIb1LSr4Ml93UtZuR7QKthCwl4fkNuqw4lPXgosRzi78inwdvyk45e5UUqQkq_aDi1rEZap9v8fy7GQdug"),
      s("skin-941014ee5a6e","★ Driver Gloves","Crimson Weave","gold",2395.72,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t_JfSsAm6Xyfo4trVoSnGxlh9x5DmEzt6rJS2RagYiA5siQ-MLthW9xtDlM7uxtFCNgpUFk3thcTnRAg")
    ]
  },
  {"id":"bm_breakout","name":"Кейс операции «Прорыв»","subtitle":"100% Ножи-бабочки в золотом пуле!","category":"black_market","price":18.5,"accentColor":"#EC4899","customChances":{"milspec":74,"restricted":18,"classified":5,"covert":2,"gold":1},"image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fqWxdv_b8O_w5eKXBWWXHw-smtrBvTHDmwEsl4jvWn4z_I3qWZwV1X5ZwW6dU5RcRF1o0"),
    "items": [
      s("skin-cab4b847a978","MP7","Urban Hazard","milspec",2.6,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_jdk4uL5JadiLf2SAGOV09F6ueZhW2fgx0gl4WTczdj7I3LFaQYjDcQiE-Beuhe6xIXnP-_l41eKi9pEyH79kGoXuW6iY_I1"),
      s("skin-a3cdd0b6440e","Negev","Desert-Strike","milspec",7.02,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-HB3ORz_1iv_NkcCW6khUz_WnUz42tI3-WOw5zDpAmQOQD4ELskoDlMeni4gTWjoNNmSj_33kcvC51o7FVXp6G1h4"),
      s("skin-70f8ab3bec6b","P2000","Ivory","milspec",6.68,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMW6Gzvxvj-1gSCGn20gism3dz96pc3KVOgYoCpR4TOFZsxbsxNzlYejl7lPWiIJBmX6t235XrnE8r5B4jsA"),
      s("skin-ded653e7bd24","SSG 08","Abyss","milspec",3.33,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1a_s2ibbJkIeSbD2mvzedxuPUnH3_jzE1y4TvQyIr9JyieZlckCsRxF-8K50bsxN3gZOzktAzc2IJEzDK-0H1XlSI8xg"),
      s("skin-4446c57d24ed","UMP-45","Labyrinth","milspec",5.64,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1T9s2iYapoM8-cHGaexutJvOhuRz39wRtx4WXczNupdS2XawApD5okQLEK5hm4kYHvYrjm5FDbj4MWnnn4ijQJsHh9pjg_2g"),
      s("skin-5e748c63e9a7","PP-Bizon","Osiris","restricted",18.46,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1Y-s2sYb5iLr2cHW6CyP1JvOhuRz39xUxx6jiBz42rIHjBbAcnWZcjROcJsxjtmoXmNe_k5QHajtlNyC2r3zQJsHh050JUDA"),
      s("skin-c80f871a746d","CZ75-Auto","Tigris","restricted",24.88,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2tP_FsbeSaCWKC_uJ_t-l9ASvil0R15WjUmYmqc33CaQ91W5QlRbVetETtwNC1P-u34g2L2dpEmS_gznQebcVQ6rs"),
      s("skin-b029cb49c14f","Nova","Koi","restricted",25.3,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiFO0PyhfqVSK_-aMWuZxuZi_rBqGCu3xEoksm_SzomhcHiQP1QjD8BxQuAN50TtlIK1Yri05lDeiY5bjXKpu6W3YF0"),
      s("skin-bf19fabb24ef","P250","Supernova","restricted",20.42,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0PCnfLBoMuOEC2KE_uJ_t-l9AXzlwk5zsGnWz46uICjCPAZ2CZF0QO8LtBjtkNaxZrji7wbY2tkUySXgznQe4Iqu8Lg"),
      s("skin-ec1689ee3e4c","Desert Eagle","Conspiracy","classified",74.63,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ_yWMWaF0-tjo95lRi67gVMk4WTSm9moI3-QPVBxDJByQOJe40O6k4fnM-zgsQXci4gUyH3_3CMa8G81tJHuULJI"),
      s("skin-897d2a01202c","Five-SeveN","Fowl Play","classified",88.56,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRabVSdaesCGKR1eZzovJWQyC0nQlptm_Vw9ercnOUaA8lA5skFuIPsxPqmtXkNu205lfYiN8XnCyvj3hNvDErvbiIo1idJQ"),
      s("skin-c879dd5925b2","Glock-18","Water Elemental","classified",75.69,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK72fB3aFxP11te99cCW6khUz_TjVyompc3-QOFR2DJQkFOMJtBbqk9LlY-7n5QLZjtkTxCWqhixPv311o7FVIf8eASQ"),
      s("skin-c01d561550ed","P90","Asiimov","covert",259.38,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_jdk_6v-JaV-KfmeAXGvzedxuPUnTSjikRgksjuBzoz4dXLFb1QoC8QlTLQD4EPqk4LvN-Pns1aMioNBzTK-0H3gQVv65g"),
      s("skin-0ae3586c85da","M4A1-S","Cyrex","covert",398.04,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj-JwXSyrqhEutDWR1N77cimSbQQgC8F5QLYCsELpltTnZuvk7wbcjdhDzy_43yMb6ilvt7kcEf1yDWu2yf8"),
      s("skin-vanilla-weapon_knife_butterfly","★ Butterfly Knife","Classic","gold",1242.71,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2sfbB5JeKVAn7elO8l6LRoF3_hzBsmtWSDzt-rcy3BP1AnXsR4FOJZskG6xtDkM7627xue1dy94mNpNQ"),
      s("skin-6656ae9270b9","★ Butterfly Knife","Fade","gold",1580.61,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2avx-9ytd5lRi67gVNwsDvSwtqqc3iXZg4kCZYjReYLtRbum9XgYuvm5wbWjtgUzCn3iSsf8G81tFEeH9rw"),
      s("skin-6c3fbb89c658","★ Butterfly Knife","Crimson Web","gold",1748.06,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsBn6v1ut0o95lRi67gVN04WmDzNz_cX_CalAiW8FxR7MI4xKxmtPlYe7ksgzeiN5BziT83y4f8G81tOxPsLb-"),
      s("skin-eae7c10fa54f","★ Butterfly Knife","Slaughter","gold",1701.35,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2qv2-t0ouBWQyC0nQlp4G_dmdauIC_DPQBzDpclRLINsEXsx92yP7jq7gXd2t1NzCT3iCwc6TErvbhfNpboFw"),
      s("skin-688d607e4dec","★ Butterfly Knife","Case Hardened","gold",1987.09,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD3avzud6teVWQyC0nQlp5z6AyN_7I3mfOFQnApUlFrMN5BbpwdbhP-vgs1Pd3dpBmXr9jnwf6DErvbim1G57Bg")
    ]
  },
  {"id":"bm_phoenix","name":"Кейс операции «Феникс»","subtitle":"AWP Азимов и AK-47 Красная линия","category":"black_market","price":9.9,"accentColor":"#F97316","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fr2wPtqP5PKVvJPSQDWSSl7sn6eMxHC3hwhl3sDuDztivJHrEagJzWZd3W6dU5fXcT7oM"),
    "items": [
      s("skin-ad06f39c3d8b","UMP-45","Corporal","milspec",2.91,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1Y-s27ZbRSI_-BHmiCwOJJvOhuRz39wUUi4W6Bzdipd3KWOwInXJFyTbEKuhbtloHlMbzm5AbW2YkWzSv5jjQJsHiIsauxOw"),
      s("skin-bf1fcaf8bccb","Negev","Terrain","milspec",2.65,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1I_82gbaNoNs-HG3WB_vpzovNoRieMmRQguynLz4qgJyqWOg8iDZFyFOcD40axlYflNL7htgDb2thNmH6oinkc5yZt4fFCD_QbgNa1nA"),
      s("skin-4b1f4693e6df","Tec-9","Sandstorm","milspec",1.25,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SM_GdCnSEzvx7j-1gSCGn2xsi52XSyIqueCifOAMnD8YkQ-YMtUPpwIK2N-jq4QSK2ohCm36q239XrnE8IX2h_4o"),
      s("skin-31a620b2b0c6","MAG-7","Heaven Guard","milspec",1.39,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiFO0P-vb_NSKPWSGGKe_uJ_t-l9AXm1zEol52_cz9z9d3rDb1J0DZdwFOMLtxa4m4W2Zejn5ALc2NhFzyTgznQeMWQmjgI"),
      s("skin-4ef0fd14ae8f","MAC-10","Heat","restricted",6.52,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-BC2OYzvpJvOhuRz39xR5w4GzUyo6pdnuUawMpWJokTLUL50K6l9XiNO7i4lGKiYsRxCv6jTQJsHim4lDW8g"),
      s("skin-205233b2ccee","SG 553","Pulse","restricted",13.23,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-DG2uDxNF6ueZhW2eykUh24jjczYqscH7GblIpCJBxF-AD4BHtxIKzM-nq5ACK3t1GyySskGoXuRyAaawM"),
      s("skin-8737ccb056e6","FAMAS","Sergeant","restricted",7.13,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a4c2oaalsM8-ACXOvzedxuPUnF3HmkBx_tjnSmNmrJHiROFN1W8NxFrFZsxbrk4e0Yuvr5wWLi4JAyjK-0H3maOk52Q"),
      s("skin-9180ab4b5f86","USP-S","Guardian","restricted",9.78,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_ut6teZoQT2MmRQguynLyd76I32fbFUkD5EmRu4Ct0O4m9fmY-zlsQSMiN9CnHj2jitL531o4fFCD_TZrkjVNw"),
      s("skin-91a429af4a60","AK-47","Redline","classified",34.53,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-RHGavzedxuPUnFniykEtzsWWBzoyuIiifaAchDZUjTOZe4RC_w4buM-6z7wzbgokUyzK-0H08hRGDMA"),
      s("skin-91abb2db43b7","P90","Trigon","classified",49.29,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_jdk_6v-V7B_KfecAFicyOl-pK9vGi3nlEt24GnSwoypc3rFbQ52XsN0EOFcshfuwYa1NbzktVTZ3ohN02yg2RSFidN_"),
      s("skin-064fed483cd7","Nova","Antique","classified",38.68,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiFO0PyhfqVSIf6HB3aFxNF6ueZhW2fmwRwl6jyHw96vIn2UbVVzXMdyRuYLt0O7ltPjZbu0tQTejo9Hyn2skGoXucYtjcOH"),
      s("skin-bb633c21fc25","AWP","Asiimov","covert",180.18,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6V-Kf2cGFidxOp_pewnF3nhxEt0sGnSzN76dH3GOg9xC8FyEORftRe-x9PuYurq71bW3d8UnjK-0H0YSTpMGQ"),
      s("skin-370dfd3911e0","AUG","Chameleon","covert",156.24,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk7uepV6dlIf2WAmKfz-9_ouRWQyC0nQlpt23VztercCjGbg90C8RyQOcMs0G5x93uZLm37wbe2owTz3j9iShI6TErvbi7ZmzWCw"),
      s("skin-vanilla-weapon_bayonet","★ Bayonet","Classic","gold",626.78,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKni_DtU4fe6Jv07IfTDDT_JkL4htLI7HCvmwE9z42_Vzov4ci2Wa1IgWMN3R7IMuxCm0oqwYUAZNBA"),
      s("skin-95831ce7c492","★ Bayonet","Fade","gold",711.52,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POvV6JsJPWsAm6Xyfo45-BrHniwzUh24jjVm4qgInnCOA4mDscmEeVcsBXtkN22P-yx5waNg5UFk3tAoG85FQ"),
      s("skin-8084beee1235","★ Bayonet","Slaughter","gold",386.92,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV75oIuKSMWuZxuZi_uU7HyjhwUh-tm_Xydmuc3nGbwN2ApAmQeNfsUXtktOzYuLm5FPajN9bjXKpLQ8HVlE"),
      s("skin-1a4722df3bb9","★ Bayonet","Case Hardened","gold",524.48,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PO_V6tkLPWXMWuZxuZi_uRrSXDlzUtw4WTRwtj4eX6XPAd0XsEiROcNthm-w4HhP-Pq7waKiItbjXKppDMdu0I"),
      s("skin-d90370c635f2","★ Bayonet","Night","gold",913.94,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0OGhV6pkJ_iHMWuZxuZi_rQ4Snzhxkkj4m3Tm4uqcS2fagNxDZJ0QOMNuha6kIfhYumx4gDeidlbjXKpXW1AuvM")
    ]
  },
  {"id":"bm_huntsman","name":"Охотничий оружейный кейс","subtitle":"AK-47 Вулкан и Охотничьи ножи","category":"black_market","price":14.5,"accentColor":"#EF4444","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frmxY6qr9OqU0cvbKCGTDk7dys7k-S36yzU114GrRmNaoeSmXaVV0WJp0W6dU5Q_KKWwm"),
    "items": [
      s("skin-bc677a3996cc","Tec-9","Isaac","milspec",4.08,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SIeOaB2qf19F6ueZhW2frlEpz6zyAy477dXrEagFxDcclRO4C5EK8wIa1Nem3s1TdiotNzCn5kGoXuYgN6W8t"),
      s("skin-6d203a8fcdb1","SSG 08","Slashed","milspec",2.04,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-aA2qf0_p3vN5kSi26gBBp62XXyon_eHKXagYoC5ZwFLQNska7lIfiY-rgtVCN2IxExX_9h34buDErvbiGjEi-fQ"),
      s("skin-b0c960e25016","Galil AR","Kami","milspec",3.89,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V6NsLPmfMWyRzOdJvOhuRz39wkl142uEwtqsJ3OealV1DZYmFuNZ4xTtx4HnZuPl4gaLjdpNnHqt3TQJsHjaThnzjg"),
      s("skin-6649e8ef90bf","CZ75-Auto","Twist","milspec",5.07,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2pcbZsNPWsAm6Xyfo45bY7TXzjxk5w42XXn93_cnLFOFN1C5t0ROANsBLtx9ziNu6x4FHejpUFk3uH-TvaLw"),
      s("skin-b0409a64842e","P90","Module","milspec",5.79,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_Cxk_f23aahvLPWWClicyOl-pK8_Sn_rwE1x5z6AyY6qeXmRb1cgWMNwR7Ff4Bm_m9y0Przq4A3b348Q02yg2QQMyM9M"),
      s("skin-47c5420fd212","P2000","Pulse","milspec",4.61,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMXeFzf1zj-1gSCGn201wsTnRm9egcS7DaABxDZckQe5Ys0S6xtKxZO-wsQDbi9lMxSv-jS5XrnE8fJdFk9o"),
      s("skin-421b4d58b3c3","AUG","Torque","restricted",13.4,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk7uepV7R_L_eBC3SDyPhJvOhuRz39lxhxsm_WzN37Iy7CbAcmC8B2QuYPtRCwx9HvNr-xtQPaj95EmS__3TQJsHjrLu4xbg"),
      s("skin-7cfcd56e9168","PP-Bizon","Antique","restricted",12.9,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1Y-s2sYb5iLs-SAHOZ0Ptzj-1gSCGn20sj4DnTyN2pdyjFOg4oXJV5Qu5c5xS9w4bjNL7q7gHd2INGxCn_iyxXrnE83Efvvd0"),
      s("skin-817e4764952b","XM1014","Heaven Guard","restricted",11.57,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7OeRcKk8cKHHMW-VwPhzvt5uWiihkSIrujqNjsH7cHLFPwd1WZsiFrJYuhC4lNTuNu3n5ASN3YxEniStjSMa6H45675UT-N7rZnbv6eE"),
      s("skin-148586fd3375","MAC-10","Tatter","restricted",10.99,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2lZ7Z4MOSsAm6Xyfo4tbY7H3q1xRt152TWyt6tc3ifaVcmDppxReVethawlYHmNO6ztQbciJUFk3uxmhdQIQ"),
      s("skin-196d87753c91","M4A1-S","Atomic Alloy","classified",41.26,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GeMWrEwL87o95oQyW8jCIooTyLnYrGLSLANkI-D5d2FrENtRG7wNDvZe-3slfci9pFmHj8jSof6yZjtugEB6QtrKTXhxaBb-PhITXxPA"),
      s("skin-bc6a17b8b04c","SCAR-20","Cyrex","classified",65.58,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk7OeRe6dsMs-QF3WV2dF6ueZhW2fgzUR_52nUzYugICnCPVImApYkRO8NtkLtw4a1Nbzn7lSN2oITnCr5kGoXuXXxbesR"),
      s("skin-6fcc0ba62469","USP-S","Caiman","classified",65.8,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsBWaZzO94j-1gSCGn20t-4WyBn4mocC6XbVN0CMB2RLYMsUG5x9DgN-20tQSNiI1GzS2q3XtXrnE8NAiGp64"),
      s("skin-b14c9f234bc5","AK-47","Vulcan","covert",216.15,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSMuWRDGKC_uJ_t-l9AXCxxEh14zjTztivci2ePQZ2W8NzTecD4BKwloLiYeqxtAOIj9gUyyngznQeF7I6QE8"),
      s("skin-e3516262b49a","M4A4","Desert-Strike","covert",334.08,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0OanfKVjM-ScHGqvzedxuPUnHnjnxEsi4WTTntqucnuUaA92CZR2E-IDtRa-mobnYeLksQbXg4hDyTK-0H1Bbz5yqg"),
      s("skin-vanilla-weapon_knife_tactical","★ Huntsman Knife","Classic","gold",597.74,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s26aad5KfOSAimVlugu47U5HSrmzEp14zncz4ygICiealIiAsF2EOdYtkTpwNXuYbjk-UWA3JpY_ZDP"),
      s("skin-85ba0d17a1f9","★ Huntsman Knife","Fade","gold",888.28,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SD1iWwOpzj-1gSCGn2x8hsW6DmIqpcXjBZgYkCZt5F7VcthS8ldS2Nr7m5VCMi4gRyyuqjHtXrnE8oar8MtU"),
      s("skin-50822c2f44f9","★ Huntsman Knife","Crimson Web","gold",1293.26,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-bF1iHxOxlj-1gSCGn20V24znRw4v7JXPEaVUnW8AkQbUP5xW4wYKzMeu3sgPbio4WzXr_3HxXrnE84qvZFNo"),
      s("skin-2cab831d314a","★ Huntsman Knife","Slaughter","gold",1226.4,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SA1iKxOxksd5lRi67gVN_42jTnourc3OSbA4iCJV5F7UCsEXpx93jYrnn7gfago4QyH6ri3tL8G81tAzA6RBm"),
      s("skin-a4164e883655","★ Huntsman Knife","Case Hardened","gold",949.69,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SH1ifyOJztN5lRi67gVN_4W-Byt-hIi2UbVV2W5p2Fu4PuxmxkdO0Zejj7wff3okWzCT3ji4f8G81tJdWCOsa")
    ]
  },
  {"id":"bm_wildfire","name":"Кейс операции «Дикое пламя»","subtitle":"AK-47 Топливный инжектор и Ножи Боуи","category":"black_market","price":8.5,"accentColor":"#F59E0B","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frHMVu6r9MaA6ePPAWjbGwrwm47dtTnu2kUl14mzUnomudnqQaQ4iApF5TPlK7Ee3MsZV-w"),
    "items": [
      s("skin-f1e676fd36be","PP-Bizon","Photic Zone","milspec",2.05,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1Y-s2sYb5iLs-QB3OZ2-t4j-1gSCGn20hw5GXWntf_eH-Wa1MgX5N2EeBc50G_w9HuZL_h4gGLjd8XxX37iHtXrnE8eXv1H4U"),
      s("skin-df294c189613","Dual Berettas","Cartel","milspec",1.05,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1a_s2qfaVhIvWBC3OEwP1Js-B7Wyy_qhEutDWR1I38I3yROgAmDZIjFuEJ50S6lNLvMuKx5lPbj9gRySz92HhKuiZp5ekcEf1yPnX3Fyc"),
      s("skin-c6ff1f1300c7","MAC-10","Lapis Gator","milspec",3.52,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a4s2jaac8cM-WAmKT1fx_s-h9Vha_nBovp3ODztegd3LEawcnX5ByFLQPtxSxldyxPrjg5QCPj94Ty3j8j3tLu30__a9cBu41m2up"),
      s("skin-f09be63883f9","SSG 08","Necropos","milspec",2.92,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-dC2SCzv55o95lRi67gVN26m_VnomsdiqTZwB0W5R5E7UCuxe6lICyMO3i7lDWjt4XyHj_iypB8G81tA-y21Aw"),
      s("skin-f62914cda55c","Tec-9","Jambiya","milspec",2.63,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiVI0Oara_1SKvGeDG6JwNF6ueZhW2ewwhhw5WnXy4v_dnqXOwMnAsQmF-IMtxDql9LmP-mw51feiIhDnn78kGoXuTq6iJ_X"),
      s("skin-c5f4d564ca7e","USP-S","Lead Conduit","milspec",1.61,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSJ-OsG3SA_vh5vPVoSCyMmRQguynLmNyrdimTZw4mW8cmE-ZYsxewkYaxZb6z5FbfjY8RyS__iXsc6S09sfFCD_RkYnnFtg"),
      s("skin-24b781ebda0e","FAMAS","Valence","restricted",11,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a_s2oaalsM8-QAWmEzvtkj-1gSCGn2x4ksWzczo39c3_Ga1R1CpByR-YO4RXqm9fgP76w4lbYi91CzSyq2H5XrnE8rQqckvg"),
      s("skin-47d923c1512d","Five-SeveN","Triumvirate","restricted",9.93,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-B8SCS2mwkitwKJk4jxNWWXPAZzD5pwTeBetUPtw4C1N7jh5A3bj48RxSyqiiwc7Sg6tr0ABaAk5OSJ2O3yTJMF"),
      s("skin-71b2f3cff45c","Glock-18","Royal Legion","restricted",5.67,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK6HLMWaHwPxyj-1gSCGn20gksm_Uyo7_JSmeOARyXsEhFLQMsUW_wIXuP-rj71CIiotAzCqoinhXrnE8DvG09t0"),
      s("skin-31658eeb1561","MAG-7","Praetorian","restricted",10.84,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiVI0P-vb_NSMOKSC3Of0-d3vt5lRi67gVMl5j_VzIr_eSnBbw4iXsR2FLZfsRi6x9LvNOqw4FePid4UmCX2iC1J8G81tOf1qE-m"),
      s("skin-8defd7296615","MP7","Impire","restricted",9.21,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf7jJk4uL5V61gMPmBC1icyOl-pK8xGiq2kUV24j6Gn9b4eXmWPwIoApJxRbRbtRW5wdfjYbi0sVfW2tkQ02yg2fafAb5i"),
      s("skin-f2cdadd8b557","AWP","Elite Build","classified",24.76,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6lsM-SWHH6vzedxuPUnSnHmk0Qh4G6HmN-scXmSaQRxXJpwRuZYsxTqxtTnM7nl4gTW2dlFyjK-0H0d8XeEBg"),
      s("skin-3fd39ac4ec6f","Desert Eagle","Kumicho Dragon","classified",46.35,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uORbKF-JeKHC2aXzetJu_RkRiq7mhk1sjqKlLD1KCzPKhh0CcBwQLVe5BHrloKyZOnr5w3XiYhDnC39iCpK7X1psrlUWaFw8qXekUifZlV_fDVZ"),
      s("skin-d0090217a5a4","Nova","Hyper Beast","classified",36.31,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiFO0PyhfqVSKOmDC3WSxO9lpN5lRi67gVMhsGrTmd2seH6XbA4pDZR1EbMCtES8m4fiNenl4FDcid1Az32ri3tM8G81tMCTwFwB"),
      s("skin-8f7564b8b3eb","AK-47","Fuel Injector","covert",114.24,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSM-WDC3WTye9kt-RtcCW6khUz_WuGy9_8dHuRbg5xW5IjQ-BYshK9mta0NLmw4lDa2o0Wni_3iy4f6np1o7FVB0pWHHg"),
      s("skin-62c54d49e07a","M4A4","The Battlestar","covert",196.81,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSMPmcAGKV09F6ueZhW2fjxB9_4GqEyN6vdi_BPwQgWZIkRLYD4Ba_kILgYeOz4lbagthBz3_9kGoXuZIYHoDp"),
      s("skin-vanilla-weapon_knife_survival_bowie","★ Bowie Knife","Classic","gold",372.67,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s29fbZ7KeaSAliSzvl_ta88TX61xExyt2nTz9eveHjEPQRzXMcjFuYIuhHtkIKyNLnmtACLg4sX02yg2XbF4Kcv"),
      s("skin-7c39e61388c9","★ Bowie Knife","Fade","gold",730.87,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3sd5vTi22qhEutDWR1NiocCqeZwYoC5pxRuMM5BPqxtTgY-20sgXZ2NpHnyqqiCpA5nk56u8cEf1y_UmCvro"),
      s("skin-9309cf0662b7","★ Bowie Knife","Crimson Web","gold",638.32,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF-qd5-SiugqhEutDWR1Nb6eHLCOlR0C8Z3TeEPtEHsw4KyY-Lh5gLZ2d9BnCiv2itI7Hps5-scEf1yekXUy9I"),
      s("skin-5f746d4751f8","★ Bowie Knife","Slaughter","gold",934.69,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5zSiuhlCIrujqNjsGscnueZwYoDJUmFO8Nsxfpx9buMeLm5Afe3Y8RxHivjS8bu34-4rsHT-N7rRZowTHv"),
      s("skin-d9107881b157","★ Bowie Knife","Case Hardened","gold",479.44,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3od5mRiW2kSIrujqNjsH_eHrFOAdzA8B2TeQLtBm6x4flNejislbb2tlHxCyti3tK53xq6uhTT-N7rR3UNjRY")
    ]
  },
  {"id":"bm_shattered","name":"Кейс «Расколотая сеть»","subtitle":"Ножи Скелет, Паракорд и Бродяга","category":"black_market","price":7.8,"accentColor":"#A855F7","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fr3EVvKD6MKU_cKPKXWHFxLkls7FsSnDqwUl_sWTczoqheHifbwMmD5F1RvlK7Ec_KL6Q_A"),
    "items": [
      s("skin-12f67f052f95","MP5-SD","Acid Wash","milspec",1.24,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePFSJeSQBlicyOl-pK9rTnjqlkkitmTVn437IiiePQRyX8F4FuBc5xS_lYHgZevj7wzagosX02yg2cdA74dF"),
      s("skin-d9b6c949df6f","Nova","Plume","milspec",2.51,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiFO0PyhfqVSJvWSGm-V0_1hue9ucCW6khUz_Tndmd6tdHKQbAMnCZAmQrVYtRW9moayNerq5FTdioJMmST7j35L7Sp1o7FVL01CQxQ"),
      s("skin-c7f19d69db98","G3SG1","Black Sand","milspec",1.39,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1Y-s2pO7dqcc-RAmaTyv13vuVWQyC0nQlp4miGytahcSiTZ1J0DZZ1ELYDskO7mtfjMujn5gbajYlGyS38jywY6jErvbjKP5Wfiw"),
      s("skin-2c0c9abe25f9","R8 Revolver","Memento","milspec",2.49,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2pe5t_eM-eC2qVz_p5j-1gSCGn20wk4D7Vz9_9JHyeawMnXpByReMDshfuxIDnPunj5gCN2ohFyST_2C1XrnE8s2YJKK4"),
      s("skin-6f46742a68e4","Dual Berettas","Balance","milspec",3.24,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhH_WfB3OV0tFkv_JscCW6khUz_W2Dyon_dimePA8lWJclQrMJthm-kYW2NbzrtQ3eioJCnyWo33wa7Hl1o7FV2r7YJY0"),
      s("skin-6bff4afdb6f2","SCAR-20","Torn","milspec",1.76,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk_OKRe6dsMqLDMXSE0-d9tfNWSzyggSIrujqNjsH6eHiSOwZ0XsdxFrEIthfpx9W0Yuux4QDe34pFni-s3SpK7Hs6570KT-N7re2tWema"),
      s("skin-af475732c9cd","M249","Warbird","milspec",1.37,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiVI0P_8PP1SN_GBDG6CxdFgtfVsXSi9qhEutDWR1NqpdymUbgcgDcRwEeUO5xa7kIGzMOjgsQzejNoRni6ohyJL6ytv4-4cEf1yirMa72w"),
      s("skin-de365c1a71ad","PP-Bizon","Embargo","restricted",10.7,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1Y-s2sYb5iLs-BAWaU_vl3ovNgQDuMmRQguynLnt37I3ifb1VyW8F4Te8D4UTrl4GxZru25FTZjI9GnCr5iC4YvSto4PFCD_TYHp-YNQ"),
      s("skin-fbda3c593717","AK-47","Rat Rod","restricted",11.14,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSLvmRDGuV09F6ueZhW2fklBx362TTnN36dHiRa1AmW5QlQuVftxO9k4HhZuvksVDc398Rzy32kGoXuR34FNLu"),
      s("skin-11c6b11248f9","AUG","Arctic Wolf","restricted",9.8,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk7uepV7NlKeSWCGaextF6ueZhW2frxxtxsGrTw46sI33BOAUiXMElFO4L50O9xNLvNOyz4lDd3olMzX6skGoXude_sLiC"),
      s("skin-a16b386af5bb","MP7","Neon Ply","restricted",9.07,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_jdk4uL5V7ZoMPyaDWavzedxuPUnGS2wzBglsm6AnNyqJHLBOAdyCZV0ELIN5xC6kNThY-jqslbbid4WyjK-0H0WWbSZ_g"),
      s("skin-3c3bc3fa44dc","P2000","Obsidian","restricted",8.44,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMWiS0udyueBncCW6khUz_W7QzNf4eHKUPA9xDMAkFrMJ40brldGxM-rk4lfago1MzXmrjCwYvC91o7FVDbVY3kE"),
      s("skin-0abab7de168d","Tec-9","Decimator","classified",26.79,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiVI0Oara_1SJPWQB2qR1eFkj-1gSCGn20h16j-Ew9j6Jy6QbQB1XJJzQLVYshXqm92xY-7g4wze3dpAySz2iXlXrnE8_HmWmcE"),
      s("skin-5b6e17f145f5","SG 553","Colony IV","classified",41.81,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-BC2aT1eFkj-1gSCGn20Qit2yAn9n8IHKealB2DZIjTO8JsBW7ktDlYu_m5ADWit4Rznn63XtXrnE82sW2soE"),
      s("skin-eba70ef89c7b","SSG 08","Bloodshot","classified",22.32,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-HB2Sbzetkj-1gSCGn201wsjnUm9qrI3OXaAQnDsZwTbIDtxnpl9W0P7i35FfW3toTzC6q2ixXrnE8w4eIHZQ"),
      s("skin-f8cd1aa7fa55","AWP","Containment Breach","covert",185.5,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JkMuWAMWuZxuZi_rQ6SXq1xURysj_Vw4uhJHOVPQ8oCZt4QrRbtRi6ldPlPu_g4FHaiYNbjXKpcPI_17A"),
      s("skin-46bae9d6c6b0","MAC-10","Stalker","covert",150.6,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1c_M2jaac8cM-AGmacyutkj-1gSCGn20V0t27Tw974Jy-WOg9yW8N3QOQDsxG4x9O0ZOPqtgHZ399HzST8ji9XrnE8CxAHwFY"),
      s("skin-vanilla-weapon_knife_outdoor","★ Nomad Knife","Classic","gold",687.94,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2hfbBpL_-BQDPEw-hz57cxTnCxkEh_5jnVzor8dymXbgAiAsFyEOEMsBW8l9O1Ne38p1uJmh0Kkm0"),
      s("skin-47d49e017564","★ Nomad Knife","Fade","gold",341.08,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GSMWGRxetJvOhuRz39wUUksW7Vm4n7d3yUO1InXsdxTeQDukO4l9zuN7_j5QzYjIlFy3n6jDQJsHjNMoy1vA"),
      s("skin-f18965313816","★ Nomad Knife","Crimson Web","gold",589.29,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_iKMXCVw_1JvOhuRz39xEV_sT6Bn9mueX3EP1QjApd4QbZe5EW6wIDmNO7islfW391EzCWt3TQJsHib9FqZhg"),
      s("skin-74f72ddc6769","★ Nomad Knife","Slaughter","gold",597.36,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GeMX2Vw_x3j-1gSCGn20R15TyGnNv_cS3GZlUnA5smTLEM4xDpx4bmY77h51OMiIJNziX53SJXrnE8R49sMsc"),
      s("skin-2f7326c83e40","★ Nomad Knife","Case Hardened","gold",414.77,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GCMWiZzetyj-1gSCGn2xhz5GyHwtr_dS7EOlR1DZtyEe8MsBO-xNKyNbnq7w3b2d8WzC7-jSNXrnE8rdGSE7w")
    ]
  },
  {"id":"bm_riptide","name":"Кейс «Хищные воды»","subtitle":"AK-47 Музей элиты и Бабочки Гамма","category":"black_market","price":11.2,"accentColor":"#00F0FF","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fr3sVtvD2O_Q9dqfEXTWSlepz4bA5THnikx915z6BytmuIHiXaAdyDpEhTflK7EdW-TaRMg"),
    "items": [
      s("skin-90b7437c4266","AUG","Plague","milspec",1.9,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV7RhIfeGC1icyOl-pK8_GH7hzUx04WSByNj4JXuRaQJzXJclEO8MthHpl9DhYejjtAeL2YMU02yg2aipyCXk"),
      s("skin-5b3439856685","Dual Berettas","Tread","milspec",3.53,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhH_KWHGKE1e9lj_V7Sii3qhEutDWR1NmhcnPEPA92CJBxQeUNsha-ltC0ZOnltQHfjI1Gn3r7jy9N7npvsb4cEf1yGJF-WOQ"),
      s("skin-4b59a9ff63bf","G3SG1","Keeping Tabs","milspec",1.4,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1Y-s2pO7dqcc-HD2SEyO13vOxoXxa_nBovp3OHzouqcHqRZwBxDcd2EOUDskXtl4DmYevi4FGLg4tDz3n4iylB6Xw9_a9cBgS1m-61"),
      s("skin-b40b6df277a2","MP7","Guerrilla","milspec",4.69,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_jdk4uL5V69lIfuaMWuZxuZi_uU7Hy22xE5x5TnWyYqvIi2SaVN0C8d1QeVf4RC-kdC0MOPl4Qbf2dhbjXKpOJ4z2JA"),
      s("skin-18341f97a949","PP-Bizon","Lumen","milspec",2.75,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1c_M2sYb5iLs-VAmaDyetkj-1gSCGn209-4mzRn9irIimXOFRzCpAhQORYu0bqw9HhNuix4Aba2opCznr72ipXrnE8UpZyTdo"),
      s("skin-9c09911caf5c","USP-S","Black Lotus","milspec",1.9,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_ux6seJicCW8gQg0jDGMnYftbynFZg8nXpt2Ru8D5hSwl9PhN7_m7wzdjotFxXr62y4Y6C894OxQVKA7uvqAvobUkb8"),
      s("skin-88cb1dcb9c18","XM1014","Watchdog","milspec",2.42,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk6OGRcKk8cKHHMXCR1e1-tO5ucCW6khUz_W2Dz9ehdHuWZwN2CJd0EOYDt0LpxNG2Zr6w4w3ei48UyC2riCJN6Sl1o7FVTxWp7to"),
      s("skin-fbe7862c26f8","MAG-7","BI83 Spectrum","restricted",13.71,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiVI0P-vb_NSIvmAA3KEydF6ueZhW2fml0Vw4mWGnN2udHmSOgAoCJMjQOJY4xK8k9XvPu-x5Qba2N5HzH73kGoXuQbKMJGE"),
      s("skin-3a2e0cdd5472","FAMAS","ZX Spectron","restricted",8.04,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1Y-s2oaalsM8-AHmKT1fx5vt5lRi67gVNxsDvTyNyueHOeaVVzCcN1EbVZtRK5k4LkNOnj4wbe2tlMxH_-jyNN8G81tGqq3pxL"),
      s("skin-df168db99441","Five-SeveN","Boost Protocol","restricted",7.29,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRb7dSJvmFC1iDxPhzvt5sSTygnBIpjDGMnYftby7FalV1D5QhE-EDthW8xtCyPu63tFPciYhBynn_jykfuCttte4CA6E7uvqAn_5lxU8"),
      s("skin-0d8df804e0af","MP9","Mount Fuji","restricted",15.6,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_CNk4uL3V6J4KvmsHm6eytF6ueZhW2fgkUoh5m7dnt78eC7FPFQgXJByE-AL5Bixld20MO2x51DX2o1NxCyokGoXudOiZ_SY"),
      s("skin-d303b15d1f4f","M4A4","Spider Lily","restricted",12.56,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6V6JhL-eWHHSvzedxuPUnHXiwlk4lsTvUz477ICiRPw52WJNxROICtxK-wYDhZejm5gCP2I9MzjK-0H1trtkVHA"),
      s("skin-87390b8680ce","MAC-10","Toybox","classified",52.19,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-HAX6SzvZJvOhuRz39zRkismnVy9uveXqfZgYpW8R0TLRbshHtx9HvN77g5Qzbi4wTyniojTQJsHhO4vjwuQ"),
      s("skin-cf4887fb0502","Glock-18","Snack Attack","classified",36.96,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-AAGaTyu9ipOBqRBa_nBovp3PQyomrcHKSaQYkCcRwQe8LukHswYHhN-Kz7lOM3YoUni6tjn5K7C5u_a9cBhxPlKk2"),
      s("skin-32bcc9d7f929","SSG 08","Turbo Peek","classified",35.01,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6NSL-aWHHORyutJvOhuRz39k01z62jTmIv6dC6WPQdzWJYiQLYL40K4koG1Ze-35wze3dpMnyz63TQJsHim_V6lkw"),
      s("skin-96efe50cceb6","AK-47","Leet Museo","covert",191.23,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSIfKAGnWRwvpJvOhuRz39xEly6jmHmdiqeS6UawMmCsBzFrRb4BLtx9DgPr635A3Xj45GySj5jzQJsHjwtGRbjQ"),
      s("skin-55623b84dd72","Desert Eagle","Ocean Drive","covert",169.11,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ_yWMWyZ1e1-j-1gSCGn2x5-sG7Wzdyvc3OSbgcnXpR5FO9bukTtm9WzMePhswaN2N5CmCj_jyhXrnE8ibjhEyc"),
      s("skin-bd871a344e30","★ Bowie Knife","Gamma Doppler","gold",886.01,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5sQiyhlBEjjDCEiI31JCLdO1JPVssnHaMU4EG-ltyyPuLq5gHYj9lMzyz7hyxNuCs-5OoDVKImrKTe21mXZ-Zu5I5Deqhh5Zn_hA"),
      s("skin-2c801d044315","★ Bowie Knife","Gamma Doppler","gold",1110.63,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5uTiS-lCIjvC2VlorrHjvPP0V1C_0sHLBS9g67l9G0Mu_q5ATZ3t1BxSn6in5B6yc9t7kHBaFw_aPQ3QiTNLQ_ssICOr_5Gko8dFgH"),
      s("skin-e70487f0da3a","★ Bowie Knife","Gamma Doppler","gold",999.02,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5uTiS-lCIjvC2VlorrHjvPP0V1CP0sHLBS9g7tl4fgPujh71CNg91En36si3kY6ns-4OlQWfclqPbQ21zHZbVp4ZdWOr_5GrvoSFRK"),
      s("skin-9143e6d4868c","★ Bowie Knife","Gamma Doppler","gold",591.15,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5uTiS-lCIjvC2VlorrHjvPP0V1Cf0sHLBS9g7sl9WzN-q27gLWiYxDxH3_2y4avyxp575WAvck_aGGjADAYrU6s8EBOr_5Gs3270vO"),
      s("skin-965132fa7c08","★ Bowie Knife","Gamma Doppler","gold",1021,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5uTiS-lCIjvC2VlorrHjvPP0V1Dv0sHLBS9g6-xoXnNr6xsQze2IxFy377iX4d7itr4ehWA_V0_aPT2VyTMudrs8YLOr_5GgyA1D52")
    ]
  },
  {"id":"bm_brokenfang","name":"Кейс «Сломанный клык»","subtitle":"M4A1-S Поток информации и Перчатки","category":"black_market","price":9.4,"accentColor":"#EAB308","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fr3UVu6P-MPQ0dKbCVzLGx7wgtbM6S3jhw0V25m-EnNj7JS7GaQ4nD8QiRflK7EfH0YGFHg"),
    "items": [
      s("skin-6739b9d43b7d","CZ75-Auto","Vendetta","milspec",1.65,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1c_M2tcvM4H-aWAGOV1fp3j-1gSCGn205ysWiEw9iqInueOAZyD5J1EOdf4Ea9l9bmMb_q4AaI2NhGySz6iStXrnE8_AWQoqE"),
      s("skin-2b3bc760fbf0","P90","Cocoa Rampage","milspec",1.62,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf9Ttk_6v-V6BkLv-sHGad0e9xtd5lRi67gVMl52jUztr9cn7CbQEmWZV1R-ED5BHqx9G1PuOxsgWM2N4Xniqrh35L8G81tGacA9-f"),
      s("skin-6f675fd9f54c","G3SG1","Digital Mesh","milspec",3.5,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-XB3SC1P5ij-1gSCGn20wh4m-By9-qIC7COA8jWcNxRuUPshe6kNfnYe62tQ2K2NpHmXj2iC9XrnE82YBIy5I"),
      s("skin-ff88be94bdd8","Galil AR","Vandal","milspec",1.79,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMXGRz-p3vN5lRi67gVMj4mzVw92tdHKXPwcjD8AhR-YKtBe8mtHkNLvgtAGIjd0WxCyv2CNI8G81tKkB1-EH"),
      s("skin-ad97dc533b07","P250","Contaminant","milspec",3.12,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSKf6VC2SE_uJ_t-l9AXG3xUt-4jjcn4yqIHLGO1QkDsZ4TeNetUK4m9eyP-6xtVHcjd5DzSrgznQee4rYsVM"),
      s("skin-4c1d61428041","M249","Deep Relief","milspec",3.79,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiFO0P_8PP1SJPWWHliCxOJ_tedWQyC0nQlp5DzUzIyqcnyQOAckWJckQu8KuhnpkdPgNu-0tgTYio5Eny2shnsd7TErvbi9QVp9bQ"),
      s("skin-c93ccd1731fc","MP5-SD","Condition Zero","milspec",3.65,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePFSI_-dCm6EyOF4quR7QBa_nBovp3PQz93_InrCbAVxCcN5RbNZthm7w9e0Y-q35gbdi49GzX2vjCIf63xr_a9cBnKSfiDi"),
      s("skin-a89bff508437","AWP","Exoskeleton","restricted",8.97,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6F1L-OYC2uV1eF4j-1gSCGn20km5zyEmd2qc3uWZwcnA5MiELIJtxa_w9OyN-nh5wKKj4kTyn78hyNXrnE83OTew2I"),
      s("skin-f6e2834cc427","Dual Berettas","Dezastre","restricted",12.52,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhH_WfB3OV0tFytftoXD2hkCIrujqNjsH4c3qeOgR2XpJzFOcD4BK_m4HmN7mx5wGIjthDxHn23yhLv31u6u4HT-N7rWmjRO8T"),
      s("skin-be0f8a429ce6","Nova","Clear Polymer","restricted",11.24,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiFO0PyhfqVSMP-fF2qV09F6ueZhW2exxkR-tmWEmIyoJXyWZw4iDsclROVftxm7wIe1NbizswPe2YlHmCuvkGoXuVU3K7Ec"),
      s("skin-aeb0591ce152","SSG 08","Parallax","restricted",11.18,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-QBnWfzO9iueJWQyC0nQlp5G6AnNuhJXmeOAd2CsMjQOUMuxC-moHgNOzh5VPXjogRmyn_iSNI5zErvbhpsYYNZg"),
      s("skin-b154f1229365","UMP-45","Gold Bismuth","restricted",10.71,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1c_M27ZbRSJ_-fCliSyP17pfVhcCW6khUz_Wrczt__dn3GbVR0D8dxEOAMsxW9lofkMum04w3eg4kXzy6q339BvHx1o7FVa_qMENU"),
      s("skin-2e2b5cf9fae7","Five-SeveN","Fairy Tale","classified",40.51,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC1iDxPhzvt5tRiihjCIrujqNjsGtdi-UbVUgXJAlRrFfuxi-lNbuPr7ltA3cjtkRzyit2H8c7H1t4O9TT-N7rZbBTJfn"),
      s("skin-a3b9b4db1604","M4A4","Cyber Security","classified",38.62,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSI-mRC3WA1OB9j-1gSCGn2x9-527Tyt-pcnyUagQlW5JxEOIOuhjrw9XlMrixtQTd2NhNmH_5jCNXrnE8Cu1wa6c"),
      s("skin-8190f382bffd","USP-S","Monster Mashup","classified",50.2,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_uVkv-pmXBa_nBovp3PQn46ueX3FbAB0WZMjTe9csEKwk9XvNbnl41Tcj48WzHqv3HhP5ydj_a9cBuLIfNg1"),
      s("skin-8e45a15cf7f5","M4A1-S","Printstream","covert",163.8,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj_F7Rienhgk1tjyIpYPwJiPTcAAoCpsiEO5ZsUbpm9C2Zuni4VHW3o5EzSX62HxP7Sg96-hWVqYi_6TJz1aW0nxrkGs"),
      s("skin-7127818b09a6","Glock-18","Neo-Noir","covert",86.49,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-dAW6C_uJ_t-l9AXznwh9zsjjSn9j9dH-eb1V0CsF3QrNZ4xW8ltPlM-7h4QbYit5NzyzgznQecekkTuo"),
      s("skin-ac0c22b15c7c","★ Broken Fang Gloves","Yellow-banded","gold",752.92,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YozKMiYD3Hi3VMVFPWM4hFrxl-0XkzougWLa7sF2alYpAyX__iClA5ntstuoEUqUirKeG2w3IYrZo4JRSLa2vRRvdWhwJsa98BNe077TKBCc"),
      s("skin-27555a08b61e","★ Broken Fang Gloves","Unhinged","gold",841.25,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YoDOEkYrqKiLJAVR8W8ErKrtT5Uj8jNfuN-2wtgeNioNDxS7_jS4av31j5L4CVqV0rvLTigzCNeE5tZkCJqm5DUPZGadTirc"),
      s("skin-a371f5d8dddc","★ Broken Fang Gloves","Needle Point","gold",513.04,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YtTGKiI71HifOOV5kFJQlQbUL4RHukofjY-227wDaidpHnCqs3H5K6So95ekLVKck__bW3Q_fcepqSI673wM"),
      s("skin-82516a2fa315","★ Broken Fang Gloves","Jade","gold",518.57,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YvjiRm4PwIhTALFN1VP0sHLBS9g65w9exM-Pl5gaKidkRziX22yNIv306571QA6pwrKGDiluTZLxs5ZdXOr_5GlzOqAIa"),
      s("skin-30ad2640a228","★ Driver Gloves","Snow Leopard","gold",958.55,"@IGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5tnIfeGD3Wv1uZ_pORWQyC0nQlp4TnUw9f6J3PCOw4oW8ZxRuEOshK8l9fgZbnqswHX3owXmSisjCIfuzErvbiEoDwfJQ")
    ]
  },
  {"id":"bm_shadow","name":"Теневой кейс (Shadow)","subtitle":"USP-S Убийство подтверждено и Тычковые ножи","category":"black_market","price":5.5,"accentColor":"#8B5CF6","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fpGxet6H-O_Q6dfXCDzfJl7ci6bZoG3zjx0xz4ziEztj8IiiRa1QkWZdwW6dU5RegDbP-"),
    "items": [
      s("skin-3b525708df85","Dual Berettas","Dualing Dragons","milspec",1.48,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s2qfaVhIvWBHGKE1e9JtPNoSCa9hiIrujqNjsGqcn-VZ1JyXMR3RuMK5xDswNXkYbjitgePj91Bynn32y5N7ydtsLoET-N7rXzpOmeh"),
      s("skin-4a4571ce6fe7","FAMAS","Survivor Z","milspec",1.47,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1Y-s2oaalsM8-fC2mEwNF6ueZhW2exlE8hsTzcw4n4JC7BOAQpCscmRrRe5xW7w9TgNu7itAHWiYpAziqokGoXuXR1eqm1"),
      s("skin-c9c83de22ecf","Glock-18","Wraiths","milspec",2.27,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK6HLMXCCwPp-qfJWQyC0nQlp4T_Xnoz8dCmfZlUgXsd5RbMC40WxkdXnP7nl4wHXi9oUyH_9jilIuzErvbjBKaM58A"),
      s("skin-3bf986f6377c","MAC-10","Rangeen","milspec",1.47,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-SAmKbyfd3j-V8QBa_nBovp3PWztqtJXqWPVdzX8d3EbUDtkS_w9bmYui04gbYiolGnH_833xM6C5o_a9cBlensHEx"),
      s("skin-0bc881325706","MAG-7","Cobalt Core","milspec",1.64,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiFO0P-vb_NSLemBDWKexNF6ueZhW2fkwBshsT-DntuscSiVbABzD5Z2QuRftRXuwYblY-_i5AePj49Emyn7kGoXuSUXTp8T"),
      s("skin-2fc3d0e05945","SCAR-20","Green Marine","milspec",1.9,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk6OGRe6dsMqLDMXeVwO1zveBiSjvjxiIrujqNjsH6IymVbQEmCZoiQ-MC5kbrwN3kPuy24lDa2YsQmy2t2iof7Hs56uxQT-N7rTkENKOY"),
      s("skin-dd5e6f7c90cb","XM1014","Scumbria","milspec",0.95,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7uORcKk8cKHHMXST1ON0ouhocCW6khUz_WWEnNyvcymfalB0DZd4FOEDtBnrl9LiN-3i7gPWj9hBxCusiClP6iZ1o7FVjZ8JfoU"),
      s("skin-3d7cafe33cee","Galil AR","Stone Cold","restricted",5.73,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMWmZxuZip-hnSBa_nBovp3PSnI2heXqXOwQjDpcmQ-UN5BjrmtexP-rgswDajotBxCz5iyhMui5u_a9cBuYTcBV8"),
      s("skin-fe2ecdf6f921","M249","Nebula Crusader","restricted",6.54,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiVI0P_8PP1SLvWRG2uR_u1kpfJoSyyhqhEutDWR1Ir_JSiXOgciDJN4RucCsRW8w4KyZu_q5FeLjN4RnCmt33lP7nxv5-wcEf1yLX15hXE"),
      s("skin-3994ae535237","MP7","Special Delivery","restricted",7.44,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_jdk4uL5V6dhIeOAB2GZxOpJvOhuRz39xRhytjuBm9n4d3yXbQF1XJAhQLID4BTskobhZb-35wXZ2toTySz2jTQJsHhDRFQUDw"),
      s("skin-aa792cc15a05","P250","Wingshot","restricted",6.58,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0OL8PfRSI-KSDWyDyeFij-1gSCGn205wtT7Xn4yuc3qQbQUkXJQmEeQCtkK7wdDgZO7n71Df2IkQxH7-hyhXrnE8AH9Qqg8"),
      s("skin-1e9f98a04b79","AK-47","Frontside Misty","classified",26.05,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSN_mdGmKC_v1mv_N9cCW6khUz_WvRm9r8JS-SaFMmWcN5ReMD4BDsltDkN-Prs1DfjN9Cn3r_jC4YvHl1o7FVgJsyBlQ"),
      s("skin-042695b22889","G3SG1","Flux","classified",17.48,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-VAnKI_v5jovFlSha_nBovp3ODz9uoc3vGOgMmApp3QrFe5xftm9bjNOm24Afb3YlBn3mqjS8dvy1p_a9cBmtTF-_C"),
      s("skin-8d0a500e57c0","SSG 08","Big Iron","classified",19.34,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-HC2SYz-d1se1gWzCMmRQguynLyYqqJSqQbAIiDMclTbYDtUKwlIfvP7jr4Fbcj4xGzir6jilJ6ils4PFCD_SOjD5UKQ"),
      s("skin-02db706d8db0","M4A1-S","Golden Coil","covert",55.49,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj_JnTiK2lxQztgKClYP9HifOOV5kFJclQ-Jb5xW-m9CxPuLq4QTfjd0XzyX6jCpL6X5o5OgDVfYn_a2Ci1rfcepqgV49FrE"),
      s("skin-cf4c11689014","USP-S","Kill Confirmed","covert",96.21,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_uV_vO1WTCa9kxQ1vjiBpYPwJiPTcFB2Xpp5TO5cskG9lYCxZu_jsVCL3o4Xnij23ClO5ik9tegFA_It8qHJz1aWe-uc160"),
      s("skin-vanilla-weapon_knife_push","★ Shadow Daggers","Classic","gold",351.58,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2-fbdlbvXKWWXIlbh15bdrTnvmwkt34z_Qz46hdnjFbAIkCJdzR-Zctxi5kNb5d7S1mgn3amY"),
      s("skin-e3745c88f2ca","★ Shadow Daggers","Fade","gold",527.51,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6VsH_aSCmKvzedxuPUnFy-3l0tz5DmGzNmhdnmVblB0CcMjTbQJsBe6k9zlMuLl4gHYjoIRmDK-0H3ZqbeWvA"),
      s("skin-9d5772347e88","★ Shadow Daggers","Crimson Web","gold",280.49,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6x0H-eWDHSvzedxuPUnHi3mkRx24j_cn4qgIHnGbwF0A5p1R7UI5xm-k9XnMrjq5gOPj95BxDK-0H2triMq-g"),
      s("skin-7741632caeaf","★ Shadow Daggers","Slaughter","gold",260.39,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6VgH-qWDHWR_uJ_t-l9AXHqx0V_tWzRn4v7Iy7Ea1QlDsEiF7UP5xWxkIexZuPjsgLWi91MyC3gznQen1baSVU"),
      s("skin-fa4c00780e2c","★ Shadow Daggers","Case Hardened","gold",461.71,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1L-uGmV6V8H_-aAmKU_uJ_t-l9AX3kkEx1tz7Vw437dXmUbQ9zCpF2RrUDsRe4wNXuZuzm7lHW2I0TzC_gznQe3C7aMsc")
    ]
  },
  {"id":"bm_falchion","name":"Кейс «Фальшион»","subtitle":"AWP Скоростной зверь и AK-47 Аквамарин","category":"black_market","price":5.2,"accentColor":"#38BDF8","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fpWwI7Pb-P6Y5dvPEDGSSlrsh57U8HHHiwx5yt2-Dwo7_JSnCOw8oCJF0W6dU5dgrLNA1"),
    "items": [
      s("skin-8ba4193b0479","Galil AR","Rocket Pop","milspec",0.88,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfD3Wv0e9kpOhqQyygqhEutDWR1Nf8eXzDP1InCMR3QucIshjrktexMOqz4QPcjo1Gz3qq2H9L5ylu4ugcEf1yh3Lp9zc"),
      s("skin-e09d999344e2","Glock-18","Bunsen Burner","milspec",1.87,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a_s2pZKtuK6HLMWGcwONzo95rQzy2qhEutDWR1Nb7IC-TOw4hCZF5FOJe40W5lILlZLvktAHXiIJMyST_3XlIv3k94escEf1yWue1sjU"),
      s("skin-22079bd55cef","Nova","Ranger","milspec",1.34,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiFO0PyhfqVSMvGdCWKC_uJ_t-l9ASvqxUhy6mWAy4v7dnuRZlJ0CpR2Q7Nbtxe7kNO1MOu37lSP2N1HzyXgznQe-r9EaTk"),
      s("skin-41bdac7bd0a9","P90","Elite Build","milspec",1.61,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_jdk_6v-V6lsM-SWHH6vzedxuPUnHyi1xE9xsGiDmdqpdnmRPwcgDZslRuAM40Trx93nNevj7gOPjdlGzzK-0H27CoeJJQ"),
      s("skin-a5809e8daa76","UMP-45","Riot","milspec",1.22,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1Y-s27ZbQ5dc-GHnWfwPxJvOhuRz39lx8h4DnXw9f6cCiWbVNyXsYhF-RbsxK5m9LhMevmtVDeg4JAyyr3jDQJsHgJoZgLvA"),
      s("skin-982f2e59bfda","USP-S","Torque","milspec",1.72,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_v5kv-Z7SjqgnAsYvzSCkpu3cH2eZgcgD5cmTOQK5BftlobvY-zk4gCN2I4UyX-s3XhI7S4_supXA71lpPNCDDeLhA"),
      s("skin-4d0cb66e0e31","FAMAS","Neural Net","restricted",5.39,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a4s2oaalsM8-XAXOD_uJ_t-l9AX_lzB8ltmXcnoqvInjEPQEoC5AjELRY4Rm_lIDmM7zlsQ2L3YsQxHngznQe8yNao04"),
      s("skin-b587b6dd9b9b","M4A4","Evil Daimyo","restricted",6.93,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSJeaaAliUwOd7qe5WQyC0nQlp4GqGz42ucCqXaQMhDpd4R-AIsxK6ktXgZePltVPXitoRn3-tjCgd6zErvbijVJZd2Q"),
      s("skin-e1e7a9cee96e","MP9","Ruby Poison Dart","restricted",3.58,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_C9k4uL3V6pkNOKcCWKe_uJ_t-l9AXzhkEsm527Xy9r_JynEP1IiWJZ3FOYP4xTqmtznNO-34VCKiYJExSjgznQeVzj6siQ"),
      s("skin-4af8cd1ab41d","Negev","Loudmouth","restricted",6.79,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-SAGmZyed6sfVmXRa_nBovp3PXzousdnrBbgEiX5QjTbICsEa7ktTnNOPrsQLW3YoQyS33jygbuHts_a9cBgJfeVOc"),
      s("skin-5b9aeeb9ad89","P2000","Handgun","restricted",3.45,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PO_V7Q_cKDDMWWfzuNJvOhuRz39xE53sWncnN2vcnKeaQAlA5cjRuUL4RTqxN3nP-ix4QCLjIIQyHn2iTQJsHgxqMM--w"),
      s("skin-e33988dc3569","CZ75-Auto","Yellow Jacket","classified",14.78,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2tcvM4Ic-QBmaD1edstfNWQyC0nQlptjjRn9z8cHjBbgB2WccmFOAPukbux9zlP77nsQXf3YxFzSX9iy9AvDErvbgg0Q8tFg"),
      s("skin-5b44cad3a5da","MP7","Nemesis","classified",18.56,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_jdk4uL5V6poLeOaHVicyOl-pK87Hyu1kR5_5j_WntigcXmXOlBzCZUjQeMLtBG6x9HuNrvl4gCP2I1B02yg2TXalB0S"),
      s("skin-f0772ea6839f","SG 553","Cyrex","classified",18.66,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-QF3WV2dF6ueZhW2frlhl14W7Xzt6geXqQP1N0CMRyQuFY5kHsx9HmZejq7wPei91AzCT_kGoXueC0Dzdv"),
      s("skin-0ffd6029f447","AK-47","Aquamarine Revenge","covert",69.57,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-GHGaXxNF3vPVWQyC0nQlp4WvVzturJ3qVb1B1DMd3Q7EO5xW_l9O2ZOLg5gyP2N9BxST_jXwY7TErvbj-FmM1dA"),
      s("skin-f787cc672771","AWP","Hyper Beast","covert",75.03,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6x0MPWBMWWVwP1ij-1gSCGn20pxtm_WzNuoeHKeaFAnCZUiTe5bt0HqxofmZOrm5Q2IjoMQzS_5iShXrnE8NzWs__c"),
      s("skin-vanilla-weapon_knife_falchion","★ Falchion Knife","Classic","gold",227.97,"@JKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2oaahuKPmcACmSlL4u5uVqG37klhh24DnUytaqJXKQbgcmX5RyF-4Puha8xofmZejg-UWA3FLkEz9H"),
      s("skin-eb63179edd1a","★ Falchion Knife","Fade","gold",484.91,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SD1iWwOpzj-1gSCGn20l-tmjVmIqhdHmWa1AkCJRyFuUItBW9wNTmY7jh5ADa3o5Fy3-sinhXrnE8OtZmGks"),
      s("skin-5a6cdbf82422","★ Falchion Knife","Crimson Web","gold",241.64,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-bF1iHxOxlj-1gSCGn20t242-Eno34cC6SOgYoCZZzE-JesxawkIG0Pry24lCKj4IRzn-th3xXrnE8QWIt39g"),
      s("skin-a0e461882742","★ Falchion Knife","Slaughter","gold",484.23,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SA1iKxOxksd5lRi67gVMhsWvXnIurc36UP1RzWJB4QbYCsBC-xoC0N-3gtVHY2N8XmCT_2isb8G81tLxG9DyC"),
      s("skin-71054caf38d9","★ Falchion Knife","Case Hardened","gold",266.06,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1d7v6tYK1iLs-SH1ifyOJztN5lRi67gVMi4z-Hz96tcSiUblcoA5tyTONZsxG4wdPjZLvg4Q3ej99Ezyr2jS1L8G81tJVww3hv")
    ]
  },
  {"id":"bm_syndicate","name":"Сейф «Легенды Коллекций»","subtitle":"Dragon Lore, Gungnir, Medusa, Принц, Вой, Дикий лотос","category":"black_market","price":160,"accentColor":"#F59E0B","customChances":{"milspec":55,"restricted":28,"classified":11,"covert":4.5,"gold":1.5},"image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frHAVuKf7PaJucPLHW2TExb9z4OdvHirixEomtW7cyduvci2VZ1AiCsR2Q_lK7EdW_VBhrw"),
    "items": [
      s("bm_s1","M4A1-S","Printstream","milspec",38,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj_F7Rienhgk1tjyIpYPwJiPTcAAoCpsiEO5ZsUbpm9C2Zuni4VHW3o5EzSX62HxP7Sg96-hWVqYi_6TJz1aW0nxrkGs"),
      s("bm_s2","AK-47","Inheritance","milspec",46,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQ0OKheqdoLPGaAFicyOl-pK8xGH_nwUt1sGrSz9ivcHKQOAcjXMYkRu5Yuxe4lYCyZOq25VSM2oMT02yg2UxBSEgA"),
      s("bm_deagle_blaze","Desert Eagle","Blaze (Пламя)","restricted",145,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7vORbqhsLfWAMWuZxuZi_uI_TX6wxxkjsGXXnImsJ37COlUoWcByEOMOtxa5kdXmNu3htVPZjN1bjXKpkHLRfQU"),
      s("bm_glock_fade","Glock-18","Fade (Градиент)","restricted",190,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a7s2oaaBoH_yaCW-Ej-8u5bZvHnq1w0Vz62TUzNj4eCiVblMmXMAkROJeskLpkdXjMrzksVTAy9US8PY25So"),
      s("bm_m4_hotrod","M4A1-S","Hot Rod (Хот-род)","classified",420,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GdMXWVxdF75OA4XBa_nBovp3PXyt2uJ32QaQciDZUhReUM5hLskdy2Pu_n4wLe2doXm3j-2i5A7X5i_a9cBuWkb97d"),
      s("bm_ak_fireserp","AK-47","Fire Serpent","classified",580,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0PSneqF-JeKDC2mE_u995LZWTTuygxIYvzSCkpu3cnvFPQB2DpUkROFY4Rntw93lP7i241DbiI1BxSuviHlKunk_6-sHU71lpPMTRLyP4Q"),
      s("bm_awp_medusa","AWP","Medusa (Медуза)","covert",1850,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk4veqfbdsH_GEHlicyOl-pK85TC23wk12tWSGnNr6JXqRPVUnA5J5RLIKshS-l4HuYbji7lfajdgU02yg2bOcOBD3"),
      s("bm_ak_lotus","AK-47","Wild Lotus (Дикий лотос)","covert",3200,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV61-LPGdCliWzeFkse1WQyC0nQlpsDuGyt-pdnyRPA4hDcYkR-QPuhi-wdPuYbyx5AaMidkQnC_-2ilIuzErvbi4ijV5Mw"),
      s("bm_m4_howl","M4A4","Howl (Вой)","covert",2600,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afVSKP-EAm6extF6ueZhW2exwkl2tmTXwt39eCiUPQR2DMN4TOVetUK8xoLgM-K341eM2otDnC6okGoXufBz_TAB"),
      s("bm_awp_gungnir","AWP","Gungnir (Гунгнир)","gold",6400,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6N4LvedB3WvzedxuPUnHnjnzUl0sWrdztitI3rDZgJzAsZ1QOFY4UPqldDgMO_l41HXit9AmTK-0H227dAsvQ"),
      s("bm_awp_dlore","AWP","Dragon Lore (История о драконе)","gold",8500,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk4veqYaF7IfysCnWRxuF4j-B-Xxa_nBovp3Pdwtj9cC_GaAd0DZdwQu9fuhS4kNy0NePntVTbjYpCyyT_3CgY5i9j_a9cBkcCWUKV")
    ]
  },
  {"id":"bm_knives_gloves","name":"Сейф «Охота за Ножами»","subtitle":"Высокий риск • От Кукри до Бабочек и Перчаток Порок","category":"black_market","price":280,"accentColor":"#FFD700","customChances":{"milspec":58,"restricted":24,"classified":12,"covert":4.5,"gold":1.5},"image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnAVvfb6aqduc_TFVjTCxbx05OU4S3jilE9w4DzRnImtIy2Sa1JzDJEhRPlK7EcO4U8gfA"),
    "items": [
      s("kg_0","AK-47","Case Hardened","milspec",65,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNK0P2nZKFpH_yaCW-Ej7sk5bE8Sn-2lEpz4zndzoyvdHuUPwFzWZYiE7EK4Bi4k9TlY-y24FbAy9USGSiZd5Q"),
      s("kg_8","★ Kukri Knife","Fade (Градиент)","restricted",240,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsIc-VD2OV_uJ_t-l9AXyyzEohsGvVn4moIi-VO1N2CJR1E-UD4BXtkIXhMe2x7lbej4tEnyzgznQeN9c5PgA"),
      s("kg_9","★ Talon Knife","Fade (Градиент)","classified",620,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWaR_uh3tORWQyC0nQlpsmXcnNaoeHuTZwUiWMZzRrVZsxm9x9ThNrzj4QCPjdhNmHj73S9KujErvbhX2ACGeQ"),
      s("kg_4","★ M9 Bayonet","Crimson Web","classified",780,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMW-J_vlzsvJWQyC0nQlp4GrWzYuqeHjDZlN1XJohTecO5xawwdDvNuLm5wPcjY0QzyX83Xsd7zErvbgxKe4lfw"),
      s("kg_5","★ Sport Gloves","Vice (Порок)","covert",1950,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_KfG2Kv0ed4u95lRi67gVNx4T-Bw434IHyVb1QlAsd1FOUDthG4xNznMu3m4QXXg90Wzn_33C1I8G81tLaDi_rK"),
      s("kg_1","★ Karambit","Fade (Градиент)","covert",2400,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SD1iWwOpzj-1gSCGn20tztm_UyIn_JHKUbgYlWMcmQ-ZcskSwldS0MOnntAfd3YlMzH35jntXrnE8SOGRGG8"),
      s("kg_2","★ Butterfly Knife","Fade (Градиент)","gold",4200,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2avx-9ytd5lRi67gVNwsDvSwtqqc3iXZg4kCZYjReYLtRbum9XgYuvm5wbWjtgUzCn3iSsf8G81tFEeH9rw"),
      s("kg_6","★ Sport Gloves","Pandora's Box","gold",5900,"@IGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H-CGHHecxNF6ueZhW2exk01w4j7cmYn4eHPCbAMhApdwTOIN5BPsx9yyYu605FTeid0Uy3j3kGoXueKyz5wo")
    ]
  },
  {"id":"cap_cph24_leg","name":"Капсула Легенд | Копенгаген 2024","subtitle":"Турнир PGL Major 2024 • Голо и Золото","category":"capsules","price":0.99,"accentColor":"#38BDF8","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk7OKmOvQ_dM-fC2CVz-pl_rZvTXDqzRxw523Rm4mocy6QOgUmDcR4Q-8Mu0O5wNPkNuLnsleL3tlbjXKpQyK7hjg"),
    "items": [
      s("sticker-7254","Natus Vincere","Copenhagen 2024","milspec",0.37,"@Jai0ki7VeTHjMmxPSnHtwI6-obi4xe_F0SpycTm_3NfuauvafFpIfHBXmTImLoj5bVtSSqxkxx04GzQn9esbzvJOV84pacW",true),
      s("sticker-7258","Virtus.pro","Copenhagen 2024","milspec",0.14,"@Jai0ki7VeTHjMmxPSnHtwI64pe6ugvkFUWgnc6xrnsKuKP9bPNscqjFDzHHlu90sbM5TX2wxkp14WTUnMHpLyyrjSYF-g",true),
      s("sticker-7262","G2 Esports","Copenhagen 2024","milspec",0.3,"@Jai0ki7VeTHjMmxPSnHtwI689W6vwzjRU3zzZW4rncCuPf_OvY_I6KRX2HEwO0ltuQ8GS_gxUt_4juAnsHpLyxV8rB6kA",true),
      s("sticker-7266","FaZe Clan","Copenhagen 2024","milspec",0.37,"@Jai0ki7VeTHjMmxPSnHtwI68obu7xfjQB7zyMLlqHRdvPSsMaY5I6fDXjLFk-8ls7Y_HH7jlksl4jjcztqhbzvJOdEYnDi_",true),
      s("sticker-7270","Team Spirit","Copenhagen 2024","milspec",0.32,"@Jai0ki7VeTHjMmxPSnHtwI655f9-BflEhimnc_i_nID7KD9MPVsIfPBCDCTlLly5LRoTirnzRxx4WzSyt36bzvJOfPBN-a5",true),
      s("sticker-7274","Vitality","Copenhagen 2024","milspec",0.37,"@Jai0ki7VeTHjMmxPSnHtwI64o7g6xeyFET3n5Dm_yEDuqqvPPdrcPPCVjfHxblw4LZsH33rxEtz4WrWztehbzvJOfadTm_6",true),
      s("sticker-7278","MOUZ","Copenhagen 2024","milspec",0.29,"@Jai0ki7VeTHjMmxPSnHtwI6-Yjh8Be0Eh6in8WypHtevaf9PfNsJqPECjLGl-wh57doG3_hk05wsGXRyIqhbzvJOX5ask-j",true),
      s("sticker-7282","Complexity Gaming","Copenhagen 2024","milspec",0.31,"@Jai0ki7VeTHjMmxPSnHtwI695f48he3EEr1yJKxqHECt_esaqU9JaTHDDTHwr8vtbk-GHznlx525GTTw9_8bzvJOSvtUTwO",true),
      s("sticker-7350","PGL","Copenhagen 2024","milspec",0.22,"@Jai0ki7VeTHjMmxPSnHtwI65ID4pFrhR0ilx5C5rXoI6aX4aqZpcfWSVmbAk7l0trE_GHjiwx9-5zjUn4q3MSXAPkkBAAI",true),
      s("sticker-7255","Natus Vincere (Glitter)","Copenhagen 2024","restricted",0.67,"@Jai0ki7VeTHjMmxPSnHtwI6-obi42bgTRTlipPys3YKuqKrO6c6cPGSDDLGxbcm4eRqGiuxxUsh522BztmuJH-QaQ8hCcNuBblds-7MWqE",true),
      s("sticker-7259","Virtus.pro (Glitter)","Copenhagen 2024","restricted",0.74,"@Jai0ki7VeTHjMmxPSnHtwI64pfL7VXuVQn0jNi4pXQPu6r6P_Frd6PADWSUwOsu6bExGC3nwR8i42zUmNmgc3yTPVQnFNIuEja8jiar",true),
      s("sticker-7263","G2 Esports (Glitter)","Copenhagen 2024","restricted",1.04,"@Jai0ki7VeTHjMmxPSnHtwI689XL7VXuVQn0jNjm-3UK6qqobKI4IqjCC2TGmLwv4uJtTCvhwEtxsmXRmNv9eH-fPAMnFNIuEmqGoj_i",true),
      s("sticker-7267","FaZe Clan (Glitter)","Copenhagen 2024","restricted",0.75,"@Jai0ki7VeTHjMmxPSnHtwI68obu72bgTRTlipPys3ZduKr2baFrcajCVzTFlusg6OMwGH2ykBxz5znUzourJHyQPQB2D8BuBbldzWtlyR0",true),
      s("sticker-7271","Team Spirit (Glitter)","Copenhagen 2024","restricted",0.67,"@Jai0ki7VeTHjMmxPSnHtwI655f9-GbgTRTlipPysyEJvvSrbqA9IfKRWjHFx7ki4rBqTXqxkxtwsjyGn936cHjBOlchDcNuBbld8Qn2uRM",true),
      s("sticker-7275","Vitality (Glitter)","Copenhagen 2024","restricted",0.65,"@Jai0ki7VeTHjMmxPSnHtwI64o7g62bgTRTlipPysyYDuqf3bKA7cqKQCGOVxbhw5rY7TnrqkR50tjnTnNatdHmeawYkXJFuBbldcV_h-N4",true),
      s("sticker-7279","MOUZ (Glitter)","Copenhagen 2024","restricted",0.9,"@Jai0ki7VeTHjMmxPSnHtwI6-Yjh8GbgTRTlipPys3EI7KD9MPU4IfGVXGSVx7t35LhvFn-2zBki5zjVwoqrc3KUbwZ0DcFuBbldHAfc6Fc",true),
      s("sticker-7283","Complexity Gaming (Glitter)","Copenhagen 2024","restricted",0.66,"@Jai0ki7VeTHjMmxPSnHtwI695f48mbgTRTlipPys3EPt6qtO_c1cfbGC2WUw-smsuQ9HCy1zEkl4zmGyImhcy6eOAMoWZFuBbldzJ6uHTQ",true),
      s("sticker-7351","PGL (Glitter)","Copenhagen 2024","restricted",0.78,"@Jai0ki7VeTHjMmxPSnHtwI65ID41V7rSAnlm4Su-HdYvaL5PaE5canCWTTImLsltLk_S37iwhx162qEyIypci7DbAMjXIwwG7D6XNl3Pg",true)
    ]
  },
  {"id":"cap_cph24_chal","name":"Капсула Претендентов | Копенгаген 2024","subtitle":"Турнир PGL Major 2024 • Блёстки и Золото","category":"capsules","price":0.99,"accentColor":"#06B6D4","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk7OKmOvQ_dM-QBmaczet4t-R7XGfrwEh_tW7TnNagcnyeOAF0DpV0TOAM5ka7ktflYuOz71Dc34hFnyT7kGoXuWbTjaik"),
    "items": [
      s("sticker-7286","Cloud9","Copenhagen 2024","milspec",0.33,"@Jai0ki7VeTHjMmxPSnHtwI69966vQuwEEz0y8PiqSdfv6qvPfNpIvKSWzPIkuwntuc_SnHhxkt362SBz8HpLyylZ_A_vA",true),
      s("sticker-7290","ENCE","Copenhagen 2024","milspec",0.23,"@Jai0ki7VeTHjMmxPSnHtwI68Yn37xfmRE_zmMK4rXoN7PasafA1I_ORXTPImb4hs7FoSXzixh8h4mrczN6qbzvJOax59TYz",true),
      s("sticker-7294","FURIA","Copenhagen 2024","milspec",0.14,"@Jai0ki7VeTHjMmxPSnHtwI68pLm4xe1E0SmnM7l_ycJ7Pb2avRvdKTBV2aSk-wis7g_SXjrwEsm4jyDzNr9bzvJOVt-UqoG",true),
      s("sticker-7298","Heroic","Copenhagen 2024","milspec",0.37,"@Jai0ki7VeTHjMmxPSnHtwI6_ILm5Re0EhylyZS3_HAKv6b5MfI-JfTLWDeRlr4nsuNsHHnlzUomsm6Gyt3_bzvJOQFPeu2J",true),
      s("sticker-7302","Eternal Fire","Copenhagen 2024","milspec",0.4,"@Jai0ki7VeTHjMmxPSnHtwI68ZPx-BflRRymnZW3ryZeu_T2OfNrJKPFWzKRme9y4eJqS3q2wh535z_dzderbzvJOcffn4Ox",true),
      s("sticker-7306","Apeks","Copenhagen 2024","milspec",0.26,"@Jai0ki7VeTHjMmxPSnHtwI69Zfx8hfkEEryn8ey_3ALtvatPvJod_OWXjCWwO8jteUxTSuwkEsk4TiEn9z8bzvJOb-NpFJy",true),
      s("sticker-7310","GamerLegion","Copenhagen 2024","milspec",0.34,"@Jai0ki7VeTHjMmxPSnHtwI684u6sgvmERvyyJS1qydf7aCvbPZveaXBWGOSl7ck5LQ6HXzmwU5-smWHnsHpLyzIXZoZYQ",true),
      s("sticker-7314","SAW","Copenhagen 2024","milspec",0.17,"@Jai0ki7VeTHjMmxPSnHtwI654bjpAq1GEWnyZTjriYJ66f-bPw1I6XACDCUx70v4Oc-Syjhkx5ztW7WnN-3MSXA-TiicYs",true),
      s("sticker-7350","PGL","Copenhagen 2024","milspec",0.23,"@Jai0ki7VeTHjMmxPSnHtwI65ID4pFrhR0ilx5C5rXoI6aX4aqZpcfWSVmbAk7l0trE_GHjiwx9-5zjUn4q3MSXAPkkBAAI",true),
      s("sticker-7287","Cloud9 (Glitter)","Copenhagen 2024","restricted",1.1,"@Jai0ki7VeTHjMmxPSnHtwI6997L7VXuVQn0jNjjpCZYt6b9PvVsJafLXDeTkexz6bY_TXHjkxt_5GyEnNr8cymUawAkFNIuEtPZXNZ7",true),
      s("sticker-7291","ENCE (Glitter)","Copenhagen 2024","restricted",0.94,"@Jai0ki7VeTHjMmxPSnHtwI68Yn372bgTRTlipPys3QN66SrO6Y7IamWDzCUlOgn6OJqSXzklEx0427Sw4muI32SaQUiCcZuBbldgVezOIA",true),
      s("sticker-7295","FURIA (Glitter)","Copenhagen 2024","restricted",1.28,"@Jai0ki7VeTHjMmxPSnHtwI68pLm42bgTRTlipPysyBfvqeobaJoJvbLDTDBmLpy4bU5SnnqkUxx52ncmdytIi-VbAAoX5RuBbld-zSrKvU",true),
      s("sticker-7299","Heroic (Glitter)","Copenhagen 2024","restricted",1.41,"@Jai0ki7VeTHjMmxPSnHtwI6_ILm5WbgTRTlipPysyENvvOrP_Bsc_XCVjaUk7Yh6bBoTnrnzRtw4WnXnN34eC_FOFAjXJRuBbld5WNlP-k",true),
      s("sticker-7303","Eternal Fire (Glitter)","Copenhagen 2024","restricted",0.73,"@Jai0ki7VeTHjMmxPSnHtwI68ZPx-GbgTRTlipPys3YN7vH3aaFucaOWC2KSwrsvsrg6Tnm2lEp-tm2Antj6cnuTPAJyCMBuBbldd06KcBI",true),
      s("sticker-7307","Apeks (Glitter)","Copenhagen 2024","restricted",1.15,"@Jai0ki7VeTHjMmxPSnHtwI69Zfx8mbgTRTlipPys3UM7qb5bvA0IqmXXDfHxL0u5LY9THDjkUp1423Tm4mrJ3rEOgVyDsduBbldVtD-kls",true),
      s("sticker-7311","GamerLegion (Glitter)","Copenhagen 2024","restricted",1.06,"@Jai0ki7VeTHjMmxPSnHtwI684vL7VXuVQn0jNixqyMPt6r-PfdudvbDDWbGlb515eA6Hn_lwxgk5WmDmd2uJ3LCbFQoFNIuEjN3tIPn",true),
      s("sticker-7315","SAW (Glitter)","Copenhagen 2024","restricted",0.99,"@Jai0ki7VeTHjMmxPSnHtwI654bj1V7rSAnlm4SuqnUDt6etOqBveKGWVmaVxehy57Q5SnuxzEp0sDmEno74dHiSbQYkCowwG7CXgFqNuw",true),
      s("sticker-7351","PGL (Glitter)","Copenhagen 2024","restricted",1.29,"@Jai0ki7VeTHjMmxPSnHtwI65ID41V7rSAnlm4Su-HdYvaL5PaE5canCWTTImLsltLk_S37iwhx162qEyIypci7DbAMjXIwwG7D6XNl3Pg",true)
    ]
  },
  {"id":"cap_cph24_cont","name":"Капсула Соперников | Копенгаген 2024","subtitle":"Турнир PGL Major 2024 • Стикеры команд","category":"capsules","price":0.99,"accentColor":"#0EA5E9","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk7OKmOvQ_dM-QAWmExOBytfN6ASzkkB4k4zvdz974In6VbQ8iW5RzFLYOtBC9ltzmMbi3sgHZgoJDmyvgznQeVz5AD80"),
    "items": [
      s("sticker-7318","paiN Gaming","Copenhagen 2024","milspec",0.3,"@Jai0ki7VeTHjMmxPSnHtwI65Ib95BfjRRzyysS4rycPvPGtMac9cPTBXmPIxewus7BtH3vjzBxzsTjdnN2sbzvJOU1as8a1",true),
      s("sticker-7322","Imperial Esports","Copenhagen 2024","milspec",0.36,"@Jai0ki7VeTHjMmxPSnHtwI6_YrkpFyzFBmkypK2_HEK6qD3P_A6cabGWD7Cxb91s-U4TCjjlkQm5mqGz463MSXAkCju25Y",true),
      s("sticker-7326","The MongolZ","Copenhagen 2024","milspec",0.28,"@Jai0ki7VeTHjMmxPSnHtwI6-Ynz8Be_EEykzpWw_yYP7PeoOqA-JKmRV2GUl7sntOA4H3nglBl152rcm9evbzvJOcX-g18Q",true),
      s("sticker-7330","AMKAL ESPORTS","Copenhagen 2024","milspec",0.32,"@Jai0ki7VeTHjMmxPSnHtwI69Yr_6xe2QEvwxpSxpHAMt6H4bPVoJvPCCD-TlrZz6bU7FivnxUV3tW7XzNaubzvJORC0poUV",true),
      s("sticker-7334","ECSTATIC","Copenhagen 2024","milspec",0.25,"@Jai0ki7VeTHjMmxPSnHtwI68YTn_he0FUTznMO1pXUDv6GoMKZuI6nLCz7FkLsg57Q7Fiy1xE5z4mnSzdf9bzvJOS6M3-FO",true),
      s("sticker-7338","KOI","Copenhagen 2024","milspec",0.32,"@Jai0ki7VeTHjMmxPSnHtwI6_4j9pFjhQ0Woy8Hk-HQO7KP2P_Y5eKTAWDaVwuhy4Lc9SSiyzE5z4WWGnIy3MSXAU4cRGC8",true),
      s("sticker-7342","Legacy","Copenhagen 2024","milspec",0.38,"@Jai0ki7VeTHjMmxPSnHtwI6-ID38xflGEWlzZTi_HsOtqL5PfRoJaeVW2SWkrtz47gwHXGwx01z6m_RyNn4bzvJOT7pa39k",true),
      s("sticker-7346","Lynn Vision","Copenhagen 2024","milspec",0.15,"@Jai0ki7VeTHjMmxPSnHtwI6-J765BewFhn0ycTmr3Ff66KvPaU_eaTGWmHGl7ovtLk6Giu1k0sksW-Ewt-tbzvJOUR9ukM-",true),
      s("sticker-7350","PGL","Copenhagen 2024","milspec",0.13,"@Jai0ki7VeTHjMmxPSnHtwI65ID4pFrhR0ilx5C5rXoI6aX4aqZpcfWSVmbAk7l0trE_GHjiwx9-5zjUn4q3MSXAPkkBAAI",true),
      s("sticker-7319","paiN Gaming (Glitter)","Copenhagen 2024","restricted",0.84,"@Jai0ki7VeTHjMmxPSnHtwI65Ib95GbgTRTlipPysycJt6OqPv1udafLDzGVmbhys7FsTi-xwkx1623WyIv6cyiSP1BxDMduBbldQ5i3R30",true),
      s("sticker-7323","Imperial Esports (Glitter)","Copenhagen 2024","restricted",1.07,"@Jai0ki7VeTHjMmxPSnHtwI6_Yrk1V7rSAnlm4Su_3Vauaf3bKBpdvWRDDKSw7x3srE6SXzkw0pz5G3UnN-oeXLGaA4oX4wwG7BIGU-4Iw",true),
      s("sticker-7327","The MongolZ (Glitter)","Copenhagen 2024","restricted",1.1,"@Jai0ki7VeTHjMmxPSnHtwI6-Ynz8GbgTRTlipPys3AO7av9O6Y9eajBWGTDluonsuJoTnnqzBxzsm7Sw9aseX2QbFBxXptuBbld3M6LIVA",true),
      s("sticker-7331","AMKAL ESPORTS (Glitter)","Copenhagen 2024","restricted",0.96,"@Jai0ki7VeTHjMmxPSnHtwI69Yr_62bgTRTlipPysyYCuaP9OPNoeKDCCjTCkbol47U4Hyzmw0h2t26GzIqoJyqebgB2X5puBbldn7_esmQ",true),
      s("sticker-7335","ECSTATIC (Glitter)","Copenhagen 2024","restricted",1.13,"@Jai0ki7VeTHjMmxPSnHtwI68YTn_mbgTRTlipPysyAI7fT8bfI0JqeVDD6Vl-sv4-BtF36wxR8ltmnQyNn9c3_BbwAgA5RuBbldqpnQrsc",true),
      s("sticker-7339","KOI (Glitter)","Copenhagen 2024","restricted",1.03,"@Jai0ki7VeTHjMmxPSnHtwI6_4j91V7rSAnlm4Su-ScKvKr-MPU-cPPHCzKTlrcjsbZsSnDkwE5_t2iEztv6InmUaFIhW4wwG7CZyGA3GA",true),
      s("sticker-7343","Legacy (Glitter)","Copenhagen 2024","restricted",0.97,"@Jai0ki7VeTHjMmxPSnHtwI6-ID382bgTRTlipPysyQDvfP7OaU1cqmWCmORk7kl4ONtHiu2xkgm5jiDyN37J3PFZlcgA8BuBbldqDQ_C4w",true),
      s("sticker-7347","Lynn Vision (Glitter)","Copenhagen 2024","restricted",1.05,"@Jai0ki7VeTHjMmxPSnHtwI6-J765GbgTRTlipPysyFZu6T-MP06c6DEXjeRw-gms-JsTH7jwxlztmTdzYmgdS2XagIoXJBuBbldwN3Kato",true),
      s("sticker-7351","PGL (Glitter)","Copenhagen 2024","restricted",0.76,"@Jai0ki7VeTHjMmxPSnHtwI65ID41V7rSAnlm4Su-HdYvaL5PaE5canCWTTImLsltLk_S37iwhx162qEyIypci7DbAMjXIwwG7D6XNl3Pg",true)
    ]
  },
  {"id":"cap_paris23_leg","name":"Капсула Легенд | Париж 2023","subtitle":"BLAST.tv Major • Безрамочные Голо стикеры","category":"capsules","price":1.19,"accentColor":"#F43F5E","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk__O8Ybc_cKLAMWuVxut4tPInTi_qwUR_5m_TmN79cHyfagMgA8cjQuEMsUW-x4K1P-Ozs1TZ34hNxDK-0H34xwtSCg"),
    "items": [
      s("sticker-6608","Fnatic","Paris 2023","milspec",0.36,"@Jai0ki7VeTHjNqgJ3KEtwYnp8jy5E3kDxyozs-2r3RZ7qH7O_ZuJfTCXDfIwup3trc8HyjlxU4ism7Qzdf9dnyJLlh3Hg8gr9g",true),
      s("sticker-6612","Natus Vincere","Paris 2023","milspec",0.37,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j660_uD0mix8PmrXMKt_arPvRpdqTCVjPBkrghsbExSS_rx09_4WTWzI34JS-JLlh3RA3pEg4",true),
      s("sticker-6616","FURIA","Paris 2023","milspec",0.38,"@Jai0ki7VeTHjNqgJ3KEtwYnp8jy_0vuDxipzZfmpHoMv_H2PaVvd6LHXjCSmbgl5uMwG3yyzBgksTjSmNiqdimJLlh3Rji5ims",true),
      s("sticker-6620","Vitality","Paris 2023","milspec",0.45,"@Jai0ki7VeTHjNqgJ3KEtwYnp8ji403mD0r3zpOyqCcIu6GtMfxsdaKVCmTEkOwu4udsTHHnxx9_5zmEzI77IyqJLlh3wOZv9c8",true),
      s("sticker-6624","Heroic","Paris 2023","milspec",0.42,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j870voD073zsGw_noM7qD6PqJpeKnHXzKVxLwn5bA8THGykBtx4WrRm4v7dXyJLlh3GzDV1sA",true),
      s("sticker-6628","Bad News Eagles","Paris 2023","milspec",0.27,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j25FypGEWhmsK2pCMJufT_PaY_dfHCD2LAxO9ysuVrSSziw0Qktm7Uwor8JWXXMFEMLtZu7w",true),
      s("sticker-6632","Into The Breach","Paris 2023","milspec",0.35,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j9_lupFB7zzcPkq3YD7ar_OfM-eaaWDT-Swrx0sbA6HHC1kBhw52XdmIn7dWXXMFGci_6WWQ",true),
      s("sticker-6636","9INE","Paris 2023","milspec",0.42,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j671DpD03wm8Dk_HAKtvOtOvxudfTHDDTElOwksbZrHSqwxR8ksWvVztz4dH6JLlh39SjNTPk",true),
      s("sticker-6704","BLAST.tv","Paris 2023","milspec",0.17,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j25krzDxj1zcXhrXdZuvGrafQ8IqnDCjSRxbsvsbY4HizikRlw5T_dzd6vc3mJLlh3GW4i2nI",true),
      s("sticker-6609","Fnatic (Glitter)","Paris 2023","restricted",1.44,"@Jai0ki7VeTHjNqgJ3KEtwYnp8jy5E3kfhr9l4L0-DAV6_P6PvBsc6XHDWPAlL1y6bQ5GCjnlh91tj-Gz4mscC3EagF1C5F1EPlK7EeVM6613g",true),
      s("sticker-6613","Natus Vincere (Glitter)","Paris 2023","restricted",1.68,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j660_ufhr9l4L0-DAV66H5MKdrd6nEWGPExbog4bVqGXiwkUR-tWrVmd-gdiiVa1VyCsYlQvlK7EcULnl1yw",true),
      s("sticker-6617","FURIA (Glitter)","Paris 2023","restricted",1.33,"@Jai0ki7VeTHjNqgJ3KEtwYnp8jy_0vufhr9l4L0-DAVvab7avc5cKXACmaSkex0trltHii2kx9y62rTwo77cHyePFUpWJR4QPlK7EeeWCd2uA",true),
      s("sticker-6621","Vitality (Glitter)","Paris 2023","restricted",0.79,"@Jai0ki7VeTHjNqgJ3KEtwYnp8ji403mfhr9l4L0-DAVuPP-MaE0cPHHWmaVlLpws-M9Hi23wU8j4mXTydyuc3_BbwYjDpQjQvlK7Ec6G0x9uQ",true),
      s("sticker-6625","Heroic (Glitter)","Paris 2023","restricted",0.97,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j870vofhr9l4L0-DAVu6D2MfU-I_WWDDaSw7904-Q9SnDnkEwm6jvdz9uhIH3FaFAgCsZ0EPlK7EdmbhvPzA",true),
      s("sticker-6629","Bad News Eagles (Glitter)","Paris 2023","restricted",1.61,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j25FzYRhH4ioLl72xatvf5afxoI6GQCD_Dk7wjsrNsF3zrwkUm52mAz9_9JC_CO1IhCsElW6dU5SO6xNXq",true),
      s("sticker-6633","Into The Breach (Glitter)","Paris 2023","restricted",1.51,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j9_lvYRhH4ioLl72wCu6WvavFoJvbFWGLJxO134LM6GXHrxUhztW3Qn92qcn6XaVNxD5t4W6dU5VlWmmjk",true),
      s("sticker-6637","9INE (Glitter)","Paris 2023","restricted",1.34,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j671Dpfhr9l4L0-DAV66f-afRrcvTFV2HAl-0l5-A9Sii1xBh-5WWDydeoc3uUbFMlDcN4TPlK7Ecjx7N-gg",true),
      s("sticker-6705","BLAST.tv (Glitter)","Paris 2023","restricted",1.25,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j25krzfhr9l4L0-DAVv6b_a6A-JfTGVj7EmOogtLc7TSiyxBwl4TmByIuvd3yUP1RxA5AhE_lK7EeCuMbobA",true)
    ]
  },
  {"id":"cap_paris23_chal","name":"Капсула Претендентов | Париж 2023","subtitle":"BLAST.tv Major • Безрамочные Золотые стикеры","category":"capsules","price":1.19,"accentColor":"#EC4899","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk__O8Ybc_cKLAMWSYwOJ6te9uSjug2x8isG7czNageS2VaAIoD8ZxRbYNsBa4x9XvZO7r4wyK395AmS782H5XrnE8Sh4_4i8"),
    "items": [
      s("sticker-6640","Ninjas in Pyjamas","Paris 2023","milspec",0.47,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j640mpQx73ypLkpCAMu6SqaqY0c6LHDTDDkLlztOVrHX3rwB914WTXyIr7IGXXMFEViDNjbA",true),
      s("sticker-6644","G2 Esports","Paris 2023","milspec",0.28,"@Jai0ki7VeTHjNqgJ3KEtwYnp8jzuBexERmnyM_m-3YCuqusMfQ9JqbCWzWWlL4ns-NqGH7ikEsi5mjUmY6obzvJOaGkauJL",true),
      s("sticker-6648","forZe eSports","Paris 2023","milspec",0.21,"@Jai0ki7VeTHjNqgJ3KEtwYnp8jy5Uv9Dx6pmJCyryMDuveqOqA5IvWWDzPIwrcgsuc4Ti3iwU914T_cw9aoInOJLlh304S3LB4",true),
      s("sticker-6652","OG","Paris 2023","milspec",0.29,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j77Re-EUqkyMPkr3Zdu6Kraqc6eaLFWDDHlO0htOU_Snjmw0V14mrUzNiqbzvJOSNxujg_",true),
      s("sticker-6656","paiN Gaming","Paris 2023","milspec",0.41,"@Jai0ki7VeTHjNqgJ3KEtwYnp8jk61DpD073m8Ozr3MD7faoa_xuJPPDCmHCkLl35-A6GnvhxElysj_Qm4qvJX-JLlh3vjuhSK4",true),
      s("sticker-6660","GamerLegion","Paris 2023","milspec",0.27,"@Jai0ki7VeTHjNqgJ3KEtwYnp8jz5hfkFkj3msHiqHYP6vCra6BseKSQD2PHlegisuU4SnzqkBwj4D-DytutbzvJOU3DlxS3",true),
      s("sticker-6664","Apeks","Paris 2023","milspec",0.21,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j1-lz_D0ugn5S4pCEOt6StMfQ0I_LHXWWUk7sks-A6HS22kB9x4jyGwo2tIHOJLlh3iFV5GUE",true),
      s("sticker-6668","Monte","Paris 2023","milspec",0.47,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j55VfzD06myJCxrXQOvKL-bPY0JPTLC2THw74mteI8TXu1xEQl5mnVwt37J3KJLlh3Agjw6jI",true),
      s("sticker-6704","BLAST.tv","Paris 2023","milspec",0.37,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j25krzDxj1zcXhrXdZuvGrafQ8IqnDCjSRxbsvsbY4HizikRlw5T_dzd6vc3mJLlh3GW4i2nI",true),
      s("sticker-6641","Ninjas in Pyjamas (Glitter)","Paris 2023","restricted",1.08,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j640nYRhH4ioLl72wJtqGobKFrIfOXWz7IlboltrJqSXnrw00lt23RwterIn-Xb1QgD8R0W6dU5WjipOOy",true),
      s("sticker-6645","G2 Esports (Glitter)","Paris 2023","restricted",0.95,"@Jai0ki7VeTHjNqgJ3KEtwYnp8jzuGbgTRTlipPys3ZZt_P7PvJpcKDCWjCVwuwu57Y9SyvixEx_52yDyY2oeX7GPFIlApFuBbldGovi2kc",true),
      s("sticker-6649","forZe eSports (Glitter)","Paris 2023","restricted",0.95,"@Jai0ki7VeTHjNqgJ3KEtwYnp8jy5Uv9fhr9l4L0-DAV6vH3MKU1JKjCVmLIw-py5LE-Hyzhk0Ql4TiDzN6rJC-WO1QiCJN5FPlK7Ef8v0O-8w",true),
      s("sticker-6653","OG (Glitter)","Paris 2023","restricted",1.59,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j77WbgTRTlipPys3davKqrP_w7JqnLD2KWl75ws7U5TSjjwkom5DiGmNmrcCmWbQcnDJpuBbldCnuom3k",true),
      s("sticker-6657","paiN Gaming (Glitter)","Paris 2023","restricted",1.72,"@Jai0ki7VeTHjNqgJ3KEtwYnp8jk61Dpfhr9l4L0-DAVuvD-OqZrd6DHDDbBx74m57c7GHu2wh4l5W-GyY2pJy7CbAVzWJQmTflK7Ee2PsX2rA",true),
      s("sticker-6661","GamerLegion (Glitter)","Paris 2023","restricted",1.41,"@Jai0ki7VeTHjNqgJ3KEtwYnp8jz5mbgTRTlipPys3MOuPCsaf01I6HCWGLAmb8v47VoSXvgzB5x4m_Un4qqJX6RbVQpDpNuBbld9B18xPo",true),
      s("sticker-6665","Apeks (Glitter)","Paris 2023","restricted",1.62,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j1-lz_fhr9l4L0-DAVuaD6PqBsI6TKCDHHl70i4uNsHi_nlhly42qAyN-hdXuQbAMoApAjQ_lK7Ed_8x03ug",true),
      s("sticker-6669","Monte (Glitter)","Paris 2023","restricted",0.9,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j55Vfzfhr9l4L0-DAVvquoaqY5IvTLDDOSl-1zsrJoSXvqkEUi5G6AnN2qdXjBPFMgDsAlFvlK7EczzFZ9Rw",true),
      s("sticker-6705","BLAST.tv (Glitter)","Paris 2023","restricted",0.94,"@Jai0ki7VeTHjNqgJ3KEtwYnp8j25krzfhr9l4L0-DAVv6b_a6A-JfTGVj7EmOogtLc7TSiyxBwl4TmByIuvd3yUP1RxA5AhE_lK7EeCuMbobA",true)
    ]
  },
  {"id":"cap_rio22_leg","name":"Капсула Легенд | Рио 2022","subtitle":"IEM Rio Major • Бразильская коллекция","category":"capsules","price":1.35,"accentColor":"#10B981","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk_fuhOvQ_cs-fC2CVz-pl_uQ_GXvmxxkmtjzRzdaqJX2XZwclDZVxR-de5BK4w4CxMLux71Tb3Y9bjXKp7ETU0XM"),
    "items": [
      s("sticker-5961","ENCE","Rio 2022","milspec",0.54,"@Jai0ki7VeTHjNioOinHtwQ68Yn37xfjGUmizcW2-yde66D3P_FscKWQX2aWk7ousrFrF3DkxE514m7VnIqvbzvJObEFwewt",true),
      s("sticker-5965","FaZe Clan","Rio 2022","milspec",0.47,"@Jai0ki7VeTHjNioOinHtwQ68obu7xe3R0ugycC0qHEJ7quoPfM6cqXDCD-UxLZ0tLdoF3nrxx9ytmmAzNn4bzvJOYxj4Xqo",true),
      s("sticker-5969","Heroic","Rio 2022","milspec",0.19,"@Jai0ki7VeTHjNioOinHtwQ6_ILm5ReyGR6myJDlqyNa6fP2afw5d6XFCj7Dk-8ns-U-GS-2wU525zmDn474bzvJOdh8foi2",true),
      s("sticker-5973","Natus Vincere","Rio 2022","milspec",0.23,"@Jai0ki7VeTHjNioOinHtwQ6-obi4xexRE6lxsPiqSYDv_CqPPQ6IqLADTbJlL505-U7HHDkzRkitj_UyN2ubzvJOZ-3jWh5",true),
      s("sticker-5977","Ninjas in Pyjamas","Rio 2022","milspec",0.26,"@Jai0ki7VeTHjNioOinHtwQ6-o7kpAuxEE-hnM7iqnRY7vCtPac7cfKQXTPCk7x0srFrSivmxxgk5W2Hmd-3MSXA9w7dKtE",true),
      s("sticker-5981","Sprout Esports","Rio 2022","milspec",0.4,"@Jai0ki7VeTHjNioOinHtwQ655fmpFjjFRujnMG5pSRdt_f9avc-cKTCVzWVmbxwsbltHiqxwEQitmqGnty3MSXAqajzn04",true),
      s("sticker-5985","Team Liquid","Rio 2022","milspec",0.2,"@Jai0ki7VeTHjNioOinHtwQ6-I7lpF22EEX3mpS2rntdv6KqP_1pcPLECmSSwL4lteNoG3_mzU5x4m7Umde3MSXAfkn2xaQ",true),
      s("sticker-5989","Team Spirit","Rio 2022","milspec",0.5,"@Jai0ki7VeTHjNioOinHtwQ655f9-BfiGEykysPjqiNZvff5OfM8IaDGXT-RlLhwtLY6FnjjxB506z_Xn4mqbzvJOcAQbaiv",true),
      s("sticker-6057","IEM","Rio 2022","milspec",0.39,"@Jai0ki7VeTHjNioOinHtwQ6_YL5pA6zE0r3yMblq3sI7KWva6VvJKnKXT_HmO134rI-Sn23lhglsj6By423MSXAm0MlFTs",true),
      s("sticker-5962","ENCE (Glitter)","Rio 2022","restricted",1.52,"@Jai0ki7VeTHjNioOinHtwQ68Yn372bgTRTlipPysyAJvfb-bPU5cqXDDzSWx7gisec9SXDnzRlxsDyDwon9cX-TZgByC5NuBbld7v_WHoI",true),
      s("sticker-5966","FaZe Clan (Glitter)","Rio 2022","restricted",1,"@Jai0ki7VeTHjNioOinHtwQ68obu72bgTRTlipPysyQI6aH5OKU5cvaVCmXCkbgg6ORtGyjkxB93t2SGyYqvI3-UPQZyCMFuBbldX92eT8E",true),
      s("sticker-5970","Heroic (Glitter)","Rio 2022","restricted",0.93,"@Jai0ki7VeTHjNioOinHtwQ6_ILm5WbgTRTlipPysyEMt6b2Ofc4JqeRWTXFx-glsbA9TXq3x0Uk4T_UmdavcnnBPVB0D5tuBbld4VKEL5o",true),
      s("sticker-5974","Natus Vincere (Glitter)","Rio 2022","restricted",0.92,"@Jai0ki7VeTHjNioOinHtwQ6-obi42bgTRTlipPysyMLufCra6E7JvWQWmHIkbon57NrGy3nxx8ksG3QzYygI3yUbgUiX5BuBbldeXn1JtY",true),
      s("sticker-5978","Ninjas in Pyjamas (Glitter)","Rio 2022","restricted",1.09,"@Jai0ki7VeTHjNioOinHtwQ6-o7k1V7rSAnlm4Su-HFat_esMPU5dPHDDzbDxb4k5uVqHy_nwE8l4W_Uwt6qICnGOgElX4wwG7CRm--fDA",true),
      s("sticker-5982","Sprout Esports (Glitter)","Rio 2022","restricted",1.2,"@Jai0ki7VeTHjNioOinHtwQ655fm1V7rSAnlm4SuriAL66b5O6BpcqiQDzfIkLpw47E8GCu1lk4i5W-Gntj6cS2SOgAmCowwG7DWFQXPVg",true),
      s("sticker-5986","Team Liquid (Glitter)","Rio 2022","restricted",1.47,"@Jai0ki7VeTHjNioOinHtwQ6-I7l1V7rSAnlm4Su_yADvaL4afc9eKfHW2HCxLZw5LE_H3jrkBhzsTmHzdyreHnGaA8kAowwG7AY9ncTWw",true),
      s("sticker-5990","Team Spirit (Glitter)","Rio 2022","restricted",1.89,"@Jai0ki7VeTHjNioOinHtwQ655f9-GbgTRTlipPysyRetqH-OfE1dvPBXmaVk7glseNqHXnrk01z4G6Dm9-scimRawYmCcFuBbldBvaKEpg",true),
      s("sticker-6058","IEM (Glitter)","Rio 2022","restricted",0.89,"@Jai0ki7VeTHjNioOinHtwQ6_YL51V7rSAnlm4SurycK7qX-OqI_eKHKV2TEx7t3srZoH3GxzBt_tWvSy4qocXKVbA90W4wwG7DIxIc4hw",true)
    ]
  },
  {"id":"cap_antwerp22_leg","name":"Капсула Легенд | Антверпен 2022","subtitle":"PGL Major Antwerp • Неоновые Голо","category":"capsules","price":1.59,"accentColor":"#A855F7","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk7vy6f6F_MKLDXDWvzetxte9tXGe3lB9w5DjSy4uveC7BbQRzApIlFrQLsxDrkIbjP7jn5VHZiYIXnyWskGoXuce4Ls9p"),
    "items": [
      s("sticker-5271","Heroic","Antwerp 2022","milspec",0.19,"@Jai0ki7VeTHjMuvIWyS90YnpNWmpVHiUxK_zpTi_yAM6qH6OvI6ePXHXTHHmOsv6bJrHiy1wUh1sjyGzI6hc3yeOhhgVMW61xp6FQ",true),
      s("sticker-5275","Copenhagen Flames","Antwerp 2022","milspec",0.59,"@Jai0ki7VeTHjMuvIWyS90YnpNWmpVroURi_nZfipXJZ6qStaaE4c_HGC2SWkOhw4eI6SX2xwUR052SDy4r8dCmfOBhgVMXBlw5ldg",true),
      s("sticker-5279","BIG","Antwerp 2022","milspec",0.67,"@Jai0ki7VeTHjMuvIWyS90YnpNWmpVvuRlOhxsGz_3YOuaWoPvM-cPLBX2WRxOhw4Lc6Gni1kxgmtjiHytj7dS7CcEZ-XfpAXudF",true),
      s("sticker-5283","Cloud9","Antwerp 2022","milspec",0.57,"@Jai0ki7VeTHjMuvIWyS90YnpNWmpVq-Dxmny87iriNauvOtbvU-c6jKXmKRkrghsrY4H3zkzElz4WjUnoytcy6JLlh3gGpv7GY",true),
      s("sticker-5287","FURIA","Antwerp 2022","milspec",0.44,"@Jai0ki7VeTHjMuvIWyS90YnpNWmpV_yUxS_yJPhqXoK66f6bvxoJPbAWWKVw7lytOI6SXjhkE0m6jnUnNetcirFaRhgVMVY0GVhQg",true),
      s("sticker-5291","FaZe Clan","Antwerp 2022","milspec",0.32,"@Jai0ki7VeTHjMuvIWyS90YnpNWmpV_mWxi_ycay-yMMuvf-PKc4ePLBWTeSmbsg5LBqFiq3kUt2sT6Dytn9Iy2QOxhgVMXVHDW7qg",true),
      s("sticker-5295","Ninjas in Pyjamas","Antwerp 2022","milspec",0.22,"@Jai0ki7VeTHjMuvIWyS90YnpNWmpVfuUVOjzcKwqnNZ7KL3PPVsI6CQXD7GkLh04bc4HHyxwEt04DjTyY6sdXvDcEZ-XVokOZk4",true),
      s("sticker-5299","Natus Vincere","Antwerp 2022","milspec",0.25,"@Jai0ki7VeTHjMuvIWyS90YnpNWmpVfmVxS_y5W4qHBYuKb6a6U0c6fEXGbEx7oi4uJtF3Gwwhgm4DnUz4n7c3iRPRhgVMUg8MoVRA",true),
      s("sticker-5367","PGL","Antwerp 2022","milspec",0.35,"@Jai0ki7VeTHjMuvIWyS90YnpNWmpUngTVOgy5LiqyEKuPT5PfxsI6DDCmHHkbYh5uM9G3HqxkR-4mSDm9r7JSiScEZ-XbWGARq1",true),
      s("sticker-5272","Heroic (Glitter)","Antwerp 2022","restricted",2.05,"@Jai0ki7VeTHjMuvIWyS90YnpNWmpVHiUxLOmZrp6TZe_bz4OKU_JKXDWz_Bkb8u4rVrGn_kk0V34z7VytmhJCmWZlciXpQmR-JfrFDmxdnaC8M2",true),
      s("sticker-5276","Copenhagen Flames (Glitter)","Antwerp 2022","restricted",1.18,"@Jai0ki7VeTHjMuvIWyS90YnpNWmpVroURjOmZrp6TZe_bz4aqU0cKfLDDPDk7gi57NqTXu2k0x_5myAm4n6IHieag8mCZdxF-NYrFDmxZ1CNVMF",true),
      s("sticker-5280","BIG (Glitter)","Antwerp 2022","restricted",1.5,"@Jai0ki7VeTHjMuvIWyS90YnpNWmpVvuRiL2kp_06SdJoaWsP6I_c6nFXmTJw7og5LVrHC-2l0px52vdy9agIyrEbVJyCZpxRrMU8k7vbEctRow",true),
      s("sticker-5284","Cloud9 (Glitter)","Antwerp 2022","restricted",1.25,"@Jai0ki7VeTHjMuvIWyS90YnpNWmpVq-fhr9l4L0-DAVt6Sqa6c4JPWVDGOVkr915bQ5G3_hzEhy6z_Sw9mtcXPFP1cnXpJzEPlK7EdwTEe_Bw",true),
      s("sticker-5288","FURIA (Glitter)","Antwerp 2022","restricted",1.25,"@Jai0ki7VeTHjMuvIWyS90YnpNWmpV_yUxTOmZrp6TZe_bz8MKU_cfWVCjWUlr8itbQ-S3C3kEwh6mqHn9-uICiePw4gA5V3QuRYrFDmxbSYlu0I",true),
      s("sticker-5292","FaZe Clan (Glitter)","Antwerp 2022","restricted",1.29,"@Jai0ki7VeTHjMuvIWyS90YnpNWmpV_mWxjOmZrp6TZe_bz7bvw9JqLDCjaSwu0k5bFtHH_jlhgm4jnWzd2sJHuUOgEoDcEhQrZZrFDmxf1P75NP",true),
      s("sticker-5296","Ninjas in Pyjamas (Glitter)","Antwerp 2022","restricted",1.06,"@Jai0ki7VeTHjMuvIWyS90YnpNWmpVfuUSL2kp_06SdJoff3MfNsJqjFWGHAk78itblvFnDrxUVzsmnTyNetIimRZ1UgXpsmTeIU8k7vKRSFqoU",true),
      s("sticker-5300","Natus Vincere (Glitter)","Antwerp 2022","restricted",1.96,"@Jai0ki7VeTHjMuvIWyS90YnpNWmpVfmVxTOmZrp6TZe_bz3PfQ4dKbECmOSwLp05rMxSivkw0t05mzSy96reS2TagInX5MkQbUKrFDmxYpDBQna",true),
      s("sticker-5368","PGL (Glitter)","Antwerp 2022","restricted",2.28,"@Jai0ki7VeTHjMuvIWyS90YnpNWmpUngTSL2kp_06SdJoff2afNpJqPGWWHDx-9z4rNsGnu3x0Qj5GXTy9uvdXjEagNxWcBxQrMU8k7vc62wpxM",true)
    ]
  },
  {"id":"cap_stockholm21_leg","name":"Капсула Легенд | Стокгольм 2021","subtitle":"PGL Major Stockholm • NAVI Champion Gold","category":"capsules","price":3.4,"accentColor":"#EAB308","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk_Oaha69lcqDBX1icxOlzvuV6AS_izRhx526Hw9j8dHKVP1QjWcB0E-QC5BW7k9fmY-PqtAzaioMRm3jgznQexd7Cao8"),
    "items": [
      s("sticker-4954","Ninjas in Pyjamas","Stockholm 2021","milspec",0.42,"@Jai0ki7VeTHjNm1Onic7QQlpta75FD3D0ylnJfl_3da7fevPvVsdfbBCmLHkLl3s-U-GyrkxxsktzvQzY2tI3qJLlh3Ep3kYMA",true),
      s("sticker-4958","FURIA","Stockholm 2021","milspec",1.04,"@Jai0ki7VeTHjNm1Onic7QQlpta77Ez1SFOnn8e3pXddvfb2baE4daHGWGPElusjtLk-Sn_lkRt16z_dzdqsJyqScEZ-XUZKj-OR",true),
      s("sticker-4962","Natus Vincere","Stockholm 2021","milspec",1.29,"@Jai0ki7VeTHjNm1Onic7QQlpta75FjxSFOlz5fi-HAKv6D3O_U8dqDLXDTBmOpytrVvSi_jlhsk4j6Awt38dSqXcEZ-XQyj9d6U",true),
      s("sticker-4966","Vitality","Stockholm 2021","milspec",0.85,"@Jai0ki7VeTHjNm1Onic7QQlpta7_FDzQFOpmJWx_yAN6qarOqZvIqDBXTXAlbxw5LU9Gi3qlxh24TiHytr9eH2ScEZ-XVHrZAgI",true),
      s("sticker-4970","Team Liquid","Stockholm 2021","milspec",0.82,"@Jai0ki7VeTHjNm1Onic7QQlpta75lD2D06gyMHipCMKuqv7Pf1vI_LGXj7EwL0i57E-Hnjjw0kjsW7Smd-pcHOJLlh3liGmb0c",true),
      s("sticker-4974","Gambit Gaming","Stockholm 2021","milspec",1.33,"@Jai0ki7VeTHjNm1Onic7QQlpta77VjqQ1P0zce2pCYK7KGsMfZvcvbFXWXEwr8u5uRtGn3ixhsh4WTSw46ucHqScEZ-XZoi-bDr",true),
      s("sticker-4978","G2 Esports","Stockholm 2021","milspec",0.9,"@Jai0ki7VeTHjNm1Onic7QQlpta77QupGEz3zsHirXVf7PSoPvM-JfGXCjDGxOwhsbEwSXy3w0V0tz6Bn4z6c2XXMFFZPtRU2A",true),
      s("sticker-4982","Evil Geniuses","Stockholm 2021","milspec",1.21,"@Jai0ki7VeTHjNm1Onic7QQlpta770_rDxiny8PjpHZevvD-a_I9caPFCzHFl7ly6bVsHyiylkpx5mmEyYr7cCmJLlh3KkHYKIo",true),
      s("sticker-5050","PGL","Stockholm 2021","milspec",1.1,"@Jai0ki7VeTHjNm1Onic7QQlpta7-l7rDxnwn8K2pHYPt6H4baE1IfHCWD7El78ksrE7HCviwh52tz7TntepcX-JLlh3qU4BafM",true),
      s("sticker-4955","Ninjas in Pyjamas (Holo)","Stockholm 2021","restricted",2.75,"@Jai0ki7VeTHjNm1Onic7QQlpta75FD3fhX-kpmupCRY66WrOqI_dfOXW2bHmbols7A8Sn61kBsh5jzRydn_dn7DZ1VxC4wwG7BjjpxeSg",true),
      s("sticker-4959","FURIA (Holo)","Stockholm 2021","restricted",4.23,"@Jai0ki7VeTHjNm1Onic7QQlpta77Ez1SCL5kZrvs3ULuKb6aqc0d6DBVzWSlrl04bcwG3HjzBgi5WrXzYmscHOeb1R1D8ZuBbldMH-MzUQ",true),
      s("sticker-4963","Natus Vincere (Holo)","Stockholm 2021","restricted",3.03,"@Jai0ki7VeTHjNm1Onic7QQlpta75FjxSCL5kZrvsyFa66r-PfM7dPbGWGORwr0k6bA-HnDnk00h62zUyNz8eSmUbg4mXJJuBbldnDdt3dE",true),
      s("sticker-4967","Vitality (Holo)","Stockholm 2021","restricted",3.91,"@Jai0ki7VeTHjNm1Onic7QQlpta7_FDzQCL5kZrvs3oNvaH6O6I0dqCWD2TImLsmtrRqTHzikR5x52XQz9mgdC3DZ1UpDJBuBblde11rAQc",true),
      s("sticker-4971","Team Liquid (Holo)","Stockholm 2021","restricted",3.93,"@Jai0ki7VeTHjNm1Onic7QQlpta75lD2fhX-kpmu_3FZ7KWqO_Q_ePLLCzDCkLpztbE-THixxEl0sW6AzN2sc3nBPFMlDowwG7Ac2z3nSQ",true),
      s("sticker-4975","Gambit Gaming (Holo)","Stockholm 2021","restricted",4.66,"@Jai0ki7VeTHjNm1Onic7QQlpta77VjqQyL5kZrvs3dY6vOqOfJvI6HCWD7Jl-0ntbk4TS3nlEwi5jiBm9epIH3BPAFxWcRuBbldbCdm4W8",true),
      s("sticker-4979","G2 Esports (Holo)","Stockholm 2021","restricted",3.4,"@Jai0ki7VeTHjNm1Onic7QQlpta77QvYSRL9kdi4rXpd7aWtOP07daXFXWTEk7t0s7E5Fyy1wx50tW_SmdmseCnGOg4nFNIuEleK5G18",true),
      s("sticker-4983","Evil Geniuses (Holo)","Stockholm 2021","restricted",4.69,"@Jai0ki7VeTHjNm1Onic7QQlpta770_rfhX-kpmuqiMOvqD5OfdsJfPFWGbBlrhz5bA5TS_rxBwj5GiHy9erJXieO1IiDowwG7CJMNJEOQ",true),
      s("sticker-5051","PGL (Holo)","Stockholm 2021","restricted",2.91,"@Jai0ki7VeTHjNm1Onic7QQlpta7-l7rfhX-kpmuqHdf6qGoMfU5dqDFWWPGlO1wtrU_Giu3xk9xtjmDydj8I3ySZw92XowwG7AdlpusCQ",true)
    ]
  },
  {"id":"cap_berlin19_leg","name":"Капсула Легенд | Берлин 2019","subtitle":"StarLadder Major • Голо и Металлик","category":"capsules","price":4.2,"accentColor":"#EF4444","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk7fe8ZK1jcqDCV1icxOlzvuV6AXrgx0104T6Gn46ucnqXbAYgCptzELELsUbrlIezNeuz7gLe2o5ByirgznQeXISis2o"),
    "items": [
      s("sticker-4020","Astralis (Holo)","Berlin 2019","restricted",3.04,"@Jai0ki7VeTHjMikJ3ee6wQlpd6760rzUyL5kZrvsyFfvar_a_xoJanGWWaWlOp3trNvFyzklBwm52mGy4qocCqRaQByD8BuBbldZNBR94M",true),
      s("sticker-4024","ENCE (Holo)","Berlin 2019","restricted",5.63,"@Jai0ki7VeTHjMikJ3ee6wQlpd6771fkRCL5kZrvs3BeuaH9PPY1cvHADDLGlr5wtrFtHn-3lxt14z_UyNapIn3DbwEmC5BuBbld4YVtA3g",true),
      s("sticker-4028","MIBR (Holo)","Berlin 2019","restricted",5.87,"@Jai0ki7VeTHjMikJ3ee6wQlpd6751DlUyL5kZrvs3cKvPf-OvU1IamQWzDFlL534rM_GXrjzRlz4mvSzIv7diqQZ1BzCZZuBbldizZJ3TU",true),
      s("sticker-4032","Natus Vincere (Holo)","Berlin 2019","restricted",4.07,"@Jai0ki7VeTHjMikJ3ee6wQlpd675FjxSCL5kZrvsyAJ7KP2PaI7IqiVCjDJxehy4rBrG3GykEl0423Qzd38eX2VbAMnDpduBbld1tsuWgg",true),
      s("sticker-4036","Ninjas in Pyjamas (Holo)","Berlin 2019","restricted",3.95,"@Jai0ki7VeTHjMikJ3ee6wQlpd675FD3fhX-kpmuqHJYvPesO6U4dqbAWDbGlbsh6blqSyrnlEpy42iHzY2hIynCaA8gA4wwG7CQluAA8g",true),
      s("sticker-4040","FaZe Clan (Holo)","Berlin 2019","restricted",3.16,"@Jai0ki7VeTHjMikJ3ee6wQlpd677Fj9RCL5kZrvsyRa66L3O_1oIaiVC2TAlLhzs7QxGnHmx0si5DiEm9b_J32RP1N0WZpuBbld52CiIes",true),
      s("sticker-4044","Team Liquid (Holo)","Berlin 2019","restricted",4.94,"@Jai0ki7VeTHjMikJ3ee6wQlpd675lD2fhX-kpmu-XcP6_Cqbfw6I6KWCDaRlO8j5bI-HCjlzUsk42uDyIv6dH-fOAZxDowwG7C2KQ0gkw",true),
      s("sticker-4048","Renegades (Holo)","Berlin 2019","restricted",3.04,"@Jai0ki7VeTHjMikJ3ee6wQlpd67-FzpfhX-kpmu_3MCvKv9bPU_cPbCDGXCkOwi4LBtTS_jzER2t2-Ayon_I36WPwYpD4wwG7DWfFp1GQ",true),
      s("sticker-4116","StarLadder (Holo)","Berlin 2019","restricted",3.85,"@Jai0ki7VeTHjMikJ3ee6wQlpd67-U3mUyL5kZrvs3oI7ar7PKU4eaKRDz7GxL8ntrU4GSiyk0935mjWmNqoeSqSOA4lAsRuBbldQs0cuog",true),
      s("sticker-4021","Astralis (Foil)","Berlin 2019","classified",12.3,"@Jai0ki7VeTHjMikJ3ee6wQlpd6760rzUyL3kZ_ss3ANt6qrbvc9daORWT6Tmeh36Oc6Tnm3k0xy5m_SzIv7cHzBPQMiXptuBbldnntQS2k",true),
      s("sticker-4025","ENCE (Foil)","Berlin 2019","classified",16.95,"@Jai0ki7VeTHjMikJ3ee6wQlpd6771fkRCL3kZ_ss3Rf66P8Ofw0cvWQCj_Bkuwn5bc6TX21xE50tjvXm4z8eC2TPAFxCptuBbldoeP4nwI",true),
      s("sticker-4029","MIBR (Foil)","Berlin 2019","classified",13.81,"@Jai0ki7VeTHjMikJ3ee6wQlpd6751DlUyL3kZ_ssyZYuqOqOqI9eaSXWT_Gw7sm5bUwTiq2lklysm_RzY6vIijDbFd0CZNuBbld75Wo2UM",true),
      s("sticker-4033","Natus Vincere (Foil)","Berlin 2019","classified",20.23,"@Jai0ki7VeTHjMikJ3ee6wQlpd675FjxSCL3kZ_ss3YIvvP9PKZvcPPFCzTHkrhz5Lg5GS-ykRl_sGnVyNmtJXnEPwFxX5tuBbldy71vGwo",true),
      s("sticker-4037","Ninjas in Pyjamas (Foil)","Berlin 2019","classified",17.36,"@Jai0ki7VeTHjMikJ3ee6wQlpd675FD3fhv-l5qu_nMCu_Cva_w7daKVWT7Eme10teI9HXzkwEVysTvUmI2tdy2XPwZxAowwG7BvHrrD-g",true),
      s("sticker-4041","FaZe Clan (Foil)","Berlin 2019","classified",20.37,"@Jai0ki7VeTHjMikJ3ee6wQlpd677Fj9RCL3kZ_ss3ICvfP3a_FrdfHFDzSWkrt0tuJoSXzlk0Uh6mXRnN6tJy3FO1UiAsBuBbld5kuLtcg",true),
      s("sticker-4045","Team Liquid (Foil)","Berlin 2019","classified",22.03,"@Jai0ki7VeTHjMikJ3ee6wQlpd675lD2fhv-l5quqCQIv_aravE0eaWRWj-Rkrtz6bk8TXrixkR35TyGzdapI3rDbwMnCIwwG7AzigTGJg",true),
      s("sticker-4049","Renegades (Foil)","Berlin 2019","classified",15.94,"@Jai0ki7VeTHjMikJ3ee6wQlpd67-Fzpfhv-l5qu_icO7aD8MfQ-IqbGXmGSw-0hsec8H3jmxhx_5WWHnN_8eXKUa1clWIwwG7Dxt8ZasA",true),
      s("sticker-4117","StarLadder (Foil)","Berlin 2019","classified",16.48,"@Jai0ki7VeTHjMikJ3ee6wQlpd67-U3mUyL3kZ_ss3cMv_f7afFoIqTKCmaTkr8l47kwHS_kkEwh5WvRnt79IirBPFB1DppuBbldjLbr5s4",true)
    ]
  },
  {"id":"cap_kato19_leg","name":"Капсула Легенд | Катовице 2019","subtitle":"IEM Katowice 2019 • Классические круги","category":"capsules","price":6.8,"accentColor":"#3B82F6","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk5PO6Z7NkI_XBXjbJ_uJzt-RnSzr9lx50smWGzoytdH_EPAcnC5clRudZ5xG7xtPvMLyztlaK3tpFxC-v2jQJsHiLvWrj0Q"),
    "items": [
      s("sticker-3461","Astralis (Holo)","Katowice 2019","restricted",6.36,"@Jai0ki7VeTHjMGgIXSA7FVwptelsxbmUgnjoZ7v8S0VuaavbvI6JKWSCjXFxe0us7Y9Fy3ixkUj5DvXn46qdi6RZwBxCMR4Q_lK7EdRZLas7w",true),
      s("sticker-3469","BIG (Holo)","Katowice 2019","restricted",6.07,"@Jai0ki7VeTHjMGgIXSA7FVwptelsxblSBrOlpns8mwD6fb4MKI-JqiQWz-TlOxwsuQ9F3qxzEV1sTyAy9usd3-UaVMgXsAlW6dU5W_edU-M",true),
      s("sticker-3477","compLexity Gaming (Holo)","Katowice 2019","restricted",8.04,"@Jai0ki7VeTHjMGgIXSA7FVwptelsxbkThHOlpns8mwOtqv7MaduIqGRXzLCx793tbZoTnqyxU8h42nTn9iveXzDPFUoCpZzW6dU5a6wvPsH",true),
      s("sticker-3485","FaZe Clan (Holo)","Katowice 2019","restricted",8.22,"@Jai0ki7VeTHjMGgIXSA7FVwptelsxbhQAf0oZ7v8S0Vu_D9O6dveaTGX2GRw-gk4rA-Gn2ykUwi4zmAy9qgd3KfOgIoCMYhRvlK7EdRlCbTDQ",true),
      s("sticker-3505","HellRaisers (Holo)","Katowice 2019","restricted",6.3,"@Jai0ki7VeTHjMGgIXSA7FVwptelsxbvTQ_Olpns8mwJvKWtMKU5JfLCVjLDwLx15LQ-Gnqwl04h5m2GnN-oIynCZw92WJV5W6dU5eDvoaBt",true),
      s("sticker-3509","MIBR (Holo)","Katowice 2019","restricted",9.1,"@Jai0ki7VeTHjMGgIXSA7FVwptelsxbqSB_joZ7v8S0V7vCrbfI1dqLCWTbDk7sg4rJvF3i3zU51tmjRz9f9dSrCOFBzC5UmRPlK7Edv7Atlbg",true),
      s("sticker-3513","Natus Vincere (Holo)","Katowice 2019","restricted",8.04,"@Jai0ki7VeTHjMGgIXSA7FVwptelsxbpQAv4oZ7v8S0V7qL8PaY0cvXLDGXDkLYi4bBtS37jxEp0tm7VzNv8di3EaQAmXsQkQPlK7EeX3oHm4w",true),
      s("sticker-3529","Team Liquid (Holo)","Katowice 2019","restricted",7.22,"@Jai0ki7VeTHjMGgIXSA7FVwptelsxbrSAzOlpns8mwLufGoPfE_dfWWDz6WmLkl6eNtHXqxkE506jvQz92td3KeawN0D5t5W6dU5XuG2_2o",true),
      s("sticker-3557","IEM (Holo)","Katowice 2019","restricted",9.11,"@Jai0ki7VeTHjMGgIXSA7FVwptelsxbuRBDOlpns8mxfuvaoMaI0caWSDT-WmL0us7U4GH7kzBxy4m6HyNuqeXOQPQIiApQjW6dU5dIXhd-a",true),
      s("sticker-3462","Astralis (Foil)","Katowice 2019","classified",28.78,"@Jai0ki7VeTHjMGgIXSA7FVwptelsxbmUgnjoZDv9C4VufSvafc1JKCXCzOTwLwl5bY-Tny2zU9xt2nQyN7_J3LDOgIpXJt0QPlK7EdYun55Mg",true),
      s("sticker-3470","BIG (Foil)","Katowice 2019","classified",17.12,"@Jai0ki7VeTHjMGgIXSA7FVwptelsxblSBrOmJnp8WxduqSrbvM0IaCVXzPFlr8j5bFsF3vrkEUl6z_Qm9-teHLEawEmCcMjW6dU5UJcxpqx",true),
      s("sticker-3478","compLexity Gaming (Foil)","Katowice 2019","classified",27.18,"@Jai0ki7VeTHjMGgIXSA7FVwptelsxbkThHOmJnp8WwMuKutavw9cPWRDz7Hw7khsuUxGnzhkEV042vdn46uJXmSOAYhXpFzW6dU5aDm1uel",true),
      s("sticker-3486","FaZe Clan (Foil)","Katowice 2019","classified",18.19,"@Jai0ki7VeTHjMGgIXSA7FVwptelsxbhQAf0oZDv9C4V6qSobfE8IvXEXT_Hkrou57Y_Gyvhk0p_6m7WnIygJS6fbQZzX5sjF_lK7Ec2uxKKxw",true),
      s("sticker-3506","HellRaisers (Foil)","Katowice 2019","classified",18.62,"@Jai0ki7VeTHjMGgIXSA7FVwptelsxbvTQ_OmJnp8WwK6vH8O6A5JvHLCmLGl7kgsbI6Fnu2xx4m5GuGm9yveS_COgV0WZF2W6dU5bIMkCJb",true),
      s("sticker-3510","MIBR (Foil)","Katowice 2019","classified",34.65,"@Jai0ki7VeTHjMGgIXSA7FVwptelsxbqSB_joZDv9C4V7KSvbqA7IqmSXTKSl7su5uU7H3_rzUUm5m7VytetcXySZlApXsZ0TflK7EcZW8m-PQ",true),
      s("sticker-3514","Natus Vincere (Foil)","Katowice 2019","classified",21.51,"@Jai0ki7VeTHjMGgIXSA7FVwptelsxbpQAv4oZDv9C4Vuqf3bPRpeKbDWGWSlep0sec6THzgwkol5jzSn9r_eX-QblcoX8NyTflK7EfVFJAdjg",true),
      s("sticker-3530","Team Liquid (Foil)","Katowice 2019","classified",22.41,"@Jai0ki7VeTHjMGgIXSA7FVwptelsxbrSAzOmJnp8Wxft6v5MKduc_THV2KSlLgvtrg8SSvlwkV2tTuHm4uheCrEZw50A5clW6dU5fft-gaL",true),
      s("sticker-3558","IEM (Foil)","Katowice 2019","classified",35.91,"@Jai0ki7VeTHjMGgIXSA7FVwptelsxbuRBDOmJnp8WwM6fH6P6c7dKWSDDXHwr53seJqHn7kkUR_5m6Aw4r_cy2ebgVzCsQiW6dU5WrTlXFj",true)
    ]
  },
  {"id":"cap_boston18_leg","name":"Капсула Легенд | Бостон 2018","subtitle":"ELEAGUE Major Boston • Редкие Голо","category":"capsules","price":12.5,"accentColor":"#6366F1","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk7f29fKtjcqDCVlicxOlzvuV6AXu1kxx_sGjQy4r8eX6RbAF0CcZ0EbFY5Ea-l4XnN77iswPb3otNzC_gznQet2p2wtU"),
    "items": [
      s("sticker-2437","Gambit Esports (Holo)","Boston 2018","restricted",15.46,"@Jai0ki7VeTHjMiuJm-Y6wQlpd-77VjqQyL5kZrvs3UIuab4P_Y9cqmXWjXExLclsrE_Gn63l04itzncy9ehcnqeZgIiC5NuBbld5cpOKGc",true),
      s("sticker-2441","100 Thieves (Holo)","Boston 2018","restricted",15.7,"@Jai0ki7VeTHjMiuJm-Y6wQlpd-7_lHxfhX-kpmuqiYOv_T4OfVrdqWQCjLJlewj6OI5FyvlxR8ksT7XzY2gc3qUOAAoA4wwG7CQN2507g",true),
      s("sticker-2445","Astralis (Holo)","Boston 2018","restricted",13.28,"@Jai0ki7VeTHjMiuJm-Y6wQlpd-760rzUyL5kZrvs3Vd6vD6O6Y5IqnACmbIwuoutrg4SS_gkUty5m2GzNqtI3KeOw4pCZJuBbld2abPnAM",true),
      s("sticker-2449","Virtus.Pro (Holo)","Boston 2018","restricted",13.55,"@Jai0ki7VeTHjMiuJm-Y6wQlpd-7_EnYSRL9kdiw-3Rd7vetMfc5JaTLWmLAkOoi5bZoGnDklE926znXmNj6cXLCPQUmFNIuEqyjpQgy",true),
      s("sticker-2453","Fnatic (Holo)","Boston 2018","restricted",12.46,"@Jai0ki7VeTHjMiuJm-Y6wQlpd-77FfzQiL5kZrvs3RavaH6OvY_cvPLDDXAwL8v4LYxTS2ywEh1tW_SmNmucHOTa1IpAppuBbldEu6DOqQ",true),
      s("sticker-2457","SK Gaming (Holo)","Boston 2018","restricted",10.41,"@Jai0ki7VeTHjMiuJm-Y6wQlpd-7-VLYSRL9kdiw_CYK6qv4OaY7caCXXz_JxLYlsbM8GXDnkUh15mrVyov4dC-XPw8nFNIuEsT7Uqm0",true),
      s("sticker-2461","BIG (Holo)","Boston 2018","restricted",16.33,"@Jai0ki7VeTHjMiuJm-Y6wQlpd-76FDgfhX-kpmu-XMP6fb8PqdpJKaWW2GSk-8vtLc4SnnikUp25D7SzNasJy_EblMmCIwwG7B3P8wYiA",true),
      s("sticker-2465","North (Holo)","Boston 2018","restricted",15.96,"@Jai0ki7VeTHjMiuJm-Y6wQlpd-75Fb1fhX-kpmurncIuar_OPQ7eKaVVzKWl74gsrI5Giuyw0oh5GuHnI76cHnDO1clCIwwG7AfSlZ-Eg",true),
      s("sticker-2533","ELEAGUE (Holo)","Boston 2018","restricted",11.03,"@Jai0ki7VeTHjMiuJm-Y6wQlpd-771XiQBrkm6no8i5Uoab8bPA7eKLEV2XIlbsn57NrGyuwwU0h6m2Em4qud3nGOwRxD5YiRO8U8k7vtUt7xs0",true),
      s("sticker-2438","Gambit Esports (Foil)","Boston 2018","classified",43.02,"@Jai0ki7VeTHjMiuJm-Y6wQlpd-77VjqQyL3kZ_ss3BdvKv2bvVsJaTKXmLDlrYltrY7HHnlwk8mtzvRzdmhcHuSbVRxW8RuBbldhWow2Io",true),
      s("sticker-2442","100 Thieves (Foil)","Boston 2018","classified",51.06,"@Jai0ki7VeTHjMiuJm-Y6wQlpd-7_lHxfhv-l5qupSMMuKf-OfM1cfGVCj-RkLwh5bFqHivqk0V06jzXwoz_IHmQbVdyD4wwG7CSF7xq4w",true),
      s("sticker-2446","Astralis (Foil)","Boston 2018","classified",50.55,"@Jai0ki7VeTHjMiuJm-Y6wQlpd-760rzUyL3kZ_ssyYLvvD7baZrcPKSCmHEwuwg4LNtTSq1wUxyt2rcnI2rIHPFb1AlDpBuBbldBG98fEQ",true),
      s("sticker-2450","Virtus.Pro (Foil)","Boston 2018","classified",37.73,"@Jai0ki7VeTHjMiuJm-Y6wQlpd-7_EnYRxL4kti1qXFdvvP6avE5I6aXWmTFk7Yg4rM8TnqyxBtw52XTyNaucCnGbFd0FNIuEiqjToQo",true),
      s("sticker-2454","Fnatic (Foil)","Boston 2018","classified",52.78,"@Jai0ki7VeTHjMiuJm-Y6wQlpd-77FfzQiL3kZ_ss3VdvKL5PfFsI_XLV2aTxLYu6OVtH3rmxkkitzmHwov7cXzDbwJ1CsRuBbldOEa2s00",true),
      s("sticker-2458","SK Gaming (Foil)","Boston 2018","classified",37.07,"@Jai0ki7VeTHjMiuJm-Y6wQlpd-7-VLYRxL4kti4q3ZZt6f4Ovw_dajLWDbGlugi5bZtF3rlwU1xsWzcyNmvJyqQb1cgFNIuEvzIBntr",true),
      s("sticker-2462","BIG (Foil)","Boston 2018","classified",37.63,"@Jai0ki7VeTHjMiuJm-Y6wQlpd-76FDgfhv-l5quqXdYuqv3a6E7dKLEXmHFk-p3srU6H3Hhlhx-tmSEy9qrc3LDPVAoC4wwG7DvwkKRzQ",true),
      s("sticker-2466","North (Foil)","Boston 2018","classified",68.1,"@Jai0ki7VeTHjMiuJm-Y6wQlpd-75Fb1fhv-l5qu-3YDvqWrO_E7cKWSV2TDlbpw4LdrF3_nxRt_6z7czI7_cCqXaQB1DIwwG7BIj1Y2Sg",true),
      s("sticker-2534","ELEAGUE (Foil)","Boston 2018","classified",48.11,"@Jai0ki7VeTHjMiuJm-Y6wQlpd-771XiQBrkm6nm8itXoab5PKZrdPTCWzWUkOxys7BsHn2xkUR_4T_Swo38dSiWa1AoW8RyR-YU8k7v_P6Xwng",true)
    ]
  },
  {"id":"cap_atlanta17_leg","name":"Капсула Легенд | Атланта 2017","subtitle":"ELEAGUE Major 2017 • Элитные наклейки","category":"capsules","price":19,"accentColor":"#F97316","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk7uaiaap5IaLDXzCvkb844bVoHS_rxh4k5muDmNuoIn7CPFV0X8BxTbIItEWwxNK2Zuix5gLaiJUFk3vSn3SDmg"),
    "items": [
      s("sticker-1739","Astralis (Holo)","Atlanta 2017","restricted",13.7,"@Jai0ki7VeTHjMu1OXqZ8VcnpNajpVj0VQ_Olpns8mwK7qP9OqJsdPLCWDOVwLgltrc-HCzrxUhxtWuDn4mtIHvFag5zA8R4W6dU5bClXV6s",true),
      s("sticker-1751","Flipsid3 Tactics (Holo)","Atlanta 2017","restricted",22.93,"@Jai0ki7VeTHjMu1OXqZ8VcnpNajpV_rSA3Olpns8mwK66D5afRsefXGCmHHkuoj6bA7HXnjwRlytz7cntmsdCqSZldzXsQhW6dU5SR8SdnV",true),
      s("sticker-1755","Fnatic (Holo)","Atlanta 2017","restricted",24.41,"@Jai0ki7VeTHjMu1OXqZ8VcnpNajpV_pVR7Olpns8mxf7vH6PfY6JKfKCjORxbou5bFrHHjmlhtx42jXzNqqci2QagEpW8d0W6dU5aP0NeAY",true),
      s("sticker-1763","Gambit Gaming (Holo)","Atlanta 2017","restricted",23.71,"@Jai0ki7VeTHjMu1OXqZ8VcnpNajpV7mTB_Olpns8mwPuaX5PqY7IaPHDDLGk7ogsrRsGnvlx0sisW6ByIz9dyjEZlApA8YlW6dU5W1J4x6y",true),
      s("sticker-1779","Natus Vincere (Holo)","Atlanta 2017","restricted",12.43,"@Jai0ki7VeTHjMu1OXqZ8VcnpNajpVfmVxTOlpns8mxevKX9PqU9cPKVXDHImb8n4eA6SnrhlE4ktmnTntuvc3LFZ1ImDZZyW6dU5ZCH35QS",true),
      s("sticker-1791","SK Gaming (Holo)","Atlanta 2017","restricted",25.53,"@Jai0ki7VeTHjMu1OXqZ8VcnpNajpUrsfhX-kpmu-3ELuaqvafI_c6DHWzaUmLYl4rRqSyjnzUp-tW_Qno37eC-fZ1N2DowwG7DelMUj4w",true),
      s("sticker-1795","Team Liquid (Holo)","Atlanta 2017","restricted",19.15,"@Jai0ki7VeTHjMu1OXqZ8VcnpNajpVXuUCL5kZrvs3ZfuPSrOqI9daLFWz7Dxbdw4bJvFy_hxBt-t2XWnN_6ci7EOAFyApBuBbld7x34dGc",true),
      s("sticker-1799","Virtus.Pro (Holo)","Atlanta 2017","restricted",24.17,"@Jai0ki7VeTHjMu1OXqZ8VcnpNajpU_3fhX-kpmurHcI6vesOvA8JfaXDTLJkrlw4LY9GXrhkE1_tTjVmNr_cnjBOg8gXowwG7BmlpkApA",true),
      s("sticker-1803","ELEAGUE (Holo)","Atlanta 2017","restricted",14.96,"@Jai0ki7VeTHjMu1OXqZ8VcnpNajpVzrRBz2i5Pf9S1X4Lz6PKc0eaaRXmHDxbsvtrE5HC2yzUx25DyBwt__JCrBaVQiApR4RuVfrFDmxWWxPZQ-",true),
      s("sticker-1740","Astralis (Foil)","Atlanta 2017","classified",92.22,"@Jai0ki7VeTHjMu1OXqZ8VcnpNajpVj0VQ_OmJnp8WwPt6OsOfFsIaLGXTHCkLclsrJtF3Dnw0tx4DyAyd-pcinDZlN1D5clW6dU5VDckpDP",true),
      s("sticker-1752","Flipsid3 Tactics (Foil)","Atlanta 2017","classified",60.74,"@Jai0ki7VeTHjMu1OXqZ8VcnpNajpV_rSA3OmJnp8WwPvqX7PaE_c_TECGaRkrwusuQ-HiixxB4jt2zRydn7cyiePAJ2D5NwW6dU5frWmpPg",true),
      s("sticker-1756","Fnatic (Foil)","Atlanta 2017","classified",81.99,"@Jai0ki7VeTHjMu1OXqZ8VcnpNajpV_pVR7OmJnp8Wxdv6P5Pac1cfWVXjbAkL4k5bBqHXqxwBh24Wzdn92odCqRP1N1A5d1W6dU5V7TECbs",true),
      s("sticker-1764","Gambit Gaming (Foil)","Atlanta 2017","classified",56.56,"@Jai0ki7VeTHjMu1OXqZ8VcnpNajpV7mTB_OmJnp8WwCt6SsbfVoI_aXW2aTlbsh5uIxHXHkkxl_t2mHytv_ci3CPwQjX8ciW6dU5cFSKPIy",true),
      s("sticker-1780","Natus Vincere (Foil)","Atlanta 2017","classified",50.51,"@Jai0ki7VeTHjMu1OXqZ8VcnpNajpVfmVxTOmJnp8WwC7qP3bfNvI6SRVmKWkLki4uUxTHHhlkUj5mzQzomoJC-TawYjA5t1W6dU5X_TdE_o",true),
      s("sticker-1792","SK Gaming (Foil)","Atlanta 2017","classified",71.21,"@Jai0ki7VeTHjMu1OXqZ8VcnpNajpUrsfhv-l5qu-HEJ66P3avc0IqaWDDCWmO1zs-IwHnrrzE4msWTWyt6uJC6WbQIgDYwwG7AbNEh-9A",true),
      s("sticker-1796","Team Liquid (Foil)","Atlanta 2017","classified",101.22,"@Jai0ki7VeTHjMu1OXqZ8VcnpNajpVXuUCL3kZ_ss3UPt_P9bvw9JqnCWjDIwrcu4-NrFi_qwBlx4GqDw92rcy6VbQMlDZtuBbldck8daK8",true),
      s("sticker-1800","Virtus.Pro (Foil)","Atlanta 2017","classified",98.57,"@Jai0ki7VeTHjMu1OXqZ8VcnpNajpU_3fhv-l5qu-yBdv6f_P_c_dPTAWTLGkLZ06bYwGXvrkU1-5DzUzIn_dHrFPVUmCowwG7C2n_aGTw",true),
      s("sticker-1804","ELEAGUE (Foil)","Atlanta 2017","classified",86.82,"@Jai0ki7VeTHjMu1OXqZ8VcnpNajpVzrRBz2i5Pf-y1S47z2aqY4JqSWV2PIlO0l5rg6HnvgxBgktj-Ew9j_cXmSOFN1DJUmR7JYrFDmxT9mjTt6",true)
    ]
  },
  {"id":"cap_kato14_leg","name":"Капсула Легенд | Катовице 2014","subtitle":"Легенда CS • Titan Holo & iBUYPOWER Holo","category":"capsules","price":180,"accentColor":"#FACC15","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk5PO6OvQ8dM_DXCnHkOgktbhoHyqxxRh0tWiDnIr4dnKSOAUoC5J1TbJZ4Bi8k9HlY-Li-UWA3NcCqy5X"),
    "items": [
      s("sticker-50","compLexity Gaming","Katowice 2014","milspec",51.58,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVLykZvw8SdD5ua3Jv08d_XGXzeVl7906bhvGn62xhkjsTiEzIv6IinEbgEnCJZ3RuZc5hWm0oqwz9ycayY",true),
      s("sticker-52","Team Dignitas","Katowice 2014","milspec",45.72,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL1l5Hu9DZa_LyrOaA8dvKWVjLAkLp05Oc5Gy-yzE4h42uEzN34dnuRZgQjD8QkQOFcrFDmxY_voY8V",true),
      s("sticker-55","Fnatic","Katowice 2014","milspec",66.66,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL3kJf09CEVvqStP6Y6JaaSWjfGlb8mtrM4Ti-wzE12sDjWm4mrdC6WZwMmW5JyQflK7EfDL65HwA",true),
      s("sticker-57","HellRaisers","Katowice 2014","milspec",42.45,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL5m5rs7yNS_Pe8e-o1cqaWXDeWwLhy6bZsG3vlkBt2tWqEn9f4eHyRPAAoWcRxRu8NukTqjJS5YFwAHIOk",true),
      s("sticker-61","Team LDLC.com","Katowice 2014","milspec",60.49,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL9mprjsyAD6fb2P6Y9eKmRCzPBwOt3s7MwG3rlxEwj5mmEzdaqdCqfPQIjAsNuBbldhnvSCr8",true),
      s("sticker-63","LGB eSports","Katowice 2014","milspec",61.95,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL9mZSuqyQK7qD8Pvc0dvTFXD-Vluxzs7hqGn3mzU0k5DmHm4ypd3uSbQIiXIwwG7Ckzoj_bQ",true),
      s("sticker-71","Ninjas in Pyjamas","Katowice 2014","milspec",33.49,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL_l5jq_DFS4eK3YqVgIePdCGHJxOwk5bAwFnDrxBkmsWXUnN_9d3iXZ1AjA8B2QLICt0WwkNC1ZPSiuVKyuwQSVA",true),
      s("sticker-75","Titan","Katowice 2014","milspec",32.04,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVLll4Lh82xYuaf3PKY8JqPGVzWVx-t15uc8HX_ix09_tWSAz46gcSqTawEmCsN2W6dU5WsJhLBH",true),
      s("sticker-51","compLexity Gaming (Holo)","Katowice 2014","restricted",213.36,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVLykZvw8SdD5ua3V6xiLP_dWWHGw71z6LY9Fijkwkx14GnVw476dX-XaVV0X8d0TLRc5kHpxNbvYfSiuVK5KAR_yA",true),
      s("sticker-53","Team Dignitas (Holo)","Katowice 2014","restricted",177.91,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL1l5Hu9DZa_M2mZ6hibvGSCmbGmbol5bk5Hyvnl0kktT_Xn4mreHLGPFAnXJpxFLQP4UG5kNP5d7S1RHgEpV4",true),
      s("sticker-56","Fnatic (Holo)","Katowice 2014","restricted",233.27,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL3kJf09CFk5_2iZ-o_IqTAWDDBwLsn4eQ6HiiyzU915GvXwtqsJH3Eag8lA5VxTeUD4RC8jJS5YFS-xO2Q",true),
      s("sticker-58","HellRaisers (Holo)","Katowice 2014","restricted",179.71,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL5m5rs7yNS_Pe8e5tlL_ycQGWRxbgh4rg-HyyxxUh15z6Hyd6tcirBagB1A5t3Ee8J4BCxldziYeL8p1uJW10TqV0",true),
      s("sticker-62","Team LDLC.com (Holo)","Katowice 2014","restricted",164.95,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL9mprjwipU4_3gbfU1c_bAXDKTwu8u4bhvG3qwxk1x4WXRyYuteXrDPFUnWJtwEbYJsQ74zIN29ZviPw",true),
      s("sticker-64","LGB eSports (Holo)","Katowice 2014","restricted",197.07,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL9mZTf9S1X4Lz3a_Q0damXDDGWl-olsbdtGy3hl0h06j7cz9ivdnmUb1IiX5VzTe4MrFDmxdFt4nC-",true),
      s("sticker-72","Ninjas in Pyjamas (Holo)","Katowice 2014","restricted",125.27,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL_l5jq_DFS4eK3YqVgIeOsBmiczqAl5rc-TH-xxEsi6myAyIytcSiebAQhCpZ1FuEDu0bskdfkMb-z5gzWlcsbmn_Kwe4B",true),
      s("sticker-76","Titan (Holo)","Katowice 2014","restricted",237.34,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVLll4Lh8x1T4P6hJqZrJfHAXjXGkr0i4rc_GSjixEh35GSAnNr8IyqSbg8kA8ciRrQJshGm0oqwlCzKr50",true),
      s("sticker-82","ESL Skull (Foil)","Katowice 2014","classified",776.82,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVLmkZrmwjFQ-v6iV6F-LM-VAW6cj-wl5bc5GnjjxUoh62-Gmd2rI3mSblMhWMcmTbQMsEW4kNLgMu-34gDAy9USDQz6ROg",true)
    ]
  },
  {"id":"cap_kato14_chal","name":"Капсула Претендентов | Катовице 2014","subtitle":"Легенда CS • Reason Gaming & Vox Eminor Holo","category":"capsules","price":165,"accentColor":"#F59E0B","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk5PO6OvQ8dM_DXynCkLkv6LJrSSrilkRw4GzSw9-qIHmSPFNxWJR2TeIMt0HsltXgYrzq-UWA3Meo50Y4"),
    "items": [
      s("sticker-48","3DMAX","Katowice 2014","milspec",56.32,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVKimpvh5WxZuab6MfY1cPPKXj7JmegmtLZtGXyyxhlz6mrUztv7cSifPwUpXpR4W6dU5eKAn36h",true),
      s("sticker-59","iBUYPOWER","Katowice 2014","milspec",62.46,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL4nIP57S1M6uDgOaA0cKjFD2bDl-8hsbZqTnDrlEsj5mzWn9uhdi7FalImXMF4F7UKuw74zIM3Z7kOtQ",true),
      s("sticker-65","mousesports","Katowice 2014","milspec",31.92,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL8kYPz-DFL4OC6e-o5JKTCXGaSwLxzsrc_Gi-xxxsktmXUyNf6dCqXaVQlDMN5Q-JbsRLrjJS5YIc8_oYw",true),
      s("sticker-67","Clan-Mystik","Katowice 2014","milspec",56.3,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL8h4X09CkVu6f2bPE8ePTGVz_Fxbku4LQ8Hiyyw00ktm-GwoygJy2ebA4jCscmEPlK7Efyj5HByQ",true),
      s("sticker-69","Natus Vincere","Katowice 2014","milspec",64.33,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL_n4DpsyNZuKD2MPc9I6iQVmaWl74n6bg6HC23zB4k5D7UzYv7dCiWbgEiWcRuBbldh118oDg",true),
      s("sticker-73","Reason Gaming","Katowice 2014","milspec",50.27,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVLjm5fz8iwVt6D8bPU7dKGQXTbHkLt05LE7HnDrwkxy5zuDydqhcXOVaQMmDJV3Q_lK7EchjsH25A",true),
      s("sticker-77","Virtus.Pro","Katowice 2014","milspec",56.86,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVLnl4T06DFL_f3gbfc1JfLFXjPAxewl5rg8HHixwB5wt2jXzIyocyiXPAQoApp2F7EK5A74zIM2Mq5r8w",true),
      s("sticker-79","Vox Eminor","Katowice 2014","milspec",69.02,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVLnkY7l8CtV4ODgMKE-cvTLC2XDkusn4-Q_TnnmkU9w42XSyd79cX3DZgMkCMZxFOADsw74zIMX7bakIw",true),
      s("sticker-49","3DMAX (Holo)","Katowice 2014","restricted",138.03,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVKimpvh5R1T4P6hJvxvI6HKD2KWletzs7drHyrqwEx-sjmAmdz4cy_CZlcpDMchELQOt0Om0oqw6utmJzg",true),
      s("sticker-60","iBUYPOWER (Holo)","Katowice 2014","restricted",111.62,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL4nIP57S1M6uCRYKthL77KW2XAkr91tLQ-S33iwhly62jcn9yrcy2fOlBxA5JyRuVf40W7xoC2Kaq8sK3FB_Eg",true),
      s("sticker-66","mousesports (Holo)","Katowice 2014","restricted",133.85,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL8kYPz-DFL4OC6e5tlL_ycQGTHwu0ktrQ6TSu2wEoi4Gvdydz_dy2RO1dyAsR1E-BetBa8w9zgZbn8p1uJ-rzeGxs",true),
      s("sticker-68","Clan-Mystik (Holo)","Katowice 2014","restricted",174.35,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL8h4X09Clk5_2iZ-o1cfaSXWLFlesisblqGS2wx0l0sW7Rntj8J3nGOAIgCpZ4EbIOsEG5jJS5YDNvjHnm",true),
      s("sticker-70","Natus Vincere (Holo)","Katowice 2014","restricted",155,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL_n4DpwipU4_3gav08c6jBWzHElbck5ONvGX2yxU8m6mnXwtetcnOfOgMiCJclRbIMsg74zIPTbZA4cw",true),
      s("sticker-74","Reason Gaming (Holo)","Katowice 2014","restricted",117.1,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVLjm5fz8ixk5_2iZ-o-I6PDX2HFxbsmtORsG3jgxEQm6mWHm9r9In_EbVV0DZciELULsRO-jJS5YC3mluwy",true),
      s("sticker-78","Virtus.Pro (Holo)","Katowice 2014","restricted",226.15,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVLnl4T06DFL_f2RYKthL77DD2SWleou4OU8HHDgzRsm5W6Dz9qteXuSOlIlDpR2F7Rb5kTtwdPmKaq8sGSbxVk8",true),
      s("sticker-80","Vox Eminor (Holo)","Katowice 2014","restricted",166.33,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVLnkY7l8CtV4OCRYKthL76WWWXIxewvs-c5SirkwE9_4TzTz9j4JCieZgMhCZEhE7IOuxm_k9S0Kaq8sAIJzkJO",true),
      s("sticker-81","ESL Wolf (Foil)","Katowice 2014","classified",761.26,"@Jai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVLmkZrmwidI482oZ61hbqTKCjCUk7Zw5uA7F3-3lBly4juEyNmvdirDawVzDZIjEeEKsxmwxoD5d7S1SQWYyHI",true)
    ]
  },
  {"id":"souv_cobble","name":"Сувенирный набор «Cobblestone»","subtitle":"Сувенирный AWP | Dragon Lore и M4A1-S Рыцарь","category":"souvenir","price":55,"accentColor":"#EAB308","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bjx-VW2FSLhjJnt8h1f6s2taqZhJb7GCmXDwLp057U8SSiwkxt1tz_Sw46qJC6RZgcpXJJwQrVf5xe7lIfnKaq8sA1qTP9C"),
    "items": [
      s("skin-85ab23cdb7f5","P90","Storm","milspec",17.78,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7i1k_OaheqlrMv-dGlicyOl-pK8-HSixlhh2sG_TydaveS7EZw91A5ByEeIJ4Rm6kNfgMbzr7wGMgolA02yg2VYIqRCy"),
      s("skin-ed03b471eb9e","SCAR-20","Storm","milspec",17.56,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk_P2Re7BiMv2VHGie1dF6ueZhW2fjxBgl5jyAntytc3ifO1AjXpslRLFft0PtxoXkMuKwslaPg49MmHj6kGoXuUn7n6Ef"),
      s("skin-ef6a97d9de03","Dual Berettas","Briar","milspec",10.82,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1T9s24YapoM8-fB2CY1aAn4rlsTnzhxxhx5TuHwt76cXuXbVApApV0TLJctxm9kd3vZL-35wTWlcsbmthIan4W"),
      s("skin-747c96cb8106","MAC-10","Indigo","milspec",12.23,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1I4M2nZqBkJ_-sD2mU_ulktfhWQyC0nQlptT_VztavJXyfa1QgW5J0FuMCtBLtw4ayMe_g5VPZg49MzCX423sf6TErvbjb2X3Wdg"),
      s("skin-f4c898d70fd2","UMP-45","Indigo","milspec",9.04,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1I4M2nZqBkJ_-sD2mU_ulktfhWQyC0nQlp4WjTyN78In-Wb1QgDcNzRLUI5ka4wdfjPruxswbdgopGzHj73yNLvzErvbhz6ja6HQ"),
      s("skin-175c48cc6d6b","MAG-7","Silver","milspec",21.93,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiNV0OGnZLJoMs-fB2CY1aAm5Lc7SSyxl0t1sj7Wn9ipdXuRZwMkD5NzRbVftkPsx9LvZOjjsgyMlcsbmlF3IVC_"),
      s("skin-5b9f03255b9d","Nova","Green Apple","milspec",12.78,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwjFU0PW8baFjH_yaCW-Ej7xz5eNtTXHrw0l-4G3SnN78Jy-faQVxCZV3R7FesEHsm9S1Ybm07gXAy9USzA6LpwE"),
      s("skin-fffd8c3e6f34","Sawed-Off","Rust Coat","milspec",10.93,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2veZt-NPWWAlicyOl-pK87TC2ylB534jiGzNv6dCjFPQR2XpJ4RuQPtRbqx9znYujitFPZ3oJC02yg2T-LVFiK"),
      s("skin-94f35854b787","USP-S","Royal Blue","milspec",21.72,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSKOmsB2mUyOl5j_R6Xxa_nBovp3OAzNv6d3yVbVBxAsNzReNZuxK8kIHnNurj4wTaiNlBnH6q3CMYv3po_a9cBsy26Gzj"),
      s("skin-994f496c1e81","P2000","Chainmail","milspec",13.52,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0POjV6dlIfmdA2aZzdF6ueZhW2fqxU4k6znTn434JHnEPA9yWcR2TLIJ4UK4w9e2Nbjr4QbX2owXnyr7kGoXuSuECNR4"),
      s("skin-bb430e7deeba","MP9","Dark Age","milspec",20.54,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_C9k4ve6aahSKf6fD36vzedxuPUnG3uwxxkk6jnWmdqsJy-UbFV0DZV4FLRctUXqwIWyNb_r5Qbdg4lGzzK-0H2q-xqNvQ"),
      s("skin-eb5c3a076134","CZ75-Auto","Chalice","restricted",64.86,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s28Z71sLM-fB2CY1aBzsrQ5HnyyzBh25jzcyI3_dyqXaFcmC8ByReBZuxi-lYXlMei05FSPlcsbmsOlfuvI"),
      s("skin-dcb95b6f2246","Desert Eagle","Hand Cannon","restricted",74.24,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uORYKVjJPOSAGmfz9F6ueZhW2eww0t-6mrUn977cinDZ1IgD8YiTeUIthjpk9zkYem04wTXj4oRnCv7kGoXuTIzWSlA"),
      s("skin-7678cc4af1fb","M4A1-S","Knight","classified",270.94,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GeMWqV1e96o95lRi67gVNwsWTQzdn4JHyQZ1QhWMZyQe5YsxK-ktPnZOiwtVDcjo9ExS393ytB8G81tGXpYjdX"),
      s("skin-4f8d99d09ded","AWP","Dragon Lore","covert",665.62,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk4veqYaF7IfysCnWRxuF4j-B-Xxa_nBovp3Pdwtj9cC_GaAd0DZdwQu9fuhS4kNy0NePntVTbjYpCyyT_3CgY5i9j_a9cBkcCWUKV")
    ]
  },
  {"id":"souv_mirage24","name":"Сувенирный набор «Mirage 2024»","subtitle":"Сувенирный AWP | Пустынная гидра","category":"souvenir","price":6.5,"accentColor":"#F97316","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj3-lG1EU-loYby8i9U0ParV6lkMvGUCynAxLxw5rQ-TnywwUQj5GnVnNj9dCjFb1cjWZJ1TO4Itxm6ldbvY--x-UWA3At843U9"),
    "items": [
      s("skin-68baaaf8fc40","P250","Drought","milspec",1.04,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFL0Pare6F_NM-ABXKczf1JtOB-QRa_nBovp3PVyd6tIijBOAQhXsAlE-ECsxC9x9flMuPn5wfZ2YNNnn32iy4d53pi_a9cBo6jFyfx"),
      s("skin-9ee3bd1dc597","PP-Bizon","Anolis","milspec",1.21,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1T9s2iYb5sMvSsHWyZz9F6ueZhW2e2xkpytWjTydaqeHKXbAJyApN4QuUOtkG8wNTiMLm3tAKM2Y9Hny75kGoXub_Drj6P"),
      s("skin-3033f9235a6c","MAG-7","Navy Sheen","milspec",0.93,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiNW0Pyvfr1SM_iaAGKvzedxuPUnHyu2lh8j5zuBzYv4Iy3FZwJzCJMlQbEL5hO-ltPnP7zmswHY39hAxTK-0H11955Myw"),
      s("skin-62d86c75d355","MAC-10","Sienna Damask","milspec",1.33,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1I_82jYbZsJ_WsCGuf1utko959TieMmRQguynLzNv4J32XaVdzX8dyTOcJsxS_x4CxYeKz5QCKjo0RzCv7iC9I5nlv4_FCD_Ti47lJig"),
      s("skin-2471c784d52a","SSG 08","Prey","milspec",1.11,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_820baZ_IfOSA1iCxOpJvOhuRz39zBwmt2mAyI6rInrGaVd1X5N0Re8OshO5mtbvMr7q5wGIg95BmSX5ijQJsHiun1hzCg"),
      s("skin-9ae29431fe9d","Dual Berettas","Drift Wood","milspec",1.44,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I_82qer1SN_-cClicyOl-pK87GXGwlkxx5TnRnon4IHvCPAIiW8dxQ7Nc50K6l4XhY-m04QLdjo9N02yg2cWHvD9Z"),
      s("skin-05b6323df391","FAMAS","CaliCamo","milspec",2.47,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1T9s24abZkI_GeAViUxP1zovVWQyC0nQlp4WXRn9qqI3uVblQgApJzELVb5BHqlYC1MePr71TXi91AzCz33S9KujErvbjpBPXbmw"),
      s("skin-6dbbf1e46f10","CZ75-Auto","Midnight Palm","milspec",2.26,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1I_82-aahgH_6aCW-E_uJ_t-l9ASiwl0lw5z_Unt_9IHqRbwV1X5QmFuJZtxi-l9HuML7htgGN3t1NzSjgznQe0h5WimA"),
      s("skin-f3a4c195cc1e","P90","Verdant Growth","milspec",1.02,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7jJk4v28Z5t5JeiHB2uV_ulkteRncD-6mxgYvzSCkpu3eXqUaFMkDZciEeZesxG4w4fgZe3g51HfiY4RmS33jCNMvXpst-gFAr1lpPPtRxOxww"),
      s("skin-08730cd85d09","USP-S","Purple DDPAT","milspec",1.98,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSIf2sCmOAwPpJoPR7XyW2qhEutDWR1N-rcHPBPFMiDZUkF-9Z4ETtxtDkYu3js1ffg94Tnn2o3yMavH0957ocEf1yWMwziKM"),
      s("skin-f9bef4ddaca3","MP9","Music Box","milspec",2.6,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_C9k4vu8aaNoH_afAXCV0_1JveR9TiW6liIrujqNjsGtcCmeOw8gAptyFLVb4BaxmtGyML_n5QXW2owUm3j5hi4dvHlr57sET-N7rSSys4ef"),
      s("skin-a67615da8679","M249","Humidor","milspec",0.99,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wjFL0P-heqtSI_GBGG6extF0pfNnWxa_nBovp3OGnomhc3-ROFInDJclReQOtkS_xNO0MLuwtVCL3Y9DxSqr3y9Lunxq_a9cBnmfuyfW"),
      s("skin-7f4d0f478610","SG 553","Desert Blossom","milspec",1.97,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1a7s2qbbdoMuSsDGufzuNJsvNgSCGnqhEutDWR1N_8JXPBagZ0WZUiRu4PukaxxNDjNb_mtQCPiYwRyymt2yhIuyc46-kcEf1yx7sEwjI"),
      s("skin-bd7cf4e7165b","XM1014","Elegant Vines","restricted",5.96,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7v-RZat_L8-HC3-EyOJzj-N7Ri67gSIrujqNjsGqJX3BagJxDcFwROJbtkLpltHlNOPi4AyLjN8UxX33hypK6Hw_se0GT-N7rUzICquq"),
      s("skin-838f75720b22","Glock-18","Pink DDPAT","restricted",6.59,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1T9s2qbLRsNM-DB2mb_uJ_t-l9ASi2lBgjsmjSm4ugeX6WO1AoCsElFuEIuhC6xta2Zbmw5gCMjtlAni3gznQeU26CORw"),
      s("skin-a848a7d8862e","AUG","Sand Storm","restricted",5.8,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV7dsLvSsHXOf0-NJvOhuRz39kxtzt2jcyNqsdy2TawElApolF7Zf50bsl9fvZuq05waMi44XyX3-2zQJsHjlDs_LaQ"),
      s("skin-169fc42e8d8a","MP5-SD","Oxide Oasis","classified",28.36,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePFSLvWcAFiWzet9pOB7QRa_nBovp3OAmYr_cnLFOlN0A5d4Qu4KtRi6lYG2Mr7n4QCLg48Tm3_-3yxOvSdj_a9cBsgSaNGx"),
      s("skin-4d9b6a2f7a10","Desert Eagle","Fennec Fox","classified",17.67,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6OGRbKFsJ_yWMWGVz-Bzs95lRi67gVN14GvRyt77cnKfagRyXsMiTeUNtRO5kYWyYr7i4lfZgoIUzX722CpO8G81tMpbNfMB")
    ]
  },
  {"id":"souv_ancient24","name":"Сувенирный набор «Ancient 2024»","subtitle":"Сувенирный M4A1-S | Welcome to the Jungle","category":"souvenir","price":5.9,"accentColor":"#10B981","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj3-lG1EU-loYby8i9U0ParV6VjI_mWAHPew-1w5-RvTC3lwUoj4G2AyougcirDbwMgDpAlQrIN4EPukNzlYuvg7hue1dxsvyYF4A"),
    "items": [
      s("skin-1350d58db761","P90","Ancient Earth","milspec",1.4,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_CNk7vytYaFjNM-RHGiHz9F6ueZhW2e1lBl3sDyHw9uudXiWO1J1A5RzTOcI5hLqxIbnNLnhsgWN2d1GzHn9kGoXua3B7-6C"),
      s("skin-a1cba4e82b7b","SG 553","Lush Ruins","milspec",1.46,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1a7s28fa1jM8-UHGKVz9F6ueZhW2fmkU4jtTzSw42pc3LEOgJ2ApZ4FORZ50XtxoXiPr-z5FDcit9ExXqvkGoXubXo--Tz"),
      s("skin-119597cef326","Nova","Army Sheen","milspec",2.11,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiNW0PO8Zb1SM_iaAGKvzedxuPUnGXu1xEkktz-Dyd-oJH6ebwIpD5F5ReEJt0W-x4WxZOi0swCM34lNxDK-0H27DLwAVA"),
      s("skin-18c09d09603b","SSG 08","Jungle Dashed","milspec",1.58,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_826abRoH-ObAXWE_uRjvuZlSha_nBovp3PUz9-pcnuXPQMpCMZwQ-UM5xixmtGxN-7n4wWKiN5DySivhyxJ5ixj_a9cBvFEfbOR"),
      s("skin-2367a9c28a7f","R8 Revolver","Night","milspec",0.81,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c29Z5tjKfebGlicyOl-pK9oGCjkk0sktWyAntv6cSrDaAdzAsFxQuFZtRnqwNPlP7jg5QHd39oU02yg2UcfjkJE"),
      s("skin-47cc7c043d3d","P2000","Panther Camo","milspec",1.33,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0POjV6ZhIfOYMXeRz_p-tfNWQyC0nQlp522Hm9ivdHjEOg4jC5t3TeAJ5xCwlYHlMuzmsQGIj99BzST9h39K6zErvbhYhH-Bzg"),
      s("skin-bb21a91fe207","MP7","Tall Grass","milspec",1.92,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Ttk6-C3f6tiJM-UHGKVz9F6ueZhW2frxxlx4jnQw4yuJ3yfPQ4hDpd5QOVZsUa5l9XiNb6w5laPjosWyC6qkGoXuWq2Rgm4"),
      s("skin-c9fe23913c83","G3SG1","Ancient Ritual","milspec",1.09,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1a4s2vZqdkJf6HMXCZz-tJvOhuRz39zE5ysWjSyterJX-VZ1UgX8EhTeVf5EOxlN3jYemwsw3WjtgQzi7-2zQJsHjSk9PLGw"),
      s("skin-c34dd8de2279","CZ75-Auto","Silver","milspec",1.54,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4c29Yah7JeKsAm6Xyfo457c5Gn7nwEV-6jvRy96rcHPEPwcpDcZ4RrQItxHsk9bnMOrg5QKPi5UFk3v7O4lRrA"),
      s("skin-41f176a064d2","Tec-9","Blast From the Past","milspec",2.27,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wipC0POga61oLuSsGm6cxP1JoORoTCGMmRQguynLm4qpJ3PDaQ9zXpIjQ-AJ4xawlNOzMrjktVPZ349AmS323Xga534-tvFCD_QT7Lx_Ug"),
      s("skin-07b30f648b35","AUG","Carved Jade","milspec",1.02,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_C9k5fOqbZthKfebGimWkLlytrI5TXrlwBx-sGyGw9-gcC-fZgAhCpRwQbRbtxe4kdSxP7vm-UWA3MgZU-ku"),
      s("skin-4f5a5aa33496","Galil AR","Dusk Ruins","milspec",2.35,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V7Z4Kf6AMXWVxdF6ueZhW2fnlBkl427dno2rcXLBagYjDMN0Qu8Ls0a9wIK0PrvhtlHYgogTyy_5kGoXuQFMiuDz"),
      s("skin-2d48a6eb741e","FAMAS","Dark Water","milspec",2.45,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a4s20baZ_Ic-XD3Wb_uJ_t-l9ASywkUsmsjzdmdiqIiqXaQ4oDJF0RuNZukO-ltflNu_mslffg9gTnC3gznQeYZiQwTg"),
      s("skin-e95b5ddb7a37","XM1014","Ancient Lore","restricted",8.04,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7v-RaapuKfWdGliHwPx7j-1gSCGn204k626ByIqteX-TbAQjCcAhRbFcsUK5ktbhYb_j5VePi4JMnyX4in5XrnE8pNPbCik"),
      s("skin-b21f4fbf965a","MAC-10","Gold Brick","restricted",4.21,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a4s2pZ6hpH_KBB2Sb_uJ_t-l9AX2wwhl35jzRw4yodymWO1R0X5V0FrRc4Bi-m4DuY-2xsgzY39oRmSTgznQe6Q1Q_KE"),
      s("skin-c682eedb501e","USP-S","Ancient Visions","restricted",3.88,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSM-CsD2mTyOt4pN5rXSC0nQkYvzSCkpu3eHiSOAB0DsMkTOcJtRjtwNG1ZOvq4wDe2t1AzCuojy1JvSpp4ewKVr1lpPOm90TY1A"),
      s("skin-1dd39fb89c94","P90","Run and Hide","classified",25.65,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_jdk5fOpfaV_H-DKXlicyOl-pK85H36xlEsmtT_SmN2geSqVOAMkCJpwQOQP5BOxlNHiYruwtgXajI0X02yg2YhNEJOA"),
      s("skin-2faa35fd1c44","AK-47","Panthera onca","classified",15.97,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV65sJ-WSHFicyOl-pK9sSS-2wEV25z_Qw4mqcn3EOgclCpJ3TbRctELtm9HmNLix4wHc3o5H02yg2Q50xEQx")
    ]
  },
  {"id":"souv_anubis24","name":"Сувенирный набор «Anubis 2024»","subtitle":"Сувенирный M4A4 | Глаз Гора (Eye of Horus)","category":"souvenir","price":6.2,"accentColor":"#F59E0B","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj3-lG1EU-loYby8i9U0ParV6VjNfKaHSmUkLd36bkxHSrqxBsmtT6EzIn6cCjDOw4nX8F1FOJc4xLsk4HuN-uz-UWA3HCx5SQN"),
    "items": [
      s("skin-e8e1c44874c0","R8 Revolver","Inlay","milspec",2.43,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2pe5t_JeacAnGV09F3s-BnWyGmhiIloTKLgIrGLSLANkI-A5cjFOBc5ES_m921Ybux5gXeioMQzy2ojHlMuChi4bxQVfFzr6OEjRaBb-Nm3twhXg"),
      s("skin-eed9c3fe4b9d","M249","Submerged","milspec",1.41,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiFO0P_8PP1SM_OSHGaS_uJ_t-l9AXmyxkt0t2yDyYurci6TPQcgCcckTOMLsxCwk9PiM7i041Tago1FnH7gznQeMmXICmk"),
      s("skin-e86e226e8ee3","XM1014","Hieroglyph","milspec",2.27,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7OeRcKk8cKHHMXeYwPx3v-lWQyC0nQlpsj7UwoyveCqROwRyC5cjQO8N5kSxlNKzN-O24QGL345BnniriXxP6jErvbhMqiQO1A"),
      s("skin-7749a115c5c1","MP7","Sunbaked","milspec",2.53,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf-jFk4uL5V7d5Mv-dC1icyOl-pK84S3C1lx9w6mndytn8JymTZ1QoC5AiR-AMukbqkoXvZu2x5VfW2o9F02yg2esX37bl"),
      s("skin-a169fd0b8b16","AUG","Snake Pit","milspec",1.64,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk6-egbZt5MvGDMWuZxuZi_rg4S3rqwxgltjyEy9r_cH7GbFBxXpd2RbEPukLtxoXgNOLg7gXe2thbjXKpZivzOLA"),
      s("skin-41f71f1a5f50","M4A1-S","Mud-Spec","milspec",0.79,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj-xgQzqjkB4YvzSCkpu3I3rGP1JxDJpwEbEJ40G6mtfjPuqx7wTf3d5AzHn5hy9AuH5p4u9QBb1lpPNjrdVvDA"),
      s("skin-9a0273275e44","SSG 08","Azure Glyph","milspec",1.32,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1c_M29e6M9eM-SAHKSyP1JvOhuRz39xERwsT_Sn4r6eHmeOAAlCZBxFrEP4BbpxtyxYbji7g3dg4lAnH372jQJsHi7hX5I-w"),
      s("skin-808bfc3a4f41","USP-S","Desert Tactical","milspec",1.92,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSJ-OsG3SA0tFiseJ9RiqymSIksjCKpYPwJiPTcARxX5VzROcIuhLtl9HkMum25AbZ2YtDzCT5234b6Ho-67lRA6Bw_fDJz1aWLNvRpDs"),
      s("skin-eba9dcbab8fc","MAC-10","Echoing Sands","milspec",2.57,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-ADWaCwOxJvOhuRz39xRlx5GmEyIn9cSjCOg52C8B0TLEOtxa_xNziMu3ktFOP2o1HznqqijQJsHgtnfG5bw"),
      s("skin-29609fc133b0","Tec-9","Mummy's Rot","milspec",2.41,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SLeWeA36vzedxuPUnS3_jlEUm5muAzd6qcXiRaw9yWZciRuQItUHpxNXnP--27lGL2d5CyzK-0H1vVdbZoA"),
      s("skin-80cb7aad6895","AK-47","Steel Delta","milspec",1.22,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSM-SBAWmV_uJ_t-l9AXqyk0hy5GWEyduhdC2TPAEjDptzQbRf5EHrmoWyZu22sQLciokQyyzgznQesAEGx_A"),
      s("skin-05f333baf59c","AWP","Black Nile","milspec",1.64,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V7d5Mv-dC1icyOl-pK89Gyvhlhsit2-BwoyrICmWPQcmDpEkQOdeskOxwNKzN7vm4VeP2oMR02yg2Z2CmmVC"),
      s("skin-7c46ff3046d0","MAG-7","Copper Coated","milspec",1.43,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiVI0P-vb_NSJ_-cAmOvzedxuPUnHXDilhh1sGzQy4yscXPCbAcgXpNwE-UJuhjqkNW0Zrm05VDdjIoXyDK-0H3aMMdvcg"),
      s("skin-9967f102e7ca","Glock-18","Ramese's Reach","restricted",7.15,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-BD2qKxP1JvOhuRz39kUkk42TcztmuIHOVb1cpCcZ1EeBY5BLtkIDgNOqwtALXjI0Un3r4jDQJsHidobtL7w"),
      s("skin-0fbe9304a4d2","Nova","Sobek's Bite","restricted",8.19,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiVI0PyhfqVSM_-RC2yvzedxuPUnGX22wR9y5jvQz436IH_BPQ4nW8FwFuUDskO_lt3gMu_i71GNiNkWyjK-0H21VCFkHA"),
      s("skin-2c6b76cc25a1","P90","ScaraB Rush","restricted",8.05,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_jdk_6v-V7duIeKSDFifx9FhufJtQCSMmRQguynLmYmrdCnGPAUkD5BxQuYC5hO8wdK0Y-_nsgbciNhMyn6v238cuy1jsPFCD_S-VwnSrw"),
      s("skin-3c42ea1dd98c","FAMAS","Waters of Nephthys","classified",25.04,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1Y-s2oaalsM8-bAWuf_uF1teBncCW6khUz_W3WmYv_JSmSZgZ0WJRwEeRbtUS5kIKyZejmsQHciN5AxHj8intK6il1o7FV74niokA"),
      s("skin-d9c0a296a5e5","P250","Apep's Curse","classified",16.96,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiVI0OL8PfRSIeCWHlicyOl-pK87HCjkxR9ztj-Dzdv8di2TPFchDptyTbEIthTsl9znY77r5Qzc2YwR02yg2XoGglyv")
    ]
  },
  {"id":"souv_nuke24","name":"Сувенирный набор «Nuke 2024»","subtitle":"Радиационная коллекция с золотыми стикерами","category":"souvenir","price":4.8,"accentColor":"#38BDF8","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj3-lG1EU-loYby8i9U0ParV6p4K_XdXmHElrogtLkxGXHgl0lw62-EyIyhcyiTZwUlXJV1TeUP40HpxNG0PvSiuVK0aQmXQA"),
    "items": [
      s("skin-64f9b04b2558","PP-Bizon","Facility Sketch","milspec",1.32,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1T9s2sZLFoMOKaAHOv1uZ_pORWQyC0nQlptTjWyImvJSnBOgcjCcF2EbMDskLploCzZO-0swfZithGnCWq3X5P6jErvbhS6IbYJA"),
      s("skin-6b0b591466f0","P250","Facility Draft","milspec",1.58,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0PCifaF9MvmdGliCxOpJvOhuRz39l05wt2XRzNr7dHjCalBxXschRucD4xnpwIfhN7ngtVTe2tlCyi_5hzQJsHgA1f7ZYg"),
      s("skin-b7561c6d5220","UMP-45","Facility Dark","milspec",0.66,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1T9s2sZLFoMOKaAHOvw-JjtfNsSxa_nBovp3PVnN_7JyjDOgciWZRyQudf5hjrwYHnNOjl4gKN2YtNmXj5iS5Lvys5_a9cBlkwYg2r"),
      s("skin-cf50b5bef61d","Five-SeveN","Coolant","milspec",1.08,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRYL1SJOWQGnSvxvxzte9WQyC0nQlp5m_cmNqueH7EbQAiXpN0FO5YtBK_x4XgMrjmswON2osQzn77iipJ6zErvbgVYFr6QQ"),
      s("skin-46cff8fcae00","Nova","Mandrel","milspec",0.69,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwipC0Pa7a7B-H_eBC36vzedxuPUnS3DqzRsk4mvUwt2gcXLFPwZyDZZ0R-MM5xa4lNXvNurhsg2Kg94QxTK-0H0uEiuY9A"),
      s("skin-810cb4b6d950","M4A4","Mainframe","milspec",1.76,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiNW0PGneqd4KeSRAWaCxdFlue1_SjuMmRQguynLmIyoI3KROlcgX5RxQrQMt0O6lIfkPuPi5AKKi9pEzX773XsYuHlj4_FCD_Ts_y5QsA"),
      s("skin-1b2de32446fe","MP7","Motherboard","milspec",0.96,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_C9k7Pu8a7FkNPKcD3WU_ulkteRncCW6khUz_T7Wm9-vJHmWbAVzDJZzFuMP5hKwxIDiP7jlsQGI2Y9CzSr_j3tJ6i51o7FV2fbsGVQ"),
      s("skin-09caec0af065","Negev","Bulkhead","milspec",1.85,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1T9s2qfad5M8-KC2uczvlJvOhuRz39kB50sWmBw4moJXnGPFd1WJMjFLFZs0S9lNGxNuLg7weLg91BzCj73TQJsHg2tHPevg"),
      s("skin-373e7e49f479","Galil AR","Cold Fusion","milspec",1.43,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V6p4I_yWD3Wv0uVjvO16cCiigBwYvzSCkpu3cy6UbQIgC5QkReYKsEHsmtS2Yb_itA3Y2INNyXj6jHxK7Ho_selRA71lpPOhjRfzhg"),
      s("skin-ddc69b0796bd","P90","Facility Negative","milspec",1.36,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf9Ttk7f67bbR_Kf6HMWaB1O9JvOhuRz39zE5_tmvSzNugeXyUOAMlW5pyQOcN4Re-xte0Nb_n4wXf2INNynj_jzQJsHhMSbHang"),
      s("skin-1a3115020d99","MP5-SD","Co-Processor","milspec",0.74,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1a4s2tYbZuNfmHDGiR0-pJsfB8Tha_nBovp3PQm9_7eHrFP1UgDJUlEbMNtxPrkd2xMLmw5AXf3opFmy-qiXgbvHk5_a9cBm-j3VYi"),
      s("skin-4609f8421163","P250","Exchanger","milspec",1.83,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0Pa7a7B-H_KfG2KvzedxuPUnHnDkzRhz42rUnoqvcXyfPA4lDZVxEbReskS7lteyZLvq4FCKgo1DxTK-0H1XkoQg2Q"),
      s("skin-9e9b9cd050d5","AWP","Acheron","milspec",1.94,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk4eetZKFsMs-ABXKczf1JouRtTSWmkCIrujqNjsH4eC-ROFMkDccjR7EDsBCxlN2xZu7jtlaNj4pMxSr8hiIc53tt67kHT-N7rafi4HxI"),
      s("skin-8b56130194c8","AUG","Random Access","restricted",5.85,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_C9k7Pu8a7FkNPKcD3WU_uFkse9uSha_nBovp3PcnImuIi2RbA8iD5B5FLYNtULqwdLuYbvg4w2Ng9hAziSvjnhBv31v_a9cBkz61Qws"),
      s("skin-7444d53b5e17","MAG-7","Core Breach","restricted",6.37,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wipC0Py7a6hoIeKsBmiEzvx3vuZscCW6khUz_WzdnoyvIHvGPFJzD8B0QrINshPtw9fmYunrsw2PiNlEnC_5iy5L5y11o7FVg__4LKQ"),
      s("skin-96e7c9f4d6b6","Glock-18","Nuclear Garden","restricted",5.42,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2gfadhJfGBMXSb1OJ6o95uXSy2myIrujqNjsGpd3LCagQiWJVzEOdfu0PrkYe1MLnqtQzW34xDmH2oiiIc7i5p4u5RT-N7rQEHvAcX"),
      s("skin-c7e68ecd7321","Tec-9","Remote Control","classified",21.42,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiVI0Oara_1SJf6FAX6vzedxuPUnGSvrlhxw62zXn92sJynGOFcnA5J5EeIPsRm5l93mM-6w7gzW2olEzzK-0H1xr8Niww"),
      s("skin-88c0ba610062","M4A1-S","Control Panel","classified",13.58,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj-55SjuygRI1jDGMnYftbynDbQBzDcR3ROMI40Hpmt3kP-y271OK3tpFmy7633hJ73xit70GBPE7uvqArjH2yek")
    ]
  },
  {"id":"souv_overpass24","name":"Сувенирный набор «Overpass 2024»","subtitle":"Сувенирный M4A1-S | Шедевр и AWP Розовый камуфляж","category":"souvenir","price":7.2,"accentColor":"#A855F7","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj3-lG1EU-loYby8i9U0ParV6t7JeKDD3SDj-wjteAxH3zrwksksmjUyoysJ36fZw4kC5NzFOILsRG5kta2NevjslPAy9USrECBPak"),
    "items": [
      s("skin-524093d4fd9e","M249","Contrast Spray","milspec",2.96,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wjFL0OG-eqV0H_yaCW-Ej-shsbBtS3q2wkUitWzUz9b_c3vEZ1UhD5R4F-QL40a8m4HuZbnitlfAy9USVV6qaxA"),
      s("skin-ca46865ea5de","MAG-7","Storm","milspec",1.33,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wjFU0OG6Z7ZgJuKcAHOvzedxuPUnS3_iwk926m6EnIyvIn3DbQF0X5UjRbJfthewktK2MLzq4ATcgoJCxTK-0H2wBd1PlQ"),
      s("skin-65e7edddd8b7","MP9","Storm","milspec",1.34,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f7i1k_OaheqlrMv-dGlicyOl-pK8_S3zjxRh_5mmGn9epIymQPQBxDpQlFuUJ5xa6kt2yZLjkswLY2ooT02yg2WH9Y1dp"),
      s("skin-358cc1547e49","Sawed-Off","Sage Spray","milspec",2.41,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c29eJt-MOKSF1iUxP1zovVWXCi0kCIrujqNjsH9eC_GblMpCMB4RLYJuhi8wdLiN7_qslaNjdkWyCmqjn9O5yk5sbwBT-N7rdc-87w7"),
      s("skin-ea40d0b778e0","UMP-45","Scorched","milspec",2.52,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1I_82qabR9LPWsAm6Xyfo46bMxGn-3x00m4m-HzN2sIH6SZwQpWJVwQu4MuhK5xIXiMuO24QLej5UFk3vMYylqRQ"),
      s("skin-4883733d994a","MP7","Gunsmoke","milspec",1.5,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Ttk6PeieKFjH_yaCW-Ej7d0sbI8Gyrklht04GvXy46vJ3uQbQ4nWcN5EeAI5hPtmtzjP7nktlHAy9USqCgnGlg"),
      s("skin-c97d7ecf1434","Desert Eagle","Urban DDPAT","milspec",1.85,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk5-uRbKB9IeSsG3WS_uJ_t-l9AXm2kxkk42rWn9egc36UOwYiX5N1EOVYsRLtldC0M77g5QXfiN1Fzn_gznQemk8fKYk"),
      s("skin-7da83ba004c9","Glock-18","Night","milspec",2.39,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1I4M2gYaNlNM-fB2CY1aAmtOU-S33jwEwhtWvdzIr4cHvCPwR1DZdxQrFZt0bsloLjP7jg4VGMlcsbmvNarNNc"),
      s("skin-4f77cef2d122","P2000","Grassland","milspec",1.65,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0OGhV6N_IeOAAmaexdF6ueZhW2fkzEght2zVnIz_cXrCPQEmA5IhE7FZ4BG-x4GyY-rr5wWNj4kXyi_2kGoXucFfluJI"),
      s("skin-3a57219a9579","XM1014","VariCamo Blue","milspec",1.72,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk5-uRfqV_KfOSA2ivw-Jjtd5lRi67gVN0tmTdyN-gJy2fb1AjCcFzFOYDu0btxNDkYr_k4APXg4JNxXn32n5L8G81tKBcQXWQ"),
      s("skin-993020f09ddf","SSG 08","Detour","milspec",1.26,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1T9s29e6M9eM-eD3WbxPxJvOhuRz39lxsm6m_XmdugcnOXaFMlD5ImEbQP5kW4kICyM-vj5wXc2dkUzHqoiDQJsHjAk3eMVA"),
      s("skin-11ddb95a9bd7","CZ75-Auto","Nitro","milspec",0.87,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1I4M2heqVjJ_WsD2STxOBio7NWQyC0nQlptWvXw9_7I3zCaVB1C5YkTeAIsRC8m9a1MePg5VGLiI9CnH772C9AuDErvbi4qlLcDQ"),
      s("skin-665b5d16532c","AWP","Pink DDPAT","restricted",5.59,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk6_a-abBSMPmdBVicyOl-pK9qHXC2zUpz5DiBn9arJCmXOFd0DZpxQOUDtBC6wNK0MOzl4wXWjYpG02yg2c9nQ1pb"),
      s("skin-d7d145b204a5","USP-S","Road Rash","restricted",5.55,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_v13vuV5Tjm2hxgjjDGMnYftby2UaFcmCsF1R-cLsBS4mtLmM7nmsVbfiNlHxSuriypAvytisuhQWPY7uvqAwrOwBmU"),
      s("skin-5e983b2fc436","M4A1-S","Master Piece","classified",26.12,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL87o956RiW2mx4ijDGMnYftby3FbFdyXpZxQ-AP5hi7wILkZOzg5ASNgt4WmCv833hKuntvsLxWAKE7uvqATAFok6E")
    ]
  },
  {"id":"souv_vertigo24","name":"Сувенирный набор «Vertigo 2024»","subtitle":"Коллекция Vertigo 2021 с золотыми стикерами","category":"souvenir","price":5.4,"accentColor":"#EC4899","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj3-lG1EU-loYby8i9U0ParV7JoMuSaCWjemOtysrU8H3iyx08msTnWyYr4JHOTb1MhDcEjQ-II4BC6k9C0ZuqztRue1dzI2NbPyg"),
    "items": [
      s("skin-543aa962d655","MAC-10","Strats","milspec",1.14,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1T9s24bbZ5KfecHXeCwPdJsu18Sha_nBovp3PTmIuoJ3yVa1clXMB4TbEOsBHtwdHiZO-x7gWN2d8XyS_4i3xM53k4_a9cBrlyT3NZ"),
      s("skin-fb1c2c16ef09","FAMAS","Faulty Wiring","milspec",1.07,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a7s25YbZkLvesF2KczeFhj-1gSCGn20lw5GuBwov8InnFOgdyCMByROUNtRe9ltzuZenrtQTdi95Cmy73jHlXrnE8IJYzfbc"),
      s("skin-f0c79680cd26","XM1014","Blue Tire","milspec",1.65,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk_OKRfK1_Jc-HHGKRxdF0vPRscCW6khUz_T7Vydn7dS6UZ1ciD8YhE7Je4Rm-l4bjN-mxtVaPi9lMxSqqjy9B7Xx1o7FVHG_KYuo"),
      s("skin-56ddbaec8869","CZ75-Auto","Framework","milspec",1.15,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1T9s24bbZ5KfecB2uc1P1_v-9WQyC0nQlp4WrQn42pIiqTZlQpXMByE-8Mu0Huxte0Y-zl41Pci4lFxST_33lA6TErvbh9z0zyoQ"),
      s("skin-8ec2f49d34a9","Dual Berettas","Oil Change","milspec",1.64,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I_82rZqNkLvWsCm6C1fdJvOhuRz39x0txtzuHn9j_cn6VbVMiCpJ4Q-MCuhDukYXnN-7q4wTbjIlGzij9jzQJsHgVbYzf3Q"),
      s("skin-9dde6c99ee79","Glock-18","Red Tire","milspec",1.01,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1I_826YbZoH-SBC2aU_vxztN5lRi67gVN15WzSmY36cn6RagEnD8MjTbIJ50W5m9OyN-rmtQGIgo9Fnimrhngd8G81tCm_mA6x"),
      s("skin-50ccad9f2ecc","UMP-45","Mechanism","milspec",1.14,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1a7s2rZqNkLvWsHmKCx-FkveBnTCyMmRQguynLwo2reHmVbgQkApR1FrNc50KwmoazMbyw4VHeioJBziX-hiocvH1otvFCD_SLOTiQGw"),
      s("skin-a50a85fe3050","SSG 08","Carbon Fiber","milspec",1.42,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1a4s2tabZvL_6sCG6SxPxJvOhuRz39kU9y4GvVyYygdniXaVd0DMckQ-dZtRK-moe0Murl5lHZgosUzSuv2DQJsHj4wzVBbg"),
      s("skin-95436efce4d8","PP-Bizon","Breaker Box","milspec",2.13,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1a7s25YbZkLvesAm6Xyfo45-c-SXvhzUl352rSm9eqdS3DPQBxCJMjQuBYtRDsmtDmM77i51HcjpUFk3uv8knCxA"),
      s("skin-f4a679a04e0b","AK-47","Green Laminate","milspec",1.38,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0POlPPNhIf2sCXWVxOBJvOhuRz39xUgj4WmByIuqInLCag8jWZJ3F-AL4xi6wd22Ne3rtQLZjYNEnHj92zQJsHgD_GLtVg"),
      s("skin-560a56662f2d","P90","Schematic","milspec",0.68,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf9Ttk-fe8fK1qL_eWAVicyOl-pK89HXrjwhh_sGWDz4yrcn-eZlR1XMAkFOYIshTqlIXlMbnk7lHWiIlE02yg2XF_CACM"),
      s("skin-8ef9f19f48fd","Nova","Interlock","milspec",1.49,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwipC0OSrerBkJ_-aAmuF0ud5vt5wSiW_mgoYvzSCkpu3dXOTPw5xDcQkROde4Ra6x4biZOi3tQLfiIJMyCz72ihA63tt5esFWb1lpPMXduS-Jw"),
      s("skin-58ad413e99d2","Negev","Infrastructure","milspec",1.05,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1T9s24bbZ5KfecHXeCwPdJvOhuRz39zU9w4m3RmdmqdSiSa1BxDJMiQ-4NsELqwYHgMujm5lHbg9gRxHqo2DQJsHghIlc9AQ"),
      s("skin-807c0ef26d8e","Galil AR","CAUTION!","restricted",4.34,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OG-V6NsLPmfMWSR1Pp_v-9WQyC0nQlpsmnQwoqgIHuWa1QnC5EjRuJcsRi6lNfvPuvi7wPajo9Bziys23xIujErvbiCbfcatA"),
      s("skin-4d690457f5c0","MAG-7","Prism Terrace","restricted",4.73,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wipC0PWrZ6loNOKaDViD1etmo955SiihmSIrujqNjsGrcX3GbAB2AsdyQLMOsESxktPgMOKw7wOMgt4WmSv5jS1M63lpsedRT-N7rVBJ5qCN"),
      s("skin-3f9b068b6276","P250","Digital Architect","restricted",7.76,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiNa0OSrerBkJ_-UC2ivz-t5vt5lRi67gVMk4mXQntr7JC_GPQNxApFxF7NethXqktfvMuLktAaKjd9Cyy_9iH8f8G81tGeD0jsi"),
      s("skin-7ee34568efd6","Five-SeveN","Fall Hazard","classified",25.2,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSNvWBGm6XztFwufdsXCylkBMYvzSCkpu3Ii-QbQ51XJpzQ-8PsUOwmoLvZLm3sQfb3tkTxHj-hytBv35jt7wFBL1lpPNwauo7lw"),
      s("skin-d67bf60c0699","SG 553","Hazard Pay","classified",20.07,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-QD3KEyOF4j-1gSCGn20Qj52vXw9z6c32RbAV2XpF1Q-UN4Ra7x4bkPuy0tFTciYpCxC37jC1XrnE8Zorh1bo")
    ]
  },
  {"id":"souv_inferno24","name":"Сувенирный набор «Inferno 2024»","subtitle":"Итальянская коллекция Inferno с золотом","category":"souvenir","price":4.9,"accentColor":"#EF4444","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj3-lG1EU-loYby8i9U0ParV61jJvWBAGjekL9wsudvHHnhzUkm4W2Az96vcX6UZ1N1X5RwROIKsELuwIDuN7y04xue1dxm9sz2hg"),
    "items": [
      s("skin-e12f5d57ddbd","UMP-45","Mudder","milspec",1.25,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1T9s2jZ7B5LPWXMXSRz-pJvOhuRz39wUR1sWqGm9v7IC_FPQclCJp5E-YD4Bbum9axM7_l4VCKi48Qy3793zQJsHiVhPnxlA"),
      s("skin-fd68b9a223c0","MP5-SD","Dirt Drop","milspec",0.96,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1I_826abRoH-ObAXWE_vx3vO1wcCW6khUz_W_TydqocinDPwYlW8MhQuMMs0LsxNblN7_jtVCM2I9Cz3_43Hsd7il1o7FV674h8n8"),
      s("skin-2fe73aeaa65b","MP9","Slide","milspec",0.75,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f9Ttk_OKiabB5JeLAMWuZxuZi_rg6TXrhxk9y5WmGn9etdy3BblVxCMd4Re8LskWwwde1MOq35gfX34lbjXKpcIaNgDA"),
      s("skin-5430f34eb2d8","AUG","Sweeper","milspec",1.24,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf7jJk4ve9YJt-IfaWGn6Sze91u95lRi67gVNysGXWwt78dXmVawMnC5t5EeFftkTpk9S1Zu6xswbai4MWyy-rjngb8G81tGCvNXTC"),
      s("skin-7cc934394691","MAG-7","Rust Coat","milspec",1.98,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiNK0OG6baFhH_mdCGKCz-FJvOhuRz39kElztWzRn4r9eXqWblAjXpQjRuIPuhm7k4KxYeLisgDfjtlFmSSqijQJsHiheIBpJg"),
      s("skin-505c66da36c8","PP-Bizon","Candy Apple","milspec",1.68,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1I4M28baBSLPmUBnPemO105rI6SirhzRwi6zjWzd2uJCmfaFByApMiRbNcuxC_k9TgZb_qthue1dzUHyay4A"),
      s("skin-7f9562bfa6a5","MAC-10","Calf Skin","milspec",1.88,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1c_M2jaac8cM-QBmKTyutkj-1gSCGn2x92sWXWntytdHPDOlIlWZJwR-5csBS8k4K1Nuzn4QLa398UyCiq2CxXrnE8x1-1j1w"),
      s("skin-c0b7375a375d","R8 Revolver","Nitro","milspec",0.62,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c29Z5tiMvGdCWKvwO11te99XHqMmRQguynLzo34IiiTagQoWZUlFOYOsha6ltLlPuPlsweMj4tDnyT6jy5MuytosvFCD_SeBWArcQ"),
      s("skin-8d1c8d592ffb","Glock-18","High Beam","milspec",1.86,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a7s24bbZ5KfecMWWc1OtJvOhuRz39zU5yt2vQntn9dC3Dbw8iDJQhF-IJ5xDqkdSxMr6251aMiI5BynqtiTQJsHhqpMNExQ"),
      s("skin-c0a577a1a5b2","SSG 08","Hand Brake","milspec",1.88,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1c_M29e6M9eM-QBmKTyutkj-1gSCGn2xtwtzzWmNagIH3CP1V2C5dxR7QLsES_m9PvY7nj4QPd2ohHy3r4hypXrnE8MesmkS4"),
      s("skin-ff8258cd7dac","M4A4","Converter","milspec",1.41,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwipC0OCrbJtlJeisAm6Xyfo46OAxFnHixEhztzuAyo79eCqfb1VyXpclTONctxS6w9KxMbi25Fbd2ZUFk3t2_C2R8Q"),
      s("skin-a2c7bfcb6607","USP-S","Check Engine","milspec",1.51,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSM-CsA2KDydFlsedsWzChkBkYvzSCkpu3Iy6RbQYnXJZ2F7QN4UPqkIfmNeni5laNit1Dyiz42C5JvCdo57xQA71lpPMz6iO7bg"),
      s("skin-f1e77412769d","Sawed-Off","Brake Light","milspec",1.73,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2vaZt7JeKHB2Cf_vxztN5lRi67gVMj5T_Ry9yhcS-XaFUiDpVwEe4D4Bi9lta1Yb_m5FfdiYxNmS_3j35A8G81tL5T7kT_"),
      s("skin-9cd9ae26b864","P250","Vino Primo","restricted",3.2,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiVI0OL8PfRSI_iWDWyV09F6ueZhW2eyxR9x6m3SydqqcinFPQN2CcF4F-5buhi9w9PgYem25AKNj40Wzy2rkGoXuZ9g813e"),
      s("skin-7036be1d6dd2","MP7","Fade","restricted",5.89,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_CNk6fOqbZtgMKesAm6Xyfo45LQ7Fy3rzR536j6HyYn6J3zFaAcjA5RwQ-9fs0O5m93nMe2x5QHfjZUFk3sMNd5yQw"),
      s("skin-d721d2a6a01c","AK-47","Safety Net","restricted",5.67,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0P-re6xSM_GVC3OJzvx3vuZscCW6khUz_W3RyI2tdyjFaAUlW5J5QeNc4BS_xoKzYePi4QSIgoJDynn4jS9Mvyh1o7FVeAmr1N8"),
      s("skin-248559e8b343","Dual Berettas","Twin Turbo","classified",21.28,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s2qfaVhH_WfB3OV0tFkse1lVha_nBovp3OHytv8JCnBbAF1X5MjR7UPsBfrmoHuNr7nsgbfjdlAxSr63CIfuChr_a9cBiuNovOB"),
      s("skin-a7e309c3d23a","SG 553","Integrale","classified",19.09,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-BD2uc2NF6ueZhW2e2wkV14m2DzditcnmQOA4gWcYlQOcDs0a7moLvZLiw5geP3dgRnnj2kGoXuQPBQAH6")
    ]
  },
  {"id":"souv_dust2_21","name":"Сувенирный набор «Dust II»","subtitle":"Сувенирный AK-47 | Золотая арабеска","category":"souvenir","price":16.5,"accentColor":"#FACC15","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bjn_lbkShWjzsSxwjJJ4P-hV6BoH_SGHXPCj-gg4-M4Sn-wxR9x4j6HmN-gcC_CPVIhCMB2QOZZthTqm9TuMujm5Q3Ay9USPT9sqvk"),
    "items": [
      s("skin-60c7eb4fb624","R8 Revolver","Desert Brush","milspec",5,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2mcZtvMuWABliTwON5j_VoQRa_nBovp3PUz9iodirCaQQkA5R2RbFe5kO5lt3lZuLn41DfiI9FxSn4j38f73xs_a9cBhkVhlil"),
      s("skin-d44eab1a62a7","P90","Desert DDPAT","milspec",5.83,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf9Ttk6_a-abBSJPWAC3WE_uJ_t-l9ASjgwBx3sj_Ry4qqcXKfPVdxD5J4F7MIsBnpl9OzP7jg7gLd2dpFyiXgznQeFOalmMw"),
      s("skin-8ed983542769","SG 553","Bleached","milspec",6.52,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I_82qbbdoMuSsHWyFzeJlj-1gSCGn20Uk5WTSytmqJH6XbwMoA8RyRuBY4Ea6kNC2Y-Oz7gbc3o9HxS2r2n5XrnE8gS50bog"),
      s("skin-a063f92abc42","MP7","Prey","milspec",5.62,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf7jJk9feseqVuIf2sHGKU_uJ_t-l9AXvqwUsk4DyHnIr7eHySbg8gWcckTOUCsxawk9O1ZeywsQOIg95AznjgznQehcsrUP8"),
      s("skin-8a48b06ac368","Sawed-Off","Parched","milspec",4.34,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2mcZtpJeOWHHOvw-J5v-xWQyC0nQlp52_dnoqsdHjDaAInDMNzQbZc4ROxxIbgMrmxtALagtgXniiv3HxOuDErvbjDfqqgDA"),
      s("skin-54693187ad0f","AUG","Spalted Wood","milspec",6.4,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk6-C3V7NiL_SsAm6Xyfo44-JsFiy3wBkl6miBmNz9IHrEbAZxDZciEO8Kuxbtm93gP-Lgtlbe35UFk3vZ4ja9kg"),
      s("skin-348f142a19ac","MP9","Old Roots","milspec",6.77,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f7jJk4v28Z5tuIeKFB2mX_vdzvO1mWBa_nBovp3PUmI6vdi-VOgInDpFxQOIKuhW8lNC1Puqw41fajIJCnCv9j3tIuixt_a9cBudlkiY3"),
      s("skin-64f26cedec6c","Five-SeveN","Withered Vine","milspec",5.71,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRe7RSLf-BAViExPZiue1scDmmhw0rtgKcn4P1Ljz4Ml93UtZuReJcshe5m9HuYunhsQ3dgowWnCqviSgduC1q5OgGBKN0r6Le2gnHZKp9v8fcyxvZMw"),
      s("skin-9397611af549","M249","Midnight Palm","milspec",5.08,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wjFL0OKvZKlSLvmUBnOvzedxuPUnS3Cxlx8ksW7Um9mtc3KTOwAlCJF4FO4PskO9wd3jZLjn4wSN2I1HzDK-0H3u05_o_Q"),
      s("skin-8d6ad2c220f9","P250","Black & Tan","milspec",4.27,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0Pare6F_NM-eG2uEyO13vd5lRi67gVMm5GrTyN-ueH6fO1MlDMd2RLQC50Trw4fvMuPns1eLj9hHzCn4j3lK8G81tJittFNq"),
      s("skin-38eda175bd2a","Nova","Quick Sand","milspec",2.19,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwipC0OaheqpSI_GeAViAwOd4pPJWQyC0nQlp5GSGwt-tJXvEblMlCpQmFuVc4ELqm9TiMuPr4Fbaj90Tnimohn5J7DErvbgkcpg0tA"),
      s("skin-844716d091ce","G3SG1","New Roots","milspec",5.08,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1I_82jZ7ZiH_OSHHGZz-lJvOhuRz2xmQgijDGMnYftby2eOgEiDsMmReUDs0G5m4fhM7zm4ADY2d9FzyT_33kfvylp4utQV6E7uvqAlSn4mj4"),
      s("skin-dc1a0332945f","Galil AR","Amber Fade","milspec",6.57,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0POvV6JsJPWsA2KEwOJ6ueJWQyC0nQlp52uGm9yodC3GZ1d0CMdyQeJctRDqmtayY-Kz71fW2IIUziz8intK6TErvbiZh4dEMQ"),
      s("skin-c14e09c62ca0","USP-S","Orange Anolis","restricted",18.11,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSIf2sAm6KwPxyj_NsSxa_nBovp3OHn4qqcX3FbQMgD5okQeFYtBbsktLmMeux5leLjIIXxXn4i3wdvC9s_a9cBikK0tGN"),
      s("skin-294fc9bca944","M4A4","Red DDPAT","restricted",16.96,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwipC0PaqeKV5H-WBDGae_vxztN5lRi67gVNxsT_SmYv8InrDblQhDJN2R7ZZ4RW7m9azYb_n5gLZ391AnCj92y8c8G81tFE6rC2P"),
      s("skin-af29d4349bcd","MAC-10","Case Hardened","restricted",17.78,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a_s2hYahoJM-fB2CY1aAituJtTnvjkUx3tziGmd6hJy-VZlAoWZtwFLRZ5EbpwNLvYb-zsgOKlcsbmn9_3b1O"),
      s("skin-f0ba928c4c15","UMP-45","Fade","classified",49.97,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1a7s2oaaBoH-WeHlicyOl-pK8_HHzmzU52sTjWntegc32faAR2DMEkELMI4xmxw4G1Yrnn4FCM3d4Q02yg2U-vv27j"),
      s("skin-8610195a9f7f","SSG 08","Death Strike","classified",71.58,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-ADWiC0ed5vt5lRi67gVMh6jjTn9ygJSieaAEiAsB2F7Jfshe-xtHkPuvisQLXgt8UmCz523lM8G81tFON4mQ2")
    ]
  },
  {"id":"souv_train19","name":"Сувенирный набор «Train 2019»","subtitle":"Классическая коллекция Train с золотыми подписями","category":"souvenir","price":5.8,"accentColor":"#06B6D4","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj270vrSBOjzse5wjJJ4P-hV6BoH-SBD26ej-9y5rI8HHzqlEly4G3QzI6qJHPDPw8mWMAjRLRctkTpwdPjY-nh7wLAy9US6FlZaBQ"),
    "items": [
      s("skin-99e9ef5072fe","UMP-45","Urban DDPAT","milspec",0.84,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1T9s2qbLRsNM-GHGWvzedxuPUnGS3hwBxxtm6Am4yreH2TP1N0A5EhROBb5Ba5k9TjYuLrtQWMjdhCyTK-0H2MxuWOFg"),
      s("skin-e04a45208ba1","Dual Berettas","Colony","milspec",0.99,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I4M29eKVuJc-eD3WZz-tJvOhuRz39wRx2smzVyIqtJ3OQaARzDschFO5esxm5mtHiM-7l5wCN3ohBxSz63zQJsHg_UethgQ"),
      s("skin-50c760b84a50","G3SG1","Polar Camo","milspec",1.61,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1T9s2veqd5KfOsDWie1fx3o_VWQyC0nQlp5D7Xn9n6cn2UP1IoCMF0ROYO4xnsldK1Nbnh5AGM2olDyy-siXwfuzErvbiZGyPTng"),
      s("skin-d4dd8527d3b1","Five-SeveN","Forest Night","milspec",1.04,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRYL1SJv-BC3SE_uB_t-l9cCW6khUz_T7Untv9cXmfPAEnCZFwRLUJtEXtxN3iN-mz7gffjtkRnir-2nkauyx1o7FVpfrK-Xo"),
      s("skin-0a5fadd0a210","Nova","Polar Mesh","milspec",2.03,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwjFL0P-re6xSIeKQGm6T_u15vvV7TjqnqhEutDWR1I7_dCmXbgEmWJYiFuZc4BPpkoWyYe3jsVbejt8QyiutjXxPuic45-wcEf1ynwKdBSU"),
      s("skin-5e5fcd7cad8e","PP-Bizon","Urban Dashed","milspec",1.6,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1I_826abRoH-ObAXWE_vtksuBncCW6khUz_TuAmdesJH2UPVUoDZF1QLQM4xW4l4XvNuLh71bb3d0Qnnitjn5A5yl1o7FVE2UWbJk"),
      s("skin-528001b964c3","MAC-10","Candy Apple","milspec",2.27,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1I4M28baBSLPmUBnPemLZw4rk6Gi3gxkp_5W3Qmdv_cnrDPwZ1Asd2FOcM5BO4k4KxMe7h7xue1dzcbAPD_Q"),
      s("skin-044cebc994db","M4A4","Urban DDPAT","milspec",1.31,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwipC0PaqeKV5H-WBDFicyOl-pK8xF3DjzR5_4zncnouhcSjGPQ8jA5B3ELFbuhPqloDkPrvjsgXY2t5N02yg2Rf5X8A9"),
      s("skin-5816114a2e7c","MAG-7","Metallic DDPAT","milspec",2.32,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiNW0Oe8aqVjH_yaCW-Ej7ch5bQ_GiqxlBxy422Bwt2seCjEbVMkX5J2R-8J4RPsx9bkNO7jtgLAy9USmH-e5kI"),
      s("skin-621090a2f1ba","P250","Metallic DDPAT","milspec",2.26,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiNW0Oe8aqVjH_yaCW-Ej-9ys7UxSiqyzB4jsGnQn9f6cX6UbQ4mDZRyE-AKsxHpmtPiZe7q5wPAy9USTykR2DM"),
      s("skin-7120cef6b037","SCAR-20","Carbon Fiber","milspec",1.46,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk7v-Ra6V_Iv-dMWGZw-tkj-1gSCGn20xx4mXRyd79eHPBbgQiXJpyQrMLuhfqm4LkNu7htQWI2d9CzSX9jShXrnE8-xTDFeg"),
      s("skin-6764c2686f68","P90","Ash Wood","milspec",2.11,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7jJk--Wnb7dSLPmUBnPex-p16ec6HHixlBx_4TvUwor7I3mQPFNyX8B5Ru9Z5xftl9G0Y-7nsRue1dw3cZ5lyQ"),
      s("skin-612659d976ea","Desert Eagle","Urban Rubble","milspec",1.49,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk5-uRfqV_KfOSA2iv1Px0se9WQyC0nQlp52nWmduhIn-QaQIpX5RyF-ZY5BS4l9TjZOPmsleN34wWnir73yJI7zErvbj27zddPg"),
      s("skin-c43661e243fc","Sawed-Off","Amber Fade","milspec",2.25,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2vaZtrIfSWMWqV1e96vOhqcCW6khUz_TuHwt2odHKROA90WZN2Fu4DsEO-mtTlNLiws1SNi99NxHmtj3tI5n11o7FVJSB89LY"),
      s("skin-d2229d2ac419","Tec-9","Red Quartz","restricted",4.82,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiNW0PG8cbd5IfyfB32VxdF6ueZhW2e3xU13tzmAmdqsIC6TPw8hCcF3ReADuxPtl9ThNu3qtVPbjdlFny2okGoXub5yNIFB")
    ]
  },
  {"id":"souv_cache17","name":"Сувенирный набор «Cache 2017»","subtitle":"Редкая коллекция Cache • Сube Cerberus","category":"souvenir","price":14,"accentColor":"#22C55E","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bj1_lXmTwnwzMaxqh1L_f2jZ5tpJc-QD2SYxKAgteI_HSvjzE90tm7Wztj_IC7BZg8hXpIhFrFcsBjpx9fgZeux5lSLlcsbmomGOWpb"),
    "items": [
      s("skin-41ff22a15914","Negev","Nuclear Waste","milspec",1.87,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1I_82gfadhJfGBMXeR1fpzou86cCe2khgxjDGMnYftby3EOFB0D5JxRLZZ5BXrm9PmPrjm7weKiY0Xz32ri3hKv3pu4-wBU6Y7uvqADsXx-os"),
      s("skin-33383206120a","P250","Contamination","milspec",2.05,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0Py7a6hoIeKsHWyFzeJl5N55HXzjqhEutDWR1NahIH6SaVUnDsB2Q-MIthHrxtTjMuLk7gXc2YlHyir93CtMuCdt4e8cEf1ykWaXO4g"),
      s("skin-93c8fbff4fb5","AUG","Radiation Hazard","milspec",2.89,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf7jJk4eelbbd5MvmDC1if0-94t-RWTjy0qhEutDWR1N__dX2WOlIoX8N4QOYDu0K6kILuM-m05ASP3YJFz3r3jy0buio_4uYcEf1yDazvhM4"),
      s("skin-43f438fc1f11","PP-Bizon","Chemical Green","milspec",3.4,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1I4M2peqF0H_6GDWuVwPxJt_NsSieMlxQ9vDO6lob-KT-Jbg8oW8R0TeALsxbql4K0Prjg5g3c2oJCyXn7jXkf73lq5O0GBfYm8rqX0V9pS7L6MA"),
      s("skin-0804d7a596cd","Five-SeveN","Hot Shot","milspec",5.76,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRe6tSJ-KWF1ie1O16teB7cCahlBMgtgKDk5n8HjjCKFN-Zc4pEr9OrBm4xN3vNrix41aIjtkQyH-s2ipMvSY_sOxRBaFx-vCE3AuXYLE_45kdZKHwQRxY8PU"),
      s("skin-88a540df0ba6","SG 553","Fallout Warning","milspec",5.81,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I_82gfa9oM-SBB3eV_uN3ou5mQRagkkhy4AKJk4jxNWWSZlAhA5QjFLJYukLpwdLjZe60sgzYjtpCxC2oi3tB6C5ot-pQWaJ35OSJ2GFfvLbQ"),
      s("skin-c35e4824fa14","Glock-18","Reactor","milspec",3.08,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2gfadhJfGBMXeR1fpzou84cC6_mh4sjDGMnYftb3yTbAQjA5NxR-4MtRjumtzkM-yzsVDegtkWyyX43ytBvC9tsrpRAKE7uvqAUKOQcp4"),
      s("skin-f93016c04c3b","MP9","Setting Sun","milspec",1.84,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f9Ttk4eetZKFsMs-DD3OExPx44t5kX3CMmRQguynLyIqvdXiVbFN2CZMhQLRZ4RbumtXhPrji4gzfio5MyCr4in4a7nk_4PFCD_TmMRwm0Q"),
      s("skin-46ba27249a98","XM1014","Bone Machine","milspec",5.29,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7v-RZrFuLPWSHFiDyvt6vPI4cDG-xE125wKJk4jxNWWSbgApXpBzRbFfsEXrlNyyMOKx5lSNgt5FySSohy9OvCZr5uYHA_F35OSJ2NlEZ-xJ"),
      s("skin-9f0f8f333aaa","MAC-10","Nuclear Garden","milspec",3.59,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a4s2gfadhJfGBMXSb1OJ6o7JWQiiwxE0YvzSCkpu3Ii_COw4jDsMkEbYJsxe5xNezPu-3swCN3dhEz3_33XlA63lo6-8DWL1lpPMiXZ_jZw"),
      s("skin-e7703810e2d0","Tec-9","Toxic","milspec",5.14,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wipC0Py7a6hoIeKsHWyFzeJl5d59SirqqhEutDWR1N2pc3PFbgYgDMF5TbVZ5hfsk93hP7u2tQzf2t0RxSuviiJN5ydo5bwcEf1yPyH7PX0"),
      s("skin-91ecab26594d","FAMAS","Styx","restricted",13.51,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a4s2gfadhJfGBMXSb1OJ6o7NWSSi-lA4YvzSCkpu3dnvGPQAkCsMkRLQL5hW6ktC1Pu_h7lHWjY5Fznr-inkY6SxpsO5XAr1lpPPtc2FJkw"),
      s("skin-81dd750d8bc9","Galil AR","Cerberus","restricted",19.42,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6doMvKBG3Svxu96ue1WQyC0nQlpsTjVzdb8IH-UOw8lX8B5EeYJ40a8k4XnPuvqsgzYjt0QnCyqh3wb7DErvbjusqqqdw")
    ]
  },
  {"id":"souv_overpass14","name":"Сувенирный набор «DreamHack 2014»","subtitle":"Легендарный Olofboost Scout (Detour)","category":"souvenir","price":38,"accentColor":"#F59E0B","image":u("@JKz2lu_XsnXwtmkJjSU91dh8bjw4k62FSLhjJnt8h1f6s2hfqF_MPGAHSmVk74n4rFtHXvixB535mmAydytcC7EZwEjX5ZyRbUItxO-w4ezZOO3-UWA3FVu4DJF"),
    "items": [
      s("skin-524093d4fd9e","M249","Contrast Spray","milspec",13.35,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wjFL0OG-eqV0H_yaCW-Ej-shsbBtS3q2wkUitWzUz9b_c3vEZ1UhD5R4F-QL40a8m4HuZbnitlfAy9USVV6qaxA"),
      s("skin-ca46865ea5de","MAG-7","Storm","milspec",13.86,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wjFU0OG6Z7ZgJuKcAHOvzedxuPUnS3_iwk926m6EnIyvIn3DbQF0X5UjRbJfthewktK2MLzq4ATcgoJCxTK-0H2wBd1PlQ"),
      s("skin-65e7edddd8b7","MP9","Storm","milspec",13.14,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f7i1k_OaheqlrMv-dGlicyOl-pK8_S3zjxRh_5mmGn9epIymQPQBxDpQlFuUJ5xa6kt2yZLjkswLY2ooT02yg2WH9Y1dp"),
      s("skin-358cc1547e49","Sawed-Off","Sage Spray","milspec",8.66,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c29eJt-MOKSF1iUxP1zovVWXCi0kCIrujqNjsH9eC_GblMpCMB4RLYJuhi8wdLiN7_qslaNjdkWyCmqjn9O5yk5sbwBT-N7rdc-87w7"),
      s("skin-ea40d0b778e0","UMP-45","Scorched","milspec",10.19,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1I_82qabR9LPWsAm6Xyfo46bMxGn-3x00m4m-HzN2sIH6SZwQpWJVwQu4MuhK5xIXiMuO24QLej5UFk3vMYylqRQ"),
      s("skin-4883733d994a","MP7","Gunsmoke","milspec",15.44,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Ttk6PeieKFjH_yaCW-Ej7d0sbI8Gyrklht04GvXy46vJ3uQbQ4nWcN5EeAI5hPtmtzjP7nktlHAy9USqCgnGlg"),
      s("skin-c97d7ecf1434","Desert Eagle","Urban DDPAT","milspec",10.54,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk5-uRbKB9IeSsG3WS_uJ_t-l9AXm2kxkk42rWn9egc36UOwYiX5N1EOVYsRLtldC0M77g5QXfiN1Fzn_gznQemk8fKYk"),
      s("skin-7da83ba004c9","Glock-18","Night","milspec",11.19,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1I4M2gYaNlNM-fB2CY1aAmtOU-S33jwEwhtWvdzIr4cHvCPwR1DZdxQrFZt0bsloLjP7jg4VGMlcsbmvNarNNc"),
      s("skin-4f77cef2d122","P2000","Grassland","milspec",13.06,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0OGhV6N_IeOAAmaexdF6ueZhW2fkzEght2zVnIz_cXrCPQEmA5IhE7FZ4BG-x4GyY-rr5wWNj4kXyi_2kGoXucFfluJI"),
      s("skin-3a57219a9579","XM1014","VariCamo Blue","milspec",13.02,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk5-uRfqV_KfOSA2ivw-Jjtd5lRi67gVN0tmTdyN-gJy2fb1AjCcFzFOYDu0btxNDkYr_k4APXg4JNxXn32n5L8G81tKBcQXWQ"),
      s("skin-993020f09ddf","SSG 08","Detour","milspec",12.26,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1T9s29e6M9eM-eD3WbxPxJvOhuRz39lxsm6m_XmdugcnOXaFMlD5ImEbQP5kW4kICyM-vj5wXc2dkUzHqoiDQJsHjAk3eMVA"),
      s("skin-11ddb95a9bd7","CZ75-Auto","Nitro","milspec",11.07,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1I4M2heqVjJ_WsD2STxOBio7NWQyC0nQlptWvXw9_7I3zCaVB1C5YkTeAIsRC8m9a1MePg5VGLiI9CnH772C9AuDErvbi4qlLcDQ"),
      s("skin-665b5d16532c","AWP","Pink DDPAT","restricted",52.88,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk6_a-abBSMPmdBVicyOl-pK9qHXC2zUpz5DiBn9arJCmXOFd0DZpxQOUDtBC6wNK0MOzl4wXWjYpG02yg2c9nQ1pb"),
      s("skin-d7d145b204a5","USP-S","Road Rash","restricted",31.63,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_v13vuV5Tjm2hxgjjDGMnYftby2UaFcmCsF1R-cLsBS4mtLmM7nmsVbfiNlHxSuriypAvytisuhQWPY7uvqAwrOwBmU"),
      s("skin-5e983b2fc436","M4A1-S","Master Piece","classified",189.32,"@IGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL87o956RiW2mx4ijDGMnYftby3FbFdyXpZxQ-AP5hi7wILkZOzg5ASNgt4WmCv833hKuntvsLxWAKE7uvqATAFok6E")
    ]
  }
];

export const INITIAL_QUESTS: QuestItem[] = [
  // ЕЖЕДНЕВНЫЕ
  {
    id: 'q_daily_open_15',
    title: 'Разминка перед мейджором',
    description: 'Открой 15 любых кейсов или капсул',
    difficulty: 'daily',
    reward: 25,
    target: 15,
    progress: 0,
    claimed: false,
    type: 'open_cases',
  },
  {
    id: 'q_daily_sell_12',
    title: 'Чистка склада',
    description: 'Продай 12 выбитых скинов на торговой площадке',
    difficulty: 'daily',
    reward: 18,
    target: 12,
    progress: 0,
    claimed: false,
    type: 'sell_items',
  },
  // БОЕВЫЕ (CASE BATTLE & MINIGAMES)
  {
    id: 'q_battle_win_3',
    title: 'Чемпион Битвы Кейсов',
    description: 'Победи ботов в режиме «Битва Кейсов» 3 раза',
    difficulty: 'battle',
    reward: 65,
    target: 3,
    progress: 0,
    claimed: false,
    type: 'win_case_battle',
  },
  {
    id: 'q_battle_reverse_2',
    title: 'Тактик Анти-Дропа (Реверс)',
    description: 'Выиграй 2 Битвы Кейсов в режиме «Реверс» (выбив самый дешевый дроп)',
    difficulty: 'battle',
    reward: 90,
    target: 2,
    progress: 0,
    claimed: false,
    type: 'win_reverse_battle',
  },
  {
    id: 'q_games_win_8',
    title: 'Акула Азарта',
    description: 'Одержи 8 побед в Ракетке, Минах, Монетке или Блэкджеке',
    difficulty: 'battle',
    reward: 75,
    target: 8,
    progress: 0,
    claimed: false,
    type: 'win_games',
  },
  // КОЛЛЕКЦИОННЫЕ
  {
    id: 'q_craft_3',
    title: 'Мастер Контрактов Обмена',
    description: 'Скрафти 3 предмета через Контракт Обмена (Trade-Up)',
    difficulty: 'collector',
    reward: 55,
    target: 3,
    progress: 0,
    claimed: false,
    type: 'craft_contract',
  },
  {
    id: 'q_upgrade_4',
    title: 'Ювелирный Апгрейд',
    description: 'Успешно улучши скины в Апгрейдере 4 раза',
    difficulty: 'collector',
    reward: 110,
    target: 4,
    progress: 0,
    claimed: false,
    type: 'upgrade_win',
  },
  // ХАРДКОРНЫЕ
  {
    id: 'q_hard_open_100',
    title: 'Одержимый кейсами',
    description: 'Открой 100 кейсов в любых каталогах',
    difficulty: 'hardcore',
    reward: 180,
    target: 100,
    progress: 0,
    claimed: false,
    type: 'open_cases',
  },
  {
    id: 'q_hard_covert_3',
    title: 'Ловец Тайного и Золота',
    description: 'Выбей 3 предмета качества «Тайное» или «Особый редкий предмет (Нож/Перчатки)»',
    difficulty: 'hardcore',
    reward: 320,
    target: 3,
    progress: 0,
    claimed: false,
    type: 'get_covert',
  },
];

export function getWearInfo(floatValue: number): { wear: WearShort; wearName: string; multiplier: number } {
  if (floatValue < 0.07) {
    return { wear: 'FN', wearName: 'Прямо с завода (Factory New)', multiplier: 1.45 };
  }
  if (floatValue < 0.15) {
    return { wear: 'MW', wearName: 'Немного поношенное (Minimal Wear)', multiplier: 1.2 };
  }
  if (floatValue < 0.38) {
    return { wear: 'FT', wearName: 'После полевых испытаний (Field-Tested)', multiplier: 1.0 };
  }
  if (floatValue < 0.45) {
    return { wear: 'WW', wearName: 'Поношенное (Well-Worn)', multiplier: 0.82 };
  }
  return { wear: 'BS', wearName: 'Закалённое в боях (Battle-Scarred)', multiplier: 0.68 };
}

export function rollSkinFromCase(caseObj: CaseContainer): InventoryItem {
  const chances = {
    milspec: caseObj.customChances?.milspec ?? RARITIES.milspec.chance,
    restricted: caseObj.customChances?.restricted ?? RARITIES.restricted.chance,
    classified: caseObj.customChances?.classified ?? RARITIES.classified.chance,
    covert: caseObj.customChances?.covert ?? RARITIES.covert.chance,
    gold: caseObj.customChances?.gold ?? RARITIES.gold.chance,
  };

  const availableRarities = (Object.keys(chances) as RarityKey[]).filter((r) =>
    caseObj.items.some((item) => item.rarity === r)
  );

  const totalWeight = availableRarities.reduce((acc, r) => acc + chances[r], 0);
  let rand = Math.random() * totalWeight;
  let chosenRarity: RarityKey = availableRarities[0] || 'milspec';

  for (const r of availableRarities) {
    if (rand < chances[r]) {
      chosenRarity = r;
      break;
    }
    rand -= chances[r];
  }

  const pool = caseObj.items.filter((i) => i.rarity === chosenRarity);
  const template = pool[Math.floor(Math.random() * pool.length)] || caseObj.items[0];

  return instantiateSkin(template, caseObj.category);
}

export function instantiateSkin(template: SkinTemplate, category: CaseContainer['category'] = 'base_cases'): InventoryItem {
  const isSticker = Boolean(template.isSticker);
  const isSouvenir = category === 'souvenir';
  const statTrak = !isSticker && !isSouvenir && Math.random() < 0.09;

  // Weighted float distribution (Field-Tested & Well-Worn are most common, Factory New is rare!)
  const rFloat = Math.random();
  const floatValue = isSticker
    ? 0
    : rFloat < 0.08
    ? Number((Math.random() * 0.069).toFixed(6))
    : rFloat < 0.26
    ? Number((0.07 + Math.random() * 0.079).toFixed(6))
    : Number((0.15 + Math.random() * 0.75).toFixed(6));

  const wearInfo = getWearInfo(floatValue);

  let finalPrice = template.basePrice * (isSticker ? 1 : wearInfo.multiplier);
  if (statTrak) finalPrice *= 1.75;
  if (isSouvenir) finalPrice *= 1.35;

  const stickers = isSouvenir && TOURNAMENT_STICKERS.length > 0
    ? [
        TOURNAMENT_STICKERS[Math.floor(Math.random() * TOURNAMENT_STICKERS.length)],
        TOURNAMENT_STICKERS[Math.floor(Math.random() * TOURNAMENT_STICKERS.length)],
        TOURNAMENT_STICKERS[Math.floor(Math.random() * TOURNAMENT_STICKERS.length)],
      ]
    : [];

  return {
    instanceId: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    templateId: template.id,
    weapon: template.weapon,
    name: template.name,
    rarity: template.rarity,
    image: template.image,
    floatValue,
    patternSeed: Math.floor(Math.random() * 999) + 1,
    wear: isSticker ? 'FN' : wearInfo.wear,
    wearName: isSticker ? 'Турнирная наклейка CS2' : wearInfo.wearName,
    statTrak,
    souvenir: isSouvenir,
    isSticker,
    stickers,
    price: Math.max(0.05, Number(finalPrice.toFixed(2))),
    obtainedAt: Date.now(),
    isLocked: false,
    marketTrend: {
      trendPct: getSkinMarketTrend(template.id).trendPct,
      isUp: getSkinMarketTrend(template.id).isUp,
    },
  };
}

export function getAllTemplates(): SkinTemplate[] {
  const map = new Map<string, SkinTemplate>();
  for (const c of INITIAL_CASES) {
    for (const item of c.items) {
      map.set(item.id, item);
    }
  }
  return Array.from(map.values()).sort((a, b) => a.basePrice - b.basePrice);
}


// ==================== CS2 RANKS & PREMIER RATING ====================
export const CS2_RANKS: CS2RankInfo[] = [
  { id: 1, name: 'Silver I', nameRu: 'Серебро I', tier: 'silver', icon: 'shield-outline', minElo: 0 },
  { id: 2, name: 'Silver II', nameRu: 'Серебро II', tier: 'silver', icon: 'shield-outline', minElo: 600 },
  { id: 3, name: 'Silver III', nameRu: 'Серебро III', tier: 'silver', icon: 'shield-outline', minElo: 1400 },
  { id: 4, name: 'Silver IV', nameRu: 'Серебро IV', tier: 'silver', icon: 'shield-outline', minElo: 2400 },
  { id: 5, name: 'Silver Elite', nameRu: 'Серебро-Элита', tier: 'silver', icon: 'shield-half-outline', minElo: 3600 },
  { id: 6, name: 'Silver Elite Master', nameRu: 'Серебро — Великий Магистр', tier: 'silver', icon: 'shield', minElo: 5000 },
  { id: 7, name: 'Gold Nova I', nameRu: 'Золотая Звезда — I', tier: 'nova', icon: 'star-outline', minElo: 6600 },
  { id: 8, name: 'Gold Nova II', nameRu: 'Золотая Звезда — II', tier: 'nova', icon: 'star-half-outline', minElo: 8400 },
  { id: 9, name: 'Gold Nova III', nameRu: 'Золотая Звезда — III', tier: 'nova', icon: 'star', minElo: 10400 },
  { id: 10, name: 'Gold Nova Master', nameRu: 'Золотая Звезда — Магистр', tier: 'nova', icon: 'ribbon-outline', minElo: 12800 },
  { id: 11, name: 'Master Guardian I', nameRu: 'Магистр-хранитель — I', tier: 'guardian', icon: 'trophy-outline', minElo: 15500 },
  { id: 12, name: 'Master Guardian II', nameRu: 'Магистр-хранитель — II', tier: 'guardian', icon: 'trophy-outline', minElo: 18500 },
  { id: 13, name: 'Master Guardian Elite', nameRu: 'Магистр-хранитель — Элита', tier: 'guardian', icon: 'trophy', minElo: 22000 },
  { id: 14, name: 'Distinguished Master Guardian', nameRu: 'Заслуженный Магистр (Бигстар)', tier: 'guardian', icon: 'medal-outline', minElo: 26000 },
  { id: 15, name: 'Legendary Eagle', nameRu: 'Легендарный Беркут', tier: 'elite', icon: 'flash-outline', minElo: 30500 },
  { id: 16, name: 'Legendary Eagle Master', nameRu: 'Беркут-Магистр (LEM)', tier: 'elite', icon: 'flash', minElo: 35500 },
  { id: 17, name: 'Supreme Master First Class', nameRu: 'Великий Магистр (Суприм)', tier: 'elite', icon: 'sparkles', minElo: 41000 },
  { id: 18, name: 'The Global Elite', nameRu: 'Всемирная Элита (Global Elite)', tier: 'elite', icon: 'planet', minElo: 48000 },
];

export function getCS2Rank(elo: number): CS2RankInfo {
  let cur = CS2_RANKS[0];
  for (const r of CS2_RANKS) {
    if (elo >= r.minElo) cur = r;
    else break;
  }
  return cur;
}

export function getNextCS2Rank(elo: number): { nextRank: CS2RankInfo | null; progress: number; needed: number } {
  const current = getCS2Rank(elo);
  const nextIdx = CS2_RANKS.findIndex((r) => r.id === current.id) + 1;
  if (nextIdx >= CS2_RANKS.length) {
    return { nextRank: null, progress: 1, needed: 0 };
  }
  const next = CS2_RANKS[nextIdx];
  const step = next.minElo - current.minElo;
  const currentInStep = elo - current.minElo;
  return {
    nextRank: next,
    progress: Math.min(1, Math.max(0, currentInStep / step)),
    needed: next.minElo - elo,
  };
}

export function getPremierRating(elo: number): PremierRatingInfo {
  // Premier CS Rating CS2 style
  const rating = Math.max(1000, Math.floor(elo * 0.72));
  if (rating < 5000) return { rating, color: '#9CA3AF', tierName: 'Серый' };
  if (rating < 10000) return { rating, color: '#38BDF8', tierName: 'Голубой' };
  if (rating < 15000) return { rating, color: '#3B82F6', tierName: 'Синий' };
  if (rating < 20000) return { rating, color: '#A855F7', tierName: 'Фиолетовый' };
  if (rating < 25000) return { rating, color: '#EC4899', tierName: 'Розовый' };
  if (rating < 30000) return { rating, color: '#EF4444', tierName: 'Красный' };
  return { rating, color: '#FACC15', tierName: 'Золотой' };
}

export const CS2_AVATARS = [
  { id: 's1mple', name: 's1mple', tag: 'NAVI GOAT', color: '#EAB308', icon: 'person' },
  { id: 'm0nesy', name: 'm0NESY', tag: 'G2 Flash', color: '#EF4444', icon: 'flash' },
  { id: 'donk', name: 'donk', tag: 'Team Spirit', color: '#10B981', icon: 'flame' },
  { id: 'zywoo', name: 'ZywOo', tag: 'Team Vitality', color: '#F59E0B', icon: 'trophy' },
  { id: 'b1t', name: 'b1t', tag: 'Headshot King', color: '#3B82F6', icon: 'star' },
  { id: 'niko', name: 'NiKo', tag: 'Deagle Master', color: '#8B5CF6', icon: 'shield' },
  { id: 'sas', name: 'SAS Спецназ', tag: 'Counter-Terrorist', color: '#0284C7', icon: 'finger-print' },
  { id: 'phoenix', name: 'Phoenix Connexion', tag: 'Terrorist', color: '#DC2626', icon: 'skull' },
];

export const DAILY_CARE_PACKAGE: DailyCareReward[] = [
  { day: 1, type: 'coins', amount: 15, label: '+$15 Монет', icon: 'cash-outline' },
  { day: 2, type: 'case', caseId: 'case_revolution', label: 'Кейс «Революция»', icon: 'cube-outline' },
  { day: 3, type: 'capsule', caseId: 'capsule_copenhagen_legends', label: 'Капсула наклеек Major', icon: 'disc-outline' },
  { day: 4, type: 'coins', amount: 50, label: '+$50 Монет', icon: 'wallet-outline' },
  { day: 5, type: 'case', caseId: 'case_dreams_nightmares', label: 'Кейс «Грёзы и кошмары»', icon: 'cube-outline' },
  { day: 6, type: 'coins', amount: 100, label: '+$100 Монет', icon: 'card-outline' },
  { day: 7, type: 'knife', label: '★ Случайный Редкий Нож', icon: 'sparkles' },
];

export function getSkinMarketTrend(templateId: string): MarketTrendInfo {
  const today = new Date().toISOString().slice(0, 10);
  let hash = 0;
  const str = templateId + '_' + today;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const normalized = (Math.abs(hash % 200) / 10) - 10;
  const trendPct = Number(normalized.toFixed(1));
  const isUp = trendPct >= 0;
  const volume24h = (Math.abs(hash) % 450) + 20;

  let status: MarketTrendInfo['status'] = 'stable';
  let statusText = 'Стабильный спрос';
  if (trendPct > 6) {
    status = 'surging';
    statusText = '🔥 Всплеск спроса';
  } else if (trendPct > 0) {
    status = 'rising';
    statusText = '🟢 Рост цены';
  } else if (trendPct < -5) {
    status = 'crashing';
    statusText = '📉 Выгодная скидка';
  } else if (trendPct < 0) {
    status = 'dipping';
    statusText = '🔴 Коррекция';
  }

  return { trendPct, isUp, volume24h, status, statusText };
}

export function rollRandomKnife(): InventoryItem {
  const all = getAllTemplates();
  const knives = all.filter(
    (t) =>
      t.rarity === 'gold' &&
      (t.weapon.includes('Knife') ||
        t.weapon.includes('Bayonet') ||
        t.weapon.includes('Karambit') ||
        t.weapon.includes('Dagger') ||
        t.weapon.includes('Kerambit'))
  );
  const chosen = knives.length > 0 ? knives[Math.floor(Math.random() * knives.length)] : all[0];
  return instantiateSkin(chosen);
}

// Compute dynamic minPrice and maxPrice for cases that don't have them
for (const c of INITIAL_CASES) {
  if (!c.minPrice && c.items.length > 0) {
    const prices = c.items.map((i) => i.basePrice);
    c.minPrice = Math.max(0.05, Number((Math.min(...prices) * 0.68).toFixed(2)));
    c.maxPrice = Number((Math.max(...prices) * 1.45 * 1.75).toFixed(2));
  }
}
