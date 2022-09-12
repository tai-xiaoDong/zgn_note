<template>
  <nav>
    <router-link to="/library" class="item">
      <div class="wrap">
        <svg class="a">
          <use xlink:href="#library"></use>
        </svg>
        <div class="txt">文件夹</div>
      </div>
    </router-link>
    <router-link to="/recycle" class="item">
      <div class="wrap">
        <svg class="a">
          <use xlink:href="#recycle"></use>
        </svg>
        <div class="txt">回收站</div>
      </div>
    </router-link>
    <router-link to="/plan" class="item">
      <div class="wrap">
        <svg class="a">
          <use xlink:href="#plan"></use>
        </svg>
        <div class="txt">计划</div>
      </div>
    </router-link>
    <router-link to="/setting" class="item">
      <div class="wrap">
        <svg class="a">
          <use xlink:href="#setting"></use>
        </svg>
        <div class="txt">设置</div>
      </div>
    </router-link>
    <router-link to="/login" class="item">
      <div class="wrap">
        <svg class="a">
          <use xlink:href="#login"></use>
        </svg>
        <div class="txt">登录</div>
      </div>
    </router-link>
  </nav>
</template>

<script>
import a from "@/assets/icons/library.svg";
import b from "@/assets/icons/plan.svg";
import c from "@/assets/icons/setting.svg";
import d from "@/assets/icons/login.svg";
import e from "@/assets/icons/recycle.svg";

export default {
  name: "NavBar",
};
</script>


<style lang="scss" scoped>
nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 18px;
  max-width: 200px;
  min-height: 100vh;
  background: #e3e6e9;
  color: #06161b;
  box-shadow: 0 0 0 3px #e2e5e9;
  > .item {
    > .wrap {
      display: flex;
      flex-direction: row;
      max-width: 190px;
      margin-left: 5px;
      > svg {
        fill: currentColor;
        margin: 20px;
        margin-left: 30px;
        width: 20px;
        height: 20px;
      }
      > .txt {
        /* width: 0px; */
        margin-top: 20px;
      }
    }
  }
}
.wrap:hover {
  background: rgb(219, 218, 218);
  color: #103b49;
  border-radius: 15px;
}
</style>