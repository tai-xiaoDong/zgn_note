<template>
    <div class="wrapper">
        <div class="prompt">
            <div class="wrap">
                <input
                    type="text"
                    placeholder="请在此输入文件名"
                    class="content"
                    v-model="value"
                    :values="value"
                />
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
    name: "Prompt",
    data() {
        return {
            value: "",
        };
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.prompt {
    width: 500px;
    height: 110px;
    padding: 10px;
    position: fixed;
    left: 40%;
    top: 40%;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgb(196, 194, 194);
    .wrap {
        > .content {
            padding: 10px;
            margin-left: 20px;
            border: none;
            width: 400px;
        }
        > .content::-webkit-input-placeholder {
            padding-left: 10px;
        }
        > .echo {
            display: flex;
            justify-content: right;
            margin-top: 15px;
            > .yes,
            .no {
                margin-right: 10px;
                padding: 10px;
                padding-top: 5px;
                padding-bottom: 5px;
                font-size: 14px;
                border-radius: 10px;
                box-shadow: 1px 1px 2px 2px rgb(201, 199, 199);
            }
            > .yes {
                background: rgb(59, 85, 71);
                color: rgb(223, 217, 217);
            }
        }
    }
}
</style>