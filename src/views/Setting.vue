<template>
  <div id="Setting">
    <h1>{{ msg }}</h1>
    <NavBar />
  </div>
</template>
  
  <script>
import NavBar from "@/components/navBar.vue";
export default {
  name: "Setting",
  data() {
    return {
      msg: "这是设置页面",
    };
  },
  components: { NavBar },
};
</script>