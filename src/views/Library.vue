<template>
    <div class="Library">
        <navBar />
        <div class="doc">
            <section>
                <div>
                    <div class="title"><strong>一、今天吃什么</strong></div>
                    <div class="content">1.米饭</div>
                    <div class="content">2.蔬菜</div>
                </div>
                <div>
                    <div class="title"><strong>一、今天吃什么</strong></div>
                    <div class="content">1.米饭</div>
                </div>
                <div>
                    <div class="title"><strong>一、今天吃什么</strong></div>
                    <div class="content">1.米饭</div>
                </div>
            </section>
            <main>
                <div>创建时间：2022-9-19</div>
                <hr />
                <div class="title"><h1>一、今天吃什么</h1></div>
                <div class="title">1.米饭</div>
                <div class="content">这里显示文章内容</div>
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
            margin-left: 20px;
            > div {
                border-right: 1px solid rgb(221, 218, 218);
                > .title {
                    padding: 10px;
                    border-radius: 10px;
                    color: rgb(156, 86, 64);
                }
                > .content {
                    font-size: 14px;
                    color: rgb(40, 74, 155);
                    white-space: pre-wrap;
                    margin-top: 5px;
                    padding: 10px;
                    padding-left: 30px;
                    border-radius: 10px;
                }
                .title:hover,
                .content:hover {
                    border-radius: 10px;
                    box-shadow: 0px 2px 2px 1px rgb(42, 49, 59);
                }
            }
        }
        > main {
            padding-top: 30px;
            max-width: 1000px;
            min-width: 750px;
            padding: 30px;
            > .title {
                margin-top: 30px;
                margin-bottom: 20px;
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