(function (w) {
  var REASONS = [
    '不想要了',
    '商品质量问题',
    '商品与描述不符',
    '收到商品少件/破损',
    '发错货',
    '其他原因'
  ];

  var EXCHANGE_REASONS = [
    '尺码不合适',
    '颜色/款式不对',
    '商品质量问题',
    '收到商品少件/破损',
    '发错货',
    '其他原因'
  ];

  var list = [
    {
      id: 'RF202606140001',
      orderId: 'SY202606140089',
      type: 'return_refund',
      typeLabel: '退货退款',
      status: 'shipping',
      statusLabel: '待退货',
      amount: 2299,
      beans: 0,
      reason: '商品与描述不符',
      applyTime: '2026-06-14 18:20',
      item: { name: '索尼 WH-1000XM5 头戴耳机', spec: '黑色', qty: 1, price: 2299, imgKey: 'p31' },
      tracks: [
        { title: '请寄回商品', desc: '请在 6 月 18 日前填写退货物流单号', time: '2026-06-15 10:00', active: true },
        { title: '商家同意退货', desc: '退货地址：江苏省南京市建邺区江东中路369号 售后仓', time: '2026-06-15 09:30', active: false },
        { title: '商家审核通过', desc: '您的退货退款申请已通过', time: '2026-06-14 20:15', active: false },
        { title: '提交申请', desc: '原因：商品与描述不符', time: '2026-06-14 18:20', active: false }
      ],
      returnAddr: '江苏省南京市建邺区江东中路369号 苏银豆售后仓（收） 400-888-6688'
    },
    {
      id: 'RF202606120002',
      orderId: 'SY202606120033',
      type: 'refund_only',
      typeLabel: '仅退款',
      status: 'pending',
      statusLabel: '商家处理中',
      amount: 399,
      beans: 3990,
      reason: '不想要了',
      applyTime: '2026-06-12 15:40',
      item: { name: "Levi's 501 经典直筒牛仔裤", spec: '32码 深蓝', qty: 1, price: 399, imgKey: 'pants' },
      tracks: [
        { title: '商家处理中', desc: '商家将在 48 小时内处理您的申请', time: '2026-06-12 15:40', active: true },
        { title: '提交申请', desc: '原因：不想要了', time: '2026-06-12 15:40', active: false }
      ]
    },
    {
      id: 'RF202606080003',
      orderId: 'SY202606080015',
      type: 'return_refund',
      typeLabel: '退货退款',
      status: 'refunded',
      statusLabel: '退款成功',
      amount: 299,
      beans: 3000,
      reason: '商品质量问题',
      applyTime: '2026-06-08 16:00',
      refundTime: '2026-06-10 11:20',
      item: { name: '飞利浦 电动牙刷 HX9911', spec: '星空蓝', qty: 1, price: 599, imgKey: 'skincare' },
      tracks: [
        { title: '退款成功', desc: '¥299 已原路退回，3000 苏银豆已退回账户', time: '2026-06-10 11:20', active: true },
        { title: '商家确认收货', desc: '退货商品已入库检验', time: '2026-06-09 14:05', active: false },
        { title: '买家已退货', desc: '顺丰 SF9988776655443', time: '2026-06-08 19:30', active: false },
        { title: '商家同意退货', desc: '请按地址寄回商品', time: '2026-06-08 17:10', active: false },
        { title: '提交申请', desc: '原因：商品质量问题', time: '2026-06-08 16:00', active: false }
      ]
    },
    {
      id: 'RF202606090005',
      orderId: 'SY202606130055',
      type: 'exchange',
      typeLabel: '换货',
      status: 'shipping',
      statusLabel: '待您寄回',
      amount: 0,
      beans: 0,
      reason: '尺码不合适',
      applyTime: '2026-06-09 11:20',
      exchangeTarget: '黑色 · 同款换新',
      item: { name: '索尼 WH-1000XM5 头戴耳机', spec: '黑色', qty: 1, price: 2299, imgKey: 'p31' },
      tracks: [
        { title: '请寄回商品', desc: '请在 6 月 13 日前填写寄回物流单号，商家签收后将发出换货商品', time: '2026-06-10 09:00', active: true },
        { title: '商家同意换货', desc: '请按地址寄回原商品，换货商品为同款黑色', time: '2026-06-10 08:30', active: false },
        { title: '提交换货申请', desc: '原因：尺码不合适', time: '2026-06-09 11:20', active: false }
      ],
      returnAddr: '江苏省南京市建邺区江东中路369号 苏银豆售后仓（收） 400-888-6688'
    },
    {
      id: 'RF202605200004',
      orderId: 'SY202605280007',
      type: 'refund_only',
      typeLabel: '仅退款',
      status: 'closed',
      statusLabel: '已关闭',
      amount: 899,
      beans: 0,
      reason: '不想要了',
      applyTime: '2026-05-20 09:00',
      item: { name: '某款限量礼盒', spec: '标准装', qty: 1, price: 899, imgKey: 'cake' },
      tracks: [
        { title: '申请已撤销', desc: '您已主动撤销售后申请', time: '2026-05-21 08:00', active: true },
        { title: '提交申请', desc: '原因：不想要了', time: '2026-05-20 09:00', active: false }
      ]
    }
  ];

  function nowStr() {
    var d = new Date();
    var p = function (n) { return String(n).padStart(2, '0'); };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }

  function typeMeta(type) {
    if (type === 'exchange') return { typeLabel: '换货', needReturn: true };
    if (type === 'refund_only') return { typeLabel: '仅退款', needReturn: false };
    return { typeLabel: '退货退款', needReturn: true };
  }

  w.RefundMock = {
    reasons: REASONS,
    exchangeReasons: EXCHANGE_REASONS,
    all: function () { return list.slice(); },
    get: function (id) { return list.find(function (r) { return r.id === id; }) || list[0]; },
    byTab: function (tab) {
      if (tab === 'all') return list.slice();
      if (tab === 'pending') return list.filter(function (r) { return r.status === 'pending' || r.status === 'shipping' || r.status === 'exchanging' || r.status === 'approved'; });
      if (tab === 'done') return list.filter(function (r) { return r.status === 'refunded' || r.status === 'exchanged'; });
      if (tab === 'closed') return list.filter(function (r) { return r.status === 'closed' || r.status === 'rejected'; });
      return list.slice();
    },
    create: function (opts) {
      var meta = typeMeta(opts.type);
      var ts = nowStr();
      var id = 'RF' + Date.now();
      var tracks = [
        { title: '商家处理中', desc: meta.typeLabel + '申请已提交，商家将在 48 小时内处理', time: ts, active: true },
        { title: '提交申请', desc: '原因：' + (opts.reason || ''), time: ts, active: false }
      ];
      var r = {
        id: id,
        orderId: opts.orderId,
        type: opts.type,
        typeLabel: meta.typeLabel,
        status: 'pending',
        statusLabel: '商家处理中',
        amount: opts.type === 'exchange' ? 0 : (opts.amount || 0),
        beans: opts.beans || 0,
        reason: opts.reason || '',
        applyTime: ts,
        item: opts.item,
        tracks: tracks
      };
      if (meta.needReturn) {
        r.returnAddr = '江苏省南京市建邺区江东中路369号 苏银豆售后仓（收） 400-888-6688';
      }
      if (opts.type === 'exchange') {
        r.exchangeTarget = opts.exchangeTarget || (opts.item.spec + ' · 同款换新');
      }
      list.unshift(r);
      return r;
    },
    submitLogistics: function (id, carrier, no) {
      var r = list.find(function (x) { return x.id === id; });
      if (!r || r.status !== 'shipping') return;
      var ts = nowStr();
      var isExchange = r.type === 'exchange';
      r.tracks.forEach(function (t) { t.active = false; });
      r.tracks.unshift({
        title: isExchange ? '买家已寄回' : '买家已退货',
        desc: carrier + ' ' + no,
        time: ts,
        active: true
      });
      var waitTrack = r.tracks.find(function (t) { return t.title === '请寄回商品'; });
      if (waitTrack) waitTrack.title = isExchange ? '等待商家换货发出' : '等待商家确认收货';
      if (isExchange) {
        r.status = 'exchanging';
        r.statusLabel = '换货处理中';
        r.returnLogistics = { carrier: carrier, no: no };
      } else {
        r.statusLabel = '退货运输中';
      }
    },
    revoke: function (id) {
      var r = list.find(function (x) { return x.id === id; });
      if (!r || r.status === 'refunded' || r.status === 'closed' || r.status === 'exchanged') return false;
      r.status = 'closed';
      r.statusLabel = '已撤销';
      r.tracks.forEach(function (t) { t.active = false; });
      r.tracks.unshift({
        title: '申请已撤销',
        desc: '您已主动撤销售后申请',
        time: nowStr(),
        active: true
      });
      return true;
    }
  };
})(window);
