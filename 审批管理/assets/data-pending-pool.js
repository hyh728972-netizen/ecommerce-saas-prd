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
    { id:5, type:'profit', typeLabel:'利润预警', product:'男士商务休闲皮鞋', brand:'奥康', spec:'黑色,41码', sku:'HZ-A00006-001-DF-A002', channel:'航司积分小站', supplier:'恒通供应链', supplyPrice:'¥100.00', channelPrice:'¥90.00', reason:'供货价 ¥100 > 渠道价 ¥90，预计亏损 ¥10/单', actions:['editPrice','lossApproval'], time:'2026-05-12 15:12:44', sourceType:'清单推品' }
  ];
  pendingData.sort(function (a, b) { return new Date(b.time) - new Date(a.time); });

  // ============================================================
  // 暴露
  // ============================================================
  window.PendingPool = {
    pendingData: pendingData,
    closedData: [],
    tagClassMap: tagClassMap,
    sourceTypeTagClassMap: sourceTypeTagClassMap
  };

})();