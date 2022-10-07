<template>
    <div class="wrapper">
        <div class="alert">
            <div class="wrap">
                <div class="content">
                    <div class="yes"><slot name="yes"></slot></div>
                    <div class="echo">{{ message }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Alert",
    props: ["message"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/alert.scss";
</style>