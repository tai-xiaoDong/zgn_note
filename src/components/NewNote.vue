<template>
    <div class="wrapper">
        <Alert :message="message" v-show="AlertShow">
            <template v-slot:yes><div @click="noAlert">提示</div></template>
        </Alert>
        <div class="wrappers" v-show="notebookShow">
            <div class="prompt">
                <div class="wraps">
                    <input
                        type="text"
                        placeholder="请在此输入文件夹名"
                        class="content"
                        v-model="notebook"
                    />
                    <div class="echo">
                        <div class="yes" @click="createNotebook">确定</div>
                        <div class="no" @click="notebookNoShow">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrappers" v-show="noteShow">
            <div class="prompt">
                <div class="wraps">
                    <input
                        type="text"
                        placeholder="请在此输入文件名"
                        class="content"
                        v-model="note"
                    />

                    <div class="echo">
                        <select v-model="selected" class="select">
                            <option disabled value="">请选择笔记本</option>
                            <option
                                v-for="(notebook, index) in serverNotebooks"
                                :key="index"
                            >
                                {{ notebook }}
                            </option>
                        </select>
                        <div class="yes" @click="createNote">确定</div>
                        <div class="no" @click="noteNoShow">取消</div>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
        <div class="newNote" @click="NotebookIsShow">
            <svg>
                <use xlink:href="#book" />
            </svg>
            <div class="txt">新建笔记本</div>
        </div>
        <div class="newWord" @click="NoteIsShow">
            <svg>
                <use xlink:href="#word"></use>
            </svg>
            <div class="txt">新建笔记</div>
        </div>
    </div>
</template>

<script>
import notebooks from "@/apis/notebooks";
import notes from "@/apis/notes";
import a from "@/assets/icons/newNote/book.svg";
import b from "@/assets/icons/newNote/word.svg";
import Alert from "./pop-ups/Alert.vue";

export default {
    name: "NewNote",
    data() {
        return {
            noteShow: false,
            notebookShow: false,
            notebook: "",
            note: "",
            selected: "",
            serverNotebooks: "",

            message: "",
            AlertShow: false,
        };
    },
    created() {
        notebooks
            .getAll()
            .then((data) => {
                let array = [];
                for (let i = 0; i < data.length; i++) {
                    if (array.indexOf(data[i].notebooks) === -1) {
                        array.push(data[i].notebooks);
                    } else {
                        continue;
                    }
                }
                this.serverNotebooks = array;
            })
            .catch((data) => {
                console.log(data);
            });
    },
    components: { Alert },
    methods: {
        NoteIsShow() {
            this.noteShow = true;
        },
        NotebookIsShow() {
            this.notebookShow = true;
        },
        notebookNoShow() {
            this.notebookShow = false;
        },
        noteNoShow() {
            this.noteShow = false;
        },
        onAlert(name) {
            this.AlertShow = true;
            this.message = name;
            setTimeout(() => {
                this.AlertShow = false;
            }, 1000);
        },
        noAlert() {
            this.AlertShow = false;
        },
        createNotebook() {
            if (this.notebook === "") {
                this.onAlert("文件夹名不能为空");
            } else {
                notebooks
                    .addNotebook({ notebooks: this.notebook })
                    .then((data) => {
                        location.reload();
                    })
                    .catch((data) => {
                        this.onAlert(data.msg);
                    });
                this.notebook = "";
                this.notebookShow = false;
            }
        },
        createNote() {
            if (this.note === "" || this.selected === "") {
                this.onAlert("文件夹名不能为空");
            } else {
                console.log(this.note);
                notes
                    .addNotes({ notebooks: this.selected, notes: this.note })
                    .then((data) => {
                        location.reload();
                    })
                    .catch((data) => {
                        this.onAlert(data.msg);
                    });
                this.note = "";
                this.noteShow = false;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    font-size: 16px;
    max-width: 250px;
    border-radius: 10px;
    color: rgb(73, 116, 94);
    box-shadow: 0px 4px 4px 0px rgb(196, 194, 194);

    > .newNote,
    .newWord {
        display: flex;
        flex-direction: row;
        font-size: 14px;
        margin: 10px;
        padding-bottom: 5px;
        padding-top: 5px;
        > svg {
            width: 25px;
            height: 25px;
            margin: 5px;
            fill: rgb(59, 85, 71);
        }
        > .txt {
            margin-bottom: 5px;
            margin-top: 10px;
            margin-right: 5px;
        }
    }
}
.wrappers {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.prompt {
    width: 500px;
    height: 110px;
    padding: 10px;
    position: fixed;
    left: 40%;
    top: 40%;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgb(196, 194, 194);
    .wraps {
        > .content {
            padding: 10px;
            margin-left: 20px;
            border: none;
            width: 400px;
        }
        > .content::-webkit-input-placeholder {
            padding-left: 10px;
        }
        > .echo {
            display: flex;
            justify-content: right;
            margin-top: 15px;
            > .select {
                border-radius: 10px;
                box-shadow: 1px 1px 1px 1px rgb(201, 199, 199);
                width: 120px;
                border: none;
                font-size: 14px;
                background: rgb(59, 85, 71);
                color: rgb(223, 217, 217);
                padding: 5px;
                > option {
                    background: rgb(223, 217, 217);
                    color: black;
                }
            }

            > .yes,
            .no {
                margin-right: 10px;
                padding: 10px;
                padding-top: 5px;
                padding-bottom: 5px;
                font-size: 14px;
                border-radius: 10px;
                box-shadow: 1px 1px 2px 2px rgb(201, 199, 199);
            }
            > .yes {
                background: rgb(59, 85, 71);
                color: rgb(223, 217, 217);
                margin-left: 10px;
            }
        }
    }
}
</style>