<template>
  <div id="Login">
    <div>
      <div>
        <h3>注册</h3>
        <input type="text" placeholder="用户名" />
        <input type="text" placeholder="密码" />
        <button>创建账户</button>
      </div>
      <h3>登录</h3>
      <input type="text" placeholder="用户名" />
      <input type="text" placeholder="密码" />
      <button>登录</button>
    </div>

    <router-link to="/library">返回首页</router-link>
  </div>
</template>
    
    <script>
export default {
  name: "Login",
  data() {
    return {
      msg: "这是登录页面",
    };
  },
};
</script>