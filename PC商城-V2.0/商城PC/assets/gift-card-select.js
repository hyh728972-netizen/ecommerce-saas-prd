(function (w) {
  // 礼品卡数据（元为单位；含可用 + 不可用，与小程序 16 号页保持一致）
  // 注：用尽/过期的卡不进入下单选择页（仅在「我的卡包」展示）；此处不可用项均为「适用范围不满足」
  // 可多选：多张卡余额累加抵扣；与优惠券互斥；可与苏银豆叠加。
  var GIFT_CARDS = [
    { id: 'gcv1', val: '¥150', title: '苏银豆商城·全场通用礼品卡', desc: '全场实物商品通用 · 面值¥300 · 余额¥150.00 · 2027-08-31到期', remain: 150, total: 300 },
    { id: 'gcv2', val: '¥80', title: '新人专享·全场通用礼品卡', desc: '全场实物商品通用 · 面值¥200 · 余额¥80.00 · 2027-07-31到期', remain: 80, total: 200 },
    { id: 'gcv3', val: '¥380', title: '蛋糕叔叔·联名礼品卡', desc: '限蛋糕叔叔品牌商品 · 面值¥500 · 余额¥380.00 · 2027-06-30到期', remain: 380, total: 500, disabledReason: '适用范围不满足' },
    { id: 'gcv4', val: '¥200', title: '星巴克·联名礼品卡', desc: '限星巴克品牌商品 · 面值¥300 · 余额¥200.00 · 2027-05-31到期', remain: 200, total: 300, disabledReason: '适用范围不满足' }
  ];

  // 多选：tempIds / selectedIds 均为 id 数组
  var state = { selectedIds: [], orderAmount: 0, onConfirm: null, tempIds: [] };

  function ensureMounted() {
    if (document.getElementById('giftCardSelectRoot')) return;
    var root = document.createElement('div');
    root.id = 'giftCardSelectRoot';
    root.innerHTML =
      '<div class="coupon-select-overlay" id="giftCardSelectOverlay">' +
      '<div class="coupon-select-modal">' +
      '<div class="coupon-select-hd"><h3>选择礼品卡</h3><button type="button" class="coupon-select-close" id="giftCardSelectClose" data-proto-icon="close" data-icon-size="18"></button></div>' +
      '<div class="coupon-select-bd" id="giftCardSelectList"></div>' +
      '<div class="coupon-select-ft"><button type="button" class="coupon-select-confirm" id="giftCardSelectConfirm">确定</button></div>' +
      '</div></div>';
    document.body.appendChild(root);
    if (w.ProtoIcon) w.ProtoIcon.mount(root);

    document.getElementById('giftCardSelectClose').onclick = close;
    document.getElementById('giftCardSelectConfirm').onclick = confirmPick;
    document.getElementById('giftCardSelectOverlay').onclick = function (e) {
      if (e.target.id === 'giftCardSelectOverlay') close();
    };
  }

  function isUsable(c) {
    return c.remain > 0 && !c.disabledReason;
  }

  function getCard(id) {
    if (!id) return null;
    for (var i = 0; i < GIFT_CARDS.length; i++) {
      if (GIFT_CARDS[i].id === id) return GIFT_CARDS[i];
    }
    return null;
  }

  function renderList() {
    var el = document.getElementById('giftCardSelectList');
    if (!el) return;
    var noneActive = state.tempIds.length === 0;
    el.innerHTML =
      '<div class="coupon-select-none' + (noneActive ? ' active' : '') + '" data-id="">不使用礼品卡</div>' +
      GIFT_CARDS.map(function (c) {
        var ok = isUsable(c);
        var active = state.tempIds.indexOf(c.id) >= 0;
        var deduct = ok ? Math.min(c.remain, state.orderAmount) : 0;
        return '<div class="coupon-select-item' + (active ? ' active' : '') + (ok ? '' : ' disabled') + '" data-id="' + c.id + '">' +
          '<div class="coupon-select-radio"></div>' +
          '<div class="coupon-select-val">' + c.val + '</div>' +
          '<div class="coupon-select-info"><h4>' + c.title + '</h4><p>' + c.desc +
          (!ok ? ' · ' + c.disabledReason : (state.orderAmount > 0 ? ' · 本单可抵¥' + deduct.toFixed(2) : '')) +
          '</p></div></div>';
      }).join('');

    el.querySelector('.coupon-select-none').onclick = function () {
      state.tempIds = [];
      renderList();
    };
    el.querySelectorAll('.coupon-select-item:not(.disabled)').forEach(function (item) {
      item.onclick = function () {
        var id = item.dataset.id;
        var idx = state.tempIds.indexOf(id);
        if (idx >= 0) state.tempIds.splice(idx, 1);
        else state.tempIds.push(id);
        renderList();
      };
    });
  }

  function close() {
    var el = document.getElementById('giftCardSelectOverlay');
    if (el) el.classList.remove('active');
    state.onConfirm = null;
  }

  function confirmPick() {
    state.selectedIds = state.tempIds.slice();
    var picked = state.selectedIds.map(function (id) {
      var c = getCard(id);
      return c ? { id: c.id, name: c.title, remain: c.remain } : null;
    }).filter(Boolean);
    var cb = state.onConfirm;
    close();
    if (cb) cb(picked);
  }

  w.GiftCardSelect = {
    usableCount: function () {
      return GIFT_CARDS.filter(isUsable).length;
    },
    getSelected: function () {
      return state.selectedIds.map(function (id) {
        var c = getCard(id);
        return c ? { id: c.id, name: c.title, remain: c.remain } : null;
      }).filter(Boolean);
    },
    setSelected: function (cards) {
      state.selectedIds = Array.isArray(cards) ? cards.map(function (c) { return c.id; }) : [];
    },
    open: function (orderAmount, onConfirm) {
      ensureMounted();
      state.orderAmount = orderAmount || 0;
      state.onConfirm = onConfirm;
      state.tempIds = state.selectedIds.slice();
      renderList();
      document.getElementById('giftCardSelectOverlay').classList.add('active');
    },
    close: close
  };
})(window);
