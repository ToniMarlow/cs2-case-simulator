import { CaseContainer, InventoryItem, QuestItem, RARITIES, RarityKey, SkinTemplate, WearShort } from '../types/cs2';

export const TOURNAMENT_STICKERS = [
  {
    "name": "Natus Vincere | Copenhagen 2024",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI6-obi4xe_F0SpycTm_3NfuauvafFpIfHBXmTImLoj5bVtSSqxkxx04GzQn9esbzvJOV84pacW"
  },
  {
    "name": "Virtus.pro | Copenhagen 2024",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI64pe6ugvkFUWgnc6xrnsKuKP9bPNscqjFDzHHlu90sbM5TX2wxkp14WTUnMHpLyyrjSYF-g"
  },
  {
    "name": "G2 Esports | Copenhagen 2024",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI689W6vwzjRU3zzZW4rncCuPf_OvY_I6KRX2HEwO0ltuQ8GS_gxUt_4juAnsHpLyxV8rB6kA"
  },
  {
    "name": "FaZe Clan | Copenhagen 2024",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI68obu7xfjQB7zyMLlqHRdvPSsMaY5I6fDXjLFk-8ls7Y_HH7jlksl4jjcztqhbzvJOdEYnDi_"
  },
  {
    "name": "Team Spirit | Copenhagen 2024",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI655f9-BflEhimnc_i_nID7KD9MPVsIfPBCDCTlLly5LRoTirnzRxx4WzSyt36bzvJOfPBN-a5"
  },
  {
    "name": "Vitality | Copenhagen 2024",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI64o7g6xeyFET3n5Dm_yEDuqqvPPdrcPPCVjfHxblw4LZsH33rxEtz4WrWztehbzvJOfadTm_6"
  },
  {
    "name": "MOUZ | Copenhagen 2024",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI6-Yjh8Be0Eh6in8WypHtevaf9PfNsJqPECjLGl-wh57doG3_hk05wsGXRyIqhbzvJOX5ask-j"
  },
  {
    "name": "Complexity Gaming | Copenhagen 2024",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI695f48he3EEr1yJKxqHECt_esaqU9JaTHDDTHwr8vtbk-GHznlx525GTTw9_8bzvJOSvtUTwO"
  }
];

export const INITIAL_CASES: CaseContainer[] = [
  {
    "id": "case_kilowatt",
    "name": "Кейс «Киловатт» (Kilowatt)",
    "subtitle": "Официальный кейс CS2 • Ножи Кукри и AK-47 Наследство",
    "category": "base_cases",
    "price": 2.49,
    "accentColor": "#00F0FF",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnEVvqf_a6VoIfGSXz7Hlbwg57QwSS_mxhl15jiGyN37c3_GZw91W8BwRflK7EfKsa2sfw",
    "items": [
      {
        "id": "skin-8d6879f0a2bc",
        "weapon": "Dual Berettas",
        "name": "Hideout",
        "rarity": "milspec",
        "basePrice": 0.9,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1f-vOiV6ZoMvWHGmaD_uJzpOloQxa0hxQpjDGMnYftb3-WbQ92WcZ4EeFZs0TtxIfvZr_m7wXW2I0TySv93ywd5yxu5-0FAPE7uvqA-FxXgtE",
        "isSticker": false
      },
      {
        "id": "skin-543d85d8ca60",
        "weapon": "MAC-10",
        "name": "Light Box",
        "rarity": "milspec",
        "basePrice": 1.06,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1W7vH_OJtkLPyGHW6fz9F6ueZhW2e2lBsk4WvXw974diiSblV1DMBxRrEJu0PrwNy1Mruw4gKK3d0TynmskGoXuUBgCcQQ",
        "isSticker": false
      },
      {
        "id": "skin-baa1adba3189",
        "weapon": "Nova",
        "name": "Dark Sigil",
        "rarity": "milspec",
        "basePrice": 0.52,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwixU-fORbLZsK_uSHFicyOl-pK8xG3q1lk0l4m2HmI6odXiRbwF1CJchQbEI4RK8kNPiMb-24A3W3YoX02yg2YjfpjSA",
        "isSticker": false
      },
      {
        "id": "skin-c176fd51f6b9",
        "weapon": "SSG 08",
        "name": "Dezastre",
        "rarity": "milspec",
        "basePrice": 0.95,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_PX-MJtpJeqSHXOCxNF6ueZhW2exwEp2tmmEw9epdCjCalQhX5ImQOZbtRixxNTgN-u24AHb2okTmX2vkGoXuacR7BX3",
        "isSticker": false
      },
      {
        "id": "skin-80f2ee4e940f",
        "weapon": "Tec-9",
        "name": "Slag",
        "rarity": "milspec",
        "basePrice": 1,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wjZe7KuRYrFjK-mSHGOvxOBxue9sSju6mxoYvzSCkpu3eHPFZwMkWZBzR-cDsEbpm9DvY-yx51fajd8WyXn4hntBvX465OkBVL1lpPMDDuBGag",
        "isSticker": false
      },
      {
        "id": "skin-806137e84f73",
        "weapon": "UMP-45",
        "name": "Motorized",
        "rarity": "milspec",
        "basePrice": 1.07,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1O4uL6PZtsM-OWA2WcxOpJte9uRie2qhEutDWR1N2gcy7DalAhCMd3QucO5EPukN2yN-iw5QyN2IkRzSr6iXtO6StrsL0cEf1y62CUsqE",
        "isSticker": false
      },
      {
        "id": "skin-8c2ae17ac090",
        "weapon": "XM1014",
        "name": "Irezumi",
        "rarity": "milspec",
        "basePrice": 0.73,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk9___OPU5H_mBC32FzOdJvOhuRz39k0h14juBztapc3-fPVIjWZomFucMtxe9m9zmNOjltQ2N2dgTnCr_3zQJsHjkNdtnHQ",
        "isSticker": false
      },
      {
        "id": "skin-2c04c0201892",
        "weapon": "Glock-18",
        "name": "Block-18",
        "rarity": "restricted",
        "basePrice": 7.56,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5tvMvmQBVidzuByouhoQRa_nBovp3PXzov9cyjDbwckXMMkF7IIthOwwNDmY-rq4AzfjItMyH_9iC0YuC04_a9cBk5_kH3q",
        "isSticker": false
      },
      {
        "id": "skin-0e160542d6d4",
        "weapon": "M4A4",
        "name": "Etch Lord",
        "rarity": "restricted",
        "basePrice": 3.43,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwi8P7qaRe6psK_WRB3OV_uJ_t-l9AXjnw0Qh5GqGn9b_dH3Cbg4nCcAhRLIM4BW7mtXmM7jjtAXai40WmHngznQeK6EUrpc",
        "isSticker": false
      },
      {
        "id": "skin-204c9ef36369",
        "weapon": "Five-SeveN",
        "name": "Hybrid",
        "rarity": "restricted",
        "basePrice": 5.03,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRbq17JeOWGGKe_uZvsvNgSxa_nBovp3OBmd6oJXyeaQ9yCsZxEOICsUO7kdK0Y-qxtFCN2YsQnCv7i39N7ixp_a9cBsh2vVQD",
        "isSticker": false
      },
      {
        "id": "skin-48f9126df040",
        "weapon": "MP7",
        "name": "Just Smile",
        "rarity": "restricted",
        "basePrice": 4.03,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf8DIM0Pi7e7BSM_2aAmKvzedxuPUnHXrkzU4i4z-Dno6sci3BaQApDpN4R-cCthnqx4W2MunhtgCI3d0QmzK-0H0MYFOvtA",
        "isSticker": false
      },
      {
        "id": "skin-d0653c0aaf2f",
        "weapon": "Sawed-Off",
        "name": "Analog Input",
        "rarity": "restricted",
        "basePrice": 7.82,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c29abNoJP-VCFiXwONzot5lRi67gVN3tWTdyNipdCiQPwdxCJV2RuBY4xa_wILgMLu37leK3otMzHmo3H5J8G81tFoL-ETi",
        "isSticker": false
      },
      {
        "id": "skin-63c1d72b8501",
        "weapon": "M4A1-S",
        "name": "Black Lotus",
        "rarity": "classified",
        "basePrice": 36.52,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_ux6seJicCW8gQg0jDGMnYftb3-eOgEpDcFyQuMMtRG8kIbhMuK051ba2IMQyH6r3yof5ilv4bwLWfU7uvqA7qRNHGA",
        "isSticker": false
      },
      {
        "id": "skin-9eb2feb216c5",
        "weapon": "Zeus x27",
        "name": "Olympus",
        "rarity": "classified",
        "basePrice": 31.21,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLln4Xl7x1B6ue9V7BlNf6XC3WvxuFyj-1gSCGn2xl2sm7XnI6hdC-XPAcmXsF2RLIP4xbslty2NLvqswePjYlEySn33S9XrnE8cYTqlUY",
        "isSticker": false
      },
      {
        "id": "skin-803657465fa6",
        "weapon": "USP-S",
        "name": "Jawbreaker",
        "rarity": "classified",
        "basePrice": 44.11,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODHViUzulxqd5lRi67gVMl62nUyd2scnOVPAcgA5J2TOFY5xLrlN22YbzgsQaI2IlHyiWojnwa8G81tErOD-_J",
        "isSticker": false
      },
      {
        "id": "skin-b986a2456e28",
        "weapon": "AWP",
        "name": "Chrome Cannon",
        "rarity": "covert",
        "basePrice": 127.81,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0OarZbRoMvWXMWuZxuZi_uM6SXngxR5-smTXw4ugIi6RbVcpXsN1ELUDtxPrktOyNL7h4g2P2tpbjXKpKIbjbD4",
        "isSticker": false
      },
      {
        "id": "skin-82dc98e09ba6",
        "weapon": "AK-47",
        "name": "Inheritance",
        "rarity": "covert",
        "basePrice": 251.27,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQ0OKheqdoLPGaAFicyOl-pK8xGH_nwUt1sGrSz9ivcHKQOAcjXMYkRu5Yuxe4lYCyZOq25VSM2oMT02yg2UxBSEgA",
        "isSticker": false
      },
      {
        "id": "skin-vanilla-weapon_knife_kukri",
        "weapon": "★ Kukri Knife",
        "name": "Classic",
        "rarity": "gold",
        "basePrice": 1518.97,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2lfa9_Kb6VXmPGwuogsbNvSyi3zR4jsTnQztyqdS6QP1IoXpoiEeAC5Be5l9CxKaq8sIvgdE5J",
        "isSticker": false
      },
      {
        "id": "skin-6dbefc59c1b9",
        "weapon": "★ Kukri Knife",
        "name": "Fade",
        "rarity": "gold",
        "basePrice": 1976.12,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsIc-VD2OV_uJ_t-l9AXyyzEohsGvVn4moIi-VO1N2CJR1E-UD4BXtkIXhMe2x7lbej4tEnyzgznQeN9c5PgA",
        "isSticker": false
      },
      {
        "id": "skin-0808024a639a",
        "weapon": "★ Kukri Knife",
        "name": "Slaughter",
        "rarity": "gold",
        "basePrice": 1927.25,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsLc-JC2WCwNF6ueZhW2fmwkwj62TWmdyuc3nEOFB1Csd5ReFZtUTpxtXvYb_k4waPj4wXxXitkGoXuVwivb-T",
        "isSticker": false
      },
      {
        "id": "skin-bc9e87f3c013",
        "weapon": "★ Kukri Knife",
        "name": "Blue Steel",
        "rarity": "gold",
        "basePrice": 1894.17,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsMc-RAnKVxdF6ueZhW2exzE0h62nVyd6qeXjEbgF0X8EiEbZesRS_wIXkPujq7wPWjNpDyn6vkGoXudm1ivk1",
        "isSticker": false
      }
    ]
  },
  {
    "id": "case_gallery",
    "name": "Кейс «Галерея» (Gallery)",
    "subtitle": "Новейший кейс CS2 • M4A1-S Vaporwave и Gold Toof",
    "category": "base_cases",
    "price": 2.89,
    "accentColor": "#FF2E93",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnYVuPD5baE6IfTFCmSRme0j5eU5SXrjkRwmt2rWnoqhdnjEPQQiDpRxTflK7EePRV2-Kg",
    "items": [
      {
        "id": "skin-5b2502fc6ca2",
        "weapon": "USP-S",
        "name": "27",
        "rarity": "milspec",
        "basePrice": 1.04,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSNeODMWGZxOJyj_JnTiK2qhEutDWR1Nf8dSieZlciX5skF-INsRe_l9HuMurn5QDZ2tgTnyT82ysduHo_tekcEf1yefDz68I",
        "isSticker": false
      },
      {
        "id": "skin-48039a85c871",
        "weapon": "Desert Eagle",
        "name": "Calligraffiti",
        "rarity": "milspec",
        "basePrice": 1.33,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6_evb6hoH_OSAmuZxvx3tudWQyC0nQlp52rQmNv_IC7DaFR0ApB4QbMKs0W8k9zuPr6xtAGMjoITmymohyMa6jErvbhrxmEjWA",
        "isSticker": false
      },
      {
        "id": "skin-63ed7bb762a0",
        "weapon": "MP5-SD",
        "name": "Statics",
        "rarity": "milspec",
        "basePrice": 1.2,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1W_6eRe7BsNPmQHViSzftzj-1gSCGn20l252_Tz478Jy3EbAYnX8FzFuAI5kO5wNK1P-uz4lSP2doRyS_6iipXrnE8LnlBQOA",
        "isSticker": false
      },
      {
        "id": "skin-f0c2d895b50d",
        "weapon": "AUG",
        "name": "Luxe Trim",
        "rarity": "milspec",
        "basePrice": 1.27,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_Ddc0OK7bqJoMs-fB2CY1aAntOUwSivrwksmtTyBnI2udijFZ1cmDZt0QeUCsRG7xoWzNu3r5gPelcsbmlZvKhNj",
        "isSticker": false
      },
      {
        "id": "skin-c7c133807ad6",
        "weapon": "M249",
        "name": "Hypnosis",
        "rarity": "milspec",
        "basePrice": 1.32,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wi8Ju6uRYL19Lv-AB3SvzedxuPUnTny1wkgm5znWyon4dC2TPFRxX8AmROcLthW8kdTgMrm051fcjIsQzTK-0H3IfNSRpg",
        "isSticker": false
      },
      {
        "id": "skin-3604c7754aa6",
        "weapon": "R8 Revolver",
        "name": "Tango",
        "rarity": "milspec",
        "basePrice": 0.66,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c28MJt_L-OWHViRz-pJt_RnXBa_nBovp3PSm4urdy7Da1UjWJolF-RbshfqldXuMuqxsgGKi45HmXj4iS5IuCxi_a9cBo6oJFLo",
        "isSticker": false
      },
      {
        "id": "skin-03f6e200c8b6",
        "weapon": "SCAR-20",
        "name": "Trail Blazer",
        "rarity": "milspec",
        "basePrice": 0.63,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk_PGvevY9H_aGHH6v1eFmv95lRi67gVN_5D6Bzo38cXOVOA52DZolReBbt0K5k9DvM-Pr4VHXjI9Enn6sjHkb8G81tIsMy8R0",
        "isSticker": false
      },
      {
        "id": "skin-6bdcfb1366c6",
        "weapon": "M4A4",
        "name": "Turbine",
        "rarity": "restricted",
        "basePrice": 5.88,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwi8P7qaRbrF-Kf-dMWuZxuZi_rRtGiriwUgh5m6Bn9z4IHLEOA4gDpZxQOULsUW9k4eyMOLitQzd3opbjXKpOa4i6Kc",
        "isSticker": false
      },
      {
        "id": "skin-8300a7de7ac6",
        "weapon": "Dual Berettas",
        "name": "Hydro Strike",
        "rarity": "restricted",
        "basePrice": 8.35,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1f-vOiV6FhKeSWMW-Jxfx5j_J9XSC4kCIrujqNjsGgeHrGa1B2W5t1Q7NetkOwk4C2Ybzq4FDWjI0TzS6viilLv3tp6rwLT-N7rWtjCU_P",
        "isSticker": false
      },
      {
        "id": "skin-1328a63c72b5",
        "weapon": "MAC-10",
        "name": "Saibā Oni",
        "rarity": "restricted",
        "basePrice": 8.47,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1W7vH_OJtiOvGYB1icyOl-pK89HXuxkRt2627Syt2udn6TZlJyW5R0QuMKsRm6lNflNO3g7lfbi49H02yg2Yk7YeQ4",
        "isSticker": false
      },
      {
        "id": "skin-39f40ce9d13d",
        "weapon": "P90",
        "name": "Randy Rush",
        "rarity": "restricted",
        "basePrice": 7.18,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7XsL0OCvZqB0H-KGHW-vzedxuPUnGCy3lhsj6zmAyYn6eXyQbwMhApAmFu8C5xTpktHjMejl71aPjtkQnjK-0H3AcMEIag",
        "isSticker": false
      },
      {
        "id": "skin-05b22d280618",
        "weapon": "SSG 08",
        "name": "Rapid Transit",
        "rarity": "restricted",
        "basePrice": 4.06,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_PX-MJt5MvGdHW6E_vl-ufVscCW6khUz_WTSw479d3vDalIkCJNzFuIN4RHqw9K2P7nktQHf340Wyn-vh3wY7Sd1o7FV_lj0Yvg",
        "isSticker": false
      },
      {
        "id": "skin-ad56dc47a4c4",
        "weapon": "AK-47",
        "name": "The Outsiders",
        "rarity": "classified",
        "basePrice": 50.66,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQu6WRfJtvNeOsAm6Xyfo4tbg7G3-wxxwl5mzRyYqodSrBagMjCZJxELMPthi8lNLgYuzltgHc3ZUFk3sO-7HKrg",
        "isSticker": false
      },
      {
        "id": "skin-71be2ee4feeb",
        "weapon": "P250",
        "name": "Epicenter",
        "rarity": "classified",
        "basePrice": 26.69,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjIJuqKRYal9IfOHMWuZxuZi_rg5TnvmzB916m_dm92pdH6eOwJ2DpVyQ7JftUXtwIK2MLiz7wTXjYtbjXKpkd0OdLY",
        "isSticker": false
      },
      {
        "id": "skin-52c02605493f",
        "weapon": "UMP-45",
        "name": "Neo-Noir",
        "rarity": "classified",
        "basePrice": 16.23,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1O4uL6PZtjJf-sAGiZ09F6ueZhW2flw0R0sGrcy4z9cn6XagVxCpR4F7Rb5BPplIbjY7vj4AOLjt0TzSj9kGoXuYU0ZhpI",
        "isSticker": false
      },
      {
        "id": "skin-5bd16f2599cf",
        "weapon": "Glock-18",
        "name": "Gold Toof",
        "rarity": "covert",
        "basePrice": 112.39,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5tuKP-eHmKC_uJ_t-l9ASvik00m5TmEzd-geSiQPARxX5IiTLIMtBW4l9zmNuPr4VbbjItHxC_gznQeqLQCTjk",
        "isSticker": false
      },
      {
        "id": "skin-aa9558c8a01f",
        "weapon": "M4A1-S",
        "name": "Vaporwave",
        "rarity": "covert",
        "basePrice": 89.43,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_vh3oO57WCilkCIrujqNjsH_In7DZgYnWcAiR-MJshO6koDlN7vhsQyLi41HySX6iXlAvCZrsb0HT-N7rW-9qIHE",
        "isSticker": false
      },
      {
        "id": "skin-vanilla-weapon_knife_kukri",
        "weapon": "★ Kukri Knife",
        "name": "Classic",
        "rarity": "gold",
        "basePrice": 984.27,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2lfa9_Kb6VXmPGwuogsbNvSyi3zR4jsTnQztyqdS6QP1IoXpoiEeAC5Be5l9CxKaq8sIvgdE5J",
        "isSticker": false
      },
      {
        "id": "skin-6dbefc59c1b9",
        "weapon": "★ Kukri Knife",
        "name": "Fade",
        "rarity": "gold",
        "basePrice": 1471.86,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsIc-VD2OV_uJ_t-l9AXyyzEohsGvVn4moIi-VO1N2CJR1E-UD4BXtkIXhMe2x7lbej4tEnyzgznQeN9c5PgA",
        "isSticker": false
      },
      {
        "id": "skin-0808024a639a",
        "weapon": "★ Kukri Knife",
        "name": "Slaughter",
        "rarity": "gold",
        "basePrice": 1132.17,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsLc-JC2WCwNF6ueZhW2fmwkwj62TWmdyuc3nEOFB1Csd5ReFZtUTpxtXvYb_k4waPj4wXxXitkGoXuVwivb-T",
        "isSticker": false
      },
      {
        "id": "skin-bc9e87f3c013",
        "weapon": "★ Kukri Knife",
        "name": "Blue Steel",
        "rarity": "gold",
        "basePrice": 1642.78,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZtsMc-RAnKVxdF6ueZhW2exzE0h62nVyd6qeXjEbgF0X8EiEbZesRS_wIXkPujq7wPWjNpDyn6vkGoXudm1ivk1",
        "isSticker": false
      }
    ]
  },
  {
    "id": "case_dreams",
    "name": "Кейс «Грёзы и кошмары»",
    "subtitle": "Базовый кейс CS2 • Изумрудные Ножи-бабочки",
    "category": "base_cases",
    "price": 3.19,
    "accentColor": "#A855F7",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnIV7Kb5OaU-JqfHDzXFle0u4LY8Gy_kkRgisGzcm4v4J3vDOAQmDMdyRvlK7EcmeCU3yw",
    "items": [
      {
        "id": "skin-ee6dee51b1f5",
        "weapon": "Five-SeveN",
        "name": "Scrawl",
        "rarity": "milspec",
        "basePrice": 0.52,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-BlXyGyqhIqtjqEpYPwJiPTcAInA5J0FO9csBSww4bhZruzswLcjIsXmCusjCsbuno_57tXUqB386HJz1aW2pI_m5Q",
        "isSticker": false
      },
      {
        "id": "skin-7b9cc6bc31ef",
        "weapon": "MAC-10",
        "name": "Ensnared",
        "rarity": "milspec",
        "basePrice": 0.88,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-DB3-ZxNF6ueZhW2fikB935ziGztj7JHyQbgIkWZsmFrJY4xTpwdOzP-Oz7laNj4lFyy2tkGoXudbL5uIf",
        "isSticker": false
      },
      {
        "id": "skin-c8ccc993ef98",
        "weapon": "MAG-7",
        "name": "Foresight",
        "rarity": "milspec",
        "basePrice": 0.76,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiFO0P-vb_NSMOKWCm6T1eFkj-1gSCGn2xgmsWvRm96seXOfbFMjXJR1R-NY4xjukNLlYurn4QeN3t5CmCT7jHxXrnE8UENGXls",
        "isSticker": false
      },
      {
        "id": "skin-0571189c0ca3",
        "weapon": "MP5-SD",
        "name": "Necro Jr.",
        "rarity": "milspec",
        "basePrice": 0.58,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePFSK_mXMWmVwvx5vu5kRiq8myIrujqNjsH8JXqXPVAhDZVyR7YO4ETrxtLvZbmxtAXfiIpCzHr5h3tB635j4-gCT-N7reJfmdfh",
        "isSticker": false
      },
      {
        "id": "skin-75edb16f0014",
        "weapon": "P2000",
        "name": "Lifted Spirits",
        "rarity": "milspec",
        "basePrice": 0.48,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_K8-VAn6Zz-lJtPNsTiSMmRQguynLydatcHrEOgIhXJZxReINtRO7ltexZuiwtQPd34lFxXqqjisYun444fFCD_R1ajI6RQ",
        "isSticker": false
      },
      {
        "id": "skin-2c6b935bb4eb",
        "weapon": "SCAR-20",
        "name": "Poultrygeist",
        "rarity": "milspec",
        "basePrice": 0.79,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk_OKRe6dsMs-QBm6Tyut4tuhuRz2MmRQguynLno2pdnnGOw9xWcFwEbMCtkHsmoXuNe23tVGNiINCyyv6iylJuyZi5_FCD_Tlwp1EIg",
        "isSticker": false
      },
      {
        "id": "skin-3da25779ee2d",
        "weapon": "Sawed-Off",
        "name": "Spirit Board",
        "rarity": "milspec",
        "basePrice": 0.69,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZt-IeeWCmiWx9F5pehjTha_nBovp3OEyN-ocCmWPwYkCpoiE-QMt0bsxNbnNLm25waK345DyST23CpP5ytp_a9cBm4mGqdG",
        "isSticker": false
      },
      {
        "id": "skin-10f8a820b8dc",
        "weapon": "PP-Bizon",
        "name": "Space Cat",
        "rarity": "restricted",
        "basePrice": 5.23,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1Y-s2sYb5iLs-AHmaTxO13pN5lRi67gVN04jvcmYv6IHnGbw51XsYmQO5ftBG9xoexNrix4gPYjIJEzX_2iX9I8G81tOIzQC5J",
        "isSticker": false
      },
      {
        "id": "skin-a5efcaeb15ee",
        "weapon": "G3SG1",
        "name": "Dream Glade",
        "rarity": "restricted",
        "basePrice": 9.68,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1Y-s2pO7dqcc-UAmaUxNF6ueZhW2e3wkl162TVmdqvd3mUPw9yDJZ4FOYJ4UKxkNfiNrvn4QCMjdlHmHj6kGoXub9gXKkW",
        "isSticker": false
      },
      {
        "id": "skin-ec2dd0814c74",
        "weapon": "M4A1-S",
        "name": "Night Terror",
        "rarity": "restricted",
        "basePrice": 3.91,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj-hnXCa-mxQmjDGMnYftby3FPFVxA5ZwRecOtUXuxtPiNL_jsQLc2NkTzS38jC5L7ydj5u8EUKo7uvqAgGSM4LM",
        "isSticker": false
      },
      {
        "id": "skin-5f6eb8a4271e",
        "weapon": "XM1014",
        "name": "Zombie Offensive",
        "rarity": "restricted",
        "basePrice": 4.55,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7v-RcKlSOv-eDG6V_uFwtuRnXCClkCIrujqNjsGqdnzEOFUjW5omROQNt0LuwNKyYeKwslfYiN0Qmyr83Hsd6iZj5esAT-N7rRccpDyZ",
        "isSticker": false
      },
      {
        "id": "skin-f3392bb443bc",
        "weapon": "USP-S",
        "name": "Ticket to Hell",
        "rarity": "restricted",
        "basePrice": 9.21,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_vp5j-lsQyWMmRQguynLzt_8JXiVOwF2AsF4R-ECshftltKxZe6x41CKjotExST8jn8f7ilr5PFCD_TZVvgG5g",
        "isSticker": false
      },
      {
        "id": "skin-53e4dc76b3e5",
        "weapon": "Dual Berettas",
        "name": "Melondrama",
        "rarity": "classified",
        "basePrice": 22.92,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s2rZK15JeOsDGKHwPxzj-1gSCGn20t_5TiBmdf9Jy-QaQIiW5F1E-BesxG9lIaxNuLj41He340Ryi79ii5XrnE8Xl7Qhlk",
        "isSticker": false
      },
      {
        "id": "skin-c1ded03e3025",
        "weapon": "FAMAS",
        "name": "Rapid Eye Movement",
        "rarity": "classified",
        "basePrice": 43.6,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2oaalsM8-BD3eZxdFzqeR6cCW6khUz_WjRmN79JXmePABxDsB1QeZetxnqx9XhN-nk4A3f399CzX2qiCsa7yd1o7FVINiMH98",
        "isSticker": false
      },
      {
        "id": "skin-335f1a313262",
        "weapon": "MP7",
        "name": "Abyssal Apparition",
        "rarity": "classified",
        "basePrice": 22.14,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_jdk4uL5V6JoIeKsAm6Xyfo45uc9GnnnzBh-5zzTw9n9I3mQPAEgD5YlFuIOthC6wNK1MeKwsgHeiZUFk3vcOiyhPQ",
        "isSticker": false
      },
      {
        "id": "skin-405f5570d1f6",
        "weapon": "AK-47",
        "name": "Nightwish",
        "rarity": "covert",
        "basePrice": 126.54,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSLvmUBnOHyP1-j-1gSCGn20glt2nXnt78cnKUbwN2XJp2R-ZbuxHqlNXlMLiw5AHc3toWnCur23hXrnE8p0T2bx4",
        "isSticker": false
      },
      {
        "id": "skin-feae180c4968",
        "weapon": "MP9",
        "name": "Starlight Protector",
        "rarity": "covert",
        "basePrice": 86.31,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f-jFk4uL3V7d5IeKfB2CY1dF6ueZhW2flkUtztz_SzYypJSqRalUhDJNwQO4PsBXtx9HkN-K37w3bgohGmHn3kGoXuZ3lRdvF",
        "isSticker": false
      },
      {
        "id": "skin-bd871a344e30",
        "weapon": "★ Bowie Knife",
        "name": "Gamma Doppler",
        "rarity": "gold",
        "basePrice": 1188.42,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5sQiyhlBEjjDCEiI31JCLdO1JPVssnHaMU4EG-ltyyPuLq5gHYj9lMzyz7hyxNuCs-5OoDVKImrKTe21mXZ-Zu5I5Deqhh5Zn_hA",
        "isSticker": false
      },
      {
        "id": "skin-2c801d044315",
        "weapon": "★ Bowie Knife",
        "name": "Gamma Doppler",
        "rarity": "gold",
        "basePrice": 1798.53,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5uTiS-lCIjvC2VlorrHjvPP0V1C_0sHLBS9g67l9G0Mu_q5ATZ3t1BxSn6in5B6yc9t7kHBaFw_aPQ3QiTNLQ_ssICOr_5Gko8dFgH",
        "isSticker": false
      },
      {
        "id": "skin-e70487f0da3a",
        "weapon": "★ Bowie Knife",
        "name": "Gamma Doppler",
        "rarity": "gold",
        "basePrice": 1016.38,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5uTiS-lCIjvC2VlorrHjvPP0V1CP0sHLBS9g7tl4fgPujh71CNg91En36si3kY6ns-4OlQWfclqPbQ21zHZbVp4ZdWOr_5GrvoSFRK",
        "isSticker": false
      },
      {
        "id": "skin-9143e6d4868c",
        "weapon": "★ Bowie Knife",
        "name": "Gamma Doppler",
        "rarity": "gold",
        "basePrice": 1867.81,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5uTiS-lCIjvC2VlorrHjvPP0V1Cf0sHLBS9g7sl9WzN-q27gLWiYxDxH3_2y4avyxp575WAvck_aGGjADAYrU6s8EBOr_5Gs3270vO",
        "isSticker": false
      }
    ]
  },
  {
    "id": "case_revolution",
    "name": "Кейс «Революция» (Revolution)",
    "subtitle": "Базовый кейс CS2 • Спортивные перчатки Порок (Vice)",
    "category": "base_cases",
    "price": 2.25,
    "accentColor": "#EC4899",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnAVvfb6aqduc_TFVjTCxbx05OU4S3jilE9w4DzRnImtIy2Sa1JzDJEhRPlK7EcO4U8gfA",
    "items": [
      {
        "id": "skin-e6a7543c4187",
        "weapon": "MAG-7",
        "name": "Insomnia",
        "rarity": "milspec",
        "basePrice": 0.68,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiFO0P-vb_NSKf6AAWqeyO9JvOhuRz39wh4k4TzUnN_9cC6WO1J2DJdyROcI4BC9x9XmN-vj71eN34xAzC33hzQJsHiziLtbUA",
        "isSticker": false
      },
      {
        "id": "skin-2f564d56b7ff",
        "weapon": "MP9",
        "name": "Featherweight",
        "rarity": "milspec",
        "basePrice": 0.6,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_jdk4uL3V7d4MPWBAm6XyfpJvOhuRz39wB9x6jncwtyvd3jBPw8gCJFwR7YItRW8kNK0P--27wLe391NzCyq3zQJsHiOu4WQDA",
        "isSticker": false
      },
      {
        "id": "skin-05d5c801f287",
        "weapon": "SCAR-20",
        "name": "Fragments",
        "rarity": "milspec",
        "basePrice": 0.51,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk6OGRe6dsMs-VHGaXzOt4pPJWTSWylhYYvzSCkpu3dnmXbAZyX5pzQLQO4Ri_lIbgMOzktg2P3t8Uni32iHwc7i856r1UAL1lpPP6-FL_6g",
        "isSticker": false
      },
      {
        "id": "skin-db200bb3a1ef",
        "weapon": "P250",
        "name": "Re.built",
        "rarity": "milspec",
        "basePrice": 0.46,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSMvWRG26c1dF6ueZhW2flkRh_sjjXmNb8cCnDPVUnW5ByQ-JZ5hG_xN3gZuPltAHegogWzH7-kGoXuSIylluX",
        "isSticker": false
      },
      {
        "id": "skin-d87f89df4191",
        "weapon": "MP5-SD",
        "name": "Liquidation",
        "rarity": "milspec",
        "basePrice": 0.46,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1Y-s2jePF-JM-CG26TytF6ufB8Ri2ygRQovQKJk4jxNWXBOgUmDsN5FrIM5xi4lIHgNe7q51Pdi4pGni-t2ntA5ids5LxRVPUj5OSJ2Kcl14st",
        "isSticker": false
      },
      {
        "id": "skin-79472cd37595",
        "weapon": "SG 553",
        "name": "Cyberforce",
        "rarity": "milspec",
        "basePrice": 0.64,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-QF2WV0-h5ouJscCW6khUz_Wjdntr6Iy6WbgEjA5MlRedctxG5kNKyNbi3sgTfi9oUnyj9234b5n51o7FVairOMAY",
        "isSticker": false
      },
      {
        "id": "skin-e5141cf036fa",
        "weapon": "Tec-9",
        "name": "Rebel",
        "rarity": "milspec",
        "basePrice": 0.97,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SJuKWC2OfzNF6ueZhW2fgkU0k5GmBzIn6eHjBagBxDZMhReYN5hC5ldbgNb7jtFbfgt5Ey3_3kGoXuRiiuNrn",
        "isSticker": false
      },
      {
        "id": "skin-e4cd5a266934",
        "weapon": "M4A1-S",
        "name": "Emphorosaur-S",
        "rarity": "restricted",
        "basePrice": 7.64,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj-dsSi26mxoYtS-AlJXgHifOOV5kFJt4F-8KukXtldyyMLjjtVOIjIsWzXj8iylJ5ig6tbsKV_ItqaaB3gHfcepq28_00F4",
        "isSticker": false
      },
      {
        "id": "skin-99526dbb85e6",
        "weapon": "Glock-18",
        "name": "Umbral Rabbit",
        "rarity": "restricted",
        "basePrice": 9.59,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-eAWie_vx3suNgWxa_nBovp3PXyo76Ii_FPAQmDMYiTLYDthm_kdbmZry2slCLjoMQzC7_3y1J7nts_a9cBi_qumx0",
        "isSticker": false
      },
      {
        "id": "skin-7815c7fae965",
        "weapon": "MAC-10",
        "name": "Sakkaku",
        "rarity": "restricted",
        "basePrice": 8.3,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-AD2ybwOVjj-xsSyCmmFMk5mnRzdeqdSnCPVN2DpV3QeELtELrlIbiPrzqsVOMjdlBnySvjH5O8G81tOTP5a5f",
        "isSticker": false
      },
      {
        "id": "skin-f1184959b60b",
        "weapon": "R8 Revolver",
        "name": "Banana Cannon",
        "rarity": "restricted",
        "basePrice": 8.56,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2pe5t_eM-RD2mRz-9JvOhuRz39kU4msjzdmd6peXKTOFd2DcchEOEP40btlt3lN7iz5FbeiNpFzi_83zQJsHgWY2btRg",
        "isSticker": false
      },
      {
        "id": "skin-2e0afbc14204",
        "weapon": "P90",
        "name": "Neoqueen",
        "rarity": "restricted",
        "basePrice": 9.64,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf-jFk_6v-V6poL-GGC2Ke_uJ_t-l9ASyyxhl04zuDn4muInOXPAF2W5shQOAMs0G7xNfkZOuwswbej4JDnyvgznQe6S6_YqA",
        "isSticker": false
      },
      {
        "id": "skin-d42f9ca97ef6",
        "weapon": "AWP",
        "name": "Duality",
        "rarity": "classified",
        "basePrice": 17.86,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6hkLfKcMXSewOVzj-1gSCGn20p_62-HnN7_cH-XblQjDZYhR-FZsETqmoXjYry2s1DX3d5AyyT62ipXrnE8bpg5yZk",
        "isSticker": false
      },
      {
        "id": "skin-f04de3b20f62",
        "weapon": "UMP-45",
        "name": "Wild Child",
        "rarity": "classified",
        "basePrice": 29.26,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1Y-s27ZbRSI_yGGmSY_uV_s-pWQyC0nQlpt2iHmNyqd3KVOlB0D5YlTeZb5xjsx9PjZOjl4VCNgt1EnC77iSMf7jErvbhWyVIDbA",
        "isSticker": false
      },
      {
        "id": "skin-c36fdc469906",
        "weapon": "P2000",
        "name": "Wicked Sick",
        "rarity": "classified",
        "basePrice": 22.12,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMWOVwuJ_vuRWQyC0nQlp4jnTyNqodHyXOlQkDZtzF-UN4BjukYeyZuLn5Qbaj4NEzy3_3ywd5zErvbh-3lU8Iw",
        "isSticker": false
      },
      {
        "id": "skin-1aba3ea9ecc5",
        "weapon": "M4A4",
        "name": "Temukau",
        "rarity": "covert",
        "basePrice": 178.26,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSNPWeG2yR1NF6ueZhW2ewlBtx5W6AmYv9JS6XaAV1CJEmTeUL4UTpxNzjZO3jtgaIjN9ExCuskGoXuRnyRhBA",
        "isSticker": false
      },
      {
        "id": "skin-1f95db2031e4",
        "weapon": "AK-47",
        "name": "Head Shot",
        "rarity": "covert",
        "basePrice": 156.94,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV6xoIfSsHW-f1dF-v-1mcCW6khUz_TzRnNigd3-SOg4lAsF1QOQN4xS4wdHnMu-0swaMjIxExSSoiyof6ih1o7FVGHIdVhw",
        "isSticker": false
      },
      {
        "id": "skin-7b51c8bd957b",
        "weapon": "★ Driver Gloves",
        "name": "Imperial Plaid",
        "rarity": "gold",
        "basePrice": 2550.49,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t9LPGaCliA1PxmvORWQyC0nQlp4W-Hw9-ocy2fbwB2X8YkFucCtRe4xNzhYrjl4Fff39lMyn78iiJLuzErvbgqDAMwGQ",
        "isSticker": false
      },
      {
        "id": "skin-ead101bfb2c9",
        "weapon": "★ Driver Gloves",
        "name": "King Snake",
        "rarity": "gold",
        "basePrice": 1387.15,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-LvGYC3SbyOBJp-lgWyyMmRQguynLz4r6Iy7EbFchApNyR-dbtEbuw4XkN7jq7gHdjtoQzi37hiwYvytvt_FCD_Ql24JgJg",
        "isSticker": false
      },
      {
        "id": "skin-5e8f5f1fecb1",
        "weapon": "★ Driver Gloves",
        "name": "Racing Green",
        "rarity": "gold",
        "basePrice": 1870.79,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-NPmHDW-VxdFxouRsQRa0hxg-jDGMnYftb3mXblQnWJclRuNYtETux9DlYr-wtVaK2IsTmCT-jC4Y6ihjtr0FUaA7uvqAQikoKDk",
        "isSticker": false
      },
      {
        "id": "skin-56be8a3a2bb8",
        "weapon": "★ Driver Gloves",
        "name": "Overtake",
        "rarity": "gold",
        "basePrice": 2526.9,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-NPmHDW-VxdF0vOBqRBa8hxwptDi6lob-KT-JOwYkXppzQO4OsRbqltfiMOvm41TYi44XySqqj35OvS4_57oKA6cl_LqX0V9d-bhOMA",
        "isSticker": false
      }
    ]
  },
  {
    "id": "case_fracture",
    "name": "Кейс «Разлом» (Fracture)",
    "subtitle": "Базовый кейс CS2 • Desert Eagle Поток информации",
    "category": "base_cases",
    "price": 1.85,
    "accentColor": "#38BDF8",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fr3QV7aD7OP01IfbGDzPCmbsm4LU5GnvkzUsi4WvUmIqtci_CPQNyApsjE_lK7EfrhW545A",
    "items": [
      {
        "id": "skin-2c80164190d1",
        "weapon": "Negev",
        "name": "Ultralight",
        "rarity": "milspec",
        "basePrice": 1.3,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-GAnOCwOJ_t-l9cCW6khUz_WSAnNj_cX6VZlQlX8Z0TeVc4RG5w4ayM-2w5wzYidhGyXr-iC0f6Cl1o7FVuI8WfEM",
        "isSticker": false
      },
      {
        "id": "skin-d45805538999",
        "weapon": "P2000",
        "name": "Gnarled",
        "rarity": "milspec",
        "basePrice": 0.7,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PO_V7Q_cKDDMWuf0vpJp-57Qy2MmRQguynLyt38dXjDaA5zC5YlQ-Nc5BG5k93mP-jhsVeKiY8XmSr5iy5J7C1s6_FCD_TbNBDIDw",
        "isSticker": false
      },
      {
        "id": "skin-d4fffad08ab6",
        "weapon": "SG 553",
        "name": "Ol' Rusty",
        "rarity": "milspec",
        "basePrice": 1.01,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1c_M29b_E4c8-BG3SE2NF6ueZhW2e3xxt35GzSw9_8J3yePFIpCMEiRrJZukO7x4exZLiw4AGLiNgRy32rkGoXuZqsEgp2",
        "isSticker": false
      },
      {
        "id": "skin-4bcbe71aa61d",
        "weapon": "SSG 08",
        "name": "Mainframe 001",
        "rarity": "milspec",
        "basePrice": 1.1,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-eD26ex_x3veRWQyC0nQlptzjSntqgJS6Wbg5xDZVwTbUN5EO5ldWxYem04waP2IsUyX_5in4c6zErvbh54g-58w",
        "isSticker": false
      },
      {
        "id": "skin-94b035806a51",
        "weapon": "P250",
        "name": "Cassette",
        "rarity": "milspec",
        "basePrice": 1.08,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSI_GAHWKE1etJvOhuRz39lkwltT7Ww4ugc3PGOwd0DpQkQbUPshbpm93lMuy25QGIjIwUn3_72DQJsHjyHnRH0Q",
        "isSticker": false
      },
      {
        "id": "skin-7e9cf6e60b9f",
        "weapon": "P90",
        "name": "Freight",
        "rarity": "milspec",
        "basePrice": 1.33,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf-jFk_6v-V6diLuSSB2mV09F6ueZhW2fhk09ytjmDm4n8JHOebQEgCMAmQrEMuhi4k4W0MurntVHfid5GnC38kGoXuRB1lB54",
        "isSticker": false
      },
      {
        "id": "skin-aba458e888aa",
        "weapon": "PP-Bizon",
        "name": "Runic",
        "rarity": "milspec",
        "basePrice": 1.11,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1c_M2sYb5iLs-bC2uc0-9_tOR7cCW6khUz_WiGm42pJXyUPwFzXJJxRrZf4xS7x4fvN7ix4gHX3o9HzX32hipBuyp1o7FVwd1bSh8",
        "isSticker": false
      },
      {
        "id": "skin-0fd1ba0e61e0",
        "weapon": "MAG-7",
        "name": "Monster Call",
        "rarity": "restricted",
        "basePrice": 3.93,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiFO0P-vb_NSLf-dHXOV09F1se1lcCW6khUz_WncmIz8JHmTa1JyApd5FLEMsES-kNDhM-3i5QKM2Y5AzSr9jngY6Cp1o7FV7cAHRyI",
        "isSticker": false
      },
      {
        "id": "skin-609ca5fc7896",
        "weapon": "Tec-9",
        "name": "Brother",
        "rarity": "restricted",
        "basePrice": 6.13,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiVI0Oara_1SJ-WWHG6cze9JvOhuRz39xBsj4GmEyt-vIHjEbgJ2CsR2RONfu0K_lYXvZrjg4ADYg4wXzin42DQJsHgTPX1sbQ",
        "isSticker": false
      },
      {
        "id": "skin-c16825526581",
        "weapon": "MAC-10",
        "name": "Allure",
        "rarity": "restricted",
        "basePrice": 7.48,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-aHWifz-B3j-1gSCGn209w626GnNuucC2SaFMiC8B3FuUJ5kW7wdPnZe7g7gyP2Y4Ry3_5hnlXrnE8RS4Y9Xw",
        "isSticker": false
      },
      {
        "id": "skin-736275bed39d",
        "weapon": "Galil AR",
        "name": "Connexion",
        "rarity": "restricted",
        "basePrice": 4.04,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMXeYzut4uflWQyC0nQlpt22Dzd_4cS7Db1NzDZYkQuIKsBW4xt3jPurq7gPag4oXnCqrhipB7TErvbi_0k78nw",
        "isSticker": false
      },
      {
        "id": "skin-527de8ce168e",
        "weapon": "MP5-SD",
        "name": "Kitbash",
        "rarity": "restricted",
        "basePrice": 5.83,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePF-JM-ED3SExOJ3vuVWQyy0lB4-jDGMnYftb32XZ1NyX5B5QuJcthi7k9K0Ye6zsQeP2IMRyiX4iSJLvC5q6-4HUaY7uvqAsG-atjE",
        "isSticker": false
      },
      {
        "id": "skin-1e9229953491",
        "weapon": "M4A4",
        "name": "Tooth Fairy",
        "rarity": "classified",
        "basePrice": 21.49,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSMeWWC2mWwOdkqd5lRi67gVN35WyDwtv8IC-RblVxCpchQLIOuhK8xNG2YbnktAXZjthFxCiohntP8G81tOVu8Qhw",
        "isSticker": false
      },
      {
        "id": "skin-6e390882e9a0",
        "weapon": "Glock-18",
        "name": "Vogue",
        "rarity": "classified",
        "basePrice": 38.93,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-WF2KTzuBiseJ9cCW6khUz_T-GyNavdCqRawN1CMFwTOcO5hO7loXiY-zmsQKPi44QzHj22ikcvy11o7FVfFOBmfY",
        "isSticker": false
      },
      {
        "id": "skin-daae504f859c",
        "weapon": "XM1014",
        "name": "Entombed",
        "rarity": "classified",
        "basePrice": 30.91,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7OeRcKk8cKHHMWad1OJzpN5rQzy2qhEutDWR1N-hI3yWbVRyD8YiEOVZ50TqmoKyZb7rtVfWgosQzX7-3X9K5yc4tr4cEf1yVvkijss",
        "isSticker": false
      },
      {
        "id": "skin-32a30647e564",
        "weapon": "Desert Eagle",
        "name": "Printstream",
        "rarity": "covert",
        "basePrice": 180.53,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ8-DHG6e1f1iouRoQha_nBovp3OGmdeqInyVP1V0XsYlRbEI50a5wNyzZr605AyI3t5MmCSohylAuC89_a9cBoMY9UkV",
        "isSticker": false
      },
      {
        "id": "skin-dfd42a079f44",
        "weapon": "AK-47",
        "name": "Legion of Anubis",
        "rarity": "covert",
        "basePrice": 106.36,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIf6GDG6D_uJ_t-l9AX_nzBhw4TvWwo6udC2QbgZyWcN2RuMP4xHrlYDnYezm7geP3d5FyH3gznQeY_Oe4QY",
        "isSticker": false
      },
      {
        "id": "skin-vanilla-weapon_knife_outdoor",
        "weapon": "★ Nomad Knife",
        "name": "Classic",
        "rarity": "gold",
        "basePrice": 948.53,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2hfbBpL_-BQDPEw-hz57cxTnCxkEh_5jnVzor8dymXbgAiAsFyEOEMsBW8l9O1Ne38p1uJmh0Kkm0",
        "isSticker": false
      },
      {
        "id": "skin-47d49e017564",
        "weapon": "★ Nomad Knife",
        "name": "Fade",
        "rarity": "gold",
        "basePrice": 2307.53,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GSMWGRxetJvOhuRz39wUUksW7Vm4n7d3yUO1InXsdxTeQDukO4l9zuN7_j5QzYjIlFy3n6jDQJsHjNMoy1vA",
        "isSticker": false
      },
      {
        "id": "skin-f18965313816",
        "weapon": "★ Nomad Knife",
        "name": "Crimson Web",
        "rarity": "gold",
        "basePrice": 1127.41,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_iKMXCVw_1JvOhuRz39xEV_sT6Bn9mueX3EP1QjApd4QbZe5EW6wIDmNO7islfW391EzCWt3TQJsHib9FqZhg",
        "isSticker": false
      },
      {
        "id": "skin-74f72ddc6769",
        "weapon": "★ Nomad Knife",
        "name": "Slaughter",
        "rarity": "gold",
        "basePrice": 1125.63,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GeMX2Vw_x3j-1gSCGn20R15TyGnNv_cS3GZlUnA5smTLEM4xDpx4bmY77h51OMiIJNziX53SJXrnE8R49sMsc",
        "isSticker": false
      }
    ]
  },
  {
    "id": "case_snakebite",
    "name": "Кейс «Змеиный укус» (Snakebite)",
    "subtitle": "Базовый кейс CS2 • USP-S Предатель и Перчатки",
    "category": "base_cases",
    "price": 1.95,
    "accentColor": "#10B981",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fr3oVvvT4bfI4dvTLCGTCmLl16ec7TX_mk08k42iHwtqscy-WPVUmCZJ4R_lK7Ed8Q6OYtw",
    "items": [
      {
        "id": "skin-fff2ecbae8e7",
        "weapon": "SG 553",
        "name": "Heavy Metal",
        "rarity": "milspec",
        "basePrice": 0.75,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1c_M29b_E4c8-XC2aEyeNzpOBlcCW6khUz_W6Gw9aqcH3EOAUlCcR5Qu4J50O5ltbhMrnltgbdg4tDmSus3ClOuCp1o7FV59kcj5o",
        "isSticker": false
      },
      {
        "id": "skin-955f32e49387",
        "weapon": "Glock-18",
        "name": "Clear Polymer",
        "rarity": "milspec",
        "basePrice": 0.54,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK8-DAWuJzOtkj-1gSCGn200h4TnQwtqoci_CPQYlDsAiRuZc5hK7kd2zZbm37lGK2o5HnH2v2ixXrnE85Jt4rDY",
        "isSticker": false
      },
      {
        "id": "skin-c6f056b9dbbc",
        "weapon": "M249",
        "name": "O.S.I.P.R.",
        "rarity": "milspec",
        "basePrice": 0.7,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiVI0P_8PP1SI_-eDG6exNF6ueZhW2fhwB53smmAzIr_cy2fa1N0D5J0E-Je4BG_lt22N-63sQLYid0UxCytkGoXuS8jTKqZ",
        "isSticker": false
      },
      {
        "id": "skin-feea98c5ab41",
        "weapon": "CZ75-Auto",
        "name": "Circaetus",
        "rarity": "milspec",
        "basePrice": 0.96,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2tcvM4H-ebB3Wc1ud4tN5lRi67gVN242-AzNuoIyieOg8lDJdyEeVe40TqxoDvZLixtVPZ2IhFmC333yNJ8G81tFbyihAW",
        "isSticker": false
      },
      {
        "id": "skin-cfdaf2a78083",
        "weapon": "UMP-45",
        "name": "Oscillator",
        "rarity": "milspec",
        "basePrice": 1.03,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1a4s27ZbQ5dc-WAmKT1fx5p-B_Sha_nBovp3PTztuvd3jDOlMhX5IjR7YPtRTtx4XjNum2tQOLjItHmyj5j34b6Spt_a9cBq1OnGjK",
        "isSticker": false
      },
      {
        "id": "skin-503060091440",
        "weapon": "R8 Revolver",
        "name": "Junk Yard",
        "rarity": "milspec",
        "basePrice": 0.64,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2pe5t_eM-BG3SEyud4t95lRi67gVMj4WTdzY2qcXjFbwUmDpcmTOEO5xC-x9XgYb7h71eM2dlMmCX_3CpK8G81tNsMj6E-",
        "isSticker": false
      },
      {
        "id": "skin-0c7be2632ca1",
        "weapon": "Nova",
        "name": "Windblown",
        "rarity": "milspec",
        "basePrice": 0.69,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwjFL0PyhfqVSN_mdCliUyP1mtfN6TiWMmRQguynLnN_4JXyWbwN1CZN2QbEMthm6k9bjMemw7lTc2N4QySr7h38f7Hxp5fFCD_RpV_ibxw",
        "isSticker": false
      },
      {
        "id": "skin-24c6ed776121",
        "weapon": "P250",
        "name": "Cyber Shell",
        "rarity": "restricted",
        "basePrice": 9.63,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiVI0OL8PfRSI-mRC3WDyet6vN5lRi67gVMl6mzUm9n8IHzCaQUmA5Z3RLJb4xC9m4bhMbzn7lOL2Y5Am3j73HxI8G81tOdaiAQT",
        "isSticker": false
      },
      {
        "id": "skin-bce9af58ff21",
        "weapon": "Negev",
        "name": "dev_texture",
        "rarity": "restricted",
        "basePrice": 5.87,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-XC3GExPZipfNscCW6khUz_W_QzdmhJy7EOFAkWMdzF-dbtEK9moGyZbi37gTZi4xMxH36iipK73p1o7FVNCisfvA",
        "isSticker": false
      },
      {
        "id": "skin-d5acd24fcb47",
        "weapon": "MAC-10",
        "name": "Button Masher",
        "rarity": "restricted",
        "basePrice": 7.06,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-DAXWEwOx6td5lRi67gVN04GjXnIr7JyiSbQJ2W8Z4QuEItBS_kdyxZurnsVfcjYgTzH6r2ClN8G81tG_8yXMP",
        "isSticker": false
      },
      {
        "id": "skin-337794166cad",
        "weapon": "Desert Eagle",
        "name": "Trigger Discipline",
        "rarity": "restricted",
        "basePrice": 3.58,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ8-HHG6Xxutkj-VgXCq6hREuvTi6lob-KT-Ja1UlWMAkTOMCt0G9kIHlP77l5FbW344XxX_4iSJJv31r4bxRUKUn_rqX0V-d-rquYA",
        "isSticker": false
      },
      {
        "id": "skin-48e1c7c5df5e",
        "weapon": "AK-47",
        "name": "Slate",
        "rarity": "restricted",
        "basePrice": 5.39,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSMOKcCGKD0ud5vuBlcCW6khUz_W3Sytb4cCqTOFUpWJtzTOUD5hPsw9a0Yrnrs1SK3ooXzy6shilM5311o7FVYrIufmI",
        "isSticker": false
      },
      {
        "id": "skin-6d14d557c648",
        "weapon": "MP9",
        "name": "Food Chain",
        "rarity": "classified",
        "basePrice": 29.6,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_jdk4uL3V6JiL_SsDW-RyOBJvOhuRz39xB5-sGrTnt2tdymVOFApD8dxQLUCuxWxldLkNezjtVDd2t8Uyy_7izQJsHisCKzN8w",
        "isSticker": false
      },
      {
        "id": "skin-dad23c017c83",
        "weapon": "XM1014",
        "name": "XOXO",
        "rarity": "classified",
        "basePrice": 27.97,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7uORcKk8cKHHMXeFz-VJvOhuRz39xE8j5GXQztepd3OUOwJ2C5JwELYKsULslobuY-7htlDditkUnyn73zQJsHgY6bTDGg",
        "isSticker": false
      },
      {
        "id": "skin-69f2e17b78f2",
        "weapon": "Galil AR",
        "name": "Chromatic Aberration",
        "rarity": "classified",
        "basePrice": 25.74,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWSY0-F7sd55Rie4qhEutDWR1NivcH2VOAchC8B4ReZesxa5l4LlPu6z7wTa2IhHmCj4jyNJ7Sls4LscEf1yskqHCW4",
        "isSticker": false
      },
      {
        "id": "skin-7dc4b0b65850",
        "weapon": "USP-S",
        "name": "The Traitor",
        "rarity": "covert",
        "basePrice": 143.09,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSJ-OsG3SA0tF-se9uSi2-lBMYvzSCkpu3eX7EP1MpApdwR-8NsxbukoXuNLnj4QOMiN8XzHn_iC8a7Spi4upRWb1lpPOCQNKXgA",
        "isSticker": false
      },
      {
        "id": "skin-c62d08aa8da1",
        "weapon": "M4A4",
        "name": "In Living Color",
        "rarity": "covert",
        "basePrice": 102.93,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSLP-FC1icyOl-pK84GH2wxhty4DjcyNuhdHyXbAVxW8QjTbEMthC8kNa0MLmzs1Hbj95E02yg2bbWGcKW",
        "isSticker": false
      },
      {
        "id": "skin-ac0c22b15c7c",
        "weapon": "★ Broken Fang Gloves",
        "name": "Yellow-banded",
        "rarity": "gold",
        "basePrice": 2399.84,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YozKMiYD3Hi3VMVFPWM4hFrxl-0XkzougWLa7sF2alYpAyX__iClA5ntstuoEUqUirKeG2w3IYrZo4JRSLa2vRRvdWhwJsa98BNe077TKBCc",
        "isSticker": false
      },
      {
        "id": "skin-27555a08b61e",
        "weapon": "★ Broken Fang Gloves",
        "name": "Unhinged",
        "rarity": "gold",
        "basePrice": 1362.57,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YoDOEkYrqKiLJAVR8W8ErKrtT5Uj8jNfuN-2wtgeNioNDxS7_jS4av31j5L4CVqV0rvLTigzCNeE5tZkCJqm5DUPZGadTirc",
        "isSticker": false
      },
      {
        "id": "skin-a371f5d8dddc",
        "weapon": "★ Broken Fang Gloves",
        "name": "Needle Point",
        "rarity": "gold",
        "basePrice": 2344.44,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YtTGKiI71HifOOV5kFJQlQbUL4RHukofjY-227wDaidpHnCqs3H5K6So95ekLVKck__bW3Q_fcepqSI673wM",
        "isSticker": false
      },
      {
        "id": "skin-82516a2fa315",
        "weapon": "★ Broken Fang Gloves",
        "name": "Jade",
        "rarity": "gold",
        "basePrice": 2564.13,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YvjiRm4PwIhTALFN1VP0sHLBS9g65w9exM-Pl5gaKidkRziX22yNIv306571QA6pwrKGDiluTZLxs5ZdXOr_5GlzOqAIa",
        "isSticker": false
      }
    ]
  },
  {
    "id": "case_recoil",
    "name": "Кейс «Отдача» (Recoil)",
    "subtitle": "Базовый кейс CS2 • USP-S Поток информации и Перчатки",
    "category": "base_cases",
    "price": 1.75,
    "accentColor": "#F59E0B",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnMVu6b-avA-JqSSCjSWwuhz47U9TCzlxh9yt2WGnNqgIi-fbgUkWMNxFPlK7EdIJF6a2Q",
    "items": [
      {
        "id": "skin-14669f15615e",
        "weapon": "FAMAS",
        "name": "Meow 36",
        "rarity": "milspec",
        "basePrice": 1.23,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2oaalsM8-QAXWA_uNzv_ZWQyC0nQlp6jvVztaudCnEbAUgDsckFOAJsBLtlN2yP7zqslGMiooXyCX43H8Y5zErvbiVlZtU7g",
        "isSticker": false
      },
      {
        "id": "skin-8300d759e7a9",
        "weapon": "Galil AR",
        "name": "Destroyer",
        "rarity": "milspec",
        "basePrice": 1.34,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWOV0vpkv_hsXRa_nBovp3PWwougcHvBP1IpWJohEOdc5hLrwNTiZbjh7gbaithNnnqsjX4f7y8-_a9cBt1aCBEk",
        "isSticker": false
      },
      {
        "id": "skin-35998e06d00e",
        "weapon": "M4A4",
        "name": "Poly Mag",
        "rarity": "milspec",
        "basePrice": 1.28,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSJfyaGmKv1e91pOhqTiWMmRQguynLzY2pIi2QawR0CpdwTOdeuhXrw9XjZeq04QLYjIlFxSz9hn9MvCw44vFCD_Q07cip4Q",
        "isSticker": false
      },
      {
        "id": "skin-cf8d25d8a85c",
        "weapon": "MAC-10",
        "name": "Monkeyflage",
        "rarity": "milspec",
        "basePrice": 0.89,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-eAWmbxPdwvOBuSha_nBovp3OBzdisJHPDaQ5xXpF2Ru4M5BTtlYHnYr7h5lbZg4gQzC_22ikfvSZt_a9cBiKJuAuZ",
        "isSticker": false
      },
      {
        "id": "skin-128166c2642e",
        "weapon": "Negev",
        "name": "Drop Me",
        "rarity": "milspec",
        "basePrice": 1.26,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-QAmKR09Flu_hWQyC0nQlpsDnVy4mpcSiQOlB2CJRxR-AK4BDrw4azN-225lfc2t0Tznr6iX4f6zErvbg1B8-kIw",
        "isSticker": false
      },
      {
        "id": "skin-de854ad43079",
        "weapon": "UMP-45",
        "name": "Roadblock",
        "rarity": "milspec",
        "basePrice": 1.29,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1c_M27ZbRSMv-SCmWczu19j-1gSCGn2xgi5GnWmdmodXyUbwUhA5RyF-FcthS8w4ayMrjgtAzX2t9Byir83HtXrnE8YWMltLM",
        "isSticker": false
      },
      {
        "id": "skin-2a4119de0db9",
        "weapon": "Glock-18",
        "name": "Winterized",
        "rarity": "milspec",
        "basePrice": 0.96,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK8-WAm6ExNF1sexmcCW6khUz_W6Azdn6eCrBalcjXJpzE7EO5xa_l4DuNu6ws1Hb2IgUn32si39B5y11o7FVC5qcAFg",
        "isSticker": false
      },
      {
        "id": "skin-ab0f49fac59d",
        "weapon": "R8 Revolver",
        "name": "Crazy 8",
        "rarity": "restricted",
        "basePrice": 9.53,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2pe5t_JeacAnGV09FmpfN5QyyMkBEupzi6lob-KT-JZlJ0X5MhEOFcthO9wIHuZrng5A3XgotFmSv82ClAuHo46-wHU6p38rqX0V9gOeDH5A",
        "isSticker": false
      },
      {
        "id": "skin-302f05527562",
        "weapon": "M249",
        "name": "Downtown",
        "rarity": "restricted",
        "basePrice": 8.05,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiFO0P_8PP1SJP-EAHGf1etJvOhuRz39wUh-5GuGz4mrJHuSbg4jWJp1FLINsRCxwdDuZezm7leK3d5GmSr_jTQJsHj3YwoNRA",
        "isSticker": false
      },
      {
        "id": "skin-9acc418fe0ad",
        "weapon": "SG 553",
        "name": "Dragon Tech",
        "rarity": "restricted",
        "basePrice": 4.31,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-QF2WV09FyouBuQCeMmRQguynLw9ygIHnGbgYlDpciEeBYsEPux9ThMuOz4ACLjY1FmX-viitMvCZp5_FCD_QeAJd5TA",
        "isSticker": false
      },
      {
        "id": "skin-e2b145a9faa7",
        "weapon": "P90",
        "name": "Vent Rush",
        "rarity": "restricted",
        "basePrice": 4.62,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf-jFk_6v-V7BsLvefC2OvzedxuPUnTXywwElz52XXzIz4dn2RalcoC8FzQrJfsRe-moG0YeK2sQPZ3YpEmzK-0H18Z6zceQ",
        "isSticker": false
      },
      {
        "id": "skin-459ac0342b48",
        "weapon": "Dual Berettas",
        "name": "Flora Carnivora",
        "rarity": "restricted",
        "basePrice": 5.33,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s2qfaVhH_WfB3OV0tFzpuhlcC-_mg8mjDGMnYftbynGOA4lDZd4FOZYuxi6kdPvZuLrsgTW2IIQxXn7iSNJ6ic96-YCB_I7uvqA4cV5qzc",
        "isSticker": false
      },
      {
        "id": "skin-f10cd3871578",
        "weapon": "AK-47",
        "name": "Ice Coaled",
        "rarity": "classified",
        "basePrice": 18.56,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-UGm-Zz-llj-1gSCGn2x4l5z_RyNj6JXnEbgFzXMYjEOUIsBe5m9exP-zg4leMj4pGxXn7jCJXrnE84asPq_0",
        "isSticker": false
      },
      {
        "id": "skin-5f1071439b89",
        "weapon": "P250",
        "name": "Visions",
        "rarity": "classified",
        "basePrice": 41.12,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiVI0OL8PfRSNvmAB2ie0tF6ueZhW2fmzERx5jyHm4v_dXvGaQR2WJF2QrIMsxW_w9PvN-zhtgXXiokWn3_6kGoXuc_iGAKZ",
        "isSticker": false
      },
      {
        "id": "skin-6f81f65a9d91",
        "weapon": "Sawed-Off",
        "name": "Kiss♥Love",
        "rarity": "classified",
        "basePrice": 42.94,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZt-IeeWCmiWx9F9ufJ6QyalkCIrujqNjsGoI3-QZwZzD5F5TbUDsBi_xtW1NuqwsVaPjoxFmST93ClI6S1osuYDT-N7rb6xkGzX",
        "isSticker": false
      },
      {
        "id": "skin-be37abed2b4d",
        "weapon": "USP-S",
        "name": "Printstream",
        "rarity": "covert",
        "basePrice": 161.23,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_v5kue99XD2hkBwqjDGMnYftb3yUPFR0XsNyRrNc5kO5ltziMenr5lONj4kXyi2riywc7y9o5LtQAqQ7uvqAkScWnv4",
        "isSticker": false
      },
      {
        "id": "skin-3a4cc2c7a86f",
        "weapon": "AWP",
        "name": "Chromatic Aberration",
        "rarity": "covert",
        "basePrice": 115.59,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6dlMv-eD1iAyOB9j-1gSCGn2x50tT_Tm9f4cXORPA4oWJckFOMLtha_x9e1Nu-35QfbjYtHyiythitXrnE8ylr09zg",
        "isSticker": false
      },
      {
        "id": "skin-ac0c22b15c7c",
        "weapon": "★ Broken Fang Gloves",
        "name": "Yellow-banded",
        "rarity": "gold",
        "basePrice": 2594.9,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YozKMiYD3Hi3VMVFPWM4hFrxl-0XkzougWLa7sF2alYpAyX__iClA5ntstuoEUqUirKeG2w3IYrZo4JRSLa2vRRvdWhwJsa98BNe077TKBCc",
        "isSticker": false
      },
      {
        "id": "skin-27555a08b61e",
        "weapon": "★ Broken Fang Gloves",
        "name": "Unhinged",
        "rarity": "gold",
        "basePrice": 1100.61,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YoDOEkYrqKiLJAVR8W8ErKrtT5Uj8jNfuN-2wtgeNioNDxS7_jS4av31j5L4CVqV0rvLTigzCNeE5tZkCJqm5DUPZGadTirc",
        "isSticker": false
      },
      {
        "id": "skin-a371f5d8dddc",
        "weapon": "★ Broken Fang Gloves",
        "name": "Needle Point",
        "rarity": "gold",
        "basePrice": 1823.13,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YtTGKiI71HifOOV5kFJQlQbUL4RHukofjY-227wDaidpHnCqs3H5K6So95ekLVKck__bW3Q_fcepqSI673wM",
        "isSticker": false
      },
      {
        "id": "skin-82516a2fa315",
        "weapon": "★ Broken Fang Gloves",
        "name": "Jade",
        "rarity": "gold",
        "basePrice": 1439.74,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YvjiRm4PwIhTALFN1VP0sHLBS9g65w9exM-Pl5gaKidkRziX22yNIv306571QA6pwrKGDiluTZLxs5ZdXOr_5GlzOqAIa",
        "isSticker": false
      }
    ]
  },
  {
    "id": "case_prisma2",
    "name": "Кейс «Призма 2» (Prisma 2)",
    "subtitle": "Базовый кейс CS2 • M4A1-S Второй игрок и Ножи Коготь",
    "category": "base_cases",
    "price": 2.1,
    "accentColor": "#6366F1",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fr3cV6vT9avBvefWWDDGTxbZ14rhsTX7qkE90sDiHwt2pdC-TblJ2DsB1QPlK7Ee9riHKAA",
    "items": [
      {
        "id": "skin-42cc631beb8c",
        "weapon": "AUG",
        "name": "Tom Cat",
        "rarity": "milspec",
        "basePrice": 0.54,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV7BlNf6XC3WD1eFkvd5lRi67gVMm5GrRzt2sJXqUag4kDZAmFuBYtUTslIXuPui2s1Hb2o4Wyir2hy1N8G81tF6C_jtH",
        "isSticker": false
      },
      {
        "id": "skin-29f83d73bb6a",
        "weapon": "AWP",
        "name": "Capillary",
        "rarity": "milspec",
        "basePrice": 0.71,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JoKf6sAm6Xyfo44bE5HSrmlx5z4GTUzt__I3yebQAgA8R3FuFfsBTqx9W2Y7vq5lbfjZUFk3ugIlCuqg",
        "isSticker": false
      },
      {
        "id": "skin-9a5ab653ba62",
        "weapon": "CZ75-Auto",
        "name": "Distressed",
        "rarity": "milspec",
        "basePrice": 0.64,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1Y-s2tcvM4H_OWHGabzvpzj-1gSCGn208hsTyHw9z6eS2faQEoX5p1ELECtBi7xtG2Pr7j5APZjopDynj_iHtXrnE8XiCan1o",
        "isSticker": false
      },
      {
        "id": "skin-5293f56bb6b8",
        "weapon": "Desert Eagle",
        "name": "Blue Ply",
        "rarity": "milspec",
        "basePrice": 0.8,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ_yWMXWV0eJ_s-BWQyC0nQlpsjzdwtqgIHqfZgAgDZBwROBbtRDsm4HiM7zislfYitpBniz6iy5K7DErvbjLUTqBnA",
        "isSticker": false
      },
      {
        "id": "skin-d536309c3714",
        "weapon": "MP5-SD",
        "name": "Desert Strike",
        "rarity": "milspec",
        "basePrice": 1.03,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1Y-s2jePFSJPWAC3WE_v1iouhiSha_nBovp3PUzYyqdHKfOgJ1CpAhROQJukW4lYDuMr7jswfWjdpNyimsi35O53s-_a9cBg0oJUav",
        "isSticker": false
      },
      {
        "id": "skin-c31f180e6a50",
        "weapon": "Negev",
        "name": "Prototype",
        "rarity": "milspec",
        "basePrice": 1.19,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1Y-s2gbaNoNs-DHGiEzvpvoORWQyC0nQlp6juDydugcHvEawVxApB3F7JftxTsloDgZOqx51PY345AxXr33SNPuzErvbi5RDlayg",
        "isSticker": false
      },
      {
        "id": "skin-3c54e05cbb62",
        "weapon": "R8 Revolver",
        "name": "Bone Forged",
        "rarity": "milspec",
        "basePrice": 0.83,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2pe5t_eM-fC3GZwPp-se9WQyC0nQlp5jmEydqpci2SaQdyDZEjEeFe4Re4wdznNu6ztgbWidkQzSz6jiJKuDErvbgK8jU85g",
        "isSticker": false
      },
      {
        "id": "skin-dd7837484577",
        "weapon": "P2000",
        "name": "Acid Etched",
        "rarity": "restricted",
        "basePrice": 7.05,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PO_V7Q_cKDDMWaTyOpJs-1mWSyhqhEutDWR1NmhJH6VZ1BzCZtzTeQKuxe_x4fuYenj4Q3bgtkXyHn-iC5MvC864OccEf1ypheGRTI",
        "isSticker": false
      },
      {
        "id": "skin-db4ae843fbd7",
        "weapon": "Sawed-Off",
        "name": "Apocalypto",
        "rarity": "restricted",
        "basePrice": 4.97,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZt-IeeWCmiWx9F3oO5qTiWqhQkojDGMnYftb3vFbVcmDsRwEOdbtkW4lIbiMOrh4FaIiYMQxXmoiXkd7n1o5b4AWKM7uvqARUQpSmk",
        "isSticker": false
      },
      {
        "id": "skin-803029f01b68",
        "weapon": "SCAR-20",
        "name": "Enforcer",
        "rarity": "restricted",
        "basePrice": 9.09,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk6OGRe6dsMqLDMWKex-Fks-R7cCW6khUz_TmEn4qudiqVPVB0X5t3QbEN4ELqxNHlY-O27gCLg9oXmyqsjCtN73x1o7FVEvhkFhM",
        "isSticker": false
      },
      {
        "id": "skin-d00c49e52bd9",
        "weapon": "SG 553",
        "name": "Darkwing",
        "rarity": "restricted",
        "basePrice": 7.11,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-XD3Wb1ud4t95lRi67gVN24D7WmN2sdSqSalAmDpR2F-IDtxTpkYKyZrmzsQffgtgXzSmqjSNA8G81tFvCRYkS",
        "isSticker": false
      },
      {
        "id": "skin-e5f08d307bdd",
        "weapon": "SSG 08",
        "name": "Fever Dream",
        "rarity": "restricted",
        "basePrice": 6.45,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-VC3GV09FyouRoQha_nBovp3PTmYmqJHmeb1N1CpJyFOZftkO8x9ezNOOztg2MjYwRyyWsjn4d7n1q_a9cBq7gpQcW",
        "isSticker": false
      },
      {
        "id": "skin-45686ca4a063",
        "weapon": "AK-47",
        "name": "Phantom Disruptor",
        "rarity": "classified",
        "basePrice": 34.43,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlJfA6H-CbD2mEzuNJtOh6XTyjgRI1jDGMnYftb3qTbQMpCZVxF-8Ku0Xtw4XkYu2xtQSL3d5FxSz-3H5Ovy895epRA6E7uvqAsbzZtpo",
        "isSticker": false
      },
      {
        "id": "skin-f5a050fa5280",
        "weapon": "MAC-10",
        "name": "Disco Tech",
        "rarity": "classified",
        "basePrice": 48.74,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-dD2SCxNF6ueZhW2frkR5z4m_SyY37cnKRblIpW5smQOcO4EW7lYa1ZOjgtFCLg4wXnn72kGoXuTa4h8QB",
        "isSticker": false
      },
      {
        "id": "skin-a71a424b6eb1",
        "weapon": "MAG-7",
        "name": "Justice",
        "rarity": "classified",
        "basePrice": 47.16,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiVI0P-vb_NSKuWAGm6TxNF6ueZhW2fikUt36znWyNz_dn2ROgMhD5EiR7EO5BKxl4DlMLyx7gyNi4hAniz5kGoXuQ9OXJLa",
        "isSticker": false
      },
      {
        "id": "skin-4dd5dccd2fdd",
        "weapon": "M4A1-S",
        "name": "Player Two",
        "rarity": "covert",
        "basePrice": 134.78,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj-J6SCbhxUl_jDGMnYftby7BbVdyCsB0EeZY4RPukNfhZOO2sQ3W398Qy3_6jHxIunptsO9TUqs7uvqAAWrfZoM",
        "isSticker": false
      },
      {
        "id": "skin-3596d60709cc",
        "weapon": "Glock-18",
        "name": "Bullet Queen",
        "rarity": "covert",
        "basePrice": 199.39,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK6HLMXCR0-N3ueVsQRa_nBovp3PQydf4dXuSalUgCJZwRrILthi9kYDlMe_m4g2Ij90Um3moiXkc6SZj_a9cBgLxwlYC",
        "isSticker": false
      },
      {
        "id": "skin-vanilla-weapon_knife_gypsy_jackknife",
        "weapon": "★ Navaja Knife",
        "name": "Classic",
        "rarity": "gold",
        "basePrice": 2041.1,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKnr8ytd6s2pcbR-Oc-ZD2SbyuB_tuQnGXu1kBxw62_dwtird3qXZwQgXJV0E-4PtESxl4ezYr6x4FaMjI4UyzK-0H1iy36efQ",
        "isSticker": false
      },
      {
        "id": "skin-39fd7c139081",
        "weapon": "★ Navaja Knife",
        "name": "Marble Fade",
        "rarity": "gold",
        "basePrice": 986.81,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWQiihlxEijDuEnorGLSLANkI-DpolR7Vf5hK5kdTlNbiwsg3YiNlCm3mq3Cgd6iZusetRUPJx-qTT2xaBb-MDauzVhA",
        "isSticker": false
      },
      {
        "id": "skin-f69247021864",
        "weapon": "★ Navaja Knife",
        "name": "Tiger Tooth",
        "rarity": "gold",
        "basePrice": 999.47,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJse9WWyC0kA8YvC-ElIj8HifOOV5kFMMlRLJf4BK4k9LlZuy35QTYg95NzXmri3tB6yk4sO5XBaoh_PDRhgHfcepqTt5nFFY",
        "isSticker": false
      },
      {
        "id": "skin-3b5885a4c77d",
        "weapon": "★ Navaja Knife",
        "name": "Doppler",
        "rarity": "gold",
        "basePrice": 1360.09,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsexWXTyxjCIqsi-HlorwOy7DAVp5Xco0W-cMsRO5x92yMe3r51Pd3d5Nn3isiy9LvSli5OZRAqYmq6OEiAuQZeIjoc5Uu2hkHeU",
        "isSticker": false
      }
    ]
  },
  {
    "id": "bm_csgo_weapon1",
    "name": "Оружейный кейс CS:GO #1 (2013)",
    "subtitle": "Реликвия • AK-47 Поверхностная закалка (Blue Gem #661)",
    "category": "black_market",
    "price": 98,
    "accentColor": "#38BDF8",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bji61XxRCKg0MSz_nUDvPb-OPFvdKTFDzbAkbp16bY5Gn6wkx9ysj7Xntf9IC6WZgA-Sswnnj45WXo",
    "customChances": {
      "milspec": 30,
      "restricted": 35,
      "classified": 20,
      "covert": 10,
      "gold": 5
    },
    "items": [
      {
        "id": "skin-2ca8cb95f31e",
        "weapon": "MP7",
        "name": "Skulls",
        "rarity": "milspec",
        "basePrice": 51,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Ttk_Pm7ZKh-H_yaCW-Ej7l35OBoTCrmzUQht2mDwon7cHuWPFUlDcFxQ7EDtxbpx4W1Y-LltAfAy9USYNky6pY",
        "isSticker": false
      },
      {
        "id": "skin-b4a128e52d9e",
        "weapon": "AUG",
        "name": "Wings",
        "rarity": "milspec",
        "basePrice": 41.4,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk6fevfKxoMuOsD3KX_uJ_t-l9AX7qzE5_sGmEw9uoJCrBOgMoDsN2ReMI4EPrm4fvY-m04ASPgt8Uz3_gznQePzx-iqc",
        "isSticker": false
      },
      {
        "id": "skin-679e953fac9d",
        "weapon": "SG 553",
        "name": "Ultraviolet",
        "rarity": "milspec",
        "basePrice": 36.96,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I4M2-fbZ9LPWsAm6Xyfo44bQ-Tn7gwRt-t2uAw96tIn7FOAF1CsckQLUJ4xXskdO2NLzrtAyIi5UFk3tU_MwgmA",
        "isSticker": false
      },
      {
        "id": "skin-75c8474d12a2",
        "weapon": "Glock-18",
        "name": "Dragon Tattoo",
        "rarity": "restricted",
        "basePrice": 328.08,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2qeqVqL_6sCWufwuVJvOhuRz39xUl-6miDzI37dHyXOlIkA8MmROVfshO9w9G1Ye-ztgPX34tEyi74jjQJsHi_DRfxVg",
        "isSticker": false
      },
      {
        "id": "skin-3061aea08996",
        "weapon": "USP-S",
        "name": "Dark Water",
        "rarity": "restricted",
        "basePrice": 398.16,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSIf2sFGKS0-9JtOB7RBa_nBovp3OHy9v8J3vFbgIhC5UmQ7UIsxm7wNDnNr_rswOMiNlGmCWoiH9Juis9_a9cBl2xnYuj",
        "isSticker": false
      },
      {
        "id": "skin-795d725893f2",
        "weapon": "M4A1-S",
        "name": "Dark Water",
        "rarity": "restricted",
        "basePrice": 346.8,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GeMX2Vw_x3j-VoXSKMmRQguynLzI6td3-TPQAlD5slR-EJ5hDux9XmMe7i71CI2t8UzSuthi9OvSlo6vFCD_TltxSe0A",
        "isSticker": false
      },
      {
        "id": "skin-5fd3ee42a6c4",
        "weapon": "AK-47",
        "name": "Case Hardened",
        "rarity": "classified",
        "basePrice": 919.8,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNK0P2nZKFpH_yaCW-Ej7sk5bE8Sn-2lEpz4zndzoyvdHuUPwFzWZYiE7EK4Bi4k9TlY-y24FbAy9USGSiZd5Q",
        "isSticker": false
      },
      {
        "id": "skin-be4448a9c6e2",
        "weapon": "Desert Eagle",
        "name": "Hypnotic",
        "rarity": "classified",
        "basePrice": 1008.12,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7vORfqF_NPmUAVicyOl-pK9qSyyywxgjtmnVytyocnLGPA4iWcYmRLYIu0S-xtbuMLjg51DXjoJC02yg2VjGnh4J",
        "isSticker": false
      },
      {
        "id": "skin-69390026d135",
        "weapon": "AWP",
        "name": "Lightning Strike",
        "rarity": "covert",
        "basePrice": 9814.8,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k4_upYLBjKf6UMWaH0dF6ueZhW2frwU1_sW2EmNyvc32RZwMpCpcjQ-EJ4xbtmt3gYezk4wzb3tpAy3mrkGoXubsGIfVN",
        "isSticker": false
      },
      {
        "id": "skin-vanilla-weapon_bayonet",
        "weapon": "★ Bayonet",
        "name": "Classic",
        "rarity": "gold",
        "basePrice": 130003.32,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKni_DtU4fe6Jv07IfTDDT_JkL4htLI7HCvmwE9z42_Vzov4ci2Wa1IgWMN3R7IMuxCm0oqwYUAZNBA",
        "isSticker": false
      },
      {
        "id": "skin-95831ce7c492",
        "weapon": "★ Bayonet",
        "name": "Fade",
        "rarity": "gold",
        "basePrice": 60528.48,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POvV6JsJPWsAm6Xyfo45-BrHniwzUh24jjVm4qgInnCOA4mDscmEeVcsBXtkN22P-yx5waNg5UFk3tAoG85FQ",
        "isSticker": false
      },
      {
        "id": "skin-8084beee1235",
        "weapon": "★ Bayonet",
        "name": "Slaughter",
        "rarity": "gold",
        "basePrice": 130244.16,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV75oIuKSMWuZxuZi_uU7HyjhwUh-tm_Xydmuc3nGbwN2ApAmQeNfsUXtktOzYuLm5FPajN9bjXKpLQ8HVlE",
        "isSticker": false
      },
      {
        "id": "skin-1a4722df3bb9",
        "weapon": "★ Bayonet",
        "name": "Case Hardened",
        "rarity": "gold",
        "basePrice": 57331.32,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PO_V6tkLPWXMWuZxuZi_uRrSXDlzUtw4WTRwtj4eX6XPAd0XsEiROcNthm-w4HhP-Pq7waKiItbjXKppDMdu0I",
        "isSticker": false
      }
    ]
  },
  {
    "id": "bm_hydra",
    "name": "Кейс операции «Гидра» (Hydra)",
    "subtitle": "Редкий архив • AWP Они Тайдзи и Перчатки Гидра",
    "category": "black_market",
    "price": 42,
    "accentColor": "#10B981",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frHUVt_b6PfY1JfOSXDXJxbgjtLFqHnDqx0Qmtm_Vzdf4ICmUZlJ2C5F2TPlK7EdjN0FcPg",
    "customChances": {
      "milspec": 35,
      "restricted": 35,
      "classified": 18,
      "covert": 8,
      "gold": 4
    },
    "items": [
      {
        "id": "skin-d2ff95e10b1f",
        "weapon": "USP-S",
        "name": "Blueprint",
        "rarity": "milspec",
        "basePrice": 21.2,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA0tF0vPRsXzu6mwkYvzSCkpu3IiqTZgAmCJIlRLEP5BXpxtPlMOOxswPZithFyyj3iyNPvCo96r1QBb1lpPPa5SpubA",
        "isSticker": false
      },
      {
        "id": "skin-72470f196aad",
        "weapon": "FAMAS",
        "name": "Macabre",
        "rarity": "milspec",
        "basePrice": 11.9,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1I_82oaalsM8-eD2SRw_xzj-1gSCGn2xkm5myEzo2sdXPBagInW5pxTLICshnswdOxNrzj71fc2d5CzC76iSJXrnE8xi9ndzw",
        "isSticker": false
      },
      {
        "id": "skin-c254f71da49b",
        "weapon": "M4A1-S",
        "name": "Briefing",
        "rarity": "milspec",
        "basePrice": 13.25,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj-xsWzu6gRg1sgKJk4jxNWWTZgclDpNzQ7FZsESxxNPgZujksVDf2dkTmS343S1M731t5OcLAvZ05OSJ2NaAMPYY",
        "isSticker": false
      },
      {
        "id": "skin-3f4120c9e552",
        "weapon": "MAC-10",
        "name": "Aloha",
        "rarity": "milspec",
        "basePrice": 11.75,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a4s2jaac8cM-SAmiYwNF6ueZhW2flxhsmtW3RnNiscnOWPA9xC5MiTeUKtRXqk9HgMOvh4wPd3tkQmXn6kGoXucQMChaB",
        "isSticker": false
      },
      {
        "id": "skin-f316468861b1",
        "weapon": "MAG-7",
        "name": "Hard Water",
        "rarity": "milspec",
        "basePrice": 21.25,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiNW0P-vb_NSI_GGHXOZwtF6ueZhW2eykx534j_VydygIi6fPQJ0DJcmQrIMukK7k9HvZO224FbajI8WnC-tkGoXudK2z8cj",
        "isSticker": false
      },
      {
        "id": "skin-83039fec2ec8",
        "weapon": "Tec-9",
        "name": "Cut Out",
        "rarity": "milspec",
        "basePrice": 13.4,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiNK0Oara_1SI_iSAmyv0e9ipOR7QRa_nBovp3OGnNb4dHiTaFdzX5EjRLVY5EG6mtOzYu7q4FDb2IxBynmvi34bvCo__a9cBktm4Qsf",
        "isSticker": false
      },
      {
        "id": "skin-289b0ffc81ae",
        "weapon": "UMP-45",
        "name": "Metal Flowers",
        "rarity": "milspec",
        "basePrice": 21.1,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1a_s27ZbQ5dc-VAmadxOh6v_ZsXRa_nBovp3PTnN2vc3zGaFAgWMZ4F-MDsBW7kNXhP7i04gCI2oNDyij8iSpI7S84_a9cBuxmxCPI",
        "isSticker": false
      },
      {
        "id": "skin-b54386e7c78c",
        "weapon": "AK-47",
        "name": "Orbit Mk01",
        "rarity": "restricted",
        "basePrice": 191.15,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlV6diLP-dFzfB_vxztN5lRi67gVMk4TmEn9n_c3PGPwZyDMckTO8JsEPuktG1ZOrjsgPX2IwUyiyv3S0f8G81tLnuvOvF",
        "isSticker": false
      },
      {
        "id": "skin-ebbde3e289ee",
        "weapon": "P2000",
        "name": "Woodsman",
        "rarity": "restricted",
        "basePrice": 205.25,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMW-Fz_pzot5lRi67gVMi5GuBzo6sJXiSOAJxCMR2RuECthTskNG1Yrm3sgCM345CyCj32yJP8G81tLtUlzXH",
        "isSticker": false
      },
      {
        "id": "skin-a73d69feecaf",
        "weapon": "P250",
        "name": "Red Rock",
        "rarity": "restricted",
        "basePrice": 193.05,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSIeiaAWqvzedxuPUnSizhkEh05zzQmIr8JX6UbAZ2DsMhTOEOthexl9e2NuLktAzaiIpGnjK-0H2BmRk7ww",
        "isSticker": false
      },
      {
        "id": "skin-73449301d7a3",
        "weapon": "P90",
        "name": "Death Grip",
        "rarity": "restricted",
        "basePrice": 136.6,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf9Ttk_6v-V6ZsMvWRAWmV0tF0vPRscCW6khUz_WqAy4z6cX2Tbg8hWJN2RLQMsRPplNDmYr63sVPciIkTyij3iX5M7yt1o7FVUmFnInA",
        "isSticker": false
      },
      {
        "id": "skin-d9516fc63729",
        "weapon": "SSG 08",
        "name": "Death's Head",
        "rarity": "restricted",
        "basePrice": 105.85,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-XC2aEyf1-teBtcCW6khUz_WTXyNipeX-QOlQhXpJwFuYO4xLqxobuN7vn4QaNgthBnHn7iSJPv351o7FVSPuLyfc",
        "isSticker": false
      },
      {
        "id": "skin-81ad76182a96",
        "weapon": "Dual Berettas",
        "name": "Cobra Strike",
        "rarity": "classified",
        "basePrice": 922.6,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhIvWBC3OEwP1Js-5rXSiMmRQguynLydn9JXmUOwMgCsN1EbMPsRHtxoDuZrzm4VTait4Tzn_-jn4f7ipu4fFCD_Qo-zseRg",
        "isSticker": false
      },
      {
        "id": "skin-99def93a5fe2",
        "weapon": "Galil AR",
        "name": "Sugar Rush",
        "rarity": "classified",
        "basePrice": 644.25,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWSRz-pvs-loQDqMmRQguynLyNqpJX_CPwUpXpEmEOMLs0K-kdPiN-uz4wfW2IgWyySr2ixKvCht4fFCD_QYspg1jQ",
        "isSticker": false
      },
      {
        "id": "skin-12d0c696aacd",
        "weapon": "M4A4",
        "name": "Hellfire",
        "rarity": "classified",
        "basePrice": 566.9,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSKPWfAmGZ0-tJvOhuRz39zEp24GTXmImsInqWP1AkXpBwE7FetUTswdfkPu7h5QXXithBy32t2DQJsHhDPmtuAA",
        "isSticker": false
      },
      {
        "id": "skin-06e2ad662c73",
        "weapon": "Five-SeveN",
        "name": "Hyper Beast",
        "rarity": "covert",
        "basePrice": 3665.45,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-lwXyyhlxgmoCm6lob-KT-JO1QgWZVyELEPu0W4l9KzYbzn5Fbf3YkTzn_8hihIvXxtsOoFUKYirLqX0V_f6-eqCw",
        "isSticker": false
      },
      {
        "id": "skin-cfaaa2fab447",
        "weapon": "AWP",
        "name": "Oni Taiji",
        "rarity": "covert",
        "basePrice": 4149.3,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6xsLv6KD1icyOl-pK9vGCqwkx524G_WnNmsInyXOAVyXJJ0TbNb5EOxxIflYbzj4gDdiNlC02yg2XaKgrAq",
        "isSticker": false
      },
      {
        "id": "skin-de7d4238a5c9",
        "weapon": "★ Bloodhound Gloves",
        "name": "Snakebite",
        "rarity": "gold",
        "basePrice": 43013.9,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSI0vTyOn5zyKCX4PERxSdEfGb5d6lSmxIfuMezmtFfb39lAxCivh3hI6Chi4eYGWfAt8vXTiw_EM7Q_t5NWIeHnE0qrynbE1A",
        "isSticker": false
      },
      {
        "id": "skin-4e17d497a43e",
        "weapon": "★ Bloodhound Gloves",
        "name": "Bronzed",
        "rarity": "gold",
        "basePrice": 36678.7,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIqtimEloPwIhTLN1F4Tox2Q7UJ4RLrltDkMuyz4ASIg4kUxCr5jy8fvC46sLtWWaojqKze2giTL_Rjtvi23tdj",
        "isSticker": false
      },
      {
        "id": "skin-c9241d03e33b",
        "weapon": "★ Bloodhound Gloves",
        "name": "Charred",
        "rarity": "gold",
        "basePrice": 53094.7,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIlvzyGkbDqKCfRO0RPVssnHaMUsES-k9HjNrixsgbd3YIRni7-inlO5i5t6-pRAqIs_aOFjg_JZbU5sI5Deqh-Veq-pA",
        "isSticker": false
      },
      {
        "id": "skin-cd619968abb9",
        "weapon": "★ Bloodhound Gloves",
        "name": "Guerrilla",
        "rarity": "gold",
        "basePrice": 26280.5,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIgpjiXiIb1LSr4Ml93UtZuR7QKthCwl4fkNuqw4lPXgosRzi78inwdvyk45e5UUqQkq_aDi1rEZap9v8fy7GQdug",
        "isSticker": false
      }
    ]
  },
  {
    "id": "bm_glove_case",
    "name": "Перчаточный кейс (Glove Case)",
    "subtitle": "Чёрный рынок • Повышенный шанс на Изумрудные Перчатки!",
    "category": "black_market",
    "price": 38,
    "accentColor": "#FACC15",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frHcVuPaoafU1JqiVWWSVkux15OQ8Giiylk0k5mvTnIqpd3PCaQIhWMYkE_lK7EcNeCKW-w",
    "customChances": {
      "milspec": 25,
      "restricted": 35,
      "classified": 20,
      "covert": 10,
      "gold": 10
    },
    "items": [
      {
        "id": "skin-6f20b68a8c63",
        "weapon": "CZ75-Auto",
        "name": "Polymer",
        "rarity": "milspec",
        "basePrice": 14.56,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2tcrI_H_2VMWuZxuZi_rcwSnHjwxgh527SzI6oIHKUZ1dxA8ckTbUCskG6ldTuY-nh5FTf34JbjXKpj6qz0B4",
        "isSticker": false
      },
      {
        "id": "skin-19a7e921eb77",
        "weapon": "Glock-18",
        "name": "Ironwork",
        "rarity": "milspec",
        "basePrice": 20.32,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a_s2pZKtuK8-XD3WbjOh3vO1WQyC0nQlp5jmEmNaodH6VbwMnApshEOcPskOww4e0N-qz5lPZ2YlGyCSviika6zErvbhhWFzqpw",
        "isSticker": false
      },
      {
        "id": "skin-df49957ef56b",
        "weapon": "MP7",
        "name": "Cirrus",
        "rarity": "milspec",
        "basePrice": 11,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf-jFk6fugaahSMP-cAmOVwOpg4t5lRi67gVMj5j6Dwtaocy6UOAIgApNyQrQOshS7lIXlMbvqslHfi41Eyi7823xK8G81tHGGql6L",
        "isSticker": false
      },
      {
        "id": "skin-2c0ae1658110",
        "weapon": "Galil AR",
        "name": "Black Sand",
        "rarity": "milspec",
        "basePrice": 11.2,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfMWaCjO13ve5WQyC0nQlp5T7dzoqpeX3FZ1R2DZd4Qe4CtRS_k9y0Ye7qtQOP2oxAyX73iytK6TErvbi0QhR0PQ",
        "isSticker": false
      },
      {
        "id": "skin-40273e06d839",
        "weapon": "MP9",
        "name": "Sand Scale",
        "rarity": "milspec",
        "basePrice": 22.44,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_CNk5_uqbelgMKmsAm6Xyfo4tuA9TnDrzB5w5GTczo74cnyTblAkWcclRuYIuhXplde2ZePl4FTc2ZUFk3tXKn8xpQ",
        "isSticker": false
      },
      {
        "id": "skin-cc6ec471ea94",
        "weapon": "MAG-7",
        "name": "Sonar",
        "rarity": "milspec",
        "basePrice": 9.92,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiNW0P-vb_NSLfGfCGiCzNF6ueZhW2fgxEol4TnQyo2qd3qTPwQhD5d0F-YPuhHpwNHlZLvi5VTY3dhAy339kGoXufaFAiYQ",
        "isSticker": false
      },
      {
        "id": "skin-d044427dd6f6",
        "weapon": "P2000",
        "name": "Turf",
        "rarity": "milspec",
        "basePrice": 11.16,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PW9V7Q_cKDDQ3SAzvxij-1gSCGn20h14mSByd6vJXmUagQoXpMkQecN40Xsm4DhM-3k4lTY340UxCn53HhXrnE88VIlnLo",
        "isSticker": false
      },
      {
        "id": "skin-54963e630d31",
        "weapon": "Dual Berettas",
        "name": "Royal Consorts",
        "rarity": "restricted",
        "basePrice": 167.56,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1c_M2qfaVhH_KWHGKE1e9lj-ZmQy22myIxtjOMmYrGLSLANkI-C5AjFOcM5EaxxtTmPrnl4Q2Ki91Eyyz32y1Luyk44u4LUqEjr_ff3BaBb-MmOWu8Lw",
        "isSticker": false
      },
      {
        "id": "skin-00b8673938d7",
        "weapon": "G3SG1",
        "name": "Stinger",
        "rarity": "restricted",
        "basePrice": 79.4,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1c_M2pO7dqcc-FB3eV09Fvte1lQD6MmRQguynLyo6rdH-RPAZ0D8chQeIL50TukdK2P-_rtFPejN8WmH34jylJvHtq5fFCD_TvHmnxYA",
        "isSticker": false
      },
      {
        "id": "skin-3795f6827a11",
        "weapon": "M4A1-S",
        "name": "Flashback",
        "rarity": "restricted",
        "basePrice": 144.24,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9Jtu1oXCGxlB4sjDGMnYftb3yVPQFyDMB3EbJZ5xC4kNPvMOO35AHW3d1AnC_3iHlNuytqtuYDVfI7uvqAZWXE-YM",
        "isSticker": false
      },
      {
        "id": "skin-b935cdf1da4b",
        "weapon": "Nova",
        "name": "Gila",
        "rarity": "restricted",
        "basePrice": 109.36,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiNW0PyhfqVSM_GdClicyOl-pK8wHnrrwU8hsW2DyoqgeSieblIkDJZwQu8Cs0TultLgP76051SPid9N02yg2S7-0Sao",
        "isSticker": false
      },
      {
        "id": "skin-95653cc7fb0e",
        "weapon": "USP-S",
        "name": "Cyrex",
        "rarity": "restricted",
        "basePrice": 96.76,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_u1vouRxcCW6khUz_TjdzdmsJyiTZg8kX8N4ELUP5EPsw9G1YeLn5VTXjY0WxS6rhiIYuCd1o7FV2N83Spg",
        "isSticker": false
      },
      {
        "id": "skin-ea2876c00b6b",
        "weapon": "FAMAS",
        "name": "Mecha Industries",
        "rarity": "classified",
        "basePrice": 601.04,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2oaalsM8-eC2SYwNF6ueZhW2ewwx4hsm3dz46heSjCPVUjC8chEOYMtxOwkNHiYb63swXY3Y9Nn32skGoXuc3DGOrc",
        "isSticker": false
      },
      {
        "id": "skin-6772919e8e84",
        "weapon": "P90",
        "name": "Shallow Grave",
        "rarity": "classified",
        "basePrice": 737.64,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf-jFk_6v-V7dlIfyfAXCvxvx3puRWQyC0nQlpsWzUyIqvcCiVPFQnW8YmEO4P5xi6xNS2Num35FbX34lCzX7_hytK5zErvbi02RizsA",
        "isSticker": false
      },
      {
        "id": "skin-9a257b12e3fd",
        "weapon": "Sawed-Off",
        "name": "Wasteland Princess",
        "rarity": "classified",
        "basePrice": 677.16,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZt6MM-AD3CVxeFwtt5lRi67gVMksWuEmduuIH2fPwUkWJojQuMP5xi8lNzlY-234lDag4xFnin_jihN8G81tH9UxALW",
        "isSticker": false
      },
      {
        "id": "skin-318f343e125d",
        "weapon": "SSG 08",
        "name": "Dragonfire",
        "rarity": "covert",
        "basePrice": 2939.44,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-XHGaXzuBwufNscDqwmg0ijDGMnYftbyrFPVAoWcQjELQOuxO4k4e1N-nnsQfW2I5Mz3ivi3wb7Stj5ukAUKY7uvqAqS55_Pw",
        "isSticker": false
      },
      {
        "id": "skin-01d7c60eddbb",
        "weapon": "M4A4",
        "name": "Buzz Kill",
        "rarity": "covert",
        "basePrice": 4481.96,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSM_WQGmiC_uJ_t-l9AX22kBh0tm3Qn92qdS7GPARyW5t0QLQD4xi6w9XkZe3jsgDW3ogUnH3gznQeqfpfmso",
        "isSticker": false
      },
      {
        "id": "skin-de7d4238a5c9",
        "weapon": "★ Bloodhound Gloves",
        "name": "Snakebite",
        "rarity": "gold",
        "basePrice": 34161.16,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSI0vTyOn5zyKCX4PERxSdEfGb5d6lSmxIfuMezmtFfb39lAxCivh3hI6Chi4eYGWfAt8vXTiw_EM7Q_t5NWIeHnE0qrynbE1A",
        "isSticker": false
      },
      {
        "id": "skin-4e17d497a43e",
        "weapon": "★ Bloodhound Gloves",
        "name": "Bronzed",
        "rarity": "gold",
        "basePrice": 25144.12,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIqtimEloPwIhTLN1F4Tox2Q7UJ4RLrltDkMuyz4ASIg4kUxCr5jy8fvC46sLtWWaojqKze2giTL_Rjtvi23tdj",
        "isSticker": false
      },
      {
        "id": "skin-c9241d03e33b",
        "weapon": "★ Bloodhound Gloves",
        "name": "Charred",
        "rarity": "gold",
        "basePrice": 35746.16,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIlvzyGkbDqKCfRO0RPVssnHaMUsES-k9HjNrixsgbd3YIRni7-inlO5i5t6-pRAqIs_aOFjg_JZbU5sI5Deqh-Veq-pA",
        "isSticker": false
      },
      {
        "id": "skin-cd619968abb9",
        "weapon": "★ Bloodhound Gloves",
        "name": "Guerrilla",
        "rarity": "gold",
        "basePrice": 20517.76,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIgpjiXiIb1LSr4Ml93UtZuR7QKthCwl4fkNuqw4lPXgosRzi78inwdvyk45e5UUqQkq_aDi1rEZap9v8fy7GQdug",
        "isSticker": false
      }
    ]
  },
  {
    "id": "bm_syndicate",
    "name": "Сейф «Легенды Коллекций»",
    "subtitle": "Эксклюзив • Dragon Lore, Gungnir, Medusa, Вой, Дикий лотос",
    "category": "black_market",
    "price": 125,
    "accentColor": "#F59E0B",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frHAVuKf7PaJucPLHW2TExb9z4OdvHirixEomtW7cyduvci2VZ1AiCsR2Q_lK7EdW_VBhrw",
    "customChances": {
      "milspec": 0,
      "restricted": 30,
      "classified": 35,
      "covert": 25,
      "gold": 10
    },
    "items": [
      {
        "id": "bm_deagle_blaze",
        "weapon": "Desert Eagle",
        "name": "Blaze (Пламя)",
        "rarity": "restricted",
        "basePrice": 680,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7vORbqhsLfWAMWuZxuZi_uI_TX6wxxkjsGXXnImsJ37COlUoWcByEOMOtxa5kdXmNu3htVPZjN1bjXKpkHLRfQU"
      },
      {
        "id": "bm_glock_fade",
        "weapon": "Glock-18",
        "name": "Fade (Градиент)",
        "rarity": "restricted",
        "basePrice": 1250,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a7s2oaaBoH_yaCW-Ej-8u5bZvHnq1w0Vz62TUzNj4eCiVblMmXMAkROJeskLpkdXjMrzksVTAy9US8PY25So"
      },
      {
        "id": "bm_m4_hotrod",
        "weapon": "M4A1-S",
        "name": "Hot Rod (Хот-род)",
        "rarity": "classified",
        "basePrice": 920,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GdMXWVxdF75OA4XBa_nBovp3PXyt2uJ32QaQciDZUhReUM5hLskdy2Pu_n4wLe2doXm3j-2i5A7X5i_a9cBuWkb97d"
      },
      {
        "id": "bm_ak_fireserp",
        "weapon": "AK-47",
        "name": "Fire Serpent (Огненный змей)",
        "rarity": "classified",
        "basePrice": 1450,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0PSneqF-JeKDC2mE_u995LZWTTuygxIYvzSCkpu3cnvFPQB2DpUkROFY4Rntw93lP7i241DbiI1BxSuviHlKunk_6-sHU71lpPMTRLyP4Q"
      },
      {
        "id": "bm_m4_jungle",
        "weapon": "M4A1-S",
        "name": "Welcome to the Jungle",
        "rarity": "classified",
        "basePrice": 2150,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9Jo-9oRCyMmRQguynLzYqgInjGZlcnX5ciE-IPthLrkN3hYu_ltQPW3Y1NzSn-jCpJ6ydpsvFCD_TdxQe8NQ"
      },
      {
        "id": "bm_awp_medusa",
        "weapon": "AWP",
        "name": "Medusa (Медуза)",
        "rarity": "covert",
        "basePrice": 4400,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk4veqfbdsH_GEHlicyOl-pK85TC23wk12tWSGnNr6JXqRPVUnA5J5RLIKshS-l4HuYbji7lfajdgU02yg2bOcOBD3"
      },
      {
        "id": "bm_awp_prince",
        "weapon": "AWP",
        "name": "The Prince (Принц)",
        "rarity": "covert",
        "basePrice": 3900,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6FjIf2WAlicyOl-pK9qHXHkw093sGvTw4uqJSnDPQAkCsNyEbZcshiwxtK0Yumz4gbX2o9C02yg2f5NtC8l"
      },
      {
        "id": "bm_ak_lotus",
        "weapon": "AK-47",
        "name": "Wild Lotus (Дикий лотос)",
        "rarity": "covert",
        "basePrice": 9200,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV61-LPGdCliWzeFkse1WQyC0nQlpsDuGyt-pdnyRPA4hDcYkR-QPuhi-wdPuYbyx5AaMidkQnC_-2ilIuzErvbi4ijV5Mw"
      },
      {
        "id": "bm_m4_howl",
        "weapon": "M4A4",
        "name": "Howl (Вой)",
        "rarity": "covert",
        "basePrice": 5800,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afVSKP-EAm6extF6ueZhW2exwkl2tmTXwt39eCiUPQR2DMN4TOVetUK8xoLgM-K341eM2otDnC6okGoXufBz_TAB"
      },
      {
        "id": "bm_awp_gungnir",
        "weapon": "AWP",
        "name": "Gungnir (Гунгнир)",
        "rarity": "covert",
        "basePrice": 9800,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6N4LvedB3WvzedxuPUnHnjnzUl0sWrdztitI3rDZgJzAsZ1QOFY4UPqldDgMO_l41HXit9AmTK-0H227dAsvQ"
      },
      {
        "id": "bm_awp_dlore",
        "weapon": "AWP",
        "name": "Dragon Lore (История о драконе)",
        "rarity": "gold",
        "basePrice": 12500,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk4veqYaF7IfysCnWRxuF4j-B-Xxa_nBovp3Pdwtj9cC_GaAd0DZdwQu9fuhS4kNy0NePntVTbjYpCyyT_3CgY5i9j_a9cBkcCWUKV"
      }
    ]
  },
  {
    "id": "bm_knives_gloves",
    "name": "Кейс «100% Ножи и Перчатки»",
    "subtitle": "Чёрный рынок • Только Элитные Ножи и Перчатки!",
    "category": "black_market",
    "price": 390,
    "accentColor": "#FFD700",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnAVvfb6aqduc_TFVjTCxbx05OU4S3jilE9w4DzRnImtIy2Sa1JzDJEhRPlK7EcO4U8gfA",
    "customChances": {
      "milspec": 0,
      "restricted": 0,
      "classified": 0,
      "covert": 25,
      "gold": 75
    },
    "items": [
      {
        "id": "kg_1",
        "weapon": "★ Karambit",
        "name": "Fade (Градиент)",
        "rarity": "gold",
        "basePrice": 3200,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SD1iWwOpzj-1gSCGn20tztm_UyIn_JHKUbgYlWMcmQ-ZcskSwldS0MOnntAfd3YlMzH35jntXrnE8SOGRGG8"
      },
      {
        "id": "kg_2",
        "weapon": "★ Butterfly Knife",
        "name": "Fade (Градиент)",
        "rarity": "gold",
        "basePrice": 3650,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2avx-9ytd5lRi67gVNwsDvSwtqqc3iXZg4kCZYjReYLtRbum9XgYuvm5wbWjtgUzCn3iSsf8G81tFEeH9rw"
      },
      {
        "id": "kg_3",
        "weapon": "★ Butterfly Knife",
        "name": "Lore (Легенды)",
        "rarity": "gold",
        "basePrice": 2950,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsDXKvw_tipOR7SSWqqhEooTi6lob-KT-JZw90XJMiTO8PukW4wIXmN-zq5gXf2tpBm37_2y4auylv5exUAKAi_7qX0V8Ly4BE2w"
      },
      {
        "id": "kg_4",
        "weapon": "★ M9 Bayonet",
        "name": "Crimson Web (Кровавая паутина)",
        "rarity": "gold",
        "basePrice": 2400,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMW-J_vlzsvJWQyC0nQlp4GrWzYuqeHjDZlN1XJohTecO5xawwdDvNuLm5wPcjY0QzyX83Xsd7zErvbgxKe4lfw"
      },
      {
        "id": "kg_5",
        "weapon": "★ Sport Gloves",
        "name": "Vice (Порок)",
        "rarity": "gold",
        "basePrice": 2800,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_KfG2Kv0ed4u95lRi67gVNx4T-Bw434IHyVb1QlAsd1FOUDthG4xNznMu3m4QXXg90Wzn_33C1I8G81tLaDi_rK"
      },
      {
        "id": "kg_6",
        "weapon": "★ Sport Gloves",
        "name": "Pandora's Box (Ящик Пандоры)",
        "rarity": "gold",
        "basePrice": 4900,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H-CGHHecxNF6ueZhW2exk01w4j7cmYn4eHPCbAMhApdwTOIN5BPsx9yyYu605FTeid0Uy3j3kGoXueKyz5wo"
      },
      {
        "id": "kg_7",
        "weapon": "★ Sport Gloves",
        "name": "Hedge Maze (Живая изгородь)",
        "rarity": "gold",
        "basePrice": 4200,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_eBC2Ke_uJ_t-l9AX21whwi4Gndnov9JH_FblMlCJYjRbFZtkWww4HnNbjr7wWN39gUmH7gznQeohQBtY8"
      },
      {
        "id": "kg_8",
        "weapon": "★ Talon Knife",
        "name": "Fade (Градиент)",
        "rarity": "covert",
        "basePrice": 1450,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWaR_uh3tORWQyC0nQlpsmXcnNaoeHuTZwUiWMZzRrVZsxm9x9ThNrzj4QCPjdhNmHj73S9KujErvbhX2ACGeQ"
      }
    ]
  },
  {
    "id": "bm_sapphire_emerald",
    "name": "Сейф «Сапфир, Изумруд и Blue Gem»",
    "subtitle": "Ультра-хайролл • Самые дорогие паттерны в истории CS2",
    "category": "black_market",
    "price": 750,
    "accentColor": "#00F0FF",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnEVvqf_a6VoIfGSXz7Hlbwg57QwSS_mxhl15jiGyN37c3_GZw91W8BwRflK7EfKsa2sfw",
    "customChances": {
      "milspec": 0,
      "restricted": 0,
      "classified": 20,
      "covert": 30,
      "gold": 50
    },
    "items": [
      {
        "id": "se_1",
        "weapon": "AWP",
        "name": "Fade (Градиент)",
        "rarity": "classified",
        "basePrice": 1350,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_CNk7uW-V6JsJPWsAm6Xyfo45-c5GXDnwB534DuEwtuoIHOfaAYiAsYjF-QItUaxmoC0MO_h5ALcjJUFk3sEzfdk4w"
      },
      {
        "id": "se_2",
        "weapon": "M4A4",
        "name": "Eye of Horus (Глаз Гора)",
        "rarity": "classified",
        "basePrice": 1100,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSMvGsAm6Xyfo46eU5H3DnlxlytTyDwtr_JHmQZw4hC5R5RrRbtRO5xtCyZrzktgCI2ZUFk3sFC5kC3A"
      },
      {
        "id": "se_3",
        "weapon": "★ Skeleton Knife",
        "name": "Crimson Web (FN)",
        "rarity": "covert",
        "basePrice": 3100,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I5PeibbBiLs-bF1iHxOxlj-1gSCGn2011t26Bytr_cn-VZwciXJskRLQKuka9k4ezYrnqtQXf2YhGzC6viXxXrnE8k9yhp-k"
      },
      {
        "id": "se_4",
        "weapon": "★ M9 Bayonet",
        "name": "Doppler Sapphire",
        "rarity": "gold",
        "basePrice": 9800,
        "image": "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Kmsj2P7rSnXtU6dd9teTA5475jV2urhcDPzCkfMKLcAE-aV3R-lO5l-e61sfqvZ2fyiBgvikqsXiMyRGw1U1Ja-dm06adSULeWfJvEZCxug"
      },
      {
        "id": "se_5",
        "weapon": "★ Karambit",
        "name": "Gamma Doppler Emerald",
        "rarity": "gold",
        "basePrice": 11400,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SA1iVzOtkse1tcCSyhx8rtjSfn4vGLSLANkI-X8MjTLFYskTsw9bnZOuwsgSIj4sTniz-2i5A7yY6tbwGV6Nx-qGEjxaBb-MuPavopw"
      },
      {
        "id": "se_6",
        "weapon": "★ Butterfly Knife",
        "name": "Gamma Doppler Emerald",
        "rarity": "gold",
        "basePrice": 15800,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2qvxONzouBlSxa-lA8lvziMgIr9HifOOV5kFJp2Ee9b4Rntm4GxY7_ntQHc2o1DmH6r3Hgcv3w4t-pXU6ZzrPHQjQnfcepq0dwfRJw"
      },
      {
        "id": "se_7",
        "weapon": "★ Karambit",
        "name": "Case Hardened (Blue Gem #387)",
        "rarity": "gold",
        "basePrice": 25000,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SH1ifyOJztN5lRi67gVNz5DvUmdj4eXuWOFAhAsF4RLFc5BC4xtbuY7yx7wDbgo9CzSj2h3xK8G81tB_XeHWq"
      }
    ]
  },
  {
    "id": "cap_cph2024",
    "name": "Капсула Легенд | Копенгаген 2024",
    "subtitle": "Официальная капсула CS2 • Бумага, Блёстки, Голо, Золото",
    "category": "capsules",
    "price": 0.99,
    "accentColor": "#38BDF8",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk7OKmOvQ_dM-fC2CVz-pl_rZvTXDqzRxw523Rm4mocy6QOgUmDcR4Q-8Mu0O5wNPkNuLnsleL3tlbjXKpQyK7hjg",
    "items": [
      {
        "id": "sticker-7254",
        "weapon": "Natus Vincere",
        "name": "Copenhagen 2024",
        "rarity": "milspec",
        "basePrice": 0.62,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI6-obi4xe_F0SpycTm_3NfuauvafFpIfHBXmTImLoj5bVtSSqxkxx04GzQn9esbzvJOV84pacW",
        "isSticker": true
      },
      {
        "id": "sticker-7258",
        "weapon": "Virtus.pro",
        "name": "Copenhagen 2024",
        "rarity": "milspec",
        "basePrice": 0.51,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI64pe6ugvkFUWgnc6xrnsKuKP9bPNscqjFDzHHlu90sbM5TX2wxkp14WTUnMHpLyyrjSYF-g",
        "isSticker": true
      },
      {
        "id": "sticker-7262",
        "weapon": "G2 Esports",
        "name": "Copenhagen 2024",
        "rarity": "milspec",
        "basePrice": 0.52,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI689W6vwzjRU3zzZW4rncCuPf_OvY_I6KRX2HEwO0ltuQ8GS_gxUt_4juAnsHpLyxV8rB6kA",
        "isSticker": true
      },
      {
        "id": "sticker-7266",
        "weapon": "FaZe Clan",
        "name": "Copenhagen 2024",
        "rarity": "milspec",
        "basePrice": 0.93,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI68obu7xfjQB7zyMLlqHRdvPSsMaY5I6fDXjLFk-8ls7Y_HH7jlksl4jjcztqhbzvJOdEYnDi_",
        "isSticker": true
      },
      {
        "id": "sticker-7270",
        "weapon": "Team Spirit",
        "name": "Copenhagen 2024",
        "rarity": "milspec",
        "basePrice": 0.6,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI655f9-BflEhimnc_i_nID7KD9MPVsIfPBCDCTlLly5LRoTirnzRxx4WzSyt36bzvJOfPBN-a5",
        "isSticker": true
      },
      {
        "id": "sticker-7274",
        "weapon": "Vitality",
        "name": "Copenhagen 2024",
        "rarity": "milspec",
        "basePrice": 0.83,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI64o7g6xeyFET3n5Dm_yEDuqqvPPdrcPPCVjfHxblw4LZsH33rxEtz4WrWztehbzvJOfadTm_6",
        "isSticker": true
      },
      {
        "id": "sticker-7278",
        "weapon": "MOUZ",
        "name": "Copenhagen 2024",
        "rarity": "milspec",
        "basePrice": 0.67,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI6-Yjh8Be0Eh6in8WypHtevaf9PfNsJqPECjLGl-wh57doG3_hk05wsGXRyIqhbzvJOX5ask-j",
        "isSticker": true
      },
      {
        "id": "sticker-7282",
        "weapon": "Complexity Gaming",
        "name": "Copenhagen 2024",
        "rarity": "milspec",
        "basePrice": 0.77,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI695f48he3EEr1yJKxqHECt_esaqU9JaTHDDTHwr8vtbk-GHznlx525GTTw9_8bzvJOSvtUTwO",
        "isSticker": true
      },
      {
        "id": "sticker-7350",
        "weapon": "PGL",
        "name": "Copenhagen 2024",
        "rarity": "milspec",
        "basePrice": 0.64,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI65ID4pFrhR0ilx5C5rXoI6aX4aqZpcfWSVmbAk7l0trE_GHjiwx9-5zjUn4q3MSXAPkkBAAI",
        "isSticker": true
      },
      {
        "id": "sticker-7255",
        "weapon": "Natus Vincere (Glitter)",
        "name": "Copenhagen 2024",
        "rarity": "restricted",
        "basePrice": 6.93,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI6-obi42bgTRTlipPys3YKuqKrO6c6cPGSDDLGxbcm4eRqGiuxxUsh522BztmuJH-QaQ8hCcNuBblds-7MWqE",
        "isSticker": true
      },
      {
        "id": "sticker-7259",
        "weapon": "Virtus.pro (Glitter)",
        "name": "Copenhagen 2024",
        "rarity": "restricted",
        "basePrice": 7.05,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI64pfL7VXuVQn0jNi4pXQPu6r6P_Frd6PADWSUwOsu6bExGC3nwR8i42zUmNmgc3yTPVQnFNIuEja8jiar",
        "isSticker": true
      },
      {
        "id": "sticker-7263",
        "weapon": "G2 Esports (Glitter)",
        "name": "Copenhagen 2024",
        "rarity": "restricted",
        "basePrice": 3.53,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI689XL7VXuVQn0jNjm-3UK6qqobKI4IqjCC2TGmLwv4uJtTCvhwEtxsmXRmNv9eH-fPAMnFNIuEmqGoj_i",
        "isSticker": true
      },
      {
        "id": "sticker-7267",
        "weapon": "FaZe Clan (Glitter)",
        "name": "Copenhagen 2024",
        "rarity": "restricted",
        "basePrice": 5.65,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI68obu72bgTRTlipPys3ZduKr2baFrcajCVzTFlusg6OMwGH2ykBxz5znUzourJHyQPQB2D8BuBbldzWtlyR0",
        "isSticker": true
      },
      {
        "id": "sticker-7271",
        "weapon": "Team Spirit (Glitter)",
        "name": "Copenhagen 2024",
        "rarity": "restricted",
        "basePrice": 9.46,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI655f9-GbgTRTlipPysyEJvvSrbqA9IfKRWjHFx7ki4rBqTXqxkxtwsjyGn936cHjBOlchDcNuBbld8Qn2uRM",
        "isSticker": true
      },
      {
        "id": "sticker-7275",
        "weapon": "Vitality (Glitter)",
        "name": "Copenhagen 2024",
        "rarity": "restricted",
        "basePrice": 5.91,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI64o7g62bgTRTlipPysyYDuqf3bKA7cqKQCGOVxbhw5rY7TnrqkR50tjnTnNatdHmeawYkXJFuBbldcV_h-N4",
        "isSticker": true
      },
      {
        "id": "sticker-7279",
        "weapon": "MOUZ (Glitter)",
        "name": "Copenhagen 2024",
        "rarity": "restricted",
        "basePrice": 3.49,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI6-Yjh8GbgTRTlipPys3EI7KD9MPU4IfGVXGSVx7t35LhvFn-2zBki5zjVwoqrc3KUbwZ0DcFuBbldHAfc6Fc",
        "isSticker": true
      },
      {
        "id": "sticker-7283",
        "weapon": "Complexity Gaming (Glitter)",
        "name": "Copenhagen 2024",
        "rarity": "restricted",
        "basePrice": 5.54,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmxPSnHtwI695f48mbgTRTlipPys3EPt6qtO_c1cfbGC2WUw-smsuQ9HCy1zEkl4zmGyImhcy6eOAMoWZFuBbldzJ6uHTQ",
        "isSticker": true
      }
    ]
  },
  {
    "id": "cap_paris2023",
    "name": "Капсула Легенд | Париж 2023",
    "subtitle": "Официальная капсула CS2 • Голографические безрамочные стикеры",
    "category": "capsules",
    "price": 1.19,
    "accentColor": "#F43F5E",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk__O8Ybc_cKLAMWuVxut4tPInTi_qwUR_5m_TmN79cHyfagMgA8cjQuEMsUW-x4K1P-Ozs1TZ34hNxDK-0H34xwtSCg",
    "items": [
      {
        "id": "sticker-6608",
        "weapon": "Fnatic",
        "name": "Paris 2023",
        "rarity": "milspec",
        "basePrice": 1.2,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8jy5E3kDxyozs-2r3RZ7qH7O_ZuJfTCXDfIwup3trc8HyjlxU4ism7Qzdf9dnyJLlh3Hg8gr9g",
        "isSticker": true
      },
      {
        "id": "sticker-6612",
        "weapon": "Natus Vincere",
        "name": "Paris 2023",
        "rarity": "milspec",
        "basePrice": 1.34,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8j660_uD0mix8PmrXMKt_arPvRpdqTCVjPBkrghsbExSS_rx09_4WTWzI34JS-JLlh3RA3pEg4",
        "isSticker": true
      },
      {
        "id": "sticker-6616",
        "weapon": "FURIA",
        "name": "Paris 2023",
        "rarity": "milspec",
        "basePrice": 0.83,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8jy_0vuDxipzZfmpHoMv_H2PaVvd6LHXjCSmbgl5uMwG3yyzBgksTjSmNiqdimJLlh3Rji5ims",
        "isSticker": true
      },
      {
        "id": "sticker-6620",
        "weapon": "Vitality",
        "name": "Paris 2023",
        "rarity": "milspec",
        "basePrice": 0.5,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8ji403mD0r3zpOyqCcIu6GtMfxsdaKVCmTEkOwu4udsTHHnxx9_5zmEzI77IyqJLlh3wOZv9c8",
        "isSticker": true
      },
      {
        "id": "sticker-6624",
        "weapon": "Heroic",
        "name": "Paris 2023",
        "rarity": "milspec",
        "basePrice": 0.46,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8j870voD073zsGw_noM7qD6PqJpeKnHXzKVxLwn5bA8THGykBtx4WrRm4v7dXyJLlh3GzDV1sA",
        "isSticker": true
      },
      {
        "id": "sticker-6628",
        "weapon": "Bad News Eagles",
        "name": "Paris 2023",
        "rarity": "milspec",
        "basePrice": 1.26,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8j25FypGEWhmsK2pCMJufT_PaY_dfHCD2LAxO9ysuVrSSziw0Qktm7Uwor8JWXXMFEMLtZu7w",
        "isSticker": true
      },
      {
        "id": "sticker-6632",
        "weapon": "Into The Breach",
        "name": "Paris 2023",
        "rarity": "milspec",
        "basePrice": 0.81,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8j9_lupFB7zzcPkq3YD7ar_OfM-eaaWDT-Swrx0sbA6HHC1kBhw52XdmIn7dWXXMFGci_6WWQ",
        "isSticker": true
      },
      {
        "id": "sticker-6636",
        "weapon": "9INE",
        "name": "Paris 2023",
        "rarity": "milspec",
        "basePrice": 0.69,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8j671DpD03wm8Dk_HAKtvOtOvxudfTHDDTElOwksbZrHSqwxR8ksWvVztz4dH6JLlh39SjNTPk",
        "isSticker": true
      },
      {
        "id": "sticker-6704",
        "weapon": "BLAST.tv",
        "name": "Paris 2023",
        "rarity": "milspec",
        "basePrice": 1.25,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8j25krzDxj1zcXhrXdZuvGrafQ8IqnDCjSRxbsvsbY4HizikRlw5T_dzd6vc3mJLlh3GW4i2nI",
        "isSticker": true
      },
      {
        "id": "sticker-6609",
        "weapon": "Fnatic (Glitter)",
        "name": "Paris 2023",
        "rarity": "restricted",
        "basePrice": 5.41,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8jy5E3kfhr9l4L0-DAV6_P6PvBsc6XHDWPAlL1y6bQ5GCjnlh91tj-Gz4mscC3EagF1C5F1EPlK7EeVM6613g",
        "isSticker": true
      },
      {
        "id": "sticker-6613",
        "weapon": "Natus Vincere (Glitter)",
        "name": "Paris 2023",
        "rarity": "restricted",
        "basePrice": 8.48,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8j660_ufhr9l4L0-DAV66H5MKdrd6nEWGPExbog4bVqGXiwkUR-tWrVmd-gdiiVa1VyCsYlQvlK7EcULnl1yw",
        "isSticker": true
      },
      {
        "id": "sticker-6617",
        "weapon": "FURIA (Glitter)",
        "name": "Paris 2023",
        "rarity": "restricted",
        "basePrice": 5.24,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8jy_0vufhr9l4L0-DAVvab7avc5cKXACmaSkex0trltHii2kx9y62rTwo77cHyePFUpWJR4QPlK7EeeWCd2uA",
        "isSticker": true
      },
      {
        "id": "sticker-6621",
        "weapon": "Vitality (Glitter)",
        "name": "Paris 2023",
        "rarity": "restricted",
        "basePrice": 7.91,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8ji403mfhr9l4L0-DAVuPP-MaE0cPHHWmaVlLpws-M9Hi23wU8j4mXTydyuc3_BbwYjDpQjQvlK7Ec6G0x9uQ",
        "isSticker": true
      },
      {
        "id": "sticker-6625",
        "weapon": "Heroic (Glitter)",
        "name": "Paris 2023",
        "rarity": "restricted",
        "basePrice": 3.35,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8j870vofhr9l4L0-DAVu6D2MfU-I_WWDDaSw7904-Q9SnDnkEwm6jvdz9uhIH3FaFAgCsZ0EPlK7EdmbhvPzA",
        "isSticker": true
      },
      {
        "id": "sticker-6629",
        "weapon": "Bad News Eagles (Glitter)",
        "name": "Paris 2023",
        "rarity": "restricted",
        "basePrice": 7.13,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8j25FzYRhH4ioLl72xatvf5afxoI6GQCD_Dk7wjsrNsF3zrwkUm52mAz9_9JC_CO1IhCsElW6dU5SO6xNXq",
        "isSticker": true
      },
      {
        "id": "sticker-6633",
        "weapon": "Into The Breach (Glitter)",
        "name": "Paris 2023",
        "rarity": "restricted",
        "basePrice": 3.99,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8j9_lvYRhH4ioLl72wCu6WvavFoJvbFWGLJxO134LM6GXHrxUhztW3Qn92qcn6XaVNxD5t4W6dU5VlWmmjk",
        "isSticker": true
      },
      {
        "id": "sticker-6637",
        "weapon": "9INE (Glitter)",
        "name": "Paris 2023",
        "rarity": "restricted",
        "basePrice": 4.34,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8j671Dpfhr9l4L0-DAV66f-afRrcvTFV2HAl-0l5-A9Sii1xBh-5WWDydeoc3uUbFMlDcN4TPlK7Ecjx7N-gg",
        "isSticker": true
      }
    ]
  },
  {
    "id": "cap_antwerp2022",
    "name": "Капсула Легенд | Антверпен 2022",
    "subtitle": "Официальная капсула CS2 • Неоновые Голо и Золотые стикеры",
    "category": "capsules",
    "price": 1.49,
    "accentColor": "#A855F7",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk7vy6f6F_MKLDXDWvzetxte9tXGe3lB9w5DjSy4uveC7BbQRzApIlFrQLsxDrkIbjP7jn5VHZiYIXnyWskGoXuce4Ls9p",
    "items": [
      {
        "id": "sticker-5271",
        "weapon": "Heroic",
        "name": "Antwerp 2022",
        "rarity": "milspec",
        "basePrice": 0.71,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpVHiUxK_zpTi_yAM6qH6OvI6ePXHXTHHmOsv6bJrHiy1wUh1sjyGzI6hc3yeOhhgVMW61xp6FQ",
        "isSticker": true
      },
      {
        "id": "sticker-5275",
        "weapon": "Copenhagen Flames",
        "name": "Antwerp 2022",
        "rarity": "milspec",
        "basePrice": 1.32,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpVroURi_nZfipXJZ6qStaaE4c_HGC2SWkOhw4eI6SX2xwUR052SDy4r8dCmfOBhgVMXBlw5ldg",
        "isSticker": true
      },
      {
        "id": "sticker-5279",
        "weapon": "BIG",
        "name": "Antwerp 2022",
        "rarity": "milspec",
        "basePrice": 1.03,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpVvuRlOhxsGz_3YOuaWoPvM-cPLBX2WRxOhw4Lc6Gni1kxgmtjiHytj7dS7CcEZ-XfpAXudF",
        "isSticker": true
      },
      {
        "id": "sticker-5283",
        "weapon": "Cloud9",
        "name": "Antwerp 2022",
        "rarity": "milspec",
        "basePrice": 0.8,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpVq-Dxmny87iriNauvOtbvU-c6jKXmKRkrghsrY4H3zkzElz4WjUnoytcy6JLlh3gGpv7GY",
        "isSticker": true
      },
      {
        "id": "sticker-5287",
        "weapon": "FURIA",
        "name": "Antwerp 2022",
        "rarity": "milspec",
        "basePrice": 1.03,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpV_yUxS_yJPhqXoK66f6bvxoJPbAWWKVw7lytOI6SXjhkE0m6jnUnNetcirFaRhgVMVY0GVhQg",
        "isSticker": true
      },
      {
        "id": "sticker-5291",
        "weapon": "FaZe Clan",
        "name": "Antwerp 2022",
        "rarity": "milspec",
        "basePrice": 0.75,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpV_mWxi_ycay-yMMuvf-PKc4ePLBWTeSmbsg5LBqFiq3kUt2sT6Dytn9Iy2QOxhgVMXVHDW7qg",
        "isSticker": true
      },
      {
        "id": "sticker-5295",
        "weapon": "Ninjas in Pyjamas",
        "name": "Antwerp 2022",
        "rarity": "milspec",
        "basePrice": 0.8,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpVfuUVOjzcKwqnNZ7KL3PPVsI6CQXD7GkLh04bc4HHyxwEt04DjTyY6sdXvDcEZ-XVokOZk4",
        "isSticker": true
      },
      {
        "id": "sticker-5299",
        "weapon": "Natus Vincere",
        "name": "Antwerp 2022",
        "rarity": "milspec",
        "basePrice": 0.48,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpVfmVxS_y5W4qHBYuKb6a6U0c6fEXGbEx7oi4uJtF3Gwwhgm4DnUz4n7c3iRPRhgVMUg8MoVRA",
        "isSticker": true
      },
      {
        "id": "sticker-5367",
        "weapon": "PGL",
        "name": "Antwerp 2022",
        "rarity": "milspec",
        "basePrice": 1.12,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpUngTVOgy5LiqyEKuPT5PfxsI6DDCmHHkbYh5uM9G3HqxkR-4mSDm9r7JSiScEZ-XbWGARq1",
        "isSticker": true
      },
      {
        "id": "sticker-5272",
        "weapon": "Heroic (Glitter)",
        "name": "Antwerp 2022",
        "rarity": "restricted",
        "basePrice": 8.58,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpVHiUxLOmZrp6TZe_bz4OKU_JKXDWz_Bkb8u4rVrGn_kk0V34z7VytmhJCmWZlciXpQmR-JfrFDmxdnaC8M2",
        "isSticker": true
      },
      {
        "id": "sticker-5276",
        "weapon": "Copenhagen Flames (Glitter)",
        "name": "Antwerp 2022",
        "rarity": "restricted",
        "basePrice": 3.86,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpVroURjOmZrp6TZe_bz4aqU0cKfLDDPDk7gi57NqTXu2k0x_5myAm4n6IHieag8mCZdxF-NYrFDmxZ1CNVMF",
        "isSticker": true
      },
      {
        "id": "sticker-5280",
        "weapon": "BIG (Glitter)",
        "name": "Antwerp 2022",
        "rarity": "restricted",
        "basePrice": 8.31,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpVvuRiL2kp_06SdJoaWsP6I_c6nFXmTJw7og5LVrHC-2l0px52vdy9agIyrEbVJyCZpxRrMU8k7vbEctRow",
        "isSticker": true
      },
      {
        "id": "sticker-5284",
        "weapon": "Cloud9 (Glitter)",
        "name": "Antwerp 2022",
        "rarity": "restricted",
        "basePrice": 8.8,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpVq-fhr9l4L0-DAVt6Sqa6c4JPWVDGOVkr915bQ5G3_hzEhy6z_Sw9mtcXPFP1cnXpJzEPlK7EdwTEe_Bw",
        "isSticker": true
      },
      {
        "id": "sticker-5288",
        "weapon": "FURIA (Glitter)",
        "name": "Antwerp 2022",
        "rarity": "restricted",
        "basePrice": 3.26,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpV_yUxTOmZrp6TZe_bz8MKU_cfWVCjWUlr8itbQ-S3C3kEwh6mqHn9-uICiePw4gA5V3QuRYrFDmxbSYlu0I",
        "isSticker": true
      },
      {
        "id": "sticker-5292",
        "weapon": "FaZe Clan (Glitter)",
        "name": "Antwerp 2022",
        "rarity": "restricted",
        "basePrice": 7.05,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpV_mWxjOmZrp6TZe_bz7bvw9JqLDCjaSwu0k5bFtHH_jlhgm4jnWzd2sJHuUOgEoDcEhQrZZrFDmxf1P75NP",
        "isSticker": true
      },
      {
        "id": "sticker-5296",
        "weapon": "Ninjas in Pyjamas (Glitter)",
        "name": "Antwerp 2022",
        "rarity": "restricted",
        "basePrice": 4.31,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpVfuUSL2kp_06SdJoff3MfNsJqjFWGHAk78itblvFnDrxUVzsmnTyNetIimRZ1UgXpsmTeIU8k7vKRSFqoU",
        "isSticker": true
      },
      {
        "id": "sticker-5300",
        "weapon": "Natus Vincere (Glitter)",
        "name": "Antwerp 2022",
        "rarity": "restricted",
        "basePrice": 6.64,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMuvIWyS90YnpNWmpVfmVxTOmZrp6TZe_bz3PfQ4dKbECmOSwLp05rMxSivkw0t05mzSy96reS2TagInX5MkQbUKrFDmxYpDBQna",
        "isSticker": true
      }
    ]
  },
  {
    "id": "cap_stockholm2021",
    "name": "Капсула Легенд | Стокгольм 2021",
    "subtitle": "Редкая капсула • NAVI Champion Gold & Foil",
    "category": "capsules",
    "price": 3.5,
    "accentColor": "#10B981",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk_Oaha69lcqDBX1icxOlzvuV6AS_izRhx526Hw9j8dHKVP1QjWcB0E-QC5BW7k9fmY-PqtAzaioMRm3jgznQexd7Cao8",
    "items": [
      {
        "id": "sticker-4954",
        "weapon": "Ninjas in Pyjamas",
        "name": "Stockholm 2021",
        "rarity": "milspec",
        "basePrice": 4.34,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta75FD3D0ylnJfl_3da7fevPvVsdfbBCmLHkLl3s-U-GyrkxxsktzvQzY2tI3qJLlh3Ep3kYMA",
        "isSticker": true
      },
      {
        "id": "sticker-4958",
        "weapon": "FURIA",
        "name": "Stockholm 2021",
        "rarity": "milspec",
        "basePrice": 4.23,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta77Ez1SFOnn8e3pXddvfb2baE4daHGWGPElusjtLk-Sn_lkRt16z_dzdqsJyqScEZ-XUZKj-OR",
        "isSticker": true
      },
      {
        "id": "sticker-4962",
        "weapon": "Natus Vincere",
        "name": "Stockholm 2021",
        "rarity": "milspec",
        "basePrice": 2.48,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta75FjxSFOlz5fi-HAKv6D3O_U8dqDLXDTBmOpytrVvSi_jlhsk4j6Awt38dSqXcEZ-XQyj9d6U",
        "isSticker": true
      },
      {
        "id": "sticker-4966",
        "weapon": "Vitality",
        "name": "Stockholm 2021",
        "rarity": "milspec",
        "basePrice": 3.22,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta7_FDzQFOpmJWx_yAN6qarOqZvIqDBXTXAlbxw5LU9Gi3qlxh24TiHytr9eH2ScEZ-XVHrZAgI",
        "isSticker": true
      },
      {
        "id": "sticker-4970",
        "weapon": "Team Liquid",
        "name": "Stockholm 2021",
        "rarity": "milspec",
        "basePrice": 4.38,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta75lD2D06gyMHipCMKuqv7Pf1vI_LGXj7EwL0i57E-Hnjjw0kjsW7Smd-pcHOJLlh3liGmb0c",
        "isSticker": true
      },
      {
        "id": "sticker-4974",
        "weapon": "Gambit Gaming",
        "name": "Stockholm 2021",
        "rarity": "milspec",
        "basePrice": 4.27,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta77VjqQ1P0zce2pCYK7KGsMfZvcvbFXWXEwr8u5uRtGn3ixhsh4WTSw46ucHqScEZ-XZoi-bDr",
        "isSticker": true
      },
      {
        "id": "sticker-4978",
        "weapon": "G2 Esports",
        "name": "Stockholm 2021",
        "rarity": "milspec",
        "basePrice": 4.34,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta77QupGEz3zsHirXVf7PSoPvM-JfGXCjDGxOwhsbEwSXy3w0V0tz6Bn4z6c2XXMFFZPtRU2A",
        "isSticker": true
      },
      {
        "id": "sticker-4982",
        "weapon": "Evil Geniuses",
        "name": "Stockholm 2021",
        "rarity": "milspec",
        "basePrice": 3.71,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta770_rDxiny8PjpHZevvD-a_I9caPFCzHFl7ly6bVsHyiylkpx5mmEyYr7cCmJLlh3KkHYKIo",
        "isSticker": true
      },
      {
        "id": "sticker-5050",
        "weapon": "PGL",
        "name": "Stockholm 2021",
        "rarity": "milspec",
        "basePrice": 2.66,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta7-l7rDxnwn8K2pHYPt6H4baE1IfHCWD7El78ksrE7HCviwh52tz7TntepcX-JLlh3qU4BafM",
        "isSticker": true
      },
      {
        "id": "sticker-4955",
        "weapon": "Ninjas in Pyjamas (Holo)",
        "name": "Stockholm 2021",
        "rarity": "restricted",
        "basePrice": 16.2,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta75FD3fhX-kpmupCRY66WrOqI_dfOXW2bHmbols7A8Sn61kBsh5jzRydn_dn7DZ1VxC4wwG7BjjpxeSg",
        "isSticker": true
      },
      {
        "id": "sticker-4959",
        "weapon": "FURIA (Holo)",
        "name": "Stockholm 2021",
        "rarity": "restricted",
        "basePrice": 32.27,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta77Ez1SCL5kZrvs3ULuKb6aqc0d6DBVzWSlrl04bcwG3HjzBgi5WrXzYmscHOeb1R1D8ZuBbldMH-MzUQ",
        "isSticker": true
      },
      {
        "id": "sticker-4963",
        "weapon": "Natus Vincere (Holo)",
        "name": "Stockholm 2021",
        "rarity": "restricted",
        "basePrice": 12.67,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta75FjxSCL5kZrvsyFa66r-PfM7dPbGWGORwr0k6bA-HnDnk00h62zUyNz8eSmUbg4mXJJuBbldnDdt3dE",
        "isSticker": true
      },
      {
        "id": "sticker-4967",
        "weapon": "Vitality (Holo)",
        "name": "Stockholm 2021",
        "rarity": "restricted",
        "basePrice": 24.22,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta7_FDzQCL5kZrvs3oNvaH6O6I0dqCWD2TImLsmtrRqTHzikR5x52XQz9mgdC3DZ1UpDJBuBblde11rAQc",
        "isSticker": true
      },
      {
        "id": "sticker-4971",
        "weapon": "Team Liquid (Holo)",
        "name": "Stockholm 2021",
        "rarity": "restricted",
        "basePrice": 22.12,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta75lD2fhX-kpmu_3FZ7KWqO_Q_ePLLCzDCkLpztbE-THixxEl0sW6AzN2sc3nBPFMlDowwG7Ac2z3nSQ",
        "isSticker": true
      },
      {
        "id": "sticker-4975",
        "weapon": "Gambit Gaming (Holo)",
        "name": "Stockholm 2021",
        "rarity": "restricted",
        "basePrice": 13.23,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta77VjqQyL5kZrvs3dY6vOqOfJvI6HCWD7Jl-0ntbk4TS3nlEwi5jiBm9epIH3BPAFxWcRuBbldbCdm4W8",
        "isSticker": true
      },
      {
        "id": "sticker-4979",
        "weapon": "G2 Esports (Holo)",
        "name": "Stockholm 2021",
        "rarity": "restricted",
        "basePrice": 16.17,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta77QvYSRL9kdi4rXpd7aWtOP07daXFXWTEk7t0s7E5Fyy1wx50tW_SmdmseCnGOg4nFNIuEleK5G18",
        "isSticker": true
      },
      {
        "id": "sticker-4983",
        "weapon": "Evil Geniuses (Holo)",
        "name": "Stockholm 2021",
        "rarity": "restricted",
        "basePrice": 32.69,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta770_rfhX-kpmuqiMOvqD5OfdsJfPFWGbBlrhz5bA5TS_rxBwj5GiHy9erJXieO1IiDowwG7CJMNJEOQ",
        "isSticker": true
      }
    ]
  },
  {
    "id": "cap_kato2014",
    "name": "Капсула Легенд | Катовице 2014",
    "subtitle": "Самая дорогая капсула в истории • Titan Holo & iBUYPOWER Holo",
    "category": "capsules",
    "price": 150,
    "accentColor": "#FACC15",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bjn_lDkShjjoYbh_ilk5PO6OvQ8dM_DXCnHkOgktbhoHyqxxRh0tWiDnIr4dnKSOAUoC5J1TbJZ4Bi8k9HlY-Li-UWA3NcCqy5X",
    "items": [
      {
        "id": "sticker-50",
        "weapon": "compLexity Gaming",
        "name": "Katowice 2014",
        "rarity": "milspec",
        "basePrice": 196.2,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVLykZvw8SdD5ua3Jv08d_XGXzeVl7906bhvGn62xhkjsTiEzIv6IinEbgEnCJZ3RuZc5hWm0oqwz9ycayY",
        "isSticker": true
      },
      {
        "id": "sticker-52",
        "weapon": "Team Dignitas",
        "name": "Katowice 2014",
        "rarity": "milspec",
        "basePrice": 172.8,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL1l5Hu9DZa_LyrOaA8dvKWVjLAkLp05Oc5Gy-yzE4h42uEzN34dnuRZgQjD8QkQOFcrFDmxY_voY8V",
        "isSticker": true
      },
      {
        "id": "sticker-55",
        "weapon": "Fnatic",
        "name": "Katowice 2014",
        "rarity": "milspec",
        "basePrice": 90,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL3kJf09CEVvqStP6Y6JaaSWjfGlb8mtrM4Ti-wzE12sDjWm4mrdC6WZwMmW5JyQflK7EfDL65HwA",
        "isSticker": true
      },
      {
        "id": "sticker-57",
        "weapon": "HellRaisers",
        "name": "Katowice 2014",
        "rarity": "milspec",
        "basePrice": 95.4,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL5m5rs7yNS_Pe8e-o1cqaWXDeWwLhy6bZsG3vlkBt2tWqEn9f4eHyRPAAoWcRxRu8NukTqjJS5YFwAHIOk",
        "isSticker": true
      },
      {
        "id": "sticker-61",
        "weapon": "Team LDLC.com",
        "name": "Katowice 2014",
        "rarity": "milspec",
        "basePrice": 199.8,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL9mprjsyAD6fb2P6Y9eKmRCzPBwOt3s7MwG3rlxEwj5mmEzdaqdCqfPQIjAsNuBbldhnvSCr8",
        "isSticker": true
      },
      {
        "id": "sticker-63",
        "weapon": "LGB eSports",
        "name": "Katowice 2014",
        "rarity": "milspec",
        "basePrice": 122.4,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL9mZSuqyQK7qD8Pvc0dvTFXD-Vluxzs7hqGn3mzU0k5DmHm4ypd3uSbQIiXIwwG7Ckzoj_bQ",
        "isSticker": true
      },
      {
        "id": "sticker-71",
        "weapon": "Ninjas in Pyjamas",
        "name": "Katowice 2014",
        "rarity": "milspec",
        "basePrice": 151.2,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL_l5jq_DFS4eK3YqVgIePdCGHJxOwk5bAwFnDrxBkmsWXUnN_9d3iXZ1AjA8B2QLICt0WwkNC1ZPSiuVKyuwQSVA",
        "isSticker": true
      },
      {
        "id": "sticker-75",
        "weapon": "Titan",
        "name": "Katowice 2014",
        "rarity": "milspec",
        "basePrice": 171,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVLll4Lh82xYuaf3PKY8JqPGVzWVx-t15uc8HX_ix09_tWSAz46gcSqTawEmCsN2W6dU5WsJhLBH",
        "isSticker": true
      },
      {
        "id": "sticker-51",
        "weapon": "compLexity Gaming (Holo)",
        "name": "Katowice 2014",
        "rarity": "restricted",
        "basePrice": 1389.6,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVLykZvw8SdD5ua3V6xiLP_dWWHGw71z6LY9Fijkwkx14GnVw476dX-XaVV0X8d0TLRc5kHpxNbvYfSiuVK5KAR_yA",
        "isSticker": true
      },
      {
        "id": "sticker-53",
        "weapon": "Team Dignitas (Holo)",
        "name": "Katowice 2014",
        "rarity": "restricted",
        "basePrice": 1684.8,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL1l5Hu9DZa_M2mZ6hibvGSCmbGmbol5bk5Hyvnl0kktT_Xn4mreHLGPFAnXJpxFLQP4UG5kNP5d7S1RHgEpV4",
        "isSticker": true
      },
      {
        "id": "sticker-56",
        "weapon": "Fnatic (Holo)",
        "name": "Katowice 2014",
        "rarity": "restricted",
        "basePrice": 1643.4,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL3kJf09CFk5_2iZ-o_IqTAWDDBwLsn4eQ6HiiyzU915GvXwtqsJH3Eag8lA5VxTeUD4RC8jJS5YFS-xO2Q",
        "isSticker": true
      },
      {
        "id": "sticker-58",
        "weapon": "HellRaisers (Holo)",
        "name": "Katowice 2014",
        "rarity": "restricted",
        "basePrice": 1598.4,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL5m5rs7yNS_Pe8e5tlL_ycQGWRxbgh4rg-HyyxxUh15z6Hyd6tcirBagB1A5t3Ee8J4BCxldziYeL8p1uJW10TqV0",
        "isSticker": true
      },
      {
        "id": "sticker-62",
        "weapon": "Team LDLC.com (Holo)",
        "name": "Katowice 2014",
        "rarity": "restricted",
        "basePrice": 970.2,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL9mprjwipU4_3gbfU1c_bAXDKTwu8u4bhvG3qwxk1x4WXRyYuteXrDPFUnWJtwEbYJsQ74zIN29ZviPw",
        "isSticker": true
      },
      {
        "id": "sticker-64",
        "weapon": "LGB eSports (Holo)",
        "name": "Katowice 2014",
        "rarity": "restricted",
        "basePrice": 1465.2,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL9mZTf9S1X4Lz3a_Q0damXDDGWl-olsbdtGy3hl0h06j7cz9ivdnmUb1IiX5VzTe4MrFDmxdFt4nC-",
        "isSticker": true
      },
      {
        "id": "sticker-72",
        "weapon": "Ninjas in Pyjamas (Holo)",
        "name": "Katowice 2014",
        "rarity": "restricted",
        "basePrice": 583.2,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVL_l5jq_DFS4eK3YqVgIeOsBmiczqAl5rc-TH-xxEsi6myAyIytcSiebAQhCpZ1FuEDu0bskdfkMb-z5gzWlcsbmn_Kwe4B",
        "isSticker": true
      },
      {
        "id": "sticker-76",
        "weapon": "Titan (Holo)",
        "name": "Katowice 2014",
        "rarity": "restricted",
        "basePrice": 1695.6,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVLll4Lh8x1T4P6hJqZrJfHAXjXGkr0i4rc_GSjixEh35GSAnNr8IyqSbg8kA8ciRrQJshGm0oqwlCzKr50",
        "isSticker": true
      },
      {
        "id": "sticker-82",
        "weapon": "ESL Skull (Foil)",
        "name": "Katowice 2014",
        "rarity": "classified",
        "basePrice": 7610.4,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjM-sJnCW8Vli_YTxuAm2FVLmkZrmwjFQ-v6iV6F-LM-VAW6cj-wl5bc5GnjjxUoh62-Gmd2rI3mSblMhWMcmTbQMsEW4kNLgMu-34gDAy9USDQz6ROg",
        "isSticker": true
      }
    ]
  },
  {
    "id": "souv_cobble",
    "name": "Сувенирный набор «Cobblestone»",
    "subtitle": "Легендарный набор • Сувенирный AWP | Dragon Lore",
    "category": "souvenir",
    "price": 45,
    "accentColor": "#EAB308",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bjx-VW2FSLhjJnt8h1f6s2taqZhJb7GCmXDwLp057U8SSiwkxt1tz_Sw46qJC6RZgcpXJJwQrVf5xe7lIfnKaq8sA1qTP9C",
    "items": [
      {
        "id": "skin-85ab23cdb7f5",
        "weapon": "P90",
        "name": "Storm",
        "rarity": "milspec",
        "basePrice": 2.85,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7i1k_OaheqlrMv-dGlicyOl-pK8-HSixlhh2sG_TydaveS7EZw91A5ByEeIJ4Rm6kNfgMbzr7wGMgolA02yg2VYIqRCy",
        "isSticker": false
      },
      {
        "id": "skin-ed03b471eb9e",
        "weapon": "SCAR-20",
        "name": "Storm",
        "rarity": "milspec",
        "basePrice": 4.22,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk_P2Re7BiMv2VHGie1dF6ueZhW2fjxBgl5jyAntytc3ifO1AjXpslRLFft0PtxoXkMuKwslaPg49MmHj6kGoXuUn7n6Ef",
        "isSticker": false
      },
      {
        "id": "skin-ef6a97d9de03",
        "weapon": "Dual Berettas",
        "name": "Briar",
        "rarity": "milspec",
        "basePrice": 3.62,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1T9s24YapoM8-fB2CY1aAn4rlsTnzhxxhx5TuHwt76cXuXbVApApV0TLJctxm9kd3vZL-35wTWlcsbmthIan4W",
        "isSticker": false
      },
      {
        "id": "skin-747c96cb8106",
        "weapon": "MAC-10",
        "name": "Indigo",
        "rarity": "milspec",
        "basePrice": 3.59,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1I4M2nZqBkJ_-sD2mU_ulktfhWQyC0nQlptT_VztavJXyfa1QgW5J0FuMCtBLtw4ayMe_g5VPZg49MzCX423sf6TErvbjb2X3Wdg",
        "isSticker": false
      },
      {
        "id": "skin-f4c898d70fd2",
        "weapon": "UMP-45",
        "name": "Indigo",
        "rarity": "milspec",
        "basePrice": 3.48,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1I4M2nZqBkJ_-sD2mU_ulktfhWQyC0nQlp4WjTyN78In-Wb1QgDcNzRLUI5ka4wdfjPruxswbdgopGzHj73yNLvzErvbhz6ja6HQ",
        "isSticker": false
      },
      {
        "id": "skin-175c48cc6d6b",
        "weapon": "MAG-7",
        "name": "Silver",
        "rarity": "milspec",
        "basePrice": 2.51,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiNV0OGnZLJoMs-fB2CY1aAm5Lc7SSyxl0t1sj7Wn9ipdXuRZwMkD5NzRbVftkPsx9LvZOjjsgyMlcsbmlF3IVC_",
        "isSticker": false
      },
      {
        "id": "skin-5b9f03255b9d",
        "weapon": "Nova",
        "name": "Green Apple",
        "rarity": "milspec",
        "basePrice": 2.67,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwjFU0PW8baFjH_yaCW-Ej7xz5eNtTXHrw0l-4G3SnN78Jy-faQVxCZV3R7FesEHsm9S1Ybm07gXAy9USzA6LpwE",
        "isSticker": false
      },
      {
        "id": "skin-fffd8c3e6f34",
        "weapon": "Sawed-Off",
        "name": "Rust Coat",
        "rarity": "milspec",
        "basePrice": 3,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2veZt-NPWWAlicyOl-pK87TC2ylB534jiGzNv6dCjFPQR2XpJ4RuQPtRbqx9znYujitFPZ3oJC02yg2T-LVFiK",
        "isSticker": false
      },
      {
        "id": "skin-94f35854b787",
        "weapon": "USP-S",
        "name": "Royal Blue",
        "rarity": "milspec",
        "basePrice": 2.07,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSKOmsB2mUyOl5j_R6Xxa_nBovp3OAzNv6d3yVbVBxAsNzReNZuxK8kIHnNurj4wTaiNlBnH6q3CMYv3po_a9cBsy26Gzj",
        "isSticker": false
      },
      {
        "id": "skin-994f496c1e81",
        "weapon": "P2000",
        "name": "Chainmail",
        "rarity": "milspec",
        "basePrice": 4.36,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0POjV6dlIfmdA2aZzdF6ueZhW2fqxU4k6znTn434JHnEPA9yWcR2TLIJ4UK4w9e2Nbjr4QbX2owXnyr7kGoXuSuECNR4",
        "isSticker": false
      },
      {
        "id": "skin-bb430e7deeba",
        "weapon": "MP9",
        "name": "Dark Age",
        "rarity": "milspec",
        "basePrice": 2.91,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_C9k4ve6aahSKf6fD36vzedxuPUnG3uwxxkk6jnWmdqsJy-UbFV0DZV4FLRctUXqwIWyNb_r5Qbdg4lGzzK-0H2q-xqNvQ",
        "isSticker": false
      },
      {
        "id": "skin-eb5c3a076134",
        "weapon": "CZ75-Auto",
        "name": "Chalice",
        "rarity": "restricted",
        "basePrice": 30.68,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s28Z71sLM-fB2CY1aBzsrQ5HnyyzBh25jzcyI3_dyqXaFcmC8ByReBZuxi-lYXlMei05FSPlcsbmsOlfuvI",
        "isSticker": false
      },
      {
        "id": "skin-dcb95b6f2246",
        "weapon": "Desert Eagle",
        "name": "Hand Cannon",
        "rarity": "restricted",
        "basePrice": 21.96,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7uORYKVjJPOSAGmfz9F6ueZhW2eww0t-6mrUn977cinDZ1IgD8YiTeUIthjpk9zkYem04wTXj4oRnCv7kGoXuTIzWSlA",
        "isSticker": false
      },
      {
        "id": "skin-7678cc4af1fb",
        "weapon": "M4A1-S",
        "name": "Knight",
        "rarity": "classified",
        "basePrice": 97.46,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_GeMWqV1e96o95lRi67gVNwsWTQzdn4JHyQZ1QhWMZyQe5YsxK-ktPnZOiwtVDcjo9ExS393ytB8G81tGXpYjdX",
        "isSticker": false
      },
      {
        "id": "skin-4f8d99d09ded",
        "weapon": "AWP",
        "name": "Dragon Lore",
        "rarity": "covert",
        "basePrice": 349.29,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk4veqYaF7IfysCnWRxuF4j-B-Xxa_nBovp3Pdwtj9cC_GaAd0DZdwQu9fuhS4kNy0NePntVTbjYpCyyT_3CgY5i9j_a9cBkcCWUKV",
        "isSticker": false
      }
    ]
  },
  {
    "id": "souv_mirage",
    "name": "Сувенирный набор «Mirage 2024»",
    "subtitle": "Сувениры Копенгаген 2024 • AWP Пустынная гидра",
    "category": "souvenir",
    "price": 6.5,
    "accentColor": "#F97316",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj3-lG1EU-loYby8i9U0ParV6lkMvGUCynAxLxw5rQ-TnywwUQj5GnVnNj9dCjFb1cjWZJ1TO4Itxm6ldbvY--x-UWA3At843U9",
    "items": [
      {
        "id": "skin-68baaaf8fc40",
        "weapon": "P250",
        "name": "Drought",
        "rarity": "milspec",
        "basePrice": 2.61,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFL0Pare6F_NM-ABXKczf1JtOB-QRa_nBovp3PVyd6tIijBOAQhXsAlE-ECsxC9x9flMuPn5wfZ2YNNnn32iy4d53pi_a9cBo6jFyfx",
        "isSticker": false
      },
      {
        "id": "skin-9ee3bd1dc597",
        "weapon": "PP-Bizon",
        "name": "Anolis",
        "rarity": "milspec",
        "basePrice": 4.72,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1T9s2iYb5sMvSsHWyZz9F6ueZhW2e2xkpytWjTydaqeHKXbAJyApN4QuUOtkG8wNTiMLm3tAKM2Y9Hny75kGoXub_Drj6P",
        "isSticker": false
      },
      {
        "id": "skin-3033f9235a6c",
        "weapon": "MAG-7",
        "name": "Navy Sheen",
        "rarity": "milspec",
        "basePrice": 1.59,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiNW0Pyvfr1SM_iaAGKvzedxuPUnHyu2lh8j5zuBzYv4Iy3FZwJzCJMlQbEL5hO-ltPnP7zmswHY39hAxTK-0H11955Myw",
        "isSticker": false
      },
      {
        "id": "skin-62d86c75d355",
        "weapon": "MAC-10",
        "name": "Sienna Damask",
        "rarity": "milspec",
        "basePrice": 3.54,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1I_82jYbZsJ_WsCGuf1utko959TieMmRQguynLzNv4J32XaVdzX8dyTOcJsxS_x4CxYeKz5QCKjo0RzCv7iC9I5nlv4_FCD_Ti47lJig",
        "isSticker": false
      },
      {
        "id": "skin-2471c784d52a",
        "weapon": "SSG 08",
        "name": "Prey",
        "rarity": "milspec",
        "basePrice": 2.29,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_820baZ_IfOSA1iCxOpJvOhuRz39zBwmt2mAyI6rInrGaVd1X5N0Re8OshO5mtbvMr7q5wGIg95BmSX5ijQJsHiun1hzCg",
        "isSticker": false
      },
      {
        "id": "skin-9ae29431fe9d",
        "weapon": "Dual Berettas",
        "name": "Drift Wood",
        "rarity": "milspec",
        "basePrice": 4.56,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1I_82qer1SN_-cClicyOl-pK87GXGwlkxx5TnRnon4IHvCPAIiW8dxQ7Nc50K6l4XhY-m04QLdjo9N02yg2cWHvD9Z",
        "isSticker": false
      },
      {
        "id": "skin-05b6323df391",
        "weapon": "FAMAS",
        "name": "CaliCamo",
        "rarity": "milspec",
        "basePrice": 2.88,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1T9s24abZkI_GeAViUxP1zovVWQyC0nQlp4WXRn9qqI3uVblQgApJzELVb5BHqlYC1MePr71TXi91AzCz33S9KujErvbjpBPXbmw",
        "isSticker": false
      },
      {
        "id": "skin-6dbbf1e46f10",
        "weapon": "CZ75-Auto",
        "name": "Midnight Palm",
        "rarity": "milspec",
        "basePrice": 3.45,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1I_82-aahgH_6aCW-E_uJ_t-l9ASiwl0lw5z_Unt_9IHqRbwV1X5QmFuJZtxi-l9HuML7htgGN3t1NzSjgznQe0h5WimA",
        "isSticker": false
      },
      {
        "id": "skin-f3a4c195cc1e",
        "weapon": "P90",
        "name": "Verdant Growth",
        "rarity": "milspec",
        "basePrice": 3.82,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf7jJk4v28Z5t5JeiHB2uV_ulkteRncD-6mxgYvzSCkpu3eXqUaFMkDZciEeZesxG4w4fgZe3g51HfiY4RmS33jCNMvXpst-gFAr1lpPPtRxOxww",
        "isSticker": false
      },
      {
        "id": "skin-08730cd85d09",
        "weapon": "USP-S",
        "name": "Purple DDPAT",
        "rarity": "milspec",
        "basePrice": 2.2,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSIf2sCmOAwPpJoPR7XyW2qhEutDWR1N-rcHPBPFMiDZUkF-9Z4ETtxtDkYu3js1ffg94Tnn2o3yMavH0957ocEf1yWMwziKM",
        "isSticker": false
      },
      {
        "id": "skin-f9bef4ddaca3",
        "weapon": "MP9",
        "name": "Music Box",
        "rarity": "milspec",
        "basePrice": 1.74,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f_C9k4vu8aaNoH_afAXCV0_1JveR9TiW6liIrujqNjsGtcCmeOw8gAptyFLVb4BaxmtGyML_n5QXW2owUm3j5hi4dvHlr57sET-N7rSSys4ef",
        "isSticker": false
      },
      {
        "id": "skin-a67615da8679",
        "weapon": "M249",
        "name": "Humidor",
        "rarity": "milspec",
        "basePrice": 2.09,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wjFL0P-heqtSI_GBGG6extF0pfNnWxa_nBovp3OGnomhc3-ROFInDJclReQOtkS_xNO0MLuwtVCL3Y9DxSqr3y9Lunxq_a9cBnmfuyfW",
        "isSticker": false
      },
      {
        "id": "skin-7f4d0f478610",
        "weapon": "SG 553",
        "name": "Desert Blossom",
        "rarity": "milspec",
        "basePrice": 4.4,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1a7s2qbbdoMuSsDGufzuNJsvNgSCGnqhEutDWR1N_8JXPBagZ0WZUiRu4PukaxxNDjNb_mtQCPiYwRyymt2yhIuyc46-kcEf1yx7sEwjI",
        "isSticker": false
      },
      {
        "id": "skin-bd7cf4e7165b",
        "weapon": "XM1014",
        "name": "Elegant Vines",
        "rarity": "restricted",
        "basePrice": 14.53,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7v-RZat_L8-HC3-EyOJzj-N7Ri67gSIrujqNjsGqJX3BagJxDcFwROJbtkLpltHlNOPi4AyLjN8UxX33hypK6Hw_se0GT-N7rUzICquq",
        "isSticker": false
      },
      {
        "id": "skin-838f75720b22",
        "weapon": "Glock-18",
        "name": "Pink DDPAT",
        "rarity": "restricted",
        "basePrice": 29.25,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1T9s2qbLRsNM-DB2mb_uJ_t-l9ASi2lBgjsmjSm4ugeX6WO1AoCsElFuEIuhC6xta2Zbmw5gCMjtlAni3gznQeU26CORw",
        "isSticker": false
      },
      {
        "id": "skin-a848a7d8862e",
        "weapon": "AUG",
        "name": "Sand Storm",
        "rarity": "restricted",
        "basePrice": 33.47,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV7dsLvSsHXOf0-NJvOhuRz39kxtzt2jcyNqsdy2TawElApolF7Zf50bsl9fvZuq05waMi44XyX3-2zQJsHjlDs_LaQ",
        "isSticker": false
      },
      {
        "id": "skin-169fc42e8d8a",
        "weapon": "MP5-SD",
        "name": "Oxide Oasis",
        "rarity": "classified",
        "basePrice": 56.49,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePFSLvWcAFiWzet9pOB7QRa_nBovp3OAmYr_cnLFOlN0A5d4Qu4KtRi6lYG2Mr7n4QCLg48Tm3_-3yxOvSdj_a9cBsgSaNGx",
        "isSticker": false
      }
    ]
  },
  {
    "id": "souv_ancient",
    "name": "Сувенирный набор «Ancient 2024»",
    "subtitle": "Сувениры Копенгаген 2024 • M4A1-S Добро пожаловать в джунгли",
    "category": "souvenir",
    "price": 5.9,
    "accentColor": "#10B981",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj3-lG1EU-loYby8i9U0ParV6VjI_mWAHPew-1w5-RvTC3lwUoj4G2AyougcirDbwMgDpAlQrIN4EPukNzlYuvg7hue1dxsvyYF4A",
    "items": [
      {
        "id": "skin-1350d58db761",
        "weapon": "P90",
        "name": "Ancient Earth",
        "rarity": "milspec",
        "basePrice": 2.43,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_CNk7vytYaFjNM-RHGiHz9F6ueZhW2e1lBl3sDyHw9uudXiWO1J1A5RzTOcI5hLqxIbnNLnhsgWN2d1GzHn9kGoXua3B7-6C",
        "isSticker": false
      },
      {
        "id": "skin-a1cba4e82b7b",
        "weapon": "SG 553",
        "name": "Lush Ruins",
        "rarity": "milspec",
        "basePrice": 1.84,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1a7s28fa1jM8-UHGKVz9F6ueZhW2fmkU4jtTzSw42pc3LEOgJ2ApZ4FORZ50XtxoXiPr-z5FDcit9ExXqvkGoXubXo--Tz",
        "isSticker": false
      },
      {
        "id": "skin-119597cef326",
        "weapon": "Nova",
        "name": "Army Sheen",
        "rarity": "milspec",
        "basePrice": 3.38,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiNW0PO8Zb1SM_iaAGKvzedxuPUnGXu1xEkktz-Dyd-oJH6ebwIpD5F5ReEJt0W-x4WxZOi0swCM34lNxDK-0H27DLwAVA",
        "isSticker": false
      },
      {
        "id": "skin-18c09d09603b",
        "weapon": "SSG 08",
        "name": "Jungle Dashed",
        "rarity": "milspec",
        "basePrice": 3.64,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_826abRoH-ObAXWE_uRjvuZlSha_nBovp3PUz9-pcnuXPQMpCMZwQ-UM5xixmtGxN-7n4wWKiN5DySivhyxJ5ixj_a9cBvFEfbOR",
        "isSticker": false
      },
      {
        "id": "skin-2367a9c28a7f",
        "weapon": "R8 Revolver",
        "name": "Night",
        "rarity": "milspec",
        "basePrice": 1.78,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c29Z5tjKfebGlicyOl-pK9oGCjkk0sktWyAntv6cSrDaAdzAsFxQuFZtRnqwNPlP7jg5QHd39oU02yg2UcfjkJE",
        "isSticker": false
      },
      {
        "id": "skin-47cc7c043d3d",
        "weapon": "P2000",
        "name": "Panther Camo",
        "rarity": "milspec",
        "basePrice": 4.26,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0POjV6ZhIfOYMXeRz_p-tfNWQyC0nQlp522Hm9ivdHjEOg4jC5t3TeAJ5xCwlYHlMuzmsQGIj99BzST9h39K6zErvbhYhH-Bzg",
        "isSticker": false
      },
      {
        "id": "skin-bb21a91fe207",
        "weapon": "MP7",
        "name": "Tall Grass",
        "rarity": "milspec",
        "basePrice": 3.37,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf9Ttk6-C3f6tiJM-UHGKVz9F6ueZhW2frxxlx4jnQw4yuJ3yfPQ4hDpd5QOVZsUa5l9XiNb6w5laPjosWyC6qkGoXuWq2Rgm4",
        "isSticker": false
      },
      {
        "id": "skin-c9fe23913c83",
        "weapon": "G3SG1",
        "name": "Ancient Ritual",
        "rarity": "milspec",
        "basePrice": 3.81,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1a4s2vZqdkJf6HMXCZz-tJvOhuRz39zE5ysWjSyterJX-VZ1UgX8EhTeVf5EOxlN3jYemwsw3WjtgQzi7-2zQJsHjSk9PLGw",
        "isSticker": false
      },
      {
        "id": "skin-c34dd8de2279",
        "weapon": "CZ75-Auto",
        "name": "Silver",
        "rarity": "milspec",
        "basePrice": 1.66,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4c29Yah7JeKsAm6Xyfo457c5Gn7nwEV-6jvRy96rcHPEPwcpDcZ4RrQItxHsk9bnMOrg5QKPi5UFk3v7O4lRrA",
        "isSticker": false
      },
      {
        "id": "skin-41f176a064d2",
        "weapon": "Tec-9",
        "name": "Blast From the Past",
        "rarity": "milspec",
        "basePrice": 2.39,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wipC0POga61oLuSsGm6cxP1JoORoTCGMmRQguynLm4qpJ3PDaQ9zXpIjQ-AJ4xawlNOzMrjktVPZ349AmS323Xga534-tvFCD_QT7Lx_Ug",
        "isSticker": false
      },
      {
        "id": "skin-07b30f648b35",
        "weapon": "AUG",
        "name": "Carved Jade",
        "rarity": "milspec",
        "basePrice": 4.37,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_C9k5fOqbZthKfebGimWkLlytrI5TXrlwBx-sGyGw9-gcC-fZgAhCpRwQbRbtxe4kdSxP7vm-UWA3MgZU-ku",
        "isSticker": false
      },
      {
        "id": "skin-4f5a5aa33496",
        "weapon": "Galil AR",
        "name": "Dusk Ruins",
        "rarity": "milspec",
        "basePrice": 3.85,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V7Z4Kf6AMXWVxdF6ueZhW2fnlBkl427dno2rcXLBagYjDMN0Qu8Ls0a9wIK0PrvhtlHYgogTyy_5kGoXuQFMiuDz",
        "isSticker": false
      },
      {
        "id": "skin-2d48a6eb741e",
        "weapon": "FAMAS",
        "name": "Dark Water",
        "rarity": "milspec",
        "basePrice": 2.52,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1a4s20baZ_Ic-XD3Wb_uJ_t-l9ASywkUsmsjzdmdiqIiqXaQ4oDJF0RuNZukO-ltflNu_mslffg9gTnC3gznQeYZiQwTg",
        "isSticker": false
      },
      {
        "id": "skin-e95b5ddb7a37",
        "weapon": "XM1014",
        "name": "Ancient Lore",
        "rarity": "restricted",
        "basePrice": 29.76,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7v-RaapuKfWdGliHwPx7j-1gSCGn204k626ByIqteX-TbAQjCcAhRbFcsUK5ktbhYb_j5VePi4JMnyX4in5XrnE8pNPbCik",
        "isSticker": false
      },
      {
        "id": "skin-b21f4fbf965a",
        "weapon": "MAC-10",
        "name": "Gold Brick",
        "rarity": "restricted",
        "basePrice": 26.24,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a4s2pZ6hpH_KBB2Sb_uJ_t-l9AX2wwhl35jzRw4yodymWO1R0X5V0FrRc4Bi-m4DuY-2xsgzY39oRmSTgznQe6Q1Q_KE",
        "isSticker": false
      },
      {
        "id": "skin-c682eedb501e",
        "weapon": "USP-S",
        "name": "Ancient Visions",
        "rarity": "restricted",
        "basePrice": 25.88,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSM-CsD2mTyOt4pN5rXSC0nQkYvzSCkpu3eHiSOAB0DsMkTOcJtRjtwNG1ZOvq4wDe2t1AzCuojy1JvSpp4ewKVr1lpPOm90TY1A",
        "isSticker": false
      },
      {
        "id": "skin-1dd39fb89c94",
        "weapon": "P90",
        "name": "Run and Hide",
        "rarity": "classified",
        "basePrice": 96.68,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_jdk5fOpfaV_H-DKXlicyOl-pK85H36xlEsmtT_SmN2geSqVOAMkCJpwQOQP5BOxlNHiYruwtgXajI0X02yg2YhNEJOA",
        "isSticker": false
      }
    ]
  },
  {
    "id": "souv_anubis",
    "name": "Сувенирный набор «Anubis 2024»",
    "subtitle": "Сувениры Копенгаген 2024 • M4A4 Глаз Гора и Воды Нефтиды",
    "category": "souvenir",
    "price": 6.2,
    "accentColor": "#F59E0B",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj3-lG1EU-loYby8i9U0ParV6VjNfKaHSmUkLd36bkxHSrqxBsmtT6EzIn6cCjDOw4nX8F1FOJc4xLsk4HuN-uz-UWA3HCx5SQN",
    "items": [
      {
        "id": "skin-e8e1c44874c0",
        "weapon": "R8 Revolver",
        "name": "Inlay",
        "rarity": "milspec",
        "basePrice": 2.11,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2pe5t_JeacAnGV09F3s-BnWyGmhiIloTKLgIrGLSLANkI-A5cjFOBc5ES_m921Ybux5gXeioMQzy2ojHlMuChi4bxQVfFzr6OEjRaBb-Nm3twhXg",
        "isSticker": false
      },
      {
        "id": "skin-eed9c3fe4b9d",
        "weapon": "M249",
        "name": "Submerged",
        "rarity": "milspec",
        "basePrice": 1.67,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wiFO0P_8PP1SM_OSHGaS_uJ_t-l9AXmyxkt0t2yDyYurci6TPQcgCcckTOMLsxCwk9PiM7i041Tago1FnH7gznQeMmXICmk",
        "isSticker": false
      },
      {
        "id": "skin-e86e226e8ee3",
        "weapon": "XM1014",
        "name": "Hieroglyph",
        "rarity": "milspec",
        "basePrice": 2.08,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7OeRcKk8cKHHMXeYwPx3v-lWQyC0nQlpsj7UwoyveCqROwRyC5cjQO8N5kSxlNKzN-O24QGL345BnniriXxP6jErvbhMqiQO1A",
        "isSticker": false
      },
      {
        "id": "skin-7749a115c5c1",
        "weapon": "MP7",
        "name": "Sunbaked",
        "rarity": "milspec",
        "basePrice": 3.06,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf-jFk4uL5V7d5Mv-dC1icyOl-pK84S3C1lx9w6mndytn8JymTZ1QoC5AiR-AMukbqkoXvZu2x5VfW2o9F02yg2esX37bl",
        "isSticker": false
      },
      {
        "id": "skin-a169fd0b8b16",
        "weapon": "AUG",
        "name": "Snake Pit",
        "rarity": "milspec",
        "basePrice": 2.81,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk6-egbZt5MvGDMWuZxuZi_rg4S3rqwxgltjyEy9r_cH7GbFBxXpd2RbEPukLtxoXgNOLg7gXe2thbjXKpZivzOLA",
        "isSticker": false
      },
      {
        "id": "skin-41f71f1a5f50",
        "weapon": "M4A1-S",
        "name": "Mud-Spec",
        "rarity": "milspec",
        "basePrice": 2.88,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj-xgQzqjkB4YvzSCkpu3I3rGP1JxDJpwEbEJ40G6mtfjPuqx7wTf3d5AzHn5hy9AuH5p4u9QBb1lpPNjrdVvDA",
        "isSticker": false
      },
      {
        "id": "skin-9a0273275e44",
        "weapon": "SSG 08",
        "name": "Azure Glyph",
        "rarity": "milspec",
        "basePrice": 2.73,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1c_M29e6M9eM-SAHKSyP1JvOhuRz39xERwsT_Sn4r6eHmeOAAlCZBxFrEP4BbpxtyxYbji7g3dg4lAnH372jQJsHi7hX5I-w",
        "isSticker": false
      },
      {
        "id": "skin-808bfc3a4f41",
        "weapon": "USP-S",
        "name": "Desert Tactical",
        "rarity": "milspec",
        "basePrice": 2.12,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSJ-OsG3SA0tFiseJ9RiqymSIksjCKpYPwJiPTcARxX5VzROcIuhLtl9HkMum25AbZ2YtDzCT5234b6Ho-67lRA6Bw_fDJz1aWLNvRpDs",
        "isSticker": false
      },
      {
        "id": "skin-eba9dcbab8fc",
        "weapon": "MAC-10",
        "name": "Echoing Sands",
        "rarity": "milspec",
        "basePrice": 3.81,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-ADWaCwOxJvOhuRz39xRlx5GmEyIn9cSjCOg52C8B0TLEOtxa_xNziMu3ktFOP2o1HznqqijQJsHgtnfG5bw",
        "isSticker": false
      },
      {
        "id": "skin-29609fc133b0",
        "weapon": "Tec-9",
        "name": "Mummy's Rot",
        "rarity": "milspec",
        "basePrice": 4.64,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiFO0Oara_1SLeWeA36vzedxuPUnS3_jlEUm5muAzd6qcXiRaw9yWZciRuQItUHpxNXnP--27lGL2d5CyzK-0H1vVdbZoA",
        "isSticker": false
      },
      {
        "id": "skin-80cb7aad6895",
        "weapon": "AK-47",
        "name": "Steel Delta",
        "rarity": "milspec",
        "basePrice": 2.32,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSM-SBAWmV_uJ_t-l9AXqyk0hy5GWEyduhdC2TPAEjDptzQbRf5EHrmoWyZu22sQLciokQyyzgznQesAEGx_A",
        "isSticker": false
      },
      {
        "id": "skin-05f333baf59c",
        "weapon": "AWP",
        "name": "Black Nile",
        "rarity": "milspec",
        "basePrice": 2.33,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V7d5Mv-dC1icyOl-pK89Gyvhlhsit2-BwoyrICmWPQcmDpEkQOdeskOxwNKzN7vm4VeP2oMR02yg2Z2CmmVC",
        "isSticker": false
      },
      {
        "id": "skin-7c46ff3046d0",
        "weapon": "MAG-7",
        "name": "Copper Coated",
        "rarity": "milspec",
        "basePrice": 2.71,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiVI0P-vb_NSJ_-cAmOvzedxuPUnHXDilhh1sGzQy4yscXPCbAcgXpNwE-UJuhjqkNW0Zrm05VDdjIoXyDK-0H3aMMdvcg",
        "isSticker": false
      },
      {
        "id": "skin-9967f102e7ca",
        "weapon": "Glock-18",
        "name": "Ramese's Reach",
        "rarity": "restricted",
        "basePrice": 22.62,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-BD2qKxP1JvOhuRz39kUkk42TcztmuIHOVb1cpCcZ1EeBY5BLtkIDgNOqwtALXjI0Un3r4jDQJsHidobtL7w",
        "isSticker": false
      },
      {
        "id": "skin-0fbe9304a4d2",
        "weapon": "Nova",
        "name": "Sobek's Bite",
        "rarity": "restricted",
        "basePrice": 27.96,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiVI0PyhfqVSM_-RC2yvzedxuPUnGX22wR9y5jvQz436IH_BPQ4nW8FwFuUDskO_lt3gMu_i71GNiNkWyjK-0H21VCFkHA",
        "isSticker": false
      },
      {
        "id": "skin-2c6b76cc25a1",
        "weapon": "P90",
        "name": "ScaraB Rush",
        "rarity": "restricted",
        "basePrice": 17.84,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf_jdk_6v-V7duIeKSDFifx9FhufJtQCSMmRQguynLmYmrdCnGPAUkD5BxQuYC5hO8wdK0Y-_nsgbciNhMyn6v238cuy1jsPFCD_S-VwnSrw",
        "isSticker": false
      },
      {
        "id": "skin-3c42ea1dd98c",
        "weapon": "FAMAS",
        "name": "Waters of Nephthys",
        "rarity": "classified",
        "basePrice": 132.67,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1Y-s2oaalsM8-bAWuf_uF1teBncCW6khUz_W3WmYv_JSmSZgZ0WJRwEeRbtUS5kIKyZejmsQHciN5AxHj8intK6il1o7FV74niokA",
        "isSticker": false
      }
    ]
  },
  {
    "id": "souv_dust2",
    "name": "Сувенирный набор «Dust II»",
    "subtitle": "Золотая коллекция • Сувенирный AK-47 Золотая арабеска",
    "category": "souvenir",
    "price": 14.5,
    "accentColor": "#FACC15",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bjn_lbkShWjzsSxwjJJ4P-hV6BoH_SGHXPCj-gg4-M4Sn-wxR9x4j6HmN-gcC_CPVIhCMB2QOZZthTqm9TuMujm5Q3Ay9USPT9sqvk",
    "items": [
      {
        "id": "skin-60c7eb4fb624",
        "weapon": "R8 Revolver",
        "name": "Desert Brush",
        "rarity": "milspec",
        "basePrice": 1.61,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLjm4Dv8TRe_c2mcZtvMuWABliTwON5j_VoQRa_nBovp3PUz9iodirCaQQkA5R2RbFe5kO5lt3lZuLn41DfiI9FxSn4j38f73xs_a9cBhkVhlil",
        "isSticker": false
      },
      {
        "id": "skin-d44eab1a62a7",
        "weapon": "P90",
        "name": "Desert DDPAT",
        "rarity": "milspec",
        "basePrice": 2,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf9Ttk6_a-abBSJPWAC3WE_uJ_t-l9ASjgwBx3sj_Ry4qqcXKfPVdxD5J4F7MIsBnpl9OzP7jg7gLd2dpFyiXgznQeFOalmMw",
        "isSticker": false
      },
      {
        "id": "skin-8ed983542769",
        "weapon": "SG 553",
        "name": "Bleached",
        "rarity": "milspec",
        "basePrice": 3.23,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I_82qbbdoMuSsHWyFzeJlj-1gSCGn20Uk5WTSytmqJH6XbwMoA8RyRuBY4Ea6kNC2Y-Oz7gbc3o9HxS2r2n5XrnE8gS50bog",
        "isSticker": false
      },
      {
        "id": "skin-a063f92abc42",
        "weapon": "MP7",
        "name": "Prey",
        "rarity": "milspec",
        "basePrice": 2.46,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf7jJk9feseqVuIf2sHGKU_uJ_t-l9AXvqwUsk4DyHnIr7eHySbg8gWcckTOUCsxawk9O1ZeywsQOIg95AznjgznQehcsrUP8",
        "isSticker": false
      },
      {
        "id": "skin-8a48b06ac368",
        "weapon": "Sawed-Off",
        "name": "Parched",
        "rarity": "milspec",
        "basePrice": 1.9,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2mcZtpJeOWHHOvw-J5v-xWQyC0nQlp52_dnoqsdHjDaAInDMNzQbZc4ROxxIbgMrmxtALagtgXniiv3HxOuDErvbjDfqqgDA",
        "isSticker": false
      },
      {
        "id": "skin-54693187ad0f",
        "weapon": "AUG",
        "name": "Spalted Wood",
        "rarity": "milspec",
        "basePrice": 3.61,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk6-C3V7NiL_SsAm6Xyfo44-JsFiy3wBkl6miBmNz9IHrEbAZxDZciEO8Kuxbtm93gP-Lgtlbe35UFk3vZ4ja9kg",
        "isSticker": false
      },
      {
        "id": "skin-348f142a19ac",
        "weapon": "MP9",
        "name": "Old Roots",
        "rarity": "milspec",
        "basePrice": 2.19,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f7jJk4v28Z5tuIeKFB2mX_vdzvO1mWBa_nBovp3PUmI6vdi-VOgInDpFxQOIKuhW8lNC1Puqw41fajIJCnCv9j3tIuixt_a9cBudlkiY3",
        "isSticker": false
      },
      {
        "id": "skin-64f26cedec6c",
        "weapon": "Five-SeveN",
        "name": "Withered Vine",
        "rarity": "milspec",
        "basePrice": 4.1,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRe7RSLf-BAViExPZiue1scDmmhw0rtgKcn4P1Ljz4Ml93UtZuReJcshe5m9HuYunhsQ3dgowWnCqviSgduC1q5OgGBKN0r6Le2gnHZKp9v8fcyxvZMw",
        "isSticker": false
      },
      {
        "id": "skin-9397611af549",
        "weapon": "M249",
        "name": "Midnight Palm",
        "rarity": "milspec",
        "basePrice": 3.37,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wjFL0OKvZKlSLvmUBnOvzedxuPUnS3Cxlx8ksW7Um9mtc3KTOwAlCJF4FO4PskO9wd3jZLjn4wSN2I1HzDK-0H3u05_o_Q",
        "isSticker": false
      },
      {
        "id": "skin-8d6ad2c220f9",
        "weapon": "P250",
        "name": "Black & Tan",
        "rarity": "milspec",
        "basePrice": 3.07,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0Pare6F_NM-eG2uEyO13vd5lRi67gVMm5GrTyN-ueH6fO1MlDMd2RLQC50Trw4fvMuPns1eLj9hHzCn4j3lK8G81tJittFNq",
        "isSticker": false
      },
      {
        "id": "skin-38eda175bd2a",
        "weapon": "Nova",
        "name": "Quick Sand",
        "rarity": "milspec",
        "basePrice": 4.59,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwipC0OaheqpSI_GeAViAwOd4pPJWQyC0nQlp5GSGwt-tJXvEblMlCpQmFuVc4ELqm9TiMuPr4Fbaj90Tnimohn5J7DErvbgkcpg0tA",
        "isSticker": false
      },
      {
        "id": "skin-844716d091ce",
        "weapon": "G3SG1",
        "name": "New Roots",
        "rarity": "milspec",
        "basePrice": 4.15,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1I_82jZ7ZiH_OSHHGZz-lJvOhuRz2xmQgijDGMnYftby2eOgEiDsMmReUDs0G5m4fhM7zm4ADY2d9FzyT_33kfvylp4utQV6E7uvqAlSn4mj4",
        "isSticker": false
      },
      {
        "id": "skin-dc1a0332945f",
        "weapon": "Galil AR",
        "name": "Amber Fade",
        "rarity": "milspec",
        "basePrice": 4.63,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0POvV6JsJPWsA2KEwOJ6ueJWQyC0nQlp52uGm9yodC3GZ1d0CMdyQeJctRDqmtayY-Kz71fW2IIUziz8intK6TErvbiZh4dEMQ",
        "isSticker": false
      },
      {
        "id": "skin-c14e09c62ca0",
        "weapon": "USP-S",
        "name": "Orange Anolis",
        "rarity": "restricted",
        "basePrice": 32.83,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSIf2sAm6KwPxyj_NsSxa_nBovp3OHn4qqcX3FbQMgD5okQeFYtBbsktLmMeux5leLjIIXxXn4i3wdvC9s_a9cBikK0tGN",
        "isSticker": false
      },
      {
        "id": "skin-294fc9bca944",
        "weapon": "M4A4",
        "name": "Red DDPAT",
        "rarity": "restricted",
        "basePrice": 15.07,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwipC0PaqeKV5H-WBDGae_vxztN5lRi67gVNxsT_SmYv8InrDblQhDJN2R7ZZ4RW7m9azYb_n5gLZ391AnCj92y8c8G81tFE6rC2P",
        "isSticker": false
      },
      {
        "id": "skin-af29d4349bcd",
        "weapon": "MAC-10",
        "name": "Case Hardened",
        "rarity": "restricted",
        "basePrice": 19.19,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1a_s2hYahoJM-fB2CY1aAituJtTnvjkUx3tziGmd6hJy-VZlAoWZtwFLRZ5EbpwNLvYb-zsgOKlcsbmn9_3b1O",
        "isSticker": false
      },
      {
        "id": "skin-f0ba928c4c15",
        "weapon": "UMP-45",
        "name": "Fade",
        "rarity": "classified",
        "basePrice": 121.75,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1a7s2oaaBoH-WeHlicyOl-pK8_HHzmzU52sTjWntegc32faAR2DMEkELMI4xmxw4G1Yrnn4FCM3d4Q02yg2U-vv27j",
        "isSticker": false
      }
    ]
  },
  {
    "id": "souv_nuke",
    "name": "Сувенирный набор «Nuke 2024»",
    "subtitle": "Сувениры Копенгаген 2024 • Радиационная коллекция",
    "category": "souvenir",
    "price": 4.9,
    "accentColor": "#38BDF8",
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj3-lG1EU-loYby8i9U0ParV6p4K_XdXmHElrogtLkxGXHgl0lw62-EyIyhcyiTZwUlXJV1TeUP40HpxNG0PvSiuVK0aQmXQA",
    "items": [
      {
        "id": "skin-64f9b04b2558",
        "weapon": "PP-Bizon",
        "name": "Facility Sketch",
        "rarity": "milspec",
        "basePrice": 2.34,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1T9s2sZLFoMOKaAHOv1uZ_pORWQyC0nQlptTjWyImvJSnBOgcjCcF2EbMDskLploCzZO-0swfZithGnCWq3X5P6jErvbhS6IbYJA",
        "isSticker": false
      },
      {
        "id": "skin-6b0b591466f0",
        "weapon": "P250",
        "name": "Facility Draft",
        "rarity": "milspec",
        "basePrice": 4.67,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0PCifaF9MvmdGliCxOpJvOhuRz39l05wt2XRzNr7dHjCalBxXschRucD4xnpwIfhN7ngtVTe2tlCyi_5hzQJsHgA1f7ZYg",
        "isSticker": false
      },
      {
        "id": "skin-b7561c6d5220",
        "weapon": "UMP-45",
        "name": "Facility Dark",
        "rarity": "milspec",
        "basePrice": 4.19,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1T9s2sZLFoMOKaAHOvw-JjtfNsSxa_nBovp3PVnN_7JyjDOgciWZRyQudf5hjrwYHnNOjl4gKN2YtNmXj5iS5Lvys5_a9cBlkwYg2r",
        "isSticker": false
      },
      {
        "id": "skin-cf50b5bef61d",
        "weapon": "Five-SeveN",
        "name": "Coolant",
        "rarity": "milspec",
        "basePrice": 2.63,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRYL1SJOWQGnSvxvxzte9WQyC0nQlp5m_cmNqueH7EbQAiXpN0FO5YtBK_x4XgMrjmswON2osQzn77iipJ6zErvbgVYFr6QQ",
        "isSticker": false
      },
      {
        "id": "skin-46cff8fcae00",
        "weapon": "Nova",
        "name": "Mandrel",
        "rarity": "milspec",
        "basePrice": 4.58,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwipC0Pa7a7B-H_eBC36vzedxuPUnS3DqzRsk4mvUwt2gcXLFPwZyDZZ0R-MM5xa4lNXvNurhsg2Kg94QxTK-0H0uEiuY9A",
        "isSticker": false
      },
      {
        "id": "skin-810cb4b6d950",
        "weapon": "M4A4",
        "name": "Mainframe",
        "rarity": "milspec",
        "basePrice": 4.17,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiNW0PGneqd4KeSRAWaCxdFlue1_SjuMmRQguynLmIyoI3KROlcgX5RxQrQMt0O6lIfkPuPi5AKKi9pEzX773XsYuHlj4_FCD_Ts_y5QsA",
        "isSticker": false
      },
      {
        "id": "skin-1b2de32446fe",
        "weapon": "MP7",
        "name": "Motherboard",
        "rarity": "milspec",
        "basePrice": 2.08,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_C9k7Pu8a7FkNPKcD3WU_ulkteRncCW6khUz_T7Wm9-vJHmWbAVzDJZzFuMP5hKwxIDiP7jlsQGI2Y9CzSr_j3tJ6i51o7FV2fbsGVQ",
        "isSticker": false
      },
      {
        "id": "skin-09caec0af065",
        "weapon": "Negev",
        "name": "Bulkhead",
        "rarity": "milspec",
        "basePrice": 3.4,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_m5Hl6x1T9s2qfad5M8-KC2uczvlJvOhuRz39kB50sWmBw4moJXnGPFd1WJMjFLFZs0S9lNGxNuLg7weLg91BzCj73TQJsHg2tHPevg",
        "isSticker": false
      },
      {
        "id": "skin-373e7e49f479",
        "weapon": "Galil AR",
        "name": "Cold Fusion",
        "rarity": "milspec",
        "basePrice": 3.05,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0Pq3V6p4I_yWD3Wv0uVjvO16cCiigBwYvzSCkpu3cy6UbQIgC5QkReYKsEHsmtS2Yb_itA3Y2INNyXj6jHxK7Ho_selRA71lpPOhjRfzhg",
        "isSticker": false
      },
      {
        "id": "skin-ddc69b0796bd",
        "weapon": "P90",
        "name": "Facility Negative",
        "rarity": "milspec",
        "basePrice": 4.3,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf9Ttk7f67bbR_Kf6HMWaB1O9JvOhuRz39zE5_tmvSzNugeXyUOAMlW5pyQOcN4Re-xte0Nb_n4wXf2INNynj_jzQJsHhMSbHang",
        "isSticker": false
      },
      {
        "id": "skin-1a3115020d99",
        "weapon": "MP5-SD",
        "name": "Co-Processor",
        "rarity": "milspec",
        "basePrice": 2.02,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1a4s2tYbZuNfmHDGiR0-pJsfB8Tha_nBovp3PQm9_7eHrFP1UgDJUlEbMNtxPrkd2xMLmw5AXf3opFmy-qiXgbvHk5_a9cBm-j3VYi",
        "isSticker": false
      },
      {
        "id": "skin-4609f8421163",
        "weapon": "P250",
        "name": "Exchanger",
        "rarity": "milspec",
        "basePrice": 3.45,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwipC0Pa7a7B-H_KfG2KvzedxuPUnHnDkzRhz42rUnoqvcXyfPA4lDZVxEbReskS7lteyZLvq4FCKgo1DxTK-0H1XkoQg2Q",
        "isSticker": false
      },
      {
        "id": "skin-9e9b9cd050d5",
        "weapon": "AWP",
        "name": "Acheron",
        "rarity": "milspec",
        "basePrice": 2.46,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk4eetZKFsMs-ABXKczf1JouRtTSWmkCIrujqNjsH4eC-ROFMkDccjR7EDsBCxlN2xZu7jtlaNj4pMxSr8hiIc53tt67kHT-N7rafi4HxI",
        "isSticker": false
      },
      {
        "id": "skin-8b56130194c8",
        "weapon": "AUG",
        "name": "Random Access",
        "rarity": "restricted",
        "basePrice": 15.7,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_C9k7Pu8a7FkNPKcD3WU_uFkse9uSha_nBovp3PcnImuIi2RbA8iD5B5FLYNtULqwdLuYbvg4w2Ng9hAziSvjnhBv31v_a9cBkz61Qws",
        "isSticker": false
      },
      {
        "id": "skin-7444d53b5e17",
        "weapon": "MAG-7",
        "name": "Core Breach",
        "rarity": "restricted",
        "basePrice": 26.45,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wipC0Py7a6hoIeKsBmiEzvx3vuZscCW6khUz_WzdnoyvIHvGPFJzD8B0QrINshPtw9fmYunrsw2PiNlEnC_5iy5L5y11o7FVg__4LKQ",
        "isSticker": false
      },
      {
        "id": "skin-96e7c9f4d6b6",
        "weapon": "Glock-18",
        "name": "Nuclear Garden",
        "rarity": "restricted",
        "basePrice": 14.95,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a4s2gfadhJfGBMXSb1OJ6o95uXSy2myIrujqNjsGpd3LCagQiWJVzEOdfu0PrkYe1MLnqtQzW34xDmH2oiiIc7i5p4u5RT-N7rQEHvAcX",
        "isSticker": false
      },
      {
        "id": "skin-c7e68ecd7321",
        "weapon": "Tec-9",
        "name": "Remote Control",
        "rarity": "classified",
        "basePrice": 68.41,
        "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiVI0Oara_1SJf6FAX6vzedxuPUnGSvrlhxw62zXn92sJynGOFcnA5J5EeIPsRm5l93mM-6w7gzW2olEzzK-0H1xr8Niww",
        "isSticker": false
      }
    ]
  }
];

export const INITIAL_QUESTS: QuestItem[] = [
  {
    id: 'q_open_5',
    title: 'Первые шаги коллекционера',
    description: 'Открой любые 5 кейсов или капсул',
    reward: 150,
    target: 5,
    progress: 0,
    claimed: false,
    type: 'open_cases',
  },
  {
    id: 'q_open_25',
    title: 'Магнат CS2',
    description: 'Открой 25 кейсов в любом разделе',
    reward: 650,
    target: 25,
    progress: 0,
    claimed: false,
    type: 'open_cases',
  },
  {
    id: 'q_sell_5',
    title: 'Сделка на торговой площадке',
    description: 'Продай 5 предметов обратно в систему',
    reward: 140,
    target: 5,
    progress: 0,
    claimed: false,
    type: 'sell_items',
  },
  {
    id: 'q_win_games_3',
    title: 'Хайроллер в мини-играх',
    description: 'Выиграй 3 раза в Ракетке, Минах, Монетке или 21',
    reward: 400,
    target: 3,
    progress: 0,
    claimed: false,
    type: 'win_games',
  },
  {
    id: 'q_upgrade_1',
    title: 'Инженер Апгрейда',
    description: 'Сделай 1 успешный апгрейд скина',
    reward: 300,
    target: 1,
    progress: 0,
    claimed: false,
    type: 'upgrade_win',
  },
  {
    id: 'q_get_covert',
    title: 'Охотник за Тайным и Золотом',
    description: 'Выбей Тайное (Красное) или Нож/Перчатки (Золото)',
    reward: 750,
    target: 1,
    progress: 0,
    claimed: false,
    type: 'get_covert',
  },
];

export function getWearInfo(floatValue: number): { wear: WearShort; wearName: string; multiplier: number } {
  if (floatValue < 0.07) {
    return { wear: 'FN', wearName: 'Прямо с завода (Factory New)', multiplier: 1.85 };
  }
  if (floatValue < 0.15) {
    return { wear: 'MW', wearName: 'Немного поношенное (Minimal Wear)', multiplier: 1.35 };
  }
  if (floatValue < 0.38) {
    return { wear: 'FT', wearName: 'После полевых испытаний (Field-Tested)', multiplier: 1.0 };
  }
  if (floatValue < 0.45) {
    return { wear: 'WW', wearName: 'Поношенное (Well-Worn)', multiplier: 0.85 };
  }
  return { wear: 'BS', wearName: 'Закалённое в боях (Battle-Scarred)', multiplier: 0.72 };
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
  const statTrak = !isSticker && !isSouvenir && Math.random() < 0.12;

  const floatValue = isSticker ? 0 : Number((Math.random() * 0.85).toFixed(6));
  const wearInfo = getWearInfo(floatValue);

  let finalPrice = template.basePrice * (isSticker ? 1 : wearInfo.multiplier);
  if (statTrak) finalPrice *= 2.4;
  if (isSouvenir) finalPrice *= 2.0;

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
    wear: isSticker ? 'FN' : wearInfo.wear,
    wearName: isSticker ? 'Турнирная наклейка CS2' : wearInfo.wearName,
    statTrak,
    souvenir: isSouvenir,
    isSticker,
    stickers,
    price: Number(finalPrice.toFixed(2)),
    obtainedAt: Date.now(),
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
