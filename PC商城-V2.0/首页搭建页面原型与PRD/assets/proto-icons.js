(function (w) {
  var STROKE = {
    close: 'M18 6L6 18M6 6l12 12',
    box: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12',
    card: 'M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2z M1 10h22',
    send: 'M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z',
    truck: 'M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a2.5 2.5 0 110-5 2.5 2.5 0 010 5z M18.5 21a2.5 2.5 0 110-5 2.5 2.5 0 010 5z',
    star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    return: 'M9 14L4 9l5-5 M20 20v-7a4 4 0 00-4-4H4',
    pin: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 13a3 3 0 100-6 3 3 0 000 6z',
    ticket: 'M2 9a3 3 0 010-6h20a3 3 0 010 6M2 9v6a3 3 0 010 6h20a3 3 0 010-6V9 M12 9v6',
    list: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
    chat: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
    bean: 'M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z',
    heart: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z',
    eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 100-6 3 3 0 000 6z',
    user: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z',
    bell: 'M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0',
    settings: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 001.82 9H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V15c0 .66.26 1.3.73 1.77H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z',
    cart: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z M3 6h18 M16 10a4 4 0 01-8 0',
    link: 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71',
    chevronRight: 'M9 18l6-6-6-6',
    search: 'M11 19a8 8 0 100-16 8 8 0 000 16z M21 21l-4.35-4.35',
    menu: 'M4 6h16 M4 12h16 M4 18h16',
    check: 'M20 6L9 17l-5-5',
    grid: 'M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z',
    share: 'M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8 M16 6l-4-4-4 4 M12 2v13'
  };

  function strokeSvg(path, size) {
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '"><path d="' + path + '"/></svg>';
  }

  function brandSvg(name, size) {
    if (name === 'wechat') {
      return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '"><path fill="#07c160" d="M8.5 4C4.9 4 2 6.4 2 9.2c0 1.5.8 2.9 2.1 3.9l-.5 2.3 2.6-1.3c.9.3 1.8.4 2.8.4 3.7 0 6.7-2.3 6.7-5.1S13.5 4 8.5 4zm-2.6 5.1c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm5.2 0c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zM22 14.3c0-2.4-2.4-4.3-5.3-4.3-3 0-5.3 1.9-5.3 4.3s2.4 4.3 5.3 4.3c.8 0 1.5-.1 2.2-.4l2.1 1.1-.4-1.9c1.1-.8 1.8-2 1.8-3.1zm-7-1.1c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7zm3.4 0c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z"/></svg>';
    }
    if (name === 'alipay') {
      return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '"><rect fill="#1677ff" width="24" height="24" rx="4"/><path fill="#fff" d="M7 7.5h10v1.5H7V7.5zm0 3h7.5v1.5H7v-1.5zm0 3h9v1.5H7V13.5z"/></svg>';
    }
    return '';
  }

  function html(name, opt) {
    opt = opt || {};
    var size = opt.size || 24;
    var cls = 'proto-icon';
    if (name === 'wechat' || name === 'alipay') {
      return '<span class="' + cls + (opt.class ? ' ' + opt.class : '') + '">' + brandSvg(name, size) + '</span>';
    }
    var path = STROKE[name];
    if (!path) return '';
    var mode = name === 'star' && opt.filled ? 'proto-icon--fill' : 'proto-icon--stroke';
    if (name === 'heart' && opt.filled) mode = 'proto-icon--fill';
    return '<span class="' + cls + ' ' + mode + (opt.class ? ' ' + opt.class : '') + '">' + strokeSvg(path, size) + '</span>';
  }

  function stars(count, opt) {
    opt = opt || {};
    var n = count || 5;
    var out = '<span class="proto-stars">';
    for (var i = 0; i < n; i++) {
      out += html('star', { size: opt.size || 14, filled: true, class: 'proto-star' });
    }
    return out + '</span>';
  }

  function mount(root) {
    var scope = root || document;
    scope.querySelectorAll('[data-proto-icon]').forEach(function (el) {
      var name = el.getAttribute('data-proto-icon');
      var size = parseInt(el.getAttribute('data-icon-size') || '24', 10);
      var filled = el.getAttribute('data-icon-filled') === 'true';
      el.innerHTML = html(name, { size: size, filled: filled });
    });
    scope.querySelectorAll('[data-proto-stars]').forEach(function (el) {
      var n = parseInt(el.getAttribute('data-proto-stars') || '5', 10);
      var size = parseInt(el.getAttribute('data-icon-size') || '14', 10);
      el.innerHTML = stars(n, { size: size });
    });
  }

  w.ProtoIcon = { html: html, stars: stars, mount: mount };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { mount(); });
  } else {
    mount();
  }
})(window);
