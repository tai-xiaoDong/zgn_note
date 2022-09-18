<template>
  <nav :class="change">
    <div>
      <router-link to="/library" class="logo">
        <img src="@/assets/imgs/logo.jpg" />
      </router-link>
      <router-link to="/library" class="item" active-class="selected">
        <div class="wrap">
          <svg>
            <use xlink:href="#library"></use>
          </svg>
          <div class="txt">文件夹</div>
        </div>
      </router-link>
      <router-link to="/recycle" class="item" active-class="selected">
        <div class="wrap">
          <svg>
            <use xlink:href="#recycle"></use>
          </svg>
          <div class="txt">回收站</div>
        </div>
      </router-link>
      <router-link to="/plan" class="item" active-class="selected">
        <div class="wrap">
          <svg>
            <use xlink:href="#plan"></use>
          </svg>
          <div class="txt">计划</div>
        </div>
      </router-link>
      <router-link to="/setting" class="item" active-class="selected">
        <div class="wrap">
          <svg>
            <use xlink:href="#setting"></use>
          </svg>
          <div class="txt">设置</div>
        </div>
      </router-link>
      <div class="item">
        <div class="wrapper" @click="navChange1">
          <svg class="big">
            <use xlink:href="#narrow"></use>
          </svg>
          <div class="big txt">收起</div>
        </div>
        <div class="wrapper" @click="navChange2">
          <svg class="small">
            <use xlink:href="#wide"></use>
          </svg>
          <div class="small txt">展开</div>
        </div>
      </div>
      <router-link to="/login" class="item" active-class="selected">
        <div class="wrap">
          <svg>
            <use xlink:href="#login"></use>
          </svg>
          <div class="txt">注销</div>
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script>
import a from "@/assets/icons/library.svg";
import b from "@/assets/icons/plan.svg";
import c from "@/assets/icons/setting.svg";
import d from "@/assets/icons/login.svg";
import e from "@/assets/icons/recycle.svg";
import f from "@/assets/icons/wide.svg";
import g from "@/assets/icons/narrow.svg";

export default {
  name: "NavBar",
  data() {
    return { change: "wide" };
  },

  methods: {
    navChange1() {
      this.change = "narrow";
    },
    navChange2() {
      this.change = "wide";
    },
  },
};
</script>

<style lang="scss" scoped>
.wide {
  display: Flex;
  flex-direction: column;
  justify-content: center;
  font-size: 18px;
  width: 170px;
  min-height: 100vh;
  background: rgb(240, 241, 245);
  color: #103b49;
  box-shadow: 2px 1px 1px 1px rgb(221, 216, 216);
  position: relative;
  > div {
    > .selected {
      background: rgb(61, 63, 65);
      border-radius: 10px;
      color: rgb(238, 234, 234);
      box-shadow: 1px 1px 2px 2px rgb(201, 199, 199);
    }
    > .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 10px;
      margin-bottom: 10px;
      > .wrapper {
        display: flex;
        flex-direction: row;
        max-width: 150px;
        > .small {
          display: none;
        }
        > svg {
          fill: currentColor;
          margin: 20px;
          margin-left: 28px;
          width: 25px;
          height: 25px;
        }
        > .txt {
          margin-top: 23px;
        }
      }
      > .wrap {
        display: flex;
        flex-direction: row;
        max-width: 180px;
        > svg {
          fill: currentColor;
          margin: 20px;
          margin-left: 30px;
          width: 23px;
          height: 23px;
        }
        > .txt {
          margin-top: 20px;
        }
      }
      .wrap:hover,
      .wrapper:hover {
        border-radius: 10px;
        box-shadow: 1px 1px 2px 2px gray;
      }
    }

    .logo {
      flex-direction: column;
      position: absolute;
      left: 60px;
      top: 60px;
      > div {
        position: relative;
        > .wid {
          fill: currentColor;
          width: 30px;
          height: 30px;
          position: absolute;
          top: 120px;
          left: 100px;
        }
        > .nar {
          display: none;
        }
      }
      > img {
        width: 60px;
        height: 60px;
      }
    }
  }
}
.narrow {
  display: Flex;
  flex-direction: column;
  justify-content: center;
  font-size: 18px;
  max-width: 90px;
  min-height: 100vh;
  color: #103b49;
  box-shadow: 2px 1px 1px 1px rgb(221, 216, 216);
  background: rgb(240, 241, 245);
  position: relative;

  > div {
    > .selected {
      background: rgb(61, 63, 65);
      border-radius: 10px;
      color: rgb(238, 234, 234);
      box-shadow: 1px 1px 2px 2px rgb(201, 199, 199);
    }
    > .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 10px;
      margin-bottom: 10px;
      > .wrapper {
        display: flex;
        flex-direction: row;
        max-width: 180px;
        margin-bottom: 5px;
        > .big {
          display: none;
        }
        > svg {
          fill: currentColor;
          margin: 20px;
          margin-left: 25px;
          width: 25px;
          height: 25px;
        }
        > .txt {
          display: none;
        }
      }
      > .wrap {
        display: flex;
        flex-direction: row;
        max-width: 180px;
        > svg {
          fill: currentColor;
          margin: 20px;
          margin-left: 25px;
          width: 23px;
          height: 23px;
        }
        > .txt {
          display: none;
        }
      }
      .wrap:hover,
      .wrapper:hover {
        border-radius: 10px;
        box-shadow: 1px 1px 2px 2px gray;
      }
    }

    .logo {
      flex-direction: column;
      position: absolute;
      left: 22px;
      top: 60px;
      > img {
        width: 60px;
        height: 60px;
      }
    }
  }
}
</style>