(function (w) {
  var state = { onConfirm: null };

  function ensureMounted() {
    if (document.getElementById('protoConfirmRoot')) return;
    var root = document.createElement('div');
    root.id = 'protoConfirmRoot';
    root.innerHTML =
      '<div class="proto-confirm-overlay" id="protoConfirmOverlay">' +
      '<div class="proto-confirm-modal">' +
      '<div class="proto-confirm-hd" id="protoConfirmTitle">确认</div>' +
      '<div class="proto-confirm-bd" id="protoConfirmMsg"></div>' +
      '<div class="proto-confirm-ft">' +
      '<button type="button" class="proto-confirm-cancel" id="protoConfirmCancel">取消</button>' +
      '<button type="button" class="proto-confirm-ok" id="protoConfirmOk">确定</button>' +
      '</div></div></div>';
    document.body.appendChild(root);
    document.getElementById('protoConfirmCancel').onclick = close;
    document.getElementById('protoConfirmOk').onclick = function () {
      var cb = state.onConfirm;
      close();
      if (cb) cb();
    };
    document.getElementById('protoConfirmOverlay').onclick = function (e) {
      if (e.target.id === 'protoConfirmOverlay') close();
    };
  }

  function close() {
    var el = document.getElementById('protoConfirmOverlay');
    if (el) el.classList.remove('active');
    state.onConfirm = null;
  }

  w.ProtoConfirm = {
    open: function (opts) {
      ensureMounted();
      opts = opts || {};
      document.getElementById('protoConfirmTitle').textContent = opts.title || '确认';
      document.getElementById('protoConfirmMsg').textContent = opts.message || '';
      var ok = document.getElementById('protoConfirmOk');
      ok.textContent = opts.confirmText || '确定';
      ok.className = 'proto-confirm-ok' + (opts.warn ? ' warn' : '');
      state.onConfirm = opts.onConfirm || null;
      document.getElementById('protoConfirmOverlay').classList.add('active');
    },
    close: close
  };

  w.ConfirmReceive = {
    open: function (onConfirm) {
      ProtoConfirm.open({
        title: '确认收货',
        message: '请确认您已收到全部商品且无质量问题，确认后订单将完成。',
        confirmText: '确认收货',
        warn: true,
        onConfirm: onConfirm
      });
    }
  };

  w.RefundRevoke = {
    open: function (onConfirm) {
      ProtoConfirm.open({
        title: '撤销售后',
        message: '撤销后本次售后申请将关闭，如仍需售后请重新发起。是否确认撤销？',
        confirmText: '确认撤销',
        onConfirm: onConfirm
      });
    }
  };
})(window);
