if(!self.define){let e,i={};const a=(a,c)=>(a=new URL(a+".js",c).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,s)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let d={};const r=e=>a(e,n),t={module:{uri:n},exports:d,require:r};i[n]=Promise.all(c.map((e=>t[e]||r(e)))).then((e=>(s(...e),d)))}}define(["./workbox-6a1bf588"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/NILE-OG-Tag.png",revision:"09a2d5fd21037096a46aaa93714a5b08"},{url:"/NILE_180.png",revision:"493c957d938e67c245c824457b0cadc8"},{url:"/NILE_192.png",revision:"129dbe689c5f73f6fba563b49cf390c3"},{url:"/NILE_OGTag.png",revision:"09a2d5fd21037096a46aaa93714a5b08"},{url:"/_next/static/Bp_a-ToS45blb8r4rvlUB/_buildManifest.js",revision:"1e8a2116796ed56b0c00922f0e759f15"},{url:"/_next/static/Bp_a-ToS45blb8r4rvlUB/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1090-61ce171a3a8d695d.js",revision:"61ce171a3a8d695d"},{url:"/_next/static/chunks/1315.124e9a63f9da9e1b.js",revision:"124e9a63f9da9e1b"},{url:"/_next/static/chunks/1345-b9cf0b40dffba296.js",revision:"b9cf0b40dffba296"},{url:"/_next/static/chunks/1474-c12403d6accb47a2.js",revision:"c12403d6accb47a2"},{url:"/_next/static/chunks/1773.17711dd7bb313373.js",revision:"17711dd7bb313373"},{url:"/_next/static/chunks/1862.b5598b57988b1ce1.js",revision:"b5598b57988b1ce1"},{url:"/_next/static/chunks/25c596ac.01e6b54b433c2f1f.js",revision:"01e6b54b433c2f1f"},{url:"/_next/static/chunks/2650-414b94640b7794b0.js",revision:"414b94640b7794b0"},{url:"/_next/static/chunks/2684.b825978dbb98b230.js",revision:"b825978dbb98b230"},{url:"/_next/static/chunks/2851.66e1e84c2bd50da8.js",revision:"66e1e84c2bd50da8"},{url:"/_next/static/chunks/2852872c-03060c245f461fb3.js",revision:"03060c245f461fb3"},{url:"/_next/static/chunks/2938.d888039c9a84a247.js",revision:"d888039c9a84a247"},{url:"/_next/static/chunks/2994-e5f3bd01ce2de536.js",revision:"e5f3bd01ce2de536"},{url:"/_next/static/chunks/3280-43187f8595117069.js",revision:"43187f8595117069"},{url:"/_next/static/chunks/3302.9094f4bf87fe26e3.js",revision:"9094f4bf87fe26e3"},{url:"/_next/static/chunks/3330.e9a7d8bc72d18ebf.js",revision:"e9a7d8bc72d18ebf"},{url:"/_next/static/chunks/4079.22dc9707d17f8944.js",revision:"22dc9707d17f8944"},{url:"/_next/static/chunks/4133-316ff5be3c149514.js",revision:"316ff5be3c149514"},{url:"/_next/static/chunks/4151.43c4dd69ebc9dc09.js",revision:"43c4dd69ebc9dc09"},{url:"/_next/static/chunks/4402.2417d8f4c83789eb.js",revision:"2417d8f4c83789eb"},{url:"/_next/static/chunks/4618-c5157e6852fd76ba.js",revision:"c5157e6852fd76ba"},{url:"/_next/static/chunks/4786-88e486aa0cd29967.js",revision:"88e486aa0cd29967"},{url:"/_next/static/chunks/5151-c3dacbb321f09ebb.js",revision:"c3dacbb321f09ebb"},{url:"/_next/static/chunks/5315.bb3c137b4a60a11a.js",revision:"bb3c137b4a60a11a"},{url:"/_next/static/chunks/5372.620b8a65bdb26b70.js",revision:"620b8a65bdb26b70"},{url:"/_next/static/chunks/5606-c2a4aa4b4e533dda.js",revision:"c2a4aa4b4e533dda"},{url:"/_next/static/chunks/5614-1ca6d2631da10de4.js",revision:"1ca6d2631da10de4"},{url:"/_next/static/chunks/562.f40947ed9a823b1e.js",revision:"f40947ed9a823b1e"},{url:"/_next/static/chunks/5840.979a4f62a6d42de3.js",revision:"979a4f62a6d42de3"},{url:"/_next/static/chunks/6261-86b553d6724c1df6.js",revision:"86b553d6724c1df6"},{url:"/_next/static/chunks/6539.d4c92c4f0874f70e.js",revision:"d4c92c4f0874f70e"},{url:"/_next/static/chunks/6846.8cc9e80e467332b9.js",revision:"8cc9e80e467332b9"},{url:"/_next/static/chunks/6875-0e3b405b3215ad95.js",revision:"0e3b405b3215ad95"},{url:"/_next/static/chunks/7112-e8187a1d2ab5d7d6.js",revision:"e8187a1d2ab5d7d6"},{url:"/_next/static/chunks/7444-6136fcbb1dfd8524.js",revision:"6136fcbb1dfd8524"},{url:"/_next/static/chunks/75fc9c18-5a55cb0f13134a2c.js",revision:"5a55cb0f13134a2c"},{url:"/_next/static/chunks/7680-b142af67017e1920.js",revision:"b142af67017e1920"},{url:"/_next/static/chunks/7857.33e020889b2b19e3.js",revision:"33e020889b2b19e3"},{url:"/_next/static/chunks/7951.38dc67b242c1fd7c.js",revision:"38dc67b242c1fd7c"},{url:"/_next/static/chunks/8059.e01f1bd2bed8f4af.js",revision:"e01f1bd2bed8f4af"},{url:"/_next/static/chunks/8239.6ddd86eb751dec32.js",revision:"6ddd86eb751dec32"},{url:"/_next/static/chunks/8361-2d4059017233bbf5.js",revision:"2d4059017233bbf5"},{url:"/_next/static/chunks/8459-0053d790b436c17a.js",revision:"0053d790b436c17a"},{url:"/_next/static/chunks/8494-0f05c771e2599f5b.js",revision:"0f05c771e2599f5b"},{url:"/_next/static/chunks/8719-bf67794fff87340d.js",revision:"bf67794fff87340d"},{url:"/_next/static/chunks/8917-66ec7b521b6cda6f.js",revision:"66ec7b521b6cda6f"},{url:"/_next/static/chunks/8937-0e2a05cf64d8172e.js",revision:"0e2a05cf64d8172e"},{url:"/_next/static/chunks/9051-dd5cc22981cd8163.js",revision:"dd5cc22981cd8163"},{url:"/_next/static/chunks/9065-e82d60f5d1ebbf77.js",revision:"e82d60f5d1ebbf77"},{url:"/_next/static/chunks/9234-a4a957ef0bae23a0.js",revision:"a4a957ef0bae23a0"},{url:"/_next/static/chunks/9370-aa2e20c82584955f.js",revision:"aa2e20c82584955f"},{url:"/_next/static/chunks/94726e6d-bbe822592c00d390.js",revision:"bbe822592c00d390"},{url:"/_next/static/chunks/9832-4b35d8a1b2774140.js",revision:"4b35d8a1b2774140"},{url:"/_next/static/chunks/9914-0aa68e08c6d075d1.js",revision:"0aa68e08c6d075d1"},{url:"/_next/static/chunks/9973-debdc70c3afa8125.js",revision:"debdc70c3afa8125"},{url:"/_next/static/chunks/framework-79bce4a3a540b080.js",revision:"79bce4a3a540b080"},{url:"/_next/static/chunks/main-ddff16da8083ecbc.js",revision:"ddff16da8083ecbc"},{url:"/_next/static/chunks/pages/404-7f516af9c57e758c.js",revision:"7f516af9c57e758c"},{url:"/_next/static/chunks/pages/_app-99033e3fa1d05240.js",revision:"99033e3fa1d05240"},{url:"/_next/static/chunks/pages/_error-f2496e8b9fdedb89.js",revision:"f2496e8b9fdedb89"},{url:"/_next/static/chunks/pages/checkService-2c848398a18ec5c4.js",revision:"2c848398a18ec5c4"},{url:"/_next/static/chunks/pages/common-03a912327243b3ab.js",revision:"03a912327243b3ab"},{url:"/_next/static/chunks/pages/common/dao-8dd8cfa9d93b4139.js",revision:"8dd8cfa9d93b4139"},{url:"/_next/static/chunks/pages/common/life-6a59ed41d4fdc33d.js",revision:"6a59ed41d4fdc33d"},{url:"/_next/static/chunks/pages/common/marketplace-7e19e371c9754285.js",revision:"7e19e371c9754285"},{url:"/_next/static/chunks/pages/common/mypage-54712cd93aeae85a.js",revision:"54712cd93aeae85a"},{url:"/_next/static/chunks/pages/common/nile-53b2adb8838fbca2.js",revision:"53b2adb8838fbca2"},{url:"/_next/static/chunks/pages/community-5137609a035a9523.js",revision:"5137609a035a9523"},{url:"/_next/static/chunks/pages/community/papyrus-13ec31238492a868.js",revision:"13ec31238492a868"},{url:"/_next/static/chunks/pages/dao/home-5bae736e7db117e3.js",revision:"5bae736e7db117e3"},{url:"/_next/static/chunks/pages/dao/protocol-4a3ebe8f428e52b7.js",revision:"4a3ebe8f428e52b7"},{url:"/_next/static/chunks/pages/dao/recruiting-2c91100172346421.js",revision:"2c91100172346421"},{url:"/_next/static/chunks/pages/dao/stationprotocol-ea2e2e0bdbf7d026.js",revision:"ea2e2e0bdbf7d026"},{url:"/_next/static/chunks/pages/dao/treasury-3498d6f57f23a69c.js",revision:"3498d6f57f23a69c"},{url:"/_next/static/chunks/pages/dao/trust-f93ab5d16246255f.js",revision:"f93ab5d16246255f"},{url:"/_next/static/chunks/pages/index-349f3f173c6515b5.js",revision:"349f3f173c6515b5"},{url:"/_next/static/chunks/pages/life-9d09540f6ae45577.js",revision:"9d09540f6ae45577"},{url:"/_next/static/chunks/pages/life/lus-93ebfebb41c58e27.js",revision:"93ebfebb41c58e27"},{url:"/_next/static/chunks/pages/life/nile-a31d2ace02f3d088.js",revision:"a31d2ace02f3d088"},{url:"/_next/static/chunks/pages/life/tangled-bfe42329f5a9de5c.js",revision:"bfe42329f5a9de5c"},{url:"/_next/static/chunks/pages/marketplace-2dc260441ecdb512.js",revision:"2dc260441ecdb512"},{url:"/_next/static/chunks/pages/marketplace/bid-d6072b0668368477.js",revision:"d6072b0668368477"},{url:"/_next/static/chunks/pages/marketplace/collection-a9e0ca0caaa0168f.js",revision:"a9e0ca0caaa0168f"},{url:"/_next/static/chunks/pages/marketplace/listing-702c3ffc733192be.js",revision:"702c3ffc733192be"},{url:"/_next/static/chunks/pages/marketplace/nft-03c8200dae7b124e.js",revision:"03c8200dae7b124e"},{url:"/_next/static/chunks/pages/mypage-8af0adf8922e0ea1.js",revision:"8af0adf8922e0ea1"},{url:"/_next/static/chunks/pages/mypage/operate-7bf6a78e02067c93.js",revision:"7bf6a78e02067c93"},{url:"/_next/static/chunks/pages/mypage/profile-d2efdebf709fe257.js",revision:"d2efdebf709fe257"},{url:"/_next/static/chunks/pages/nile/story-8a2248bfde14a0b6.js",revision:"8a2248bfde14a0b6"},{url:"/_next/static/chunks/pages/nile/storydetail-2c6deeac33c527f2.js",revision:"2c6deeac33c527f2"},{url:"/_next/static/chunks/pages/notification-dd02c7beadb4a143.js",revision:"dd02c7beadb4a143"},{url:"/_next/static/chunks/pages/policy/privacy-7dbd6485b59c70aa.js",revision:"7dbd6485b59c70aa"},{url:"/_next/static/chunks/pages/policy/terms-e163a19457a4cf29.js",revision:"e163a19457a4cf29"},{url:"/_next/static/chunks/pages/tokens-e4586fd8fa85d39a.js",revision:"e4586fd8fa85d39a"},{url:"/_next/static/chunks/pages/tokens/detail-3092b173af9e4304.js",revision:"3092b173af9e4304"},{url:"/_next/static/chunks/pages/tokens/operate-cdd02facfc12d015.js",revision:"cdd02facfc12d015"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-1906cb810549bf3a.js",revision:"1906cb810549bf3a"},{url:"/_next/static/css/5c4826c56b72a529.css",revision:"5c4826c56b72a529"},{url:"/_next/static/css/d5db1ea335b2d910.css",revision:"d5db1ea335b2d910"},{url:"/_next/static/media/bg_apply_collectibles.245b37cf.png",revision:"245b37cf"},{url:"/_next/static/media/bg_apply_movetoearn.70ad6f8f.png",revision:"70ad6f8f"},{url:"/_next/static/media/bg_apply_music.6974ade4.png",revision:"6974ade4"},{url:"/_next/static/media/bg_apply_pfp.5aeac1aa.png",revision:"5aeac1aa"},{url:"/_next/static/media/bg_apply_pixelart.bbecff56.png",revision:"bbecff56"},{url:"/_next/static/media/bg_apply_playtoearn.eb27a241.png",revision:"eb27a241"},{url:"/_next/static/media/bg_apply_relaxtoearn.b33f9843.png",revision:"b33f9843"},{url:"/_next/static/media/bg_apply_sports.ff1c5cf0.png",revision:"ff1c5cf0"},{url:"/_next/static/media/bg_apply_talktoearn.48123ca2.png",revision:"48123ca2"},{url:"/_next/static/media/bg_apply_utility.5d260f31.png",revision:"5d260f31"},{url:"/_next/static/media/bg_daotype_lg.64f95a6f.png",revision:"64f95a6f"},{url:"/_next/static/media/bg_daotype_md.7b970a9f.png",revision:"7b970a9f"},{url:"/_next/static/media/bg_daotype_sm.2a8477fc.png",revision:"2a8477fc"},{url:"/_next/static/media/bg_life_hero_sm.98e4af6c.png",revision:"98e4af6c"},{url:"/_next/static/media/bg_life_lus.b1cad57c.png",revision:"b1cad57c"},{url:"/_next/static/media/bg_life_snkrz.8129991f.png",revision:"8129991f"},{url:"/_next/static/media/bg_life_story.07c44f16.png",revision:"07c44f16"},{url:"/_next/static/media/bg_life_tangled.eb81a866.png",revision:"eb81a866"},{url:"/_next/static/media/bg_life_who_next.4a3b4fb3.png",revision:"fab6930e4e9d57b707cfc4e22435699f"},{url:"/_next/static/media/bg_nile_pyramid.dc6ca7b3.png",revision:"5720f506fa0ee1a5cf72d6080f853b5e"},{url:"/_next/static/media/bg_recruiting_members.70ea31ce.png",revision:"70ea31ce"},{url:"/_next/static/media/bg_station_mission.1b1bfabc.png",revision:"1b1bfabc"},{url:"/_next/static/media/bg_wonder_top.57b6cd63.png",revision:"57b6cd63"},{url:"/_next/static/media/ico_life_web3_key.7aa62904.png",revision:"1feb26c82a6d7c206833056be062456c"},{url:"/_next/static/media/ico_lus_artist_border_female.dc0ed337.png",revision:"8e3c75346eddddbb082251ac63b66575"},{url:"/_next/static/media/ico_lus_artist_border_male.c1744d82.png",revision:"2249eac026b97921dbb9c9549146e81e"},{url:"/_next/static/media/ico_lus_artist_female.37f8f5ce.png",revision:"2f58d74b4f1fffbf73d8d5a7a0ef689c"},{url:"/_next/static/media/ico_lus_artist_male.ef07e290.png",revision:"438b9b06d7aefb474639b66f19ff7eb7"},{url:"/_next/static/media/ico_lus_bus.bf09bf60.gif",revision:"a3f60cfe5b270d302700264d663ffe7c"},{url:"/_next/static/media/ico_point1_wonder.8d736106.png",revision:"8d736106"},{url:"/_next/static/media/ico_point2_wonder.3d762dc4.png",revision:"3d762dc4"},{url:"/_next/static/media/ico_point3_wonder.80c411d8.png",revision:"80c411d8"},{url:"/_next/static/media/image_nile_star1.1939a1c4.png",revision:"d89571f84a494ace71d60a78a038c0c7"},{url:"/_next/static/media/image_nile_star2.0556438a.png",revision:"c4795478e344a10c5cef0f6e5bb850fa"},{url:"/_next/static/media/image_nile_star3.9beb5ea8.png",revision:"2956658e7d5805ecf68f7c30b46653af"},{url:"/_next/static/media/img_404.321ffb03.png",revision:"9e8dcc2a097435afb6a62d7a226c03c1"},{url:"/_next/static/media/img_A02_Aldgate.9a0a3814.png",revision:"98ac43fb5de3b693d3edbfc60640295b"},{url:"/_next/static/media/img_A09_Arsenal.b66b9c23.png",revision:"fe0606d77e913d7f35bcd8bb400dc5f7"},{url:"/_next/static/media/img_B08_Bayswater.d58ed34f.png",revision:"d7322584b33a12e5331a54387dfe8fae"},{url:"/_next/static/media/img_B10_Belsize_Park.42e5ba22.png",revision:"f9d7d2a2d1d9361ace21ef9045694a2d"},{url:"/_next/static/media/img_B16_Borough.36356ad4.png",revision:"d3007a55838194d20e40890c4296cce0"},{url:"/_next/static/media/img_B22_Bromley_by_Bow.29402ece.png",revision:"94c392db5aff4a9117f5bd860beb57ca"},{url:"/_next/static/media/img_B24_Burnt_Oak.fcc0cd78.png",revision:"b4ef1c579b05fcce3c1f43d4ca779f24"},{url:"/_next/static/media/img_C19_Cockfosters.6e26bc37.png",revision:"65615c2e58cef0ce970f1734cf26757e"},{url:"/_next/static/media/img_D03_Dagenham_Heathway.25197bcf.png",revision:"2bd0e59a8b73b12de444494a72f0b7e9"},{url:"/_next/static/media/img_E05_East_Acton.2d34f739.png",revision:"b940f1b0132104bea510bdc76962ade6"},{url:"/_next/static/media/img_F04_Finchley_Road.63a8b450.png",revision:"c1b3049b6a75219632f5de01c2509b0b"},{url:"/_next/static/media/img_G09_Green_Park.2e90656e.png",revision:"ab546aa13def7343185356580628293a"},{url:"/_next/static/media/img_H04_Hampstead.67d81b78.png",revision:"5082bfeddf50ab7b9bc0238dc891fe10"},{url:"/_next/static/media/img_L09_London_Bridge.2d421245.png",revision:"bf28661e523f84ea8b2fcb35c87f7a4a"},{url:"/_next/static/media/img_M07_Millhill_East.5ae64588.png",revision:"ff0ecb4c6c62192336b4418e2862e0df"},{url:"/_next/static/media/img_M11_Morden.6083ea43.png",revision:"e22edb46b98eda0d61b14f4aa7cd29e9"},{url:"/_next/static/media/img_N05_North_Fields.51f2f44f.png",revision:"08414c5bb89f617b57dbc44a5d4aaaec"},{url:"/_next/static/media/img_R09_Ruislip.a44026df.png",revision:"8e5b8523ca2123679272c854bbb49fd6"},{url:"/_next/static/media/img_S07_South_Harrow.a0d60854.png",revision:"97ea51066d0ab3e7eb8daf96cb026e54"},{url:"/_next/static/media/img_S08_South_Wimbledon.9042846f.png",revision:"845b3cd257983f00893afd7d88ec0311"},{url:"/_next/static/media/img_community_messenger.997ab44d.png",revision:"d19aa075b2c309ecc916e6d52743621d"},{url:"/_next/static/media/img_community_messenger_ko.3aaf7b84.png",revision:"24970dd0a7fdfc6a121414bf2212c1c5"},{url:"/_next/static/media/img_community_thumbnail_dao.60b32560.png",revision:"c8ff73a84ec025614d5acc7b85fee7f8"},{url:"/_next/static/media/img_community_thumbnail_nft.b0dedd20.png",revision:"fffff086427a3911f3de09fd06f1a97d"},{url:"/_next/static/media/img_community_thumbnail_stroy.c2b4821e.png",revision:"16867b8f16fae20abc3656664aedbc61"},{url:"/_next/static/media/img_community_thumbnail_tangled.131d97d3.png",revision:"d3ddda2b6fc3ebee1e849494e7e4a46a"},{url:"/_next/static/media/img_community_union.1a78f209.png",revision:"10f76b3f8e8f368e5759656216be53aa"},{url:"/_next/static/media/img_inspection.985c842f.png",revision:"2e2ae1411730c23eff19f0aa0e46e23b"},{url:"/_next/static/media/img_life_arrow_l.31ef720a.png",revision:"31ef720a"},{url:"/_next/static/media/img_life_arrow_l_w.bcc2dcb4.png",revision:"bcc2dcb4"},{url:"/_next/static/media/img_life_arrow_r.d55c3658.png",revision:"d55c3658"},{url:"/_next/static/media/img_life_arrow_r_w.d14228c1.png",revision:"d14228c1"},{url:"/_next/static/media/img_luxury_1.be3cb014.png",revision:"63317dbaa25eb8448e71d87613021dc1"},{url:"/_next/static/media/img_luxury_11.7e06361b.png",revision:"80a5407c2fd9c4850dbe101c247b50e1"},{url:"/_next/static/media/img_luxury_15.72b0a982.png",revision:"6320abd3e1dac73323ff534cac8f537e"},{url:"/_next/static/media/img_luxury_17.b062496f.png",revision:"79444c762300e1475461ee81060caabc"},{url:"/_next/static/media/img_luxury_2.9fb199d5.png",revision:"efb74a6cf5f319650f509937874f83b2"},{url:"/_next/static/media/img_luxury_20.2933c80b.png",revision:"80baf526d4c051555c5e526f06efad6e"},{url:"/_next/static/media/img_luxury_23.f0c34bfe.png",revision:"a29d74cf2d4e5cd38cc7f3573b5e52e1"},{url:"/_next/static/media/img_luxury_24.66b42a0e.png",revision:"cff50dea218cdf46305920a486a7e8ec"},{url:"/_next/static/media/img_luxury_25.2fbaccd8.png",revision:"d8c6123136f8203c787a7dba75698dba"},{url:"/_next/static/media/img_luxury_26.fdcdabc0.png",revision:"c26e33dca6a2a4b7abf87e3aedd9594f"},{url:"/_next/static/media/img_luxury_27.ed8a8b8e.png",revision:"f99cb30256e6383e9d8613b4c31e0783"},{url:"/_next/static/media/img_luxury_28.38ae8979.png",revision:"59a8808ef5f08475bb3c2310a0c91792"},{url:"/_next/static/media/img_luxury_29.eddf718f.png",revision:"abfbc496cfd9233669b09bb9fb8f4874"},{url:"/_next/static/media/img_luxury_31.de6947ef.png",revision:"20eb9737e3f825ad3bbd7581f164d125"},{url:"/_next/static/media/img_luxury_32.5b1b2448.png",revision:"ea9025166d4dc8eeef09d688c388c8b1"},{url:"/_next/static/media/img_luxury_33.4a67885d.png",revision:"c8cd3e0f0a36e1b153236bd10904e32b"},{url:"/_next/static/media/img_luxury_6.b76beac5.png",revision:"a181a46660bfc2cfaad5cd4fce9a7ae2"},{url:"/_next/static/media/img_luxury_7.e6c78fd7.png",revision:"411a9dc4222889f0b6ec1b71cf063def"},{url:"/_next/static/media/img_luxury_8.5c2ab7c6.png",revision:"e747e5c6868d975c3f6b234d2485de3c"},{url:"/_next/static/media/img_luxury_9.80bb96f8.png",revision:"aff444b94a5c0e93f08f183e6cf9db9e"},{url:"/_next/static/media/img_marketplace_evolution_bottom.448cefd1.png",revision:"0d2be2a9ef41fc29079e017a9db15833"},{url:"/_next/static/media/img_marketplace_evolution_mid.28dd6cbd.png",revision:"534532a62a279b6db9725f8e31647d2d"},{url:"/_next/static/media/img_marketplace_evolution_top.cdb8f99a.png",revision:"eec8b182e5e86c1c9ed781076527a925"},{url:"/_next/static/media/img_nile_pyramid.d527753e.png",revision:"eb09400d93986c41276021add62e6250"},{url:"/_next/static/media/img_papyrus_pattern.c82b8e4e.png",revision:"c82b8e4e"},{url:"/_next/static/media/img_papyrus_screen.edf267a1.png",revision:"edf267a1"},{url:"/_next/static/media/img_papyrus_screen_ko.f1415faa.png",revision:"f1415faa"},{url:"/_next/static/media/img_tangled_jennis_1.08cb1acc.png",revision:"2f22c7259f9f0a0311b04ed6dc31e6a8"},{url:"/_next/static/media/img_tangled_jennis_2.cbdd9666.png",revision:"12dd01df20639d67cec3a72a7c60ea27"},{url:"/_next/static/media/img_tangled_jennis_3.7998b4a1.png",revision:"e409786e30fdf150e7cae3c235e65ecf"},{url:"/_next/static/media/img_tangled_jennis_4.e679a859.png",revision:"2cc8bc0345bb06fe458548423dddd753"},{url:"/_next/static/media/img_tangled_jennis_5.71775d5e.png",revision:"321c98ae3c5c7b11316ed72d00466633"},{url:"/_next/static/media/img_tangled_jennis_6.72390295.png",revision:"364a94ac18824f32e51ccdeaead243ed"},{url:"/_next/static/media/img_tangled_jennis_7.9a1d8111.png",revision:"e70549e0ecf5d15eb601d56301f09ffc"},{url:"/_next/static/media/img_team_edwardlee.c8dde1d3.png",revision:"6c11549d61e9ae590f7695b27c111b4c"},{url:"/_next/static/media/img_team_hyopark.1229360b.png",revision:"e9ad9de0cd68ea8936a015bca39a20d5"},{url:"/_next/static/media/img_team_jinpark.a50b9d3d.png",revision:"1bf21e2133f2be6344d7d3405ac7d0ae"},{url:"/_next/static/media/img_team_jsshin.f4ea4fa5.png",revision:"95af59c7b4e4d4117d92cf871677ba20"},{url:"/_next/static/media/img_team_moomin.1b5d7fb4.png",revision:"54f3fe1893c292b69234d8f856eec068"},{url:"/_next/static/media/img_team_paulcho.92162bd0.png",revision:"f63bf847cf45f7d1016b9075a892c699"},{url:"/_next/static/media/img_wallet_confirm_modal_progress01.057be733.png",revision:"30be8d605d8787e97720eb25798f4163"},{url:"/_next/static/media/img_wallet_confirm_modal_progress02.76a3eacb.png",revision:"24a86a531dadc3cf0771a2d7e6223c4a"},{url:"/favicon.ico",revision:"b74506fd205a9541d43207afe1069682"},{url:"/icons/github-icon.svg",revision:"f7208e5aa6c004a74c28ae55f5ea9a20"},{url:"/icons/ico_arrow_check.svg",revision:"c0ea58797ccb4a4f5341db65de0841e7"},{url:"/icons/ico_avatar.svg",revision:"d8fc00fc685addfb066476ea3805b679"},{url:"/icons/ico_avatar1.svg",revision:"5c48fdd59aa3854a89c55a95cfc61d5e"},{url:"/icons/ico_avatar2.svg",revision:"ecf35edbc19e5f9d0555fff46c839ddc"},{url:"/icons/ico_avatar3.svg",revision:"f77051da5640dfa42cafc767492b3dad"},{url:"/icons/ico_avatar4.svg",revision:"15f0b22c49c953e4002539c611e46324"},{url:"/icons/ico_avatar5.svg",revision:"d6a650e975a6287451f85d28564317a8"},{url:"/icons/ico_check_b1.svg",revision:"60b9613ad8a31e82194611a961aec593"},{url:"/icons/ico_check_b2.svg",revision:"955cfb40e947f55a3651dbf2e5ba155e"},{url:"/icons/ico_check_gray.svg",revision:"fec7bc5c817aa2cd693614087b0a9b4d"},{url:"/icons/ico_check_w1.svg",revision:"214f5e0376f3380467a3a9b7a851bbfe"},{url:"/icons/ico_check_w2.svg",revision:"06bb7766ca89fe6bf37331b71db342de"},{url:"/icons/ico_close.svg",revision:"cd5789c4b86841aeeb1728265ed6b53f"},{url:"/icons/ico_copy_link.svg",revision:"ba65b27e5d8035dff18e4bd06dbb79cf"},{url:"/icons/ico_discord.svg",revision:"3cf362612873ddc4304b8cb396e86cdb"},{url:"/icons/ico_facebook.svg",revision:"0b99909f99bc0400b5e6febe86a91569"},{url:"/icons/ico_file_jpeg.svg",revision:"ef72264bdb0256f20653b8b1d1afa9d8"},{url:"/icons/ico_file_pdf.svg",revision:"58ac7742f9b50289f3a457126be9f5cb"},{url:"/icons/ico_file_png.svg",revision:"b692f23216eefbfef9b4ee96629da0f4"},{url:"/icons/ico_gitbook.svg",revision:"482fe9ccfaca3cd2bd5bd3ab12a318ec"},{url:"/icons/ico_homepage.svg",revision:"bfd5d15b18891d108d6dc9cc140c81bb"},{url:"/icons/ico_information.svg",revision:"82dba84bf832b6f6d58206bc1429e80f"},{url:"/icons/ico_instagram.svg",revision:"98b6fc66430df1cf782d6b08ef5d5021"},{url:"/icons/ico_instagram_line.svg",revision:"79b968d081b55baa8a5a4c1fcfdf7a24"},{url:"/icons/ico_lus264.svg",revision:"60096e27ac892cb0d37cd6e0787f90bb"},{url:"/icons/ico_medium.svg",revision:"6e1294a3e53a95153b3884cec42fafe6"},{url:"/icons/ico_papyrus.svg",revision:"ebeba7195271c9e741882b4ff1c8ef07"},{url:"/icons/ico_pencil.svg",revision:"270e227da339b6733cbc7a1a6b10eb9d"},{url:"/icons/ico_sort.png",revision:"7438a3cafbb948365ac6b464bd594e0b"},{url:"/icons/ico_sort.svg",revision:"34ec9cce8383655145d72709845a70aa"},{url:"/icons/ico_table_filter.svg",revision:"f96059261c758fadc59e27439225ab10"},{url:"/icons/ico_table_sorting.svg",revision:"038c81bdd8c70cb3efa7f8f4f251004a"},{url:"/icons/ico_table_sorting_active.svg",revision:"a6bc02352a6a77709ad02d33cd660d4e"},{url:"/icons/ico_tangled.svg",revision:"6df0525c6d041d2133f4d9e52b83b9fc"},{url:"/icons/ico_telegram.svg",revision:"bd63a6d1abe698e8ee8a33cc347da1c8"},{url:"/icons/ico_twitter.svg",revision:"cf9fb7e937699d4b3fe58cf6ee39c62d"},{url:"/icons/ico_youtube.svg",revision:"1175a1f22f88a00d3fa69ce1404394b2"},{url:"/icons/linkedin-icon.svg",revision:"d40192afd85eb7fadb84fdccc00ce587"},{url:"/icons/moon-icon.svg",revision:"d4c74f9bf1e514b7ce5e99dafdc38faf"},{url:"/icons/nextjs-icon.svg",revision:"216415684148edcd841fb3f31de71418"},{url:"/icons/pankod-icon.svg",revision:"176e6ccfea951905114d0c9552be18a6"},{url:"/icons/sun-icon.svg",revision:"4a2f0ab3afe1b8801e0b2af3ba143428"},{url:"/icons/twitter-icon.svg",revision:"96694b8fd7b2aebcf9d6ad10309bfb48"},{url:"/icons/youtube-icon.svg",revision:"08cbf01bf1fde60568ec3a55bfd5d902"},{url:"/images/bg_buy_result_modal.png",revision:"5b6f8db23f4344db9f699b1933987008"},{url:"/images/bg_community_banner_lg.png",revision:"be1d53aeb27d52577587aedff23808f7"},{url:"/images/bg_community_banner_md.png",revision:"b67a3a65d800ae66d727cce95fb214f2"},{url:"/images/bg_life_information.png",revision:"25f6f838c764c3ce8d5815ff75ba4337"},{url:"/images/bg_life_information_md.png",revision:"a5a15bb1520a63b307658c3efa48c1b2"},{url:"/images/bg_life_information_sm.png",revision:"53f3655c43d87b929d2ed38f9572b5e0"},{url:"/images/bg_life_lus.png",revision:"96e2f52b0189bd9737445a1e897aaad5"},{url:"/images/bg_life_lus_1px.png",revision:"df455965175c8203f93a36bbac536eb9"},{url:"/images/bg_life_overview_web3.png",revision:"d96cecb3d8262e003eac9083bf5b112b"},{url:"/images/bg_market_collection_img.png",revision:"28934b590e89d1271d802d9b0fee7a50"},{url:"/images/bg_market_collection_lus.png",revision:"ee04ff71ef9cea9f8834be28ace6a59c"},{url:"/images/bg_market_collection_snkrz.png",revision:"8b1e4e50b2e806fb3fe7e71fb995526f"},{url:"/images/bg_market_collection_story.png",revision:"f1c096281c3a77af8bb26c6268feb12d"},{url:"/images/bg_market_collection_tangled.png",revision:"822d770eb6272375357cf37db6915543"},{url:"/images/bg_market_hero_tower.png",revision:"119e3bd3f61bf89773b9233b9200e4ca"},{url:"/images/ico_lus_bus.gif",revision:"a3f60cfe5b270d302700264d663ffe7c"},{url:"/images/img_dao_station_involve_wonder.png",revision:"7091308ec9fa96572c8d3808b46ed7ca"},{url:"/images/img_life_community01.png",revision:"bce8772879cbfaa286ecde649b8e039d"},{url:"/images/img_life_community02.png",revision:"1cd56ba05e5dc2c9733a43f1d0e51d24"},{url:"/images/img_life_community03.png",revision:"a802700504ceebca84566435c8c0620c"},{url:"/images/img_life_highend1.png",revision:"c64b3003fe0cdac34f0adda3f29e2a2c"},{url:"/images/img_life_highend10.png",revision:"5eb789a6411d373effdfa4726ba19855"},{url:"/images/img_life_highend11.png",revision:"9a25e71cfb15cd6eb56a250d1760bea2"},{url:"/images/img_life_highend2.png",revision:"5a2dc21b8d2efaa819acfb74b6c38b57"},{url:"/images/img_life_highend3.png",revision:"877e55d7fe07cedd12fbdca8ab498e0f"},{url:"/images/img_life_highend4.png",revision:"6999241274c9263fd25b65169358e97e"},{url:"/images/img_life_highend5.png",revision:"fe77d66fce45a72e48f89b6f026a76b9"},{url:"/images/img_life_highend6.png",revision:"32fd4b72654eb5ec1afd6f2ee995dbb2"},{url:"/images/img_life_highend7.png",revision:"eae11b4719b6073a87fe35216d5d1624"},{url:"/images/img_life_highend8.png",revision:"6b8087024fd325197b1b220e107015ee"},{url:"/images/img_life_highend9.png",revision:"9de045a51546ab5512cd7373a62be5c1"},{url:"/images/img_life_info_shape01.png",revision:"ae9f729028f929338328ca87b199ef9e"},{url:"/images/img_life_luxury1.png",revision:"8b9263a5d97c7a59359b557fef88a94b"},{url:"/images/img_life_luxury10.png",revision:"402493036a68fbf08a37018a89ac4c59"},{url:"/images/img_life_luxury11.png",revision:"1321dca077a1d602d4933b342070f0d4"},{url:"/images/img_life_luxury2.png",revision:"27c8b49f1afac4bb5c5ef977c5bef315"},{url:"/images/img_life_luxury3.png",revision:"dcd3f273d0b98c1b887666a65ecda335"},{url:"/images/img_life_luxury4.png",revision:"845923baf8aaeda0401eb0250dcf8f12"},{url:"/images/img_life_luxury5.png",revision:"a261af76296b206b1a2492e7552f9fa9"},{url:"/images/img_life_luxury6.png",revision:"53d6fa88851d7b456fa582fbec4bc575"},{url:"/images/img_life_luxury7.png",revision:"0a1c22b52d2d3f93aeaa784c28780c80"},{url:"/images/img_life_luxury8.png",revision:"adad9200adc60c9a8475ab8672ebdcd8"},{url:"/images/img_life_luxury9.png",revision:"8ce314928d5955f9d567b64c36ecaa31"},{url:"/images/img_life_overview_community.svg",revision:"decbc55c3177228f847ae629bac59d8a"},{url:"/images/img_life_overview_creator.svg",revision:"a59152a0120080ed4cb3ee7ca667aaa0"},{url:"https://file.mir4global.com/nile/resources/images/img_lus_banner.png",revision:"0a94f3116f91d3a7e62219d5e7748d56"},{url:"/images/img_nile_creator.png",revision:"5d3610ec83a55718248ec9fbdd75d63b"},{url:"/images/img_papyrus_info1.svg",revision:"16877dfd4f3a177d3a460d4c7dba5744"},{url:"/images/img_papyrus_info2.svg",revision:"cb55f1b12791aff6e1ca5b158a07044d"},{url:"/images/img_papyrus_info3.svg",revision:"4e146079e5bdbdea5bfc9deb1b90cb39"},{url:"/images/img_tangled_banner.png",revision:"565a3dc6c99316366125a40cdbdb8c62"},{url:"/images/img_tangled_logo.png",revision:"5ea54f2ba1b680c01b665eebbf16c3ed"},{url:"/images/img_tangled_timepieces.png",revision:"57f84e806da6c2297cdafcd4cd9efdc7"},{url:"/images/lus/img_life_lus1-1.png",revision:"d6e005a839a2514668d8ae7d998aecb4"},{url:"/images/lus/img_life_lus1-10.png",revision:"504fd7aacece4ef5226f4e98368434c2"},{url:"/images/lus/img_life_lus1-11.png",revision:"6169e924dc0a75012448b6d58c894dd4"},{url:"/images/lus/img_life_lus1-12.png",revision:"e323213465777290c2f92a52105fa040"},{url:"/images/lus/img_life_lus1-13.png",revision:"52cb5741038fedc8aec5932d7376a415"},{url:"/images/lus/img_life_lus1-2.png",revision:"601c8bd0978daa5ec9bfb0f13cc80ec1"},{url:"/images/lus/img_life_lus1-3.png",revision:"641620910dcbff07894ba680e94b0e86"},{url:"/images/lus/img_life_lus1-4.png",revision:"d72b2b44cf5dc8d22f080af2e9dd8f6f"},{url:"/images/lus/img_life_lus1-5.png",revision:"8334506173e8dad8af4cf5ffe85a635d"},{url:"/images/lus/img_life_lus1-6.png",revision:"0af3a00cddaa94221816c82879e35add"},{url:"/images/lus/img_life_lus1-7.png",revision:"3a93a1f052da01c9828526faa915256c"},{url:"/images/lus/img_life_lus1-8.png",revision:"cd03624dd20000ff07039c757dbbb28b"},{url:"/images/lus/img_life_lus1-9.png",revision:"82fc7454cc4c26ee04cd78a8423e20b3"},{url:"/images/lus/img_life_lus2-1.png",revision:"8fe30166b8e6f578e12f55e8ccefb75e"},{url:"/images/lus/img_life_lus2-10.png",revision:"34eccae8472a8242fecd466bf659371c"},{url:"/images/lus/img_life_lus2-11.png",revision:"1d1b294dcceb461fe1ad7a1e44fb8a28"},{url:"/images/lus/img_life_lus2-12.png",revision:"df19694500788719bc5407341943af0e"},{url:"/images/lus/img_life_lus2-13.png",revision:"3ebb11c8d8e2996d6a7fd17f72964666"},{url:"/images/lus/img_life_lus2-2.png",revision:"47af6f4eb2cf1589bcc010a42e6613e9"},{url:"/images/lus/img_life_lus2-3.png",revision:"78392c52c09495354527355c047c196c"},{url:"/images/lus/img_life_lus2-4.png",revision:"c4928926a646a74fb9ff7126fd2aca47"},{url:"/images/lus/img_life_lus2-5.png",revision:"41532acb192c52734ef4c186fd47ea3f"},{url:"/images/lus/img_life_lus2-6.png",revision:"dd24baaf1169caf75db4df91ad71a78a"},{url:"/images/lus/img_life_lus2-7.png",revision:"4fc0dea16f1d4d556930eaf5ce01e5a4"},{url:"/images/lus/img_life_lus2-8.png",revision:"438c737bebc034cbf0267fca07bf3535"},{url:"/images/lus/img_life_lus2-9.png",revision:"dc452797d024dcc617e3cf8c918a10d3"},{url:"/images/lus/img_life_lus3-1.png",revision:"fe0348f81ed260bd4fe7bfb0dea8185b"},{url:"/images/lus/img_life_lus3-10.png",revision:"6a1af4c06b021be60fa1a65f9aac86fd"},{url:"/images/lus/img_life_lus3-11.png",revision:"11b6168e4ae621d6ed0ba7d824250b08"},{url:"/images/lus/img_life_lus3-12.png",revision:"0179924ce0dff280783660f32f89442c"},{url:"/images/lus/img_life_lus3-13.png",revision:"600cacc7f1dbb875ad4285563f72ad4a"},{url:"/images/lus/img_life_lus3-2.png",revision:"0ede1b9759220e5a634b6c4e893b95b7"},{url:"/images/lus/img_life_lus3-3.png",revision:"1d23460f7d94f33ca1d4d576f771d905"},{url:"/images/lus/img_life_lus3-4.png",revision:"2244117b32853026ea763b2d13f74f66"},{url:"/images/lus/img_life_lus3-5.png",revision:"496717f85c0da7fc350aa053df0b7144"},{url:"/images/lus/img_life_lus3-6.png",revision:"667f8c104be416aa4cca8ab6409a0ae8"},{url:"/images/lus/img_life_lus3-7.png",revision:"bbbf98343b4c68248c781f4ad94dec67"},{url:"/images/lus/img_life_lus3-8.png",revision:"a5baee2dfd4aac8f5ee7a17245eb170b"},{url:"/images/lus/img_life_lus3-9.png",revision:"810553af271ae748a5eebe659dd33def"},{url:"/locales/en/common.json",revision:"08fe7e751277d4cfc1e41003820d4e2e"},{url:"/locales/en/community.json",revision:"bd7626dd83e1f62aa2376e31ed2d2b6c"},{url:"/locales/en/dao.json",revision:"738bfc1839ce022cf4e58a501f5cc185"},{url:"/locales/en/daoHome.json",revision:"aed10ec6c2c891c743016df945d3c4cf"},{url:"/locales/en/life.json",revision:"42df95b6b853cd996dd672a9980f7b4a"},{url:"/locales/en/marketplace.json",revision:"7ac45390d0698460bed08e5ebdf5228d"},{url:"/locales/en/mypage.json",revision:"41b4e508e7f62aca7ab00defafffb524"},{url:"/locales/en/nile.json",revision:"bd7d66672ead4d08ad321368f70a4447"},{url:"/locales/en/privacy.json",revision:"90dbfa95cd2290776332699787d69b63"},{url:"/locales/en/story.json",revision:"68b329da9893e34099c7d8ad5cb9c940"},{url:"/locales/en/terms.json",revision:"6999ebf961b44cf4ffa6e789d30bcddc"},{url:"/locales/en/tokens.json",revision:"26f905a7f8e69472689e47e25039aeaa"},{url:"/locales/ko/common.json",revision:"985d1b16d21e3ae87e0f9a80e181ea87"},{url:"/locales/ko/community.json",revision:"5ef4ee2b5a796d53e8241ed5012fbc5b"},{url:"/locales/ko/dao.json",revision:"d11803f02e9dd6e2b72889390393edb4"},{url:"/locales/ko/daoHome.json",revision:"5de9283892e7e01cdda68a7e46774764"},{url:"/locales/ko/life.json",revision:"2e48022fa2a573fca40fd9d5a4a2fe08"},{url:"/locales/ko/marketplace.json",revision:"141d36fb2d1c873bad6269d2f901db87"},{url:"/locales/ko/mypage.json",revision:"b1c2878e08a745869194799ecc8b468f"},{url:"/locales/ko/nile.json",revision:"891a3e753f25edd2674b07d7c0722963"},{url:"/locales/ko/privacy.json",revision:"90dbfa95cd2290776332699787d69b63"},{url:"/locales/ko/terms.json",revision:"81023f048fd9bb93806ac4d995ee74f5"},{url:"/locales/ko/tokens.json",revision:"82793e0e04c59b25d6aa0b682b967d34"},{url:"/meta.json",revision:"6900ffe7e18443f60bc7ab86b597c0f8"},{url:"/temp/@temp_NILE_Medium_Thumb_221115.png",revision:"5b69315d9c2716f72ca22d3c2bd6c339"},{url:"/temp/@temp_NILE_Medium_Thumb_221116.png",revision:"dbc3f11de23e6d5c55c7dd6683096fd0"},{url:"/temp/@temp_bagel_news.png",revision:"f47476dff2dd28bacf212f89da92fbd3"},{url:"/temp/@temp_collection_lus.png",revision:"35d6d118d6045c27f9b41c1219b84913"},{url:"/temp/@temp_collection_lus_141.png",revision:"80c7acb7ce34d8486fea8cf4fc95fd5b"},{url:"/temp/@temp_collection_lus_194.png",revision:"557ad99f8bebf7dcd232780b55e3702e"},{url:"/temp/@temp_collection_lus_30.png",revision:"d9dc434b88f4e23cb1f66eccbb5c3f93"},{url:"/temp/@temp_collection_lus_4.png",revision:"4fa9e12b5349d4e0e14e367f1eb415de"},{url:"/temp/@temp_collection_lus_9.png",revision:"883f463c296672eb2bd516c76ec84835"},{url:"/temp/@temp_collection_represent.png",revision:"8ab510a682209716638ef61737c97f96"},{url:"/temp/@temp_collection_snkrz.png",revision:"7bbc7aefc8165b2be94371ec3a21f6cf"},{url:"/temp/@temp_collection_story.png",revision:"315f4e5c4988b10052bcc48f3c16da9d"},{url:"/temp/@temp_collection_tangled.png",revision:"97c3f7655b4599e2b484b15349b99b8e"},{url:"/temp/@temp_collection_tangled_167.png",revision:"54e230e75815c0fcfeacebe9cc7500e6"},{url:"/temp/@temp_collection_tangled_79.png",revision:"7e147389a6e7e8f842eb7a7b2dc59d4d"},{url:"/temp/@temp_collection_tangled_80.png",revision:"ede4364676c3807d63b5a99a50ba85ab"},{url:"/temp/@temp_community_members.png",revision:"4cfcb92adf929c1826f675c6eb0c2b3d"},{url:"/temp/@temp_ico_wemix12.svg",revision:"f8b054248daf01703b15843de41014e5"},{url:"/temp/@temp_pick_thumbnail1.png",revision:"c03dd050b5e93b13527120359311ae58"},{url:"/temp/@temp_pick_thumbnail2.png",revision:"b305d2fce81eb13e9e56089452c7be9b"},{url:"/temp/@temp_pick_thumbnail3.png",revision:"3aeb7b5e2011a61915ad69ef2088a040"},{url:"/temp/@temp_qr.png",revision:"831353f323b16161b8c3c7066b983218"},{url:"/temp/@temp_ranking.png",revision:"0063c9d32841712b6b31b984aeba996f"},{url:"/temp/@temp_rft_news.png",revision:"99e640405a9b73d03892072312bfffde"},{url:"/temp/@temp_sample.jpg",revision:"1de2d5d14c8338d59ef4668f9269b783"},{url:"/temp/@temp_search_thumbnail.png",revision:"b421b2406cdb5ff9e380e1b10f88573e"},{url:"/temp/@temp_search_thumbnail2.png",revision:"75ed41eba1e222285bb8aeafb8c50ec8"},{url:"/temp/@temp_story_detail_infor.png",revision:"7c86a7872f093f122d7499c411b72e17"},{url:"/temp/@temp_story_detail_post.jpg",revision:"ed8f477ec5af4852de89003ee2a3cb71"},{url:"/temp/@temp_story_detail_post.png",revision:"289cce04e19823e2b614fd069ffe4023"},{url:"/temp/@temp_story_detail_thumb01.png",revision:"66e3d81a26ebfb3158821702f717b13f"},{url:"/temp/@temp_story_detail_thumb02.png",revision:"0f8e9b1abc791c9722c6fb46b748d98a"},{url:"/temp/@temp_walk_news.png",revision:"fce1e3a7b5bab6db62039831d32dacae"},{url:"/video/life_bg.mp4",revision:"170904a3fd977c4afc5c294420eb2b87"},{url:"/video/life_sights_of_nile.mp4",revision:"cf2121856d687101db57a826170d13ad"},{url:"/video/life_sights_of_nile_thumbnail.mp4",revision:"8f692c97ff78d2b14b15aef9858c1691"},{url:"/video/nile_main.mp4",revision:"1f2d3a046f88711ce23868ac9107dfa7"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:a,state:c})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));