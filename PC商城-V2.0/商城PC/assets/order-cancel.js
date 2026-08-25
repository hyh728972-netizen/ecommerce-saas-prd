(function (w) {
  var REASONS = [
    '不想要了',
    '商品选错/多选',
    '地址填错了',
    '商品价格较贵',
    '支付方式有误',
    '发货时间问题',
    '其他原因'
  ];

  var state = { orderId: null, onConfirm: null, reason: REASONS[0] };

  function ensureMounted() {
    if (document.getElementById('orderCancelRoot')) return;
    var root = document.createElement('div');
    root.id = 'orderCancelRoot';
    root.innerHTML =
      '<div class="order-cancel-overlay" id="orderCancelOverlay">' +
      '<div class="order-cancel-modal">' +
      '<div class="order-cancel-hd"><h3>取消订单</h3><button type="button" class="order-cancel-close" id="orderCancelClose" data-proto-icon="close" data-icon-size="18"></button></div>' +
      '<div class="order-cancel-bd">' +
      '<div class="order-cancel-tip">请选择取消原因，取消后库存将释放</div>' +
      '<div class="order-cancel-reasons" id="orderCancelReasons"></div>' +
      '<div class="order-cancel-note"><label>补充说明（选填）</label><textarea id="orderCancelNote" maxlength="200" placeholder="请描述具体情况"></textarea></div>' +
      '</div>' +
      '<div class="order-cancel-ft">' +
      '<button type="button" class="order-cancel-back" id="orderCancelBack">返回</button>' +
      '<button type="button" class="order-cancel-confirm" id="orderCancelConfirm">确认取消</button>' +
      '</div></div></div>';
    document.body.appendChild(root);
    if (w.ProtoIcon) w.ProtoIcon.mount(root);

    document.getElementById('orderCancelReasons').innerHTML = REASONS.map(function (r, i) {
      return '<label class="order-cancel-reason' + (i === 0 ? ' checked' : '') + '">' +
        '<input type="radio" name="cancelReason" value="' + r + '"' + (i === 0 ? ' checked' : '') + '> ' + r + '</label>';
    }).join('');

    document.querySelectorAll('.order-cancel-reason').forEach(function (el) {
      el.onclick = function () {
        document.querySelectorAll('.order-cancel-reason').forEach(function (x) { x.classList.remove('checked'); });
        el.classList.add('checked');
        el.querySelector('input').checked = true;
        state.reason = el.querySelector('input').value;
      };
    });

    document.getElementById('orderCancelClose').onclick = close;
    document.getElementById('orderCancelBack').onclick = close;
    document.getElementById('orderCancelConfirm').onclick = function () {
      var note = document.getElementById('orderCancelNote').value.trim();
      var id = state.orderId;
      var cb = state.onConfirm;
      close();
      if (cb) cb(state.reason, note, id);
    };
    document.getElementById('orderCancelOverlay').onclick = function (e) {
      if (e.target.id === 'orderCancelOverlay') close();
    };
  }

  function close() {
    var el = document.getElementById('orderCancelOverlay');
    if (el) el.classList.remove('active');
    state.orderId = null;
    state.onConfirm = null;
    state.reason = REASONS[0];
    var note = document.getElementById('orderCancelNote');
    if (note) note.value = '';
    document.querySelectorAll('.order-cancel-reason').forEach(function (x, i) {
      x.classList.toggle('checked', i === 0);
      var inp = x.querySelector('input');
      if (inp) inp.checked = i === 0;
    });
  }

  w.OrderCancel = {
    open: function (orderId, onConfirm) {
      ensureMounted();
      state.orderId = orderId;
      state.onConfirm = onConfirm;
      state.reason = REASONS[0];
      document.getElementById('orderCancelOverlay').classList.add('active');
    },
    close: close
  };
})(window);
