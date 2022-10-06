<template>
    <div class="wrapper">
        <header class="setting">
            <h4 class="tw">tw</h4>
            <h4 class="zgn">zgn</h4>
            <router-link to="/library"> 主页 </router-link>
            <div>{{ "用户名：" + user.name }}</div>
            <div>{{ "当前笔记：" + this.$route.params.note }}</div>
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
import notes from "@/apis/notes";

export default {
    name: "Edit",
    data() {
        return {
            content: "",
            user: {
                name: "",
            },
        };
    },

    created() {
        //检查是否登录
        auth.getInfo()
            .then((data) => {
                this.user.name = data.username;
            })
            .catch((data) => {
                this.$router.push("/login");
            });
        notes
            .getContent({
                notebooks: this.$route.params.notebook,
                notes: this.$route.params.note,
            })
            .then((data) => {
                this.content = data[0].content;
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
            padding: 20px;
            border: none;
            background: #f3f3f3;
        }
    }
}
</style>