const app = {
  data: {
    apiUrl: 'https://vue3-course-api.hexschool.io/',
    apiPath: 'carolyang-vue3',
    products: [],
  },
  getProducts() {
    axios.get(`${this.data.apiUrl}api/${this.data.apiPath}/products/all`)
      .then((res) => {
        if (res.data.success) {
          this.data.products = res.data.products;
          this.renderProducts();
        } else {
          alert(res.data.message);
          window.location = 'index.html';
        }
      })
      .catch(() => {
        alert('取得產品列表失敗');
      })
  },
  renderProducts() {
    const productsList = document.querySelector('.productsList')
    let str = '';
    this.data.products.forEach((item) => {
      str += `
        <tr>
          <td class="d-none d-md-table-cell align-middle">${item.category}</td>
          <td class="align-middle">
            <div class="thumbnail" style="background-image: url('${item.imageUrl}')"></div>
          </td>
          <td class="align-middle">${item.title}</td>
          <td class="d-none d-md-table-cell align-middle">${item.origin_price}</td>
          <td class="d-none d-md-table-cell align-middle">${item.price}</td>
          <td class="align-middle">
            <button type="button" class="btn btn-outline-danger delProductBtn" data-id="${item.id}">刪除</button>
          </td>
        </tr>
      `;
    })
    productsList.innerHTML = str;
    const delProductBtn = document.querySelectorAll('.delProductBtn');
    delProductBtn.forEach((item) => {
      item.addEventListener('click', this.delProduct.bind(this));
    })
  },
  delProduct(e) {
    const { id } = e.target.dataset;

    axios.delete(`${this.data.apiUrl}api/${this.data.apiPath}/admin/product/${id}`)
      .then((res) => {
        if (res.data.success) {
          alert('刪除成功');
          this.getProducts();
        } else {
          alert(res.data.message);
        }
      })
      .catch(() => {
        alert('刪除產品失敗');
      })
  },
  init() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexschoolVueToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.getProducts();
  }
}

app.init();