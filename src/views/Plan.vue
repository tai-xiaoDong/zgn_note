<template>
  <div id="Plan">
    <h1>{{ msg }}</h1>
    <NavBar />
  </div>
</template>
  
  <script>
import NavBar from "@/components/navBar.vue";
export default {
  name: "Plan",
  data() {
    return {
      msg: "这是计划页面",
    };
  },
  components: { NavBar },
};
</script>