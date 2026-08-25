/**
 * 首页组件划分（从上到下）
 * ─────────────────────────────────────────
 * 页面主体
 *  1. topbar      顶部导航栏
 *  2. header      搜索头部
 *  3. hero        首屏三栏
 *  4. notice      公告栏
 *  5. opsRow      运营四宫格
 *  6. welfare     福利专区
 *  7. floor1~4    分类楼层
 *  8. feed        商品推荐
 *  9. footer      页脚
 * 浮层
 * 10. floorNav    楼层锚点
 * 11. sideToolbar 侧边工具条
 */

const GROUPS = {
  page: '页面主体',
  float: '浮层组件'
};

/** 组件类型中文名（配置面板角标） */
const TYPE_LABELS = {
  TopBar: '顶部导航',
  SearchHeader: '搜索头部',
  Breadcrumb: '面包屑',
  ActivityHero: '活动主视觉',
  ActivityRule: '公告栏',
  HeroSection: '首屏三栏',
  AnnouncementBar: '公告栏',
  OpsGridRow: '运营四宫格',
  WelfareBanner: '福利专区',
  FloorSection: '分类楼层',
  RecommendFeed: '商品推荐',
  SiteFooter: '页脚',
  FloorNav: '楼层锚点',
  SideToolbar: '侧边工具条'
};

const defaultComponents = [
  // ── 1. 顶部导航 ──
  {
    id: 'topbar', group: 'page', name: '顶部导航栏', type: 'TopBar',
    desc: '页面最上方：左侧站点入口，右侧快捷菜单', on: true,
    config: {
      height: 30, bgColor: '#ffffff', textColor: '#999999',
      leftMenus: [
        { name: '你好，请登录', link: '24.登录-原型页面.html' },
        { name: '网页无障碍', link: '#', hasDropdown: true },
        { name: '切换手机版', link: '#' }
      ],
      rightMenus: [
        { name: '已买到的宝贝', link: '08.订单页-原型页面.html' },
        { name: '个人中心', link: '10.个人中心-原型页面.html' },
        { name: '购物车', link: '05.购物车-原型页面.html', showBadge: true },
        { name: '收藏夹', link: '14.我的收藏-原型页面.html' },
        { name: '消息', link: '23.消息中心-原型页面.html' },
        { name: '帮助中心', link: '22.帮助中心-原型页面.html' }
      ],
      showCartBadge: true
    }
  },

  // ── 2. 主头部 ──
  {
    id: 'header', group: 'page', name: '搜索头部', type: 'SearchHeader',
    desc: '品牌区、搜索框、热搜词、购物车与促销卡片', on: true,
    config: {
      height: 200, gradientFrom: '#e1251b', gradientTo: '#c81a12',
      logoMode: 'both', logoOrder: 'logoFirst',
      logoText: '苏银豆商城', logoSub: '积分好物 · 一站购齐', logoLink: '/', logoWidth: 230,
      logoSize: 36, logoRadius: 0, logoImg: '', logoImgKey: '',
      showSearch: true, searchPlaceholder: '批量找品 积分限时返', searchBtnText: '搜索',
      showHotWords: true,
      hotWords: [
        { text: '5000苏银豆到账', link: '/search?q=苏银豆', highlight: true },
        { text: '积分低至5折起', link: '/search?q=积分低至5折起', highlight: false },
        { text: '数码家电', link: '/search?q=数码家电', highlight: false },
        { text: '美妆护肤', link: '/search?q=美妆护肤', highlight: false },
        { text: '家居生活', link: '/search?q=家居生活', highlight: false },
        { text: '运动户外', link: '/search?q=运动户外', highlight: false },
        { text: '端午礼品', link: '/search?q=端午礼品', highlight: false },
        { text: '企业福利', link: '/search?q=企业福利', highlight: false }
      ],
      showCart: true, cartText: '购物车', showCartBadge: true,
      promos: [
        { title: '生活方式馆', desc: '工装靴 · 复古好物', tag: '精选', tagColor: '#e8380d', link: '02.活动页-原型页面.html', imgKey: 'bags' },
        { title: '女装秋冬', desc: '羊绒大衣上新', tag: '主推', tagColor: '#ff6b35', link: '02.活动专区页-原型页面.html', imgKey: 'shirt' },
        { title: 'Nike运动', desc: '轻便透气跑鞋', tag: '限时', tagColor: '#f63218', link: '02.活动页-原型页面.html', imgKey: 'p55' },
        { title: '魅力女装', desc: '高领针织新品', tag: '尊享', tagColor: '#c9a84c', link: '02.活动专区页-原型页面.html', imgKey: 'p11' }
      ]
    }
  },

  // ── 3. 核心三栏 ──
  {
    id: 'hero', group: 'page', name: '首屏三栏', type: 'HeroSection',
    desc: '左侧分类、中间轮播、右侧用户区', on: true,
    config: {
      height: 410, bgColor: '#ffffff', radius: 12,
      showCategories: true, categoryTitle: '全部商品分类', categoryWidth: 220,
      showBanner: true, autoPlayInterval: 4,
      banners: [
        { bg: 'https://m.360buyimg.com/babel/jfs/t1/442651/35/9171/43312/6a1a98b9F4a2d96b0/00ae400140785815.jpg', fg: 'https://m.360buyimg.com/babel/jfs/t1/445641/12/5170/4553/6a1a98ddF277212d0/0276400140f2e0a3.png', link: '02.活动页-原型页面.html' },
        { bg: 'https://m.360buyimg.com/babel/jfs/t1/446020/13/5889/38099/6a1ad5abFb22643a0/00ae4001405e1519.png', fg: 'https://m.360buyimg.com/babel/jfs/t1/443428/16/5780/16419/6a1ad5b3F5a591e6a/00ae400140e89519.png', link: '02.活动专区页-原型页面.html' },
        { bg: 'https://m.360buyimg.com/babel/jfs/t1/451820/34/1652/127992/6a20d8dfFd331330b/02764001407e15b2.png', fg: 'https://m.360buyimg.com/babel/jfs/t1/446379/27/7886/24168/6a20d858Fd077312f/0276400140cb2293.png', link: '02.活动页-原型页面.html' },
        { bg: 'https://m.360buyimg.com/babel/jfs/t1/444554/26/19011/27121/6a292dbcF84fe3830/00ae400140230e35.jpg', fg: 'https://m.360buyimg.com/babel/jfs/t1/457000/39/805/9650/6a292dc2Fe9d51068/00ae40014086a6ea.png', link: '02.活动专区页-原型页面.html' }
      ],
      showUserPanel: true, userPanelWidth: 220,
      showVipBadge: true, vipBadgeText: '企业员工',
      showUserName: true,
      showAssets: true,
      assets: [
        { label: '优惠券', showValue: true },
        { label: '苏银豆', showValue: true },
        { label: '卡券', showValue: true }
      ],
      showAlerts: true,
      alertsHideAfterRead: true,
      pointsExpireRemindDays: 7,
      priceDropRemindDays: 7,
      couponExpireRemindDays: 3,
      showServiceNav: true,
      services: [
        { name: '已买到', link: '08.订单页-原型页面.html' },
        { name: '收藏夹', link: '14.我的收藏-原型页面.html' },
        { name: '足迹', link: '15.浏览记录-原型页面.html' },
        { name: '收货地址', link: '16.收货地址-原型页面.html' }
      ]
    }
  },

  // ── 4. 公告栏 ──
  {
    id: 'notice', group: 'page', name: '公告栏', type: 'AnnouncementBar',
    desc: '滚动展示公告与活动动态', on: true,
    config: {
      height: 40, bgColor: '#ffffff', textColor: '#666666',
      badgeText: '公告', badgeColor: '#e1251b',
      showMore: true, moreText: '更多', moreLink: '22.帮助中心-原型页面.html',
      enableScroll: true, scrollInterval: 28,
      notices: [
        '用户 136****8821 成功兑换了戴森吸尘器 V15',
        '企业福利专区上线，员工专享超低价',
        '端午礼品专场开启，精选礼盒等你来选',
        '您的卡券即将到期，请及时使用'
      ]
    }
  },

  // ── 5. 运营四宫格（设计稿第二屏）──
  {
    id: 'opsRow', group: 'page', name: '运营四宫格', type: 'OpsGridRow',
    desc: '热销榜 · 品牌专区 · 积分精选 · 每日上新', on: true,
    config: {
      columns: 4, gap: 12,
      slots: [
        {
          type: 'rankList', title: '热销榜单', moreText: '更多 >', moreLink: '03.搜索分类页-原型页面.html',
          itemCount: 9, showRankBadge: true
        },
        {
          type: 'brandZone', title: '品牌专区', moreText: '更多 >', moreLink: '02.活动专区页-原型页面.html',
          brands: [
            { name: 'Apple 智能穿戴', sub: '新品上市', height: 88, imgKey: 'watch', link: '02.活动专区页-原型页面.html' },
            { name: '戴森个护', sub: '热销推荐', height: 52, imgKey: 'skincare', link: '02.活动页-原型页面.html' },
            { name: '小米生态链', sub: '品质生活', height: 52, imgKey: 'p8', link: '02.活动专区页-原型页面.html' },
            { name: '华为终端', sub: '全场景办公', height: 52, imgKey: 'oppo', link: '03.搜索分类页-原型页面.html' }
          ]
        },
        {
          type: 'productGrid', title: '积分精选', moreText: '更多 >', moreLink: '12.积分中心-原型页面.html',
          columns: 2, rows: 2, showCart: true,
          products: ['p28', 'p17', 'p19', 'p34']
        },
        {
          type: 'productGrid', title: '每日上新', moreText: '更多 >', moreLink: '03.搜索分类页-原型页面.html',
          columns: 2, rows: 2, showCart: true,
          products: ['sneaker', 'headphone', 'watch', 'camera']
        }
      ]
    }
  },

  // ── 6. 福利专区 ──
  {
    id: 'welfare', group: 'page', name: '福利专区', type: 'WelfareBanner',
    desc: '左侧标题区 + 右侧场景卡片', on: true,
    config: {
      height: 210, title: '专属福利专区', subtitle: '一站全买齐',
      titleColor: '#ffffff', bgFrom: '#ff3d7a', bgTo: '#ff9eb5',
      showButton: true, buttonText: '进入全场景 >', buttonLink: '02.活动专区页-原型页面.html',
      cardGap: 10,
      cards: [
        { title: '美食礼盒', desc: '美味牛排 享受生活', link: '02.活动页-原型页面.html', imgKey: 'p45' },
        { title: '数码音频', desc: '潮流数码好物', link: '02.活动专区页-原型页面.html', imgKey: 'p53' },
        { title: '舒适家居', desc: '品质生活必备', link: '02.活动页-原型页面.html', imgKey: 'chair' },
        { title: '职场读物', desc: '提升职场竞争力', link: '02.活动专区页-原型页面.html', imgKey: 'camera' }
      ]
    }
  },

  // ── 7. 楼层 1F：左主推+双副 + 右 3×2 商品 ──
  {
    id: 'floor1', group: 'page', name: '1F 办公文具', type: 'FloorSection',
    desc: '主推位 + 副推位 + 商品区（混合布局）', on: true,
    config: {
      layout: 'featuredMix',
      floorNum: '1F', title: '办公文具/办公用品',
      showViewAll: true, viewAllText: '查看全部 >', viewAllLink: '03.搜索分类页-原型页面.html',
      bgColor: '#ffffff', floorNumColor: '#e1251b', titleColor: '#333333',
      featured: {
        title: '办公文具采购季', tags: ['办公笔', '复印纸', '文件夹', '订书机'],
        link: '02.活动页-原型页面.html', imgKey: 'pen', width: 280
      },
      subCards: [
        { title: '绘画画笔', subtitle: '专业感光系列', link: '03.搜索分类页-原型页面.html', imgKey: 'sneaker' },
        { title: '职场书籍', subtitle: '全方位学习提升', link: '03.搜索分类页-原型页面.html', imgKey: 'skincare' }
      ],
      productColumns: 3, productRows: 2, showCart: true, showOriginalPrice: true,
      products: ['pen', 'p28', 'p17', 'p19', 'p34', 'p23']
    }
  },

  // ── 8. 楼层 2F：左轮播+副推 + 右商品 ──
  {
    id: 'floor2', group: 'page', name: '2F 运动健身', type: 'FloorSection',
    desc: '主推位 + 副推位 + 商品区（轮播网格）', on: true,
    config: {
      layout: 'bannerGrid',
      floorNum: '2F', title: '运动健身/运动户外',
      showViewAll: true, viewAllText: '查看全部 >', viewAllLink: '03.搜索分类页-原型页面.html',
      bgColor: '#ffffff', floorNumColor: '#e1251b', titleColor: '#333333',
      featured: {
        brand: 'Nike', title: 'Flyknit 竞速跑鞋',
        tags: ['轻盈透气', '强韧织物', '多色可选'], link: '02.活动页-原型页面.html', imgKey: 'sneaker', width: 280
      },
      subCards: [
        { brand: 'Adidas', title: '训练系列', layout: 'vertical', link: '02.活动专区页-原型页面.html', imgKey: 'skincare' },
        { brand: 'Under Armour', title: '速干上衣', layout: 'horizontal', link: '02.活动专区页-原型页面.html', imgKey: 'watch' },
        { brand: '李宁', title: '国潮跑鞋', layout: 'horizontal', link: '02.活动专区页-原型页面.html', imgKey: 'shirt' }
      ],
      productColumns: 3, productRows: 2, showCart: true, showOriginalPrice: true,
      products: ['sneaker', 'headphone', 'watch', 'p9', 'chair', 'camera']
    }
  },

  // ── 9. 楼层 3F：左高轮播 + 混排 ──
  {
    id: 'floor3', group: 'page', name: '3F 个护家清', type: 'FloorSection',
    desc: '主推位 + 副推位 + 商品区（高轮播混排）', on: true,
    config: {
      layout: 'tallCarousel',
      floorNum: '3F', title: '个护家清/生活用品/食品饮料',
      showViewAll: true, viewAllText: '查看全部 >', viewAllLink: '03.搜索分类页-原型页面.html',
      bgColor: '#ffffff', floorNumColor: '#e1251b', titleColor: '#333333',
      featured: {
        title: '个护香氛精选', tags: ['法式经典', '持久留香'], link: '02.活动专区页-原型页面.html', imgKey: 'skincare', width: 220
      },
      subCards: [
        { title: '香氛精选', subtitle: '', link: '03.搜索分类页-原型页面.html', imgKey: 'pen' },
        { title: '烘焙', subtitle: '优选蛋糕', link: '03.搜索分类页-原型页面.html', imgKey: 'sneaker' },
        { title: '食品', subtitle: '健康优选', link: '03.搜索分类页-原型页面.html', imgKey: 'skincare' },
        { title: '电脑数码', subtitle: '点击进入 >', link: '03.搜索分类页-原型页面.html', isCta: true, imgKey: 'watch' }
      ],
      productColumns: 3, productRows: 2, showCart: true, showOriginalPrice: true,
      products: ['p34', 'p9', 'p17', 'p19', 'p23', 'p28']
    }
  },

  // ── 10. 楼层 4F：左主推位 + 右商品 ──
  {
    id: 'floor4', group: 'page', name: '4F 电脑数码', type: 'FloorSection',
    desc: '主推位 + 商品区（单列主推）', on: true,
    config: {
      layout: 'posterStack',
      floorNum: '4F', title: '电脑/数码/通讯',
      showViewAll: true, viewAllText: '查看全部 >', viewAllLink: '03.搜索分类页-原型页面.html',
      bgColor: '#ffffff', floorNumColor: '#e1251b', titleColor: '#333333',
      featured: {
        brand: '苹果', title: 'MacBook 移动办公',
        tags: ['M3芯片', '轻薄随行'], link: '04.商品详情页-原型页面.html',
        imgKey: 'watch', width: 200
      },
      productColumns: 3, productRows: 2, showCart: true, showOriginalPrice: true,
      products: ['watch', 'headphone', 'camera', 'pen', 'sneaker', 'chair']
    }
  },

  // ── 11. 商品推荐流 ──
  {
    id: 'feed', group: 'page', name: '商品推荐', type: 'RecommendFeed',
    desc: '多频道切换 + 商品卡片列表', on: true,
    config: {
      bgColor: '#ffffff',
      tabs: [
        { name: '为你推荐', products: ['p28', 'p17', 'p19', 'p34', 'p23', 'p9', 'pen', 'sneaker', 'headphone', 'watch', 'chair', 'camera'] },
        { name: '积分特惠', products: ['p17', 'p19', 'p9', 'pen', 'chair', 'p23', 'p28', 'p34', 'sneaker', 'watch', 'headphone', 'camera'] },
        { name: '每日上新', products: ['sneaker', 'watch', 'headphone', 'camera', 'p34', 'p28', 'p17', 'p19', 'p23', 'p9', 'pen', 'chair'] },
        { name: '数码家电', products: ['headphone', 'watch', 'camera', 'p9', 'sneaker', 'pen', 'p28', 'p17', 'p19', 'p34', 'p23', 'chair'] },
        { name: '美妆护肤', products: ['p34', 'p28', 'p17', 'p19', 'p23', 'p9', 'pen', 'sneaker', 'watch', 'chair', 'camera', 'headphone'] },
        { name: '家居生活', products: ['chair', 'p17', 'p9', 'p23', 'pen', 'p19', 'p28', 'p34', 'sneaker', 'watch', 'headphone', 'camera'] }
      ],
      defaultTab: 0, tabColor: '#e1251b',
      columns: 6, rows: 2,
      showBrand: true, showTags: true, showOriginalPrice: true,
      showPromoText: true, showCart: true
    }
  },

  // ── 12. 页脚 ──
  {
    id: 'footer', group: 'page', name: '页脚', type: 'SiteFooter',
    desc: '帮助导航、协议链接与版权信息', on: true,
    config: {
      bgColor: '#2b2b2b', titleColor: '#ffffff', linkColor: '#a0a0a0',
      columnsPerRow: 6,
      columns: [
        { title: '购物指南', links: [
          { text: '账号登录', url: '24.登录-原型页面.html' },
          { text: '购物流程', url: '22.帮助中心-原型页面.html' },
          { text: '搜索商品', url: '03.搜索分类页-原型页面.html' }
        ]},
        { title: '配送说明', links: [
          { text: '配送时间', url: '22.帮助中心-原型页面.html' },
          { text: '配送时效', url: '22.帮助中心-原型页面.html' },
          { text: '验货签收', url: '22.帮助中心-原型页面.html' }
        ]},
        { title: '售后服务', links: [
          { text: '退换政策', url: '18.售后记录-原型页面.html' },
          { text: '退款说明', url: '19.申请售后-原型页面.html' },
          { text: '售后咨询', url: '21.在线客服-原型页面.html' }
        ]},
        { title: '积分卡券', links: [
          { text: '积分规则', url: '12.积分中心-原型页面.html' },
          { text: '卡券使用', url: '13.我的卡券-原型页面.html' },
          { text: '积分明细', url: '12.积分中心-原型页面.html' }
        ]},
        { title: '关于我们', links: [
          { text: '公司介绍', url: '10.个人中心-原型页面.html' },
          { text: '联系我们', url: '21.在线客服-原型页面.html' },
          { text: '合作伙伴', url: '22.帮助中心-原型页面.html' }
        ]},
        { title: '帮助中心', links: [
          { text: '常见问题', url: '22.帮助中心-原型页面.html' },
          { text: '在线客服', url: '21.在线客服-原型页面.html' },
          { text: '隐私政策', url: '22.帮助中心-原型页面.html' }
        ]}
      ],
      legalLinks: [
        { text: '用户协议', url: '/agreement' },
        { text: '隐私政策', url: '/privacy' },
        { text: '关于小程序', url: '/miniprogram' }
      ],
      showCopyright: true,
      copyright: '© 2024 苏银豆商城 版权所有',
      icp: '苏ICP备XXXXXXXX号'
    }
  },

  // ── 13. 左侧楼层锚点 ──
  {
    id: 'floorNav', group: 'float', name: '楼层锚点', type: 'FloorNav',
    desc: '页面左侧悬浮，点击快速定位到对应楼层', on: true,
    config: {
      position: 'left', activeIndex: 0, showTop: true, topText: 'TOP',
      items: [
        { floor: '1F', label: '办公文具', targetId: 'floor1' },
        { floor: '2F', label: '运动健身', targetId: 'floor2' },
        { floor: '3F', label: '个护家清', targetId: 'floor3' },
        { floor: '4F', label: '电脑数码', targetId: 'floor4' }
      ]
    }
  },

  // ── 14. 右侧工具条 ──
  {
    id: 'sideToolbar', group: 'float', name: '侧边工具条', type: 'SideToolbar',
    desc: '页面右侧悬浮快捷入口', on: true,
    config: {
      position: 'right', cartBadgeCount: 3,
      items: [
        { iconKey: 'grid', label: '首页', link: '01.首页-原型页面.html' },
        { iconKey: 'list', label: '订单', link: '08.订单页-原型页面.html' },
        { iconKey: 'bean', label: '积分', link: '12.积分中心-原型页面.html' },
        { iconKey: 'ticket', label: '卡券', link: '13.我的卡券-原型页面.html' },
        { iconKey: 'cart', label: '购物车', link: '05.购物车-原型页面.html', showBadge: true },
        { iconKey: 'chat', label: '客服', link: '21.在线客服-原型页面.html' },
        { iconKey: 'top', label: '回顶部', link: '#top', isTop: true }
      ]
    }
  }
];

/** 活动页（子页面）默认组件：白底头 + 面包屑 + 主视觉 + 规则 + 楼层 + 推荐 */
const defaultActivityComponents = [
  {
    id: 'topbar', group: 'page', name: '顶部导航栏', type: 'TopBar',
    desc: '页面最上方：左侧站点入口，右侧快捷菜单', on: true,
    config: JSON.parse(JSON.stringify(defaultComponents.find(c => c.id === 'topbar').config))
  },
  {
    id: 'header', group: 'page', name: '搜索头部', type: 'SearchHeader',
    desc: '白底搜索头部（活动页无促销卡片）', on: true,
    config: {
      variant: 'plain',
      height: 110, gradientFrom: '#ffffff', gradientTo: '#ffffff',
      logoMode: 'both', logoOrder: 'logoFirst',
      logoText: '苏银豆商城', logoSub: '积分好物 · 一站购齐', logoLink: '01.首页-原型页面.html', logoWidth: 230,
      logoSize: 36, logoRadius: 0, logoImg: '', logoImgKey: '',
      showSearch: true, searchPlaceholder: '搜索商品、品牌、品类', searchBtnText: '搜索',
      showHotWords: true,
      hotWords: [
        { text: '5000苏银豆到账', link: '03.搜索分类页-原型页面.html', highlight: true },
        { text: '积分低至5折起', link: '03.搜索分类页-原型页面.html', highlight: false },
        { text: '数码家电', link: '03.搜索分类页-原型页面.html', highlight: false },
        { text: '美妆护肤', link: '03.搜索分类页-原型页面.html', highlight: false },
        { text: '运动户外', link: '03.搜索分类页-原型页面.html', highlight: false },
        { text: '企业福利', link: '03.搜索分类页-原型页面.html', highlight: false }
      ],
      showCart: true, cartText: '购物车', showCartBadge: true,
      promos: []
    }
  },
  {
    id: 'breadcrumb', group: 'page', name: '面包屑', type: 'Breadcrumb',
    desc: '当前位置路径导航', on: true,
    config: {
      items: [
        { text: '首页', link: '01.首页-原型页面.html' },
        { text: '活动专区', link: '02.活动专区页-原型页面.html' },
        { text: 'Apple 智能穿戴', link: '' }
      ]
    }
  },
  {
    id: 'actHero', group: 'page', name: '活动主视觉', type: 'ActivityHero',
    desc: '全宽活动 Banner：标题、副文案与标签', on: true,
    config: {
      height: 320, radius: 12,
      title: 'Apple 智能穿戴',
      subtitle: '智能手表 · 积分可抵 · 限时补贴',
      imgKey: 'p12',
      img: '',
      link: '04.商品详情页-原型页面.html',
      showTags: true,
      tags: ['限时补贴', '积分可抵', '大牌严选']
    }
  },
  {
    id: 'actRule', group: 'page', name: '公告栏', type: 'ActivityRule',
    desc: '滚动展示公告与活动动态', on: true,
    config: {
      height: 40, bgColor: '#ffffff', textColor: '#666666',
      badgeText: '公告', badgeColor: '#e1251b',
      showMore: true, moreText: '更多', moreLink: '22.帮助中心-原型页面.html',
      enableScroll: true, scrollInterval: 28,
      notices: [
        '活动时间：6.15–6.30 · 指定 Apple 穿戴商品可用苏银豆抵扣，单笔最高抵 ¥500',
        '每人每日限兑 3 件，超额订单将自动取消超出部分',
        '苏银豆与优惠券不可同享，以结算页实际抵扣为准',
        '活动商品不支持七天无理由退货，请确认后再下单'
      ]
    }
  },
  {
    id: 'floor1', group: 'page', name: '1F 智能手表', type: 'FloorSection',
    desc: '主推位 + 副推位 + 商品区', on: true,
    config: {
      layout: 'featuredMix',
      floorNum: '1F', title: '智能手表',
      showViewAll: true, viewAllText: '查看全部 >', viewAllLink: '03.搜索分类页-原型页面.html',
      bgColor: '#ffffff', floorNumColor: '#e1251b', titleColor: '#333333',
      featured: {
        title: 'Apple Watch 系列', tags: ['Series 9', 'GPS版', '健康监测'],
        link: '04.商品详情页-原型页面.html', imgKey: 'watch', width: 280
      },
      subCards: [
        { title: '运动手表', subtitle: '圆盘设计 白色款', link: '04.商品详情页-原型页面.html', imgKey: 'p57' },
        { title: '表带精选', subtitle: '硅胶/金属 多色', link: '04.商品详情页-原型页面.html', imgKey: 'p29' }
      ],
      productColumns: 3, productRows: 2, showCart: true, showOriginalPrice: true,
      products: ['watch', 'p57', 'headphone', 'p12', 'p29', 'camera']
    }
  },
  {
    id: 'floor2', group: 'page', name: '2F 数码配件', type: 'FloorSection',
    desc: '主推位 + 副推位 + 商品区', on: true,
    config: {
      layout: 'bannerGrid',
      floorNum: '2F', title: '数码配件',
      showViewAll: true, viewAllText: '查看全部 >', viewAllLink: '03.搜索分类页-原型页面.html',
      bgColor: '#ffffff', floorNumColor: '#e1251b', titleColor: '#333333',
      featured: {
        brand: '苹果', title: 'MacBook 移动办公',
        tags: ['轻薄随行', '积分可抵'], link: '04.商品详情页-原型页面.html', imgKey: 'p42', width: 280
      },
      subCards: [
        { brand: '配件', title: '移动电源', layout: 'vertical', link: '04.商品详情页-原型页面.html', imgKey: 'p41' },
        { brand: '音频', title: '降噪耳机', layout: 'horizontal', link: '04.商品详情页-原型页面.html', imgKey: 'headphone' },
        { brand: '穿戴', title: '智能手环', layout: 'horizontal', link: '04.商品详情页-原型页面.html', imgKey: 'watch' }
      ],
      productColumns: 3, productRows: 2, showCart: true, showOriginalPrice: true,
      products: ['p42', 'p41', 'headphone', 'watch', 'p53', 'camera']
    }
  },
  {
    id: 'feed', group: 'page', name: '商品推荐', type: 'RecommendFeed',
    desc: '为你推荐商品网格', on: true,
    config: {
      bgColor: '#ffffff',
      tabs: [
        { name: '为你推荐', products: ['watch', 'sneaker', 'p41', 'p42', 'skincare', 'p44', 'p45', 'headphone', 'p57', 'p12', 'camera', 'p46'] }
      ],
      defaultTab: 0, tabColor: '#e1251b',
      columns: 6, rows: 2,
      showBrand: true, showTags: true, showOriginalPrice: true,
      showPromoText: true, showCart: true
    }
  },
  {
    id: 'footer', group: 'page', name: '页脚', type: 'SiteFooter',
    desc: '帮助导航、协议链接与版权信息', on: true,
    config: JSON.parse(JSON.stringify(defaultComponents.find(c => c.id === 'footer').config))
  },
  {
    id: 'floorNav', group: 'float', name: '楼层锚点', type: 'FloorNav',
    desc: '页面左侧悬浮，点击快速定位到对应楼层', on: true,
    config: {
      position: 'left', activeIndex: 0, showTop: true, topText: 'TOP',
      items: [
        { floor: '1F', label: '智能手表', targetId: 'floor1' },
        { floor: '2F', label: '数码配件', targetId: 'floor2' }
      ]
    }
  },
  {
    id: 'sideToolbar', group: 'float', name: '侧边工具条', type: 'SideToolbar',
    desc: '页面右侧悬浮快捷入口', on: true,
    config: JSON.parse(JSON.stringify(defaultComponents.find(c => c.id === 'sideToolbar').config))
  }
];

/** 可搭建页面清单 */
const BUILDER_PAGES = [
  {
    id: 'home',
    name: '标准首页',
    tag: '首页',
    pageType: 'main',
    editable: true,
    route: '01.首页-原型页面.html',
    desc: 'PC 商城首页搭建，可配置导航、楼层、推荐等组件',
    templateKey: 'home'
  },
  {
    id: 'activity',
    name: '活动页',
    tag: '活动',
    pageType: 'sub',
    editable: true,
    route: '02.活动页-原型页面.html',
    desc: '活动专题页：白底头、主视觉、规则、楼层与推荐',
    templateKey: 'activity'
  }
];

function getDefaultComponentsByKey(key) {
  if (key === 'activity') return defaultActivityComponents;
  return defaultComponents;
}

function cloneComponents(list) {
  return JSON.parse(JSON.stringify(list));
}

/** 页面全局风格：背景、默认字色/字号（品牌图片改在搜索头部配置） */
const defaultPageTheme = {
  bgMode: 'color',
  bgColor: '#f4f4f4',
  bgImg: '',
  bgImgKey: '',
  textColor: '#333333',
  fontSize: 14,
  primaryColor: '#e1251b'
};

function cloneTheme(theme) {
  return JSON.parse(JSON.stringify(theme || defaultPageTheme));
}

function getDefaultTheme() {
  return cloneTheme(defaultPageTheme);
}

let currentPageId = 'home';
const pageStore = {
  home: cloneComponents(defaultComponents),
  activity: cloneComponents(defaultActivityComponents)
};
const themeStore = {
  home: getDefaultTheme(),
  activity: getDefaultTheme()
};

let components = pageStore.home;
let pageTheme = themeStore.home;
let selectedId = null;
let configMode = 'comp'; // comp | theme

