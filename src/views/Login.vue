<template>
  <div class="wrap">
    <!-- <Register>注册</Register> -->
    <Register>
      <template v-slot:content>登录</template>
      <template v-slot:nav>
        <nav>
          <span>登录</span>
          <span>注册</span>
          <router-link to="/library">游客访问</router-link>
        </nav>
      </template>
    </Register>
    <!-- <Register>
      <template v-slot:content>注册</template>
      <template v-slot:nav>
        <nav>
          <span>登录</span>
          <span>注册</span>
          <router-link to="/library">游客访问</router-link>
        </nav>
      </template>
    </Register> -->
  </div>
</template>
    
<script>
import Register from "@/components/Register.vue";
export default {
  name: "Login",
  components: { Register },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
nav {
  display: flex;
  margin-top: 50px;

  > span,
  a {
    padding: 0 20px;
    color: rgb(4, 4, 128);
  }
}
</style>