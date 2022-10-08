
<template>
    <div class="showPlan">
        <div class="myPlan">
            <div class="mainWrap">
                <h4 class="title" @click="setShow">我的计划</h4>
                <main
                    v-for="(content, index) in plan.content"
                    :key="index"
                    v-show="show"
                    @click="toPlan"
                >
                    <div class="content">
                        {{ content.content }}
                    </div>
                    <div class="time">
                        {{ content.createdAt }}
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import plan from "@/apis/plan";
import dayjs from "dayjs";
export default {
    name: "ShowPlan",
    data() {
        return {
            plan: {
                content: "",
            },
            show: false,
        };
    },
    created() {
        plan.getPlan()
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].content !== null) {
                        data[i].createdAt = dayjs(data[i].createdAt).format(
                            "MM-DD"
                        );
                    }
                }
                this.plan.content = data;
                console.log(this.plan.content);
            })
            .catch((data) => {
                console.log(data);
            });
    },
    methods: {
        setShow() {
            this.show = !this.show;
        },
        toPlan() {
            this.$router.push("/plan");
        },
    },
};
</script>

<style lang="scss" scoped>
.showPlan {
    max-width: 250px;
    > .myPlan {
        .mainWrap {
            display: flex;
            flex-direction: column;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 1px 2px 4px 1px rgb(196, 194, 194);
            .title {
                white-space: nowrap;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 14px;
                padding: 5px;
            }
            > main {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 14px;
                margin-top: 10px;

                padding: 5px;
                > .time {
                    white-space: nowrap;
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>