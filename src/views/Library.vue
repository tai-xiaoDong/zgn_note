<template>
  <div id="Library">
    <h1>{{ msg }}</h1>
    <navBar />
  </div>
</template>

<script>
import navBar from "@/components/navBar.vue";
export default {
  name: "Library",
  data() {
    return {
      msg: "这是文档页面",
    };
  },
  components: {
    navBar,
  },
};
</script>