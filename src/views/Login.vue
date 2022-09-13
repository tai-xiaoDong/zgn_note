<template>
  <div class="wrapper">
    <div class="form" v-if="isShowLogin">
      <div class="logo">
        <img src="@/assets/imgs/logo.jpg" />
      </div>
      <input type="text" placeholder="用户名" />
      <input type="password" placeholder="密码" />
      <button>登录</button>
      <nav>
        <span @click="showLogin">登录</span>
        <span @click="showRegister">注册</span>
        <router-link to="/library">游客访问</router-link>
      </nav>
    </div>

    <div class="form" v-if="isShowRegister">
      <div class="logo">
        <img src="@/assets/imgs/logo.jpg" />
      </div>
      <input type="text" placeholder="用户名" />
      <input type="password" placeholder="密码" />
      <button>注册</button>
      <nav>
        <span @click="showLogin">登录</span>
        <span @click="showRegister">注册</span>
        <router-link to="/library">游客访问</router-link>
      </nav>
    </div>
  </div>
</template>
    
<script>
export default {
  name: "Login",
  data() {
    return {
      isShowLogin: true,
      isShowRegister: false,
    };
  },
  methods: {
    showRegister() {
      this.isShowLogin = false;
      this.isShowRegister = true;
    },
    showLogin() {
      this.isShowLogin = true;
      this.isShowRegister = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  > .form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 550px;
    min-width: 400px;
    background: white;
    border-radius: 10px;
    box-shadow: 2px 2px 3px 3px #7a7e80;
    > input,
    button {
      display: block;
      margin-top: 20px;
      border: none;
      min-width: 300px;
      min-height: 40px;
      background: #e3e6e9;
      color: #010a0e;
      border-radius: 10px;
    }
    > input::-webkit-input-placeholder {
      padding-left: 10px;
      font-size: 14px;
    }
    > input:hover {
      background: rgb(219, 218, 218);
    }
    > button {
      background: #154453;
      color: rgb(250, 250, 250);
    }
    > .logo {
      margin-bottom: 40px;
      > img {
        width: 100px;
        height: 100px;
      }
    }
    > nav {
      display: flex;
      margin-top: 50px;

      > span,
      a {
        padding: 0 20px;
        color: rgb(4, 4, 128);
      }
    }
  }
}
</style>