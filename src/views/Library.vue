<template>
  <div class="Library">
    <navBar />
    <div class="showed">
      <aside class="note">
        <section>
          <div>文件夹名称</div>
          <div>新建<!-- <NewNote /> --></div>
          <div>删除</div>
        </section>
        <article class="word">
          <div>文件名称</div>
          <div>删除</div>
          <div>编辑</div>
        </article>
      </aside>
    </div>
    <main></main>
  </div>
</template>

<script>
import NewNote from "../components/NewNote.vue";
export default {
  name: "Library",
  data() {
    return {
      msg: "这是文档页面",
    };
  },
  components: { NewNote },
};
</script>

<style lang="scss" scoped>
.Library {
  display: flex;
  > .showed {
    background: #f2f5f8;
    color: #103b49;
    box-shadow: 2px 0px 2px 2px rgb(204, 202, 202);
    height: 100vh;
    width: 340px;
    margin-left: 5px;
    > .note {
      display: flex;
      flex-direction: column;
      > section {
        display: flex;
        flex-direction: row;
      }
      > .word {
        display: flex;
      }
    }
  }
  > main {
    max-width: 1300px;
    height: 100vh;
    border: 1px solid red;
  }
}
</style>