<template>
  <div id="Recycle">
    <NavBar />
  </div>
</template>
  
<script>
import NavBar from "@/components/NavBar.vue";
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