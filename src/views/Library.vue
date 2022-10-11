<template>
    <div class="Library">
        <Alert :message="message" v-show="AlertShow">
            <template v-slot:yes><div>提示</div></template>
        </Alert>
        <div class="wrappers" v-show="addNewNote.notebookShow">
            <div class="prompt">
                <div class="wraps">
                    <input
                        type="text"
                        placeholder="请在此输入文件夹名"
                        class="content"
                        v-model="addNewNote.notebook"
                    />
                    <div class="echo">
                        <div class="yes" @click="createNotebook">确定</div>
                        <div
                            class="no"
                            @click="addNewNote.notebookShow = false"
                        >
                            取消
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrappers" v-show="addNewNote.noteShow">
            <div class="prompt">
                <div class="wraps">
                    <input
                        type="text"
                        placeholder="请在此输入文件名"
                        class="content"
                        v-model="addNewNote.note"
                    />

                    <div class="echo">
                        <select v-model="addNewNote.selected" class="select">
                            <option disabled value="">请选择笔记本</option>
                            <option
                                v-for="(notebook, index) in notebooks"
                                :key="index"
                            >
                                {{ notebook }}
                            </option>
                        </select>
                        <div class="yes" @click="createNote">确定</div>
                        <div class="no" @click="addNewNote.noteShow = false">
                            取消
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
                        @click="notebookShow = true"
                        v-show="selected"
                        title="修改笔记本名"
                    >
                        <svg>
                            <use xlink:href="#edit" />
                        </svg>
                    </div>
                    <div
                        class="delete"
                        v-show="selected"
                        @click="deleteNotebook"
                        title="删除笔记本"
                    >
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
                <div class="no" @click="notebookShow = false">取消</div>
            </div>
            <div class="newNote" v-show="noteShow">
                <input
                    type="text"
                    placeholder="请输入新的笔记名"
                    v-model="newNote"
                />
                <div class="yes" @click="updateNote">确定</div>
                <div class="no" @click="noteShow = false">取消</div>
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
                    <div class="edit" @click="toEdit" title="编辑笔记">
                        <svg>
                            <use xlink:href="#edit" />
                        </svg>
                    </div>
                    <div class="delete" @click="delNotes" title="删除笔记">
                        <svg>
                            <use xlink:href="#delete" />
                        </svg>
                    </div>
                </div>
            </header>
            <div>
                <textarea
                    class="isMarkdown"
                    v-show="content"
                    v-model="content"
                    readonly
                ></textarea>
            </div>
            <div class="student" v-show="!time">
                <svg>
                    <use xlink:href="#student" />
                </svg>
            </div>
        </main>
        <div class="user">
            <Avatar />
            <div class="NewNote">
                <div class="wrapper">
                    <div
                        class="newNote"
                        @click="addNewNote.notebookShow = true"
                    >
                        <svg>
                            <use xlink:href="#book" />
                        </svg>
                        <div class="txt">新建笔记本</div>
                    </div>
                    <div class="newWord" @click="addNewNote.noteShow = true">
                        <svg>
                            <use xlink:href="#word"></use>
                        </svg>
                        <div class="txt">新建笔记</div>
                    </div>
                </div>
            </div>
            <ShowPlan />
        </div>
    </div>
</template>

<script>
import ShowPlan from "@/components/ShowPlan.vue";
import Avatar from "@/components/Avatar.vue";
import a from "@/assets/icons/library/delete.svg";
import b from "@/assets/icons/library/edit.svg";
import auth from "@/apis/auth";
import notebooks from "@/apis/notebooks";
import notes from "@/apis/notes";
import c from "@/assets/icons/library/student.svg";
import dayjs from "dayjs";
import Alert from "@/components/pop-ups/Alert.vue";
import d from "@/assets/icons/newNote/book.svg";
import e from "@/assets/icons/newNote/word.svg";

export default {
    name: "Library",
    data() {
        return {
            selected: "", // 当前笔记本id
            notebooks: [], //笔记本列表
            newNotebook: "", // 新笔记本id
            notebookShow: false, // 控制组件显示

            noteName: "",
            notes: [],
            newNote: "",
            noteShow: false,
            content: "",
            time: false,

            selectNotes: [],
            message: "",
            AlertShow: false,

            addNewNote: {
                noteShow: false,
                notebookShow: false,
                notebook: "",
                note: "",
                selected: "",
            },
        };
    },
    components: { Avatar, Alert, ShowPlan },

    created() {
        //检查是否登录
        auth.getInfo()
            .then((data) => {})
            .catch((data) => {
                this.$router.push("/login");
            });
        //请求所有笔记本;
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
        this.$store.dispatch("getNotebooks");
    },
    // 请求笔记
    watch: {
        selected: function () {
            this.getNotes(this.selected);
            this.content = "";
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
        createNotebook() {
            if (this.addNewNote.notebook === "") {
                this.onAlert("文件夹名不能为空");
            } else {
                notebooks
                    .addNotebook({ notebooks: this.addNewNote.notebook })
                    .then((data) => {
                        this.notebooks.push(data.notebooks.notebooks);
                        this.selected = data.notebooks.notebooks;
                        this.content = "";
                        this.time = false;
                        this.onAlert("创建成功");
                    })
                    .catch((data) => {
                        this.onAlert(data.msg);
                    });
                this.addNewNote.notebook = "";
                this.addNewNote.notebookShow = false;
            }
        },
        createNote() {
            if (
                this.addNewNote.note === "" ||
                this.addNewNote.selected === ""
            ) {
                this.onAlert("文件夹名不能为空");
            } else {
                notes
                    .addNotes({
                        notebooks: this.addNewNote.selected,
                        notes: this.addNewNote.note,
                    })
                    .then((data) => {
                        this.selected = this.addNewNote.selected;
                        this.notes.push(data[0].notes);
                        this.content = "";
                        this.time = false;
                        this.onAlert("创建成功");
                    })
                    .catch((data) => {
                        this.onAlert(data.msg);
                    });
                this.addNewNote.note = "";
                this.addNewNote.noteShow = false;
            }
        },
        deleteNotebook() {
            notebooks
                .deleteNotebook({ notebooks: this.selected })
                .then((data) => {
                    this.onAlert(data.msg);
                    this.notebooks = this.notebooks.filter(
                        (items) => items !== this.selected
                    );
                    this.selected = this.notebooks[0];
                    this.content = "";
                    this.time = false;
                    this.onAlert("删除成功");
                })
                .catch((data) => {
                    this.onAlert(data.msg);
                });
        },
        delNotes() {
            notes
                .deleteNotes({
                    notebooks: this.selected,
                    notes: this.noteName,
                    content: this.content,
                })
                .then((data) => {
                    this.onAlert(data.msg);
                    this.notes = this.notes.filter(
                        (items) => items !== this.noteName
                    );
                    this.time = false;
                    this.content = false;
                    if (this.notes[0] === undefined) {
                        this.notebooks = this.notebooks.filter(
                            (items) => items !== this.selected
                        );
                        this.selected = this.notebooks[0];
                    }
                    this.content = "";
                    this.time = false;
                    this.onAlert("删除成功");
                })
                .catch((data) => {
                    this.onAlert(data.msg);
                    location.reload();
                });
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
                    this.notebooks = this.notebooks.filter(
                        (items) => items !== this.selected
                    );
                    this.notebooks.push(this.newNotebook);
                    this.selected = this.newNotebook;
                    this.onAlert("更新成功");
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
                    this.notes.push(this.newNote);
                    this.notes = this.notes.filter(
                        (items) => items !== this.noteName
                    );
                    this.noteName = this.newNote;
                    this.onAlert("更新成功");
                })
                .catch((data) => {
                    this.onAlert(data.msg);
                });
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
            setTimeout(() => {
                this.AlertShow = false;
            }, 1000);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/library.scss";
</style>