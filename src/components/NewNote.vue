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
  flex-direction: column;
  font-size: 17px;
  max-width: 160px;
  border-radius: 10px;
  background: #e3e6e9;
  color: #103b49;
  box-shadow: 2px 2px 1px 1px gray;
  > .newNote,
  .newWord {
    display: flex;
    flex-direction: row;
    margin: 10px;
    > svg {
      width: 20px;
      height: 20px;
      margin: 10px;
      fill: rgb(9, 94, 72);
    }
    > .txt {
      margin-bottom: 12px;
      margin-top: 12px;
    }
  }
  > .newWord:hover,
  .newNote:hover {
    background: rgb(219, 218, 218);
    border-radius: 15px;
    box-shadow: 2px 2px 1px 1px gray;
  }
}
</style>