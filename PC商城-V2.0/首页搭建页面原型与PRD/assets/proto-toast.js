(function (w) {
  var timer = null;
  var ICONS = { success: '✓', warn: '!', info: 'i' };

  function ensureWrap() {
    var wrap = document.getElementById('protoToastWrap');
    if (wrap) return wrap;
    wrap = document.createElement('div');
    wrap.id = 'protoToastWrap';
    wrap.className = 'proto-toast-wrap';
    document.body.appendChild(wrap);
    return wrap;
  }

  function render(opts) {
    opts = opts || {};
    var type = opts.type || 'success';
    var wrap = ensureWrap();
    if (timer) clearTimeout(timer);
    var cartHref = (w.ProtoPages && w.ProtoPages.cart) || '06.购物车-原型页面.html';
    var link = '';
    if (opts.link !== false && (opts.cart || opts.href || opts.linkText)) {
      link = '<a class="proto-toast-link" href="' + (opts.href || cartHref) + '">' + (opts.linkText || '去购物车 ›') + '</a>';
    }
    wrap.innerHTML =
      '<div class="proto-toast proto-toast-' + type + '">' +
      '<div class="proto-toast-icon">' + (opts.icon || ICONS[type] || '✓') + '</div>' +
      '<div class="proto-toast-body"><p>' + (opts.message || '操作成功') + '</p>' + link + '</div>' +
      '</div>';
    timer = setTimeout(function () {
      wrap.innerHTML = '';
    }, opts.duration || 2800);
  }

  w.ProtoToast = {
    show: function (opts) {
      if (arguments.length === 0) opts = { message: '已加入购物车', cart: true };
      else if (typeof opts === 'string') opts = { message: opts, link: false };
      else opts = opts || {};
      render(opts);
    },
    success: function (message, duration) {
      render({ message: message, type: 'success', link: false, duration: duration });
    },
    warn: function (message, duration) {
      render({ message: message, type: 'warn', link: false, duration: duration });
    },
    info: function (message, duration) {
      render({ message: message, type: 'info', link: false, duration: duration });
    }
  };
})(window);
