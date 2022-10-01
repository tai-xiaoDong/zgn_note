<template>
    <div class="wrapper">
        <div class="alert">
            <div class="wrap">
                <div class="content">{{ message }}</div>
                <div class="echo">
                    <div class="yes"><slot name="yes"></slot></div>
                    <div class="no"><slot name="no"></slot></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Confirm",
    props: ["message"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/confirm.scss";
</style>