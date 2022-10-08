<template>
    <div class="user" @click="onSetting">
        <div class="photo" :style="background">{{ portrait }}</div>
        <div class="name">{{ username }}</div>
        <div class="sign">简介：{{ sign }}</div>
    </div>
</template>

<script>
import auth from "@/apis/auth";
export default {
    data() {
        return {
            username: "未登录用户",
            sign: "鸟随鸾凤飞高远，人伴贤良品自高",
            portrait: "未",
            background: "",
        };
    },
    created() {
        auth.getInfo()
            .then((data) => {
                this.username = data.username;
                this.portrait = this.username.slice(0, 1);
            })
            .catch((data) => {
                this.$router.push("/login");
            });
        if (localStorage.getItem("sign") === null) {
            this.sign = "未创建个性签名";
        } else {
            this.sign = localStorage.getItem("sign");
        }
        if (localStorage.getItem("color") !== null) {
            this.background =
                "background:" + JSON.parse(localStorage.getItem("color"));
        } else {
            this.background = "background:rgb(105, 28, 28)";
        }
    },
    methods: {
        onSetting() {
            this.$router.push("/setting");
        },
    },
};
</script>

<style lang="scss" scoped>
.user {
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    box-shadow: 1px 2px 4px 1px rgb(196, 194, 194);
    margin-bottom: 20px;
    margin-top: 15px;
    > .photo {
        font-size: 30px;
        text-align: center;
        line-height: 60px;
        width: 60px;
        height: 60px;
        border-radius: 30px;
        box-shadow: 2px 1px 1px 1px rgb(170, 169, 169);
        color: rgb(238, 234, 234);
        margin-top: 10px;
    }
    > .name {
        width: 200px;
        font-size: 30px;
        color: rgb(40, 74, 155);
        text-align: center;
        line-height: 60px;
        border-radius: 10px;
    }
    > .sign {
        padding: 20px;
        font-size: 14px;
        /* height: 80px; */
        color: rgb(156, 86, 64);
    }
}
.user:hover {
    > .photo {
        font-size: 50px;
        text-align: center;
        line-height: 100px;
        width: 100px;
        height: 100px;
        border-radius: 50px;
        box-shadow: 2px 2px 5px 2px rgb(170, 169, 169);
        background: rgb(124, 24, 24);
        color: rgb(238, 234, 234);
        margin-top: 10px;
    }
    > .name {
        font-size: 40px;
        line-height: 80px;
    }
}
</style>