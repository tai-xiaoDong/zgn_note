<template>
    <div class="Library">
        <Alert :message="message" v-show="AlertShow">
            <template v-slot:yes><div @click="noAlert">确认</div></template>
        </Alert>
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
                <div class="yes" @click="updateNotebook">确定</div>
                <div class="no" @click="notebookNoShow">取消</div>
            </div>
            <div class="newNote" v-show="noteShow">
                <input
                    type="text"
                    placeholder="请输入新的笔记名"
                    v-model="newNote"
                />
                <div class="yes" @click="updateNote">确定</div>
                <div class="no" @click="noteNoShow">取消</div>
            </div>

            <div class="title">
                <div
                    class="notes"
                    v-show="notes"
                    v-for="(value, index) in notes"
                    :key="index"
                    :class="{ selectNote: selectNotes.indexOf(index) >= 0 }"
                    @click="selectNote(index)"
                >
                    <div @click="getContent(value)" class="content">
                        {{ value }}
                    </div>
                    <div class="update" @click="noteIsShow(value)">编辑</div>
                </div>
            </div>
        </div>
        <main>
            <header v-show="time">
                <div class="date">{{ time }}</div>
                <div class="control">
                    <div class="edit" @click="toEdit">
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
                <div class="content">{{ content }}</div>
            </div>
            <div class="student" v-show="!time">
                <svg>
                    <use xlink:href="#student" />
                </svg>
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
import c from "@/assets/icons/library/student.svg";
import dayjs from "dayjs";
import Alert from "@/components/pop-ups/Alert.vue";

export default {
    name: "Library",
    data() {
        return {
            selected: "", // 当前笔记本id
            notebooks: false, //笔记本列表
            newNotebook: "", // 新笔记本id
            notebookShow: false, // 控制组件显示

            noteName: "",
            notes: false,
            newNote: "",
            noteShow: false,
            content: "",
            time: false,

            selectNotes: [],
            message: "",
            AlertShow: false,
        };
    },
    components: { NewNote, Avatar, Alert },

    created() {
        //检查是否登录
        auth.getInfo()
            .then((data) => {
                console.log(data);
            })
            .catch((data) => {
                this.$router.push("/login");
            });
        // 请求所有笔记本
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
    // 请求笔记
    watch: {
        selected: function () {
            this.getNotes(this.selected);
        },
    },
    methods: {
        // 请求笔记
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
            });
        },
        // 请求笔记内容
        getContent(value) {
            this.noteName = value;
            notes
                .getContent({
                    notebooks: this.selected,
                    notes: value,
                })
                .then((data) => {
                    this.content = data[0].content;
                    this.time =
                        "创建时间：" +
                        dayjs(data[0].createdAt).format("YYYY-MM-DD");
                })
                .catch((data) => {
                    console.log(data);
                });
        },
        // 跳转到笔记编辑页面
        toEdit() {
            this.$router.push({
                name: "Edit",
                params: { notebook: this.selected, note: this.noteName },
            });
        },
        onDelete() {
            console.log("删除");
        },
        // 更新笔记本名字
        updateNotebook() {
            let notebookName = {
                newNotebooks: this.newNotebook,
                notebooks: this.selected,
            };
            notebooks
                .updateNotebook(notebookName)
                .then((data) => {
                    location.reload();
                })
                .catch((data) => {
                    this.onAlert(data.msg);
                });
        },
        // 更新笔记名字
        updateNote() {
            let noteName = {
                newNotes: this.newNote,
                notebooks: this.selected,
                notes: this.noteName,
            };
            notes
                .updateNotes(noteName)
                .then((data) => {
                    location.reload();
                })
                .catch((data) => {
                    this.onAlert(data.msg);
                });
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
        noteIsShow(value) {
            this.noteName = value;
            this.noteShow = true;
        },
        // 笔记选中样式
        selectNote(index) {
            this.selectNotes = [];
            this.selectNotes.push(index);
        },
        // 提示框
        onAlert(name) {
            this.AlertShow = true;
            this.message = name;
        },
        noAlert() {
            this.AlertShow = false;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/library.scss";
</style>