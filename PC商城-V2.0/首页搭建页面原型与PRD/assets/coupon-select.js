(function (w) {
  var COUPONS = [
    { id: 'c1', val: '¥100', title: '满2000减100', desc: '全场通用 · 2026-09-30到期', discount: 100, min: 2000 },
    { id: 'c2', val: '¥30', title: '满500减30', desc: '指定品类 · 2026-08-15到期', discount: 30, min: 500 },
    { id: 'c3', val: '9.5折', title: '9.5折券', desc: '最高减100 · 2026-07-31到期', discount: 50, min: 0 },
    { id: 'c4', val: '¥200', title: '满5000减200', desc: '全场通用 · 2026-11-30到期', discount: 200, min: 5000 },
    { id: 'c5', val: '¥500', title: '满10000减500', desc: '全场通用 · 2026-12-31到期', discount: 500, min: 10000 },
    { id: 'c6', val: '¥150', title: '数码专场·满8000减150', desc: '限数码品类 · 2026-09-30到期', discount: 150, min: 8000 }
  ];

  var state = { selectedId: 'c1', orderAmount: 0, onConfirm: null, tempId: null };

  function ensureMounted() {
    if (document.getElementById('couponSelectRoot')) return;
    var root = document.createElement('div');
    root.id = 'couponSelectRoot';
    root.innerHTML =
      '<div class="coupon-select-overlay" id="couponSelectOverlay">' +
      '<div class="coupon-select-modal">' +
      '<div class="coupon-select-hd"><h3>选择优惠券</h3><button type="button" class="coupon-select-close" id="couponSelectClose" data-proto-icon="close" data-icon-size="18"></button></div>' +
      '<div class="coupon-select-bd" id="couponSelectList"></div>' +
      '<div class="coupon-select-ft"><button type="button" class="coupon-select-confirm" id="couponSelectConfirm">确定</button></div>' +
      '</div></div>';
    document.body.appendChild(root);
    if (w.ProtoIcon) w.ProtoIcon.mount(root);

    document.getElementById('couponSelectClose').onclick = close;
    document.getElementById('couponSelectConfirm').onclick = confirmPick;
    document.getElementById('couponSelectOverlay').onclick = function (e) {
      if (e.target.id === 'couponSelectOverlay') close();
    };
  }

  function isUsable(c) {
    return state.orderAmount >= c.min;
  }

  function renderList() {
    var el = document.getElementById('couponSelectList');
    if (!el) return;
    var noneActive = state.tempId === null;
    el.innerHTML =
      '<div class="coupon-select-none' + (noneActive ? ' active' : '') + '" data-id="">不使用优惠券</div>' +
      COUPONS.map(function (c) {
        var ok = isUsable(c);
        var active = state.tempId === c.id;
        return '<div class="coupon-select-item' + (active ? ' active' : '') + (ok ? '' : ' disabled') + '" data-id="' + c.id + '">' +
          '<div class="coupon-select-radio"></div>' +
          '<div class="coupon-select-val">' + c.val + '</div>' +
          '<div class="coupon-select-info"><h4>' + c.title + '</h4><p>' + c.desc +
          (ok ? '' : ' · 未满足使用门槛') + '</p></div></div>';
      }).join('');

    el.querySelector('.coupon-select-none').onclick = function () {
      state.tempId = null;
      renderList();
    };
    el.querySelectorAll('.coupon-select-item:not(.disabled)').forEach(function (item) {
      item.onclick = function () {
        state.tempId = item.dataset.id;
        renderList();
      };
    });
  }

  function getCoupon(id) {
    if (!id) return null;
    for (var i = 0; i < COUPONS.length; i++) {
      if (COUPONS[i].id === id) return COUPONS[i];
    }
    return null;
  }

  function close() {
    var el = document.getElementById('couponSelectOverlay');
    if (el) el.classList.remove('active');
    state.onConfirm = null;
  }

  function confirmPick() {
    state.selectedId = state.tempId;
    var coupon = getCoupon(state.selectedId);
    var cb = state.onConfirm;
    close();
    if (cb) cb(coupon);
  }

  w.CouponSelect = {
    usableCount: function (orderAmount) {
      var amt = orderAmount || 0;
      return COUPONS.filter(function (c) { return amt >= c.min; }).length;
    },
    getSelected: function () {
      return getCoupon(state.selectedId);
    },
    setSelected: function (coupon) {
      state.selectedId = coupon ? coupon.id : null;
    },
    open: function (orderAmount, onConfirm) {
      ensureMounted();
      state.orderAmount = orderAmount || 0;
      state.onConfirm = onConfirm;
      state.tempId = state.selectedId;
      renderList();
      document.getElementById('couponSelectOverlay').classList.add('active');
    },
    close: close
  };
})(window);
