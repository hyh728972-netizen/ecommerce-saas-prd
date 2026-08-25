(function (w) {
  var history = [
    { type: '满减券', secret: '****8821', time: '2026-06-01 10:20', result: '满200减20' },
    { type: '优惠券', secret: '****3390', time: '2026-05-18 16:45', result: '¥10优惠券' }
  ];

  var state = { couponType: '', onConfirm: null };

  function ensureMounted() {
    if (document.getElementById('couponBindRoot')) return;
    var root = document.createElement('div');
    root.id = 'couponBindRoot';
    root.innerHTML =
      '<div class="coupon-bind-overlay" id="couponBindOverlay">' +
      '<div class="coupon-bind-modal">' +
      '<div class="coupon-bind-hd"><h3>卡密兑换</h3><button type="button" class="coupon-bind-close" id="couponBindClose" data-proto-icon="close" data-icon-size="18"></button></div>' +
      '<div class="coupon-bind-bd">' +
      '<div class="coupon-bind-tip">输入卡密即可兑换，系统自动识别类型：识别为卡券则进入卡券中心，识别为积分卡则充入苏银豆</div>' +
      '<div class="coupon-bind-row"><label><em>*</em>卡密</label><input type="text" id="couponBindSecret" placeholder="请输入卡密" maxlength="32"></div>' +
      '<div class="coupon-bind-row" id="couponBindDetectRow"><label>识别类型</label><div class="coupon-bind-detect pending" id="couponBindDetect">请输入卡密后自动识别</div></div>' +
      '<div class="coupon-bind-history"><div class="coupon-bind-history-hd">绑定历史</div><div id="couponBindHistory"></div></div>' +
      '</div>' +
      '<div class="coupon-bind-ft">' +
      '<button type="button" class="coupon-bind-back" id="couponBindBack">取消</button>' +
      '<button type="button" class="coupon-bind-confirm" id="couponBindConfirm">立即兑换</button>' +
      '</div></div></div>';
    document.body.appendChild(root);
    if (w.ProtoIcon) w.ProtoIcon.mount(root);

    document.getElementById('couponBindSecret').oninput = updateDetectPreview;
    document.getElementById('couponBindClose').onclick = close;
    document.getElementById('couponBindBack').onclick = close;
    document.getElementById('couponBindConfirm').onclick = submit;
    document.getElementById('couponBindOverlay').onclick = function (e) {
      if (e.target.id === 'couponBindOverlay') close();
    };
  }

  function detectType(secret) {
    var s = (secret || '').trim().toUpperCase();
    if (!s) return '';
    if (/^MJ/.test(s)) return '满减券';
    if (/^ZK/.test(s)) return '折扣券';
    if (/^JF|^SY/.test(s)) return '积分卡';
    if (/^MV|^DY/.test(s)) return '电影次卡';
    if (/^LP|^GIFT/.test(s)) return '礼品卡';
    return '优惠券';
  }

  function updateDetectPreview() {
    var el = document.getElementById('couponBindDetect');
    if (!el) return;
    var secret = document.getElementById('couponBindSecret').value.trim();
    var type = detectType(secret);
    state.couponType = type;
    if (!secret) {
      el.textContent = '请输入卡密后自动识别';
      el.className = 'coupon-bind-detect pending';
      return;
    }
    el.textContent = type;
    el.className = 'coupon-bind-detect';
  }

  function renderHistory() {
    var el = document.getElementById('couponBindHistory');
    if (!el) return;
    if (!history.length) {
      el.innerHTML = '<div class="coupon-bind-history-item" style="color:#999">暂无绑定记录</div>';
      return;
    }
    el.innerHTML = history.slice(0, 5).map(function (h) {
      return '<div class="coupon-bind-history-item">' + h.result + ' · ' + h.type +
        '<span>' + h.secret + ' · ' + h.time + '</span></div>';
    }).join('');
  }

  function maskSecret(secret) {
    if (secret.length <= 4) return '****';
    return '****' + secret.slice(-4);
  }

  function mockCoupon(type) {
    var map = {
      '优惠券': { n: '¥30优惠券', d: '满200可用', e: '2026-09-30' },
      '满减券': { n: '满300减30', d: '全场通用', e: '2026-08-31' },
      '折扣券': { n: '9.5折券', d: '指定品类 最高减100', e: '2026-08-15' },
      '积分卡': { n: '5000苏银豆', d: '绑定后直充账户', e: '2026-12-31' },
      '电影次卡': { n: '电影次卡×2', d: '全国通用', e: '2026-10-01' },
      '礼品卡': { n: '¥200礼品卡', d: '蛋糕叔叔品牌通用', e: '2027-07-15' }
    };
    return map[type] || { n: '新卡券', d: '绑定成功', e: '2026-12-31' };
  }

  function isPointsType(type) {
    return type === '积分卡';
  }

  function parsePointsAmount(coupon) {
    var m = (coupon.n || '').match(/([\d,]+)/);
    return m ? parseInt(m[1].replace(/,/g, ''), 10) : 5000;
  }

  function routeAfterBind(coupon, meta) {
    var payload = {
      action: isPointsType(meta.type) ? 'points' : 'coupon',
      coupon: coupon,
      meta: meta,
      amount: isPointsType(meta.type) ? parsePointsAmount(coupon) : 0
    };
    sessionStorage.setItem('couponBindResult', JSON.stringify(payload));
    if (payload.action === 'points') {
      location.href = (w.ProtoPages && w.ProtoPages.points) || '17.积分中心-原型页面.html';
    } else {
      location.href = (w.ProtoPages && w.ProtoPages.coupons) || '18.我的卡券-原型页面.html';
    }
  }

  function consumeBindResult() {
    var raw = sessionStorage.getItem('couponBindResult');
    if (!raw) return null;
    sessionStorage.removeItem('couponBindResult');
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  function close() {
    var el = document.getElementById('couponBindOverlay');
    if (el) el.classList.remove('active');
    state.onConfirm = null;
    state.couponType = '';
    var secret = document.getElementById('couponBindSecret');
    if (secret) secret.value = '';
    updateDetectPreview();
  }

  function submit() {
    var secret = document.getElementById('couponBindSecret').value.trim();
    if (!secret) {
      alert('请输入卡密');
      return;
    }
    var type = detectType(secret);
    if (!type) {
      alert('无法识别卡券类型，请检查卡密是否正确');
      return;
    }
    var coupon = mockCoupon(type);
    history.unshift({
      type: type,
      secret: maskSecret(secret),
      time: '2026-06-15 12:00',
      result: coupon.n
    });
    renderHistory();
    close();
    routeAfterBind(coupon, { type: type, secret: secret });
  }

  w.CouponBind = {
    open: function () {
      ensureMounted();
      state.onConfirm = null;
      updateDetectPreview();
      renderHistory();
      document.getElementById('couponBindOverlay').classList.add('active');
      document.getElementById('couponBindSecret').focus();
    },
    close: close,
    consumeBindResult: consumeBindResult,
    routeAfterBind: routeAfterBind
  };
})(window);
