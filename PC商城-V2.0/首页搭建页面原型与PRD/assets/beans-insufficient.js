(function (w) {
  function ensureMounted() {
    if (document.getElementById('beansInsufficientRoot')) return;
    var root = document.createElement('div');
    root.id = 'beansInsufficientRoot';
    root.innerHTML =
      '<div class="beans-insufficient-overlay" id="beansInsufficientOverlay">' +
      '<div class="beans-insufficient-modal">' +
      '<div class="beans-insufficient-hd"><h3>苏银豆不足</h3><button type="button" class="beans-insufficient-close" id="beansInsufficientClose" data-proto-icon="close" data-icon-size="18"></button></div>' +
      '<div class="beans-insufficient-bd">' +
      '<div class="beans-insufficient-tip">本单所需苏银豆超过当前余额，可通过卡密兑换补充积分，或联系企业管理员分配。</div>' +
      '<div class="beans-insufficient-rows" id="beansInsufficientRows"></div>' +
      '<div class="beans-insufficient-ft">' +
      '<button type="button" class="outline" id="beansInsufficientBind">卡密兑换</button>' +
      '<button type="button" class="primary" id="beansInsufficientContact">联系企业</button>' +
      '</div></div></div></div>';
    document.body.appendChild(root);
    if (w.ProtoIcon) w.ProtoIcon.mount(root);
    document.getElementById('beansInsufficientClose').onclick = close;
    document.getElementById('beansInsufficientOverlay').onclick = function (e) {
      if (e.target.id === 'beansInsufficientOverlay') close();
    };
    document.getElementById('beansInsufficientContact').onclick = function () {
      close();
      location.href = (w.ProtoPages && w.ProtoPages.service) || '26.在线客服-原型页面.html';
    };
    document.getElementById('beansInsufficientBind').onclick = function () {
      close();
      if (w.CouponBind) w.CouponBind.open();
      else location.href = (w.ProtoPages && w.ProtoPages.points) || '17.积分中心-原型页面.html';
    };
  }

  function close() {
    var el = document.getElementById('beansInsufficientOverlay');
    if (el) el.classList.remove('active');
  }

  w.BeansInsufficient = {
    open: function (opts) {
      ensureMounted();
      opts = opts || {};
      var need = opts.need || 0;
      var balance = opts.balance || 0;
      var short = Math.max(0, need - balance);
      document.getElementById('beansInsufficientRows').innerHTML =
        '<div class="beans-insufficient-row"><span>所需苏银豆</span><strong>' + need.toLocaleString() + ' 豆</strong></div>' +
        '<div class="beans-insufficient-row"><span>当前余额</span><strong>' + balance.toLocaleString() + ' 豆</strong></div>' +
        '<div class="beans-insufficient-row"><span>还差</span><em>' + short.toLocaleString() + ' 豆</em></div>';
      document.getElementById('beansInsufficientOverlay').classList.add('active');
    },
    close: close
  };
})(window);
