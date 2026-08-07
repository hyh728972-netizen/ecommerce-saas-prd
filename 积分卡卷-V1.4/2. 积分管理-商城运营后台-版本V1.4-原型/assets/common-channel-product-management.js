// ==================== DATA ====================
// SPU为主行，SKU为次行。库存共享在SPU层级。
const productData = [
  { id:'p1', name:'不锈钢保温杯', spu:'S001A00004', type:'physical', supplyPrice:'¥82', totalStock:500, tags:[{label:'热销款',cls:'tag-orange'},{label:'品质优选',cls:'tag-green'}],
    skus: [
      { sku:'S001A00004001', spec:'500ml', channels: [
        { ch:'政企福利商城', price:'¥99', supplier:'鑫泰商贸', logistics:'顺丰/中通 - 24h', sellable:'on' },
        { ch:'航司积分小站', price:'¥95', supplier:'鑫泰商贸', logistics:'顺丰/中通 - 24h', sellable:'on' },
        { ch:'商城会员购', price:'¥89', supplier:'博源供应链', logistics:'中通/圆通 - 48h', sellable:'off' },
      ]},
      { sku:'S001A00004002', type:'gift', spec:'不锈钢保温杯500ml + 定制杯套礼盒', displayName:'杯具熊 不锈钢保温杯 感恩礼盒套装', channels: [
        { ch:'政企福利商城', price:'¥129', supplier:'鑫泰商贸', logistics:'顺丰 - 24h', sellable:'on' },
        { ch:'航司积分小站', price:'¥119', supplier:'鑫泰商贸', logistics:'顺丰 - 24h', sellable:'on' },
      ]}
    ]
  },
  { id:'p2', name:'男士商务休闲皮鞋', spu:'S001A00006', type:'physical', supplyPrice:'¥100', totalStock:75, tags:[{label:'品质优选',cls:'tag-green'}],
    skus: [
      { sku:'S001A00006001', spec:'黑色42码', channels: [
        { ch:'政企福利商城', price:'¥90', supplier:'博源供应链', logistics:'顺丰 - 48h', sellable:'on' },
        { ch:'社区公益点', price:'¥88', supplier:'博源供应链', logistics:'顺丰 - 48h', sellable:'on' },
      ]}
    ]
  },
  { id:'p3',name:'家庭营养过年礼包', spu:'C001A00001', type:'combo', supplyPrice:'¥73', totalStock:1200, tags:[{label:'新品推荐',cls:'tag-orange'},{label:'员工福利',cls:'tag-green'}],
    skus: [
      { sku:'C001A00001001', spec:'主件(天润 新疆纯牛奶200ml*12)×1 + 搭配件(北大荒 有机黑木耳200g)×1', displayName:'天润 家庭营养过年礼包 组合套装A', channels: [
        { ch:'政企福利商城', price:'¥99', supplier:'恒通供应链', logistics:'等2个供应商', sellable:'on' },
        { ch:'商城会员购', price:'¥89', supplier:'恒通供应链', logistics:'等2个供应商', sellable:'on' },
      ]},
      { sku:'C001A00001002', spec:'主件(天润 新疆纯牛奶200ml*12)×1 + 搭配件(天润 新疆纯牛奶200ml*12)×1 + 搭配件(北大荒 有机黑木耳200g)×2', displayName:'天润 家庭营养元宵礼包 组合套装B', channels: [
        { ch:'政企福利商城', price:'¥189', supplier:'恒通供应链', logistics:'等3个供应商', sellable:'on' },
        { ch:'商城会员购', price:'¥169', supplier:'恒通供应链', logistics:'等3个供应商', sellable:'on' },
      ]}
    ]
  },
  { id:'p4', name:'智能蓝牙体脂秤', spu:'S001A00003', type:'physical', supplyPrice:'¥95', totalStock:270, tags:[{label:'新品上市',cls:'tag-blue'}],
    skus: [
      { sku:'S001A00003001', spec:'白色', channels: [
        { ch:'航司积分小站', price:'¥129', supplier:'华茂通', logistics:'京东物流 - 48h', sellable:'on' },
        { ch:'宏兆自营小程序', price:'¥119', supplier:'华茂通', logistics:'京东物流 - 48h', sellable:'locked' },
      ]}
    ]
  },
  { id:'p5', name:'夏季纯棉圆领T恤', spu:'S001A00002', type:'physical', supplyPrice:'¥50', totalStock:0, tags:[{label:'热销款',cls:'tag-orange'},{label:'限时促销',cls:'tag-orange'}],
    skus: [
      { sku:'S001A00002001', spec:'白色 M', channels: [
        { ch:'政企福利商城', price:'¥45', supplier:'鑫泰商贸', logistics:'中通/圆通 - 24h', sellable:'locked' },
      ]},
      { sku:'S001A00002002', spec:'黑色 L', channels: [
        { ch:'政企福利商城', price:'¥45', supplier:'星辰商贸', logistics:'中通/圆通 - 24h', sellable:'locked' },
      ]}
    ]
  },
  { id:'p6', name:'儿童运动跑鞋', spu:'S001A00007', type:'physical', supplyPrice:'¥65', totalStock:463, tags:[{label:'最优性价比',cls:'tag-green'}],
    skus: [
      { sku:'S001A00007001', spec:'28码', channels: [
        { ch:'航司积分小站', price:'¥59', supplier:'博源供应链', logistics:'顺丰/中通 - 24h', sellable:'on' },
        { ch:'商城会员购', price:'¥62', supplier:'博源供应链', logistics:'中通/圆通 - 48h', sellable:'on' },
        { ch:'社区公益点', price:'¥58', supplier:'华茂通', logistics:'韵达/中通 - 24h', sellable:'on' },
      ]},
      { sku:'S001A00007002', spec:'30码', channels: [
        { ch:'航司积分小站', price:'¥59', supplier:'博源供应链', logistics:'顺丰/中通 - 24h', sellable:'on' },
        { ch:'宏兆自营小程序', price:'¥55', supplier:'华茂通', logistics:'京东物流 - 48h', sellable:'off' },
      ]}
    ]
  },
  { id:'p7', name:'女士直筒休闲长裤', spu:'S001A00005', type:'physical', supplyPrice:'¥78', totalStock:230, tags:[{label:'稳定供货',cls:'tag-green'},{label:'品质优选',cls:'tag-green'}],
    skus: [
      { sku:'S001A00005001', spec:'S码', channels: [
        { ch:'政企福利商城', price:'¥99', supplier:'鑫泰商贸', logistics:'中通/圆通 - 48h', sellable:'off' },
        { ch:'社区公益点', price:'¥95', supplier:'华茂通', logistics:'韵达/中通 - 24h', sellable:'on' },
      ]}
    ]
  },
  { id:'p8', name:'无线降噪耳机', spu:'S001A00008', type:'physical', supplyPrice:'¥220', totalStock:144, tags:[{label:'热销款',cls:'tag-orange'},{label:'品质优选',cls:'tag-green'}],
    skus: [
      { sku:'S001A00008001', spec:'黑色', channels: [
        { ch:'航司积分小站', price:'¥299', supplier:'鑫泰商贸', logistics:'顺丰 - 24h', sellable:'on' },
        { ch:'商城会员购', price:'¥279', supplier:'鑫泰商贸', logistics:'中通/圆通 - 48h', sellable:'on' },
      ]}
    ]
  },
  { id:'p9', name:'有机绿茶礼盒装', spu:'S001A00009', type:'physical', supplyPrice:'¥68', totalStock:560, tags:[{label:'品质优选',cls:'tag-green'},{label:'产地直供',cls:'tag-green'}],
    skus: [
      { sku:'S001A00009001', spec:'200g', channels: [
        { ch:'宏兆自营小程序', price:'¥128', supplier:'博源供应链', logistics:'韵达/中通 - 24h', sellable:'on' },
      ]}
    ]
  },
  { id:'p10', name:'纳米喷雾补水仪', spu:'S001A00010', type:'physical', supplyPrice:'¥35', totalStock:166, tags:[{label:'限时特惠',cls:'tag-red'}],
    skus: [
      { sku:'S001A00010001', spec:'标准款', channels: [
        { ch:'政企福利商城', price:'¥69', supplier:'华茂通', logistics:'中通/圆通 - 48h', sellable:'locked' },
        { ch:'航司积分小站', price:'¥65', supplier:'华茂通', logistics:'顺丰 - 24h', sellable:'on' },
        { ch:'社区公益点', price:'¥72', supplier:'华茂通', logistics:'韵达/中通 - 24h', sellable:'off' },
      ]}
    ]
  },
  { id:'p11',name:'折叠旅行背包', spu:'S001A00011', type:'physical', supplyPrice:'¥45', totalStock:0, tags:[{label:'新品上市',cls:'tag-blue'}],
    skus: [
      { sku:'S001A00011001', spec:'20L', channels: [
        { ch:'商城会员购', price:'¥79', supplier:'鑫泰商贸', logistics:'中通/圆通 - 48h', sellable:'off' },
      ]}
    ]
  },
  { id:'p12', name:'腾讯视频VIP会员季卡', spu:'X001A00001', type:'virtual', supplyPrice:'¥38', totalStock:-1, tags:[{label:'虚拟卡券',cls:'tag-gray'}],
    skus: [
      { sku:'X001A00001001', spec:'季卡', channels: [
        { ch:'政企福利商城', price:'¥58', supplier:'星辰商贸', logistics:'自动发货 - 即时', sellable:'on' },
        { ch:'航司积分小站', price:'¥55', supplier:'星辰商贸', logistics:'自动发货 - 即时', sellable:'on' },
        { ch:'商城会员购', price:'¥52', supplier:'星辰商贸', logistics:'自动发货 - 即时', sellable:'on' },
      ]}
    ]
  },
  { id:'p13', name:'星巴克电子礼品卡', spu:'X001A00002', type:'virtual', supplyPrice:'¥80', totalStock:-1, tags:[{label:'虚拟卡券',cls:'tag-gray'}],
    skus: [
      { sku:'X001A00002001', spec:'面值100元', channels: [
        { ch:'政企福利商城', price:'¥95', supplier:'华茂通', logistics:'自动发货 - 即时', sellable:'on' },
        { ch:'宏兆自营小程序', price:'¥90', supplier:'华茂通', logistics:'自动发货 - 即时', sellable:'on' },
      ]}
    ]
  },
];

const productMetaMap = {
  p1: { brand:'杯具熊', category:'居家生活 > 杯壶水具 > 保温杯' },
  p2: { brand:'奥康', category:'男装 > 鞋靴 > 商务皮鞋' },
  p3: { brand:'天润', category:'食品饮料 > 乳制品 > 牛奶；节日礼盒 > 春节礼盒 > 食品礼包' },
  p4: { brand:'云麦', category:'数码 > 智能健康 > 体脂秤' },
  p5: { brand:'蕉内', category:'男装 > 上装 > T恤；女装 > 上装 > T恤' },
  p6: { brand:'安踏儿童', category:'运动户外 > 童鞋 > 运动跑鞋' },
  p7: { brand:'优衣库', category:'女装 > 下装 > 休闲裤' },
  p8: { brand:'倍思', category:'数码 > 影音娱乐 > 耳机' },
  p9: { brand:'谢裕大', category:'食品饮料 > 茶饮冲调 > 绿茶；节日礼盒 > 春节礼盒 > 食品礼包' },
  p10:{ brand:'金稻', category:'个护美妆 > 美容仪器 > 补水仪' },
  p11:{ brand:'探路者', category:'运动户外 > 户外装备 > 背包' },
  p12:{ brand:'腾讯视频', category:'虚拟卡券 > 视频会员 > 季卡' },
  p13:{ brand:'星巴克', category:'虚拟卡券 > 礼品卡 > 电子卡' },
};
function getProductMeta(p) { return productMetaMap[p.id] || { brand:'—', category:'未分类' }; }
function getDisplayProductName(p) {
  const meta = getProductMeta(p);
  if (!meta.brand || meta.brand === '—' || p.name.indexOf(meta.brand) === 0) return p.name;
  return meta.brand + ' ' + p.name;
}
function getDisplaySkuName(p, sku) {
  if (sku.displayName) return sku.displayName;
  const name = getDisplayProductName(p);
  return sku.spec ? name + ' ' + sku.spec : name;
}

const channelModeMap = {
  '政企福利商城': 'direct',
  '航司积分小站': 'distribution',
  '商城会员购': 'distribution',
  '宏兆自营小程序': 'direct',
  '社区公益点': 'distribution'
};
function isDistributionChannel(channelName) { return channelModeMap[channelName] === 'distribution'; }
function getChannelMode(c) { return isDistributionChannel(c.ch) ? 'distribution' : 'direct'; }
function getMallPrice(c) { return getChannelMode(c) === 'distribution' ? (c.mallPrice || c.price) : c.price; }

// Flatten all channel entries for SPU aggregate status
function allChannels(p) { const a=[]; p.skus.forEach(s=>s.channels.forEach(c=>a.push(c))); return a; }
function getAggSellable(p) {
  const states = allChannels(p).map(c => c.sellable);
  if (states.every(s => s === 'locked')) return 'locked';
  if (states.some(s => s === 'locked')) return 'locked';
  if (states.every(s => s === 'off')) return 'off';
  if (states.some(s => s === 'off')) return 'partial';
  return 'on';
}
function getSPUSellableLabel(p) {
  const agg = getAggSellable(p);
  const chs = allChannels(p);
  const total = chs.length,
        onCnt = chs.filter(c=>c.sellable==='on').length,
        offCnt = chs.filter(c=>c.sellable==='off').length,
        lockedCnt = chs.filter(c=>c.sellable==='locked').length;
  if (lockedCnt > 0) return '部分不可售（系统）';
  if (agg === 'partial') return `部分可售（${onCnt}/${total}）`;
  if (agg === 'off') return '不可售';
  return '可售';
}

let currentView = 'product';
let currentChannel = null;
var importFilterKeywords = [];
var importFilterActive = false;

// ==================== RENDER HELPERS ====================
function sellableToggleHTML(sellable, id, chKey) {
  const uid = id + '_' + (chKey || '');
  if (sellable === 'locked') {
    return `<span class="toggle locked" title="供应商已调价/下架，请在待处理选品中心处理">
      <span class="red-dot"></span><span class="toggle-track"><span class="toggle-knob"></span></span><span class="toggle-label">不可售</span></span>`;
  }
  if (sellable === 'off') {
    return `<span class="toggle off clickable" onclick="requestToggleOff('${id}','${chKey||''}')" title="点击设为可售">
      <span class="toggle-track"><span class="toggle-knob"></span></span><span class="toggle-label">不可售</span></span>`;
  }
  return `<span class="toggle on clickable" onclick="requestToggleOff('${id}','${chKey||''}')" title="点击设为不可售">
    <span class="toggle-track"><span class="toggle-knob"></span></span><span class="toggle-label">可售</span></span>`;
}
function systemLockedHint() {
  return '<span style="font-size:10.5px;color:var(--text-muted);display:block;">不可售（系统）</span>';
}
function sellableCellHTML(sellable, id, chKey) {
  return sellableToggleHTML(sellable, id, chKey) + (sellable === 'locked' ? ' ' + systemLockedHint() : '');
}
function spuSellableHTML(state, id, label) {
  if (state === 'locked') {
    return sellableToggleHTML('locked', id) + ' <span style="font-size:10.5px;color:var(--text-muted);display:block;">' + label + '</span>';
  }
  return sellableToggleHTML(state === 'off' ? 'off' : 'on', id);
}

function skuSellableStatusHTML(sku) {
  const states = sku.channels.map(c => c.sellable);
  if (states.some(s => s === 'locked')) return systemLockedHint();
  return '';
}

function chActionsHTML(id, name, spuCode, skuCode, ch) {
  return `
    <button class="btn btn-outline btn-sm" title="改价" onclick="event.stopPropagation();openPriceChangeModal('${id}','${skuCode}','${ch}')">改价</button>
    <button class="btn btn-sm" title="移出" onclick="openRemoveConfirm('${id}','${name}','${skuCode}','${ch}')" style="color:var(--red);border-color:var(--red-border);">移出</button>`;
}

function spuActionsHTML(id, name, spuCode, channel, firstSku) {
  const chArg = channel ? `'${channel}'` : "''";
  const safeName = name.replace(/'/g, "\\'");
  return `
    <button class="btn btn-outline btn-sm" title="查看详情" onclick="event.stopPropagation();openDetailPage('${spuCode}','${firstSku||''}','','')">查看</button>
    <button class="btn btn-sm" title="移出" onclick="event.stopPropagation();openRemoveConfirm('${id}','${safeName}','',${chArg})" style="color:var(--red);border-color:var(--red-border);">移出</button>`;
}


// ==================== RENDER TABLES ====================
const expandedSPUs = new Set();
let allExpanded = false;
var showImages = true;

function getThumbColor(type, spu) {
  if (spu && spu.charAt(0) === 'C') return '#ede9fe';
  return type === 'spu' ? '#dbeafe' : '#e5e7eb';
}
function getThumbHTML(label, key, small, type, spu) {
  var thumbClass = showImages ? 'product-thumb' : 'product-thumb hidden';
  var sizeStyle = small ? 'width:60px;height:60px;font-size:16px;' : '';
  return '<span class="' + thumbClass + '" style="' + sizeStyle + 'background:' + getThumbColor(type, spu) + ';">' + label.charAt(0) + '</span>';
}
function toggleImageView() {
  showImages = !showImages;
  var label = showImages ? '无图显示' : '有图显示';
  var btn = document.getElementById('btnImageView');
  var btnCh = document.getElementById('btnChImageView');
  if (btn) btn.textContent = label;
  if (btnCh) btnCh.textContent = label;
  if (currentChannel) renderChannelTable(currentChannel);
  else renderProductTable();
}

function chAggDisplay(p) {
  const chs = allChannels(p).map(c => c.ch);
  const uniq = [...new Set(chs)];
  if (uniq.length === 1) return uniq[0];
  return uniq[0] + '<br><span style="font-size:11px;color:var(--text-muted);">等' + (uniq.length) + '个渠道</span>';
}
function supplierCellHTML(supplier, c) {
  return supplier + (c && c.supplyMode === 'manual' ? ' <span class="tag tag-orange">指定</span>' : '');
}

function suppAggDisplay(p) {
  const suppliers = [...new Set(allChannels(p).map(c => c.supplier))];
  if (suppliers.length === 1) return suppliers[0];
  return suppliers[0] + '<br><span style="font-size:11px;color:var(--text-muted);">等' + (suppliers.length) + '个供应商</span>';
}
function parseCurrency(str) {
  return parseFloat((str||'').replace(/[^0-9.]/g,'')) || 0;
}
function formatCurrency(num) {
  return '¥' + (Math.round(num * 100) / 100).toFixed(2).replace(/\.00$/, '');
}
function calcMargin(supplyStr, channelStr) {
  const supply = parseFloat((supplyStr||"").replace(/[^0-9.]/g,""));
  const channel = parseFloat((channelStr||"").replace(/[^0-9.]/g,""));
  if (!supply || !channel || channel <= 0) return { profit: "-", margin: "-", low: false };
  const profit = channel - supply;
  const margin = profit / channel * 100;
  return { profit: "¥" + profit.toFixed(0), margin: margin.toFixed(1) + "%", low: margin < 10 };
}
// Normalize: ensure every channel entry has mallPrice & salesMode
function normCh(c) {
  if (!c.salesMode) c.salesMode = 'direct';
  if (!c.mallPrice) c.mallPrice = c.price;
  return c;
}
productData.forEach(p => p.skus.forEach(s => s.channels.forEach(c => normCh(c))));
// Override some entries as distribution mode for demo
(function(){
  const distOverrides = {
    'S001A00004001|政企福利商城': { mallPrice: '¥119', salesMode: 'distribution', supplyMode: 'manual' },
    'S001A00007001|航司积分小站': { mallPrice: '¥169', salesMode: 'distribution' },
    'S001A00011001|商城会员购': { mallPrice: '¥99', salesMode: 'distribution', supplyMode: 'manual' },
    'S001A00005001|政企福利商城': { mallPrice: '¥139', salesMode: 'distribution', supplyMode: 'manual' },
  };
  productData.forEach(p => p.skus.forEach(s => s.channels.forEach(c => {
    const key = s.sku + '|' + c.ch;
    if (distOverrides[key]) { Object.assign(c, distOverrides[key]); }
    if (!c.linePrice) c.linePrice = formatCurrency(parseCurrency(getMallPrice(c)) + 30);
    if (!c.ecomRefPrice) c.ecomRefPrice = formatCurrency(parseCurrency(c.price) + 20);
    // 分销渠道：商城价自动高于渠道价（若未手动指定）
    if (isDistributionChannel(c.ch) && c.mallPrice === c.price) {
      c.mallPrice = formatCurrency(parseCurrency(c.price) * 1.15);
    }
  })));
})();
function calcChannelMargin(mallStr, channelStr) {
  const mall = parseFloat((mallStr||"").replace(/[^0-9.]/g,""));
  const channel = parseFloat((channelStr||"").replace(/[^0-9.]/g,""));
  if (!mall || !channel || mall <= 0) return { profit: "-", margin: "-", neg: false };
  const profit = mall - channel;
  const margin = profit / mall * 100;
  return { profit: "¥" + profit.toFixed(0), margin: margin.toFixed(1) + "%", neg: margin <= 0 };
}

function getTypeFilter(view) {
  var sel = document.getElementById(view === 'product' ? 'typeFilterProduct' : 'typeFilterChannel');
  if (!sel) return 'all';
  if (sel.value === 'physical') return 'physical';
  if (sel.value === 'virtual') return 'virtual';
  if (sel.value === 'combo') return 'combo';
  if (sel.value === 'gift') return 'gift';
  return 'all';
}

function renderProductTable() {
  const tbody = document.getElementById('productTableBody');
  const typeFilter = getTypeFilter('product');
  var filtered = productData.filter(function(p) {
    if (typeFilter !== 'all' && p.type !== typeFilter) return false;
    if (!importFilterActive || importFilterKeywords.length === 0) return true;
    var haystack = (p.name + ' ' + p.spu).toLowerCase();
    p.skus.forEach(function(s) {
      haystack += ' ' + s.sku.toLowerCase() + ' ' + s.spec.toLowerCase();
      s.channels.forEach(function(c) { haystack += ' ' + c.ch.toLowerCase(); });
    });
    for (var i = 0; i < importFilterKeywords.length; i++) {
      if (haystack.indexOf(importFilterKeywords[i].toLowerCase()) !== -1) return true;
    }
    return false;
  });
  let html = '';
  filtered.forEach(p => {
    const agg = getAggSellable(p);
    const isExp = expandedSPUs.has(p.id);
    const label = getSPUSellableLabel(p);
    const chCount = [...new Set(allChannels(p).map(c => c.ch))].length;
    const prices = allChannels(p).map(c => parseInt(c.price.replace('¥','')));
    const mallPrices = allChannels(p).map(c => parseInt(getMallPrice(c).replace('¥','')));
    const priceRange = Math.min(...prices) === Math.max(...prices) ? `¥${Math.max(...prices)}` : `¥${Math.min(...prices)}-¥${Math.max(...prices)}`;
    const mallRange = Math.min(...mallPrices) === Math.max(...mallPrices) ? `¥${Math.max(...mallPrices)}` : `¥${Math.min(...mallPrices)}-¥${Math.max(...mallPrices)}`;
    const meta = getProductMeta(p);
    html += `
    <tr class="row-main" data-id="${p.id}" onclick="toggleSPURow('${p.id}')">
      <td class="spu-merged-cell">
        <input type="checkbox" class="checkbox chk-product" data-id="${p.id}" onchange="onSPUCheck(this,'${p.id}')" onclick="event.stopPropagation()">
        <span class="expand-arrow${isExp?' expanded':''}" onclick="event.stopPropagation();toggleSPURow('${p.id}')"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>
        ${getThumbHTML(getDisplayProductName(p), getDisplayProductName(p), false, 'spu', p.spu)}
        <div class="spu-lines">
          <div class="spu-line name-line">${getDisplayProductName(p)}</div>
          <div class="spu-line code-line"><span class="code-label">商城SPU：</span>${p.spu}${copyIconButton("copyText('"+p.spu+"','商城SPU已复制',event)",'复制商城SPU')}</div>
          <div class="spu-line cat-line">${meta.brand} <span style="color:var(--border);margin:0 6px;">|</span> ${meta.category}</div>
          <div class="spu-line tag-line">${p.type==='combo'?'<span class="tag tag-purple">组合套装</span>':p.type==='virtual'?'<span class="tag tag-virtual">虚拟商品</span>':'<span class="tag tag-physical">实物商品</span>'}${p.skus.some(function(sk){return sk.type==='gift';})?'<span class="tag tag-purple">含营销SKU</span>':''}<span class="sku-count-tag">${p.skus.length}个SKU</span><span class="sku-count-tag">${chCount}个渠道</span></div>
      </td>
        </div>
      </td>
      <td>${suppAggDisplay(p)}</td>
      <td class="price">${priceRange}</td>
      <td class="price">${priceRange}</td>
      <td class="price">${mallRange}</td>
      <td>${(()=>{const mgs=allChannels(p).map(c=>calcMargin(p.supplyPrice,c.price).margin.replace("%","")).map(Number).filter(m=>!isNaN(m));if(mgs.length===0)return"—";const lo=Math.min(...mgs)<10;return "<span style=color:" + (lo?"var(--red)":"var(--text-primary)") + ">" + Math.min(...mgs).toFixed(1) + "%-" + Math.max(...mgs).toFixed(1) + "%</span>";})()}</td>
      <td><span style="color:var(--text-muted);">-</span></td>
      <td class="price">${p.type==='virtual'?'':p.totalStock}</td>
      <td><span style="color:var(--text-muted);">—</span></td>
      <td>${spuSellableHTML(agg==='locked'?'locked':agg==='off'?'off':'on', p.id, label)}</td>
      <td>${spuActionsHTML(p.id, p.name, p.spu, '', p.skus[0] ? p.skus[0].sku : '')}</td>
    </tr>`;
    if (isExp) {
      p.skus.forEach(s => {
        html += `
    <tr class="row-sub row-sku" data-id="${p.id}" data-sku="${s.sku}">
      <td colspan="11">
        <div class="sku-merged-cell">
        <input type="checkbox" class="checkbox chk-product" data-id="${p.id}" data-sku="${s.sku}" onchange="onSKUCheck(this,'${p.id}','${s.sku}')" onclick="event.stopPropagation()">
        <span class="sku-spacer"></span>
        <span class="sku-thumb-spacer"></span>
        <div class="sku-lines">
          <div class="sku-line name-line">${getDisplaySkuName(p, s)}<span style="color:var(--border);margin:0 6px;">；</span><span class="spec-label">规格：</span><span class="spec-val" title="${s.spec.replace(/"/g,'&quot;')}">${s.spec}</span><span style="color:var(--border);margin:0 6px;">；</span><span class="spec-label">商城SKU：</span><span class="sku-code">${s.sku}</span>${copyIconButton("copyText('"+s.sku+"','商城SKU已复制',event)",'复制商城SKU')}</div>
        </div>
        </div>
      </td>
    </tr>`;
        s.channels.forEach(c => {
          html += `
    <tr class="row-sub row-chn" data-id="${p.id}" data-sku="${s.sku}" data-ch="${c.ch}">
      <td class="channel-merged-cell">
        <input type="checkbox" class="checkbox chk-product" data-id="${p.id}" data-sku="${s.sku}" data-ch="${c.ch}" onchange="onChCheck(this,'${p.id}','${s.sku}')" onclick="event.stopPropagation()">
        <span class="sku-spacer"></span>
        <span class="sku-thumb-spacer"></span>
        <span style="color:var(--text-muted);">└</span>
        <span class="product-name" style="font-size:12.5px;">${c.ch}</span>
        ${(()=>{const sm=getChannelMode(c);return sm==='distribution'?'<span class="tag tag-blue">分销</span>':'<span class="tag tag-gray">直销</span>';})()}
      </td>
      <td>${supplierCellHTML(c.supplier, c)}</td>
      <td class="price">${c.price}</td>
      <td class="price">${c.price}</td>
      <td class="price">${getMallPrice(c)}</td>
      <td>${(m=>m.profit==="—"?"—":"<span style=color:" + (m.low?"var(--red)":"var(--text-primary)") + ">" + m.profit + " / " + m.margin + "</span>")(calcMargin(p.supplyPrice,c.price))}</td>
      <td>${(()=>{const sm=getChannelMode(c);if(sm!=='distribution')return'<span style=color:var(--text-muted);>—</span>';const cm=calcChannelMargin(getMallPrice(c),c.price);return cm.profit==="—"?"—":"<span style=color:" + (cm.neg?"var(--red)":"var(--text-primary)") + ">" + cm.profit + " / " + cm.margin + "</span>";})()}</td>
      <td></td>
      <td style="font-size:12px;color:var(--text-secondary);">${c.logistics||''}</td>
      <td>${sellableCellHTML(c.sellable, p.id, s.sku+'|'+c.ch)}</td>
      <td>${chActionsHTML(p.id, p.name, p.spu, s.sku, c.ch)}</td>
    </tr>`;
        });
      });
    }
  });
  tbody.innerHTML = html;
  document.getElementById('pageInfo').textContent = '共 ' + productData.length + ' 个SPU';
  updateExpandAllBtn();
}

function toggleSPURow(id) {
  if (expandedSPUs.has(id)) { expandedSPUs.delete(id); }
  else { expandedSPUs.add(id); }
  allExpanded = false;
  renderProductTable();
}

function expandAllSPUs() {
  allExpanded = !allExpanded;
  if (allExpanded) { productData.forEach(p => expandedSPUs.add(p.id)); }
  else { expandedSPUs.clear(); }
  renderProductTable();
}
function updateExpandAllBtn() {
  const btn = document.getElementById('btnExpandAll');
  if (!btn) return;
  if (allExpanded && expandedSPUs.size === productData.length) {
    btn.textContent = '全部收起 ▴';
    allExpanded = true;
  } else if (expandedSPUs.size === 0) {
    btn.textContent = '全部展开 ▾';
    allExpanded = false;
  } else {
    btn.textContent = '全部展开 ▾';
    allExpanded = false;
  }
}

const expandedChSPUs = new Set();

function renderChannelTable(channelName) {
  const showChannelMargin = isDistributionChannel(channelName);
  const marginHeader = document.getElementById('channelMarginHeader');
  if (marginHeader) marginHeader.style.display = showChannelMargin ? '' : 'none';
  const typeFilter = getTypeFilter('channel');
  // Group: only SPUs that have at least one SKU in this channel + type filter + import filter
  const spus = productData.filter(p => {
    if (typeFilter !== 'all' && p.type !== typeFilter) return false;
    if (!p.skus.some(s => s.channels.some(c => c.ch === channelName))) return false;
    if (!importFilterActive || importFilterKeywords.length === 0) return true;
    var haystack = (p.name + ' ' + p.spu).toLowerCase();
    p.skus.forEach(function(s) {
      haystack += ' ' + s.sku.toLowerCase() + ' ' + s.spec.toLowerCase();
    });
    for (var i = 0; i < importFilterKeywords.length; i++) {
      if (haystack.indexOf(importFilterKeywords[i].toLowerCase()) !== -1) return true;
    }
    return false;
  });
  const tbody = document.getElementById('channelTableBody');
  let html = '';
  let totalSkus = 0;
  spus.forEach(p => {
    const skusInCh = p.skus.filter(s => s.channels.some(c => c.ch === channelName));
    totalSkus += skusInCh.length;
    const allChs = skusInCh.map(s => s.channels.find(c => c.ch === channelName));
    const prices = allChs.map(c => parseInt(c.price.replace('¥','')));
    const mallPrices = allChs.map(c => parseInt(getMallPrice(c).replace('¥','')));
    const priceRange = Math.min(...prices) === Math.max(...prices) ? `¥${Math.max(...prices)}` : `¥${Math.min(...prices)}-¥${Math.max(...prices)}`;
    const mallRange = Math.min(...mallPrices) === Math.max(...mallPrices) ? `¥${Math.max(...mallPrices)}` : `¥${Math.min(...mallPrices)}-¥${Math.max(...mallPrices)}`;
    const suppliers = [...new Set(allChs.map(c => c.supplier))];
    const suppAgg = suppliers.length === 1 ? suppliers[0] : suppliers[0] + '<br><span style="font-size:11px;color:var(--text-muted);">等' + (suppliers.length-1) + '个供应商</span>';
    const states = allChs.map(c => c.sellable);
    const aggSell = states.every(s=>s==='locked') ? 'locked' : states.every(s=>s==='off') ? 'off' : states.some(s=>s==='locked') ? 'locked' : 'on';
    const label = states.some(s=>s==='locked')?'部分不可售（系统）':states.some(s=>s==='off')?'部分可售':'可售';
    const isExp = expandedChSPUs.has(p.id);
    const meta = getProductMeta(p);
    html += `
    <tr class="row-main" data-id="${p.id}" onclick="toggleChSPU('${p.id}')">
      <td class="spu-merged-cell">
        <input type="checkbox" class="checkbox chk-channel" data-id="${p.id}" onchange="onChSPUCheck(this,'${p.id}')" onclick="event.stopPropagation()">
        <span class="expand-arrow${isExp?' expanded':''}" onclick="event.stopPropagation();toggleChSPU('${p.id}')"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>
        ${getThumbHTML(getDisplayProductName(p), getDisplayProductName(p), false, 'spu', p.spu)}
        <div class="spu-lines">
          <div class="spu-line name-line">${getDisplayProductName(p)}</div>
          <div class="spu-line code-line"><span class="code-label">商城SPU：</span>${p.spu}${copyIconButton("copyText('"+p.spu+"','商城SPU已复制',event)",'复制商城SPU')}</div>
          <div class="spu-line cat-line">${meta.brand} <span style="color:var(--border);margin:0 6px;">|</span> ${meta.category}</div>
          <div class="spu-line tag-line">${p.type==='combo'?'<span class="tag tag-purple">组合套装</span>':p.type==='virtual'?'<span class="tag tag-virtual">虚拟商品</span>':'<span class="tag tag-physical">实物商品</span>'}${p.skus.some(function(sk){return sk.type==='gift';})?'<span class="tag tag-purple">含营销SKU</span>':''}<span class="sku-count-tag">${skusInCh.length}个SKU</span></div>
        </div>
      </td>
      <td>${suppAgg}</td>
      <td class="price">${priceRange}</td>
      <td class="price">${priceRange}</td>
      <td class="price">${mallRange}</td>
      <td>${(()=>{const mgs=allChs.map(c=>calcMargin(p.supplyPrice,c.price).margin.replace("%","")).map(Number).filter(m=>!isNaN(m));if(mgs.length===0)return"—";const lo=Math.min(...mgs)<10;return "<span style=color:" + (lo?"var(--red)":"var(--text-primary)") + ">" + Math.min(...mgs).toFixed(1) + "%-" + Math.max(...mgs).toFixed(1) + "%</span>";})()}</td>
      ${showChannelMargin ? '<td><span style="color:var(--text-muted);">-</span></td>' : ''}
      <td class="price">${p.type==='virtual'?'':p.totalStock}</td>
      <td><span style="color:var(--text-muted);">—</span></td>
      <td>${spuSellableHTML(aggSell, p.id, label)}</td>
      <td>${spuActionsHTML(p.id, p.name, p.spu, channelName, skusInCh[0] ? skusInCh[0].sku : '')}</td>
    </tr>`;
    if (isExp) {
      skusInCh.forEach(s => {
        const c = s.channels.find(c => c.ch === channelName);
        html += `
    <tr class="row-sub row-chn" data-id="${p.id}" data-sku="${s.sku}" data-ch="${c.ch}">
      <td class="sku-merged-cell">
        <input type="checkbox" class="checkbox chk-channel" data-id="${p.id}" data-sku="${s.sku}" onchange="onChSKUCheck(this,'${p.id}')" onclick="event.stopPropagation()">
        <span class="sku-spacer"></span>
        ${getThumbHTML(getDisplaySkuName(p, s), getDisplaySkuName(p, s), true, 'sku', p.spu)}
        <div class="sku-lines">
          <div class="sku-line name-line">${getDisplaySkuName(p, s)}</div>
          <div class="sku-line"><span class="spec-label">规格：</span><span class="spec-val" title="${s.spec.replace(/"/g,'&quot;')}">${s.spec}</span></div>
          <div class="sku-line"><span class="spec-label">商城SKU：</span><span class="sku-code">${s.sku}</span>${copyIconButton("copyText('"+s.sku+"','商城SKU已复制',event)",'复制商城SKU')}</div>
        </div>
      </td>
      <td>${supplierCellHTML(c.supplier, c)}</td>
      <td class="price">${c.price}</td>
      <td class="price">${c.price}</td>
      <td class="price">${getMallPrice(c)}</td>
      <td>${(m=>m.profit==="—"?"—":"<span style=color:" + (m.low?"var(--red)":"var(--text-primary)") + ">" + m.profit + " / " + m.margin + "</span>")(calcMargin(p.supplyPrice,c.price))}</td>
      ${showChannelMargin ? `<td>${(()=>{const sm=getChannelMode(c);if(sm!=='distribution')return'<span style=color:var(--text-muted);>—</span>';const cm=calcChannelMargin(getMallPrice(c),c.price);return cm.profit==="—"?"—":"<span style=color:" + (cm.neg?"var(--red)":"var(--text-primary)") + ">" + cm.profit + " / " + cm.margin + "</span>";})()}</td>` : ''}
      <td></td>
      <td style="font-size:12px;color:var(--text-secondary);">${c.logistics||''}</td>
      <td>${sellableCellHTML(c.sellable, p.id, s.sku+'|'+c.ch)}</td>
      <td>${chActionsHTML(p.id, p.name, p.spu, s.sku, c.ch)}</td>
    </tr>`;
      });
    }
  });
  tbody.innerHTML = html;
  document.getElementById('pageInfo').textContent = `共 ${spus.length} 个SPU · ${totalSkus} 个SKU`;
  updateChExpandBtn();
}
let chAllExpanded = false;
function toggleChSPU(id) {
  if (expandedChSPUs.has(id)) { expandedChSPUs.delete(id); }
  else { expandedChSPUs.add(id); }
  chAllExpanded = false;
  renderChannelTable(currentChannel);
  updateChExpandBtn();
}
function expandAllChSPUs() {
  chAllExpanded = !chAllExpanded;
  expandedChSPUs.clear();
  if (chAllExpanded) {
    const spus = productData.filter(p => p.skus.some(s => s.channels.some(c => c.ch === currentChannel)));
    spus.forEach(p => expandedChSPUs.add(p.id));
  }
  renderChannelTable(currentChannel);
  updateChExpandBtn();
}
function updateChExpandBtn() {
  const btn = document.getElementById('btnChExpandAll');
  if (!btn) return;
  const spus = productData.filter(p => p.skus.some(s => s.channels.some(c => c.ch === currentChannel)));
  if (chAllExpanded && expandedChSPUs.size === spus.length) {
    btn.textContent = '全部收起 ▴'; chAllExpanded = true;
  } else if (expandedChSPUs.size === 0) {
    btn.textContent = '全部展开 ▾'; chAllExpanded = false;
  } else {
    btn.textContent = '全部展开 ▾'; chAllExpanded = false;
  }
}
// Cascade for channel view
function onChSPUCheck(cb, id) {
  document.querySelectorAll(`.chk-channel[data-id="${id}"][data-sku]`).forEach(c => { c.checked = cb.checked; });
  updateSelection();
}
function onChSKUCheck(cb, id) {
  const skuCbs = document.querySelectorAll(`.chk-channel[data-id="${id}"][data-sku]`);
  const allChecked = [...skuCbs].every(c => c.checked);
  const noneChecked = [...skuCbs].every(c => !c.checked);
  const spuCb = document.querySelector(`.chk-channel[data-id="${id}"]:not([data-sku])`);
  if (spuCb) { spuCb.checked = allChecked; spuCb.indeterminate = !allChecked && !noneChecked; }
  updateSelection();
}

renderProductTable();

// ==================== VIEW SWITCH ====================
function updateTableFooterVisibility() {
  var footer = document.getElementById('tableFooter');
  var content = document.querySelector('.content');
  var show = currentView === 'product' || (currentView === 'channel' && currentChannel);
  if (footer) footer.style.display = show ? 'flex' : 'none';
  if (content) content.style.paddingBottom = show ? '70px' : '24px';
}

function switchView(view) {
  currentView = view;
  document.querySelectorAll('.tab').forEach((t, i) => {
    t.classList.toggle('active', (view === 'product' && i === 0) || (view === 'channel' && i === 1));
  });
  document.getElementById('viewProduct').classList.toggle('active', view === 'product');
  document.getElementById('viewChannel').classList.toggle('active', view === 'channel');
  if (view === 'channel') {
    document.getElementById('channelCardsWrap').style.display = '';
    document.getElementById('channelDetailWrap').style.display = 'none';
    currentChannel = null;
    showToast('info', '已切换视图，勾选状态已清空');
  }
  updateTableFooterVisibility();
  updateSelection();
}

// ==================== CHANNEL DETAIL ====================
function openChannelDetail(name, count) {
  document.getElementById('channelCardsWrap').style.display = 'none';
  document.getElementById('channelDetailWrap').style.display = 'flex';
  const modeLabel = isDistributionChannel(name) ? '分销' : '直销';
  const modeClass = isDistributionChannel(name) ? 'tag-blue' : 'tag-gray';
  document.getElementById('channelDetailTitle').innerHTML = name + ' <span class="tag ' + modeClass + '">' + modeLabel + '</span> · 共 ' + count + ' 个SKU商品';
  currentChannel = name;
  renderChannelTable(name);
  updateTableFooterVisibility();
  updateSelection();
}
function closeChannelDetail() {
  document.getElementById('channelCardsWrap').style.display = '';
  document.getElementById('channelDetailWrap').style.display = 'none';
  currentChannel = null;
  updateTableFooterVisibility();
  updateSelection();
}

// ==================== TOGGLE SELLABLE ====================
function findChannel(p, chKey) {
  // chKey is "sku|channel" from sub-row, or empty for main row (SPU aggregate)
  if (!chKey) {
    if (p.skus.length === 1 && p.skus[0].channels.length === 1) return { sku: p.skus[0], ch: p.skus[0].channels[0] };
    return null;
  }
  const [skuId, chName] = chKey.split('|');
  const sku = p.skus.find(s => s.sku === skuId);
  if (!sku) return null;
  const ch = sku.channels.find(c => c.ch === chName);
  return ch ? { sku, ch } : null;
}
function requestToggleOff(id, chKey) {
  const p = productData.find(x => x.id === id);
  if (!p) return;
  const found = findChannel(p, chKey);
  if (!found) { showToast('info', '请展开商品后在具体渠道行操作'); return; }
  if (found.ch.sellable === 'locked') return;
  const label = p.name + ' @ ' + found.ch.ch;
  if (found.ch.sellable === 'on') {
    window._toggleTarget = { id, sku: found.sku.sku, ch: found.ch.ch };
    document.getElementById('confirmToggleMsg').textContent = '确认将 "' + label + '" (' + found.sku.sku + ') 设为不可售？';
    openModal('confirmToggleOff');
  } else {
    found.ch.sellable = 'on';
    refreshAll();
    showToast('success', '已将 "' + label + '" 设为可售');
  }
}
function confirmToggleOff() {
  const t = window._toggleTarget;
  if (t) {
    const p = productData.find(x => x.id === t.id);
    if (p) {
      const sku = p.skus.find(s => s.sku === t.sku);
      if (sku) {
        const c = sku.channels.find(x => x.ch === t.ch);
        if (c) { c.sellable = 'off'; refreshAll(); showToast('success', '已将 "' + p.name + ' @ ' + t.ch + '" 设为不可售'); }
      }
    }
  }
  closeModal('confirmToggleOff');
}

// ==================== REMOVE ====================
function openRemoveConfirm(id, name, skuCode, channel) {
  window._removeTarget = { id, sku: skuCode || '', ch: channel || '' };
  if (!skuCode && channel) {
    document.getElementById('confirmRemoveMsg').textContent = '确认将 "' + name + '" 从「' + channel + '」全部移出？（含该商城SPU下所有商城SKU）';
  } else if (!skuCode && !channel) {
    document.getElementById('confirmRemoveMsg').textContent = '确认将 "' + name + '" 从所有渠道移出？（含全部商城SKU及渠道配置）';
  } else {
    document.getElementById('confirmRemoveMsg').textContent = '确认将 "' + name + '" (' + skuCode + ') 从「' + channel + '」移出？';
  }
  openModal('confirmRemove');
}
function confirmRemove() {
  const t = window._removeTarget;
  if (t) {
    const p = productData.find(x => x.id === t.id);
    if (p) {
      if (!t.sku) {
        if (t.ch) {
          p.skus.forEach(s => {
            const idx = s.channels.findIndex(c => c.ch === t.ch);
            if (idx >= 0) s.channels.splice(idx, 1);
          });
          for (let i = p.skus.length - 1; i >= 0; i--) {
            if (p.skus[i].channels.length === 0) p.skus.splice(i, 1);
          }
          if (p.skus.length === 0) {
            const pi = productData.findIndex(x => x.id === t.id);
            if (pi >= 0) productData.splice(pi, 1);
          }
          refreshAll();
          showToast('success', '"' + p.name + '" 已从「' + t.ch + '」移出');
        } else {
          const pi = productData.findIndex(x => x.id === t.id);
          if (pi >= 0) productData.splice(pi, 1);
          refreshAll();
          showToast('success', '"' + p.name + '" 已从所有渠道移出');
        }
        closeModal('confirmRemove');
        return;
      }
      const sku = p.skus.find(s => s.sku === t.sku);
      if (sku) {
        const idx = sku.channels.findIndex(c => c.ch === t.ch);
        if (idx >= 0) {
          sku.channels.splice(idx, 1);
          if (sku.channels.length === 0) {
            const si = p.skus.findIndex(s => s.sku === t.sku);
            if (si >= 0) p.skus.splice(si, 1);
          }
          if (p.skus.length === 0) {
            const pi = productData.findIndex(x => x.id === t.id);
            if (pi >= 0) productData.splice(pi, 1);
          }
          refreshAll();
          showToast('success', '"' + p.name + '" 已从' + t.ch + '移出');
        }
      }
    }
  }
  closeModal('confirmRemove');
}

// ==================== BATCH ====================
function getSelectedItems() {
  const cls = currentView === 'product' ? '.chk-product' : '.chk-channel';
  const all = Array.from(document.querySelectorAll(cls + ':checked')).map(cb => {
    return { id: cb.dataset.id, sku: cb.dataset.sku || '', ch: cb.dataset.ch || '' };
  });
  if (currentView !== 'product') {
    // Channel view: deduplicate SPU vs SKU children
    const chSpuChecked = new Set(all.filter(i => !i.sku).map(i => i.id));
    return all.filter(i => !i.sku || !chSpuChecked.has(i.id));
  }
  // Product view: deduplicate SPU vs SKU/channel children
  // If SKU is checked, skip its channel children
  const spuChecked = new Set(all.filter(i => !i.sku).map(i => i.id));
  const skuChecked = new Set(all.filter(i => i.sku && !i.ch).map(i => i.id + '|' + i.sku));
  return all.filter(i => {
    if (!i.sku) return true; // SPU
    if (!i.ch) return !spuChecked.has(i.id); // SKU: keep only if parent SPU not checked
    return !spuChecked.has(i.id) && !skuChecked.has(i.id + '|' + i.sku); // Channel: keep if neither SPU nor SKU checked
  });
}
function toggleAllView(cb, view) {
  if (view === 'product') {
    const spuCbs = document.querySelectorAll('.chk-product:not([data-sku])');
    spuCbs.forEach(spuCb => { spuCb.checked = cb.checked; onSPUCheck(spuCb, spuCb.dataset.id); });
  } else {
    const spuCbs = document.querySelectorAll('.chk-channel:not([data-sku])');
    spuCbs.forEach(spuCb => { spuCb.checked = cb.checked; onChSPUCheck(spuCb, spuCb.dataset.id); });
  }
}
// ==================== CASCADE CHECKBOX ====================
function getChCbs(id, sku) {
  return document.querySelectorAll(`.chk-product[data-id="${id}"][data-sku="${sku}"][data-ch]`);
}
function getSkuCbs(id) {
  return document.querySelectorAll(`.chk-product[data-id="${id}"][data-sku]:not([data-ch])`);
}
function getSPUCb(id) {
  return document.querySelector(`.chk-product[data-id="${id}"]:not([data-sku])`);
}
function setIndeterminate(cb, state) { cb.indeterminate = state; }

function onSPUCheck(cb, id) {
  const checked = cb.checked;
  document.querySelectorAll(`.chk-product[data-id="${id}"][data-sku]`).forEach(c => { c.checked = checked; c.indeterminate = false; });
  updateSelection();
}
function onSKUCheck(cb, id, sku) {
  const checked = cb.checked;
  getChCbs(id, sku).forEach(c => { c.checked = checked; });
  // Update parent SPU
  const spuCb = getSPUCb(id);
  if (spuCb) {
    const allSkuCbs = getSkuCbs(id);
    const checkedCount = [...allSkuCbs].filter(c => c.checked).length;
    spuCb.checked = checkedCount > 0;
    setIndeterminate(spuCb, checkedCount > 0 && checkedCount < allSkuCbs.length);
  }
  updateSelection();
}
function onChCheck(cb, id, sku) {
  // Update parent SKU
  const skuCbs = getChCbs(id, sku);
  const checkedCount = [...skuCbs].filter(c => c.checked).length;
  const skuCb = document.querySelector(`.chk-product[data-id="${id}"][data-sku="${sku}"]:not([data-ch])`);
  if (skuCb) {
    skuCb.checked = checkedCount > 0;
    setIndeterminate(skuCb, checkedCount > 0 && checkedCount < skuCbs.length);
  }
  // Update parent SPU
  const spuCb = getSPUCb(id);
  if (spuCb) {
    const allSkuCbs = getSkuCbs(id);
    const skuChecked = [...allSkuCbs].filter(c => c.checked).length;
    spuCb.checked = skuChecked > 0;
    setIndeterminate(spuCb, skuChecked > 0 && skuChecked < allSkuCbs.length);
  }
  updateSelection();
}

function updateSelection() {
  const count = getSelectedItems().length;
  const cls = currentView === 'product' ? '.chk-product' : '.chk-channel';
  // 商品维度排除最细的渠道行(data-ch)，只数 SKU 子行；渠道维度 SKU 行无 data-ch
  const skuSel = cls + '[data-sku]' + (currentView === 'product' ? ':not([data-ch])' : '');
  const skuCount = document.querySelectorAll(skuSel + ':checked').length;
  const el = document.getElementById('selectedInfo');
  el.textContent = '已选 ' + skuCount + ' 个SKU';
  el.style.display = skuCount === 0 ? 'none' : '';
  const dis = count === 0;
  document.getElementById('btnExport').disabled = dis;
  document.getElementById('btnPrice').disabled = dis;
  document.getElementById('btnTag').disabled = dis;
  document.getElementById('btnUntag').disabled = dis;
  document.getElementById('btnSellableOn').disabled = dis;
  document.getElementById('btnSellableOff').disabled = dis;
  document.getElementById('btnRemove').disabled = dis;
}
function batchExport() {
  const count = getSelectedItems().length;
  if (count === 0) { showToast('info', '请先勾选要操作的商品'); return; }
  const d = new Date().toISOString().slice(0,10).replace(/-/g,'');
  showToast('success', '已导出 ' + count + ' 条商品数据（渠道商品导出_' + d + '.xlsx）');
}
function openBatchTag() {
  showToast('warning', '标签逻辑待定，功能开发中');
}
function openBatchUntag() {
  const count = getSelectedItems().length;
  if (count === 0) { showToast('info', '请先勾选要操作的商品'); return; }
  showToast('warning', '批量去标签功能开发中（已选 ' + count + ' 项）');
}
function batchSetSellable(mode) {
  const items = getSelectedItems();
  if (items.length === 0) { showToast('info', '请先勾选要操作的商品'); return; }
  const label = mode === 'on' ? '可售' : '不可售';
  if (!confirm('确认将已选的 ' + items.length + ' 个商品批量设为' + label + '？')) return;
  items.forEach(item => {
    const p = productData.find(x => x.id === item.id);
    if (!p) return;
    if (item.sku && item.ch) {
      // Channel-level
      p.skus.forEach(s => s.channels.forEach(c => {
        if (c.ch === item.ch && s.sku === item.sku && c.sellable !== 'locked') c.sellable = mode;
      }));
    } else if (item.sku) {
      // SKU-level
      p.skus.forEach(s => {
        if (s.sku === item.sku) s.channels.forEach(c => { if (c.sellable !== 'locked') c.sellable = mode; });
      });
    } else {
      // SPU-level
      p.skus.forEach(s => s.channels.forEach(c => { if (c.sellable !== 'locked') c.sellable = mode; }));
    }
  });
  showToast('success', '已批量设为' + label + '：' + items.length + ' 项');
  if (currentChannel) renderChannelTable(currentChannel); else renderProductTable();
}

// ==================== PRICE CHANGE ====================
function findPriceChangeTarget(id, skuCode, channelName) {
  const p = productData.find(x => x.id === id);
  if (!p) return null;
  const sku = p.skus.find(s => s.sku === skuCode);
  if (!sku) return null;
  const ch = sku.channels.find(c => c.ch === channelName);
  if (!ch) return null;
  return { p, sku, ch };
}
function openPriceChangeModal(id, skuCode, channelName) {
  const target = findPriceChangeTarget(id, skuCode, channelName);
  if (!target) { showToast('info', '请在具体渠道商品行操作改价'); return; }
  window._priceChangeTarget = { id, sku: skuCode, ch: channelName };
  const mode = getChannelMode(target.ch);
  document.getElementById('priceChangeProduct').textContent = getDisplaySkuName(target.p, target.sku);
  document.getElementById('priceChangeMeta').textContent = '商城SPU：' + target.p.spu + ' / 商城SKU：' + target.sku.sku + ' / 规格：' + target.sku.spec;
  document.getElementById('priceChangeChannel').innerHTML = target.ch.ch + ' <span class="tag ' + (mode === 'distribution' ? 'tag-blue' : 'tag-gray') + '">' + (mode === 'distribution' ? '分销' : '直销') + '</span>';
  document.getElementById('priceChangeSupplier').textContent = target.ch.supplier;
  document.getElementById('priceChangeSupply').textContent = target.p.supplyPrice;
  document.getElementById('priceChangeEcomRef').textContent = target.ch.ecomRefPrice;
  document.getElementById('priceChangeOldPrice').textContent = target.ch.price;
  document.getElementById('priceChangeOldMallPrice').textContent = getMallPrice(target.ch);
  document.getElementById('priceChangeOldLinePrice').textContent = target.ch.linePrice;
  document.getElementById('priceChangeChannelInput').value = parseCurrency(target.ch.price);
  document.getElementById('priceChangeMallInput').value = parseCurrency(getMallPrice(target.ch));
  document.getElementById('priceChangeLineInput').value = parseCurrency(target.ch.linePrice);
  document.getElementById('priceChangeChannelHint').textContent = mode === 'distribution' ? '平台与品牌商城结算使用。' : '直销模式下，渠道价=商城价即C端销售价';
  document.getElementById('priceChangeOldMallGroup').style.display = mode === 'distribution' ? '' : 'none';
  document.getElementById('priceChangeMallGroup').style.display = mode === 'distribution' ? '' : 'none';
  updatePriceChangePreview();
  openModal('priceChangeModal');
}
function updatePriceChangePreview() {
  const targetKey = window._priceChangeTarget;
  if (!targetKey) return;
  const target = findPriceChangeTarget(targetKey.id, targetKey.sku, targetKey.ch);
  if (!target) return;
  const channelVal = parseFloat(document.getElementById('priceChangeChannelInput').value);
  const mallVal = parseFloat(document.getElementById('priceChangeMallInput').value);
  const lineVal = parseFloat(document.getElementById('priceChangeLineInput').value);
  const preview = document.getElementById('priceChangePreview');
  if (!channelVal || channelVal <= 0) { preview.style.display = 'none'; return; }
  preview.style.display = 'block';
  const supply = parseCurrency(target.p.supplyPrice);
  const margin = ((channelVal - supply) / channelVal * 100).toFixed(1);
  const mode = getChannelMode(target.ch);
  let text = '我司毛利 ' + (channelVal - supply >= 0 ? '+' : '') + formatCurrency(channelVal - supply) + ' / ' + margin + '%';
  if (mode === 'distribution' && mallVal > 0) {
    const chMargin = ((mallVal - channelVal) / mallVal * 100).toFixed(1);
    text += '；渠道毛利 ' + (mallVal - channelVal >= 0 ? '+' : '') + formatCurrency(mallVal - channelVal) + ' / ' + chMargin + '%';
  }
  if (lineVal > 0 && lineVal < (mode === 'distribution' && mallVal > 0 ? mallVal : channelVal)) {
    text += '；划线价低于销售价，请确认';
  }
  document.getElementById('priceChangePreviewValue').textContent = text;
  document.getElementById('priceChangePreviewValue').style.color = channelVal < supply ? 'var(--red)' : '#16a34a';
}
function submitPriceChange(forceConfirm) {
  const targetKey = window._priceChangeTarget;
  if (!targetKey) return;
  const target = findPriceChangeTarget(targetKey.id, targetKey.sku, targetKey.ch);
  if (!target) return;
  const channelVal = parseFloat(document.getElementById('priceChangeChannelInput').value);
  const mallVal = parseFloat(document.getElementById('priceChangeMallInput').value);
  const lineVal = parseFloat(document.getElementById('priceChangeLineInput').value);
  if (!channelVal || channelVal <= 0) { showToast('info', '请输入有效渠道价'); return; }
  if (!lineVal || lineVal <= 0) { showToast('info', '请输入有效划线价'); return; }
  const mode = getChannelMode(target.ch);
  if (mode === 'distribution' && (!mallVal || mallVal <= 0)) { showToast('info', '请输入有效商城价'); return; }
  const supply = parseCurrency(target.p.supplyPrice);
  if (!forceConfirm && channelVal < supply) {
    openModal('priceForceConfirmModal');
    return;
  }
  target.ch.price = formatCurrency(channelVal);
  if (mode === 'distribution') target.ch.mallPrice = formatCurrency(mallVal);
  else target.ch.mallPrice = target.ch.price;
  target.ch.linePrice = formatCurrency(lineVal);
  refreshAll();
  closeModal('priceForceConfirmModal');
  closeModal('priceChangeModal');
  showToast('success', '已更新 ' + target.p.name + ' @ ' + target.ch.ch + ' 的价格');
}

function collectPriceTargets(items) {
  const seen = {};
  const rows = [];
  items.forEach(item => {
    const p = productData.find(x => x.id === item.id);
    if (!p) return;
    p.skus.forEach(s => {
      if (item.sku && s.sku !== item.sku) return;
      s.channels.forEach(c => {
        if (item.ch && c.ch !== item.ch) return;
        if (currentChannel && !item.ch && c.ch !== currentChannel) return;
        const key = p.id + '|' + s.sku + '|' + c.ch;
        if (seen[key]) return;
        seen[key] = true;
        rows.push({ p, sku: s, ch: c, key });
      });
    });
  });
  return rows;
}
function priceRowProfitHTML(p, ch, channelVal, mallVal, lineVal) {
  const supply = parseCurrency(p.supplyPrice);
  const mode = getChannelMode(ch);
  if (!channelVal || channelVal <= 0) return '<span style="color:var(--text-muted);">请输入新渠道价</span>';
  const margin = ((channelVal - supply) / channelVal * 100).toFixed(1);
  let html = '<strong style="color:' + (channelVal < supply ? 'var(--red)' : 'var(--text-primary)') + '">我司毛利 ' + formatCurrency(channelVal - supply) + ' / ' + margin + '%</strong>';
  if (mode === 'distribution' && mallVal > 0) {
    const chMargin = ((mallVal - channelVal) / mallVal * 100).toFixed(1);
    html += '<br>渠道毛利 ' + formatCurrency(mallVal - channelVal) + ' / ' + chMargin + '%';
  }
  const saleVal = mode === 'distribution' && mallVal > 0 ? mallVal : channelVal;
  if (lineVal > 0 && lineVal < saleVal) html += '<div class="batch-price-warning">划线价低于销售价，请确认</div>';
  return html;
}
function openBatchPriceModal() {
  const items = getSelectedItems();
  if (items.length === 0) { showToast('info', '请先勾选要操作的商品'); return; }
  const rows = collectPriceTargets(items);
  if (rows.length === 0) { showToast('info', '当前选择无可改价渠道商品'); return; }
  window._batchPriceTargets = rows.map(r => r.key);
  const directCount = rows.filter(r => getChannelMode(r.ch) !== 'distribution').length;
  const distCount = rows.length - directCount;
  document.getElementById('batchPriceSummary').innerHTML = '<span class="summary-item">已选择 <strong>' + rows.length + '</strong> 条渠道商品</span><span class="summary-item">直销 <strong>' + directCount + '</strong> 条</span><span class="summary-item">分销 <strong>' + distCount + '</strong> 条</span>';

  function productCell(r) {
    return '<div class="product-cell"><div class="name">' + getDisplaySkuName(r.p, r.sku) + '</div><div class="meta">商城SKU：' + r.sku.sku + '</div></div>';
  }
  function directRow(r, index) {
    return '<tr class="batch-price-row" data-key="' + r.key + '">' +
      '<td>' + productCell(r) + '</td>' +
      '<td>' + r.ch.ch + '</td>' +
      '<td>' + r.ch.supplier + '</td>' +
      '<td class="readonly-price">' + r.p.supplyPrice + '</td>' +
      '<td><input class="batch-price-channel" type="number" min="0" step="0.01" value="' + parseCurrency(r.ch.price) + '" oninput="updateBatchPricePreview(' + index + ')"></td>' +
      '<td><input class="batch-price-line" type="number" min="0" step="0.01" value="' + parseCurrency(r.ch.linePrice) + '" oninput="updateBatchPricePreview(' + index + ')"></td>' +
      '<td><div class="batch-price-profit" id="batchPriceProfit' + index + '">' + priceRowProfitHTML(r.p, r.ch, parseCurrency(r.ch.price), parseCurrency(r.ch.price), parseCurrency(r.ch.linePrice)) + '</div></td>' +
    '</tr>';
  }
  function distRow(r, index) {
    const oldMall = getMallPrice(r.ch);
    return '<tr class="batch-price-row" data-key="' + r.key + '">' +
      '<td>' + productCell(r) + '</td>' +
      '<td>' + r.ch.ch + '</td>' +
      '<td>' + r.ch.supplier + '</td>' +
      '<td class="readonly-price">' + r.p.supplyPrice + '</td>' +
      '<td><input class="batch-price-channel" type="number" min="0" step="0.01" value="' + parseCurrency(r.ch.price) + '" oninput="updateBatchPricePreview(' + index + ')"></td>' +
      '<td><input class="batch-price-mall" type="number" min="0" step="0.01" value="' + parseCurrency(oldMall) + '" oninput="updateBatchPricePreview(' + index + ')"></td>' +
      '<td><input class="batch-price-line" type="number" min="0" step="0.01" value="' + parseCurrency(r.ch.linePrice) + '" oninput="updateBatchPricePreview(' + index + ')"></td>' +
      '<td><div class="batch-price-profit" id="batchPriceProfit' + index + '">' + priceRowProfitHTML(r.p, r.ch, parseCurrency(r.ch.price), parseCurrency(oldMall), parseCurrency(r.ch.linePrice)) + '</div></td>' +
    '</tr>';
  }
  const directRows = rows.map(function(r, index) { return { r, index }; }).filter(x => getChannelMode(x.r.ch) !== 'distribution');
  const distRows = rows.map(function(r, index) { return { r, index }; }).filter(x => getChannelMode(x.r.ch) === 'distribution');
  let html = '';
  if (directRows.length) {
    html += '<div class="batch-price-section"><div class="batch-price-section-head"><div class="batch-price-section-title"><span class="tag tag-gray">直销</span>直销商品改价</div><div class="batch-price-section-hint">渠道价=商城价即C端销售价，仅维护渠道价与划线价</div></div><div class="batch-price-table-wrap"><table class="batch-price-table"><thead><tr><th style="width:200px;">商品信息</th><th style="width:120px;">所属商城</th><th style="width:90px;">供应商</th><th style="width:80px;">供货价</th><th style="width:130px;">新渠道价</th><th style="width:130px;">新划线价</th><th style="width:200px;">毛利预估</th></tr></thead><tbody>' + directRows.map(x => directRow(x.r, x.index)).join('') + '</tbody></table></div></div>';
  }
  if (distRows.length) {
    html += '<div class="batch-price-section"><div class="batch-price-section-head"><div class="batch-price-section-title"><span class="tag tag-blue">分销</span>分销商品改价</div><div class="batch-price-section-hint">渠道价用于结算，商城价用于C端销售</div></div><div class="batch-price-table-wrap"><table class="batch-price-table" style="min-width:1000px;"><thead><tr><th style="width:200px;">商品信息</th><th style="width:120px;">所属商城</th><th style="width:90px;">供应商</th><th style="width:80px;">供货价</th><th style="width:130px;">新渠道价</th><th style="width:130px;">新商城价</th><th style="width:130px;">新划线价</th><th style="width:200px;">毛利预估</th></tr></thead><tbody>' + distRows.map(x => distRow(x.r, x.index)).join('') + '</tbody></table></div></div>';
  }
  document.getElementById('batchPriceList').innerHTML = html;
  openModal('batchPriceModal');
}
function getBatchPriceRows() {
  const keys = window._batchPriceTargets || [];
  return keys.map(function(key) {
    const parts = key.split('|');
    return findPriceChangeTarget(parts[0], parts[1], parts[2]);
  }).filter(Boolean);
}
function updateBatchPricePreview(index) {
  const rowEl = document.querySelectorAll('#batchPriceList .batch-price-row')[index];
  const target = getBatchPriceRows()[index];
  if (!rowEl || !target) return;
  const channelVal = parseFloat(rowEl.querySelector('.batch-price-channel').value);
  const mallInput = rowEl.querySelector('.batch-price-mall');
  const mallVal = mallInput ? parseFloat(mallInput.value) : channelVal;
  const lineVal = parseFloat(rowEl.querySelector('.batch-price-line').value);
  document.getElementById('batchPriceProfit' + index).innerHTML = priceRowProfitHTML(target.p, target.ch, channelVal, mallVal, lineVal);
}
function submitBatchPriceChange(forceConfirm) {
  const targets = getBatchPriceRows();
  if (targets.length === 0) return;
  let lowCostCount = 0;
  for (let i = 0; i < targets.length; i++) {
    const rowEl = document.querySelectorAll('#batchPriceList .batch-price-row')[i];
    const channelVal = parseFloat(rowEl.querySelector('.batch-price-channel').value);
    const lineVal = parseFloat(rowEl.querySelector('.batch-price-line').value);
    const mode = getChannelMode(targets[i].ch);
    const mallInput = rowEl.querySelector('.batch-price-mall');
    const mallVal = mallInput ? parseFloat(mallInput.value) : channelVal;
    if (!channelVal || channelVal <= 0) { showToast('info', '第 ' + (i + 1) + ' 行请输入有效渠道价'); return; }
    if (!lineVal || lineVal <= 0) { showToast('info', '第 ' + (i + 1) + ' 行请输入有效划线价'); return; }
    if (mode === 'distribution' && (!mallVal || mallVal <= 0)) { showToast('info', '第 ' + (i + 1) + ' 行请输入有效商城价'); return; }
    if (channelVal < parseCurrency(targets[i].p.supplyPrice)) lowCostCount++;
  }
  if (!forceConfirm && lowCostCount > 0) { openModal('batchPriceForceConfirmModal'); return; }
  targets.forEach(function(target, i) {
    const rowEl = document.querySelectorAll('#batchPriceList .batch-price-row')[i];
    const channelVal = parseFloat(rowEl.querySelector('.batch-price-channel').value);
    const lineVal = parseFloat(rowEl.querySelector('.batch-price-line').value);
    const mode = getChannelMode(target.ch);
    const mallInput = rowEl.querySelector('.batch-price-mall');
    const mallVal = mallInput ? parseFloat(mallInput.value) : channelVal;
    target.ch.price = formatCurrency(channelVal);
    target.ch.mallPrice = mode === 'distribution' ? formatCurrency(mallVal) : target.ch.price;
    target.ch.linePrice = formatCurrency(lineVal);
  });
  refreshAll();
  closeModal('batchPriceForceConfirmModal');
  closeModal('batchPriceModal');
  showToast('success', '已批量更新 ' + targets.length + ' 条渠道商品价格' + (lowCostCount ? '，其中 ' + lowCostCount + ' 条低于供货价' : ''));
}

function openBatchRemove() {
  const count = getSelectedItems().length;
  if (count === 0) { showToast('info', '请先勾选要操作的商品'); return; }
  document.getElementById('confirmBatchRemoveMsg').textContent = '即将移出已勾选的 ' + count + ' 个商品，请确认。';
  openModal('confirmBatchRemove');
}
function confirmBatchRemove() {
  const items = getSelectedItems();
  items.forEach(item => {
    const p = productData.find(x => x.id === item.id);
    if (!p) return;
    if (!item.sku) {
      // SPU-level: in channel view remove all SKUs from current channel; in product view remove entire SPU
      if (currentChannel) {
        p.skus.forEach(s => {
          const idx = s.channels.findIndex(c => c.ch === currentChannel);
          if (idx >= 0) s.channels.splice(idx, 1);
        });
        // Remove SKUs with no channels left
        for (let i = p.skus.length - 1; i >= 0; i--) {
          if (p.skus[i].channels.length === 0) p.skus.splice(i, 1);
        }
        if (p.skus.length === 0) {
          const pi = productData.findIndex(x => x.id === item.id);
          if (pi >= 0) productData.splice(pi, 1);
        }
      } else {
        const pi = productData.findIndex(x => x.id === item.id);
        if (pi >= 0) productData.splice(pi, 1);
      }
    } else if (!item.ch) {
      // SKU-level: in channel view remove from current channel; in product view remove entire SKU
      if (currentChannel) {
        const sku = p.skus.find(s => s.sku === item.sku);
        if (sku) {
          const idx = sku.channels.findIndex(c => c.ch === currentChannel);
          if (idx >= 0) sku.channels.splice(idx, 1);
          if (sku.channels.length === 0) {
            const si = p.skus.findIndex(s => s.sku === sku.sku);
            if (si >= 0) p.skus.splice(si, 1);
          }
        }
      } else {
        const si = p.skus.findIndex(s => s.sku === item.sku);
        if (si >= 0) p.skus.splice(si, 1);
      }
      if (p.skus.length === 0) {
        const pi = productData.findIndex(x => x.id === item.id);
        if (pi >= 0) productData.splice(pi, 1);
      }
    } else {
      // Channel-level: remove specific channel
      const sku = p.skus.find(s => s.sku === item.sku);
      if (sku) {
        const idx = sku.channels.findIndex(c => c.ch === item.ch);
        if (idx >= 0) sku.channels.splice(idx, 1);
        if (sku.channels.length === 0) {
          const si = p.skus.findIndex(s => s.sku === sku.sku);
          if (si >= 0) p.skus.splice(si, 1);
        }
      }
      if (p.skus.length === 0) {
        const pi = productData.findIndex(x => x.id === item.id);
        if (pi >= 0) productData.splice(pi, 1);
      }
    }
  });
  refreshAll();
  showToast('success', '已批量移出 ' + items.length + ' 个商品');
  closeModal('confirmBatchRemove');
}

function refreshAll() {
  renderProductTable();
  if (currentChannel) renderChannelTable(currentChannel);
  updateSelection();
}

// ==================== MODAL ====================
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// ==================== IMPORT MODAL ====================
const abnormalData = [
  { type:'duplicate', typeLabel:'重复数据',   product:'不锈钢保温杯500ml', sku:'S001A00004',  reason:'商品重复，存在 3 条重复数据' },
  { type:'duplicate', typeLabel:'重复数据',   product:'不锈钢保温杯500ml', sku:'S001A00004',  reason:'商品重复，存在 3 条重复数据（重复项 2/3）' },
  { type:'profit',    typeLabel:'利润预警',   product:'男士商务休闲皮鞋',   sku:'S001A00006001', reason:'供货价 ¥100 > 渠道价 ¥90，预计亏损 ¥10/单' },
  { type:'supplier',  typeLabel:'供应商优化', product:'智能蓝牙体脂秤',     sku:'S001A00003001',reason:'存在更低价供应商B (¥95)，当前差价 ¥5' },
  { type:'duplicate', typeLabel:'重复数据',   product:'不锈钢保温杯500ml', sku:'S001A00004',  reason:'商品重复，存在 3 条重复数据（重复项 3/3）' },
  { type:'conflict',  typeLabel:'渠道冲突',   product:'夏季纯棉圆领T恤',    sku:'S001A00002001',reason:'渠道 [天猫] 已存在同款在售 (商城SKU: S001A00002002)' },
  { type:'profit',    typeLabel:'利润预警',   product:'儿童运动跑鞋',       sku:'S001A00007001',  reason:'供货价 ¥65 > 渠道价 ¥59，预计亏损 ¥6/单' },
  { type:'supplier',  typeLabel:'供应商优化', product:'女士直筒休闲长裤',   sku:'S001A00005001', reason:'存在更低价供应商B (¥78)，当前差价 ¥7' },
  { type:'profit',    typeLabel:'利润预警',   product:'夏季纯棉圆领T恤',    sku:'S001A00002001',reason:'供货价 ¥50 > 渠道价 ¥45，预计亏损 ¥5/单' },
];

const tagClassMap = {
  duplicate:'tag-duplicate', profit:'tag-profit', supplier:'tag-supplier',
  conflict:'tag-conflict', cost:'tag-cost', outage:'tag-outage',
};

function renderAbnormalTable() {
  const tbody = document.getElementById('abnormalTableBody');
  tbody.innerHTML = abnormalData.map(r => `
    <tr>
      <td><span class="tag ${tagClassMap[r.type]}">${r.typeLabel}</span></td>
      <td><span class="product-name">${r.product}<span class="sku">${r.sku}</span></span></td>
      <td style="font-size:12.5px;color:var(--text-secondary);line-height:1.4;word-break:break-word;overflow-wrap:break-word;">${r.reason}</td>
    </tr>
  `).join('');
  const a = abnormalData.length, n = 50 - a;
  document.getElementById('abnormalTotal').textContent = a;
  document.getElementById('abnormalCount').textContent = a;
  document.getElementById('normalCount').textContent = n;
  document.querySelector('#importModal .btn-primary').textContent = '仅正常商品进入定价（' + n + '条）';
}
renderAbnormalTable();

function openImportModal() { openModal('importModal'); }
function backToUpload() { showToast('info', '已返回上传页面，请重新选择文件'); closeModal('importModal'); }
document.getElementById('importModal').addEventListener('click', function(e) { if (e.target === this) closeModal('importModal'); });

// ==================== IMPORT FILTER ====================
var importFilterMode = ''; // 'upload' | 'paste'

function toggleImportFilter() {
  var dd = document.getElementById('importFilterDropdown');
  dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
}
function openImportFilterModal(mode) {
  document.getElementById('importFilterDropdown').style.display = 'none';
  importFilterMode = mode;
  var title = document.getElementById('importFilterModalTitle');
  var body = document.getElementById('importFilterModalBody');
  if (mode === 'upload') {
    title.textContent = '导入文件筛选';
    body.innerHTML =
      '<div class="import-filter-modal-upload" onclick="document.getElementById(\'importFileInput\').click()">' +
      '<div class="upload-icon">📂</div>' +
      '<div class="upload-text">点击上传文件</div>' +
      '<div class="upload-hint">支持 .xlsx / .xls / .csv，第一列为商城SKU或商城SPU</div>' +
      '<input type="file" id="importFileInput" accept=".xlsx,.xls,.csv" onchange="onImportFileSelected(this.files[0])">' +
      '</div>' +
      '<div id="importFileInfo" style="margin-top:8px;font-size:12px;color:var(--text-muted);"></div>' +
      '<div style="margin-top:10px;font-size:11px;color:var(--text-muted);border-top:1px solid var(--border-light);padding-top:8px;">' +
      '💡 原型演示：不上传文件直接点"应用筛选"将使用内置示例数据（5个商城SKU）</div>';
  } else {
    title.textContent = '批量粘贴筛选';
    // Demo data pre-filled
    var demoSKUs = 'S001A00004001\nS001A00006001\nS001A00003001\nS001A00010001\nS001A00011001';
    body.innerHTML =
      '<div class="import-filter-modal-paste">' +
      '<textarea id="importPasteArea" placeholder="粘贴商城SKU/商城SPU，每行一个，或用逗号/Tab分隔" rows="5" oninput="updatePasteCount()">' + demoSKUs + '</textarea>' +
      '<div class="paste-count">已识别 <strong id="importPasteCount">5</strong> 条关键词（自动去重）</div>' +
      '<div style="margin-top:8px;font-size:11px;color:var(--text-muted);">💡 原型演示：已预填示例SKU编码，可直接点"应用筛选"查看效果</div>' +
      '</div>';
  }
  openModal('importFilterModal');
}
function onImportFileSelected(file) {
  if (!file) return;
  document.getElementById('importFileInfo').textContent = '已选择: ' + file.name;
}
function updatePasteCount() {
  var text = document.getElementById('importPasteArea').value;
  document.getElementById('importPasteCount').textContent = parseKeywords(text).length;
}
function confirmImportFilter() {
  var keywords = [];
  if (importFilterMode === 'upload') {
    var fileInput = document.getElementById('importFileInput');
    var file = fileInput && fileInput.files[0];
    if (!file) {
      // Demo mode: use built-in sample data
      keywords = ['S001A00004001', 'S001A00006001', 'S001A00003001', 'S001A00009001', 'S001A00005001'];
      applyImportFilter(keywords);
      closeModal('importFilterModal');
      return;
    }
    // Process file in modal - use reader
    var reader = new FileReader();
    var ext = file.name.split('.').pop().toLowerCase();
    if (ext === 'xlsx' || ext === 'xls') {
      if (typeof XLSX !== 'undefined') {
        reader.readAsArrayBuffer(file);
        reader.onload = function(e) {
          var data = new Uint8Array(e.target.result);
          var wb = XLSX.read(data, {type: 'array'});
          var firstSheet = wb.Sheets[wb.SheetNames[0]];
          var rows = XLSX.utils.sheet_to_json(firstSheet, {header: 1});
          var colVals = [];
          for (var i = 0; i < rows.length; i++) { if (rows[i] && rows[i][0]) colVals.push(String(rows[i][0]).trim()); }
          keywords = []; var seen = {};
          for (var j = 0; j < colVals.length; j++) { if (colVals[j] && !seen[colVals[j]]) { seen[colVals[j]] = true; keywords.push(colVals[j]); } }
          keywords = keywords.slice(0, 500);
          if (keywords.length === 0) { showToast('warning', '未识别到有效关键词'); return; }
          applyImportFilter(keywords);
          closeModal('importFilterModal');
        };
        return; // async, don't continue
      } else { reader.readAsText(file, 'UTF-8'); }
    } else { reader.readAsText(file, 'UTF-8'); }
    reader.onload = function(e) {
      keywords = parseKeywords(e.target.result);
      if (keywords.length === 0) { showToast('warning', '未识别到有效关键词，请检查文件内容'); return; }
      applyImportFilter(keywords);
      closeModal('importFilterModal');
    };
  } else {
    keywords = parseKeywords(document.getElementById('importPasteArea').value);
    if (keywords.length === 0) { showToast('warning', '请粘贴至少一条关键词'); return; }
    applyImportFilter(keywords);
    closeModal('importFilterModal');
  }
}
function parseKeywords(text) {
  if (!text) return [];
  var parts = text.split(/[\n\r,;\t]+/);
  var keywords = []; var seen = {};
  for (var i = 0; i < parts.length; i++) {
    var kw = parts[i].trim();
    if (kw && !seen[kw]) { seen[kw] = true; keywords.push(kw); }
  }
  return keywords.slice(0, 500);
}
function applyImportFilter(keywords) {
  importFilterKeywords = keywords;
  importFilterActive = true;
  document.getElementById('importFilterTag').style.display = 'inline-flex';
  document.getElementById('importFilterCount').textContent = keywords.length;
  var tagCh = document.getElementById('importFilterTagCh');
  if (tagCh) { tagCh.style.display = 'inline-flex'; document.getElementById('importFilterCountCh').textContent = keywords.length; }
  expandedSPUs.clear(); expandedChSPUs.clear(); allExpanded = false; chAllExpanded = false;
  if (currentChannel) renderChannelTable(currentChannel); else renderProductTable();
  showToast('success', '已应用导入筛选: ' + keywords.length + ' 条关键词');
}
function clearImportFilter() {
  importFilterKeywords = [];
  importFilterActive = false;
  document.getElementById('importFilterTag').style.display = 'none';
  var tagCh = document.getElementById('importFilterTagCh');
  if (tagCh) tagCh.style.display = 'none';
  expandedSPUs.clear(); expandedChSPUs.clear(); allExpanded = false; chAllExpanded = false;
  if (currentChannel) renderChannelTable(currentChannel); else renderProductTable();
  showToast('success', '已清除导入筛选，显示全部商品');
}
document.addEventListener('click', function(e) {
  var dd = document.getElementById('importFilterDropdown');
  var wrap = document.querySelector('.import-filter-wrap');
  if (dd && wrap && !wrap.contains(e.target)) { dd.style.display = 'none'; }
});
function importFilterMatch(str) {
  if (!importFilterActive || importFilterKeywords.length === 0) return true;
  var s = str.toLowerCase();
  for (var i = 0; i < importFilterKeywords.length; i++) {
    if (s.indexOf(importFilterKeywords[i].toLowerCase()) !== -1) return true;
  }
  return false;
}

let listExpanded = true;
function toggleAbnormalList() {
  listExpanded = !listExpanded;
  document.getElementById('abnormalTableWrap').style.display = listExpanded ? '' : 'none';
  const arrow = document.getElementById('listArrow');
  listExpanded ? arrow.classList.remove('folded') : arrow.classList.add('folded');
}

function submitNormalOnly() {
  const n = 50 - abnormalData.length;
  closeModal('importModal');
  showToast('success', '已推送 ' + n + ' 个正常商品进入定价推品配置页，' + abnormalData.length + ' 个异常商品已转入待处理选品中心');
  setTimeout(() => { window.location.href = '05.定价推品配置页-原型页面.html?mode=normal-import'; }, 800);
}

// ==================== TOAST ====================
function copyText(text, doneMsg, e) {
  if (e) e.stopPropagation();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() { showToast('success', doneMsg); });
  } else { showToast('info', text); }
}
function showToast(type, msg) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(20px)'; toast.style.transition = 'all .2s ease'; setTimeout(() => toast.remove(), 200); }, 3000);
}

// ==================== KEYBOARD ====================
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(el => { el.classList.remove('open'); });
  }
});

// Open product detail page
function openDetailPage(spu, sku, tab, channel) {
  var url = '10.商品详情页-原型页面.html?spu=' + encodeURIComponent(spu);
  if (sku) url += '&sku=' + encodeURIComponent(sku);
  if (tab) url += '&tab=' + encodeURIComponent(tab);
  if (channel) url += '&channel=' + encodeURIComponent(channel);
  // Combo SPU (C prefix) → combo mode
  if (spu && spu.charAt(0) === 'C') url += '&mode=combo';
  window.open(url, '_blank');
}
updateTableFooterVisibility();
