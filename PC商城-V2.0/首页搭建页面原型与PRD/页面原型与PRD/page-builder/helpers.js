function esc(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/** 现有原型页面清单：名称 + 路由（供顶部导航等配置下拉选择） */
const PROTO_PAGE_ROUTES = [
  { name: '首页', route: '01.首页-原型页面.html' },
  { name: '活动页', route: '02.活动页-原型页面.html' },
  { name: '活动专区页', route: '02.活动专区页-原型页面.html' },
  { name: '搜索分类页', route: '03.搜索分类页-原型页面.html' },
  { name: '商品详情页', route: '04.商品详情页-原型页面.html' },
  { name: '购物车', route: '05.购物车-原型页面.html' },
  { name: '结算付款', route: '06.结算付款-原型页面.html' },
  { name: '支付成功', route: '07.支付成功-原型页面.html' },
  { name: '支付失败-订单关闭', route: '07.支付失败-订单关闭-原型页面.html' },
  { name: '订单页', route: '08.订单页-原型页面.html' },
  { name: '订单详情', route: '09.订单详情-原型页面.html' },
  { name: '个人中心', route: '10.个人中心-原型页面.html' },
  { name: '评价中心', route: '11.评价中心-原型页面.html' },
  { name: '积分中心', route: '12.积分中心-原型页面.html' },
  { name: '我的卡券', route: '13.我的卡券-原型页面.html' },
  { name: '我的收藏', route: '14.我的收藏-原型页面.html' },
  { name: '浏览记录', route: '15.浏览记录-原型页面.html' },
  { name: '收货地址', route: '16.收货地址-原型页面.html' },
  { name: '个人资料', route: '17.个人资料-原型页面.html' },
  { name: '售后记录', route: '18.售后记录-原型页面.html' },
  { name: '申请售后', route: '19.申请售后-原型页面.html' },
  { name: '售后详情', route: '20.售后详情-原型页面.html' },
  { name: '在线客服', route: '21.在线客服-原型页面.html' },
  { name: '帮助中心', route: '22.帮助中心-原型页面.html' },
  { name: '消息中心', route: '23.消息中心-原型页面.html' },
  { name: '登录', route: '24.登录-原型页面.html' },
  { name: '商品不可用', route: '25.商品不可用-原型页面.html' }
];

/** 旧语义路径 → 原型页面（兼容已有配置） */
const LEGACY_ROUTE_TO_PAGE = {
  '/': '01.首页-原型页面.html',
  '/login': '24.登录-原型页面.html',
  '/orders': '08.订单页-原型页面.html',
  '/account': '10.个人中心-原型页面.html',
  '/cart': '05.购物车-原型页面.html',
  '/favorites': '14.我的收藏-原型页面.html',
  '/messages': '23.消息中心-原型页面.html',
  '/help': '22.帮助中心-原型页面.html',
  '/history': '15.浏览记录-原型页面.html',
  '/points': '12.积分中心-原型页面.html',
  '/coupons': '13.我的卡券-原型页面.html',
  '/address': '16.收货地址-原型页面.html',
  '/profile': '17.个人资料-原型页面.html',
  '/cs': '21.在线客服-原型页面.html',
  '/search': '03.搜索分类页-原型页面.html',
  '/notice': '22.帮助中心-原型页面.html',
  '/hot': '03.搜索分类页-原型页面.html',
  '/brand': '02.活动专区页-原型页面.html',
  '/new': '03.搜索分类页-原型页面.html',
  '/activity/life': '02.活动页-原型页面.html',
  '/activity/women': '02.活动专区页-原型页面.html',
  '/activity/nike': '02.活动页-原型页面.html',
  '/activity/charm': '02.活动专区页-原型页面.html',
  '/activity/welfare': '02.活动专区页-原型页面.html',
  '/activity/food': '02.活动页-原型页面.html',
  '/activity/digital': '02.活动专区页-原型页面.html',
  '/activity/home': '02.活动页-原型页面.html',
  '/activity/books': '02.活动专区页-原型页面.html',
  '/activity/office': '02.活动页-原型页面.html',
  '/activity/perfume': '02.活动专区页-原型页面.html',
  '/category/office': '03.搜索分类页-原型页面.html',
  '/category/sports': '03.搜索分类页-原型页面.html',
  '/category/personal': '03.搜索分类页-原型页面.html',
  '/category/digital': '03.搜索分类页-原型页面.html',
  '/cat/pen': '03.搜索分类页-原型页面.html',
  '/cat/books': '03.搜索分类页-原型页面.html',
  '/cat/perfume': '03.搜索分类页-原型页面.html',
  '/cat/bakery': '03.搜索分类页-原型页面.html',
  '/cat/food': '03.搜索分类页-原型页面.html',
  '/cat/digital': '03.搜索分类页-原型页面.html',
  '/brand/adidas': '02.活动专区页-原型页面.html',
  '/brand/ua': '02.活动专区页-原型页面.html',
  '/brand/lining': '02.活动专区页-原型页面.html',
  '/product/macbook': '04.商品详情页-原型页面.html',
  '/product/sony': '04.商品详情页-原型页面.html'
};

function resolvePageRoute(link) {
  const cur = link == null || link === '' ? '#' : String(link);
  if (cur === '#' || cur === '/#') return '#';
  if (LEGACY_ROUTE_TO_PAGE[cur]) return LEGACY_ROUTE_TO_PAGE[cur];
  return cur;
}

/** 生成「跳转页面」下拉选项 HTML（面向运营，仅展示页面名） */
function pageRouteOptionsHtml(currentLink) {
  const cur = resolvePageRoute(currentLink);
  const known = PROTO_PAGE_ROUTES.some(p => p.route === cur) || cur === '#';
  let html = `<option value="#" ${cur === '#' ? 'selected' : ''}>不跳转</option>`;
  if (!known) {
    html += `<option value="${esc(cur)}" selected>自定义链接</option>`;
  }
  PROTO_PAGE_ROUTES.forEach(p => {
    html += `<option value="${esc(p.route)}" ${cur === p.route ? 'selected' : ''}>${esc(p.name)}</option>`;
  });
  return html;
}

/** 楼层锚点：关联页面主体组件（下拉） */
function componentTargetOptionsHtml(currentId) {
  const cur = currentId == null || currentId === '' ? '' : String(currentId);
  let html = `<option value="" ${cur === '' ? 'selected' : ''}>不关联楼层</option>`;
  const list = (typeof components !== 'undefined' ? components : []).filter(function (c) {
    return c && c.id && c.group === 'page';
  });
  const known = list.some(function (c) { return c.id === cur; });
  if (cur && !known) {
    html += `<option value="${esc(cur)}" selected>未知楼层</option>`;
  }
  list.forEach(function (c) {
    html += `<option value="${esc(c.id)}" ${cur === c.id ? 'selected' : ''}>${esc(c.name)}</option>`;
  });
  return html;
}

/** 侧边工具条跳转：页面 + 回顶部 */
function toolbarLinkOptionsHtml(currentLink) {
  const raw = currentLink == null || currentLink === '' ? '#' : String(currentLink);
  const cur = raw === '#top' ? '#top' : resolvePageRoute(raw);
  let html = `<option value="#" ${cur === '#' ? 'selected' : ''}>不跳转</option>`;
  html += `<option value="#top" ${cur === '#top' ? 'selected' : ''}>回顶部</option>`;
  const known = PROTO_PAGE_ROUTES.some(function (p) { return p.route === cur; }) || cur === '#' || cur === '#top';
  if (!known) {
    html += `<option value="${esc(cur)}" selected>自定义链接</option>`;
  }
  PROTO_PAGE_ROUTES.forEach(function (p) {
    html += `<option value="${esc(p.route)}" ${cur === p.route ? 'selected' : ''}>${esc(p.name)}</option>`;
  });
  return html;
}

/** 对齐首页 float-dock / proto-icons 的描边图标 */
const DOCK_ICON_PATHS = {
  grid: 'M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z',
  list: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
  bean: 'M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z',
  ticket: 'M2 9a3 3 0 010-6h20a3 3 0 010 6M2 9v6a3 3 0 010 6h20a3 3 0 010-6V9 M12 9v6',
  cart: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z M3 6h18 M16 10a4 4 0 01-8 0',
  chat: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
  top: 'M6 14l6-6 6 6 M5 19h14'
};

function dockIconHtml(key) {
  const path = DOCK_ICON_PATHS[key];
  if (!path) {
    return '<span class="ico-fallback">' + esc(key || '·') + '</span>';
  }
  return '<span class="dock-icon">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="' + esc(path) + '"/>' +
    '</svg></span>';
}

/** 侧边工具条图标：本地上传 > 素材库 > 内置 SVG（iconKey） */
function dockItemIconHtml(it) {
  if (it && it.img) {
    return '<img class="dock-icon-img" src="' + esc(it.img) + '" alt="">';
  }
  if (it && it.imgKey) {
    return '<img class="dock-icon-img" src="' + esc(imgOf(it.imgKey)) + '" alt="">';
  }
  return dockIconHtml(it && (it.iconKey || it.icon));
}

/** 工具条配置缩略图预览（无自定义图时返回空，由编辑器回退 SVG） */
function toolbarIconThumbSrc(it) {
  if (it && it.img) return it.img;
  if (it && it.imgKey) return imgOf(it.imgKey);
  return '';
}

const CART_ICON = 'https://img11.360buyimg.com/img/jfs/t1/299913/28/14314/667/68afc75cFbc268bc7/0b4232db253d0e2a.png';
const CAT_ICON_BASE = 'http://img30.360buyimg.com/phoenix/jfs';
const CAT_ICONS = {
  digital: CAT_ICON_BASE + '/t1/330450/9/3947/641/68ac2377F947c0977/d0c40b32b8fe91a0.png',
  beauty: CAT_ICON_BASE + '/t1/328074/26/10931/683/68ac235dFd8b60f34/dd4b0a9ee1b5f66f.png',
  fashion: CAT_ICON_BASE + '/t1/324432/21/10800/764/68ac23c6F25b79cdf/8b3ddb5f9bdea18d.png',
  home: CAT_ICON_BASE + '/t1/326845/1/11930/569/68aef066Fd93afbfc/df9a842e1802fa18.png',
  food: CAT_ICON_BASE + '/t1/328074/26/10931/683/68ac235dFd8b60f34/dd4b0a9ee1b5f66f.png',
  points: CAT_ICON_BASE + '/t1/325792/10/10730/912/68ac2392F1ededa1c/1227912654a8cebf.png',
  gift: CAT_ICON_BASE + '/t1/332912/33/3942/979/68ac23a7Fef19d2c9/14c13c9e3b321991.png',
  life: CAT_ICON_BASE + '/t1/334948/5/3964/682/68ac23b9Fdf90a017/08e5479af55b8b1e.png',
  office: CAT_ICON_BASE + '/t1/325555/13/10840/525/68ac234eF2ce3cdda/2678a4007bc4dc5f.png'
};

/** 核心三栏分类侧栏：固定全部分类，不可在配置面板编辑 */
const ALL_CATEGORIES = [
  { iconKey: 'digital', name: '数码家电', sub: '智能穿戴' },
  { iconKey: 'beauty', name: '美妆护肤', sub: '香水彩妆' },
  { iconKey: 'fashion', name: '服饰鞋包', sub: '潮流穿搭' },
  { iconKey: 'home', name: '家居生活', sub: '收纳清洁' },
  { iconKey: 'food', name: '食品生鲜', sub: '粮油调味' },
  { iconKey: 'points', name: '积分兑换', sub: '热门好物' },
  { iconKey: 'gift', name: '节日礼品', sub: '企业定制' },
  { iconKey: 'life', name: '生活服务', sub: '本地优选' },
  { iconKey: 'office', name: '文具办公', sub: '纸品耗材' }
];
const JD_BANNERS = [
  { bg: 'https://m.360buyimg.com/babel/jfs/t1/442651/35/9171/43312/6a1a98b9F4a2d96b0/00ae400140785815.jpg', img: 'https://m.360buyimg.com/babel/jfs/t1/445641/12/5170/4553/6a1a98ddF277212d0/0276400140f2e0a3.png' },
  { bg: 'https://m.360buyimg.com/babel/jfs/t1/446020/13/5889/38099/6a1ad5abFb22643a0/00ae4001405e1519.png', img: 'https://m.360buyimg.com/babel/jfs/t1/443428/16/5780/16419/6a1ad5b3F5a591e6a/00ae400140e89519.png' },
  { bg: 'https://m.360buyimg.com/babel/jfs/t1/451820/34/1652/127992/6a20d8dfFd331330b/02764001407e15b2.png', img: 'https://m.360buyimg.com/babel/jfs/t1/446379/27/7886/24168/6a20d858Fd077312f/0276400140cb2293.png' },
  { bg: 'https://m.360buyimg.com/babel/jfs/t1/444554/26/19011/27121/6a292dbcF84fe3830/00ae400140230e35.jpg', img: 'https://m.360buyimg.com/babel/jfs/t1/457000/39/805/9650/6a292dc2Fe9d51068/00ae40014086a6ea.png' }
];
const PROMO_KEYS = ['bags', 'shirt', 'p55', 'p11'];
const WELFARE_KEYS = ['p45', 'p53', 'chair', 'camera'];
const BRAND_KEYS = ['watch', 'skincare', 'p8', 'oppo'];
const PRODUCT_POOL = [
  { brand: '调酒世家', name: '马天尼鸡尾酒调制工具套装', price: 299, original: 358, tags: ['精选', '餐饮'], key: 'p28' },
  { brand: '乐扣', name: '高硼硅耐热玻璃杯 4只装', price: 39, original: 59, tags: ['惠选', '家居'], key: 'p17' },
  { brand: '特仑苏', name: '全脂鲜牛奶 250ml×12盒', price: 128, original: 148, tags: ['标品', '乳品'], key: 'p19' },
  { brand: 'Curology', name: '洁面保湿护肤套装 2件套', price: 298, original: 398, tags: ['精选', '美妆'], key: 'p34' },
  { brand: '泰摩', name: '不锈钢手冲咖啡滴滤支架', price: 399, original: 459, tags: ['新品', '餐饮'], key: 'p23' },
  { brand: '苏泊尔', name: '珐琅铸铁炖锅 3.5L', price: 399, original: 499, tags: ['热销', '厨具'], key: 'p9' },
  { brand: '晨光', name: '中性笔套装 12支', price: 12.9, original: 19.9, tags: ['办公', '文具'], key: 'pen' },
  { brand: 'Nike', name: 'Flyknit 竞速跑鞋', price: 899, original: 1007, tags: ['运动', '热销'], key: 'sneaker' },
  { brand: '索尼', name: 'WH-1000XM5 降噪耳机', price: 2299, original: 2699, tags: ['数码', '降噪'], key: 'headphone' },
  { brand: '苹果', name: 'Apple Watch Series 9', price: 3199, original: 3499, tags: ['穿戴', '热销'], key: 'watch' },
  { brand: '宜家', name: '北欧单人沙发椅', price: 899, original: 1099, tags: ['家居', '舒适'], key: 'chair' },
  { brand: '佳能', name: '微单相机套机', price: 4599, original: 5299, tags: ['数码', '影像'], key: 'camera' }
];

function imgOf(key) {
  if (typeof IMG !== 'undefined' && IMG[key]) return IMG[key];
  return '../assets/products/' + key + '.png';
}

/** 促销卡等：优先自定义 img（本地上传），其次素材库 imgKey，最后按序号回退 */
function promoImgSrc(p, i) {
  if (p && p.img) return p.img;
  if (p && p.imgKey) return imgOf(p.imgKey);
  const keys = typeof PROMO_KEYS !== 'undefined' ? PROMO_KEYS : ['bags', 'shirt', 'p55', 'p11'];
  return imgOf(keys[(i || 0) % keys.length]);
}

function materialLibraryEntries() {
  if (typeof IMG === 'undefined') return [];
  return Object.keys(IMG).map(function (key) {
    return { key: key, src: IMG[key] };
  });
}

/** 轮播帧预览图：本地上传 > 素材库 > 自带 bg > JD 默认 */
function bannerThumbSrc(b, i) {
  if (b && b.img) return b.img;
  if (b && b.imgKey) return imgOf(b.imgKey);
  if (b && b.bg) return b.bg;
  const jd = JD_BANNERS[(i || 0) % JD_BANNERS.length];
  return jd ? jd.bg : '';
}

function bannerHasCustomImage(b) {
  return !!(b && (b.img || b.imgKey));
}

function defaultBannerSlides() {
  return JD_BANNERS.map(function (b, i) {
    return {
      bg: b.bg,
      fg: b.img,
      link: i % 2 === 0 ? '02.活动页-原型页面.html' : '02.活动专区页-原型页面.html'
    };
  });
}

/** 资产数量预览示意（真实数量取自业务数据） */
const ASSET_DEMO_BY_LABEL = {
  '优惠券': '1',
  '苏银豆': '899',
  '卡券': '8',
  '电影券': '2'
};
const ASSET_DEMO_FALLBACK = ['1', '899', '8', '2', '3', '5'];

function assetDemoValue(label, idx) {
  if (label && ASSET_DEMO_BY_LABEL[label] != null) return ASSET_DEMO_BY_LABEL[label];
  return ASSET_DEMO_FALLBACK[(idx || 0) % ASSET_DEMO_FALLBACK.length];
}

/** 公告栏徽标图：本地上传 > 素材库 */
function noticeBadgeSrc(cfg) {
  if (!cfg) return '';
  if (cfg.badgeImg) return cfg.badgeImg;
  if (cfg.badgeImgKey) return imgOf(cfg.badgeImgKey);
  return '';
}

/** 品牌位图片：本地上传 > 素材库 > 默认 */
function welfareCardImgSrc(cd, i) {
  if (cd && cd.img) return cd.img;
  if (cd && cd.imgKey) return imgOf(cd.imgKey);
  const keys = typeof WELFARE_KEYS !== 'undefined' ? WELFARE_KEYS : ['p45', 'p53', 'chair', 'camera'];
  return imgOf(keys[(i || 0) % keys.length]);
}

/** 楼层主推位图：本地上传 > 素材库 > 默认 key */
function featuredImgSrc(featured, fallbackKey) {
  if (featured && featured.img) return featured.img;
  if (featured && featured.imgKey) return imgOf(featured.imgKey);
  return imgOf(fallbackKey || 'pen');
}

/** 楼层副推卡 / 海报图：本地上传 > 素材库 > 默认 key */
function floorSideImgSrc(item, fallbackKey) {
  if (item && item.img) return item.img;
  if (item && item.imgKey) return imgOf(item.imgKey);
  return imgOf(fallbackKey || 'pen');
}

function featuredWidthPx(cfg, fallback) {
  const w = cfg && cfg.featured && cfg.featured.width;
  const n = parseInt(w, 10);
  const def = fallback != null ? fallback : 280;
  if (isNaN(n)) return def;
  return Math.max(160, Math.min(480, n));
}

function brandImgSrc(b, i) {
  if (b && b.img) return b.img;
  if (b && b.imgKey) return imgOf(b.imgKey);
  const keys = typeof BRAND_KEYS !== 'undefined' ? BRAND_KEYS : ['watch', 'skincare', 'p8', 'oppo'];
  return imgOf(keys[(i || 0) % keys.length]);
}

function brandSlotHeight(b) {
  if (b && b.height != null && b.height !== '') return Math.max(32, parseInt(b.height, 10) || 52);
  if (b && b.size === 'large') return 88;
  return 52;
}

function sampleProducts(n) {
  return Array.from({ length: n }, (_, i) => {
    const p = PRODUCT_POOL[i % PRODUCT_POOL.length];
    return Object.assign({}, p, { img: imgOf(p.key) });
  });
}

/** 按 key 列表解析商品；不足时用商品池补齐到 need */
function resolveProductsByKeys(keys, need) {
  const list = [];
  const seen = {};
  (keys || []).forEach(function (k) {
    const key = typeof k === 'string' ? k : (k && k.key);
    if (!key || seen[key]) return;
    const p = PRODUCT_POOL.find(function (x) { return x.key === key; });
    if (!p) return;
    seen[key] = true;
    list.push(Object.assign({}, p, { img: imgOf(p.key) }));
  });
  for (let i = 0; list.length < need && i < PRODUCT_POOL.length * 3; i++) {
    const p = PRODUCT_POOL[i % PRODUCT_POOL.length];
    if (seen[p.key] && Object.keys(seen).length < PRODUCT_POOL.length) continue;
    if (!seen[p.key]) seen[p.key] = true;
    list.push(Object.assign({}, p, { img: imgOf(p.key) }));
  }
  return list.slice(0, need);
}

/** 按 key 列表解析商品；不足时用商品池补齐到 列×行 */
function resolveSlotProducts(slot) {
  const cols = Math.max(1, Math.min(3, parseInt(slot && slot.columns, 10) || 2));
  const rows = Math.max(1, Math.min(3, parseInt(slot && slot.rows, 10) || 2));
  const need = cols * rows;
  return { cols: cols, rows: rows, products: resolveProductsByKeys(slot && slot.products, need) };
}

function resolveFloorProducts(cfg) {
  const cols = Math.max(1, Math.min(4, parseInt(cfg && cfg.productColumns, 10) || 3));
  const rows = Math.max(1, Math.min(3, parseInt(cfg && cfg.productRows, 10) || 2));
  return { cols: cols, rows: rows, products: resolveProductsByKeys(cfg && cfg.products, cols * rows) };
}

/** 推荐流 Tab：兼容旧字符串，规范为 { name, products } */
function normalizeFeedTabs(cfg) {
  if (!cfg) return [];
  if (!Array.isArray(cfg.tabs)) cfg.tabs = [];
  cfg.tabs = cfg.tabs.map(function (t) {
    if (typeof t === 'string') return { name: t, products: [] };
    if (!t || typeof t !== 'object') return { name: '频道', products: [] };
    return {
      name: t.name != null ? String(t.name) : '频道',
      products: Array.isArray(t.products) ? t.products : []
    };
  });
  return cfg.tabs;
}

function resolveFeedProducts(cfg, tabIdx) {
  const tabs = normalizeFeedTabs(cfg);
  const cols = Math.max(1, Math.min(8, parseInt(cfg && cfg.columns, 10) || 6));
  const rows = Math.max(1, Math.min(4, parseInt(cfg && cfg.rows, 10) || 2));
  const need = cols * rows;
  const idx = Math.min(Math.max(0, tabIdx || 0), Math.max(0, tabs.length - 1));
  const tab = tabs[idx] || { products: [] };
  return { cols: cols, rows: rows, products: resolveProductsByKeys(tab.products, need) };
}

function renderProductCardHTML(p, opts) {
  opts = opts || {};
  const showBrand = opts.showBrand !== false;
  const showTags = opts.showTags !== false;
  const showOrigin = opts.showOriginalPrice !== false;
  const showPromo = opts.showPromoText !== false;
  const showCart = opts.showCart !== false;
  const origin = p.original || Math.round(p.price * 1.12);
  const subsidy = Math.max(0, Math.round(origin - p.price));
  const tags = (p.tags || []).slice(0, 2).map(function (t, i) {
    return '<span class="' + (i % 2 ? 'green' : 'red') + '">' + esc(t) + '</span>';
  }).join('');
  return '<div class="pw-product-card">' +
    '<div class="pci"><img src="' + esc(p.img) + '" alt=""></div>' +
    '<div class="pcinfo">' +
      '<div class="pcname">' + (showBrand ? '<span class="brand">【' + esc(p.brand) + '】</span>' : '') + esc(p.name) + '</div>' +
      (showTags && tags ? '<div class="pctags">' + tags + '</div>' : '') +
      '<div class="pcbottom"><div>' +
        (showOrigin ? '<span class="price-origin">¥' + origin + '</span>' : '') +
        '<span class="price-now"><em>¥</em>' + p.price + '</span>' +
        (showPromo ? '<div class="subsidy">已补贴' + subsidy + '元</div>' : '') +
      '</div>' +
      (showCart ? '<button class="cart-add" type="button"><img src="' + CART_ICON + '" alt=""></button>' : '') +
      '</div></div></div>';
}
