<template>
    <div class="wrapper">
        <header class="setting">
            <h4 class="tw">tw</h4>
            <h4 class="zgn">zgn</h4>
            <div>已登录</div>
            <router-link to="/library"> 返回主页 </router-link>
            <div @click="a">当前笔记</div>
            <div>保存</div>
            <div>帮助</div>
        </header>
        <label class="content">
            <textarea type="text" v-model="content" />
        </label>
    </div>
</template>

<script>
import auth from "@/apis/auth";
export default {
    name: "Edit",
    data() {
        return {
            content: "",
        };
    },

    created() {
        //检查是否登录
        auth.getInfo()
            .then((data) => {
                console.log(data);
            })
            .catch((data) => {
                this.$router.push("/login");
            });
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    > .setting {
        display: flex;
        width: 100vw;
        background-color: rgba(196, 193, 193, 0.5);
        padding: 2px;
        > div,
        a {
            margin-right: 50px;
        }
        > .tw {
            color: red;
            margin-left: 50px;
            margin-right: 2px;
        }
        > .zgn {
            margin-right: 50px;
        }
    }
    > .content {
        > textarea {
            width: 1000px;
            overflow: hidden;
        }
    }
}
</style>