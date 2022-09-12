<template>
  <div id="Recycle">
    <h1>{{ msg }}</h1>
    <NavBar />
  </div>
</template>
  
  <script>
import NavBar from "@/components/navBar.vue";
export default {
  name: "Recycle",
  data() {
    return {
      msg: "这是回收站页面",
    };
  },
  components: { NavBar },
};
</script>