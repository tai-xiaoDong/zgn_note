<template>
    <div class="Plan">
        <NavBar />
        <div>
            <div>
                <div>我的计划</div>
                <div>新建</div>
                <div>完成</div>
            </div>
            <div>
                <div>判断是否守约</div>
                <div>守约次数</div>
                <div>未约次数</div>
                <div>清空</div>
            </div>
            <div>历史记录</div>
        </div>
    </div>
</template>
  
  <script>
export default {
    name: "Plan",
    data() {
        return {
            msg: "这是计划页面",
        };
    },
};
</script>
<style lang="scss" scoped>
.Plan {
    display: flex;
}
</style>