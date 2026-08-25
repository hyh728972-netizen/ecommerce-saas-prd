const IMG_BASE = '../assets/products/';

const IMG_FILES = {
  "watch": "watch.png",
  "sneaker": "sneaker.png",
  "tshirt": "tshirt.png",
  "cake": "cake.png",
  "cinema": "cinema.png",
  "oppo": "oppo-x9/main01.jpg",
  "main01": "主图_01.jpg",
  "main02": "主图_02.jpg",
  "main03": "主图_03.jpg",
  "main04": "主图_04.jpg",
  "p2": "p02.png",
  "p4": "p04.png",
  "p6": "p06.png",
  "p8": "p08.png",
  "p9": "p09.png",
  "p15": "p15.png",
  "p17": "p17.jpg",
  "p19": "p19.png",
  "p23": "p23.png",
  "p24": "p24.png",
  "p28": "p28.png",
  "p34": "p34.png",
  "p55": "p55.png",
  "p56": "p56.png",
  "pants": "FILE20f5b9d4a76c4903a8f01451e8a1f285.jpg",
  "headphone": "00833203206a38fc.jpg",
  "skincare": "23a1b10dcc318e0b.jpg",
  "chair": "FILE07ba972d29d344099b899cd6d6b76a8b.jpg",
  "pumpkin": "78d45f23be526dc2.jpg",
  "shirt": "FILE22f915e8717a42bc8fc77f0ed9f1b509.jpg",
  "bags": "FILE2624fa460864492695ff6d100babce84.jpg",
  "sale": "FILE7bdfc8370e094e3b8a2c9e1ed2942c97.jpg",
  "pen": "07fbc80862e0b8b3.jpg",
  "camera": "0807fd488eb94ff1.jpg",
  "money": "FILE809adbc945fb4912bb2f84e3dbdd81a2.jpg",
  "cakeBirthday": "790b784e89bd892a.jpg",
  "cakeCupcake": "7b7b5f4a0ff104bf.jpg",
  "p1": "FILE2acc4afaf3e348b88d58ce061fcb17a7.jpg",
  "p3": "FILE3e48c7ec613e40de9c1198b979a87493.jpg",
  "p5": "827af04b72cddb03.jpg",
  "p7": "FILE0b7ac30bdc20458db017dedf1498bdf1.jpg",
  "p10": "FILE46026ad80c1149308846e64e0a2d5cd6.jpg",
  "p11": "FILE2d33257bd0d34acea2f2e8b4da7b8442.jpg",
  "p12": "00832a92a967be5d.jpg",
  "p13": "dbd2d45c09faa929.jpg",
  "p14": "dd195c293e959b10.jpg",
  "p16": "FILE4add4856afbe4ec0ba426435bfde2537.jpg",
  "p18": "FILE1218ca163b1945bf9cf6b6cb6e5f0b63.jpg",
  "p20": "3cda43e4645cb096.jpg",
  "p21": "08ee320320280c35.jpg",
  "p22": "FILE18503e6650d143a1b661432bee0b28c3.jpg",
  "p25": "FILE841d22b8d27b452891b74c7525383d70.jpg",
  "p26": "900794b4771771fe.jpg",
  "p27": "e33499a4219e4f70.jpg",
  "p29": "008332032001a0ca.jpg",
  "p30": "929c9df147341696.jpg",
  "p31": "0083320320c865d7.jpg",
  "p32": "08ee320320835886.jpg",
  "p33": "4929e015c89bc55f.jpg",
  "p35": "52aa45a58df854b1.jpg",
  "p36": "FILE3114254163934b6b8a0313ba016727f5.jpg",
  "p37": "FILE1863b8d3d6e74b9ea3e8096c9765a267.jpg",
  "p38": "FILE56df89dc6afd48ac93806e0c36f6b926.jpg",
  "p39": "08ee320320a7c9ec.jpg",
  "p40": "0083320320262923.jpg",
  "p41": "02763203201e79ad.jpg",
  "p42": "00835dc5dc9bb2bc.jpg",
  "p43": "FILE66ec0b14194042f4b6e1127a05dfdf3e.jpg",
  "p44": "FILE347fe77529fa44d3943ae063bee4c978.jpg",
  "p45": "94328fc175d4749e.jpg",
  "p46": "9589fd5997dfb3f6.jpg",
  "p47": "97445c4ac7a7c1b8.jpg",
  "p48": "00833203202fdd66.jpg",
  "p49": "FILE982b6afaa2e842edb1c6a33f07ae5b59.jpg",
  "p50": "FILE9b486060083946fe969885491f07eaef.jpg",
  "p51": "FILE8a5598bb6ca5499ea6110c92f1cad2bd.jpg",
  "p52": "c111931e61b9d3b0.jpg",
  "p53": "0083320320d44a61.jpg",
  "p54": "58ca66cd223fe125.jpg",
  "p57": "00833203203d0bd8.jpg",
  "e1": "08ee320320b6e2a0.jpg",
  "e2": "6510e7cf1d8d5a2b.jpg",
  "e3": "c3a9bcd5b67cc4c9.jpg",
  "e4": "f2cf456ff962e762.jpg",
  "e5": "FILE19150f16ac1743ce9565015bcfaf6ba9.jpg",
  "e6": "FILE34a7543320094bf6b21f228949aa393a.jpg",
  "e7": "FILE5a4c2e54b4464850aeaf98f91b2dc6dd.jpg",
  "e8": "0083320320f23517.jpg",
  "e9": "0083320320531277.jpg",
  "e10": "FILE6fa5b1fb229f4ae2a12b76bc70a21870.jpg",
  "e11": "08ee320320280c35.jpg",
  "e12": "FILE9d2aace503d14c46b69ea81a6623aac1.jpg",
  "e13": "08ee320320d27983.jpg",
  "e14": "65c903335b0007bc.jpg",
  "e15": "d2a0f821e773e3ef.jpg",
  "e16": "f6714719e6a8000f.jpg",
  "e17": "FILE199b0575b05c41b09d7b946dcd5d3d0a.jpg",
  "e18": "FILE3602450d846b461996009bf0b0559d84.jpg",
  "e19": "FILE5a7c7d8d619242c0b52d6d2b5bc602cc.jpg",
  "e20": "00833e83e8eb7fbb.jpg",
  "e21": "FILE9e1987c1bce4413f97d353ee7128dda2.jpg",
  "e22": "FILE708834957cf546b1a94982a64d3785e2.jpg",
  "e23": "FILE8c6c704d27f14ea6a650b55169f3a3ce.jpg",
  "e24": "FILE9e8269e05b7a4657a9c823d073f0655e.jpg",
  "e25": "08ee320320eb265c.jpg",
  "e26": "65fb82dae885a785.jpg",
  "e27": "FILEa1c0ffd6be0e4d79b0e03d7355939f33.jpg",
  "e28": "f67942b27888291c.jpg",
  "e29": "FILE206f4af37c2444bf9a691b5022212d54.jpg",
  "e30": "FILE36e85edd262546259340c77b39a9772c.jpg",
  "e31": "FILE5e808ae552aa4a1bb79c72f493b2238f.jpg",
  "e32": "00835a05a09dd2e4.jpg",
  "e33": "FILEa446991b0915482794ad081d266aea93.jpg",
  "e34": "FILE73d52fec8c604b6985aa051798aeea23.jpg",
  "e35": "FILEa608c7b80b964bfaaf9465b77ec8f91d.jpg",
  "e36": "FILEacc648ce3cbb47148ddc24062dd7ee6e.jpg",
  "e37": "08ee320320edb4a5.jpg",
  "e38": "69517e827761eb01.jpg",
  "e39": "FILEb0250c3e04144603b147cee9a7a9b923.jpg",
  "e40": "FILE04a48b9ceab54cee9d144d7995f232c6.jpg",
  "e41": "FILE20865970e2a04937859ea048896c4053.jpg",
  "e42": "FILE3943f8905813439d8eece3dcc9dedcbd.jpg",
  "e43": "FILE5f449ecfd4534b74ab2add0567bec6bf.jpg",
  "e44": "00835a05a0f0464d.jpg",
  "e45": "FILEb2dcf37614df429ebe7e2f60128afdb8.jpg",
  "e46": "FILE74c167d9727f4118977aac63a112cc28.jpg",
  "e47": "FILEb35c5d8cf6a049df80af4f871910c681.jpg",
  "e48": "FILEb5f92a77140f451c9e7e3fce44a15430.jpg"
};

function imgFile(key) {
  return IMG_BASE + IMG_FILES[key];
}

const IMG = {
  oppo: IMG_BASE + IMG_FILES.oppo,
  main01: IMG_BASE + IMG_FILES.main01,
  main02: IMG_BASE + IMG_FILES.main02,
  main03: IMG_BASE + IMG_FILES.main03,
  main04: IMG_BASE + IMG_FILES.main04
};

IMG.watch = imgFile('watch');
IMG.headphone = imgFile('headphone');
IMG.sneaker = imgFile('sneaker');
IMG.cake = imgFile('cake');
IMG.tshirt = imgFile('tshirt');
IMG.skincare = imgFile('skincare');
IMG.cinema = imgFile('cinema');
IMG.chair = imgFile('chair');
IMG.pumpkin = imgFile('pumpkin');
IMG.shirt = imgFile('shirt');
IMG.bags = imgFile('bags');
IMG.sale = imgFile('sale');
IMG.pants = imgFile('pants');
IMG.pen = imgFile('pen');
IMG.camera = imgFile('camera');
IMG.money = imgFile('money');
IMG.cakeBirthday = imgFile('cakeBirthday');
IMG.cakeCupcake = imgFile('cakeCupcake');

IMG.p1 = imgFile('p1');
IMG.p2 = imgFile('p2');
IMG.p3 = imgFile('p3');
IMG.p4 = imgFile('p4');
IMG.p5 = imgFile('p5');
IMG.p6 = imgFile('p6');
IMG.p7 = imgFile('p7');
IMG.p8 = imgFile('p8');
IMG.p9 = imgFile('p9');
IMG.p10 = imgFile('p10');
IMG.p11 = imgFile('p11');
IMG.p12 = imgFile('p12');
IMG.p13 = imgFile('p13');
IMG.p14 = imgFile('p14');
IMG.p15 = imgFile('p15');
IMG.p16 = imgFile('p16');
IMG.p17 = imgFile('p17');
IMG.p18 = imgFile('p18');
IMG.p19 = imgFile('p19');
IMG.p20 = imgFile('p20');
IMG.p21 = imgFile('p21');
IMG.p22 = imgFile('p22');
IMG.p23 = imgFile('p23');
IMG.p24 = imgFile('p24');
IMG.p25 = imgFile('p25');
IMG.p26 = imgFile('p26');
IMG.p27 = imgFile('p27');
IMG.p28 = imgFile('p28');
IMG.p29 = imgFile('p29');
IMG.p30 = imgFile('p30');
IMG.p31 = imgFile('p31');
IMG.p32 = imgFile('p32');
IMG.p33 = imgFile('p33');
IMG.p34 = imgFile('p34');
IMG.p35 = imgFile('p35');
IMG.p36 = imgFile('p36');
IMG.p37 = imgFile('p37');
IMG.p38 = imgFile('p38');
IMG.p39 = imgFile('p39');
IMG.p40 = imgFile('p40');
IMG.p41 = imgFile('p41');
IMG.p42 = imgFile('p42');
IMG.p43 = imgFile('p43');
IMG.p44 = imgFile('p44');
IMG.p45 = imgFile('p45');
IMG.p46 = imgFile('p46');
IMG.p47 = imgFile('p47');
IMG.p48 = imgFile('p48');
IMG.p49 = imgFile('p49');
IMG.p50 = imgFile('p50');
IMG.p51 = imgFile('p51');
IMG.p52 = imgFile('p52');
IMG.p53 = imgFile('p53');
IMG.p54 = imgFile('p54');
IMG.p55 = imgFile('p55');
IMG.p56 = imgFile('p56');
IMG.p57 = imgFile('p57');
IMG.e1 = imgFile('e1');
IMG.e2 = imgFile('e2');
IMG.e3 = imgFile('e3');
IMG.e4 = imgFile('e4');
IMG.e5 = imgFile('e5');
IMG.e6 = imgFile('e6');
IMG.e7 = imgFile('e7');
IMG.e8 = imgFile('e8');
IMG.e9 = imgFile('e9');
IMG.e10 = imgFile('e10');
IMG.e11 = imgFile('e11');
IMG.e12 = imgFile('e12');
IMG.e13 = imgFile('e13');
IMG.e14 = imgFile('e14');
IMG.e15 = imgFile('e15');
IMG.e16 = imgFile('e16');
IMG.e17 = imgFile('e17');
IMG.e18 = imgFile('e18');
IMG.e19 = imgFile('e19');
IMG.e20 = imgFile('e20');
IMG.e21 = imgFile('e21');
IMG.e22 = imgFile('e22');
IMG.e23 = imgFile('e23');
IMG.e24 = imgFile('e24');
IMG.e25 = imgFile('e25');
IMG.e26 = imgFile('e26');
IMG.e27 = imgFile('e27');
IMG.e28 = imgFile('e28');
IMG.e29 = imgFile('e29');
IMG.e30 = imgFile('e30');
IMG.e31 = imgFile('e31');
IMG.e32 = imgFile('e32');
IMG.e33 = imgFile('e33');
IMG.e34 = imgFile('e34');
IMG.e35 = imgFile('e35');
IMG.e36 = imgFile('e36');
IMG.e37 = imgFile('e37');
IMG.e38 = imgFile('e38');
IMG.e39 = imgFile('e39');
IMG.e40 = imgFile('e40');
IMG.e41 = imgFile('e41');
IMG.e42 = imgFile('e42');
IMG.e43 = imgFile('e43');
IMG.e44 = imgFile('e44');
IMG.e45 = imgFile('e45');
IMG.e46 = imgFile('e46');
IMG.e47 = imgFile('e47');
IMG.e48 = imgFile('e48');

const IMG_POOL = Object.values(IMG_FILES).map(f => IMG_BASE + f);

function poolImg(i) {
  return IMG_POOL[i % IMG_POOL.length];
}
