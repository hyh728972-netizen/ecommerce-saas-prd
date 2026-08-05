/**
 * data-pending-pool.js
 * 待处理选品中心 — 数据定义
 * 暴露 window.PendingPool 命名空间
 */
(function () {
  'use strict';

  // ============================================================
  // 问题类型 → CSS 类名映射
  // ============================================================
  var tagClassMap = {
    duplicate: 'tag-duplicate',
    profit: 'tag-profit',
    supplier: 'tag-supplier',
    conflict: 'tag-conflict',
    cost: 'tag-cost',
    outage: 'tag-outage',
    codeConflict: 'tag-code-conflict'
  };

  // ============================================================
  // 来源类型 → CSS 类名映射
  // ============================================================
  var sourceTypeTagClassMap = {
    '清单推品': 'tag-list-push',
    '渠道导入': 'tag-channel-import',
    '存量巡检': 'tag-inspection'
  };

  // ============================================================
  // 待处理数据
  // ============================================================
  var pendingData = [
    { id:1, type:'outage', typeLabel:'断供提醒', product:'加厚保暖羽绒服', brand:'波司登', spec:'黑色,M', sku:'HZ-A00008-001-DF-A004', channel:'商城会员购', supplier:'环球优选', supplyPrice:'¥180.00', channelPrice:'¥359.00', reason:'供应商[环球优选]已将此商品下架，已被系统转为不可售，请及时寻找替代品', actions:['confirm'], time:'2026-05-14 14:22:10', sourceType:'存量巡检' },
    { id:2, type:'cost', typeLabel:'成本变动', product:'女士直筒休闲长裤', brand:'优衣库', spec:'黑色,M', sku:'HZ-A00005-001-DF-A003', channel:'政企福利商城', supplier:'鹏程优品', supplyPrice:'¥95.00', channelPrice:'¥169.00', reason:'供应商已调价，商品已被系统转为不可售。原供货价 ¥80 → 现供货价 ¥95', actions:['accept','forceDelist'], time:'2026-05-14 10:15:33', sourceType:'存量巡检' },
    { id:3, type:'conflict', typeLabel:'渠道冲突', product:'夏季纯棉圆领T恤', brand:'森马', spec:'白色,M', sku:'HZ-A00001-001-DF-A001', channel:'政企福利商城', supplier:'星辰商贸', supplyPrice:'¥85.00', channelPrice:'¥129.00', reason:'渠道 [政企福利商城] 已存在同款在售 (供应链SKU: HZ-A00001-002-DF-A001)', actions:['compare'], time:'2026-05-13 16:48:02', sourceType:'清单推品' },
    { id:4, type:'supplier', typeLabel:'供应商优化', product:'智能蓝牙体脂秤', brand:'华为', spec:'白色', sku:'HZ-A00003-001-DF-A002', channel:'政企福利商城', supplier:'恒通供应链', supplyPrice:'¥100.00', channelPrice:'¥189.00', reason:'存在更低价供应商星辰商贸HZ-A00003-002-DF-A002 (供货价：¥95)，当前差价 ¥5', actions:['switch','approval'], time:'2026-05-13 09:30:15', sourceType:'渠道导入' },
    { id:5, type:'profit', typeLabel:'利润预警', product:'男士商务休闲皮鞋', brand:'奥康', spec:'黑色,41码', sku:'HZ-A00006-001-DF-A002', channel:'航司积分小站', supplier:'恒通供应链', supplyPrice:'¥100.00', channelPrice:'¥90.00', reason:'供货价 ¥100 > 渠道价 ¥90，预计亏损 ¥10/单', actions:['editPrice','forceList'], time:'2026-05-12 15:12:44', sourceType:'清单推品' },
    { id:6, type:'duplicate', typeLabel:'重复数据', product:'不锈钢保温杯500ml', brand:'富光', spec:'银色,500ml', sku:'HZ-A00004-001-DF-A001', channel:'商城会员购', supplier:'星辰商贸', supplyPrice:'¥35.00', channelPrice:'¥69.00', reason:'[不锈钢保温杯500ml] 商品重复，存在 3 条重复数据', actions:['ignore','resubmit'], time:'2026-05-12 11:05:28', sourceType:'渠道导入' },
    { id:7, type:'duplicate', typeLabel:'重复数据', product:'不锈钢保温杯500ml', brand:'富光', spec:'银色,500ml', sku:'HZ-A00004-001-DF-A001', channel:'商城会员购', supplier:'星辰商贸', supplyPrice:'¥36.00', channelPrice:'¥72.00', reason:'[不锈钢保温杯500ml] 商品重复，存在 3 条重复数据（重复项 2/3）', actions:['ignore','resubmit'], time:'2026-05-12 11:05:28', sourceType:'渠道导入' },
    { id:8, type:'duplicate', typeLabel:'重复数据', product:'不锈钢保温杯500ml', brand:'富光', spec:'银色,500ml', sku:'HZ-A00004-001-DF-A001', channel:'商城会员购', supplier:'星辰商贸', supplyPrice:'¥34.50', channelPrice:'¥68.00', reason:'[不锈钢保温杯500ml] 商品重复，存在 3 条重复数据（重复项 3/3）', actions:['ignore','resubmit'], time:'2026-05-12 11:05:28', sourceType:'渠道导入' },
    { id:9, type:'codeConflict', typeLabel:'编码冲突', product:'3M 9001V KN95口罩', brand:'3M', spec:'蓝色,常规', sku:'HZ-A00002-001-DF-A001', channel:'政企福利商城', supplier:'星辰商贸', supplyPrice:'¥85.00', channelPrice:'¥129.00', reason:'供应链同款组 SAME-MASK-004 关联了2个不同的商城SPU。主SPU: S001A00001 "3M 9001V KN95口罩"，冲突SPU: S001A00002 "3M口罩9001V蓝"。建议将冲突SPU并入主SPU', actions:['confirmMerge','ignore'], time:'2026-06-26 08:30:00', sourceType:'存量巡检' },
    { id:10, type:'outage', typeLabel:'断供提醒', product:'男士商务休闲皮鞋', brand:'奥康', spec:'黑色,41码', sku:'HZ-A00006-001-DF-A002', channel:'航司积分小站', supplier:'恒通供应链', supplyPrice:'¥100.00', channelPrice:'¥259.00', reason:'供应商[恒通供应链]已将此商品下架，已被系统转为不可售，请及时寻找替代品', actions:['confirm'], time:'2026-06-25 16:30:00', sourceType:'存量巡检' },
    { id:11, type:'cost', typeLabel:'成本变动', product:'有机山茶油500ml', brand:'金龙鱼', spec:'500ml', sku:'HZ-A00015-001-DF-A002', channel:'商城会员购', supplier:'恒通供应链', supplyPrice:'¥30.00', channelPrice:'¥59.00', reason:'供应商已调价，商品已被系统转为不可售。原供货价 ¥28 → 现供货价 ¥30', actions:['accept','forceDelist'], time:'2026-06-24 09:20:00', sourceType:'存量巡检' },
    { id:12, type:'cost', typeLabel:'成本变动', product:'儿童防蓝光眼镜', brand:'可得', spec:'蓝,通用', sku:'HZ-A00022-001-DF-A001', channel:'品牌自营旗舰店', supplier:'星辰商贸', supplyPrice:'¥68.00', channelPrice:'¥139.00', reason:'供应商已调价，商品已被系统转为不可售。原供货价 ¥62 → 现供货价 ¥68', actions:['accept','forceDelist'], time:'2026-06-23 14:10:00', sourceType:'存量巡检' },
    { id:13, type:'conflict', typeLabel:'渠道冲突', product:'不锈钢保温杯500ml', brand:'富光', spec:'银色,500ml', sku:'HZ-A00004-001-DF-A001', channel:'政企福利商城', supplier:'星辰商贸', supplyPrice:'¥34.50', channelPrice:'¥68.00', reason:'渠道 [政企福利商城] 已存在同款在售 (供应链SKU: HZ-A00004-002-DF-A001)', actions:['compare'], time:'2026-06-22 11:00:00', sourceType:'清单推品' },
    { id:14, type:'supplier', typeLabel:'供应商优化', product:'户外防水冲锋衣', brand:'探路者', spec:'藏青,L', sku:'HZ-A00012-001-DF-A004', channel:'品牌自营旗舰店', supplier:'环球优选', supplyPrice:'¥260.00', channelPrice:'¥499.00', reason:'存在更低价供应商鹏程优品HZ-A00012-002-DF-A004 (供货价：¥245)，当前差价 ¥15', actions:['switch','approval'], time:'2026-06-21 08:45:00', sourceType:'渠道导入' },
    { id:15, type:'profit', typeLabel:'利润预警', product:'有机绿茶礼盒装', brand:'八马', spec:'250g礼盒', sku:'HZ-A00021-001-DF-A004', channel:'航司积分小站', supplier:'环球优选', supplyPrice:'¥56.00', channelPrice:'¥48.00', reason:'供货价 ¥56 > 渠道价 ¥48，预计亏损 ¥8/单', actions:['editPrice','forceList'], time:'2026-06-20 13:20:00', sourceType:'清单推品' },
    { id:16, type:'codeConflict', typeLabel:'编码冲突', product:'OPPO Find X8', brand:'OPPO', spec:'星野黑,12+256GB', sku:'HZ-B00003-001-DF-A001', channel:'政企福利商城', supplier:'OPPO官方旗舰店', supplyPrice:'¥3,999.00', channelPrice:'¥4,299.00', reason:'供应链同款组 SAME-FINDX8-001 关联了2个不同的商城SPU。主SPU: S002A00001 "OPPO Find X8"，冲突SPU: S002A00002 "OPPO Find X8 旗舰版"。建议将冲突SPU并入主SPU', actions:['confirmMerge','ignore'], time:'2026-06-19 17:00:00', sourceType:'存量巡检' },
    { id:17, type:'outage', typeLabel:'断供提醒', product:'电子书阅读器青春版', brand:'掌阅', spec:'黑色,6英寸', sku:'HZ-A00011-001-DF-A002', channel:'商城会员购', supplier:'恒通供应链', supplyPrice:'¥220.00', channelPrice:'¥399.00', reason:'供应商[恒通供应链]已将此商品删除，已被系统转为不可售，请及时寻找替代品', actions:['confirm'], time:'2026-06-18 10:30:00', sourceType:'存量巡检' },
    { id:18, type:'supplier', typeLabel:'供应商优化', product:'加厚保暖羽绒服', brand:'波司登', spec:'藏青,XXL', sku:'HZ-A00008-004-DF-A004', channel:'航司积分小站', supplier:'环球优选', supplyPrice:'¥200.00', channelPrice:'¥399.00', reason:'存在更低价供应商恒通供应链HZ-A00008-003-DF-A004 (供货价：¥175)，当前差价 ¥25', actions:['switch','approval'], time:'2026-06-17 15:00:00', sourceType:'渠道导入' },
    { id:19, type:'outage', typeLabel:'断供提醒', product:'—', sku:'HZ-X00099-001-DF-ZZZ', channel:'品牌自营旗舰店', supplier:'—', supplyPrice:'—', channelPrice:'—', reason:'供应链无匹配商品数据或品牌商城编码填写有误或商品已下架，请检查是否填写有误', actions:['confirm'], time:'2026-06-16 14:00:00', sourceType:'渠道导入' },
    { id:20, type:'outage', typeLabel:'断供提醒', product:'—', sku:'HZ-X00100-002-DF-YYY', channel:'政企福利商城', supplier:'—', supplyPrice:'—', channelPrice:'—', reason:'供应链无匹配商品数据或品牌商城编码填写有误或商品已下架，请检查是否填写有误', actions:['confirm'], time:'2026-06-15 09:30:00', sourceType:'渠道导入' },
    { id:21, type:'supplier', typeLabel:'供应商优化', product:'有机山茶油500ml', brand:'金龙鱼', spec:'500ml', sku:'HZ-A00015-001-DF-A002', channel:'商城会员购', supplier:'恒通供应链', supplyPrice:'¥30.00', channelPrice:'¥59.00', reason:'存在更低价供应商星辰商贸HZ-A00015-002-DF-A002 (供货价：¥27)，当前差价 ¥3', actions:['switch','approval'], time:'2026-06-28 10:30:00', sourceType:'存量巡检' },
    { id:22, type:'supplier', typeLabel:'供应商优化', product:'新疆纯牛奶200ml*12', brand:'天润', spec:'200ml*12盒', sku:'HZ-A00023-001-DF-A001', channel:'商城会员购', supplier:'恒通供应链', supplyPrice:'¥45.00', channelPrice:'¥79.00', reason:'组合商品[天润 家庭营养过年礼包 组合套装A]子件[新疆纯牛奶]存在更低价供应商鹏程优品HZ-A00023-002-DF-A001 (供货价：¥42)，当前差价 ¥3', actions:['switch','approval'], time:'2026-07-05 09:15:00', sourceType:'存量巡检' },
    { id:23, type:'supplier', typeLabel:'供应商优化', product:'有机黑木耳200g', brand:'北大荒', spec:'200g', sku:'HZ-A00024-001-DF-A001', channel:'政企福利商城', supplier:'环球优选', supplyPrice:'¥28.00', channelPrice:'¥49.00', reason:'组合商品[北大荒 养生食材礼盒 组合套装B]子件[有机黑木耳]存在更低价供应商星辰商贸HZ-A00024-002-DF-A001 (供货价：¥25)，当前差价 ¥3', actions:['switch','approval'], time:'2026-07-04 14:30:00', sourceType:'清单推品' }
  ];
  pendingData.sort(function (a, b) { return new Date(b.time) - new Date(a.time); });

  // ============================================================
  // 已关闭 Tab 数据
  // ============================================================
  var closedData = [
    { typeLabel:'断供提醒', type:'outage', product:'加厚保暖羽绒服', brand:'波司登', spec:'黑色,M', sku:'HZ-A00008-001-DF-A004', channel:'商城会员购', supplier:'环球优选', supplyPrice:'¥180.00', channelPrice:'¥359.00', reason:'供应商[环球优选]已将此商品下架，已被系统转为不可售，请及时寻找替代品', createdTime:'2026-05-14 14:22:10', processedTime:'2026-05-14 14:23:05', method:'已确认', operator:'李运营', sourceType:'存量巡检' },
    { typeLabel:'成本变动', type:'cost', product:'女士直筒休闲长裤', brand:'优衣库', spec:'黑色,M', sku:'HZ-A00005-001-DF-A003', channel:'政企福利商城', supplier:'鹏程优品', supplyPrice:'¥95.00', channelPrice:'¥169.00', reason:'供应商已调价，商品已被系统转为不可售。原供货价 ¥80 → 现供货价 ¥95', createdTime:'2026-05-14 10:15:33', processedTime:'2026-05-14 10:16:10', method:'接受并更新', operator:'李运营', sourceType:'存量巡检' },
    { typeLabel:'利润预警', type:'profit', product:'男士商务休闲皮鞋', brand:'奥康', spec:'黑色,41码', sku:'HZ-A00006-001-DF-A002', channel:'航司积分小站', supplier:'恒通供应链', supplyPrice:'¥100.00', channelPrice:'¥90.00', reason:'供货价 ¥100 > 渠道价 ¥90，预计亏损 ¥10/单', createdTime:'2026-05-12 15:12:44', processedTime:'2026-05-12 15:14:30', method:'修改价格', operator:'王专员', sourceType:'清单推品' },
    { typeLabel:'供应商优化', type:'supplier', product:'智能蓝牙体脂秤', brand:'华为', spec:'白色', sku:'HZ-A00003-001-DF-A002', channel:'政企福利商城', supplier:'恒通供应链', supplyPrice:'¥100.00', channelPrice:'¥189.00', reason:'存在更低价供应商星辰商贸 (¥95)，当前差价 ¥5', createdTime:'2026-05-13 09:30:15', processedTime:'2026-05-13 09:32:01', method:'一键切换最优', operator:'李运营', sourceType:'渠道导入' },
    { typeLabel:'渠道冲突', type:'conflict', product:'夏季纯棉圆领T恤', brand:'森马', spec:'白色,M', sku:'HZ-A00001-001-DF-A001', channel:'政企福利商城', supplier:'星辰商贸', supplyPrice:'¥85.00', channelPrice:'¥129.00', reason:'渠道 [政企福利商城] 已存在同款在售 (供应链SKU: HZ-A00001-002-DF-A001)', createdTime:'2026-05-13 16:48:02', processedTime:'2026-05-13 16:50:00', method:'改价申请', operator:'张选品', sourceType:'清单推品' },
    { typeLabel:'重复数据', type:'duplicate', product:'不锈钢保温杯500ml', brand:'富光', spec:'银色,500ml', sku:'HZ-A00004-001-DF-A001', channel:'商城会员购', supplier:'星辰商贸', supplyPrice:'¥35.00', channelPrice:'¥69.00', reason:'[不锈钢保温杯500ml] 商品重复，存在 3 条重复数据', createdTime:'2026-05-12 11:05:28', processedTime:'2026-05-12 11:08:15', method:'重新提交', operator:'李运营', sourceType:'渠道导入' },
    { typeLabel:'重复数据', type:'duplicate', product:'不锈钢保温杯500ml', brand:'富光', spec:'银色,500ml', sku:'HZ-A00004-001-DF-A001', channel:'商城会员购', supplier:'星辰商贸', supplyPrice:'¥36.00', channelPrice:'¥72.00', reason:'[不锈钢保温杯500ml] 商品重复，存在 3 条重复数据（重复项 2/3）', createdTime:'2026-05-12 11:05:28', processedTime:'2026-05-12 11:08:15', method:'被覆盖删除', operator:'系统', sourceType:'渠道导入' },
    { typeLabel:'重复数据', type:'duplicate', product:'不锈钢保温杯500ml', brand:'富光', spec:'银色,500ml', sku:'HZ-A00004-001-DF-A001', channel:'商城会员购', supplier:'星辰商贸', supplyPrice:'¥34.50', channelPrice:'¥68.00', reason:'[不锈钢保温杯500ml] 商品重复，存在 3 条重复数据（重复项 3/3）', createdTime:'2026-05-12 11:05:28', processedTime:'2026-05-12 11:08:15', method:'被覆盖删除', operator:'系统', sourceType:'渠道导入' },
    { typeLabel:'编码冲突', type:'codeConflict', product:'3M 9001V KN95口罩', brand:'3M', spec:'蓝色,常规', sku:'HZ-A00002-001-DF-A001', channel:'政企福利商城', supplier:'星辰商贸', supplyPrice:'¥85.00', channelPrice:'¥129.00', reason:'供应链同款组 SAME-MASK-004 关联了2个不同的商城SPU，已确认合并至主SPU S001A00001', createdTime:'2026-06-20 14:30:00', processedTime:'2026-06-20 14:32:10', method:'确认合并', operator:'李运营', sourceType:'存量巡检' },
    { typeLabel:'断供提醒', type:'outage', product:'—', sku:'HZ-X00099-001-DF-ZZZ', channel:'品牌自营旗舰店', supplier:'—', supplyPrice:'—', channelPrice:'—', reason:'供应链无匹配商品数据，编码填写有误，已确认归档', createdTime:'2026-06-14 10:00:00', processedTime:'2026-06-14 10:05:00', method:'已确认', operator:'李运营', sourceType:'渠道导入' }
  ];

  // ============================================================
  // 暴露
  // ============================================================
  window.PendingPool = {
    pendingData: pendingData,
    closedData: closedData,
    tagClassMap: tagClassMap,
    sourceTypeTagClassMap: sourceTypeTagClassMap
  };

})();
