// ==================== 左侧：页面 / 内置组件 ====================

/** 活动页跟随标准首页、不可单独改动的壳层组件 */
const SHARED_SHELL_IDS = ['topbar', 'header', 'footer', 'sideToolbar'];

function getCurrentPageDef() {
  return (BUILDER_PAGES || []).find(function (p) { return p.id === currentPageId; }) || BUILDER_PAGES[0];
}

function getMainPageId() {
  const main = (BUILDER_PAGES || []).find(function (p) { return p.pageType === 'main'; });
  return main ? main.id : 'home';
}

function isSubPageEditing() {
  const page = getCurrentPageDef();
  return !!(page && page.pageType === 'sub');
}

function isLockedShellComp(id) {
  return isSubPageEditing() && SHARED_SHELL_IDS.indexOf(id) >= 0;
}

function getMainComponentsList() {
  const mainId = getMainPageId();
  if (currentPageId === mainId) return components || [];
  return pageStore[mainId] || [];
}

function getMainShellComp(id) {
  return getMainComponentsList().find(function (c) { return c.id === id; }) || null;
}

/** 活动页壳层：展示与开关跟随标准首页；搜索头保持白底无促销卡 */
function resolveCompForDisplay(localComp) {
  if (!localComp || !isLockedShellComp(localComp.id)) return localComp;
  const mainComp = getMainShellComp(localComp.id);
  if (!mainComp) return localComp;
  const resolved = Object.assign({}, localComp, {
    on: mainComp.on,
    name: mainComp.name,
    type: mainComp.type,
    desc: mainComp.desc,
    config: JSON.parse(JSON.stringify(mainComp.config || {}))
  });
  if (resolved.id === 'header' && resolved.config) {
    resolved.config.variant = 'plain';
    resolved.config.promos = [];
    resolved.config.gradientFrom = '#ffffff';
    resolved.config.gradientTo = '#ffffff';
  }
  return resolved;
}

function getRenderComponents() {
  return (components || []).map(function (c) { return resolveCompForDisplay(c); });
}

function goEditShellOnHome(compId) {
  const mainId = getMainPageId();
  selectEditablePage(mainId);
  if (compId) selectComponent(compId);
}

function persistCurrentPage() {
  if (!currentPageId) return;
  pageStore[currentPageId] = cloneComponents(components);
  themeStore[currentPageId] = cloneTheme(pageTheme);
}

function updatePageChrome() {
  const page = getCurrentPageDef();
  const nameEl = document.querySelector('.app-page-name');
  const tagEl = document.querySelector('.app-page-tag');
  const previewTitle = document.querySelector('.preview-title-wrap strong');
  const previewBtn = document.getElementById('previewPageBtn');
  if (nameEl) nameEl.textContent = page.name;
  if (tagEl) {
    tagEl.textContent = page.tag;
    tagEl.className = 'app-page-tag' + (page.pageType === 'sub' ? ' is-sub' : '');
  }
  if (previewTitle) previewTitle.textContent = page.name;
  if (previewBtn && page.route) {
    previewBtn.setAttribute('onclick', "window.open('./" + page.route + "','_blank')");
  }
}

function selectEditablePage(id) {
  const page = (BUILDER_PAGES || []).find(function (p) { return p.id === id; });
  if (!page || !page.editable) return;
  if (id !== currentPageId) {
    persistCurrentPage();
    currentPageId = id;
    if (!pageStore[id]) {
      pageStore[id] = cloneComponents(getDefaultComponentsByKey(page.templateKey));
    }
    if (!themeStore[id]) {
      themeStore[id] = getDefaultTheme();
    }
    components = pageStore[id];
    pageTheme = themeStore[id];
    selectedId = null;
    configMode = 'comp';
  }
  updatePageChrome();
  renderPreview();
  buildCompList();
  renderConfigPanel(null);
  renderNavPanel();
  markAutoSaved();
}

function addActivitySubPage() {
  const n = BUILDER_PAGES.filter(function (p) { return p.pageType === 'sub' && p.editable; }).length + 1;
  const id = 'activity-' + Date.now();
  const page = {
    id: id,
    name: '新页面 ' + n,
    tag: '活动',
    pageType: 'sub',
    editable: true,
    route: '02.活动页-原型页面.html',
    desc: '自定义活动专题页，组件与活动页模板一致',
    templateKey: 'activity'
  };
  BUILDER_PAGES.push(page);
  pageStore[id] = cloneComponents(defaultActivityComponents);
  themeStore[id] = getDefaultTheme();
  selectEditablePage(id);
}

/** 复制页面：配置与主题一并拷贝，插到源页面下方（副本始终为可编辑子页面） */
function duplicateActivitySubPage(sourceId) {
  closePageMoreMenu();
  const src = (BUILDER_PAGES || []).find(function (p) {
    return p.id === sourceId && p.editable;
  });
  if (!src || src.pageType === 'main') return;
  const id = 'activity-' + Date.now();
  const page = {
    id: id,
    name: (src.name || '页面') + ' 副本',
    tag: src.tag || '活动',
    pageType: 'sub',
    editable: true,
    route: src.route || '02.活动页-原型页面.html',
    desc: src.desc || '',
    templateKey: src.templateKey || (src.pageType === 'main' ? 'home' : 'activity')
  };
  const srcIdx = BUILDER_PAGES.findIndex(function (p) { return p.id === sourceId; });
  if (srcIdx >= 0) BUILDER_PAGES.splice(srcIdx + 1, 0, page);
  else BUILDER_PAGES.push(page);

  persistCurrentPage();
  const srcComps = pageStore[sourceId] || getDefaultComponentsByKey(page.templateKey);
  const srcTheme = themeStore[sourceId] || getDefaultTheme();
  pageStore[id] = cloneComponents(srcComps);
  themeStore[id] = cloneTheme(srcTheme);
  selectEditablePage(id);
}

const PAGE_DOC_ICON =
  '<svg class="nav-item-ico" viewBox="0 0 24 24" aria-hidden="true">' +
  '<path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>' +
  '</svg>';

let pageMoreMenuId = null;

function ensurePageMoreMenu() {
  let menu = document.getElementById('pageMoreMenu');
  if (!menu) {
    menu = document.createElement('div');
    menu.id = 'pageMoreMenu';
    menu.className = 'nav-page-menu';
    document.body.appendChild(menu);
    menu.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-act]');
      if (!btn || !pageMoreMenuId) return;
      e.stopPropagation();
      const act = btn.getAttribute('data-act');
      const id = pageMoreMenuId;
      closePageMoreMenu();
      if (act === 'rename') startRenamePage(id);
      else if (act === 'duplicate') duplicateActivitySubPage(id);
      else if (act === 'delete') deleteBuilderPage(id);
    });
  }
  menu.innerHTML =
    '<button type="button" data-act="rename">重命名</button>' +
    '<button type="button" data-act="duplicate">创建副本</button>' +
    '<button type="button" data-act="delete" class="is-danger">删除</button>';
  return menu;
}

function closePageMoreMenu() {
  pageMoreMenuId = null;
  const menu = document.getElementById('pageMoreMenu');
  if (menu) menu.classList.remove('show');
  document.querySelectorAll('.nav-item-more.is-open').forEach(function (el) {
    el.classList.remove('is-open');
  });
}

function togglePageMoreMenu(e, pageId) {
  e.preventDefault();
  e.stopPropagation();
  closeCompMoreMenu();
  const btn = e.currentTarget;
  const menu = ensurePageMoreMenu();
  if (pageMoreMenuId === pageId && menu.classList.contains('show')) {
    closePageMoreMenu();
    return;
  }
  pageMoreMenuId = pageId;
  document.querySelectorAll('.nav-item-more.is-open').forEach(function (el) {
    el.classList.remove('is-open');
  });
  btn.classList.add('is-open');

  const page = (BUILDER_PAGES || []).find(function (p) { return p.id === pageId; });
  const isMain = !!(page && page.pageType === 'main');
  const dupBtn = menu.querySelector('[data-act="duplicate"]');
  const delBtn = menu.querySelector('[data-act="delete"]');
  // 标准首页（主页面）不展示「创建副本」「删除」
  if (dupBtn) dupBtn.style.display = isMain ? 'none' : '';
  if (delBtn) delBtn.style.display = isMain ? 'none' : '';

  const rect = btn.getBoundingClientRect();
  menu.classList.add('show');
  const mw = menu.offsetWidth || 112;
  let left = rect.right - mw;
  let top = rect.bottom + 4;
  if (left < 8) left = 8;
  if (top + 80 > window.innerHeight) top = rect.top - 80;
  menu.style.left = left + 'px';
  menu.style.top = top + 'px';
}

function startRenamePage(pageId) {
  closePageMoreMenu();
  const page = (BUILDER_PAGES || []).find(function (p) { return p.id === pageId; });
  if (!page || !page.editable) return;
  const item = document.querySelector('.nav-item[data-id="' + pageId + '"]');
  if (!item) return;
  const nameEl = item.querySelector('.nav-item-name');
  if (!nameEl || item.querySelector('.nav-item-name-input')) return;

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'nav-item-name-input';
  input.value = page.name || '';
  input.setAttribute('maxlength', '40');
  nameEl.replaceWith(input);
  input.focus();
  input.select();

  let done = false;
  function finish(save) {
    if (done) return;
    done = true;
    if (save) {
      const next = (input.value || '').trim();
      if (next && next !== page.name) {
        page.name = next;
        if (currentPageId === pageId) updatePageChrome();
        markAutoSaved();
      }
    }
    renderNavPanel();
  }
  input.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      finish(true);
    } else if (ev.key === 'Escape') {
      ev.preventDefault();
      finish(false);
    }
  });
  input.addEventListener('blur', function () { finish(true); });
  input.addEventListener('click', function (ev) { ev.stopPropagation(); });
}

function renderNavPanel() {
  const panel = document.getElementById('navPanel');
  if (!panel) return;
  closePageMoreMenu();
  const mains = (BUILDER_PAGES || []).filter(function (p) { return p.pageType === 'main'; });
  const subs = (BUILDER_PAGES || []).filter(function (p) { return p.pageType === 'sub' && p.editable; });

  function pageRow(p) {
    const on = currentPageId === p.id ? ' on' : '';
    return '<div class="nav-item' + on + '" data-id="' + esc(p.id) + '" onclick="selectEditablePage(\'' + p.id + '\')">' +
      PAGE_DOC_ICON +
      '<span class="nav-item-name" title="' + esc(p.name) + '（双击重命名）" ondblclick="event.stopPropagation();startRenamePage(\'' + p.id + '\')">' + esc(p.name) + '</span>' +
      '<button type="button" class="nav-item-more" title="更多" onclick="togglePageMoreMenu(event,\'' + p.id + '\')">⋮</button>' +
    '</div>';
  }

  panel.innerHTML =
    '<div class="nav-list">' +
      mains.map(pageRow).join('') +
      subs.map(pageRow).join('') +
    '</div>';
}

/** 删除页面（标准首页不可删） */
function deleteBuilderPage(pageId) {
  closePageMoreMenu();
  const page = (BUILDER_PAGES || []).find(function (p) { return p.id === pageId; });
  if (!page || !page.editable || page.pageType === 'main') return;
  const label = page.name || '该页面';
  if (!confirm('确定删除「' + label + '」？删除后不可恢复。')) return;

  const idx = BUILDER_PAGES.findIndex(function (p) { return p.id === pageId; });
  if (idx >= 0) BUILDER_PAGES.splice(idx, 1);
  delete pageStore[pageId];
  delete themeStore[pageId];

  if (currentPageId === pageId) {
    const fallback = (BUILDER_PAGES || []).find(function (p) { return p.id === 'home'; })
      || (BUILDER_PAGES || []).find(function (p) { return p.editable; });
    if (fallback) {
      currentPageId = null;
      selectEditablePage(fallback.id);
      return;
    }
  }
  renderNavPanel();
  markAutoSaved();
}

function selectThemePanel() {
  selectedId = null;
  configMode = 'theme';
  setRightPanelCollapsed(false);
  buildCompList();
  renderThemePanel();
}

function selectComponent(id) {
  selectedId = id;
  configMode = 'comp';
  setRightPanelCollapsed(false);
  buildCompList();
  renderConfigPanel(id);
  renderPreview();
  setTimeout(() => {
    const block = document.querySelector(`.pw-block[data-id="${id}"]`);
    if (block) block.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 80);
}

let rightPanelCollapsed = false;
let leftPanelCollapsed = false;

function setRightPanelCollapsed(collapsed) {
  rightPanelCollapsed = !!collapsed;
  const col = document.getElementById('colRight');
  const btn = document.getElementById('rightCollapseBtn');
  if (col) col.classList.toggle('is-collapsed', rightPanelCollapsed);
  if (btn) {
    btn.textContent = rightPanelCollapsed ? '‹' : '›';
    btn.title = rightPanelCollapsed ? '展开右侧面板' : '收起右侧面板';
  }
  if (typeof syncPreviewStageHeight === 'function') {
    setTimeout(syncPreviewStageHeight, 220);
  }
}

function toggleRightPanel() {
  setRightPanelCollapsed(!rightPanelCollapsed);
}

function onRightRailClick(e) {
  if (!rightPanelCollapsed) return;
  if (e.target.closest('.right-collapse-btn')) return;
  setRightPanelCollapsed(false);
}

function setLeftPanelCollapsed(collapsed) {
  leftPanelCollapsed = !!collapsed;
  const col = document.getElementById('colNav');
  const btn = document.getElementById('leftCollapseBtn');
  if (col) col.classList.toggle('is-collapsed', leftPanelCollapsed);
  if (btn) {
    btn.textContent = leftPanelCollapsed ? '›' : '‹';
    btn.title = leftPanelCollapsed ? '展开左侧面板' : '收起左侧面板';
  }
  if (typeof syncPreviewStageHeight === 'function') {
    setTimeout(syncPreviewStageHeight, 220);
  }
}

function toggleLeftPanel() {
  setLeftPanelCollapsed(!leftPanelCollapsed);
}

function onLeftRailClick(e) {
  if (!leftPanelCollapsed) return;
  if (e.target.closest('.left-collapse-btn')) return;
  setLeftPanelCollapsed(false);
}

const NAV_TOP_H_KEY = 'pc-builder-nav-top-h';
const NAV_TOP_H_DEFAULT = 280;
const NAV_TOP_H_MIN = 140;
const NAV_TOP_H_MAX_RATIO = 0.5;

function clampNavTopHeight(h) {
  const col = document.getElementById('colNav');
  const colH = col && col.clientHeight > 0 ? col.clientHeight : 800;
  // 最多占用左侧栏一半高度
  const maxH = Math.max(80, Math.floor(colH * NAV_TOP_H_MAX_RATIO));
  const minH = Math.min(NAV_TOP_H_MIN, maxH);
  return Math.max(minH, Math.min(maxH, Math.round(h)));
}

function applyNavTopHeight(h, persist) {
  const top = document.getElementById('navTop');
  if (!top) return;
  const next = clampNavTopHeight(h);
  top.style.setProperty('--nav-top-h', next + 'px');
  if (persist) {
    try { localStorage.setItem(NAV_TOP_H_KEY, String(next)); } catch (e) { /* ignore */ }
  }
}

function initNavTopResize() {
  const handle = document.getElementById('navResize');
  const top = document.getElementById('navTop');
  const col = document.getElementById('colNav');
  if (!handle || !top || !col) return;

  let saved = NAV_TOP_H_DEFAULT;
  try {
    const raw = parseInt(localStorage.getItem(NAV_TOP_H_KEY), 10);
    if (!isNaN(raw)) saved = raw;
  } catch (e) { /* ignore */ }
  applyNavTopHeight(saved, false);

  let dragging = false;
  let startY = 0;
  let startH = 0;

  function onMove(e) {
    if (!dragging) return;
    const dy = e.clientY - startY;
    applyNavTopHeight(startH + dy, false);
  }
  function onUp() {
    if (!dragging) return;
    dragging = false;
    col.classList.remove('is-resizing');
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    const h = parseInt(getComputedStyle(top).getPropertyValue('--nav-top-h'), 10) || NAV_TOP_H_DEFAULT;
    applyNavTopHeight(h, true);
  }

  handle.addEventListener('mousedown', function (e) {
    if (leftPanelCollapsed) return;
    e.preventDefault();
    e.stopPropagation();
    dragging = true;
    startY = e.clientY;
    startH = top.getBoundingClientRect().height;
    col.classList.add('is-resizing');
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}

// function renderSubPageCards(subs, query) {
//   const q = (query || '').trim().toLowerCase();
//   const list = !q ? subs : subs.filter(function (p) {
//     return (p.name + p.route).toLowerCase().indexOf(q) !== -1;
//   });
//   if (!list.length) return '<div class="nav-hint">未找到匹配页面</div>';
//   return list.map(function (p) {
//     return '<div class="nav-card" onclick="openSubPage(\'' + esc(p.route) + '\')">' +
//       '<div class="nav-card-hd">' +
//         '<span class="nav-card-title">' + esc(p.name) + '</span>' +
//         '<span class="nav-card-tag sub">预览</span>' +
//       '</div>' +
//       '<div class="nav-card-desc">点击打开原型预览</div>' +
//     '</div>';
//   }).join('');
// }

function filterSubPages(q) {
  const previewOnly = (PROTO_PAGE_ROUTES || []).filter(function (p) {
    if (p.route === '01.首页-原型页面.html') return false;
    return !(BUILDER_PAGES || []).some(function (b) { return b.route === p.route && b.editable; });
  });
  // const box = document.getElementById('navSubList');
  // if (box) box.innerHTML = renderSubPageCards(previewOnly, q);
}

function selectMainPage() {
  selectEditablePage('home');
}

function openSubPage(route) {
  const editable = (BUILDER_PAGES || []).find(function (p) {
    return p.editable && p.route === route;
  });
  if (editable) {
    selectEditablePage(editable.id);
    return;
  }
  if (!route) return;
  window.open('./' + route, '_blank');
}

// ==================== 内置组件列表 ====================
function isFloorSectionComp(c) {
  if (!c) return false;
  if (c.type === 'FloorSection') return true;
  return /^floor\d+$/.test(String(c.id || ''));
}

function nextFloorId() {
  const used = {};
  (components || []).forEach(function (c) { used[c.id] = true; });
  let n = 1;
  while (used['floor' + n]) n += 1;
  return 'floor' + n;
}

/** 复制楼层：插到源组件下方 */
function duplicateComponent(sourceId) {
  closeCompMoreMenu();
  const srcId = sourceId || selectedId;
  const src = (components || []).find(function (c) { return c.id === srcId; });
  if (!src || !isFloorSectionComp(src)) {
    alert('仅支持复制楼层组件');
    return;
  }
  const clone = JSON.parse(JSON.stringify(src));
  clone.id = nextFloorId();
  const floorNum = (src.config && src.config.floorNum) || '';
  const title = (src.config && src.config.title) || src.name || '分类楼层';
  clone.name = ((floorNum ? floorNum + ' ' : '') + title).trim() + ' 副本';
  if (clone.config) {
    if (clone.config.title) clone.config.title = String(clone.config.title) + ' 副本';
  }
  clone.on = src.on !== false;

  const srcIdx = components.findIndex(function (c) { return c.id === srcId; });
  const insertAt = srcIdx >= 0 ? srcIdx + 1 : components.length;
  components.splice(insertAt, 0, clone);
  pageStore[currentPageId] = components;
  markAutoSaved();
  selectComponent(clone.id);
}

function countFloorSections() {
  return (components || []).filter(isFloorSectionComp).length;
}

function deleteComponent(compId) {
  closeCompMoreMenu();
  const comp = (components || []).find(function (c) { return c.id === compId; });
  if (!comp || !isFloorSectionComp(comp)) {
    alert('仅支持删除楼层组件');
    return;
  }
  if (countFloorSections() <= 1) {
    alert('至少保留一个楼层');
    return;
  }
  const label = comp.name || '该楼层';
  if (!confirm('确定删除「' + label + '」？')) return;
  const idx = components.findIndex(function (c) { return c.id === compId; });
  if (idx < 0) return;
  components.splice(idx, 1);
  pageStore[currentPageId] = components;
  if (selectedId === compId) {
    selectedId = null;
    configMode = 'comp';
    renderConfigPanel(null);
  }
  markAutoSaved();
  buildCompList();
  renderPreview();
}

function getCompDisplayMeta(c) {
  if (isFloorSectionComp(c)) {
    const num = (c.config && c.config.floorNum) || '';
    let name = (c.config && c.config.title) || '';
    if (!name) {
      name = c.name || '';
      if (num && name.indexOf(num) === 0) name = name.slice(num.length).trim();
    }
    return { num: num || 'F', name: name || c.name || '楼层' };
  }
  const globalIdx = components.findIndex(function (x) { return x.id === c.id; });
  return { num: String(globalIdx + 1), name: c.name || c.id };
}

let compMoreMenuId = null;

function ensureCompMoreMenu() {
  let menu = document.getElementById('compMoreMenu');
  if (!menu) {
    menu = document.createElement('div');
    menu.id = 'compMoreMenu';
    menu.className = 'nav-page-menu comp-more-menu';
    document.body.appendChild(menu);
    menu.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-act]');
      if (!btn || !compMoreMenuId || btn.disabled) return;
      e.stopPropagation();
      const act = btn.getAttribute('data-act');
      const id = compMoreMenuId;
      closeCompMoreMenu();
      if (act === 'rename') startRenameComponent(id);
      else if (act === 'duplicate') duplicateComponent(id);
      else if (act === 'delete') deleteComponent(id);
      else if (act === 'moveUp') moveComponent(id, -1);
      else if (act === 'moveDown') moveComponent(id, 1);
    });
  }
  menu.innerHTML =
    '<button type="button" data-act="rename">重命名</button>' +
    '<button type="button" data-act="duplicate">复制</button>' +
    '<button type="button" data-act="moveUp">上移</button>' +
    '<button type="button" data-act="moveDown">下移</button>' +
    '<button type="button" data-act="delete" class="is-danger">删除</button>';
  return menu;
}

function closeCompMoreMenu() {
  compMoreMenuId = null;
  const menu = document.getElementById('compMoreMenu');
  if (menu) menu.classList.remove('show');
  document.querySelectorAll('.comp-item-more.is-open').forEach(function (el) {
    el.classList.remove('is-open');
  });
}

function getCompMoveState(compId) {
  if (isLockedShellComp(compId)) return { canUp: false, canDown: false };
  const idx = components.findIndex(function (c) { return c.id === compId; });
  if (idx < 0) return { canUp: false, canDown: false };
  const group = components[idx].group;
  const sameGroup = components.filter(function (c) { return c.group === group; });
  const gi = sameGroup.findIndex(function (c) { return c.id === compId; });
  return {
    canUp: gi > 0,
    canDown: gi >= 0 && gi < sameGroup.length - 1
  };
}

function toggleCompMoreMenu(e, compId) {
  e.preventDefault();
  e.stopPropagation();
  closePageMoreMenu();
  if (isLockedShellComp(compId)) return;
  const comp = (components || []).find(function (c) { return c.id === compId; });
  if (!comp) return;

  const btn = e.currentTarget;
  const menu = ensureCompMoreMenu();
  if (compMoreMenuId === compId && menu.classList.contains('show')) {
    closeCompMoreMenu();
    return;
  }
  compMoreMenuId = compId;
  document.querySelectorAll('.comp-item-more.is-open').forEach(function (el) {
    el.classList.remove('is-open');
  });
  btn.classList.add('is-open');

  const isFloor = isFloorSectionComp(comp);
  const move = getCompMoveState(compId);
  const renameBtn = menu.querySelector('[data-act="rename"]');
  const dupBtn = menu.querySelector('[data-act="duplicate"]');
  const delBtn = menu.querySelector('[data-act="delete"]');
  const upBtn = menu.querySelector('[data-act="moveUp"]');
  const downBtn = menu.querySelector('[data-act="moveDown"]');

  // 非楼层：仅上移/下移；楼层：重命名/复制/上移/下移/删除
  if (renameBtn) renameBtn.style.display = isFloor ? '' : 'none';
  if (dupBtn) dupBtn.style.display = isFloor ? '' : 'none';
  if (delBtn) {
    delBtn.style.display = isFloor ? '' : 'none';
    if (isFloor) {
      const onlyOne = countFloorSections() <= 1;
      delBtn.disabled = onlyOne;
      delBtn.title = onlyOne ? '至少保留一个楼层' : '删除';
      delBtn.classList.toggle('is-disabled', onlyOne);
    } else {
      delBtn.disabled = false;
      delBtn.classList.remove('is-disabled');
    }
  }
  if (upBtn) {
    upBtn.disabled = !move.canUp;
    upBtn.title = move.canUp ? '上移' : '已在最顶部';
    upBtn.classList.toggle('is-disabled', !move.canUp);
  }
  if (downBtn) {
    downBtn.disabled = !move.canDown;
    downBtn.title = move.canDown ? '下移' : '已在最底部';
    downBtn.classList.toggle('is-disabled', !move.canDown);
  }

  const rect = btn.getBoundingClientRect();
  menu.classList.add('show');
  const mw = menu.offsetWidth || 112;
  let left = rect.right - mw;
  let top = rect.bottom + 4;
  if (left < 8) left = 8;
  if (top + 160 > window.innerHeight) top = Math.max(8, rect.top - 160);
  menu.style.left = left + 'px';
  menu.style.top = top + 'px';
}

function startRenameComponent(compId) {
  closeCompMoreMenu();
  const comp = (components || []).find(function (c) { return c.id === compId; });
  if (!comp || !isFloorSectionComp(comp)) return;
  const item = document.querySelector('.comp-item[data-id="' + compId + '"]');
  if (!item) return;
  const nameEl = item.querySelector('.comp-item-title');
  if (!nameEl || item.querySelector('.comp-item-name-input')) return;

  const meta = getCompDisplayMeta(comp);
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'comp-item-name-input';
  input.value = meta.name || '';
  input.setAttribute('maxlength', '40');
  nameEl.replaceWith(input);
  input.focus();
  input.select();

  let done = false;
  function finish(save) {
    if (done) return;
    done = true;
    if (save) {
      const next = (input.value || '').trim();
      if (next) {
        if (!comp.config) comp.config = {};
        comp.config.title = next;
        const num = comp.config.floorNum || '';
        comp.name = (num ? num + ' ' : '') + next;
        if (selectedId === compId) {
          const titleEl = document.getElementById('configTitle');
          if (titleEl) titleEl.textContent = comp.name + ' · 组件属性';
          renderConfigPanel(compId);
        }
        markAutoSaved();
      }
    }
    buildCompList();
    if (selectedId === compId) renderPreview();
  }
  input.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter') { ev.preventDefault(); finish(true); }
    else if (ev.key === 'Escape') { ev.preventDefault(); finish(false); }
  });
  input.addEventListener('blur', function () { finish(true); });
  input.addEventListener('click', function (ev) { ev.stopPropagation(); });
}

function buildCompList() {
  const list = document.getElementById('compList');
  if (!list) return;
  closeCompMoreMenu();
  const order = ['page', 'float'];
  let html = '';
  const renderList = getRenderComponents();
  order.forEach(g => {
    const items = renderList.filter(c => c.group === g);
    if (!items.length) return;
    html += `<div class="comp-group-label">${GROUPS[g] || g}</div>`;
    items.forEach((c) => {
      const locked = isLockedShellComp(c.id);
      const meta = getCompDisplayMeta(c);
      const isFloor = isFloorSectionComp(c);
      const titleTip = locked
        ? esc(meta.name) + '（跟随标准首页，不可改）'
        : (isFloor ? esc(meta.name) + '（双击重命名）' : esc(meta.name));
      const renameAttr = (!locked && isFloor)
        ? ` ondblclick="event.stopPropagation();startRenameComponent('${c.id}')"`
        : '';
      const dragAttrs = locked
        ? 'draggable="false"'
        : 'draggable="true" ondragstart="dragStart(event)" ondragover="dragOver(event)" ondragleave="dragLeave(event)" ondrop="drop(event)" ondragend="dragEnd(event)"';
      html += `
        <div class="comp-item${c.on ? ' on' : ' off'}${c.id === selectedId ? ' active' : ''}${locked ? ' is-locked' : ''}"
             data-id="${c.id}" ${dragAttrs}>
          <span class="drag-handle" title="${locked ? '跟随标准首页，不可排序' : '拖拽排序'}">⋮⋮</span>
          <span class="comp-item-num">${esc(meta.num)}</span>
          <span class="comp-item-title" title="${titleTip}"${renameAttr}>${esc(meta.name)}</span>
          ${locked
            ? `<span class="comp-shell-tag" title="跟随标准首页">首页</span>
               <label class="comp-toggle toggle is-locked-toggle" onclick="event.stopPropagation()" title="跟随标准首页，不可改">
                 <input type="checkbox" ${c.on ? 'checked' : ''} disabled>
                 <span class="slider"></span>
               </label>
               <span class="comp-item-more-ph"></span>`
            : `<label class="comp-toggle toggle" onclick="event.stopPropagation()" title="是否展示">
                 <input type="checkbox" ${c.on ? 'checked' : ''} onchange="toggleComp('${c.id}', this.checked)">
                 <span class="slider"></span>
               </label>
               <button type="button" class="comp-item-more" title="更多" onclick="toggleCompMoreMenu(event,'${c.id}')">⋮</button>`}
        </div>`;
    });
  });
  list.innerHTML = html;
  document.getElementById('compCount').textContent =
    renderList.filter(c => c.on).length + '/' + renderList.length;
  list.querySelectorAll('.comp-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.toggle') || e.target.closest('input') || e.target.closest('.comp-item-more') || e.target.closest('.comp-item-name-input')) return;
      selectComponent(item.dataset.id);
    });
  });
}

/** 同组内上移/下移组件 */
function moveComponent(id, delta) {
  if (isLockedShellComp(id)) return;
  const idx = components.findIndex(c => c.id === id);
  if (idx < 0) return;
  const src = components[idx];
  let to = idx + delta;
  while (to >= 0 && to < components.length && components[to].group !== src.group) {
    to += delta;
  }
  if (to < 0 || to >= components.length) return;
  if (components[to].group !== src.group) return;
  const [moved] = components.splice(idx, 1);
  components.splice(to, 0, moved);
  markAutoSaved();
  buildCompList();
  renderPreview();
}

function markAutoSaved() {
  const el = document.getElementById('autoSaveHint');
  if (!el) return;
  el.textContent = '已自动保存';
}


// ==================== 绑定 ====================
function bindConfigInputs() {
  const body = document.getElementById('configBody');
  if (!body) return;
  body.querySelectorAll('input, select').forEach(inp => {
    const handler = () => applyInput(inp);
    inp.addEventListener('change', handler);
    if (inp.type === 'text' || inp.type === 'url') {
      inp.addEventListener('input', handler);
      inp.addEventListener('blur', handler);
    }
    if (inp.type === 'number' || inp.type === 'color' || inp.type === 'checkbox') inp.addEventListener('input', handler);
  });
}

function applyInput(inp) {
  if (!selectedId) return;
  if (isLockedShellComp(selectedId)) return;
  const comp = components.find(c => c.id === selectedId);
  if (!comp) return;
  const cfg = comp.config;
  const key = inp.dataset.key;
  const listKey = inp.dataset.listKey;
  const idx = parseInt(inp.dataset.idx, 10);
  const field = inp.dataset.field;
  const li = parseInt(inp.dataset.li, 10);
  const subfield = inp.dataset.subfield;

  let val;
  if (inp.type === 'checkbox') val = inp.checked;
  else if (inp.type === 'number') val = parseInt(inp.value, 10) || 0;
  else val = inp.value;

  if (key === 'defaultTab' || key === 'activeIndex') val = parseInt(val, 10) || 0;

  // nested object field e.g. featured.title
  if (key && field && isNaN(idx) && !listKey) {
    if (!cfg[key] || typeof cfg[key] !== 'object') cfg[key] = {};
    if (!isNaN(parseInt(inp.dataset.idx, 10)) && Array.isArray(cfg[key][field])) {
      // handled below
    } else if (inp.dataset.idx !== undefined && cfg[key][field] && Array.isArray(cfg[key][field])) {
      cfg[key][field][parseInt(inp.dataset.idx, 10)] = val;
    } else {
      cfg[key][field] = val;
    }
  } else if (key && field && !isNaN(idx) && inp.dataset.idx !== undefined && Array.isArray(cfg[key]?.[field])) {
    // featured.tags[i]
    cfg[key][field][idx] = val;
  } else if (listKey != null && !isNaN(idx)) {
    const arr = cfg[listKey];
    if (!arr) return;
    if (field) {
      if (listKey === 'hotWords' && typeof arr[idx] === 'string') {
        arr[idx] = normalizeHotWord(arr[idx]);
      }
      if (typeof arr[idx] !== 'object' || arr[idx] === null) arr[idx] = {};
      arr[idx][field] = val;
    } else {
      arr[idx] = val;
    }
  } else if (key === 'slots' && !isNaN(idx) && field) {
    if (field === 'brands' && !isNaN(li) && subfield) {
      if (subfield === 'height') val = parseInt(val, 10) || 52;
      cfg.slots[idx].brands[li][subfield] = val;
    } else if (field === 'itemCount' || field === 'columns' || field === 'rows') {
      cfg.slots[idx][field] = parseInt(val, 10) || 0;
      if (field === 'columns' || field === 'rows') renderConfigPanel(selectedId);
    } else if (field === 'showRankBadge' || field === 'showCart') {
      cfg.slots[idx][field] = !!val;
    } else if (field === 'type') {
      cfg.slots[idx].type = val;
      // 切换类型时补默认结构
      if (val === 'rankList') Object.assign(cfg.slots[idx], { itemCount: 9, showRankBadge: true });
      if (val === 'brandZone' && !cfg.slots[idx].brands) {
        cfg.slots[idx].brands = [{ name: '品牌', sub: '描述', height: 52, imgKey: 'watch', link: '#' }];
      }
      if (val === 'productGrid') Object.assign(cfg.slots[idx], {
        columns: 2, rows: 2, showCart: true,
        products: cfg.slots[idx].products || ['p28', 'p17', 'p19', 'p34']
      });
      renderConfigPanel(selectedId);
    } else {
      cfg.slots[idx][field] = val;
    }
  } else if (key === 'columns' && !isNaN(idx) && field) {
    if (field === 'links' && !isNaN(li) && subfield) {
      cfg.columns[idx].links[li][subfield] = val;
    } else {
      cfg.columns[idx][field] = val;
    }
  } else if (key && field && !listKey && isNaN(li)) {
    // featured.title via data-key=featured data-field=title
    if (typeof cfg[key] === 'object' && cfg[key] !== null && !Array.isArray(cfg[key])) {
      cfg[key][field] = val;
    } else {
      cfg[key] = val;
    }
  } else if (key) {
    cfg[key] = val;
  }

  // 搜索头部品牌展示形式变化时重绘面板
  if (selectedId === 'header' && key === 'logoMode') {
    renderConfigPanel(selectedId);
  }
  // 楼层改名同步左侧
  if (isFloorSectionComp(comp) && (key === 'floorNum' || key === 'title')) {
    comp.name = `${cfg.floorNum || ''} ${cfg.title || ''}`.trim();
    buildCompList();
  }
  // 切换楼层布局时重绘面板
  if (isFloorSectionComp(comp) && key === 'layout') {
    if (val === 'posterStack' && (!cfg.featured || typeof cfg.featured !== 'object')) {
      cfg.featured = {
        brand: '', title: '主推位', tags: [], link: '#', imgKey: 'watch', width: 200
      };
    }
    if (val === 'poster1x2') {
      if (!Array.isArray(cfg.posters)) cfg.posters = [];
      const defaults = [
        { brand: '品牌A', title: '上行海报', subtitle: '主推活动', link: '02.活动页-原型页面.html', imgKey: 'watch' },
        { brand: '品牌B', title: '下行左', subtitle: '精选推荐', link: '02.活动专区页-原型页面.html', imgKey: 'headphone' },
        { brand: '品牌C', title: '下行右', subtitle: '热销好物', link: '03.搜索分类页-原型页面.html', imgKey: 'camera' }
      ];
      while (cfg.posters.length < 3) {
        cfg.posters.push(Object.assign({}, defaults[cfg.posters.length] || { brand: '', title: '海报', subtitle: '', link: '#', imgKey: 'pen' }));
      }
      if (cfg.leftWidth == null) cfg.leftWidth = 280;
    }
    renderConfigPanel(selectedId);
  }
  // 楼层行列变化时更新商品源数量提示
  if (isFloorSectionComp(comp) && (key === 'productColumns' || key === 'productRows')) {
    renderConfigPanel(selectedId);
  }
  // 推荐流行列变化时更新各 Tab 商品源数量提示
  if (selectedId === 'feed' && (key === 'columns' || key === 'rows')) {
    renderConfigPanel(selectedId);
  }

  renderPreview();
  markAutoSaved();
}

function addListItem(key, defaultVal) {
  const comp = components.find(c => c.id === selectedId);
  if (!comp?.config[key]) return;
  const arr = comp.config[key];
  arr.push(defaultVal !== undefined ? defaultVal : (typeof arr[0] === 'string' ? '新项目' : {}));
  renderConfigPanel(selectedId); renderPreview();
}
function removeListItem(key, idx) {
  const comp = components.find(c => c.id === selectedId);
  if (!comp?.config[key]) return;
  comp.config[key].splice(idx, 1);
  renderConfigPanel(selectedId); renderPreview();
}
function moveListItem(key, idx, delta) {
  const comp = components.find(c => c.id === selectedId);
  const arr = comp?.config?.[key];
  if (!Array.isArray(arr)) return;
  const to = idx + delta;
  if (idx < 0 || idx >= arr.length || to < 0 || to >= arr.length) return;
  const tmp = arr[idx];
  arr[idx] = arr[to];
  arr[to] = tmp;
  renderConfigPanel(selectedId);
  renderPreview();
}
function addLinkItem(key, colIdx) {
  const comp = components.find(c => c.id === selectedId);
  if (!comp) return;
  comp.config[key][colIdx].links.push({ text: '新链接', url: '#' });
  renderConfigPanel(selectedId); renderPreview();
}
function removeLinkItem(key, colIdx, linkIdx) {
  const comp = components.find(c => c.id === selectedId);
  if (!comp) return;
  comp.config[key][colIdx].links.splice(linkIdx, 1);
  renderConfigPanel(selectedId); renderPreview();
}
function addNestedListItem(parent, field, val) {
  const comp = components.find(c => c.id === selectedId);
  if (!comp?.config[parent]) return;
  if (!Array.isArray(comp.config[parent][field])) comp.config[parent][field] = [];
  comp.config[parent][field].push(val);
  renderConfigPanel(selectedId); renderPreview();
}
function removeNestedListItem(parent, field, idx) {
  const comp = components.find(c => c.id === selectedId);
  if (!comp?.config[parent]?.[field]) return;
  comp.config[parent][field].splice(idx, 1);
  renderConfigPanel(selectedId); renderPreview();
}
function addSlotBrand(si) {
  const comp = components.find(c => c.id === selectedId);
  if (!comp?.config.slots?.[si]) return;
  if (!comp.config.slots[si].brands) comp.config.slots[si].brands = [];
  comp.config.slots[si].brands.push({ name: '新品牌', sub: '描述', height: 52, imgKey: 'watch', link: '#' });
  renderConfigPanel(selectedId); renderPreview();
}
function removeSlotBrand(si, bi) {
  const comp = components.find(c => c.id === selectedId);
  if (!comp?.config.slots?.[si]?.brands) return;
  comp.config.slots[si].brands.splice(bi, 1);
  renderConfigPanel(selectedId); renderPreview();
}

// ==================== 拖拽 / 全局 ====================
let dragSrcId = null;
function dragStart(e) {
  const item = e.target.closest('.comp-item');
  if (!item) return;
  if (isLockedShellComp(item.dataset.id)) {
    e.preventDefault();
    return;
  }
  dragSrcId = item.dataset.id;
  item.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}
function dragOver(e) {
  e.preventDefault();
  const item = e.target.closest('.comp-item');
  if (item && !isLockedShellComp(item.dataset.id)) item.classList.add('drag-over');
}
function dragLeave(e) {
  const item = e.target.closest('.comp-item');
  if (item) item.classList.remove('drag-over');
}
function drop(e) {
  e.preventDefault();
  const targetItem = e.target.closest('.comp-item');
  if (!targetItem || !dragSrcId) return;
  targetItem.classList.remove('drag-over');
  const targetId = targetItem.dataset.id;
  if (dragSrcId === targetId) return;
  if (isLockedShellComp(dragSrcId) || isLockedShellComp(targetId)) return;
  const src = components.find(c => c.id === dragSrcId);
  const tgt = components.find(c => c.id === targetId);
  // 仅允许同组排序
  if (!src || !tgt || src.group !== tgt.group) return;
  const srcIdx = components.findIndex(c => c.id === dragSrcId);
  const tgtIdx = components.findIndex(c => c.id === targetId);
  const [moved] = components.splice(srcIdx, 1);
  components.splice(tgtIdx, 0, moved);
  markAutoSaved();
  renderPreview(); buildCompList();
}
function dragEnd() {
  document.querySelectorAll('.comp-item').forEach(i => i.classList.remove('dragging', 'drag-over'));
  dragSrcId = null;
}

function toggleComp(id, checked) {
  if (isLockedShellComp(id)) return;
  const c = components.find(x => x.id === id);
  if (c) c.on = checked;
  renderPreview(); buildCompList();
}
function toggleAll(on) {
  components.forEach(function (c) {
    if (isLockedShellComp(c.id)) return;
    c.on = on;
  });
  renderPreview();
  buildCompList();
}
function resetAll() {
  const page = getCurrentPageDef();
  const tpl = getDefaultComponentsByKey(page.templateKey || 'home');
  components = cloneComponents(tpl);
  pageTheme = getDefaultTheme();
  pageStore[currentPageId] = components;
  themeStore[currentPageId] = pageTheme;
  selectedId = null;
  configMode = 'comp';
  setRightPanelCollapsed(false);
  renderPreview(); buildCompList();
  document.getElementById('configEmpty').style.display = '';
  document.getElementById('configBody').classList.remove('show');
  document.getElementById('configTitle').textContent = '组件属性';
  document.getElementById('configBadge').textContent = '请选择组件';
  markAutoSaved();
}
function showSummary() {
  const slotTypeLabel = { rankList: '热销榜', brandZone: '品牌专区', productGrid: '商品宫格' };
  const layoutLabel = {
    featuredMix: '混合布局', bannerGrid: '轮播网格', tallCarousel: '高轮播混排',
    posterStack: '单列主推', poster1x2: '两行海报'
  };
  const page = getCurrentPageDef();
  const lines = getRenderComponents().map((c, i) => {
    const cfg = c.config;
    const typeName = (typeof TYPE_LABELS !== 'undefined' && TYPE_LABELS[c.type]) || c.name;
    let detail = '';
    if (c.id === 'opsRow') detail = ' · ' + (cfg.slots || []).map(function (s) { return slotTypeLabel[s.type] || s.type; }).join(' / ');
    if (isFloorSectionComp(c)) detail = ' · ' + (layoutLabel[cfg.layout] || cfg.layout) + ' · ' + (cfg.floorNum || '');
    if (c.id === 'feed') detail = ' · ' + cfg.columns + '×' + cfg.rows + ' · ' + (cfg.tabs || []).length + ' 个频道';
    if (c.id === 'floorNav') detail = ' · ' + (cfg.items || []).length + ' 个锚点';
    if (c.id === 'sideToolbar') detail = ' · ' + (cfg.items || []).length + ' 个入口';
    if (isLockedShellComp(c.id)) detail += ' · 跟随标准首页';
    return (i + 1) + '. ' + c.name + '（' + typeName + '）：' + (c.on ? '已启用' : '已隐藏') + detail;
  });
  document.getElementById('modalTitle').textContent = '发布成功 · ' + (page.name || '');
  document.getElementById('modalContent').textContent = lines.join('\n');
  document.getElementById('modalOverlay').classList.add('show');
}
function exportJSON() {
  persistCurrentPage();
  const payload = {
    pageId: currentPageId,
    pageName: getCurrentPageDef().name,
    theme: cloneTheme(pageTheme),
    components: getRenderComponents().map(c => ({
      id: c.id, type: c.type, name: c.name, group: c.group, visible: c.on, config: c.config,
      lockedFromHome: isLockedShellComp(c.id) || undefined
    }))
  };
  document.getElementById('modalTitle').textContent = '保存成功 · 导出配置';
  document.getElementById('modalContent').textContent = JSON.stringify(payload, null, 2);
  document.getElementById('modalOverlay').classList.add('show');
  const hint = document.getElementById('autoSaveHint');
  if (hint) hint.textContent = '已手动保存';
}
function closeModal() { document.getElementById('modalOverlay').classList.remove('show'); }

let confirmAction = null;

function openConfirmModal(opts) {
  opts = opts || {};
  confirmAction = typeof opts.onConfirm === 'function' ? opts.onConfirm : null;
  const overlay = document.getElementById('confirmOverlay');
  const title = document.getElementById('confirmTitle');
  const msg = document.getElementById('confirmMessage');
  const okBtn = document.getElementById('confirmOkBtn');
  if (title) title.textContent = opts.title || '确认';
  if (msg) msg.textContent = opts.message || '确定继续吗？';
  if (okBtn) okBtn.textContent = opts.okText || '确定';
  if (overlay) overlay.classList.add('show');
}

function closeConfirmModal() {
  confirmAction = null;
  const overlay = document.getElementById('confirmOverlay');
  if (overlay) overlay.classList.remove('show');
}

function submitConfirmModal() {
  const fn = confirmAction;
  closeConfirmModal();
  if (fn) fn();
}

function confirmSave() {
  const page = getCurrentPageDef();
  openConfirmModal({
    title: '确认保存',
    message: '确定保存「' + (page.name || '当前页面') + '」的配置吗？',
    okText: '确认保存',
    onConfirm: exportJSON
  });
}

function confirmPublish() {
  const page = getCurrentPageDef();
  openConfirmModal({
    title: '确认发布',
    message: '确定发布「' + (page.name || '当前页面') + '」吗？发布后将按当前配置生效。',
    okText: '确认发布',
    onConfirm: function () {
      persistCurrentPage();
      showSummary();
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('confirmOverlay');
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeConfirmModal();
    });
  }
});

// ==================== 图片：本地上传 / 素材库 ====================
let mediaPickTarget = null; // { mode:'list', listKey, idx } | { mode:'config', imgField, keyField }

function getListItem(listKey, idx) {
  const comp = components.find(c => c.id === selectedId);
  if (!comp?.config?.[listKey]?.[idx]) return null;
  return { comp, item: comp.config[listKey][idx] };
}

function readImageFile(input, onDone) {
  const file = input && input.files && input.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    alert('请选择图片文件');
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = function () {
    onDone(reader.result);
    input.value = '';
  };
  reader.readAsDataURL(file);
}

function uploadPromoLocal(listKey, idx, input) {
  const target = getListItem(listKey, idx);
  if (!target) return;
  readImageFile(input, function (dataUrl) {
    target.item.img = dataUrl;
    delete target.item.imgKey;
    renderConfigPanel(selectedId);
    renderPreview();
  });
}

function clearPromoImage(listKey, idx) {
  const target = getListItem(listKey, idx);
  if (!target) return;
  delete target.item.img;
  delete target.item.imgKey;
  renderConfigPanel(selectedId);
  renderPreview();
}

function uploadConfigImage(imgField, keyField, input) {
  const comp = components.find(c => c.id === selectedId);
  if (!comp) return;
  readImageFile(input, function (dataUrl) {
    comp.config[imgField] = dataUrl;
    delete comp.config[keyField];
    renderConfigPanel(selectedId);
    renderPreview();
    markAutoSaved();
  });
}

function clearConfigImage(imgField, keyField) {
  const comp = components.find(c => c.id === selectedId);
  if (!comp) return;
  delete comp.config[imgField];
  delete comp.config[keyField];
  renderConfigPanel(selectedId);
  renderPreview();
  markAutoSaved();
}

function uploadThemeImage(imgField, keyField, input) {
  if (!pageTheme) pageTheme = getDefaultTheme();
  readImageFile(input, function (dataUrl) {
    pageTheme[imgField] = dataUrl;
    delete pageTheme[keyField];
    themeStore[currentPageId] = pageTheme;
    renderThemePanel();
    renderPreview();
    markAutoSaved();
  });
}

function clearThemeImage(imgField, keyField) {
  if (!pageTheme) return;
  delete pageTheme[imgField];
  delete pageTheme[keyField];
  themeStore[currentPageId] = pageTheme;
  renderThemePanel();
  renderPreview();
  markAutoSaved();
}

function openThemeMaterialLibrary(imgField, keyField) {
  mediaPickTarget = { mode: 'theme', imgField: imgField, keyField: keyField };
  const curKey = pageTheme && pageTheme[keyField];
  renderMediaLibraryGrid(curKey);
}

function bindThemeInputs() {
  const body = document.getElementById('configBody');
  if (!body) return;
  body.querySelectorAll('input, select').forEach(function (inp) {
    if (inp.type === 'file') return;
    const handler = function () { applyThemeInput(inp); };
    inp.addEventListener('change', handler);
    if (inp.type === 'text' || inp.type === 'number' || inp.type === 'color') {
      inp.addEventListener('input', handler);
    }
  });
}

function applyThemeInput(inp) {
  if (!pageTheme) pageTheme = getDefaultTheme();
  const key = inp.dataset.key;
  if (!key) return;
  let val;
  if (inp.type === 'number') val = parseInt(inp.value, 10) || 0;
  else val = inp.value;
  const prevBgMode = pageTheme.bgMode;
  pageTheme[key] = val;
  themeStore[currentPageId] = pageTheme;
  if (key === 'bgMode' && prevBgMode !== val) {
    renderThemePanel();
  }
  renderPreview();
  markAutoSaved();
}

function uploadNestedImage(parent, imgField, keyField, input) {
  const comp = components.find(c => c.id === selectedId);
  if (!comp) return;
  if (!comp.config[parent] || typeof comp.config[parent] !== 'object') comp.config[parent] = {};
  readImageFile(input, function (dataUrl) {
    comp.config[parent][imgField] = dataUrl;
    delete comp.config[parent][keyField];
    renderConfigPanel(selectedId);
    renderPreview();
  });
}

function clearNestedImage(parent, imgField, keyField) {
  const comp = components.find(c => c.id === selectedId);
  if (!comp?.config?.[parent]) return;
  delete comp.config[parent][imgField];
  delete comp.config[parent][keyField];
  renderConfigPanel(selectedId);
  renderPreview();
}

function openNestedMaterialLibrary(parent, imgField, keyField) {
  const comp = components.find(c => c.id === selectedId);
  mediaPickTarget = { mode: 'nested', parent: parent, imgField: imgField, keyField: keyField };
  const curKey = comp && comp.config[parent] && comp.config[parent][keyField];
  renderMediaLibraryGrid(curKey);
}

function addBannerSlide() {
  const comp = components.find(c => c.id === selectedId);
  if (!comp) return;
  if (!Array.isArray(comp.config.banners)) comp.config.banners = defaultBannerSlides();
  const n = comp.config.banners.length;
  const jd = JD_BANNERS[n % JD_BANNERS.length];
  comp.config.banners.push({
    bg: jd.bg,
    fg: jd.img,
    link: '#'
  });
  renderConfigPanel(selectedId);
  renderPreview();
}

function openMaterialLibrary(listKey, idx) {
  mediaPickTarget = { mode: 'list', listKey, idx };
  const current = getListItem(listKey, idx);
  const curKey = current && current.item.imgKey;
  renderMediaLibraryGrid(curKey);
}

function openConfigMaterialLibrary(imgField, keyField) {
  const comp = components.find(c => c.id === selectedId);
  mediaPickTarget = { mode: 'config', imgField, keyField };
  const curKey = comp && comp.config[keyField];
  renderMediaLibraryGrid(curKey);
}

function renderMediaLibraryGrid(curKey) {
  const body = document.getElementById('mediaLibraryBody');
  const entries = materialLibraryEntries();
  if (!entries.length) {
    body.innerHTML = '<div class="media-empty">暂无可用素材</div>';
  } else {
    body.innerHTML = '<div class="media-grid">' + entries.map(function (e) {
      return '<button type="button" class="media-item' + (e.key === curKey ? ' on' : '') + '" onclick="pickMaterial(\'' + esc(e.key) + '\')" title="' + esc(e.key) + '">' +
        '<img src="' + esc(e.src) + '" alt="' + esc(e.key) + '">' +
        '<span>' + esc(e.key) + '</span></button>';
    }).join('') + '</div>';
  }
  document.getElementById('mediaLibraryOverlay').classList.add('show');
}

function getSlotBrand(si, bi) {
  const comp = components.find(c => c.id === selectedId);
  const brand = comp && comp.config && comp.config.slots && comp.config.slots[si] &&
    comp.config.slots[si].brands && comp.config.slots[si].brands[bi];
  if (!brand) return null;
  return { comp, brand };
}

function uploadSlotBrandLocal(si, bi, input) {
  const target = getSlotBrand(si, bi);
  if (!target) return;
  readImageFile(input, function (dataUrl) {
    target.brand.img = dataUrl;
    delete target.brand.imgKey;
    renderConfigPanel(selectedId);
    renderPreview();
  });
}

function clearSlotBrandImage(si, bi) {
  const target = getSlotBrand(si, bi);
  if (!target) return;
  delete target.brand.img;
  delete target.brand.imgKey;
  renderConfigPanel(selectedId);
  renderPreview();
}

function openSlotBrandMaterialLibrary(si, bi) {
  const target = getSlotBrand(si, bi);
  mediaPickTarget = { mode: 'slotBrand', slotIdx: si, brandIdx: bi };
  renderMediaLibraryGrid(target && target.brand.imgKey);
}

function pickMaterial(key) {
  if (!mediaPickTarget) return;
  if (mediaPickTarget.mode === 'theme') {
    if (!pageTheme) pageTheme = getDefaultTheme();
    pageTheme[mediaPickTarget.keyField] = key;
    delete pageTheme[mediaPickTarget.imgField];
    themeStore[currentPageId] = pageTheme;
    closeMaterialLibrary();
    renderThemePanel();
    renderPreview();
    markAutoSaved();
    return;
  }
  if (mediaPickTarget.mode === 'config') {
    const comp = components.find(c => c.id === selectedId);
    if (!comp) return;
    comp.config[mediaPickTarget.keyField] = key;
    delete comp.config[mediaPickTarget.imgField];
  } else if (mediaPickTarget.mode === 'nested') {
    const comp = components.find(c => c.id === selectedId);
    if (!comp) return;
    if (!comp.config[mediaPickTarget.parent] || typeof comp.config[mediaPickTarget.parent] !== 'object') {
      comp.config[mediaPickTarget.parent] = {};
    }
    comp.config[mediaPickTarget.parent][mediaPickTarget.keyField] = key;
    delete comp.config[mediaPickTarget.parent][mediaPickTarget.imgField];
  } else if (mediaPickTarget.mode === 'slotBrand') {
    const target = getSlotBrand(mediaPickTarget.slotIdx, mediaPickTarget.brandIdx);
    if (!target) return;
    target.brand.imgKey = key;
    delete target.brand.img;
  } else {
    const target = getListItem(mediaPickTarget.listKey, mediaPickTarget.idx);
    if (!target) return;
    target.item.imgKey = key;
    delete target.item.img;
  }
  closeMaterialLibrary();
  renderConfigPanel(selectedId);
  renderPreview();
  markAutoSaved();
}

function closeMaterialLibrary() {
  document.getElementById('mediaLibraryOverlay').classList.remove('show');
  mediaPickTarget = null;
}

// ==================== 商品数据源弹窗（宫格 / 楼层 / 推荐流 Tab） ====================
let productPickerState = null; // { mode:'slot'|'floor'|'feed', slotIdx?, tabIdx?, selected, max }

function openProductPicker(si) {
  const comp = components.find(c => c.id === selectedId);
  if (!comp?.config?.slots?.[si]) return;
  const slot = comp.config.slots[si];
  const cols = Math.max(1, Math.min(3, parseInt(slot.columns, 10) || 2));
  const rows = Math.max(1, Math.min(3, parseInt(slot.rows, 10) || 2));
  const max = cols * rows;
  const selected = (slot.products || []).map(function (k) {
    return typeof k === 'string' ? k : (k && k.key);
  }).filter(Boolean).slice(0, max);
  productPickerState = { mode: 'slot', slotIdx: si, selected: selected, max: max };
  document.getElementById('productPickerTitle').textContent = '选择商品（最多 ' + max + ' 个）';
  renderProductPickerBody();
  document.getElementById('productPickerOverlay').classList.add('show');
}

function openFloorProductPicker() {
  const comp = components.find(c => c.id === selectedId);
  if (!comp?.config || !isFloorSectionComp(comp)) return;
  const cfg = comp.config;
  const cols = Math.max(1, Math.min(4, parseInt(cfg.productColumns, 10) || 3));
  const rows = Math.max(1, Math.min(3, parseInt(cfg.productRows, 10) || 2));
  const max = cols * rows;
  const selected = (cfg.products || []).map(function (k) {
    return typeof k === 'string' ? k : (k && k.key);
  }).filter(Boolean).slice(0, max);
  productPickerState = { mode: 'floor', selected: selected, max: max };
  document.getElementById('productPickerTitle').textContent = '选择楼层商品（最多 ' + max + ' 个）';
  renderProductPickerBody();
  document.getElementById('productPickerOverlay').classList.add('show');
}

function openFeedProductPicker(tabIdx) {
  const comp = components.find(c => c.id === selectedId);
  if (!comp?.config || selectedId !== 'feed') return;
  normalizeFeedTabs(comp.config);
  const tab = comp.config.tabs[tabIdx];
  if (!tab) return;
  const cols = Math.max(1, Math.min(8, parseInt(comp.config.columns, 10) || 6));
  const rows = Math.max(1, Math.min(4, parseInt(comp.config.rows, 10) || 2));
  const max = cols * rows;
  const selected = (tab.products || []).map(function (k) {
    return typeof k === 'string' ? k : (k && k.key);
  }).filter(Boolean).slice(0, max);
  productPickerState = { mode: 'feed', tabIdx: tabIdx, selected: selected, max: max };
  document.getElementById('productPickerTitle').textContent =
    '选择「' + (tab.name || ('频道 ' + (tabIdx + 1))) + '」商品（最多 ' + max + ' 个）';
  renderProductPickerBody();
  document.getElementById('productPickerOverlay').classList.add('show');
}

function renderProductPickerBody() {
  if (!productPickerState) return;
  const selected = productPickerState.selected;
  const max = productPickerState.max;
  const body = document.getElementById('productPickerBody');
  body.innerHTML = '<div class="product-picker-grid">' + PRODUCT_POOL.map(function (p) {
    const on = selected.indexOf(p.key) !== -1;
    return '<button type="button" class="product-picker-item' + (on ? ' on' : '') + '" data-key="' + esc(p.key) + '" onclick="toggleProductPick(\'' + esc(p.key) + '\')">' +
      '<img src="' + esc(imgOf(p.key)) + '" alt="">' +
      '<span class="ppi-name">' + esc(p.brand) + ' · ' + esc(p.name) + '</span>' +
      '<span class="ppi-price">¥' + p.price + '</span>' +
      (on ? '<span class="ppi-check">✓</span>' : '') +
    '</button>';
  }).join('') + '</div>';
  document.getElementById('productPickerCount').textContent = '已选 ' + selected.length + ' / ' + max;
}

function toggleProductPick(key) {
  if (!productPickerState) return;
  const list = productPickerState.selected;
  const i = list.indexOf(key);
  if (i !== -1) {
    list.splice(i, 1);
  } else {
    if (list.length >= productPickerState.max) {
      alert('最多选择 ' + productPickerState.max + ' 个商品（与列数×行数一致）');
      return;
    }
    list.push(key);
  }
  renderProductPickerBody();
}

function confirmProductPicker() {
  if (!productPickerState) return;
  const comp = components.find(c => c.id === selectedId);
  if (!comp) return;
  if (productPickerState.mode === 'floor') {
    comp.config.products = productPickerState.selected.slice();
  } else if (productPickerState.mode === 'feed') {
    normalizeFeedTabs(comp.config);
    const tab = comp.config.tabs[productPickerState.tabIdx];
    if (!tab) return;
    tab.products = productPickerState.selected.slice();
  } else {
    const slot = comp.config.slots && comp.config.slots[productPickerState.slotIdx];
    if (!slot) return;
    slot.products = productPickerState.selected.slice();
  }
  closeProductPicker();
  renderConfigPanel(selectedId);
  renderPreview();
}

function closeProductPicker() {
  document.getElementById('productPickerOverlay').classList.remove('show');
  productPickerState = null;
}

function removeSlotProduct(si, pi) {
  const comp = components.find(c => c.id === selectedId);
  if (!comp?.config?.slots?.[si]?.products) return;
  comp.config.slots[si].products.splice(pi, 1);
  renderConfigPanel(selectedId);
  renderPreview();
}

function removeFloorProduct(pi) {
  const comp = components.find(c => c.id === selectedId);
  if (!comp?.config?.products) return;
  comp.config.products.splice(pi, 1);
  renderConfigPanel(selectedId);
  renderPreview();
}

function removeFeedProduct(tabIdx, pi) {
  const comp = components.find(c => c.id === selectedId);
  if (!comp?.config || selectedId !== 'feed') return;
  normalizeFeedTabs(comp.config);
  const tab = comp.config.tabs[tabIdx];
  if (!tab?.products) return;
  tab.products.splice(pi, 1);
  renderConfigPanel(selectedId);
  renderPreview();
}

/** 楼层锚点：滚动预览到关联组件 */
function scrollPreviewToComponent(compId) {
  if (!compId) return;
  const area = document.getElementById('previewArea');
  const root = document.getElementById('previewRoot');
  if (!area || !root) return;
  const target = root.querySelector('.pw-block[data-id="' + String(compId).replace(/"/g, '') + '"]');
  if (!target) return;
  const areaRect = area.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  area.scrollTo({
    top: area.scrollTop + (targetRect.top - areaRect.top) - 16,
    behavior: 'smooth'
  });
}

function scrollPreviewToTop() {
  const area = document.getElementById('previewArea');
  if (area) area.scrollTo({ top: 0, behavior: 'smooth' });
}

document.documentElement.style.setProperty("--pw-zoom", "0.5");
updatePageChrome();
renderNavPanel();
setLeftPanelCollapsed(false);
setRightPanelCollapsed(false);
initNavTopResize();
const colNav = document.getElementById('colNav');
if (colNav) colNav.addEventListener('click', onLeftRailClick);
const colRight = document.getElementById('colRight');
if (colRight) colRight.addEventListener('click', onRightRailClick);
document.addEventListener('click', function (e) {
  if (e.target.closest('#pageMoreMenu') || e.target.closest('.nav-item-more')) return;
  closePageMoreMenu();
  if (e.target.closest('#compMoreMenu') || e.target.closest('.comp-item-more')) return;
  closeCompMoreMenu();
});
document.addEventListener('scroll', function () {
  closePageMoreMenu();
  closeCompMoreMenu();
}, true);
setPreviewZoom(0.5);
renderPreview();
buildCompList();
window.addEventListener("resize", function () {
  syncPreviewStageHeight();
  const top = document.getElementById('navTop');
  if (!top) return;
  const h = parseInt(getComputedStyle(top).getPropertyValue('--nav-top-h'), 10) || NAV_TOP_H_DEFAULT;
  applyNavTopHeight(h, false);
});
