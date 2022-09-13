<template>
  <div class="wrapper">
    <div class="form">
      <div class="logo">
        <img src="@/assets/imgs/logo.jpg" />
      </div>
      <input type="text" placeholder="用户名" />
      <input type="password" placeholder="密码" />
      <button><slot name="content"></slot></button>
      <div><slot name="nav"></slot></div>
    </div>
  </div>
</template>
      
  <script>
export default {
  name: "Register",
};
</script>
  
<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  > .form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 550px;
    min-width: 400px;
    background: white;
    /* border: 1px solid #103b49; */
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
  }
}
</style>