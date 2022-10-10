<template>
    <div class="wrapper">
        <header class="setting">
            <h4 class="tw">tw</h4>
            <h4 class="zgn">zgn</h4>
            <router-link to="/library"> 主页 </router-link>
            <div>{{ "用户：" + username }}</div>
            <div>{{ "当前笔记：" + this.$route.params.note }}</div>
            <div>{{ conserve === "" ? "未保存" : "已保存：" + conserve }}</div>
            <div @click="getHelp">帮助</div>
            <div @click="markdown">预览</div>
        </header>
        <div class="content">
            <textarea
                type="text"
                v-model="content"
                @input="updateContent"
                placeholder="请输入笔记内容,支持markdown语法"
            />
            <div class="help" v-show="helpShow">
                <h2>帮助文档</h2>
                <hr />
                <div><strong>注意：使用游客登录可以查看全功能教程</strong></div>
                <div>
                    <div class="title">一、强调</div>
                    <em>*斜体*</em>
                    <div><strong>**加粗**</strong></div>
                    <em><strong>***既加粗又倾斜***</strong></em>
                </div>
                <div>
                    <div class="title">二、表格和引用</div>
                    <div>>表示引用</div>
                    <div>>>支持多级引用</div>
                    <div>>>>支持多级引用</div>
                    <thead>
                        <th>|支持|</th>
                        <th>|创建|</th>
                        <th>|表格|</th>
                    </thead>
                    <table>
                        <td>使用</td>
                        <td>中划线</td>
                        <td>包裹</td>
                    </table>
                    <ol>
                        <li>-表示项目符号</li>
                    </ol>
                </div>
                <div>
                    <div class="title">三、分割线语法</div>
                    <div>多个空格可以添加行内代码</div>
                    <div>-后不加内容表示分割线</div>
                    <hr />
                    <div>***分割线</div>
                    <hr />
                    <div>隔行表示分段</div>
                </div>
                <div>
                    <div class="title">四、链接与代码块</div>
                    <div>
                        这是一个链接 [Markdown语法](https://markdown.com.cn)
                    </div>
                    <div>
                        ~~~使用三个波浪线包裹的代码块，支持不同语言高亮显示~~~
                    </div>
                    <div>`反引号可以添加行内代码`</div>
                </div>
                <div>
                    <div class="title">五、标题语法</div>
                    <h1># 一级标题</h1>
                    <h2>## 二级标题</h2>
                    <h3>### 三级标题</h3>
                    <h4>#### 四级标题</h4>
                    <h5>###### 五级标题</h5>
                    <h6>####### 六级标题</h6>
                </div>
            </div>
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
            helpShow: false,
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
        getHelp() {
            this.helpShow = !this.helpShow;
            this.showMd = false;
        },
        markdown() {
            this.showMd = !this.showMd;
            this.helpShow = false;
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
        .help {
            border: 1px solid rgb(189, 185, 185);
            width: 800px;
            height: 96vh;
            padding: 50px;
            margin-left: 10px;
            line-height: 2em;
            overflow: auto;
            > div {
                margin-top: 20px;
                > .title {
                    margin-bottom: 20px;
                    padding: 5px;
                    background: rgb(73, 79, 105);
                    color: rgb(226, 226, 219);
                }
            }
        }
    }
}
</style>

<style lang="scss">
@import "@/assets/style/markdown.scss";
</style>