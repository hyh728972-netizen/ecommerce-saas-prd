(function (w) {
  var KEY = 'proto_logged';
  var USER_KEY = 'proto_user';
  var DEFAULT = { userName: '张经理', cartCount: 15 };
  var DEMO_ALWAYS_LOGGED = true;

  function loginPage() {
    return (w.ProtoPages && w.ProtoPages.login) || '27.登录-原型页面.html';
  }

  function isLoginPage() {
    var name = (location.pathname || location.href || '').split(/[/\\]/).pop() || '';
    return name.indexOf('登录') !== -1;
  }

  function ensureLoggedIn() {
    if (sessionStorage.getItem(KEY) !== '1') login();
  }

  function isLogged() {
    if (DEMO_ALWAYS_LOGGED && !isLoginPage()) {
      ensureLoggedIn();
      return true;
    }
    return sessionStorage.getItem(KEY) === '1';
  }

  function getUser() {
    try {
      return Object.assign({}, DEFAULT, JSON.parse(sessionStorage.getItem(USER_KEY) || '{}'));
    } catch (e) {
      return Object.assign({}, DEFAULT);
    }
  }

  function login(extra) {
    var u = Object.assign({}, DEFAULT, extra || {});
    sessionStorage.setItem(KEY, '1');
    sessionStorage.setItem(USER_KEY, JSON.stringify(u));
    syncTopBar(true, u);
    return u;
  }

  function logout() {
    sessionStorage.removeItem(KEY);
    sessionStorage.removeItem(USER_KEY);
    syncTopBar(false);
  }

  function syncTopBar(logged, user) {
    user = user || getUser();
    logged = logged !== undefined ? logged : isLogged();
    if (typeof SiteTopBar !== 'undefined') {
      SiteTopBar.setLogged(logged, {
        userName: user.userName,
        cartCount: logged ? user.cartCount : 0
      });
    }
    if (typeof FloatDock !== 'undefined' && typeof FloatDock.setCartCount === 'function') {
      FloatDock.setCartCount(logged ? user.cartCount : 0);
    }
  }

  function goLogin(returnUrl) {
    location.href = loginPage() + '?return=' + encodeURIComponent(returnUrl || location.href);
  }

  function guardPage() {
    if (!isLogged()) {
      goLogin();
      return false;
    }
    return true;
  }

  function initTopBar(options) {
    options = options || {};
    var logged = isLogged();
    var user = getUser();
    var initOpts = Object.assign({
      logged: logged,
      userName: user.userName,
      cartCount: logged ? user.cartCount : 0
    }, options);
    delete initOpts.afterLogout;
    if (typeof SiteTopBar !== 'undefined') SiteTopBar.init(initOpts);
    w.openLogin = options.openLogin || function () { goLogin(); };
    w.onTopBarLogout = function () {
      logout();
      if (typeof options.onLogoutClick === 'function') options.onLogoutClick();
      else if (typeof options.afterLogout === 'function') options.afterLogout();
      else if (options.afterLogout !== false) {
        location.href = (w.ProtoPages && w.ProtoPages.home) || '01.首页-原型页面.html';
      }
    };
    return logged;
  }

  function guardAction(fn) {
    return function () {
      if (!isLogged()) {
        goLogin();
        return;
      }
      return fn.apply(this, arguments);
    };
  }

  w.ProtoAuth = {
    isLogged: isLogged,
    getUser: getUser,
    login: login,
    logout: logout,
    syncTopBar: syncTopBar,
    goLogin: goLogin,
    guardPage: guardPage,
    initTopBar: initTopBar,
    guardAction: guardAction,
    isDemoMode: function () { return DEMO_ALWAYS_LOGGED; }
  };
  if (!w.openLogin) w.openLogin = function () { goLogin(); };
})(window);
