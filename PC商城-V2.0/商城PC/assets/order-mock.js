(function (w) {
  function item(name, spec, price, qty, imgKey) {
    return { name: name, spec: spec, price: price, qty: qty, imgKey: imgKey };
  }

  var ADDR = { name: '张经理', phone: '138****8888', addr: '江苏省南京市建邺区江东中路369号 新华报业传媒广场 1号楼' };

  var list = [
    {
      id: 'SY202606150001', time: '2026-06-15 10:23', status: 'pay', payType: '组合支付',
      items: [item('OPPO Find X9 5G 旗舰手机', '12GB+256GB 钛色', 4299, 1, 'oppo')],
      address: ADDR, logistics: null,
      goodsAmount: 4299, freight: 0, coupon: 100, beans: 20000, cash: 2299,
      message: '麻烦工作日配送，周末公司没人接收'
    },
    {
      id: 'SY202606140088', time: '2026-06-14 16:45', status: 'recv', payType: '纯积分',
      items: [
        item('Apple AirPods Pro 第三代', '白色', 1899, 1, 'headphone'),
        item('日本进口保温杯 不锈钢真空便携水杯500ml', '白色 500ml', 68, 1, 'p15'),
        item('纯棉短袖T恤男女款 夏季宽松百搭潮流', '白色 L码', 39.9, 1, 'pants')
      ],
      address: ADDR,
      logistics: { carrier: '顺丰速运', no: 'SF1234567890123', eta: '预计 06-17 18:00 前送达', label: '运输中', latest: '【北京市】快件已到达北京朝阳区营业点，正在派送中' },
      goodsAmount: 2006.9, freight: 0, coupon: 0, beans: 20069, cash: 0,
      message: '请放快递柜，谢谢',
      packages: [
        {
          id: 1,
          logistics: { carrier: '顺丰速运', no: 'SF1234567890123', eta: '预计 06-17 18:00 前送达', label: '运输中', latest: '【北京市】快件已到达北京朝阳区营业点，正在派送中', status: 'shipping' },
          items: [
            item('Apple AirPods Pro 第三代', '白色', 1899, 1, 'headphone'),
            item('纯棉短袖T恤男女款 夏季宽松百搭潮流', '白色 L码', 39.9, 1, 'pants')
          ],
          aftersale: { href: ((w.ProtoPages && w.ProtoPages.refundDetail) || '14.售后详情-原型页面.html') + '?refund=RF202606140001', label: '售后详情' },
          timeline: [
            { content: '【北京市】快件已到达北京朝阳区营业点，正在派送中', time: '2026-06-15 08:35', active: true },
            { content: '【北京市】快件已从北京转运中心发出', time: '2026-06-15 05:22', active: false },
            { content: '【南京市】快件已从南京转运中心发出', time: '2026-06-14 22:15', active: false }
          ]
        },
        {
          id: 2,
          logistics: { carrier: '中通快递', no: 'ZT2026061400001', eta: '预计 06-18 送达', label: '运输中', latest: '【南京市】快件已从南京转运中心发出', status: 'shipping' },
          items: [item('日本进口保温杯 不锈钢真空便携水杯500ml', '白色 500ml', 68, 1, 'p15')],
          timeline: [
            { content: '【南京市】快件已从南京转运中心发出', time: '2026-06-15 06:00', active: true },
            { content: '【南京市】快件已从江苏银行仓库发出', time: '2026-06-14 18:20', active: false }
          ]
        }
      ]
    },
    {
      id: 'SY202606130055', time: '2026-06-13 11:20', status: 'recv', payType: '组合支付',
      items: [
        item('索尼 WH-1000XM5 头戴耳机', '黑色', 2299, 1, 'p31'),
        item('飞利浦 电动牙刷 HX9911', '星空蓝', 599, 1, 'skincare'),
        item("Levi's 501 经典直筒牛仔裤", '32码 深蓝', 399, 1, 'pants')
      ],
      address: ADDR,
      logistics: { carrier: '京东物流', no: 'JD9876543210987', eta: '预计 06-16 送达', label: '运输中', latest: '快件已从【南京建邺营业部】发出' },
      goodsAmount: 3297, freight: 0, coupon: 50, beans: 5000, cash: 2747,
      message: '耳机要黑色，不要发错颜色',
      packages: [
        {
          id: 1,
          logistics: { carrier: '京东物流', no: 'JD9876543210987', eta: '预计 06-16 送达', label: '运输中', latest: '快件已从【南京建邺营业部】发出，正在运往下一站', status: 'shipping' },
          items: [item('索尼 WH-1000XM5 头戴耳机', '黑色', 2299, 1, 'p31')],
          timeline: [
            { content: '快件已从【南京建邺营业部】发出，正在运往下一站', time: '2026-06-15 08:10', active: true },
            { content: '快件已到达【南京转运中心】', time: '2026-06-14 20:30', active: false }
          ]
        }
      ],
      pendingItems: [
        item('飞利浦 电动牙刷 HX9911', '星空蓝', 599, 1, 'skincare'),
        item("Levi's 501 经典直筒牛仔裤", '32码 深蓝', 399, 1, 'pants')
      ]
    },
    {
      id: 'SY202606140089', time: '2026-06-14 16:45', status: 'recv', payType: '纯现金',
      items: [item('索尼 WH-1000XM5 头戴耳机', '黑色', 2299, 1, 'p31')],
      address: ADDR,
      logistics: { carrier: '京东物流', no: 'JD9876543210987', eta: '预计 06-16 送达', label: '运输中', latest: '快件已从【南京建邺营业部】发出，正在运往下一站' },
      goodsAmount: 2299, freight: 0, coupon: 0, beans: 0, cash: 2299,
      message: '送朋友生日礼物，麻烦包装好一些'
    },
    {
      id: 'SY202606120033', time: '2026-06-12 09:12', status: 'ship', payType: '纯积分',
      items: [item("Levi's 501 经典直筒牛仔裤", '32码 深蓝', 399, 2, 'pants')],
      address: ADDR, logistics: null,
      goodsAmount: 798, freight: 0, coupon: 0, beans: 7980, cash: 0,
      message: '32码如果偏小请发33码'
    },
    {
      id: 'SY202606080015', time: '2026-06-08 14:30', status: 'done', payType: '组合支付',
      items: [item('飞利浦 电动牙刷 HX9911', '星空蓝', 599, 1, 'skincare')],
      address: ADDR,
      logistics: { carrier: '圆通速递', no: 'YT5566778899001', eta: '已于 06-10 签收', label: '已签收', latest: '本人签收，感谢使用圆通速递', status: 'delivered' },
      goodsAmount: 599, freight: 0, coupon: 0, beans: 3000, cash: 299,
      message: '请发顺丰'
    },
    {
      id: 'SY202605280007', time: '2026-05-28 11:00', status: 'cancel', payType: '纯现金',
      items: [item('某款限量礼盒', '标准装', 899, 1, 'cake')],
      address: ADDR, logistics: null,
      goodsAmount: 899, freight: 0, coupon: 0, beans: 0, cash: 899,
      message: '不需要了，请尽快退款'
    }
  ];

  function pkgState(lg) {
    if (!lg) return 'pending';
    if (lg.status === 'delivered' || lg.label === '已签收') return 'delivered';
    return 'shipping';
  }

  function packagesOf(o) {
    if (o.packages && o.packages.length) return o.packages;
    return [{ id: 1, items: o.items, logistics: o.logistics || null, timeline: null }];
  }

  function pendingItemsOf(o) {
    if (o.pendingItems && o.pendingItems.length) return o.pendingItems;
    if (o.status === 'ship' && !o.logistics) return o.items;
    return [];
  }

  function summary(o) {
    var pkgs = packagesOf(o);
    var pending = pendingItemsOf(o);
    var shipped = pkgs.filter(function (p) { return p.logistics; });
    var shipping = shipped.filter(function (p) { return pkgState(p.logistics) === 'shipping'; });
    var delivered = shipped.filter(function (p) { return pkgState(p.logistics) === 'delivered'; });
    var pendingQty = pending.reduce(function (s, i) { return s + i.qty; }, 0);
    var partialShip = pendingQty > 0 && shipped.length > 0;
    var partialDeliver = delivered.length > 0 && shipping.length > 0;
    var latestText = null;
    shipped.forEach(function (p) {
      var t = p.logistics.latest || p.logistics.eta;
      if (t) latestText = t;
    });
    var parts = [];
    var shipPkgCount = shipped.length;
    if (shipPkgCount > 1) parts.push('共 ' + shipPkgCount + ' 个包裹');
    else if (shipPkgCount === 1 && pendingQty) parts.push('1 个包裹已发货');
    if (shipping.length) parts.push(shipping.length + ' 个运输中');
    if (delivered.length) parts.push(delivered.length + ' 个已签收');
    if (pendingQty) parts.push(pendingQty + ' 件备货中');
    var canConfirmReceive = pendingQty === 0 && shipPkgCount > 0 && shipping.length === 0 && delivered.length === shipPkgCount;
    return {
      shippedCount: shipPkgCount,
      shippingCount: shipping.length,
      deliveredCount: delivered.length,
      pendingQty: pendingQty,
      partialShip: partialShip,
      partialDeliver: partialDeliver,
      multiPackage: shipPkgCount > 1,
      canConfirmReceive: canConfirmReceive,
      aggregateText: parts.join(' · '),
      latestText: latestText
    };
  }

  function itemKey(it) {
    return it.name + '\0' + it.spec;
  }

  function resolveItemStatus(o, it) {
    if (pendingItemsOf(o).some(function (p) { return itemKey(p) === itemKey(it); })) return 'ship';
    var pkgs = packagesOf(o);
    for (var i = 0; i < pkgs.length; i++) {
      var pkg = pkgs[i];
      if (pkg.items.some(function (p) { return itemKey(p) === itemKey(it); })) {
        if (pkg.logistics && pkgState(pkg.logistics) === 'delivered') return 'done';
        if (pkg.logistics) return 'recv';
        break;
      }
    }
    if (o.status === 'done') return 'done';
    if (o.status === 'ship') return 'ship';
    return o.status;
  }

  var STATUS_LABEL = { ship: '待发货', recv: '待收货', done: '已完成' };

  function getSelectableItems(o) {
    if (!o || !o.items || !['ship', 'recv', 'done'].includes(o.status)) return [];
    return o.items.map(function (it, index) {
      var st = resolveItemStatus(o, it);
      return {
        index: index,
        item: it,
        status: st,
        statusLabel: STATUS_LABEL[st] || st,
        amount: it.price * it.qty
      };
    });
  }

  w.OrderMock = {
    all: function () { return list.slice(); },
    get: function (id) { return list.find(function (o) { return o.id === id; }) || list[0]; },
    packages: packagesOf,
    pendingItems: pendingItemsOf,
    summary: summary,
    pkgState: pkgState,
    cancel: function (id) {
      var o = list.find(function (x) { return x.id === id; });
      if (o && o.status === 'pay') o.status = 'cancel';
      return o;
    },
    receive: function (id) {
      var o = list.find(function (x) { return x.id === id; });
      if (o && o.status === 'recv') o.status = 'done';
      return o;
    },
    img: function (o, wIMG) {
      var it = o.items[0];
      return wIMG && wIMG[it.imgKey] ? wIMG[it.imgKey] : '';
    },
    resolveItemStatus: resolveItemStatus,
    getSelectableItems: getSelectableItems
  };
})(window);
