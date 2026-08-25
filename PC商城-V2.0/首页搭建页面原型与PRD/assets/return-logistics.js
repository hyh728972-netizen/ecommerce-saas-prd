(function (w) {
  var CARRIERS = ['顺丰速运', '中通快递', '圆通速递', '韵达快递', '京东物流', '邮政 EMS', '其他'];

  var state = { refundId: null, onConfirm: null };

  function ensureMounted() {
    if (document.getElementById('returnLogisticsRoot')) return;
    var root = document.createElement('div');
    root.id = 'returnLogisticsRoot';
    root.innerHTML =
      '<div class="return-logistics-overlay" id="returnLogisticsOverlay">' +
      '<div class="return-logistics-modal">' +
      '<div class="return-logistics-hd"><h3>填写退货物流</h3><button type="button" class="return-logistics-close" id="returnLogisticsClose" data-proto-icon="close" data-icon-size="18"></button></div>' +
      '<div class="return-logistics-bd">' +
      '<div class="return-logistics-tip" id="returnLogisticsTip">请填写您寄回商品的物流信息，商家签收后将处理退款</div>' +
      '<div class="return-logistics-row"><label><em>*</em>物流公司</label><select id="returnLogisticsCarrier" required></select></div>' +
      '<div class="return-logistics-row"><label><em>*</em>物流单号</label><input type="text" id="returnLogisticsNo" placeholder="请输入快递单号" maxlength="32"></div>' +
      '</div>' +
      '<div class="return-logistics-ft">' +
      '<button type="button" class="return-logistics-back" id="returnLogisticsBack">取消</button>' +
      '<button type="button" class="return-logistics-confirm" id="returnLogisticsConfirm">提交</button>' +
      '</div></div></div>';
    document.body.appendChild(root);
    if (w.ProtoIcon) w.ProtoIcon.mount(root);

    document.getElementById('returnLogisticsCarrier').innerHTML = CARRIERS.map(function (c, i) {
      return '<option value="' + c + '"' + (i === 0 ? ' selected' : '') + '>' + c + '</option>';
    }).join('');

    document.getElementById('returnLogisticsClose').onclick = close;
    document.getElementById('returnLogisticsBack').onclick = close;
    document.getElementById('returnLogisticsConfirm').onclick = submit;
    document.getElementById('returnLogisticsOverlay').onclick = function (e) {
      if (e.target.id === 'returnLogisticsOverlay') close();
    };
  }

  function close() {
    var el = document.getElementById('returnLogisticsOverlay');
    if (el) el.classList.remove('active');
    state.refundId = null;
    state.onConfirm = null;
    var no = document.getElementById('returnLogisticsNo');
    if (no) no.value = '';
    var carrier = document.getElementById('returnLogisticsCarrier');
    if (carrier) carrier.selectedIndex = 0;
  }

  function submit() {
    var carrier = document.getElementById('returnLogisticsCarrier').value;
    var no = document.getElementById('returnLogisticsNo').value.trim();
    if (!no) {
      alert('请填写物流单号');
      return;
    }
    var id = state.refundId;
    var cb = state.onConfirm;
    if (w.RefundMock && w.RefundMock.submitLogistics) {
      w.RefundMock.submitLogistics(id, carrier, no);
    }
    close();
    if (cb) cb(carrier, no, id);
  }

  w.ReturnLogistics = {
    open: function (refundId, onConfirm) {
      ensureMounted();
      state.refundId = refundId;
      state.onConfirm = onConfirm;
      var tip = document.getElementById('returnLogisticsTip');
      var r = w.RefundMock && w.RefundMock.get ? w.RefundMock.get(refundId) : null;
      if (tip) {
        tip.textContent = r && r.type === 'exchange'
          ? '请填写您寄回商品的物流信息，商家签收后将为您发出换货商品'
          : '请填写您寄回商品的物流信息，商家签收后将处理退款';
      }
      var title = document.querySelector('.return-logistics-hd h3');
      if (title) title.textContent = r && r.type === 'exchange' ? '填写寄回物流' : '填写退货物流';
      document.getElementById('returnLogisticsOverlay').classList.add('active');
      document.getElementById('returnLogisticsNo').focus();
    },
    close: close
  };
})(window);
