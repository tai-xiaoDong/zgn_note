<template>
    <div class="wrapper">
        <div class="newNote">
            <svg>
                <use xlink:href="#book" />
            </svg>
            <div class="txt">新建笔记本</div>
        </div>
        <div class="newWord">
            <svg>
                <use xlink:href="#word"></use>
            </svg>
            <div class="txt">新建笔记</div>
        </div>
    </div>
</template>

<script>
import a from "@/assets/icons/newNote/book.svg";
import b from "@/assets/icons/newNote/word.svg";

export default {
    name: "NewNote",
};
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    font-size: 16px;
    max-width: 250px;
    border-radius: 10px;
    color: rgb(59, 85, 71);
    box-shadow: 0px 4px 4px 0px rgb(196, 194, 194);

    > .newNote,
    .newWord {
        display: flex;
        flex-direction: row;
        margin: 10px;
        padding-bottom: 5px;
        padding-top: 5px;
        > svg {
            width: 1em;
            height: 1em;
            margin: 5px;
            fill: rgb(59, 85, 71);
        }
        > .txt {
            margin-bottom: 5px;
            margin-top: 5px;
            margin-right: 5px;
        }
    }
}
</style>