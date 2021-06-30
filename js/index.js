const app = {
  data: {
    apiUrl: 'https://vue3-course-api.hexschool.io/',
    apiPath: 'carolyang-vue3',
  },
  el: {},
  login(e) {
    e.preventDefault();
    
    const user = {
      username: this.el.emailInput.value,
      password: this.el.passwordInput.value,
    }

    axios.post(`${this.data.apiUrl}admin/signin`, user)
      .then((res) => {
        if (res.data.success) {
          const { token, expired } = res.data;
          document.cookie = `hexschoolVueToken=${token};expires=${new Date(expired)}; path=/`;
          window.location = 'products.html';
        } else {
          alert(res.data.message);
        }
      })
      .catch(() => {
        alert('登入錯誤');
      })
  },
  init() {
    this.el.emailInput = document.querySelector('#email');
    this.el.passwordInput = document.querySelector('#password');
    this.el.loginBtn = document.querySelector('.loginBtn');

    this.el.loginBtn.addEventListener('click', this.login.bind(this));
  },
}

app.init();