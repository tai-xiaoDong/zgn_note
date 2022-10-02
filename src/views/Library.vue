<template>
    <div class="Library">
        <navBar />
        <div class="wrapper">
            <div class="wrap">
                <select v-model="selected" class="select">
                    <option disabled value="">请选择笔记本</option>
                    <option v-for="(notebook, index) in notebooks" :key="index">
                        {{ notebook }}
                    </option>
                </select>
                <div class="opera">
                    <div
                        class="update"
                        @click="notebookISShow"
                        v-show="selected"
                    >
                        <svg>
                            <use xlink:href="#edit" />
                        </svg>
                    </div>
                    <div class="delete" v-show="selected">
                        <svg>
                            <use xlink:href="#delete" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="newNotebook" v-show="notebookShow">
                <input
                    type="text"
                    placeholder="请输入新的笔记本名"
                    v-model="newNotebook"
                />
                <div class="yes">确定</div>
                <div class="no" @click="notebookNoShow">取消</div>
            </div>
            <div class="newNote" v-show="noteShow">
                <input
                    type="text"
                    placeholder="请输入新的笔记名"
                    v-model="newNOte"
                />
                <div class="yes">确定</div>
                <div class="no" @click="noteNoShow">取消</div>
            </div>

            <div class="title">
                <div
                    class="notes"
                    v-show="notes"
                    v-for="(value, index) in notes"
                    :key="index"
                >
                    <div>{{ value }}</div>
                    <div class="update" @click="noteIsShow">编辑</div>
                </div>
            </div>
        </div>
        <main>
            <header>
                <div class="date">创建时间：2022-9-19</div>
                <div class="control">
                    <div class="edit" @click="onEdit(notebook)">
                        <svg>
                            <use xlink:href="#edit" />
                        </svg>
                    </div>
                    <div class="delete" @click="onDelete">
                        <svg>
                            <use xlink:href="#delete" />
                        </svg>
                    </div>
                </div>
            </header>
            <div>
                <div class="content"></div>
            </div>
        </main>
        <div class="user">
            <Avatar />
            <NewNote />
        </div>
    </div>
</template>

<script>
import NewNote from "../components/NewNote.vue";
import Avatar from "@/components/Avatar.vue";
import a from "@/assets/icons/library/delete.svg";
import b from "@/assets/icons/library/edit.svg";
import auth from "@/apis/auth";
import notebooks from "@/apis/notebooks";
import notes from "@/apis/notes";
import Prompt from "@/components/pop-ups/Prompt.vue";

export default {
    name: "Library",
    data() {
        return {
            selected: "",
            notebooks: false,
            notes: false,

            newNotebook: "",
            newNOte: "",
            notebookShow: false,
            noteShow: false,
        };
    },
    components: { NewNote, Avatar },

    created() {
        //检查是否登录
        auth.getInfo()
            .then((data) => {
                console.log(data);
            })
            .catch((data) => {
                this.$router.push("/login");
            });
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
                this.notebooks = array;
            })
            .catch((data) => {
                console.log(data);
            });
    },
    watch: {
        selected: function () {
            this.getNotes(this.selected);
        },
    },
    methods: {
        getNotes(notebook) {
            notes.getNotes({ notebooks: notebook }).then((data) => {
                let array = [];
                for (let i = 0; i < data.length; i++) {
                    if (array.indexOf(data[i].notes) === -1) {
                        if (data[i].notes !== null) {
                            array.push(data[i].notes);
                        }
                    }
                }
                this.notes = array;
                console.log(array);
            });
        },
        getcontent() {},
        onDelete() {
            console.log("删除");
        },
        onEdit() {
            console.log("编辑");
        },
        onUpdate(oldNotebooks) {
            // notebooks.updateNotebook({})
        },
        notebookISShow() {
            this.notebookShow = true;
        },

        notebookNoShow() {
            this.notebookShow = false;
        },
        noteNoShow() {
            this.noteShow = false;
        },
        noteIsShow() {
            this.noteShow = true;
        },
    },
};
</script>

<style lang="scss" scoped>
.Library {
    display: flex;
    display: flex;
    justify-content: space-between;
    > .wrapper {
        font-size: 14px;
        padding: 10px;
        margin-left: 20px;
        > .wrap {
            display: flex;
            margin-top: 25px;
            width: 220px;
            padding: 5px;
            border-radius: 10px;
            box-shadow: 1px 2px 4px 2px rgb(196, 194, 194);
            margin-bottom: 10px;
            align-items: center;
            background: #cfcccc;
            > .select {
                background: #cfcccc;
                width: 150px;
                border: none;
                font-size: 14px;
                color: black;
                padding: 5px;
                margin-right: 5px;
                height: 30px;
            }
            > .opera {
                display: flex;
                > .delete,
                .update {
                    display: flex;
                    > svg {
                        width: 24px;
                        height: 24px;
                        margin-left: 5px;
                    }
                }
                > .delete {
                    > svg {
                        fill: rgb(224, 65, 17);
                    }
                }
            }
        }
        > .newNotebook,
        .newNote {
            display: flex;
            border-radius: 10px;
            box-shadow: 1px 2px 4px 2px rgb(196, 194, 194);
            padding: 5px;
            margin-bottom: 10px;
            > input {
                width: 150px;
                margin-right: 5px;
                border: none;
                background: #f3f3f3;
            }
            > .yes,
            .no {
                padding: 10px;
                padding-top: 5px;
                padding-bottom: 5px;
                font-size: 14px;
                border-radius: 10px;
                box-shadow: 1px 1px 1px 1px rgb(201, 199, 199);
            }
            > .yes {
                background: rgb(59, 85, 71);
                color: rgb(223, 217, 217);
                margin-right: 5px;
            }
            > input::-webkit-input-placeholder {
                padding-left: 10px;
            }
        }
        > .title {
            display: flex;
            flex-direction: column;
            width: 230px;
            > .notes {
                padding: 10px;
                display: flex;
                margin-bottom: 10px;
                justify-content: space-between;
                margin-right: 5px;
                border-radius: 10px;
                box-shadow: 1px 2px 4px 2px rgb(196, 194, 194);
                > .update {
                    color: rgb(224, 65, 17);
                }
            }
        }
    }
    > main {
        overflow: hidden;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 750px;
        header {
            display: flex;
            max-width: 1200px;
            min-width: 750px;
            justify-content: space-between;
            border-bottom: 1px solid black;
            padding: 0px;
            margin-top: 30px;
            padding: 10px;
            .control {
                display: flex;
                > .edit {
                    margin-right: 20px;
                    > svg {
                        width: 24px;
                        height: 24px;
                    }
                }
                > .delete {
                    color: rgb(224, 65, 17);
                    > svg {
                        width: 24px;
                        height: 24px;
                        fill: rgb(224, 65, 17);
                    }
                }
            }
        }
        > div {
            max-width: 1200px;
            min-width: 750px;
            padding: 30px;
        }
    }
    > .user {
        min-width: 250px;
        padding-top: 20px;
        margin-right: 30px;
    }
}
</style>