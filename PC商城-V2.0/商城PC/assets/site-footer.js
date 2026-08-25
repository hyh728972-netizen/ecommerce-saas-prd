(function (w) {
  var PP = w.ProtoPages || {};
  var P = {
    search: PP.search || '04.搜索分类页-原型页面.html',
    order: PP.order || '10.订单页-原型页面.html',
    points: PP.points || '17.积分中心-原型页面.html',
    coupons: PP.coupons || '18.我的卡券-原型页面.html',
    refund: PP.refund || '12.售后记录-原型页面.html',
    help: PP.help || '24.帮助中心-原型页面.html',
    login: PP.login || '27.登录-原型页面.html'
  };
  var H = P.help;
  var TBD = 'data-footer-tbd';

  var HTML =
    '<footer class="footer"><div class="container">' +
    '<div class="footer-grid">' +
    '<div class="footer-col"><h4>购物指南</h4>' +
    '<a href="' + P.login + '">账号登录</a>' +
    '<a href="' + H + '#help-shop">购物流程</a>' +
    '<a href="' + P.search + '">搜索商品</a></div>' +
    '<div class="footer-col"><h4>配送说明</h4>' +
    '<a href="' + H + '#help-shop">配送范围</a>' +
    '<a href="' + H + '#help-shop">配送时效</a>' +
    '<a href="' + H + '#help-shop">验货签收</a></div>' +
    '<div class="footer-col"><h4>售后服务</h4>' +
    '<a href="' + H + '#help-refund">退换货政策</a>' +
    '<a href="' + H + '#help-refund">退款说明</a>' +
    '<a href="' + P.refund + '">售后流程</a></div>' +
    '<div class="footer-col"><h4>积分卡券</h4>' +
    '<a href="' + H + '#help-beans">积分规则</a>' +
    '<a href="' + H + '#help-coupon">卡券使用</a>' +
    '<a href="' + P.points + '">积分明细</a></div>' +
    '<div class="footer-col"><h4>关于我们</h4>' +
    '<a href="#" ' + TBD + '>公司介绍</a>' +
    '<a href="#" ' + TBD + '>联系我们</a>' +
    '<a href="#" ' + TBD + '>合作伙伴</a></div>' +
    '<div class="footer-col"><h4>帮助中心</h4>' +
    '<a href="' + H + '">常见问题</a>' +
    '<a href="#" data-cs-open>在线客服</a>' +
    '<a href="#">隐私政策</a></div>' +
    '</div>' +
    '<div class="footer-bottom">' +
    '<a href="#">用户协议</a> | <a href="#">隐私政策</a> | <a href="#" ' + TBD + '>关于苏银豆</a>' +
    '<br>© 2026 苏银豆商城 版权所有 | 苏ICP备XXXXXXXX号' +
    '</div></div></footer>';

  function ensureScript(id, src, cb) {
    if (id === 'proto-toast-js' && w.ProtoToast) {
      if (cb) cb();
      return;
    }
    if (document.getElementById(id)) {
      if (cb) cb();
      return;
    }
    var s = document.createElement('script');
    s.id = id;
    s.src = src;
    s.onload = function () { if (cb) cb(); };
    document.body.appendChild(s);
  }

  function ensureCsWidget() {
    ensureScript('cs-widget-js', '../assets/cs-widget.js');
  }

  function ensureToastAssets(cb) {
    if (!document.getElementById('proto-toast-css')) {
      var link = document.createElement('link');
      link.id = 'proto-toast-css';
      link.rel = 'stylesheet';
      link.href = '../assets/proto-toast.css';
      document.head.appendChild(link);
    }
    if (w.ProtoToast) {
      if (cb) cb();
      return;
    }
    ensureScript('proto-toast-js', '../assets/proto-toast.js', cb);
  }

  function showTbd(e) {
    e.preventDefault();
    if (w.ProtoToast) w.ProtoToast.info('正在开发，敬请期待');
    else window.alert('正在开发，敬请期待');
  }

  function bindTbdLinks(root) {
    if (!root) return;
    root.querySelectorAll('[' + TBD + ']').forEach(function (a) {
      a.addEventListener('click', showTbd);
    });
  }

  w.SiteFooter = {
    mount: function (rootId) {
      var el = document.getElementById(rootId || 'site-footer-root');
      if (!el) return;
      el.outerHTML = HTML;
      ensureCsWidget();
      var footer = document.querySelector('.footer');
      ensureToastAssets(function () {
        bindTbdLinks(footer);
      });
    }
  };

  if (document.getElementById('site-footer-root')) {
    w.SiteFooter.mount();
  }
})(window);
