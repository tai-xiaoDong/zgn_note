<template>
    <div class="Library">
        <navBar />
        <div class="doc">
            <section>
                <div class="wrap">
                    <div class="title">
                        <div>今天吃什么</div>
                    </div>
                    <div class="delete">删除</div>
                </div>
                <div class="content">
                    <div>米饭</div>
                </div>
            </section>
            <main>
                <header>
                    <div class="date">创建时间：2022-9-19</div>
                    <div class="control">
                        <div class="edit">
                            <svg>
                                <use xlink:href="#edit" />
                            </svg>
                        </div>
                        <div class="delete">
                            <svg>
                                <use xlink:href="#delete" />
                            </svg>
                        </div>
                    </div>
                </header>
                <div>
                    <div class="title">
                        <h1>一、今天吃什么</h1>
                    </div>
                    <div class="small-title">1.米饭</div>
                    <div class="content">这里显示文章内容</div>
                </div>
            </main>
            <div class="user">
                <Avatar />
                <NewNote />
            </div>
        </div>
    </div>
</template>

<script>
import NewNote from "../components/NewNote.vue";
import Avatar from "@/components/Avatar.vue";
import a from "@/assets/icons/library/delete.svg";
import b from "@/assets/icons/library/edit.svg";

export default {
    name: "Library",
    data() {
        return {
            msg: "这是文档页面",
        };
    },
    components: { NewNote, Avatar },
};
</script>

<style lang="scss" scoped>
.Library {
    display: flex;
    .doc {
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
        > section {
            min-width: 200px;
            max-width: 300px;
            overflow: hidden;
            padding: 10px;
            margin-right: 10px;
            > .wrap {
                border-right: 1px solid rgb(221, 218, 218);
                margin-top: 20px;
                display: flex;
                > .title {
                    padding: 10px;
                    border-radius: 10px;
                    margin-right: 10px;
                    display: flex;
                }
                .delete {
                    color: rgb(224, 65, 17);
                    padding: 10px;
                    white-space: nowrap;
                }
            }
            > .content {
                display: flex;
                white-space: pre-wrap;
                padding-left: 15px;
                margin-right: 10px;
                color: rgb(40, 74, 155);
                > div {
                    padding: 5px;
                    margin-left: 10px;
                }
            }
        }
        > main {
            header {
                display: flex;
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
                max-width: 1000px;
                min-width: 750px;
                padding: 30px;
                > .title {
                    margin-bottom: 30px;
                }
                > .small-title {
                    margin-bottom: 20px;
                }
            }
        }
        > .user {
            min-width: 250px;
            padding-top: 20px;
            margin-right: 30px;
        }
    }
}
</style>