(function (w) {
  var SVG_WX = '<svg viewBox="0 0 24 24"><path fill="#07c160" d="M8.5 4C4.9 4 2 6.4 2 9.2c0 1.5.8 2.9 2.1 3.9l-.5 2.3 2.6-1.3c.9.3 1.8.4 2.8.4.1 0 .2 0 .3 0-.3-.8-.5-1.6-.5-2.5 0-3.4 3.3-6.2 7.5-6.2.3 0 .7 0 1 .1C15.8 5.5 12.4 4 8.5 4zm-2.6 5.1c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm5.2 0c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"/><path fill="#07c160" d="M22 14.3c0-2.4-2.4-4.3-5.3-4.3-3 0-5.3 1.9-5.3 4.3S13.7 18.6 16.7 18.6c.8 0 1.5-.1 2.2-.4l2.1 1.1-.4-1.9c1.1-.8 1.8-2 1.8-3.1zm-7-1.1c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7zm3.4 0c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z"/></svg>';
  var SVG_WX_SM = '<svg viewBox="0 0 24 24"><path d="M8.5 4C4.9 4 2 6.4 2 9.2c0 1.5.8 2.9 2.1 3.9l-.5 2.3 2.6-1.3c.9.3 1.8.4 2.8.4.1 0 .2 0 .3 0-.3-.8-.5-1.6-.5-2.5 0-3.4 3.3-6.2 7.5-6.2.3 0 .7 0 1 .1C15.8 5.5 12.4 4 8.5 4zm-2.6 5.1c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm5.2 0c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zM22 14.3c0-2.4-2.4-4.3-5.3-4.3-3 0-5.3 1.9-5.3 4.3S13.7 18.6 16.7 18.6c.8 0 1.5-.1 2.2-.4l2.1 1.1-.4-1.9c1.1-.8 1.8-2 1.8-3.1zm-7-1.1c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7zm3.4 0c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z"/></svg>';

  var PP = w.ProtoPages || {};
  var HOME = PP.home || '01.首页-原型页面.html';
  var PAGES = {
    account: PP.account || '15.个人中心-原型页面.html',
    order: PP.order || '10.订单页-原型页面.html',
    cart: PP.cart || '06.购物车-原型页面.html',
    favorites: PP.favorites || '19.我的收藏-原型页面.html',
    history: PP.history || '20.浏览记录-原型页面.html',
    help: PP.help || '24.帮助中心-原型页面.html',
    message: PP.message || '23.消息中心-原型页面.html'
  };
  var opts = { logged: true, userName: '张经理', cartCount: 15, userMenuOpen: false };

  function detectHomePage() {
    var href = decodeURIComponent(location.href);
    var path = decodeURIComponent(location.pathname || '');
    var name = path.split(/[/\\]/).pop() || '';
    return href.indexOf(HOME) !== -1 || name === HOME;
  }

  function html() {
    return '<div class="top-bar"><div class="container">' +
      '<div class="top-bar-left">' +
      '<a href="' + HOME + '" id="topBarHome">商城首页</a>' +
      '<span class="sep" id="topBarHomeSep"></span>' +
      '<a href="#" id="loginLink">你好，请登录</a>' +
      '<div class="top-bar-user" id="topBarUser">' +
      '<span id="topBarUserName">你好，张经理</span>' +
      '<div class="top-bar-user-menu">' +
      '<a href="' + PAGES.account + '">个人中心</a>' +
      '<a href="#" id="topBarLogout">退出登录</a>' +
      '</div></div>' +
      '<span class="sep"></span><a href="#" id="topBarA11y">网页无障碍</a><span class="sep"></span>' +
      '<div class="top-mobile-wrap" id="topMobileWrap">' +
      '<a href="#" id="topMobileLink">切换手机版</a>' +
      '<div class="top-mobile-pop" id="topMobilePop">' +
      '<div class="top-mobile-pop-hd">' + SVG_WX + '<span>小程序商城</span></div>' +
      '<div class="top-mobile-pop-bd">' +
      '<div class="pop-desc">打开微信「扫一扫」</div>' +
      '<div class="top-mobile-qr-wrap">' +
      '<img class="top-mobile-qr" src="https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=enterprise-welfare-mall-miniprogram" alt="小程序码">' +
      '<div class="top-mobile-qr-logo">' + SVG_WX_SM + '</div></div>' +
      '<div class="pop-tip">扫描小程序码，随时随地逛商城</div></div></div></div></div>' +
      '<div class="top-bar-right">' +
      '<a href="' + PAGES.order + '">已买到的宝贝</a><span class="sep"></span>' +
      '<a href="' + PAGES.account + '">个人中心</a><span class="sep"></span>' +
      '<a href="' + PAGES.cart + '">购物车 <em class="top-cart-num" id="topCartNum">15</em></a><span class="sep"></span>' +
      '<a href="' + PAGES.favorites + '">收藏夹</a><span class="sep"></span>' +
      '<a href="' + PAGES.history + '">我的足迹</a><span class="sep"></span>' +
      '<a href="' + PAGES.help + '">帮助中心</a>' +
      '</div></div></div>';
  }

  function applyState() {
    var home = document.getElementById('topBarHome');
    var homeSep = document.getElementById('topBarHomeSep');
    var login = document.getElementById('loginLink');
    var user = document.getElementById('topBarUser');
    var name = document.getElementById('topBarUserName');
    var cart = document.getElementById('topCartNum');
    var showHome = !opts.isHome;
    if (home) home.style.display = showHome ? '' : 'none';
    if (homeSep) homeSep.style.display = showHome ? '' : 'none';
    if (login) login.style.display = opts.logged ? 'none' : '';
    if (user) {
      user.style.display = opts.logged ? '' : 'none';
      user.classList.toggle('open', !!opts.userMenuOpen && opts.logged);
    }
    if (name) name.textContent = '你好，' + opts.userName;
    if (cart) cart.textContent = opts.logged ? opts.cartCount : 0;
  }

  function bindEvents() {
    var user = document.getElementById('topBarUser');
    var mobile = document.getElementById('topMobileWrap');
    var login = document.getElementById('loginLink');
    var logout = document.getElementById('topBarLogout');
    var mobileLink = document.getElementById('topMobileLink');

    if (user) {
      user.onclick = function (e) {
        if (!opts.logged) return;
        e.stopPropagation();
        opts.userMenuOpen = !opts.userMenuOpen;
        user.classList.toggle('open', opts.userMenuOpen);
      };
    }
    document.addEventListener('click', function () {
      opts.userMenuOpen = false;
      if (user) user.classList.remove('open');
      if (mobile) mobile.classList.remove('open');
    });
    if (mobile) {
      mobile.onmouseenter = function () { mobile.classList.add('open'); };
      mobile.onmouseleave = function () { mobile.classList.remove('open'); };
    }
    if (login) login.onclick = function (e) {
      e.preventDefault();
      if (typeof w.openLogin === 'function') w.openLogin();
      else if (w.ProtoAuth && typeof w.ProtoAuth.goLogin === 'function') w.ProtoAuth.goLogin();
    };
    if (logout) logout.onclick = function (e) {
      e.preventDefault();
      opts.logged = false;
      opts.userMenuOpen = false;
      applyState();
      if (typeof w.onTopBarLogout === 'function') w.onTopBarLogout();
      else if (typeof opts.onLogoutClick === 'function') opts.onLogoutClick();
    };
    if (mobileLink) mobileLink.onclick = function (e) { e.preventDefault(); };
  }

  w.SiteTopBar = {
    init: function (options) {
      opts = Object.assign({}, opts, options || {});
      opts.isHome = detectHomePage();
      var root = document.getElementById('site-topbar-root');
      if (root) root.innerHTML = html();
      applyState();
      bindEvents();
    },
    setCartCount: function (n) {
      opts.cartCount = n;
      var cart = document.getElementById('topCartNum');
      if (cart) cart.textContent = n;
    },
    setLogged: function (logged, extra) {
      extra = extra || {};
      opts.logged = !!logged;
      if (extra.userName) opts.userName = extra.userName;
      if (extra.cartCount != null) opts.cartCount = extra.cartCount;
      applyState();
    }
  };
})(window);
