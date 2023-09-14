<template>
  <div class="container">
    <div class="form-container">
      <h1 class="title">智能工业运维APP</h1>
      <van-form>
        <van-field
            v-model="name"
            label="用户名"
            placeholder="请输入用户名"
            required
        ></van-field>
        <van-field
            v-model="password"
            label="密码"
            type="password"
            placeholder="请输入密码"
            required
        ></van-field>
        <van-button type="primary" block @click.prevent="login">登录</van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      password: '',
      test_worker_name: 'worker',
      test_worker_password: '123456',
      test_manager_name: 'manager',
      test_manager_password: '123456'
    };
  },
  methods: {
    login() {
      // Implement login logic here
      if (
          this.test_manager_name === this.name &&
          this.test_manager_password === this.password
      ) {
        alert('跳转到经理页面');
        this.$router.push('/manager');
      } else if (
          this.test_worker_name === this.name &&
          this.test_worker_password === this.password
      ) {
        alert('跳转到工人页面');
        this.$router.push('/worker');
      } else {
        if (!this.name || !this.password) {
          if (!this.name) {
            this.$message({
              type: 'warning',
              message: '请输入用户名！'
            });
          }
          if (!this.password) {
            this.$message({
              type: 'warning',
              message: '请输入密码！'
            });
          }
        } else {
          this.$message({
            type: 'error',
            message: '用户名或密码错误！'
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 20px;
  width: 400px;
  max-width: 90%;
  text-align: center;
}

.title {
  margin-top: 0;
  text-align: center;
  font-size: 28px;
  margin-bottom: 30px;
}

.van-field__label {
  font-size: 16px;
}

.van-field__control input {
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.van-button {
  margin-top: 30px;
  font-size: 16px;
}
</style>
