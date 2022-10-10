<template>
    <div class="wrapper">
        <header class="setting">
            <h4 class="tw">tw</h4>
            <h4 class="zgn">zgn</h4>
            <router-link to="/library"> 主页 </router-link>
            <div>{{ "用户：" + username }}</div>
            <div>{{ "当前笔记：" + this.$route.params.note }}</div>
            <div>{{ conserve === "" ? "未保存" : "已保存：" + conserve }}</div>
            <div>帮助</div>
            <div @click="markdown">预览</div>
        </header>
        <div class="content">
            <textarea
                type="text"
                v-model="content"
                @input="updateContent"
                placeholder="请输入笔记内容,支持markdown语法"
            />
            <div class="isMarkdown" v-show="showMd" v-html="Markdown"></div>
        </div>
    </div>
</template>

<script>
import auth from "@/apis/auth";
import notes from "@/apis/notes";
import dayjs from "dayjs";
import _ from "lodash";
import notebooks from "@/apis/notebooks";
import d from "@/assets/icons/navbar/login.svg";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js/lib/common";
import "highlight.js/scss/default.scss";
import "highlight.js/styles/atom-one-light.css";

let md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return (
                    '<pre class="hljs"><code>' +
                    hljs.highlight(str, {
                        language: lang,
                        ignoreIllegals: true,
                    }).value +
                    "</code></pre>"
                );
            } catch (__) {}
        }
        return (
            '<pre class="hljs"><code>' +
            md.utils.escapeHtml(str) +
            "</code></pre>"
        );
    },
})
    .use(require("markdown-it-highlightjs"), { hljs })
    .use(require("markdown-it-multimd-table"));
export default {
    name: "Edit",
    data() {
        return {
            content: "",
            username: "",
            conserve: "",
            showMd: true,
        };
    },
    computed: {
        Markdown() {
            let md_html = md.render(this.content);
            return md_html;
        },
    },

    created() {
        //检查是否登录
        auth.getInfo()
            .then((data) => {
                this.username = data.username;
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
    methods: {
        markdown() {
            this.showMd = !this.showMd;
        },
        updateContent: _.debounce(function () {
            notes
                .setContent({
                    content: this.content,
                    notes: this.$route.params.note,
                    notebooks: this.$route.params.notebook,
                })
                .then((data) => {
                    console.log(data);
                    data[0].updatedAt = dayjs(data[0].updatedAt).format(
                        "YYYY-MM-DD:HH:mm:s"
                    );
                    this.conserve = data[0].updatedAt;
                })
                .catch((data) => {
                    this.conserve = "保存失败";
                });
        }, 500),
    },
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
        margin-top: 6px;
        display: flex;
        > textarea {
            width: 800px;
            height: 96vh;
            overflow: auto;
            line-height: 1.5em;
            padding: 50px;
            border: 1px solid rgb(189, 185, 185);
            border-bottom: none;
            background: #f3f3f3;
        }
        .isMarkdown {
            width: 800px;
            height: 96vh;
            overflow: auto;
            padding: 50px;
            border-bottom: none;
            background: white;
            margin-left: 10px;
            line-height: 2em;
            border: 1px solid rgb(189, 185, 185);
        }
    }
}
</style>

<style lang="scss">
@import "@/assets/style/markdown.scss";
</style>