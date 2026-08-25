// ==================== 配置面板 ====================
function tip(t) { return `<div class="cfg-tip">${t}</div>`; }
function sec(title, tag, body, collapsed) {
  const map = { content: ['内容','tag-content'], style: ['风格','tag-style'], adv: ['高级','tag-adv'] };
  const [tl, tc] = map[tag] || ['',''];
  return `<div class="cfg-section${tag==='adv'?' is-adv':''}${collapsed?' collapsed':''}">
    <div class="cfg-section-title" onclick="this.parentElement.classList.toggle('collapsed')">
      <span>${title}</span>${tl?`<span class="sec-tag ${tc}">${tl}</span>`:''}<span class="chev">▼</span>
    </div>
    <div class="cfg-section-body">${body}</div>
  </div>`;
}
function lbl(label, hint) {
  return `<div class="lbl">${esc(label)}${hint?`<span class="hint">${esc(hint)}</span>`:''}</div>`;
}
function rowBool(label, key, val, hint) {
  return `<div class="cfg-row">${lbl(label,hint)}<label class="sw-toggle"><input type="checkbox" data-key="${key}" ${val?'checked':''}><span class="sw"></span></label></div>`;
}
function rowText(label, key, val, full, hint) {
  return `<div class="cfg-row${full?' stack':''}">${lbl(label,hint)}<input type="text" value="${esc(val||'')}" data-key="${key}"></div>`;
}
function rowNum(label, key, val, min, max, hint, unit) {
  return `<div class="cfg-row">${lbl(label,hint)}<span style="display:flex;align-items:center;gap:4px"><input type="number" value="${val}" min="${min}" max="${max}" data-key="${key}">${unit?`<span class="unit">${unit}</span>`:''}</span></div>`;
}
function rowColor(label, key, val) {
  return `<div class="cfg-row">${lbl(label)}<input type="color" value="${val||'#ffffff'}" data-key="${key}"></div>`;
}
function rowColorPair(label, k1, v1, k2, v2) {
  return `<div class="cfg-row">${lbl(label)}<div class="color-pair"><input type="color" value="${v1}" data-key="${k1}"><span>→</span><input type="color" value="${v2}" data-key="${k2}"></div></div>`;
}
function rowSelect(label, key, val, opts) {
  return `<div class="cfg-row">${lbl(label)}<select data-key="${key}">${opts.map(o=>`<option value="${o.v}" ${String(o.v)===String(val)?'selected':''}>${esc(o.l)}</option>`).join('')}</select></div>`;
}
function normalizeHotWord(w) {
  if (typeof w === 'string') return { text: w, link: '/search?q=' + encodeURIComponent(w), highlight: false };
  return {
    text: (w && w.text) || '',
    link: (w && w.link) || '#',
    highlight: !!(w && w.highlight)
  };
}

function hotWordsEditor(arr) {
  const list = (arr || []).map(normalizeHotWord);
  return `<div style="font-size:11px;color:#888;margin-bottom:6px">每条可设置文案与是否高亮，可用上下箭头调整顺序</div>
    ${list.map((w, i) => `
    <div class="cfg-list-item card-item">
      <span class="card-label">
        <span>热搜词 ${i + 1}</span>
        <span class="card-label-actions">
          <button type="button" class="btn-move" onclick="moveListItem('hotWords',${i},-1)" ${i === 0 ? 'disabled' : ''} title="上移">↑</button>
          <button type="button" class="btn-move" onclick="moveListItem('hotWords',${i},1)" ${i === list.length - 1 ? 'disabled' : ''} title="下移">↓</button>
          <button class="btn-del" onclick="removeListItem('hotWords',${i})" title="删除">✕</button>
        </span>
      </span>
      <input type="text" value="${esc(w.text)}" placeholder="热搜词文案" data-list-key="hotWords" data-idx="${i}" data-field="text">
      <div class="cfg-row" style="width:100%;border:none;padding:2px 0 0">
        <div class="lbl">高亮展示</div>
        <label class="sw-toggle">
          <input type="checkbox" data-list-key="hotWords" data-idx="${i}" data-field="highlight" ${w.highlight ? 'checked' : ''}>
          <span class="sw"></span>
        </label>
      </div>
    </div>`).join('')}
    <button class="cfg-add-btn" onclick="addHotWord()">+ 添加热搜词</button>`;
}

function addHotWord() {
  if (!selectedId) return;
  const comp = components.find(c => c.id === selectedId);
  if (!comp) return;
  if (!Array.isArray(comp.config.hotWords)) comp.config.hotWords = [];
  // 兼容旧字符串格式
  comp.config.hotWords = comp.config.hotWords.map(normalizeHotWord);
  comp.config.hotWords.push({ text: '新热词', highlight: false });
  renderConfigPanel(selectedId);
  renderPreview();
}

function listEditor(key, arr, label) {
  return `<div class="cfg-list">${(arr||[]).map((item,i)=>`
    <div class="cfg-list-item"><span class="idx">${i+1}.</span>
      <input type="text" value="${esc(typeof item==='string'?item:'')}" data-list-key="${key}" data-idx="${i}">
      <button class="btn-del" onclick="removeListItem('${key}',${i})">✕</button>
    </div>`).join('')}</div>
    <button class="cfg-add-btn" onclick="addListItem('${key}')">+ 添加${label}</button>`;
}

function simpleTagsEditor(arr) {
  return listEditor('tags', arr || [], '标签');
}

function breadcrumbEditor(items) {
  const list = items || [];
  return `<div class="cfg-list">${list.map(function (it, i) {
    return `<div class="cfg-list-item card-item">
      <span class="card-label"><span>路径 ${i + 1}</span>
        <button class="btn-del" onclick="removeListItem('items',${i})" title="删除">✕</button>
      </span>
      <div class="cfg-row">${lbl('文案')}<input type="text" value="${esc(it.text || '')}" data-list-key="items" data-idx="${i}" data-field="text"></div>
      <div class="cfg-row stack">${lbl('跳转页面')}<select data-list-key="items" data-idx="${i}" data-field="link">${pageRouteOptionsHtml(it.link || '')}</select></div>
    </div>`;
  }).join('')}</div>
  <button class="cfg-add-btn" onclick="addListItem('items',{text:'新路径',link:''})">+ 添加路径</button>`;
}

function actHeroImageEditor(cfg) {
  const thumb = cfg.img ? cfg.img : imgOf(cfg.imgKey || 'p12');
  return `<div class="promo-img-row">
    <img class="promo-thumb" src="${esc(thumb)}" alt="">
    <div class="promo-img-actions">
      <label class="promo-img-btn">本地上传
        <input type="file" accept="image/*" hidden onchange="uploadConfigImage('img','imgKey',this)">
      </label>
      <button type="button" class="promo-img-btn" onclick="openConfigMaterialLibrary('img','imgKey')">素材库</button>
      ${(cfg.img || cfg.imgKey) ? `<button type="button" class="promo-img-btn ghost" onclick="clearConfigImage('img','imgKey')">清除</button>` : ''}
    </div>
  </div>`;
}

function headerBrandImageEditor(cfg) {
  const img = cfg.logoImg;
  const key = cfg.logoImgKey;
  const thumb = img ? img : (key ? imgOf(key) : '');
  return `<div class="promo-img-row">
    ${thumb
      ? `<img class="promo-thumb" src="${esc(thumb)}" alt="">`
      : `<div class="promo-thumb is-empty">暂无图片</div>`}
    <div class="promo-img-actions">
      <label class="promo-img-btn">本地上传
        <input type="file" accept="image/*" hidden onchange="uploadConfigImage('logoImg','logoImgKey',this)">
      </label>
      <button type="button" class="promo-img-btn" onclick="openConfigMaterialLibrary('logoImg','logoImgKey')">素材库</button>
      ${(img || key) ? `<button type="button" class="promo-img-btn ghost" onclick="clearConfigImage('logoImg','logoImgKey')">清除</button>` : ''}
    </div>
  </div>`;
}

/** 将旧版全局风格中的品牌字段迁移到搜索头部配置 */
function ensureHeaderBrandConfig(cfg) {
  if (!cfg) return cfg;
  const theme = pageTheme || defaultPageTheme || {};
  if (cfg.logoMode == null && theme.logoMode) cfg.logoMode = theme.logoMode;
  if (cfg.logoOrder == null && theme.logoOrder) cfg.logoOrder = theme.logoOrder;
  if (cfg.logoSize == null && theme.logoSize != null) cfg.logoSize = theme.logoSize;
  if (cfg.logoRadius == null && theme.logoRadius != null) cfg.logoRadius = theme.logoRadius;
  if ((cfg.logoText == null || cfg.logoText === '') && theme.logoText) cfg.logoText = theme.logoText;
  if (cfg.logoSub == null && theme.logoSub != null) cfg.logoSub = theme.logoSub;
  if (!cfg.logoImg && theme.logoImg) cfg.logoImg = theme.logoImg;
  if (!cfg.logoImgKey && theme.logoImgKey) cfg.logoImgKey = theme.logoImgKey;
  if (cfg.logoMode == null) cfg.logoMode = 'both';
  if (cfg.logoOrder == null) cfg.logoOrder = 'logoFirst';
  if (cfg.logoSize == null) cfg.logoSize = 36;
  if (cfg.logoRadius == null) cfg.logoRadius = 0;
  return cfg;
}

function headerBrandEditor(cfg) {
  ensureHeaderBrandConfig(cfg);
  const logoMode = cfg.logoMode || 'both';
  const showLogoImg = logoMode === 'both' || logoMode === 'logo';
  const showLogoText = logoMode === 'both' || logoMode === 'text';
  const showLogoOrder = logoMode === 'both';
  return `
    ${rowSelect('展示形式', 'logoMode', logoMode, [
      { v: 'both', l: '图片 + 文字' },
      { v: 'logo', l: '仅图片' },
      { v: 'text', l: '仅文字' }
    ])}
    ${showLogoOrder
      ? rowSelect('排列顺序', 'logoOrder', cfg.logoOrder || 'logoFirst', [
          { v: 'logoFirst', l: '图片在左 · 文字在右' },
          { v: 'textFirst', l: '文字在左 · 图片在右' }
        ])
      : ''}
    ${showLogoText
      ? (
        rowText('品牌名称', 'logoText', cfg.logoText || '苏银豆商城') +
        rowText('品牌副标题', 'logoSub', cfg.logoSub || '')
      )
      : ''}
    ${showLogoImg
      ? (
        headerBrandImageEditor(cfg) +
        rowNum('图片大小', 'logoSize', cfg.logoSize != null ? cfg.logoSize : 36, 20, 120, '', 'px') +
        rowNum('图片圆角', 'logoRadius', cfg.logoRadius != null ? cfg.logoRadius : 0, 0, 60, '', 'px')
      )
      : (logoMode === 'text'
        ? '<div class="cfg-tip">当前为「仅文字」模式，不展示品牌图片。</div>'
        : '')}
    ${rowText('跳转页面', 'logoLink', cfg.logoLink, true)}
    ${rowNum('品牌区宽度', 'logoWidth', cfg.logoWidth, 120, 240, null, 'px')}
  `;
}

function themeImageEditor(imgField, keyField, emptyLabel) {
  const theme = pageTheme || defaultPageTheme;
  const img = theme[imgField];
  const key = theme[keyField];
  const thumb = img ? img : (key ? imgOf(key) : '');
  return `<div class="promo-img-row">
    ${thumb
      ? `<img class="promo-thumb" src="${esc(thumb)}" alt="">`
      : `<div class="promo-thumb is-empty">暂无图片</div>`}
    <div class="promo-img-actions">
      <label class="promo-img-btn">本地上传
        <input type="file" accept="image/*" hidden onchange="uploadThemeImage('${imgField}','${keyField}',this)">
      </label>
      <button type="button" class="promo-img-btn" onclick="openThemeMaterialLibrary('${imgField}','${keyField}')">素材库</button>
      ${(img || key) ? `<button type="button" class="promo-img-btn ghost" onclick="clearThemeImage('${imgField}','${keyField}')">清除</button>` : ''}
    </div>
  </div>`;
}

function renderThemePanel() {
  const theme = pageTheme || getDefaultTheme();
  document.getElementById('configEmpty').style.display = 'none';
  document.getElementById('configBody').classList.add('show');
  document.getElementById('configTitle').textContent = '页面风格 · 全局设置';
  document.getElementById('configBadge').textContent = '风格设置';

  const html = `
    ${tip('全局风格作用于当前页面预览：背景、默认文字颜色与字号。品牌图片请在「搜索头部 · 品牌区」配置。')}
    ${sec('页面背景', 'content', `
      ${rowSelect('背景类型', 'bgMode', theme.bgMode || 'color', [
        { v: 'color', l: '纯色' },
        { v: 'image', l: '图片' }
      ])}
      ${(theme.bgMode || 'color') === 'image'
        ? themeImageEditor('bgImg', 'bgImgKey', '未设置背景图')
        : rowColor('背景色', 'bgColor', theme.bgColor || '#f4f4f4')}
    `)}
    ${sec('默认文字', 'content', `
      ${rowColor('默认字体颜色', 'textColor', theme.textColor || '#333333')}
      ${rowNum('默认字体大小', 'fontSize', theme.fontSize || 14, 12, 20, null, 'px')}
      ${rowColor('主题色', 'primaryColor', theme.primaryColor || '#e1251b')}
    `)}
  `;
  document.getElementById('configBody').innerHTML = html;
  bindThemeInputs();
}

function feedTabEditor(cfg) {
  const tabs = normalizeFeedTabs(cfg);
  const need = Math.max(1, (parseInt(cfg.columns, 10) || 6) * (parseInt(cfg.rows, 10) || 2));
  return tabs.map(function (t, i) {
    const keys = t.products || [];
    return `
    <div class="sub-card">
      <div class="sub-hd"><span>频道 ${i + 1}</span><button class="btn-del" onclick="removeListItem('tabs',${i})">✕</button></div>
      <div class="cfg-row">${lbl('频道名称')}<input type="text" value="${esc(t.name)}" data-list-key="tabs" data-idx="${i}" data-field="name"></div>
      <div style="font-size:11px;color:#888;margin:8px 0 4px">展示商品 · 已选 ${keys.length} / ${need}</div>
      <div class="slot-product-thumbs">
        ${keys.slice(0, need).map(function (k, pi) {
          const key = typeof k === 'string' ? k : (k && k.key);
          const p = PRODUCT_POOL.find(function (x) { return x.key === key; });
          if (!p) return '';
          return '<div class="slot-product-thumb" title="' + esc(p.name) + '">' +
            '<img src="' + esc(imgOf(p.key)) + '" alt="">' +
            '<button type="button" class="thumb-del" onclick="removeFeedProduct(' + i + ',' + pi + ')" title="移除">✕</button>' +
          '</div>';
        }).join('')}
        ${keys.length < need ? '<button type="button" class="slot-product-add" onclick="openFeedProductPicker(' + i + ')">+</button>' : ''}
      </div>
      <button type="button" class="cfg-add-btn" onclick="openFeedProductPicker(${i})">选择商品</button>
    </div>`;
  }).join('') +
  `<button class="cfg-add-btn" onclick="addListItem('tabs',{name:'新频道',products:[]})">+ 添加频道</button>`;
}
function menuEditor(key, menus, extraFields) {
  return `<div class="cfg-list">${(menus||[]).map((m,i)=>`
    <div class="cfg-list-item card-item">
      <span class="card-label"><span>菜单 ${i+1}</span><button class="btn-del" onclick="removeListItem('${key}',${i})">✕</button></span>
      <input type="text" value="${esc(m.name)}" placeholder="菜单名称" data-list-key="${key}" data-idx="${i}" data-field="name">
      <select class="route-select" data-list-key="${key}" data-idx="${i}" data-field="link" title="选择跳转页面">
        ${pageRouteOptionsHtml(m.link)}
      </select>
      ${extraFields||''}
    </div>`).join('')}</div>
    <button class="cfg-add-btn" onclick="addListItem('${key}',{name:'新菜单',link:'#'})">+ 添加菜单</button>`;
}

function renderConfigPanel(id) {
  if (configMode === 'theme' && !id) {
    renderThemePanel();
    return;
  }
  const localComp = components.find(c => c.id === id);
  if (!localComp) {
    document.getElementById('configEmpty').style.display = '';
    document.getElementById('configBody').classList.remove('show');
    document.getElementById('configTitle').textContent = '组件属性';
    document.getElementById('configBadge').textContent = '请选择组件';
    return;
  }

  // 活动页壳层：只读，跟随标准首页
  if (typeof isLockedShellComp === 'function' && isLockedShellComp(id)) {
    const comp = (typeof resolveCompForDisplay === 'function') ? resolveCompForDisplay(localComp) : localComp;
    configMode = 'comp';
    document.getElementById('configEmpty').style.display = 'none';
    document.getElementById('configBody').classList.add('show');
    document.getElementById('configTitle').textContent = comp.name + ' · 组件属性';
    document.getElementById('configBadge').textContent = '跟随首页';
    document.getElementById('configBody').innerHTML =
      tip('该组件与「标准首页」保持一致，活动页不可单独修改开关、排序与内容。') +
      '<div class="cfg-locked-box">' +
        '<div class="cfg-locked-row"><span>当前展示</span><strong>' + (comp.on ? '开启' : '关闭') + '</strong></div>' +
        '<div class="cfg-locked-row"><span>配置来源</span><strong>标准首页</strong></div>' +
        '<button type="button" class="cfg-locked-btn" onclick="goEditShellOnHome(\'' + id + '\')">前往标准首页编辑</button>' +
      '</div>';
    return;
  }

  const comp = localComp;
  configMode = 'comp';
  document.getElementById('configEmpty').style.display = 'none';
  document.getElementById('configBody').classList.add('show');
  document.getElementById('configTitle').textContent = comp.name + ' · 组件属性';
  document.getElementById('configBadge').textContent =
    (typeof TYPE_LABELS !== 'undefined' && TYPE_LABELS[comp.type]) || comp.name;

  const cfg = comp.config;
  let html = '';

  if (typeof isFloorSectionComp === 'function' ? isFloorSectionComp(comp) : (comp.type === 'FloorSection' || /^floor\d+$/.test(id))) {
    html = floorConfigHtml(cfg, id);
    document.getElementById('configBody').innerHTML = html;
    bindConfigInputs();
    return;
  }

  switch (id) {
    case 'topbar':
      html = `
        ${tip('配置顶部左右菜单文字与跳转页面；购物车角标仅控制是否显示，数量来自系统。')}
        ${sec('左侧菜单', 'content', menuEditor('leftMenus', cfg.leftMenus))}
        ${sec('右侧菜单', 'content', `
          ${menuEditor('rightMenus', cfg.rightMenus)}
          ${rowBool('是否展示购物车角标', 'showCartBadge', cfg.showCartBadge !== false)}
        `)}
        ${sec('风格设置', 'style', `
          ${rowNum('高度', 'height', cfg.height, 24, 48, null, 'px')}
          ${rowColor('背景色', 'bgColor', cfg.bgColor)}
          ${rowColor('文字色', 'textColor', cfg.textColor)}
        `, true)}`;
      break;

    case 'header': {
      const plain = cfg.variant === 'plain';
      html = `
        ${tip(plain
          ? '活动页白底搜索头：配置品牌、搜索与热搜词（无促销卡片）。'
          : '配置品牌区、搜索、热搜词、购物车及下方促销卡片；图片支持本地上传或素材库。')}
        ${sec('品牌区', 'content', headerBrandEditor(cfg))}
        ${sec('搜索框', 'content', `
          ${rowText('搜索框提示语', 'searchPlaceholder', cfg.searchPlaceholder, true)}
          ${rowText('搜索按钮文案', 'searchBtnText', cfg.searchBtnText)}
        `)}
        ${sec('热搜词', 'content', `
          ${rowBool('是否展示热搜词', 'showHotWords', cfg.showHotWords !== false)}
          ${hotWordsEditor(cfg.hotWords)}
        `)}
        ${sec('购物车', 'content', `
          ${rowBool('是否展示', 'showCart', cfg.showCart)}
          ${rowText('按钮文案', 'cartText', cfg.cartText)}
          ${rowBool('是否展示角标', 'showCartBadge', cfg.showCartBadge !== false, '数量来自系统')}
        `)}
        ${plain ? '' : sec('促销卡片', 'content', promoEditor(cfg.promos))}
        ${sec('风格设置', 'style', plain
          ? `${rowNum('区域高度', 'height', cfg.height, 80, 200, null, 'px')}`
          : `
          ${rowNum('区域高度', 'height', cfg.height, 140, 280, null, 'px')}
          ${rowColorPair('背景渐变', 'gradientFrom', cfg.gradientFrom, 'gradientTo', cfg.gradientTo)}
        `, true)}`;
      break;
    }

    case 'breadcrumb':
      html = `
        ${tip('配置当前位置路径；最后一项为当前页，可不填跳转。')}
        ${sec('路径项', 'content', breadcrumbEditor(cfg.items))}
      `;
      break;

    case 'actHero':
      html = `
        ${tip('配置活动主视觉 Banner：背景图支持本地上传或素材库。')}
        ${sec('文案', 'content', `
          ${rowText('主标题', 'title', cfg.title, true)}
          ${rowText('副标题', 'subtitle', cfg.subtitle, true)}
          ${rowText('跳转页面', 'link', cfg.link, true)}
        `)}
        ${sec('背景图', 'content', `
          ${actHeroImageEditor(cfg)}
        `)}
        ${sec('标签', 'content', `
          ${rowBool('是否展示标签', 'showTags', cfg.showTags !== false)}
          ${simpleTagsEditor(cfg.tags)}
        `)}
        ${sec('风格设置', 'style', `
          ${rowNum('高度', 'height', cfg.height, 200, 480, null, 'px')}
          ${rowNum('圆角', 'radius', cfg.radius, 0, 24, null, 'px')}
        `, true)}`;
      break;

    case 'actRule':
    case 'notice': {
      const isRule = id === 'actRule';
      // 兼容活动规则条旧版 label/text
      if (isRule && !Array.isArray(cfg.notices)) {
        cfg.notices = cfg.text ? [cfg.text] : [];
        if (!cfg.badgeText) cfg.badgeText = cfg.label || '公告';
        if (cfg.height == null) cfg.height = 40;
        if (!cfg.bgColor) cfg.bgColor = '#ffffff';
        if (!cfg.textColor) cfg.textColor = '#666666';
        if (!cfg.badgeColor) cfg.badgeColor = '#e1251b';
        if (cfg.showMore == null) cfg.showMore = true;
        if (!cfg.moreText) cfg.moreText = '更多';
        if (!cfg.moreLink) cfg.moreLink = '22.帮助中心-原型页面.html';
        if (cfg.enableScroll == null) cfg.enableScroll = true;
        if (cfg.scrollInterval == null) cfg.scrollInterval = 28;
      }
      html = `
        ${tip('配置滚动公告、左侧徽标与右侧「更多」入口。')}
        ${sec('公告内容', 'content', `
          ${listEditor('notices', cfg.notices || [], '公告')}
          ${rowBool('是否滚动', 'enableScroll', cfg.enableScroll !== false)}
          ${rowNum('滚动间隔', 'scrollInterval', cfg.scrollInterval ?? 28, 5, 120, '整轮滚动时长', '秒')}
        `)}
        ${sec('徽标与「更多」', 'content', `
          ${noticeBadgeEditor(cfg)}
          ${rowText('徽标文字', 'badgeText', cfg.badgeText, false, '无图片时显示')}
          ${rowColor('徽标颜色', 'badgeColor', cfg.badgeColor)}
          ${rowBool('是否展示「更多」', 'showMore', cfg.showMore)}
          ${rowText('「更多」文案', 'moreText', cfg.moreText)}
          <div class="cfg-row stack">
            <div class="lbl">跳转页面</div>
            <select class="route-select" data-key="moreLink" title="选择跳转页面">
              ${pageRouteOptionsHtml(cfg.moreLink)}
            </select>
          </div>
        `)}
        ${sec('风格设置', 'style', `
          ${rowNum('高度', 'height', cfg.height, 28, 56, null, 'px')}
          ${rowColor('背景', 'bgColor', cfg.bgColor)}
          ${rowColor('文字', 'textColor', cfg.textColor)}
        `, true)}`;
      break;
    }

    case 'hero':
      html = `
        ${tip('配置轮播、用户信息与快捷入口；分类为系统固定项，无需逐条配置。')}
        ${sec('分类侧栏', 'content', `
          ${rowBool('是否展示', 'showCategories', cfg.showCategories)}
          ${rowText('分类标题', 'categoryTitle', cfg.categoryTitle)}
          ${rowNum('侧栏宽度', 'categoryWidth', cfg.categoryWidth, 160, 260, null, 'px')}
          <div class="cfg-tip" style="margin-top:6px">分类为系统固定 ${ALL_CATEGORIES.length} 项，预览自动展示。</div>
        `)}
        ${sec('轮播图', 'content', `
          ${rowBool('是否展示', 'showBanner', cfg.showBanner)}
          ${rowNum('自动切换间隔', 'autoPlayInterval', cfg.autoPlayInterval, 1, 10, null, '秒')}
          ${bannerEditor(cfg.banners)}
        `)}
        ${sec('用户信息区', 'content', `
          ${rowBool('是否展示', 'showUserPanel', cfg.showUserPanel)}
          ${rowBool('是否展示会员标签', 'showVipBadge', cfg.showVipBadge)}
          ${rowText('会员标签文案', 'vipBadgeText', cfg.vipBadgeText)}
          ${rowBool('是否展示用户昵称', 'showUserName', cfg.showUserName !== false, '昵称来自登录账号，此处仅控制是否显示')}
          ${rowBool('是否展示快捷入口', 'showServiceNav', cfg.showServiceNav)}
          ${rowBool('是否展示资产入口', 'showAssets', cfg.showAssets !== false, '仅控制是否显示，数量来自系统')}
          ${assetEditor(cfg.assets)}
        `)}
        ${sec('提醒消息', 'content', `
          ${rowBool('是否展示提醒', 'showAlerts', cfg.showAlerts !== false, '内容由系统推送，无需手动添加')}
          ${rowBool('已读后不再出现', 'alertsHideAfterRead', cfg.alertsHideAfterRead !== false, '用户标记已读后，同类提醒不再展示')}
          ${rowNum('积分到期提醒', 'pointsExpireRemindDays', cfg.pointsExpireRemindDays ?? 7, 1, 90, '积分将在多少天内到期时提醒', '天')}
          ${rowNum('降价提醒时长', 'priceDropRemindDays', cfg.priceDropRemindDays ?? 7, 1, 90, '降价提醒保留多少天', '天')}
          ${rowNum('卡券到期提醒', 'couponExpireRemindDays', cfg.couponExpireRemindDays ?? 3, 1, 90, '卡券将在多少天内到期时提醒', '天')}
        `)}
        ${sec('快捷入口列表', 'content', serviceEditor(cfg.services), true)}
        ${sec('风格设置', 'style', `
          ${rowNum('高度', 'height', cfg.height, 280, 480, null, 'px')}
          ${rowColor('背景', 'bgColor', cfg.bgColor)}
          ${rowNum('圆角', 'radius', cfg.radius, 0, 24, null, 'px')}
        `, true)}`;
      break;

    case 'opsRow':
      html = `
        ${tip('四列运营位，每格可选：热销榜、品牌专区或商品宫格。')}
        ${sec('排版', 'content', `
          ${rowNum('列数', 'columns', cfg.columns, 2, 4)}
          ${rowNum('间距', 'gap', cfg.gap, 4, 24, null, 'px')}
        `)}
        ${sec('运营位配置', 'content', opsSlotEditor(cfg.slots))}`;
      break;

    case 'welfare':
      html = `
        ${tip('左侧标题与按钮，右侧场景卡片；可配置图片与跳转页面。')}
        ${sec('标题区', 'content', `
          ${rowText('主标题', 'title', cfg.title)}
          ${rowText('副标题', 'subtitle', cfg.subtitle)}
          ${rowBool('是否展示按钮', 'showButton', cfg.showButton)}
          ${rowText('按钮文案', 'buttonText', cfg.buttonText)}
          ${rowText('跳转页面', 'buttonLink', cfg.buttonLink, true)}
        `)}
        ${sec('场景卡片', 'content', `
          ${rowNum('卡片间距', 'cardGap', cfg.cardGap ?? 10, 0, 40, '卡片之间的间距', 'px')}
          ${cardEditor(cfg.cards)}
        `)}
        ${sec('风格设置', 'style', `
          ${rowNum('高度', 'height', cfg.height, 140, 260, null, 'px')}
          ${rowColor('标题色', 'titleColor', cfg.titleColor)}
          ${rowColorPair('背景渐变', 'bgFrom', cfg.bgFrom, 'bgTo', cfg.bgTo)}
        `, true)}`;
      break;

    case 'feed': {
      const tabs = normalizeFeedTabs(cfg);
      html = `
        ${tip('每个推荐频道独立配置展示商品与卡片样式。')}
        ${sec('推荐频道', 'content', `
          ${rowSelect('默认展示频道', 'defaultTab', cfg.defaultTab, tabs.map((t,i)=>({v:i,l:`${i+1}. ${t.name}`})))}
          ${feedTabEditor(cfg)}
        `)}
        ${sec('商品卡片', 'content', `
          ${rowNum('列数', 'columns', cfg.columns, 3, 8)}
          ${rowNum('行数', 'rows', cfg.rows, 1, 4)}
          ${rowBool('是否展示品牌', 'showBrand', cfg.showBrand)}
          ${rowBool('是否展示标签', 'showTags', cfg.showTags)}
          ${rowBool('是否展示划线价', 'showOriginalPrice', cfg.showOriginalPrice)}
          ${rowBool('是否展示补贴文案', 'showPromoText', cfg.showPromoText)}
          ${rowBool('是否展示加购按钮', 'showCart', cfg.showCart)}
        `)}
        ${sec('风格设置', 'style', `
          ${rowColor('背景', 'bgColor', cfg.bgColor)}
          ${rowColor('频道选中色', 'tabColor', cfg.tabColor)}
        `, true)}`;
      break;
    }

    case 'footer':
      html = `
        ${tip('配置帮助栏目、底部协议与版权备案信息。')}
        ${sec('帮助栏目', 'content', footerColEditor(cfg.columns))}
        ${sec('底部信息', 'content', `
          ${rowBool('是否展示版权', 'showCopyright', cfg.showCopyright)}
          ${rowText('版权信息', 'copyright', cfg.copyright, true)}
          ${rowText('备案号', 'icp', cfg.icp, true)}
          ${legalEditor(cfg.legalLinks)}
        `)}
        ${sec('风格设置', 'style', `
          ${rowColor('背景', 'bgColor', cfg.bgColor)}
          ${rowColor('标题色', 'titleColor', cfg.titleColor)}
          ${rowColor('链接色', 'linkColor', cfg.linkColor)}
          ${rowNum('每行列数', 'columnsPerRow', cfg.columnsPerRow, 3, 8)}
        `, true)}`;
      break;

    case 'floorNav':
      html = `
        ${tip('每个锚点关联一个楼层，点击后在预览中定位到对应区块。')}
        ${sec('锚点列表', 'content', floorNavEditor(cfg.items))}
        ${sec('显示设置', 'content', `
          ${rowNum('默认选中项', 'activeIndex', cfg.activeIndex, 0, 10)}
          ${rowBool('是否展示「回顶部」', 'showTop', cfg.showTop)}
          ${rowText('回顶部文案', 'topText', cfg.topText)}
        `)}`;
      break;

    case 'sideToolbar':
      html = `
        ${tip('配置右侧快捷入口的图标、名称与跳转页面；图标支持本地上传或素材库。')}
        ${sec('工具条项目', 'content', toolbarEditor(cfg.items))}
        ${sec('购物车角标', 'content', `
          ${rowNum('角标数量', 'cartBadgeCount', cfg.cartBadgeCount, 0, 99, '预览用')}
        `)}`;
      break;
  }

  document.getElementById('configBody').innerHTML = html;
  bindConfigInputs();
}

function floorConfigHtml(cfg, id) {
  const layoutLabel = {
    featuredMix: '混合布局（主推+双副推）',
    bannerGrid: '轮播网格布局',
    tallCarousel: '高轮播混排布局',
    posterStack: '单列主推布局',
    poster1x2: '两行海报布局（1+2）'
  }[cfg.layout] || cfg.layout;

  let contentSec = '';
  if (cfg.layout === 'posterStack') {
    contentSec = sec('主推位', 'content', `
      ${featuredImageEditor(cfg.featured)}
      ${rowNestedNum('宽度', 'featured', 'width', cfg.featured?.width ?? 200, 160, 480, 'px')}
      ${rowNestedText('品牌', 'featured', 'brand', cfg.featured?.brand || '')}
      ${rowNestedText('标题', 'featured', 'title', cfg.featured?.title)}
      ${rowNestedRoute('跳转页面', 'featured', 'link', cfg.featured?.link)}
      ${tagListEditor('featured', 'tags', cfg.featured?.tags || [])}
    `);
  } else if (cfg.layout === 'poster1x2') {
    contentSec = sec('左侧海报区', 'content', `
      <div class="cfg-tip">上行 1 张通栏海报，下行 2 张并排（共 3 张）。</div>
      ${rowNum('左侧区域宽度', 'leftWidth', cfg.leftWidth ?? 280, 160, 480, '', 'px')}
      ${posterEditor(cfg.posters, 'poster1x2')}
    `);
  } else {
    contentSec = `
      ${sec('主推位', 'content', `
        ${featuredImageEditor(cfg.featured)}
        ${rowNestedNum('宽度', 'featured', 'width', cfg.featured?.width ?? (cfg.layout === 'tallCarousel' ? 220 : 280), 160, 480, 'px')}
        ${cfg.featured?.brand !== undefined ? rowNestedText('品牌', 'featured', 'brand', cfg.featured.brand) : ''}
        ${rowNestedText('标题', 'featured', 'title', cfg.featured?.title)}
        ${rowNestedRoute('跳转页面', 'featured', 'link', cfg.featured?.link)}
        ${tagListEditor('featured', 'tags', cfg.featured?.tags || [])}
      `)}
      ${sec('副推位', 'content', subCardEditor(cfg.subCards, cfg.layout))}`;
  }

  const cols = cfg.productColumns || 3;
  const rows = cfg.productRows || 2;
  const need = cols * rows;
  const keys = cfg.products || [];

  return `
    ${tip(`分类楼层：当前为「${layoutLabel}」，可切换样式并配置主推位、副推位与商品。`)}
    ${sec('楼层信息', 'content', `
      ${rowText('楼层号', 'floorNum', cfg.floorNum)}
      ${rowText('标题', 'title', cfg.title, true)}
      ${rowSelect('楼层样式', 'layout', cfg.layout, [
        {v:'featuredMix',l:'混合布局（主推+双副推）'},
        {v:'bannerGrid',l:'轮播网格布局'},
        {v:'tallCarousel',l:'高轮播混排布局'},
        {v:'posterStack',l:'单列主推布局'},
        {v:'poster1x2',l:'两行海报布局（1+2）'}
      ])}
      ${rowBool('是否展示「查看全部」', 'showViewAll', cfg.showViewAll)}
      ${rowText('「查看全部」文案', 'viewAllText', cfg.viewAllText)}
      <div class="cfg-row stack">
        <div class="lbl">跳转页面</div>
        <select class="route-select" data-key="viewAllLink" title="选择跳转页面">
          ${pageRouteOptionsHtml(cfg.viewAllLink)}
        </select>
      </div>
    `)}
    ${contentSec}
    ${sec('商品区', 'content', `
      <div class="cfg-tip">商品按列×行展示，共 ${need} 个。</div>
      ${rowNum('列数', 'productColumns', cols, 2, 4)}
      ${rowNum('行数', 'productRows', rows, 1, 3)}
      ${rowBool('是否展示划线价', 'showOriginalPrice', cfg.showOriginalPrice)}
      ${rowBool('是否展示加购按钮', 'showCart', cfg.showCart)}
      <div style="font-size:11px;color:#888;margin:8px 0 4px">展示商品 · 已选 ${keys.length} / ${need}</div>
      <div class="slot-product-thumbs">
        ${keys.slice(0, need).map(function (k, pi) {
          const key = typeof k === 'string' ? k : (k && k.key);
          const p = PRODUCT_POOL.find(function (x) { return x.key === key; });
          if (!p) return '';
          return '<div class="slot-product-thumb" title="' + esc(p.name) + '">' +
            '<img src="' + esc(imgOf(p.key)) + '" alt="">' +
            '<button type="button" class="thumb-del" onclick="removeFloorProduct(' + pi + ')" title="移除">✕</button>' +
          '</div>';
        }).join('')}
        ${keys.length < need ? '<button type="button" class="slot-product-add" onclick="openFloorProductPicker()">+</button>' : ''}
      </div>
      <button type="button" class="cfg-add-btn" onclick="openFloorProductPicker()">选择商品</button>
    `)}
    ${sec('风格设置', 'style', `
      ${rowColor('背景', 'bgColor', cfg.bgColor)}
      ${rowColor('楼层号色', 'floorNumColor', cfg.floorNumColor)}
      ${rowColor('标题色', 'titleColor', cfg.titleColor)}
    `, true)}`;
}

function rowNestedText(label, parent, field, val, full) {
  return `<div class="cfg-row${full?' stack':''}">${lbl(label)}
    <input type="text" value="${esc(val||'')}" data-key="${parent}" data-field="${field}">
  </div>`;
}
function rowNestedNum(label, parent, field, val, min, max, unit) {
  return `<div class="cfg-row">${lbl(label)}
    <span style="display:flex;align-items:center;gap:4px">
      <input type="number" value="${val}" min="${min}" max="${max}" data-key="${parent}" data-field="${field}">
      ${unit ? `<span class="unit">${unit}</span>` : ''}
    </span>
  </div>`;
}
function rowNestedRoute(label, parent, field, val) {
  return `<div class="cfg-row stack">
    <div class="lbl">${esc(label)}<span class="hint">选择跳转页面</span></div>
    <select class="route-select" data-key="${parent}" data-field="${field}" title="选择跳转页面">
      ${pageRouteOptionsHtml(val)}
    </select>
  </div>`;
}

function featuredImageEditor(featured) {
  const f = featured || {};
  const src = featuredImgSrc(f, 'pen');
  const srcLabel = f.img ? '本地上传' : (f.imgKey ? '素材库' : '默认图片');
  return `<div style="font-size:11px;color:#888;margin-bottom:6px">主推位图片</div>
    <div class="promo-img-row" style="margin-bottom:8px">
      <div class="promo-img-thumb banner-thumb" title="${esc(srcLabel)}"><img src="${esc(src)}" alt=""></div>
      <div class="promo-img-actions">
        <label class="promo-img-btn">
          本地上传
          <input type="file" accept="image/*" hidden onchange="uploadNestedImage('featured','img','imgKey',this)">
        </label>
        <button type="button" class="promo-img-btn" onclick="openNestedMaterialLibrary('featured','img','imgKey')">素材库</button>
        ${(f.img || f.imgKey) ? `<button type="button" class="promo-img-btn ghost" onclick="clearNestedImage('featured','img','imgKey')">清除</button>` : ''}
      </div>
    </div>`;
}

function tagListEditor(parent, field, arr) {
  return `<div style="margin-top:6px;font-size:11px;color:#888;margin-bottom:4px">标签</div>
    ${(arr||[]).map((t,i)=>`
      <div class="cfg-list-item">
        <span class="idx">${i+1}.</span>
        <input type="text" value="${esc(t)}" data-key="${parent}" data-field="${field}" data-idx="${i}">
        <button class="btn-del" onclick="removeNestedListItem('${parent}','${field}',${i})">✕</button>
      </div>`).join('')}
    <button class="cfg-add-btn" onclick="addNestedListItem('${parent}','${field}','新标签')">+ 添加标签</button>`;
}

function noticeBadgeEditor(cfg) {
  const src = noticeBadgeSrc(cfg);
  const srcLabel = cfg.badgeImg ? '本地上传' : (cfg.badgeImgKey ? '素材库' : '未上传图片（显示文字徽标）');
  return `<div style="font-size:11px;color:#888;margin-bottom:6px">徽标图片（有图优先显示图片，否则显示文字）</div>
    <div class="promo-img-row" style="margin-bottom:8px">
      <div class="promo-img-thumb badge-thumb" title="${esc(srcLabel)}">
        ${src ? `<img src="${esc(src)}" alt="">` : `<span class="badge-thumb-ph" style="background:${esc(cfg.badgeColor || '#e1251b')}">${esc(cfg.badgeText || '公告')}</span>`}
      </div>
      <div class="promo-img-actions">
        <label class="promo-img-btn">
          本地上传
          <input type="file" accept="image/*" hidden onchange="uploadConfigImage('badgeImg','badgeImgKey',this)">
        </label>
        <button type="button" class="promo-img-btn" onclick="openConfigMaterialLibrary('badgeImg','badgeImgKey')">素材库</button>
        ${src ? `<button type="button" class="promo-img-btn ghost" onclick="clearConfigImage('badgeImg','badgeImgKey')">清除</button>` : ''}
      </div>
    </div>`;
}

function bannerEditor(banners) {
  // 若配置缺失则写入默认帧，保证上传/删除操作落到真实 config 上
  if ((!banners || !banners.length) && selectedId) {
    const comp = components.find(c => c.id === selectedId);
    if (comp && comp.config) {
      comp.config.banners = defaultBannerSlides();
      banners = comp.config.banners;
    }
  }
  const list = banners && banners.length ? banners : defaultBannerSlides();
  return `${list.map((b, i) => {
    const src = bannerThumbSrc(b, i);
    const srcLabel = b.img ? '本地上传' : (b.imgKey ? '素材库' : '默认轮播图');
    return `
    <div class="cfg-list-item card-item">
      <span class="card-label"><span>轮播 ${i + 1}</span><button class="btn-del" onclick="removeListItem('banners',${i})">✕</button></span>
      <div class="promo-img-row">
        <div class="promo-img-thumb banner-thumb" title="${esc(srcLabel)}">
          <img src="${esc(src)}" alt="">
        </div>
        <div class="promo-img-actions">
          <label class="promo-img-btn">
            本地上传
            <input type="file" accept="image/*" hidden onchange="uploadPromoLocal('banners',${i},this)">
          </label>
          <button type="button" class="promo-img-btn" onclick="openMaterialLibrary('banners',${i})">素材库</button>
          ${(b.img || b.imgKey) ? `<button type="button" class="promo-img-btn ghost" onclick="clearPromoImage('banners',${i})">清除</button>` : ''}
        </div>
      </div>
      <select class="route-select" data-list-key="banners" data-idx="${i}" data-field="link" title="选择跳转页面">
        ${pageRouteOptionsHtml(b.link)}
      </select>
    </div>`;
  }).join('')}
    <button class="cfg-add-btn" onclick="addBannerSlide()">+ 添加轮播图</button>`;
}

function promoEditor(promos) {
  return `${(promos||[]).map((p,i)=>{
    const src = promoImgSrc(p, i);
    const srcLabel = p.img ? '本地上传' : (p.imgKey ? '素材库' : '默认图片');
    return `
    <div class="cfg-list-item card-item">
      <span class="card-label"><span>促销卡 ${i+1}</span><button class="btn-del" onclick="removeListItem('promos',${i})">✕</button></span>
      <div class="promo-img-row">
        <div class="promo-img-thumb" title="${esc(srcLabel)}">
          <img src="${esc(src)}" alt="">
        </div>
        <div class="promo-img-actions">
          <label class="promo-img-btn">
            本地上传
            <input type="file" accept="image/*" hidden onchange="uploadPromoLocal('promos',${i},this)">
          </label>
          <button type="button" class="promo-img-btn" onclick="openMaterialLibrary('promos',${i})">素材库</button>
          ${(p.img || p.imgKey) ? `<button type="button" class="promo-img-btn ghost" onclick="clearPromoImage('promos',${i})">清除</button>` : ''}
        </div>
      </div>
      <input type="text" value="${esc(p.title)}" placeholder="标题" data-list-key="promos" data-idx="${i}" data-field="title">
      <input type="text" value="${esc(p.desc)}" placeholder="描述" data-list-key="promos" data-idx="${i}" data-field="desc">
      <input type="text" value="${esc(p.tag)}" placeholder="标签" data-list-key="promos" data-idx="${i}" data-field="tag" style="flex:0 0 48px">
      <input type="color" value="${p.tagColor}" data-list-key="promos" data-idx="${i}" data-field="tagColor">
      <select class="route-select" data-list-key="promos" data-idx="${i}" data-field="link" title="选择跳转页面">
        ${pageRouteOptionsHtml(p.link)}
      </select>
    </div>`;
  }).join('')}
    <button class="cfg-add-btn" onclick="addListItem('promos',{title:'新卡片',desc:'描述',tag:'标签',tagColor:'#e1251b',link:'#',imgKey:'bags'})">+ 添加促销卡</button>`;
}
function cardEditor(cards) {
  return `${(cards||[]).map((cd,i)=>{
    const src = welfareCardImgSrc(cd, i);
    const srcLabel = cd.img ? '本地上传' : (cd.imgKey ? '素材库' : '默认图片');
    return `
    <div class="cfg-list-item card-item">
      <span class="card-label"><span>卡片 ${i+1}</span><button class="btn-del" onclick="removeListItem('cards',${i})">✕</button></span>
      <div class="promo-img-row">
        <div class="promo-img-thumb" title="${esc(srcLabel)}"><img src="${esc(src)}" alt=""></div>
        <div class="promo-img-actions">
          <label class="promo-img-btn">
            本地上传
            <input type="file" accept="image/*" hidden onchange="uploadPromoLocal('cards',${i},this)">
          </label>
          <button type="button" class="promo-img-btn" onclick="openMaterialLibrary('cards',${i})">素材库</button>
          ${(cd.img || cd.imgKey) ? `<button type="button" class="promo-img-btn ghost" onclick="clearPromoImage('cards',${i})">清除</button>` : ''}
        </div>
      </div>
      <input type="text" value="${esc(cd.title)}" placeholder="标题" data-list-key="cards" data-idx="${i}" data-field="title">
      <input type="text" value="${esc(cd.desc)}" placeholder="描述" data-list-key="cards" data-idx="${i}" data-field="desc">
      <select class="route-select" data-list-key="cards" data-idx="${i}" data-field="link" title="选择跳转页面">
        ${pageRouteOptionsHtml(cd.link)}
      </select>
    </div>`;
  }).join('')}
    <button class="cfg-add-btn" onclick="addListItem('cards',{title:'新卡片',desc:'描述',link:'#',imgKey:'p45'})">+ 添加卡片</button>`;
}
function categoryEditor(cats) {
  return `${(cats||[]).map((c,i)=>{
    const name = typeof c==='string'?c:c.name;
    const sub = typeof c==='string'?'':(c.sub||'');
    const iconKey = typeof c==='string'?'':(c.iconKey||'');
    return `<div class="cfg-list-item card-item">
      <span class="card-label"><span>分类 ${i+1}</span><button class="btn-del" onclick="removeListItem('categories',${i})">✕</button></span>
      <input type="text" value="${esc(iconKey)}" placeholder="iconKey" data-list-key="categories" data-idx="${i}" data-field="iconKey" style="flex:0 0 64px">
      <input type="text" value="${esc(name)}" placeholder="主类" data-list-key="categories" data-idx="${i}" data-field="name" style="flex:0 0 72px">
      <input type="text" value="${esc(sub)}" placeholder="副类" data-list-key="categories" data-idx="${i}" data-field="sub">
    </div>`;
  }).join('')}
  <button class="cfg-add-btn" onclick="addListItem('categories',{iconKey:'digital',name:'新分类',sub:''})">+ 添加分类</button>`;
}
function assetEditor(assets) {
  return `<div style="margin-top:8px;font-size:11px;color:#888;margin-bottom:4px">资产入口仅配置名称；数量来自系统，此处控制是否展示</div>
    ${(assets||[]).map((a,i)=>`
    <div class="cfg-list-item card-item asset-item">
      <span class="card-label"><span>资产 ${i+1}</span><button class="btn-del" onclick="removeListItem('assets',${i})">✕</button></span>
      <input type="text" value="${esc(a.label)}" placeholder="名称" data-list-key="assets" data-idx="${i}" data-field="label">
      <div class="cfg-row" style="width:100%;border:none;padding:2px 0 0">
        <div class="lbl">是否展示数量</div>
        <label class="sw-toggle">
          <input type="checkbox" data-list-key="assets" data-idx="${i}" data-field="showValue" ${a.showValue !== false ? 'checked' : ''}>
          <span class="sw"></span>
        </label>
      </div>
    </div>`).join('')}
    <div class="asset-add-row">
      <button type="button" class="cfg-add-btn slim" onclick="addListItem('assets',{label:'优惠券',showValue:true})">+ 优惠券</button>
      <button type="button" class="cfg-add-btn slim" onclick="addListItem('assets',{label:'苏银豆',showValue:true})">+ 苏银豆</button>
      <button type="button" class="cfg-add-btn slim" onclick="addListItem('assets',{label:'卡券',showValue:true})">+ 卡券</button>
      <button type="button" class="cfg-add-btn slim" onclick="addListItem('assets',{label:'电影券',showValue:true})">+ 电影券</button>
    </div>`;
}
function serviceEditor(services) {
  return `${(services||[]).map((s,i)=>`
    <div class="cfg-list-item card-item">
      <span class="card-label"><span>入口 ${i+1}</span><button class="btn-del" onclick="removeListItem('services',${i})">✕</button></span>
      <input type="text" value="${esc(s.name)}" placeholder="名称" data-list-key="services" data-idx="${i}" data-field="name">
      <select class="route-select" data-list-key="services" data-idx="${i}" data-field="link" title="选择跳转页面">
        ${pageRouteOptionsHtml(s.link)}
      </select>
    </div>`).join('')}
    <button class="cfg-add-btn" onclick="addListItem('services',{name:'入口',link:'#'})">+ 添加入口</button>`;
}
function opsSlotEditor(slots) {
  return (slots||[]).map((slot, si) => {
    let body = `
      <div class="cfg-row">${lbl('类型')}
        <select data-key="slots" data-idx="${si}" data-field="type">
          <option value="rankList" ${slot.type==='rankList'?'selected':''}>热销榜</option>
          <option value="brandZone" ${slot.type==='brandZone'?'selected':''}>品牌专区</option>
          <option value="productGrid" ${slot.type==='productGrid'?'selected':''}>商品宫格</option>
        </select>
      </div>
      <div class="cfg-row">${lbl('标题')}<input type="text" value="${esc(slot.title)}" data-key="slots" data-idx="${si}" data-field="title"></div>
      <div class="cfg-row">${lbl('更多文案')}<input type="text" value="${esc(slot.moreText||'')}" data-key="slots" data-idx="${si}" data-field="moreText"></div>
      <div class="cfg-row stack">
        <div class="lbl">跳转页面</div>
        <select class="route-select" data-key="slots" data-idx="${si}" data-field="moreLink" title="选择跳转页面">
          ${pageRouteOptionsHtml(slot.moreLink)}
        </select>
      </div>`;
    if (slot.type === 'rankList') {
      body += `
        <div class="cfg-row">${lbl('展示条数')}<input type="number" value="${slot.itemCount||9}" min="3" max="15" data-key="slots" data-idx="${si}" data-field="itemCount"></div>
        <div class="cfg-row">${lbl('前三名高亮')}<label class="sw-toggle"><input type="checkbox" data-key="slots" data-idx="${si}" data-field="showRankBadge" ${slot.showRankBadge?'checked':''}><span class="sw"></span></label></div>`;
    } else if (slot.type === 'brandZone') {
      body += `<div style="font-size:11px;color:#888;margin:6px 0 4px">品牌卡片，可上传图片并设置高度</div>
        ${(slot.brands||[]).map((b,bi)=>{
          const src = brandImgSrc(b, bi);
          const srcLabel = b.img ? '本地上传' : (b.imgKey ? '素材库' : '默认图片');
          return `
          <div class="cfg-list-item card-item">
            <span class="card-label"><span>品牌 ${bi+1}</span>
              <button class="btn-del" onclick="removeSlotBrand(${si},${bi})">✕</button></span>
            <div class="promo-img-row">
              <div class="promo-img-thumb" title="${esc(srcLabel)}"><img src="${esc(src)}" alt=""></div>
              <div class="promo-img-actions">
                <label class="promo-img-btn">
                  本地上传
                  <input type="file" accept="image/*" hidden onchange="uploadSlotBrandLocal(${si},${bi},this)">
                </label>
                <button type="button" class="promo-img-btn" onclick="openSlotBrandMaterialLibrary(${si},${bi})">素材库</button>
                ${(b.img || b.imgKey) ? `<button type="button" class="promo-img-btn ghost" onclick="clearSlotBrandImage(${si},${bi})">清除</button>` : ''}
              </div>
            </div>
            <input type="text" value="${esc(b.name)}" placeholder="名称" data-key="slots" data-idx="${si}" data-field="brands" data-li="${bi}" data-subfield="name">
            <input type="text" value="${esc(b.sub)}" placeholder="副文案" data-key="slots" data-idx="${si}" data-field="brands" data-li="${bi}" data-subfield="sub">
            <select class="route-select" data-key="slots" data-idx="${si}" data-field="brands" data-li="${bi}" data-subfield="link" title="选择跳转页面">
              ${pageRouteOptionsHtml(b.link)}
            </select>
            <div class="cfg-row" style="width:100%;border:none;padding:2px 0 0">
              <div class="lbl">高度</div>
              <span style="display:flex;align-items:center;gap:4px">
                <input type="number" value="${brandSlotHeight(b)}" min="32" max="200" data-key="slots" data-idx="${si}" data-field="brands" data-li="${bi}" data-subfield="height">
                <span class="unit">px</span>
              </span>
            </div>
          </div>`;
        }).join('')}
        <button class="cfg-add-btn" onclick="addSlotBrand(${si})">+ 添加品牌</button>`;
    } else {
      const cols = slot.columns || 2;
      const rows = slot.rows || 2;
      const need = cols * rows;
      const keys = slot.products || [];
      body += `
        <div class="cfg-tip" style="margin-top:6px">按列×行展示商品，共 ${need} 个。</div>
        <div class="cfg-row">${lbl('列数')}<input type="number" value="${cols}" min="1" max="3" data-key="slots" data-idx="${si}" data-field="columns"></div>
        <div class="cfg-row">${lbl('行数')}<input type="number" value="${rows}" min="1" max="3" data-key="slots" data-idx="${si}" data-field="rows"></div>
        <div class="cfg-row">${lbl('是否展示加购按钮')}<label class="sw-toggle"><input type="checkbox" data-key="slots" data-idx="${si}" data-field="showCart" ${slot.showCart?'checked':''}><span class="sw"></span></label></div>
        <div style="font-size:11px;color:#888;margin:8px 0 4px">展示商品 · 已选 ${keys.length} / ${need}</div>
        <div class="slot-product-thumbs">
          ${keys.slice(0, need).map(function (k, pi) {
            const key = typeof k === 'string' ? k : (k && k.key);
            const p = PRODUCT_POOL.find(function (x) { return x.key === key; });
            if (!p) return '';
            return '<div class="slot-product-thumb" title="' + esc(p.name) + '">' +
              '<img src="' + esc(imgOf(p.key)) + '" alt="">' +
              '<button type="button" class="thumb-del" onclick="removeSlotProduct(' + si + ',' + pi + ')" title="移除">✕</button>' +
            '</div>';
          }).join('')}
          ${keys.length < need ? '<button type="button" class="slot-product-add" onclick="openProductPicker(' + si + ')">+</button>' : ''}
        </div>
        <button type="button" class="cfg-add-btn" onclick="openProductPicker(${si})">选择商品</button>`;
    }
    return `<div class="sub-card"><div class="sub-hd"><span>运营位 ${si+1}</span></div>${body}</div>`;
  }).join('');
}
function subCardEditor(cards, layout) {
  const fallbacks = ['sneaker', 'skincare', 'watch', 'shirt', 'bags', 'headphone', 'chair', 'pen'];
  return `${(cards||[]).map((s,i)=>{
    const fb = fallbacks[i % fallbacks.length];
    const src = floorSideImgSrc(s, fb);
    const srcLabel = s.img ? '本地上传' : (s.imgKey ? '素材库' : '默认图片');
    return `
    <div class="cfg-list-item card-item">
      <span class="card-label"><span>副推位 ${i+1}</span><button class="btn-del" onclick="removeListItem('subCards',${i})">✕</button></span>
      <div class="promo-img-row">
        <div class="promo-img-thumb" title="${esc(srcLabel)}"><img src="${esc(src)}" alt=""></div>
        <div class="promo-img-actions">
          <label class="promo-img-btn">
            本地上传
            <input type="file" accept="image/*" hidden onchange="uploadPromoLocal('subCards',${i},this)">
          </label>
          <button type="button" class="promo-img-btn" onclick="openMaterialLibrary('subCards',${i})">素材库</button>
          ${(s.img || s.imgKey) ? `<button type="button" class="promo-img-btn ghost" onclick="clearPromoImage('subCards',${i})">清除</button>` : ''}
        </div>
      </div>
      ${s.brand!==undefined?`<input type="text" value="${esc(s.brand||'')}" placeholder="品牌" data-list-key="subCards" data-idx="${i}" data-field="brand" style="flex:0 0 64px">`:''}
      <input type="text" value="${esc(s.title||'')}" placeholder="标题" data-list-key="subCards" data-idx="${i}" data-field="title">
      <input type="text" value="${esc(s.subtitle||'')}" placeholder="副标题" data-list-key="subCards" data-idx="${i}" data-field="subtitle">
      <select class="route-select" data-list-key="subCards" data-idx="${i}" data-field="link" title="选择跳转页面">
        ${pageRouteOptionsHtml(s.link)}
      </select>
    </div>`;
  }).join('')}
    <button class="cfg-add-btn" onclick="addListItem('subCards',{title:'新副推位',subtitle:'',link:'#',imgKey:'sneaker'})">+ 添加副推位</button>`;
}
function posterEditor(posters, layout) {
  const fallbacks = ['watch', 'headphone', 'camera', 'pen'];
  const roleLabels = layout === 'poster1x2'
    ? ['上行通栏', '下行左', '下行右']
    : null;
  return `${(posters||[]).map((p,i)=>{
    const fb = fallbacks[i % fallbacks.length];
    const src = floorSideImgSrc(p, fb);
    const srcLabel = p.img ? '本地上传' : (p.imgKey ? '素材库' : '默认图片');
    const role = roleLabels && roleLabels[i] ? ' · ' + roleLabels[i] : '';
    return `
    <div class="cfg-list-item card-item">
      <span class="card-label"><span>海报 ${i+1}${role}</span><button class="btn-del" onclick="removeListItem('posters',${i})">✕</button></span>
      <div class="promo-img-row">
        <div class="promo-img-thumb" title="${esc(srcLabel)}"><img src="${esc(src)}" alt=""></div>
        <div class="promo-img-actions">
          <label class="promo-img-btn">
            本地上传
            <input type="file" accept="image/*" hidden onchange="uploadPromoLocal('posters',${i},this)">
          </label>
          <button type="button" class="promo-img-btn" onclick="openMaterialLibrary('posters',${i})">素材库</button>
          ${(p.img || p.imgKey) ? `<button type="button" class="promo-img-btn ghost" onclick="clearPromoImage('posters',${i})">清除</button>` : ''}
        </div>
      </div>
      <input type="text" value="${esc(p.brand||'')}" placeholder="品牌" data-list-key="posters" data-idx="${i}" data-field="brand" style="flex:0 0 56px">
      <input type="text" value="${esc(p.title||'')}" placeholder="标题" data-list-key="posters" data-idx="${i}" data-field="title">
      <input type="text" value="${esc(p.subtitle||'')}" placeholder="副标题" data-list-key="posters" data-idx="${i}" data-field="subtitle">
      <select class="route-select" data-list-key="posters" data-idx="${i}" data-field="link" title="选择跳转页面">
        ${pageRouteOptionsHtml(p.link)}
      </select>
    </div>`;
  }).join('')}
    <button class="cfg-add-btn" onclick="addListItem('posters',{brand:'品牌',title:'标题',subtitle:'副标题',link:'#',imgKey:'watch'})">+ 添加海报</button>`;
}
function footerColEditor(columns) {
  return (columns||[]).map((col,ci)=>`
    <div class="sub-card">
      <div class="sub-hd"><span>栏目 ${ci+1}</span><button class="btn-del" onclick="removeListItem('columns',${ci})">✕</button></div>
      <div class="cfg-row">${lbl('标题')}<input type="text" value="${esc(col.title)}" data-key="columns" data-idx="${ci}" data-field="title"></div>
      ${(col.links||[]).map((l,li)=>`
        <div class="cfg-list-item card-item">
          <span class="idx">${li+1}.</span>
          <input type="text" value="${esc(l.text)}" placeholder="文字" data-key="columns" data-idx="${ci}" data-field="links" data-li="${li}" data-subfield="text" style="flex:0 0 72px">
          <select class="route-select" data-key="columns" data-idx="${ci}" data-field="links" data-li="${li}" data-subfield="url" title="选择跳转页面">
            ${pageRouteOptionsHtml(l.url)}
          </select>
          <button class="btn-del" onclick="removeLinkItem('columns',${ci},${li})">✕</button>
        </div>`).join('')}
      <button class="cfg-add-btn" onclick="addLinkItem('columns',${ci})">+ 链接</button>
    </div>`).join('') +
    `<button class="cfg-add-btn" onclick="addListItem('columns',{title:'新栏目',links:[{text:'链接',url:'#'}]})">+ 添加栏目</button>`;
}
function legalEditor(links) {
  return `<div style="margin-top:8px;font-size:11px;color:#888;margin-bottom:4px">协议链接</div>
    ${(links||[]).map((l,i)=>`
    <div class="cfg-list-item">
      <span class="idx">${i+1}.</span>
      <input type="text" value="${esc(l.text)}" data-list-key="legalLinks" data-idx="${i}" data-field="text" style="flex:0 0 80px">
      <input type="text" value="${esc(l.url||'')}" data-list-key="legalLinks" data-idx="${i}" data-field="url">
      <button class="btn-del" onclick="removeListItem('legalLinks',${i})">✕</button>
    </div>`).join('')}
    <button class="cfg-add-btn" onclick="addListItem('legalLinks',{text:'协议',url:'/#'})">+ 添加协议</button>`;
}
function floorNavEditor(items) {
  const list = items || [];
  return `${list.map((it,i)=>`
    <div class="cfg-list-item card-item">
      <span class="card-label">
        <span>锚点 ${i+1}</span>
        <span class="card-label-actions">
          <button type="button" class="btn-move" onclick="moveListItem('items',${i},-1)" ${i===0?'disabled':''} title="上移">↑</button>
          <button type="button" class="btn-move" onclick="moveListItem('items',${i},1)" ${i===list.length-1?'disabled':''} title="下移">↓</button>
          <button class="btn-del" onclick="removeListItem('items',${i})">✕</button>
        </span>
      </span>
      <input type="text" value="${esc(it.floor)}" placeholder="楼层号" data-list-key="items" data-idx="${i}" data-field="floor" style="flex:0 0 40px">
      <input type="text" value="${esc(it.label)}" placeholder="名称" data-list-key="items" data-idx="${i}" data-field="label" style="flex:0 0 72px">
      <select class="route-select" data-list-key="items" data-idx="${i}" data-field="targetId" title="关联楼层">
        ${componentTargetOptionsHtml(it.targetId)}
      </select>
    </div>`).join('')}
    <button class="cfg-add-btn" onclick="addListItem('items',{floor:'NF',label:'新楼层',targetId:''})">+ 添加锚点</button>`;
}
function toolbarEditor(items) {
  const list = items || [];
  return `${list.map((it,i)=>{
    const src = toolbarIconThumbSrc(it);
    const srcLabel = it.img ? '本地上传' : (it.imgKey ? '素材库' : (it.iconKey || it.icon ? '系统图标' : '未设置'));
    return `
    <div class="cfg-list-item card-item">
      <span class="card-label">
        <span>工具 ${i+1}${it.isTop ? ' · 回顶部' : ''}</span>
        <span class="card-label-actions">
          <button type="button" class="btn-move" onclick="moveListItem('items',${i},-1)" ${i===0?'disabled':''} title="上移">↑</button>
          <button type="button" class="btn-move" onclick="moveListItem('items',${i},1)" ${i===list.length-1?'disabled':''} title="下移">↓</button>
          <button class="btn-del" onclick="removeListItem('items',${i})">✕</button>
        </span>
      </span>
      <div class="promo-img-row">
        <div class="promo-img-thumb" title="${esc(srcLabel)}">
          ${src
            ? `<img src="${esc(src)}" alt="">`
            : dockItemIconHtml(it)}
        </div>
        <div class="promo-img-actions">
          <label class="promo-img-btn">
            本地上传
            <input type="file" accept="image/*" hidden onchange="uploadPromoLocal('items',${i},this)">
          </label>
          <button type="button" class="promo-img-btn" onclick="openMaterialLibrary('items',${i})">素材库</button>
          ${(it.img || it.imgKey) ? `<button type="button" class="promo-img-btn ghost" onclick="clearPromoImage('items',${i})">清除</button>` : ''}
        </div>
      </div>
      <input type="text" value="${esc(it.label)}" placeholder="名称" data-list-key="items" data-idx="${i}" data-field="label" style="flex:0 0 64px">
      <select class="route-select" data-list-key="items" data-idx="${i}" data-field="link" title="选择跳转页面">
        ${toolbarLinkOptionsHtml(it.link)}
      </select>
      ${it.showBadge !== undefined ? `
      <div class="cfg-row" style="width:100%;border:none;padding:2px 0 0">
        <div class="lbl">是否展示角标</div>
        <label class="sw-toggle">
          <input type="checkbox" data-list-key="items" data-idx="${i}" data-field="showBadge" ${it.showBadge ? 'checked' : ''}>
          <span class="sw"></span>
        </label>
      </div>` : ''}
    </div>`;
  }).join('')}
    <button class="cfg-add-btn" onclick="addListItem('items',{label:'入口',link:'#',iconKey:'grid'})">+ 添加入口</button>`;
}
