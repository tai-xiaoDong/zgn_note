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
            <div
                class="content"
                v-for="(notebook, index) in notebooks"
                :key="index"
            >
                <div class="notebooks">所属笔记本:{{ notebook.notebooks }}</div>
                <div class="notes">笔记名:{{ notebook.notes }}</div>
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

export default {
    name: "Recycle",
    data() {
        return {
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
                console.log(this.notebooks);
            })
            .catch((data) => {});
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
            recycle
                .delete({ notebooks: notebooks, notes: notes })
                .then((data) => {
                    this.onAlert(data.msg);
                    this.notebooks = this.notebooks.filter(
                        (items) =>
                            items.notebooks !== notebooks &&
                            items.notes !== notes
                    );
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
    > .wrapper {
        display: flex;
        margin-left: 50px;
        padding: 20px;
        flex-direction: column;
        > .title {
            margin-top: 50px;
            margin-bottom: 50px;
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
                margin-right: 50px;
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
    background: rgb(17, 65, 39);
    color: rgb(223, 217, 217);
    border-radius: 10px;
    box-shadow: 1px 1px 2px 1px rgb(150, 147, 147);
    border: none;
    margin-left: 10px;
}
.delete {
    background: rgb(80, 9, 9);
}
</style>