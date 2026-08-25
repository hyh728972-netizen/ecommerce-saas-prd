// ==================== 预览渲染 ====================
let previewZoom = 0.5;

function setPreviewZoom(z) {
  let zoom = parseFloat(z);
  if (isNaN(zoom)) zoom = 0.5;
  if (zoom > 1 && zoom <= 100) zoom = zoom / 100;
  zoom = Math.max(0.25, Math.min(1, zoom));
  previewZoom = Math.round(zoom * 100) / 100;
  document.documentElement.style.setProperty('--pw-zoom', String(previewZoom));
  const pct = Math.round(previewZoom * 100);
  const slider = document.getElementById('previewZoomSlider');
  const label = document.getElementById('previewZoomLabel');
  if (slider && String(slider.value) !== String(pct)) slider.value = String(pct);
  if (label) label.textContent = pct + '%';
  syncPreviewStageHeight();
}

function nudgePreviewZoom(deltaPct) {
  const next = Math.round(previewZoom * 100) + (parseInt(deltaPct, 10) || 0);
  setPreviewZoom(next / 100);
}

function syncPreviewStageHeight() {
  const canvas = document.getElementById('previewRoot');
  const stage = document.getElementById('previewStage');
  if (!canvas || !stage) return;
  // 等一帧让图片/布局稳定
  requestAnimationFrame(() => {
    const h = canvas.scrollHeight * previewZoom;
    stage.style.height = Math.max(h, 200) + 'px';
  });
}

function renderPreview() {
  const root = document.getElementById('previewRoot');
  const allComps = (typeof getRenderComponents === 'function') ? getRenderComponents() : components;
  const pageComps = allComps.filter(c => c.group === 'page');
  const RED_ZONE_IDS = new Set(['header', 'hero']);
  const theme = pageTheme || defaultPageTheme;
  const themeStyle = buildPageThemeStyle(theme);

  let topbarHtml = '';
  let topHtml = '';
  let plainZoneHtml = '';
  let bodyHtml = '';
  let footHtml = '';
  let idx = 0;

  pageComps.forEach(c => {
    idx += 1;
    const block = renderBlock(c, idx);
    const plainHeader = c.id === 'header' && c.config && c.config.variant === 'plain';
    if (c.id === 'topbar') topbarHtml += block;
    else if (plainHeader || c.id === 'breadcrumb') plainZoneHtml += block;
    else if (RED_ZONE_IDS.has(c.id)) topHtml += block;
    else if (c.id === 'footer') footHtml += block;
    else bodyHtml += block;
  });

  let floatHtml = '';
  allComps.filter(c => c.group === 'float').forEach((c, i) => {
    floatHtml += renderFloat(c, pageComps.length + i + 1);
  });

  root.innerHTML =
    '<div class="pw-page" style="' + themeStyle + '">' +
      topbarHtml +
      (topHtml ? '<div class="pw-top-zone">' + topHtml + '</div>' : '') +
      (plainZoneHtml ? '<div class="pw-plain-zone">' + plainZoneHtml + '</div>' : '') +
      '<div class="pw-body">' + bodyHtml + '</div>' +
      footHtml +
      floatHtml +
    '</div>';

  syncPreviewStageHeight();
  root.querySelectorAll('img').forEach(img => {
    if (!img.complete) img.addEventListener('load', syncPreviewStageHeight, { once: true });
  });
  bindPreviewComponentClicks();
}

function bindPreviewComponentClicks() {
  const root = document.getElementById('previewRoot');
  if (!root || root.dataset.clickBound === '1') return;
  root.dataset.clickBound = '1';
  root.addEventListener('click', function (e) {
    const block = e.target.closest('.pw-block[data-id]');
    if (!block) return;
    const id = block.getAttribute('data-id');
    if (!id) return;
    e.preventDefault();
    e.stopPropagation();
    if (typeof selectComponent === 'function') selectComponent(id);
  });
}

function buildPageThemeStyle(theme) {
  const t = theme || defaultPageTheme;
  const parts = [
    '--pw-text:' + (t.textColor || '#333333'),
    '--pw-font-size:' + (t.fontSize || 14) + 'px',
    '--pw-primary:' + (t.primaryColor || '#e1251b')
  ];
  if ((t.bgMode || 'color') === 'image') {
    const bg = t.bgImg || (t.bgImgKey ? imgOf(t.bgImgKey) : '');
    if (bg) {
      parts.push('background-image:url(' + JSON.stringify(bg) + ')');
      parts.push('background-size:cover');
      parts.push('background-position:center top');
      parts.push('background-repeat:no-repeat');
      parts.push('background-color:' + (t.bgColor || '#f4f4f4'));
    } else {
      parts.push('background:' + (t.bgColor || '#f4f4f4'));
    }
  } else {
    parts.push('background:' + (t.bgColor || '#f4f4f4'));
  }
  return parts.join(';');
}

function resolveHeaderLogoSrc(cfg) {
  cfg = cfg || {};
  if (cfg.logoImg) return cfg.logoImg;
  if (cfg.logoImgKey) return imgOf(cfg.logoImgKey);
  // 兼容旧版：曾写在全局风格中的图片
  const t = pageTheme || defaultPageTheme;
  if (t.logoImg) return t.logoImg;
  if (t.logoImgKey) return imgOf(t.logoImgKey);
  return '';
}

function clampLogoNum(val, min, max, fallback) {
  const n = parseInt(val, 10);
  if (isNaN(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

/** 品牌展示参数：优先搜索头部配置，兼容旧版全局风格 */
function resolveHeaderBrand(cfg) {
  const theme = pageTheme || defaultPageTheme;
  cfg = cfg || {};
  const text = (cfg.logoText != null && String(cfg.logoText).trim() !== '')
    ? cfg.logoText
    : (theme.logoText || '苏银豆商城');
  const sub = cfg.logoSub != null
    ? cfg.logoSub
    : (theme.logoSub || '');
  return {
    logoMode: cfg.logoMode || theme.logoMode || 'both',
    logoOrder: cfg.logoOrder || theme.logoOrder || 'logoFirst',
    logoSize: cfg.logoSize != null ? cfg.logoSize : (theme.logoSize != null ? theme.logoSize : 36),
    logoRadius: cfg.logoRadius != null ? cfg.logoRadius : (theme.logoRadius != null ? theme.logoRadius : 0),
    text: text || 'Logo',
    sub: sub
  };
}

/** 搜索头部品牌区：both | logo | text；both 时支持 logoFirst / textFirst */
function buildHeaderLogoHtml(cfg) {
  const brand = resolveHeaderBrand(cfg);
  const mode = brand.logoMode;
  const order = brand.logoOrder;
  const logoSrc = resolveHeaderLogoSrc(cfg);
  const showImg = (mode === 'both' || mode === 'logo') && !!logoSrc;
  const showText = mode === 'both' || mode === 'text' || (mode === 'logo' && !logoSrc);
  const logoSize = clampLogoNum(brand.logoSize, 20, 120, 36);
  const logoRadius = clampLogoNum(brand.logoRadius, 0, 60, 0);

  let imgHtml = '';
  if (showImg) {
    const combo = showText && mode === 'both';
    const imgStyle = combo
      ? ('width:' + logoSize + 'px;height:' + logoSize + 'px;max-width:' + logoSize + 'px;max-height:' + logoSize + 'px;border-radius:' + logoRadius + 'px')
      : ('height:' + logoSize + 'px;width:auto;max-width:' + Math.min(logoSize * 3, 160) + 'px;border-radius:' + logoRadius + 'px');
    imgHtml = '<img class="logo-img" src="' + esc(logoSrc) + '" alt="' + esc(brand.text) + '" style="' + imgStyle + '">';
  }
  const textHtml = showText
    ? ('<span class="logo-text-wrap">' +
        '<span class="logo-text">' + esc(brand.text) + '</span>' +
        (brand.sub ? '<span class="logo-sub">' + esc(brand.sub) + '</span>' : '') +
      '</span>')
    : '';

  let inner = '';
  let cls = 'pw-logo';
  if (showImg && showText) {
    cls += ' is-combo';
    inner = order === 'textFirst' ? (textHtml + imgHtml) : (imgHtml + textHtml);
  } else if (showImg) {
    cls += ' is-logo-only';
    inner = imgHtml;
  } else {
    cls += ' is-text-only';
    inner = textHtml || ('<span class="logo-text-wrap"><span class="logo-text">' + esc(brand.text) + '</span></span>');
  }

  const widthStyle = cfg.logoWidth ? ('width:' + cfg.logoWidth + 'px;') : '';
  const logoVarStyle = ' style="' + widthStyle + '--logo-size:' + logoSize + 'px;--logo-radius:' + logoRadius + 'px"';
  return '<a class="' + cls + '" href="' + esc(cfg.logoLink || '#') + '"' + logoVarStyle + '>' + inner + '</a>';
}

function blockWrap(c, idx, inner, extraStyle) {
  extraStyle = extraStyle || '';
  const d = c.on ? 'block' : 'none';
  const hl = c.id === selectedId ? ' highlight' : '';
  return '<div class="pw-block' + hl + '" data-id="' + c.id + '" style="display:' + d + ';' + extraStyle + '">' +
    '<span class="pw-num">' + idx + '</span><span class="pw-tag">' + esc(c.name) + '</span>' +
    inner +
  '</div>';
}

/** 兼容活动规则条旧版 label/text 配置 */
function normalizeNoticeLikeConfig(cfg) {
  cfg = cfg || {};
  if (Array.isArray(cfg.notices)) return cfg;
  const text = cfg.text || '';
  return {
    height: cfg.height || 40,
    bgColor: cfg.bgColor || '#ffffff',
    textColor: cfg.textColor || '#666666',
    badgeText: cfg.badgeText || cfg.label || '公告',
    badgeColor: cfg.badgeColor || '#e1251b',
    showMore: cfg.showMore === true,
    moreText: cfg.moreText || '更多',
    moreLink: cfg.moreLink || '',
    enableScroll: cfg.enableScroll !== false,
    scrollInterval: cfg.scrollInterval || 28,
    notices: text ? [text] : []
  };
}

function renderNoticeBarHtml(cfg) {
  cfg = normalizeNoticeLikeConfig(cfg);
  const items = cfg.notices || [];
  const scrolling = cfg.enableScroll !== false && items.length > 0;
  const duration = Math.max(5, cfg.scrollInterval || 28);
  const moreHref = resolvePageRoute(cfg.moreLink);
  const textJoined = items.map(esc).join('　·　');
  const badgeSrc = noticeBadgeSrc(cfg);
  const badgeHtml = badgeSrc
    ? '<span class="nb nb-img"><img src="' + esc(badgeSrc) + '" alt=""></span>'
    : '<span class="nb" style="background:' + cfg.badgeColor + '">' + esc(cfg.badgeText) + '</span>';
  const trackHtml = scrolling
    ? '<div class="nt-viewport"><div class="nt-track" style="animation-duration:' + duration + 's">' +
        '<div class="nt-inner">' + items.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
        '<div class="nt-inner" aria-hidden="true">' + items.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
      '</div></div>'
    : '<span class="nt">' + textJoined + '</span>';
  return '<div class="pw-notice" style="height:' + cfg.height + 'px;background:' + cfg.bgColor + ';color:' + cfg.textColor + '">' +
    badgeHtml +
    trackHtml +
    (cfg.showMore
      ? '<a style="color:' + cfg.textColor + ';text-decoration:none;flex-shrink:0;font-size:12px" href="' + esc(moreHref || '#') + '">' + esc(cfg.moreText) + ' →</a>'
      : '') +
  '</div>';
}

function renderBlock(c, idx) {
  const cfg = c.config;
  if (typeof isFloorSectionComp === 'function' ? isFloorSectionComp(c) : (c.type === 'FloorSection' || /^floor\d+$/.test(c.id))) {
    return blockWrap(c, idx, renderFloor(cfg));
  }
  switch (c.id) {
    case 'topbar':
      return blockWrap(c, idx,
        '<div class="pw-topbar" style="height:' + cfg.height + 'px;background:' + cfg.bgColor + ';color:' + cfg.textColor + '">' +
          '<div>' + (cfg.leftMenus || []).map(m => '<a>' + esc(m.name) + (m.hasDropdown ? ' ▾' : '') + '</a>').join('') + '</div>' +
          '<div>' + (cfg.rightMenus || []).map(m => '<a>' + esc(m.name) + (m.showBadge && cfg.showCartBadge !== false ? '<sup style="color:#e1251b;margin-left:2px">3</sup>' : '') + '</a>').join('') + '</div>' +
        '</div>');

    case 'header': {
      const plain = cfg.variant === 'plain';
      const showPromos = !plain && (cfg.promos || []).length > 0;
      return blockWrap(c, idx,
        '<div class="pw-header' + (plain ? ' is-plain' : '') + '">' +
          buildHeaderLogoHtml(cfg) +
          '<div class="pw-search-wrap">' +
                '<div class="pw-search"><span class="s-ph">' + esc(cfg.searchPlaceholder) + '</span>' +
                  '<span class="s-btn">' + esc(cfg.searchBtnText) + '</span></div>' +
                (cfg.showHotWords !== false
                  ? '<div class="pw-hot">' + (cfg.hotWords || []).map(function (w) {
                      const item = normalizeHotWord(w);
                      return '<a class="' + (item.highlight ? 'hi' : '') + '" href="#">' + esc(item.text) + '</a>';
                    }).join('') + '</div>'
                  : '') +
                (showPromos
                  ? '<div class="pw-hpromo-shell">' +
                      '<div class="pw-hpromo-bg"></div>' +
                      '<img class="header-promo-mascot" src="../assets/promo-mascot.png" alt="">' +
                      '<div class="pw-hpromos">' +
                        (cfg.promos || []).map(function (p, i) {
                          return '<div class="pw-hpromo' + (i === 1 ? ' is-wide' : '') + '">' +
                            '<img src="' + esc(promoImgSrc(p, i)) + '" alt="">' +
                            '<div class="copy">' +
                              '<h4 class="' + (i === 1 ? 'hl' : '') + '">' + esc(p.title) + '</h4>' +
                              '<p>' + esc(p.desc) + '</p>' +
                              '<span class="tag">' + esc(p.tag) + '</span>' +
                            '</div></div>';
                        }).join('') +
                      '</div>' +
                    '</div>'
                  : '') +
              '</div>' +
          (cfg.showCart
            ? '<div class="pw-cart"><div class="cart-ico">' +
                '<img src="' + CART_ICON + '" alt="">' +
                (cfg.showCartBadge !== false ? '<span class="badge">3</span>' : '') +
              '</div><div>' + esc(cfg.cartText || '购物车') + '</div></div>'
            : '') +
        '</div>');
    }

    case 'breadcrumb': {
      const items = cfg.items || [];
      return blockWrap(c, idx,
        '<nav class="pw-breadcrumb">' +
          items.map(function (it, i) {
            const last = i === items.length - 1;
            if (last || !it.link) {
              return '<span class="pw-bc-current">' + esc(it.text) + '</span>';
            }
            return '<a href="' + esc(it.link) + '">' + esc(it.text) + '</a><span class="pw-bc-sep">›</span>';
          }).join('') +
        '</nav>');
    }

    case 'actHero': {
      const img = (cfg.img || cfg.imgUrl)
        ? (cfg.img || cfg.imgUrl)
        : imgOf(cfg.imgKey || 'p12');
      return blockWrap(c, idx,
        '<div class="pw-act-hero" style="height:' + (cfg.height || 320) + 'px;border-radius:' + (cfg.radius || 12) + 'px">' +
          (img ? '<img src="' + esc(img) + '" alt="">' : '') +
          '<div class="pw-act-hero-mask"></div>' +
          '<div class="pw-act-hero-copy">' +
            '<div class="pw-act-hero-title">' + esc(cfg.title || '') + '</div>' +
            '<div class="pw-act-hero-sub">' + esc(cfg.subtitle || '') + '</div>' +
            (cfg.showTags !== false && (cfg.tags || []).length
              ? '<div class="pw-act-hero-tags">' + (cfg.tags || []).map(function (t) {
                  return '<span class="pw-act-hero-tag">' + esc(t) + '</span>';
                }).join('') + '</div>'
              : '') +
          '</div>' +
        '</div>');
    }

    case 'actRule':
      return blockWrap(c, idx, renderNoticeBarHtml(cfg));

    case 'hero': {
      const slides = (cfg.banners && cfg.banners.length) ? cfg.banners : defaultBannerSlides();
      const active = slides[0] || {};
      const pointsDays = Math.max(1, parseInt(cfg.pointsExpireRemindDays, 10) || 7);
      const priceDays = Math.max(1, parseInt(cfg.priceDropRemindDays, 10) || 7);
      const couponDays = Math.max(1, parseInt(cfg.couponExpireRemindDays, 10) || 3);
      const alertCards = [];
      if (cfg.showAlerts !== false) {
        alertCards.push({ title: '降价提醒', desc: '油画颜料画笔套装降至¥89（近' + priceDays + '天）' });
        alertCards.push({ title: '积分提醒', desc: '有积分将在' + pointsDays + '天内到期' });
        alertCards.push({ title: '卡券提醒', desc: '有卡券将在' + couponDays + '天内到期' });
      }
      const customImg = bannerHasCustomImage(active);
      const link = resolvePageRoute(active.link);
      const bannerInner = customImg
        ? '<img class="cover" src="' + esc(bannerThumbSrc(active, 0)) + '" alt="">'
        : (
          '<img class="bg" src="' + esc(active.bg || bannerThumbSrc(active, 0)) + '" alt="">' +
          (active.fg ? '<img class="fg" src="' + esc(active.fg) + '" alt="">' : '')
        );
      const bannerBlock = '<div class="pw-banner-real">' +
        (link && link !== '#'
          ? '<a class="bn-link" href="' + esc(link) + '" title="' + esc(link) + '">' + bannerInner + '</a>'
          : bannerInner) +
        '<div class="dots">' + slides.map(function (_, i) {
          return '<i class="' + (i === 0 ? 'on' : '') + '"></i>';
        }).join('') + '</div>' +
      '</div>';
      return blockWrap(c, idx,
        '<div class="pw-hero" style="height:' + (cfg.height || 410) + 'px;background:' + cfg.bgColor + ';border-radius:' + (cfg.radius || 12) + 'px">' +
          (cfg.showCategories
            ? '<div class="pw-cats" style="width:' + (cfg.categoryWidth || 220) + 'px">' +
                '<div class="ct">' + esc(cfg.categoryTitle) + '</div>' +
                '<div class="cats-body">' +
                (ALL_CATEGORIES || []).map(function (cat) {
                  const name = typeof cat === 'string' ? cat : cat.name;
                  const sub = typeof cat === 'string' ? '' : (cat.sub || '');
                  const iconKey = typeof cat === 'string' ? '' : (cat.iconKey || '');
                  const iconSrc = iconKey && CAT_ICONS[iconKey] ? CAT_ICONS[iconKey] : '';
                  return '<div class="ci">' +
                    (iconSrc ? '<img src="' + iconSrc + '" alt="">' : '<span class="ico">·</span>') +
                    '<span>' + esc(name) + (sub ? '<span class="split">/</span><span class="sub">' + esc(sub) + '</span>' : '') + '</span></div>';
                }).join('') +
                '</div></div>'
            : '') +
          (cfg.showBanner ? bannerBlock : '') +
          (cfg.showUserPanel
            ? '<div class="pw-user" style="width:' + (cfg.userPanelWidth || 220) + 'px">' +
                (cfg.showVipBadge ? '<div class="vip"><span>' + esc(cfg.vipBadgeText) + '</span></div>' : '') +
                '<div class="uhead">' +
                  '<div class="avatar"><img src="' + imgOf('watch') + '" alt=""></div>' +
                  '<div class="uinfo">' +
                    (cfg.showUserName !== false ? '<div class="uname">张经理</div>' : '') +
                    '<span class="ubadge">企业 2年</span>' +
                  '</div>' +
                '</div>' +
                (cfg.showAssets !== false
                  ? '<div class="assets">' + (cfg.assets || []).map(function (a, ai) {
                      const demo = assetDemoValue(a.label, ai);
                      return '<div class="a">' +
                        (a.showValue !== false ? '<div class="v">' + esc(demo) + '</div>' : '') +
                        '<div class="l">' + esc(a.label) + '</div></div>';
                    }).join('') + '</div>'
                  : '') +
                (cfg.showAlerts !== false && alertCards.length
                  ? '<div class="alerts">' +
                      alertCards.map(function (a) {
                        return '<div class="alert-card"><div class="alert-ico">豆</div><div class="alert-body">' +
                          '<div class="alert-t">' + esc(a.title) + '</div>' +
                          '<div class="alert-d">' + esc(a.desc) + '</div></div></div>';
                      }).join('') +
                    '</div>'
                  : '') +
                (cfg.showServiceNav
                  ? '<div class="svc-title"><span>我的服务</span></div>' +
                    '<div class="svc">' + (cfg.services || []).map(function (s) {
                      return '<span>' + esc(s.name || s) + '</span>';
                    }).join('') + '</div>'
                  : '') +
              '</div>'
            : '') +
        '</div>');
    }

    case 'notice':
      return blockWrap(c, idx, renderNoticeBarHtml(cfg));

    case 'opsRow':
      return blockWrap(c, idx,
        '<div class="pw-ops" style="grid-template-columns:repeat(' + (cfg.columns || 4) + ',1fr);gap:' + (cfg.gap || 12) + 'px">' +
          (cfg.slots || []).map(renderOpsSlot).join('') +
        '</div>');

    case 'welfare': {
      const cards = cfg.cards || [];
      const gap = cfg.cardGap != null ? cfg.cardGap : 10;
      const n = Math.max(1, cards.length);
      return blockWrap(c, idx,
        '<div class="pw-welfare" style="height:' + (cfg.height || 210) + 'px;background:linear-gradient(105deg,' + cfg.bgFrom + ' 0%,#ff5c8a 38%,#ff7a9a 68%,' + cfg.bgTo + ' 100%)">' +
          '<div class="wl">' +
            '<div class="wt" style="color:' + cfg.titleColor + '">' + esc(cfg.title) + '<br>' + esc(cfg.subtitle) + '</div>' +
            (cfg.showButton
              ? '<a class="wb" href="' + esc(resolvePageRoute(cfg.buttonLink) || '#') + '">' + esc(cfg.buttonText) + '<i></i></a>'
              : '') +
          '</div>' +
          '<div class="wcards" style="grid-template-columns:repeat(' + n + ',minmax(0,1fr));gap:' + gap + 'px">' +
            cards.map(function (cd, i) {
              const href = resolvePageRoute(cd.link);
              const tag = href && href !== '#' ? 'a' : 'div';
              const hrefAttr = tag === 'a' ? ' href="' + esc(href) + '" title="' + esc(href) + '"' : '';
              return '<' + tag + ' class="wc"' + hrefAttr + '>' +
                '<div class="wch">' +
                  '<div class="wct">' + esc(cd.title) + '</div>' +
                  '<div class="wcs">' + esc(cd.desc) + '</div>' +
                  '<span class="arrow"></span>' +
                '</div>' +
                '<div class="wci"><img src="' + esc(welfareCardImgSrc(cd, i)) + '" alt=""></div>' +
              '</' + tag + '>';
            }).join('') +
          '</div>' +
        '</div>');
    }

    case 'feed': {
      const tabs = normalizeFeedTabs(cfg);
      const active = Math.min(cfg.defaultTab || 0, Math.max(0, tabs.length - 1));
      const resolved = resolveFeedProducts(cfg, active);
      return blockWrap(c, idx,
        '<div class="pw-feed" style="background:' + cfg.bgColor + '">' +
          '<div class="tabs">' + tabs.map(function (t, i) {
            return '<span class="tab' + (i === active ? ' on' : '') + '"' +
              (i === active ? ' style="color:' + cfg.tabColor + ';border-bottom-color:' + cfg.tabColor + '"' : '') +
              '>' + esc(t.name) + '</span>';
          }).join('') + '</div>' +
          '<div class="feed-grid" style="grid-template-columns:repeat(' + resolved.cols + ',1fr)">' +
            resolved.products.map(function (p) { return renderProductCardHTML(p, cfg); }).join('') +
          '</div>' +
        '</div>');
    }

    case 'footer':
      return blockWrap(c, idx,
        '<div class="pw-footer" style="background:' + cfg.bgColor + '">' +
          '<div class="cols">' + (cfg.columns || []).map(function (col) {
            return '<div class="col">' +
              '<div class="ct" style="color:' + cfg.titleColor + '">' + esc(col.title) + '</div>' +
              (col.links || []).map(function (l) {
                const href = resolvePageRoute(l.url);
                return '<a style="color:' + cfg.linkColor + '" href="' + esc(href || '#') + '">' + esc(l.text) + '</a>';
              }).join('') +
            '</div>';
          }).join('') + '</div>' +
          '<div class="bottom">' +
            '<div class="legal">' + (cfg.legalLinks || []).map(function (l) {
              return '<a href="' + esc(l.url || '#') + '">' + esc(l.text) + '</a>';
            }).join(' | ') + '</div>' +
            (cfg.showCopyright
              ? '<div>' + esc(cfg.copyright) + (cfg.icp ? ' | ' + esc(cfg.icp) : '') + '</div>'
              : '') +
          '</div>' +
        '</div>');

    default:
      return '';
  }
}

function renderOpsSlot(slot) {
  const more = '<span class="om">' + esc(slot.moreText || '更多 ›') + '</span>';
  if (slot.type === 'rankList') {
    const items = sampleProducts(slot.itemCount || 9);
    return '<div class="pw-ops-card">' +
      '<div class="oh"><span class="ot">' + esc(slot.title) + '</span>' + more + '</div>' +
      items.map(function (p, i) {
        return '<div class="rank-item">' +
          '<span class="rk' + (i < 3 && slot.showRankBadge ? ' top' : '') + '">' + (i + 1) + '</span>' +
          '<span class="thumb rank-thumb"><img src="' + esc(p.img) + '" alt=""></span>' +
          '<span class="rn">' + esc(p.name) + '</span>' +
          '<span class="rp">¥' + p.price + '</span>' +
        '</div>';
      }).join('') +
    '</div>';
  }
  if (slot.type === 'brandZone') {
    return '<div class="pw-ops-card">' +
      '<div class="oh"><span class="ot">' + esc(slot.title) + '</span>' + more + '</div>' +
      (slot.brands || []).map(function (b, i) {
        const href = resolvePageRoute(b.link);
        const tag = href && href !== '#' ? 'a' : 'div';
        const hrefAttr = tag === 'a' ? ' href="' + esc(href) + '" title="' + esc(href) + '"' : '';
        return '<' + tag + ' class="brand-slot" style="height:' + brandSlotHeight(b) + 'px"' + hrefAttr + '>' +
          '<img src="' + esc(brandImgSrc(b, i)) + '" alt="">' +
          '<div class="bt">' + esc(b.name) + '</div>' +
          '<div class="bs">' + esc(b.sub) + '</div>' +
        '</' + tag + '>';
      }).join('') +
    '</div>';
  }
  const resolved = resolveSlotProducts(slot);
  return '<div class="pw-ops-card">' +
    '<div class="oh"><span class="ot">' + esc(slot.title) + '</span>' + more + '</div>' +
    '<div class="mini-grid" style="grid-template-columns:repeat(' + resolved.cols + ',minmax(0,1fr));grid-template-rows:repeat(' + resolved.rows + ',auto)">' +
      resolved.products.map(function (p) {
        return renderProductCardHTML(p, {
          showBrand: true,
          showTags: false,
          showPromoText: false,
          showOriginalPrice: true,
          showCart: !!slot.showCart
        });
      }).join('') +
    '</div>' +
  '</div>';
}

function renderFloor(cfg) {
  const resolved = resolveFloorProducts(cfg);
  const viewAllHref = resolvePageRoute(cfg.viewAllLink);
  const header =
    '<div class="fh">' +
      '<span class="fn" style="background:' + cfg.floorNumColor + '">' + esc(cfg.floorNum) + '</span>' +
      '<span class="ft" style="color:' + cfg.titleColor + '">' + esc(cfg.title) + '</span>' +
      (cfg.showViewAll
        ? (viewAllHref && viewAllHref !== '#'
            ? '<a class="fa" href="' + esc(viewAllHref) + '">' + esc(cfg.viewAllText || '查看全部 ›') + '</a>'
            : '<span class="fa">' + esc(cfg.viewAllText || '查看全部 ›') + '</span>')
        : '') +
    '</div>';

  const prodGrid =
    '<div class="floor-prods" style="grid-template-columns:repeat(' + resolved.cols + ',minmax(0,1fr))">' +
      resolved.products.map(function (p) { return renderProductCardHTML(p, cfg); }).join('') +
    '</div>';

  const floorImgs = ['pen', 'sneaker', 'skincare', 'watch', 'shirt', 'bags', 'headphone', 'chair'];
  let left = '';
  const featW = featuredWidthPx(cfg, cfg.layout === 'tallCarousel' ? 220 : (cfg.layout === 'posterStack' ? 200 : 280));
  const leftW = (function () {
    if (cfg.layout === 'poster1x2') {
      const n = parseInt(cfg.leftWidth, 10);
      if (isNaN(n)) return 280;
      return Math.max(160, Math.min(480, n));
    }
    return featW;
  })();

  if (cfg.layout === 'featuredMix') {
    left = '<div class="floor-left" style="width:' + leftW + 'px">' +
      '<div class="f-banner" style="position:relative;overflow:hidden;padding:0;min-height:160px">' +
        '<img src="' + esc(featuredImgSrc(cfg.featured, 'pen')) + '" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.35">' +
        '<div style="position:relative;z-index:1;padding:14px;height:100%;display:flex;flex-direction:column;justify-content:flex-end;box-sizing:border-box">' +
          '<div class="fbt">' + esc((cfg.featured && cfg.featured.title) || '') + '</div>' +
          '<div class="fbtags">' + ((cfg.featured && cfg.featured.tags) || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="f-subrow">' + (cfg.subCards || []).map(function (s, i) {
        return '<div class="f-sub" style="position:relative;overflow:hidden;padding:0">' +
          '<img src="' + esc(floorSideImgSrc(s, floorImgs[i + 1])) + '" alt="" style="position:absolute;right:0;top:0;width:45%;height:100%;object-fit:cover">' +
          '<div style="position:relative;z-index:1;padding:10px;max-width:55%"><div class="st">' + esc(s.title) + '</div><div class="ss">' + esc(s.subtitle || '') + '</div></div>' +
        '</div>';
      }).join('') + '</div>' +
    '</div>';
  } else if (cfg.layout === 'bannerGrid') {
    left = '<div class="floor-left" style="width:' + leftW + 'px">' +
      '<div class="f-banner" style="min-height:180px;position:relative;overflow:hidden;padding:0">' +
        '<img src="' + esc(featuredImgSrc(cfg.featured, 'sneaker')) + '" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">' +
        '<div style="position:relative;z-index:1;padding:14px;background:linear-gradient(90deg,rgba(255,255,255,.92),transparent);height:100%;box-sizing:border-box">' +
          '<div style="font-size:11px;color:#999">' + esc((cfg.featured && cfg.featured.brand) || '') + '</div>' +
          '<div class="fbt">' + esc((cfg.featured && cfg.featured.title) || '') + '</div>' +
          '<div class="fbtags">' + ((cfg.featured && cfg.featured.tags) || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
        '</div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">' +
        (cfg.subCards || []).slice(0, 1).map(function (s) {
          return '<div class="f-sub" style="grid-row:span 2;height:auto;min-height:110px;position:relative;overflow:hidden;padding:0">' +
            '<img src="' + esc(floorSideImgSrc(s, floorImgs[2])) + '" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.5" alt="">' +
            '<div style="position:relative;z-index:1;padding:10px"><div class="st">' + esc(s.brand || s.title) + '</div><div class="ss">' + esc(s.title) + '</div></div>' +
          '</div>';
        }).join('') +
        '<div style="display:flex;flex-direction:column;gap:8px">' +
          (cfg.subCards || []).slice(1).map(function (s, i) {
            return '<div class="f-sub" style="position:relative;overflow:hidden;padding:0">' +
              '<img src="' + esc(floorSideImgSrc(s, floorImgs[3 + i])) + '" style="position:absolute;right:0;top:0;width:40%;height:100%;object-fit:cover" alt="">' +
              '<div style="position:relative;z-index:1;padding:10px;max-width:60%"><div class="st">' + esc(s.brand || s.title) + '</div><div class="ss">' + esc(s.title) + '</div></div>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>' +
    '</div>';
  } else if (cfg.layout === 'tallCarousel') {
    left = '<div class="floor-left" style="width:' + leftW + 'px">' +
      '<div class="f-banner" style="min-height:100%;flex:1;position:relative;overflow:hidden;padding:0">' +
        '<img src="' + esc(featuredImgSrc(cfg.featured, 'skincare')) + '" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" alt="">' +
        '<div style="position:relative;z-index:1;padding:14px;background:linear-gradient(180deg,transparent,rgba(0,0,0,.45));height:100%;display:flex;flex-direction:column;justify-content:flex-end;box-sizing:border-box;color:#fff">' +
          '<div class="fbt" style="color:#fff">' + esc((cfg.featured && cfg.featured.title) || '') + '</div>' +
          '<div class="fbtags">' + ((cfg.featured && cfg.featured.tags) || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="floor-left w200" style="width:160px">' +
      (cfg.subCards || []).map(function (s, i) {
        return '<div class="f-sub" style="height:' + (s.isCta ? '56' : '64') + 'px;margin-bottom:8px;position:relative;overflow:hidden;padding:0">' +
          '<img src="' + esc(floorSideImgSrc(s, floorImgs[i % floorImgs.length])) + '" style="position:absolute;right:0;top:0;width:40%;height:100%;object-fit:cover" alt="">' +
          '<div style="position:relative;z-index:1;padding:10px;max-width:60%"><div class="st">' + esc(s.title) + '</div><div class="ss">' + esc(s.subtitle || '') + '</div></div>' +
        '</div>';
      }).join('') +
    '</div>';
  } else if (cfg.layout === 'posterStack') {
    const featHref = resolvePageRoute(cfg.featured && cfg.featured.link);
    const featTag = featHref && featHref !== '#' ? 'a' : 'div';
    const featHrefAttr = featTag === 'a' ? ' href="' + esc(featHref) + '"' : '';
    left = '<div class="floor-left" style="width:' + leftW + 'px">' +
      '<' + featTag + ' class="f-banner"' + featHrefAttr + ' style="min-height:100%;flex:1;position:relative;overflow:hidden;padding:0;display:block;text-decoration:none;color:inherit">' +
        '<img src="' + esc(featuredImgSrc(cfg.featured, 'watch')) + '" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" alt="">' +
        '<div style="position:relative;z-index:1;padding:14px;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.5));height:100%;display:flex;flex-direction:column;justify-content:flex-end;box-sizing:border-box;color:#fff">' +
          ((cfg.featured && cfg.featured.brand)
            ? '<div style="font-size:11px;opacity:.85;margin-bottom:4px">' + esc(cfg.featured.brand) + '</div>'
            : '') +
          '<div class="fbt" style="color:#fff">' + esc((cfg.featured && cfg.featured.title) || '') + '</div>' +
          '<div class="fbtags">' + ((cfg.featured && cfg.featured.tags) || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
        '</div>' +
      '</' + featTag + '>' +
    '</div>';
  } else if (cfg.layout === 'poster1x2') {
    const posters = (cfg.posters || []).slice(0, 3);
    const fallbacks = ['watch', 'headphone', 'camera'];
    function renderPosterCell(p, i, extraStyle) {
      const href = resolvePageRoute(p && p.link);
      const tag = href && href !== '#' ? 'a' : 'div';
      const hrefAttr = tag === 'a' ? ' href="' + esc(href) + '"' : '';
      return '<' + tag + ' class="f-poster"' + hrefAttr +
        ' style="position:relative;overflow:hidden;padding:0;display:block;text-decoration:none;color:inherit;box-sizing:border-box;' + (extraStyle || '') + '">' +
        '<img src="' + esc(floorSideImgSrc(p, fallbacks[i] || 'pen')) + '" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" alt="">' +
        '<div style="position:relative;z-index:1;padding:10px;background:linear-gradient(90deg,rgba(255,255,255,.92),transparent);height:100%;display:flex;flex-direction:column;justify-content:center;box-sizing:border-box">' +
          (p && p.brand ? '<div class="pb">' + esc(p.brand) + '</div>' : '') +
          '<div class="pt">' + esc((p && p.title) || '') + '</div>' +
          (p && p.subtitle ? '<div class="ps">' + esc(p.subtitle) + '</div>' : '') +
        '</div>' +
      '</' + tag + '>';
    }
    const top = posters[0] ? renderPosterCell(posters[0], 0, 'flex:1;min-height:140px') : '';
    const bottom = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">' +
      (posters[1] ? renderPosterCell(posters[1], 1, 'min-height:100px') : '<div style="min-height:100px"></div>') +
      (posters[2] ? renderPosterCell(posters[2], 2, 'min-height:100px') : '<div style="min-height:100px"></div>') +
    '</div>';
    left = '<div class="floor-left" style="width:' + leftW + 'px;gap:8px">' + top + bottom + '</div>';
  }

  return '<div class="pw-floor" style="background:' + cfg.bgColor + '">' + header +
    '<div class="floor-body">' + left + prodGrid + '</div></div>';
}

function renderFloat(c, idx) {
  const cfg = c.config;
  const hl = c.id === selectedId ? ' highlight' : '';
  const display = c.on ? '' : 'display:none;';
  if (c.id === 'floorNav') {
    return '<div class="pw-block pw-float-left' + hl + '" data-id="' + c.id + '" style="' + display + '">' +
      '<span class="pw-num">' + idx + '</span><span class="pw-tag">' + esc(c.name) + '</span>' +
      (cfg.items || []).map(function (it, i) {
        const tid = it.targetId || '';
        const clickAttr = tid
          ? ' onclick="scrollPreviewToComponent(\'' + esc(tid) + '\')" style="cursor:pointer"'
          : '';
        return '<div class="fi' + (i === cfg.activeIndex ? ' on' : '') + '"' + clickAttr +
          (tid ? ' title="关联：' + esc(tid) + '"' : '') + '>' +
          '<span class="fn">' + esc(it.floor) + '</span>' + esc(it.label) +
        '</div>';
      }).join('') +
      (cfg.showTop ? '<div class="fi top" onclick="scrollPreviewToTop()" style="cursor:pointer">' + esc(cfg.topText || 'TOP') + '</div>' : '') +
    '</div>';
  }
  if (c.id === 'sideToolbar') {
    const mainItems = (cfg.items || []).filter(function (it) { return !it.isTop; });
    const topItems = (cfg.items || []).filter(function (it) { return it.isTop; });
    function renderToolbarItem(it, forceTop) {
      const iconHtml = dockItemIconHtml(it);
      const badge = it.showBadge
        ? '<span class="bdg">' + (cfg.cartBadgeCount || 0) + '</span>'
        : '';
      const inner = '<span class="ico-wrap">' + iconHtml + badge + '</span>' +
        '<span class="lbl">' + esc(it.label || (forceTop ? '回顶部' : '')) + '</span>';
      const link = it.link || '';
      if (forceTop || link === '#top' || it.isTop) {
        return '<div class="ti" onclick="scrollPreviewToTop()" style="cursor:pointer">' + inner + '</div>';
      }
      const href = resolvePageRoute(link);
      if (href && href !== '#') {
        return '<a class="ti" href="' + esc(href) + '" style="text-decoration:none;color:inherit;cursor:pointer">' + inner + '</a>';
      }
      return '<div class="ti">' + inner + '</div>';
    }
    return '<div class="pw-block pw-float-right' + hl + '" data-id="' + c.id + '" style="' + display + '">' +
      '<span class="pw-num">' + idx + '</span><span class="pw-tag">' + esc(c.name) + '</span>' +
      '<div class="pw-dock-main">' +
        mainItems.map(function (it) { return renderToolbarItem(it, false); }).join('') +
      '</div>' +
      (topItems.length
        ? '<div class="pw-dock-top">' + topItems.map(function (it) {
            return renderToolbarItem(it, true);
          }).join('') + '</div>'
        : '') +
    '</div>';
  }
  return '';
}
