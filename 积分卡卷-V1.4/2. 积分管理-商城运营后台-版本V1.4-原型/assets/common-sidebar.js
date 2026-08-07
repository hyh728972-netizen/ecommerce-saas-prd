/**
 * 商城运营平台 - 公共侧边栏导航
 * 用法：页面 body 内放置 <aside class="sidebar" id="app-sidebar"></aside>
 *       可选 data-nav-active="nav-id" 覆盖自动高亮
 */
(function (global) {
  'use strict';

  var ICONS = {
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    search: '<circle cx="11" cy="11" r="6"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    pending: '<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/>',
    combo: '<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/><line x1="11" y1="7" x2="13" y2="7"/><line x1="7" y1="11" x2="7" y2="13"/>',
    channel: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    category: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/>',
    tag: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
    brand: '<rect x="2" y="2" width="20" height="20" rx="3"/><circle cx="8.5" cy="10.5" r="2.5"/><path d="M21 15l-5-5L8.5 18"/>',
    template: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
    folder: '<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>',
    points: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>',
    coupon: '<rect x="2" y="4" width="20" height="16" rx="2"/><line x1="12" y1="4" x2="12" y2="10"/>',
    order: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    aftersale: '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>',
    customer: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>',
    mall: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9" y1="15" x2="15" y2="15"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    log: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    platform: '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="5" y1="4" x2="5" y2="16"/>',
    logo: '<rect x="3" y="3" width="18" height="18" rx="3"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
    combo: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="12" y="4" width="8" height="8" rx="1"/><rect x="4" y="12" width="9" height="8" rx="1"/><rect x="13" y="12" width="7" height="7" rx="1"/>'
  };

  /** 子页面归属：详情/配置页高亮父级菜单 */
  var PAGE_ACTIVE_MAP = {
    // 选品管理模块
    '05.定价推品配置页-原型页面.html': 'selection-list',
    '10.商品详情页-原型页面.html': 'channel-products',
    '22.组合商品详情页-原型页面.html': 'combo-product',
    
    // 订单监控模块
    '17.商城订单详情页-原型页面.html': 'order-list',
    '18.售后监控列表-原型页面.html': 'aftersale-list',
    '19.售后详情页-原型页面.html': 'aftersale-list',
    
    // 积分卡券模块
    '21a.平台代发卡券-原型页面.html': 'coupon-issue',
    '21b.商城积分池明细-原型页面.html': 'points-list',
    '21c.积分池明细详情-原型页面.html': 'points-list',
    '22a.卡券模板编辑-原型页面.html': 'coupon-template',
    '22b.卡券模板查看-原型页面.html': 'coupon-template',
    
    // 客服管理模块
    '24a.客诉补偿发放-原型页面.html': 'compensation-stat'
  };

  var NAV_SECTIONS = [
    {
      label: '积分卡券',
      items: [
        { id: 'points-list', label: '商城积分列表', href: '21.商城积分列表-原型页面.html', icon: 'points' },
        { id: 'coupon-template', label: '卡券模板管理', href: '22.卡券模板列表-原型页面.html', icon: 'coupon' },
        { id: 'coupon-issue', label: '卡券发放管理', href: '23.卡券发放管理-原型页面.html', icon: 'folder' },
        { id: 'user-coupon-flow', label: '用户权益流水', href: '25.用户权益流水-原型页面.html', icon: 'log' }
      ]
    },
    {
      label: '客服管理',
      items: [
        { id: 'compensation-stat', label: '售后补偿列表', href: '24.售后补偿列表-原型页面.html', icon: 'aftersale' }
      ]
    }
  ];

  function iconSvg(name) {
    var paths = ICONS[name] || '';
    return '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">' + paths + '</svg>';
  }

  function renderNavItem(item, activeId) {
    var cls = 'nav-item' + (item.id === activeId ? ' active' : '');
    var badge = item.badge ? '<span class="badge">' + item.badge + '</span>' : '';
    return '<a class="' + cls + '" href="' + item.href + '">' + iconSvg(item.icon) + item.label + badge + '</a>';
  }

  function renderSection(section, activeId) {
    if (section.type === 'item') {
      return renderNavItem(section, activeId);
    }
    var items = section.items.map(function (item) {
      return renderNavItem(item, activeId);
    }).join('');
    return (
      '<div class="nav-section">' +
        '<div class="nav-section-label" onclick="toggleSection(this)"><span class="section-arrow">▾</span>' + section.label + '</div>' +
        '<div class="nav-section-items">' + items + '</div>' +
      '</div>'
    );
  }

  function getCurrentPage() {
    var path = global.location.pathname || '';
    var parts = path.split('/');
    return parts[parts.length - 1] || '';
  }

  function resolveActiveId(container) {
    var override = container.getAttribute('data-nav-active');
    if (override) return override;

    var page = getCurrentPage();
    if (PAGE_ACTIVE_MAP[page]) return PAGE_ACTIVE_MAP[page];

    var activeId = null;
    NAV_SECTIONS.forEach(function (section) {
      if (section.type === 'item') {
        if (section.href === page) activeId = section.id;
      } else if (section.items) {
        section.items.forEach(function (item) {
          if (item.href === page) activeId = item.id;
        });
      }
    });
    return activeId;
  }

  function renderSidebar(container) {
    var activeId = resolveActiveId(container);
    var navHtml = NAV_SECTIONS.map(function (section) {
      return renderSection(section, activeId);
    }).join('');

    container.innerHTML =
      '<div class="sidebar-brand">' +
        '<div class="logo"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">' + ICONS.logo + '</svg>商城运营平台</div>' +
        '<div class="sub">Mall Operations Platform</div>' +
      '</div>' +
      '<nav class="sidebar-nav">' + navHtml + '</nav>';
  }

  function toggleSection(label) {
    label.parentElement.classList.toggle('collapsed');
  }

  function init() {
    var container = document.getElementById('app-sidebar');
    if (container) renderSidebar(container);
  }

  global.toggleSection = toggleSection;
  global.MallSidebar = { init: init, render: renderSidebar, NAV_SECTIONS: NAV_SECTIONS };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(typeof window !== 'undefined' ? window : this);
