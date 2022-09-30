<template>
    <div class="Recycle">
        <NavBar />
        <div>
            <div class="title">
                <strong>一、今天吃什么</strong>
                <div>恢复</div>
                <div>彻底删除</div>
            </div>
            <div class="content">
                1.米饭
                <div>恢复</div>
                <div>彻底删除</div>
            </div>
        </div>
    </div>
</template>
  
<script>
import auth from '@/apis/auth';

export default {
    name: "Recycle",
    created() {
        //检查是否登录
        auth.getInfo()
            .then((data) => {
                console.log(data);
            })
            .catch((data) => {
                console.log(data)
                this.$router.push("/login");
            });
    },
};
</script>

<style lang="scss" scoped>
.Recycle {
    display: flex;
}
</style>