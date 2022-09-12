<template>
  <div id="Login">
    <h1>{{ msg }}</h1>
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