<template>
    <div class="wrapper">
        <svg><use xlink:href="#notFound" /></svg>
        <router-link to="/">返回首页</router-link>
    </div>
</template>

<script>
import c from "@/assets/icons/404/notFound.svg";
export default {
    name: "NotFound",
};
</script>

<style lang="scss" scoped>
.wrapper {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > svg {
        width: 500px;
        height: 500px;
    }
    > a {
        margin-top: 20px;
    }
}
</style>