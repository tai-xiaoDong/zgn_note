<template>
    <div id="Setting">
        <NavBar />
    </div>
</template>
  
<script>
import auth from "@/apis/auth";

export default {
    name: "Setting",
    data() {
        return {
            msg: "这是设置页面",
        };
    },
    created() {
        //检查是否登录
        auth.getInfo()
            .then((data) => {
                console.log(data);
            })
            .catch((data) => {
                console.log(data);
                this.$router.push("/login");
            });
    },
};
</script>