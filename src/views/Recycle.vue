<template>
    <div class="recycle">
        <Alert :message="message" v-show="AlertShow">
            <template v-slot:yes><div>提示</div></template>
        </Alert>
        <NavBar />
        <div class="wrapper">
            <div class="title">
                <h2>回收站</h2>
            </div>
            <div class="photo" v-show="photo">
                <svg v-show="photo">
                    <use xlink:href="#null" />
                </svg>
            </div>
            <div
                class="content"
                v-for="(notebook, index) in notebooks"
                :key="index"
            >
                <div class="notebooks">
                    <div>所属笔记本:</div>
                    <div>
                        <strong>{{ notebook.notebooks }}</strong>
                    </div>
                </div>
                <div class="notes">
                    <div>{{ notebook.notes }}</div>
                </div>
                <div class="txt" v-if="false">内容{{ notebook.content }}</div>
                <div>
                    <button
                        @click="
                            recover(
                                notebook.notebooks,
                                notebook.notes,
                                notebook.content
                            )
                        "
                    >
                        恢复
                    </button>
                    <button
                        class="delete"
                        @click="del(notebook.notebooks, notebook.notes)"
                    >
                        彻底删除
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import auth from "@/apis/auth";
import recycle from "@/apis/recycle";
import Alert from "@/components/pop-ups/Alert.vue";
import notebooks from "@/apis/notebooks";
import a from "@/assets/icons/recycle/null.svg";

export default {
    name: "Recycle",
    data() {
        return {
            photo: false,
            notebooks: [],
            AlertShow: false,
            message: "",
        };
    },
    components: { Alert },
    created() {
        //检查是否登录
        auth.getInfo()
            .then((data) => {})
            .catch((data) => {
                console.log(data);
                this.$router.push("/login");
            });
        recycle
            .getAll()
            .then((data) => {
                this.notebooks = data;
            })
            .catch((data) => {});
        if (this.notebooks === []) {
            this.photo = true;
        }
    },
    methods: {
        onAlert(name) {
            this.AlertShow = true;
            this.message = name;
            setTimeout(() => {
                this.AlertShow = false;
            }, 1000);
        },
        recover(notebooks, notes, content) {
            let a = {
                notebooks: notebooks,
                notes: notes,
                content: content,
            };
            recycle
                .recoverNotes({
                    notebooks: notebooks,
                    notes: notes,
                    content: content,
                })
                .then((data) => {
                    this.onAlert(data.msg);
                    for (let i = 0; i < this.notebooks.length; i++) {
                        if (
                            a.notebooks === this.notebooks[i].notebooks &&
                            a.notes === this.notebooks[i].notes &&
                            a.content === this.notebooks[i].content
                        ) {
                            this.notebooks.splice(i, 1);
                        }
                    }
                })
                .catch((data) => {
                    this.onAlert(data.msg + "请刷新页面");
                });
        },
        del(notebooks, notes) {
            let a = {
                notebooks: notebooks,
                notes: notes,
            };
            recycle
                .delete({ notebooks: notebooks, notes: notes })
                .then((data) => {
                    this.onAlert(data.msg);
                    for (let i = 0; i < this.notebooks.length; i++) {
                        if (
                            a.notebooks === this.notebooks[i].notebooks &&
                            a.notes === this.notebooks[i].notes
                        ) {
                            this.notebooks.splice(i, 1);
                        }
                    }
                })
                .catch((data) => {
                    this.onAlert(data.msg + "请刷新页面");
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.recycle {
    display: flex;
    color: rgb(39, 38, 38);
    height: 100vh;
    > .wrapper {
        display: flex;
        margin-left: 50px;
        padding: 20px;
        flex-direction: column;
        > .title {
            margin-top: 50px;
            margin-bottom: 50px;
        }
        > .photo {
            margin-left: 200px;
            margin-top: 100px;
            > svg {
                width: 400px;
                height: 200px;
            }
        }
        > .content {
            display: flex;
            background-color: rgba(235, 231, 231, 0.5);
            margin-top: 10px;
            margin-left: 50px;
            padding: 10px;
            align-items: center;
            justify-content: space-between;
            border-radius: 10px;
            box-shadow: 1px 2px 4px 2px rgb(196, 194, 194);
            > .notebooks {
                display: flex;
                margin-right: 50px;
                > div {
                    margin-right: 20px;
                }
            }
            > .notes {
                margin-right: 50px;
            }
        }
    }
}
button {
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 14px;
    background-color: rgba(21, 68, 3, 0.7);
    color: rgb(245, 241, 237);
    border-radius: 10px;
    border: none;
    margin-left: 10px;
}
.delete {
    background-color: rgba(99, 5, 1, 0.7);
}
</style>