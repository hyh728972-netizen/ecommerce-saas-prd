(function (w) {
  var ADDRESSES = [
    { id: 1, name: '张经理', phone: '13812348888', region: '江苏省 南京市 建邺区', detail: '江东中路369号 新华报业传媒广场 1号楼', isDefault: true },
    { id: 2, name: '张经理', phone: '13812348888', region: '江苏省 苏州市 工业园区', detail: '星湖街328号 创意产业园 A座', isDefault: false },
    { id: 3, name: '李主管', phone: '13912345678', region: '北京 北京市 朝阳区', detail: '望京街道 望京SOHO T1 15层', isDefault: false },
    { id: 4, name: '王专员', phone: '13612345678', region: '上海 上海市 浦东新区', detail: '陆家嘴街道 世纪大道100号', isDefault: false },
    { id: 5, name: '赵组长', phone: '13712345678', region: '广东 深圳市 南山区', detail: '粤海街道 科技园路1号', isDefault: false }
  ];

  var state = { selectedId: 1, onConfirm: null, tempId: null };

  function ensureMounted() {
    if (document.getElementById('addressSelectRoot')) return;
    var root = document.createElement('div');
    root.id = 'addressSelectRoot';
    root.innerHTML =
      '<div class="address-select-overlay" id="addressSelectOverlay">' +
      '<div class="address-select-modal">' +
      '<div class="address-select-hd"><h3>选择收货地址</h3><button type="button" class="address-select-close" id="addressSelectClose" data-proto-icon="close" data-icon-size="18"></button></div>' +
      '<div class="address-select-bd" id="addressSelectList"></div>' +
      '<div class="address-select-ft">' +
      '<a class="address-select-manage" id="addressSelectManage" href="' + ((w.ProtoPages && w.ProtoPages.address) || '21.收货地址-原型页面.html') + '">管理地址</a>' +
      '<button type="button" class="address-select-confirm" id="addressSelectConfirm">使用该地址</button>' +
      '</div></div></div>';
    document.body.appendChild(root);
    if (w.ProtoIcon) w.ProtoIcon.mount(root);

    document.getElementById('addressSelectClose').onclick = close;
    document.getElementById('addressSelectConfirm').onclick = confirmPick;
    document.getElementById('addressSelectOverlay').onclick = function (e) {
      if (e.target.id === 'addressSelectOverlay') close();
    };
  }

  function maskPhone(phone) {
    return String(phone).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  }

  function getById(id) {
    for (var i = 0; i < ADDRESSES.length; i++) {
      if (ADDRESSES[i].id === id) return ADDRESSES[i];
    }
    return ADDRESSES[0];
  }

  function toView(a) {
    if (!a) return { name: '', phone: '', addr: '', isDefault: false };
    return {
      name: a.name,
      phone: maskPhone(a.phone),
      addr: a.region + ' ' + a.detail,
      isDefault: !!a.isDefault
    };
  }

  function renderList() {
    var el = document.getElementById('addressSelectList');
    if (!el) return;
    el.innerHTML = ADDRESSES.map(function (a) {
      var active = state.tempId === a.id;
      return '<div class="address-select-item' + (active ? ' active' : '') + '" data-id="' + a.id + '">' +
        '<div class="address-select-radio"></div>' +
        '<div class="address-select-body">' +
        '<div class="address-select-name">' + a.name + ' <em>' + maskPhone(a.phone) + '</em>' +
        (a.isDefault ? '<span class="address-select-tag">默认</span>' : '') + '</div>' +
        '<div class="address-select-detail">' + a.region + ' ' + a.detail + '</div>' +
        '</div></div>';
    }).join('');

    el.querySelectorAll('.address-select-item').forEach(function (item) {
      item.onclick = function () {
        state.tempId = +item.dataset.id;
        renderList();
      };
    });
  }

  function close() {
    var el = document.getElementById('addressSelectOverlay');
    if (el) el.classList.remove('active');
    state.onConfirm = null;
  }

  function confirmPick() {
    state.selectedId = state.tempId;
    var cb = state.onConfirm;
    close();
    if (cb) cb(toView(getById(state.selectedId)));
  }

  w.AddressSelect = {
    getSelectedId: function () {
      return state.selectedId;
    },
    getSelected: function () {
      return toView(getById(state.selectedId));
    },
    open: function (onConfirm) {
      ensureMounted();
      state.onConfirm = onConfirm;
      state.tempId = state.selectedId;
      renderList();
      document.getElementById('addressSelectOverlay').classList.add('active');
    },
    close: close
  };
})(window);
