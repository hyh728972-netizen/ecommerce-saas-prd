(function (w) {
  var USER = {
    name: '张经理',
    avatar: '张',
    meta: '江苏银行 · 企业福利',
    badge: '企业会员'
  };

  var PP = w.ProtoPages || {};
  var PAGES = {
    overview: PP.account || '15.个人中心-原型页面.html',
    orders: PP.order || '10.订单页-原型页面.html',
    review: PP.review || '16.评价中心-原型页面.html',
    refund: PP.refund || '12.售后记录-原型页面.html',
    points: PP.points || '17.积分中心-原型页面.html',
    coupons: PP.coupons || '18.我的卡券-原型页面.html',
    favorites: PP.favorites || '19.我的收藏-原型页面.html',
    history: PP.history || '20.浏览记录-原型页面.html',
    address: PP.address || '21.收货地址-原型页面.html',
    profile: PP.profile || '22.个人资料-原型页面.html',
    message: PP.message || '23.消息中心-原型页面.html',
    help: PP.help || '24.帮助中心-原型页面.html',
    settings: PP.settings || '25.设置-原型页面.html'
  };

  var MENU = [
    { label: '订单中心', items: [
      { id: 'overview', text: '账户概览' },
      { id: 'orders', text: '我的订单', badge: 3 },
      { id: 'review', text: '评价中心' },
      { id: 'refund', text: '售后记录' }
    ]},
    { label: '我的资产', items: [
      { id: 'points', text: '积分中心' },
      { id: 'coupons', text: '我的卡券' }
    ]},
    { label: '收藏 / 足迹', items: [
      { id: 'favorites', text: '我的收藏' },
      { id: 'history', text: '浏览记录' }
    ]},
    { label: '账户设置', items: [
      { id: 'address', text: '收货地址' },
      { id: 'profile', text: '个人资料' },
      { id: 'message', text: '消息中心', badge: 2 },
      { id: 'help', text: '帮助中心' },
      { id: 'settings', text: '设置' }
    ]}
  ];

  function userCardHtml() {
    return '<div class="ac-user-card">' +
      '<div class="ac-avatar">' + USER.avatar + '</div>' +
      '<div class="ac-user-name">' + USER.name + '</div>' +
      '<div class="ac-user-meta">' + USER.meta + '</div>' +
      '<span class="ac-user-badge">' + USER.badge + '</span></div>';
  }

  function navHtml(activeId) {
    return MENU.map(function (g) {
      return '<div class="ac-nav-group"><div class="ac-nav-label">' + g.label + '</div>' +
        g.items.map(function (it) {
          var href = PAGES[it.id] || PAGES.overview;
          var cls = it.id === activeId ? 'ac-nav-item active' : 'ac-nav-item';
          var badge = it.badge ? '<span class="badge">' + it.badge + '</span>' : '';
          return '<a class="' + cls + '" href="' + href + '">' + it.text + badge + '</a>';
        }).join('') + '</div>';
    }).join('');
  }

  w.AccountNav = {
    menu: MENU,
    pages: PAGES,
    renderSidebar: function (containerId, activeId) {
      var el = document.getElementById(containerId);
      if (!el) return;
      el.innerHTML =
        '<aside class="ac-sidebar-wrap">' +
        userCardHtml() +
        '<nav class="ac-nav">' + navHtml(activeId) + '</nav></aside>';
    },
    render: function (containerId, activeId) {
      var el = document.getElementById(containerId);
      if (!el) return;
      el.className = 'ac-nav';
      el.innerHTML = navHtml(activeId);
    }
  };
})(window);
