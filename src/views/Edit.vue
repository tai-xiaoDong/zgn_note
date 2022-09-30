<template>
    <div>edit</div>
</template>

<script>
import auth from "@/apis/auth";
export default {
    name: "Edit",
    created() {
        //检查是否登录
        auth.getInfo()
            .then((data) => {
                console.log(data);
            })
            .catch((data) => {
                this.$router.push("/login");
            });
    },
};
</script>

<style lang="scss" scoped>
</style>