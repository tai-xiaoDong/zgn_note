<template>
    <div :title="user.username" class="user">
        <div class="photo">{{ portrait }}</div>
        <div class="name">{{ user.username }}</div>
        <div class="sign">简介：喜欢茹茹</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                username: "User-name",
            },
            portrait: "U",
        };
    },
};
</script>

<style lang="scss" scoped>
.user {
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgb(196, 194, 194);
    margin-bottom: 20px;
    margin-top: 15px;
    > .photo {
        font-size: 50px;
        text-align: center;
        line-height: 100px;
        width: 100px;
        height: 100px;
        border-radius: 50px;
        box-shadow: 3px 2px 5px 2px rgb(170, 169, 169);
        background: rgb(59, 85, 71);
        color: rgb(238, 234, 234);
        margin-top: 10px;
    }
    > .name {
        width: 200px;
        font-size: 20px;
        color: rgb(40, 74, 155);
        height: 80px;
        text-align: center;
        line-height: 80px;
        border-radius: 10px;
    }
    > .sign {
        padding: 20px;
        font-size: 14px;
        height: 80px;
        color: rgb(156, 86, 64);
        margin-bottom: 20px;
    }
}
</style>