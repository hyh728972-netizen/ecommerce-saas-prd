(function (w) {
  var state = { stars: 5, onSubmit: null, product: null };

  function ensureMounted() {
    if (document.getElementById('writeReviewRoot')) return;
    var root = document.createElement('div');
    root.id = 'writeReviewRoot';
    root.innerHTML =
      '<div class="write-review-overlay" id="writeReviewOverlay">' +
      '<div class="write-review-modal">' +
      '<div class="write-review-hd"><h3>发表评价</h3><button type="button" class="write-review-close" id="writeReviewClose" data-proto-icon="close" data-icon-size="18"></button></div>' +
      '<div class="write-review-bd">' +
      '<div class="write-review-goods" id="writeReviewGoods"></div>' +
      '<div class="write-review-row"><label>商品评分</label><div class="write-review-stars" id="writeReviewStars"></div></div>' +
      '<div class="write-review-row"><label>评价内容</label><textarea id="writeReviewText" maxlength="500" placeholder="分享您的使用感受，帮助其他买家参考"></textarea><div class="write-review-count"><span id="writeReviewCount">0</span>/500</div></div>' +
      '<div class="write-review-row"><label>上传图片（选填，最多3张）</label><div class="write-review-upload" id="writeReviewUpload"></div></div>' +
      '</div>' +
      '<div class="write-review-ft">' +
      '<button type="button" class="write-review-cancel" id="writeReviewCancel">取消</button>' +
      '<button type="button" class="write-review-submit" id="writeReviewSubmit">提交评价</button>' +
      '</div></div></div>';
    document.body.appendChild(root);
    if (w.ProtoIcon) w.ProtoIcon.mount(root);

    document.getElementById('writeReviewClose').onclick = close;
    document.getElementById('writeReviewCancel').onclick = close;
    document.getElementById('writeReviewSubmit').onclick = submit;
    document.getElementById('writeReviewOverlay').onclick = function (e) {
      if (e.target.id === 'writeReviewOverlay') close();
    };
    document.getElementById('writeReviewText').oninput = function () {
      document.getElementById('writeReviewCount').textContent = this.value.length;
    };
  }

  function renderStars() {
    var el = document.getElementById('writeReviewStars');
    if (!el) return;
    el.innerHTML = [1, 2, 3, 4, 5].map(function (n) {
      return '<span class="write-review-star' + (n <= state.stars ? ' on' : '') + '" data-n="' + n + '">★</span>';
    }).join('');
    el.querySelectorAll('.write-review-star').forEach(function (s) {
      s.onclick = function () {
        state.stars = +s.dataset.n;
        renderStars();
      };
    });
  }

  function renderUpload() {
    var el = document.getElementById('writeReviewUpload');
    if (!el) return;
    el.innerHTML = '<div class="write-review-upload-btn" id="writeReviewAdd">+</div>';
    document.getElementById('writeReviewAdd').onclick = function () {
      alert('原型演示：图片上传功能略');
    };
  }

  function renderGoods(product) {
    var img = (w.IMG && product.imgKey && w.IMG[product.imgKey]) || '';
    document.getElementById('writeReviewGoods').innerHTML =
      (img ? '<img src="' + img + '" alt="">' : '') +
      '<div class="write-review-goods-name">' + (product.name || '商品') + '</div>';
  }

  function close() {
    var el = document.getElementById('writeReviewOverlay');
    if (el) el.classList.remove('active');
    state.onSubmit = null;
    state.product = null;
    var ta = document.getElementById('writeReviewText');
    if (ta) ta.value = '';
    document.getElementById('writeReviewCount').textContent = '0';
  }

  function submit() {
    var text = document.getElementById('writeReviewText').value.trim();
    if (!text) {
      alert('请填写评价内容');
      return;
    }
    var cb = state.onSubmit;
    var data = { stars: state.stars, text: text, product: state.product };
    close();
    if (cb) cb(data);
    else alert('评价提交成功，感谢您的反馈！');
  }

  w.WriteReview = {
    open: function (product, onSubmit) {
      ensureMounted();
      state.product = product || {};
      state.stars = 5;
      state.onSubmit = onSubmit;
      renderGoods(state.product);
      renderStars();
      renderUpload();
      document.getElementById('writeReviewOverlay').classList.add('active');
      document.getElementById('writeReviewText').focus();
    },
    close: close
  };
})(window);
