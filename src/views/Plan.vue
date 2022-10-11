<template>
    <div class="Plan">
        <Alert :message="message" v-show="AlertShow">
            <template v-slot:yes><div>提示</div></template>
        </Alert>
        <NavBar />

        <div class="wrapper">
            <div class="wrap">
                <div class="myPlan">
                    <div class="mainWrap">
                        <h2 class="title">我的计划</h2>
                        <main
                            v-for="(content, id) in this.plan.content"
                            :key="id"
                        >
                            <div class="content">{{ content.content }}</div>
                            <div class="time">
                                {{ content.createdAt }}
                                <button
                                    @click="
                                        ok(content.content, content.createdAt)
                                    "
                                >
                                    完成
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
                <aside>
                    <div class="print">
                        <input type="text" v-model="plan.newPlan" />
                        <button @click="newPlan">新建计划</button>
                    </div>
                    <div class="option">
                        <div class="again" @click="again">
                            <div>重新计数</div>
                        </div>
                        <div class="numbers">
                            <div class="yes">
                                <div class="title">守约次数</div>
                                <div class="number">
                                    <strong>{{ plan.yes }}</strong>
                                </div>
                            </div>
                            <div class="no">
                                <div class="title">未守约次数</div>
                                <div class="number">
                                    <strong>{{ plan.no }}</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="plan_h">
                        <div class="title" @click="setShowHistory">
                            历史记录
                        </div>
                        <div
                            class="history"
                            v-for="(content, index) in plan.historyContent"
                            :key="index"
                            v-show="showHistory"
                        >
                            <div class="content">{{ content.content }}</div>
                            <div class="time">
                                {{ content.createdAt }}
                                <button @click="deletePlanh(content.content)">
                                    删除
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </div>
</template>
  
<script>
import auth from "@/apis/auth";
import c from "@/assets/icons/setting/home.svg";
import plan from "@/apis/plan";
import dayjs from "dayjs";
import Alert from "@/components/pop-ups/Alert.vue";

export default {
    name: "Plan",
    data() {
        return {
            plan: {
                historyContent: [],
                content: [],
                newPlan: "",
                yes: 0,
                no: 0,
            },
            TEXT: "",
            showHistory: false,
            message: "",
            AlertShow: false,
        };
    },
    components: { Alert },
    created() {
        //检查是否登录
        auth.getInfo()
            .then((data) => {
                if (data.yes === null) {
                    this.plan.yes = 0;
                } else {
                    this.plan.yes = data.yes;
                }
                if (data.no === null) {
                    this.plan.no = 0;
                } else {
                    this.plan.no = data.no;
                }
            })
            .catch((data) => {
                console.log(data);
                this.$router.push("/login");
            });
        plan.getPlan()
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].content !== null) {
                        data[i].createdAt = dayjs(data[i].createdAt).format(
                            "YYYY-MM-DD"
                        );
                    }
                }
                this.plan.content = data;
            })
            .catch((data) => {});
        plan.getPlanh()
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].content !== null) {
                        data[i].createdAt = dayjs(data[i].createdAt).format(
                            "YYYY-MM-DD"
                        );
                    }
                }
                this.plan.historyContent = data;
            })
            .catch((data) => {});
    },
    methods: {
        onAlert(name) {
            this.AlertShow = true;
            this.message = name;
            setTimeout(() => {
                this.AlertShow = false;
            }, 1000);
        },
        setShowHistory() {
            this.showHistory = !this.showHistory;
        },
        newPlan() {
            if (this.plan.newPlan === "") {
                this.onAlert("不能为空");
            } else {
                plan.createPlan({ content: this.plan.newPlan })
                    .then((data) => {
                        data[0].createdAt = dayjs(data[0].createdAt).format(
                            "YYYY-MM-DD"
                        );
                        this.plan.content.push(data[0]);
                        this.plan.newPlan = "";
                    })
                    .catch((data) => {
                        console.log(data);
                    });
            }
        },
        ok(value, time) {
            plan.deletePlan({ content: value, time: time })
                .then((data) => {
                    location.reload();
                })
                .catch((data) => {
                    console.log(data);
                });
        },
        deletePlanh(value) {
            let a = value;
            plan.deletePlanh({ content: value })
                .then((data) => {
                    this.plan.historyContent = this.plan.historyContent.filter(
                        (items) => items.content !== a
                    );
                })
                .catch((data) => {
                    console.log(data);
                });
        },
        again() {
            auth.deletePlan()
                .then((data) => {
                    this.plan.yes = 0;
                    this.plan.no = 0;
                })
                .catch((data) => {
                    console.log(data);
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.Plan {
    display: flex;
    height: 100vh;
    > .wrapper {
        display: flex;
        flex-grow: 1;
        > .wrap {
            display: flex;
            > .myPlan {
                margin-left: 50px;
                margin-right: 50px;
                overflow: hidden;
                .mainWrap {
                    display: flex;
                    flex-direction: column;
                    min-width: 700px;
                    padding: 10px;
                    .title {
                        margin-top: 50px;
                        display: flex;
                        padding: 10px;
                        margin-bottom: 20px;
                    }
                    > main {
                        display: flex;
                        min-width: 600px;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px;
                        padding-right: 20px;
                        padding-left: 20px;
                        font-size: 14px;
                        border-radius: 10px;
                        box-shadow: 1px 1px 2px 2px rgb(201, 199, 199);
                        margin-bottom: 10px;
                        > .content {
                            margin-right: 20px;
                        }
                    }
                }
            }
            > aside {
                display: flex;
                flex-direction: column;
                padding: 28px;
                > .option {
                    display: flex;
                    flex-direction: row-reverse;
                    max-width: 330px;

                    padding: 10px;
                    justify-content: center;
                    border-radius: 10px;
                    box-shadow: 1px 1px 2px 2px rgb(201, 199, 199);
                    > .again {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        > div {
                            padding: 5px;
                            border-radius: 5px;
                            background: rgba(214, 211, 211, 0.5);
                            box-shadow: 1px 1px 1px 1px rgb(201, 199, 199);
                        }
                    }
                    > .numbers {
                        margin-right: 36px;
                        > .no {
                            display: flex;
                            > .title {
                                margin-right: 20px;
                            }
                            > .number {
                                color: red;
                                font-size: 18px;
                            }
                        }
                        > .yes {
                            display: flex;
                            margin-bottom: 10px;

                            .title {
                                margin-right: 36px;
                            }
                            .number {
                                font-size: 18px;
                            }
                        }
                    }
                }
            }
            .print {
                margin-top: 100px;
                margin-bottom: 20px;
                display: flex;
                justify-content: center;
            }
            .plan_h {
                display: flex;
                flex-direction: column;
                font-size: 14px;
                margin-top: 20px;
                overflow: hidden;
                border-radius: 10px;
                box-shadow: 1px 1px 2px 2px rgb(201, 199, 199);
                padding: 10px;

                max-width: 600px;
                > .title {
                    display: flex;
                    justify-content: center;
                }
                > .history {
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: nowrap;
                    white-space: nowrap;
                    align-items: center;
                    margin-bottom: 10px;
                    > .time {
                        margin-left: 10px;
                    }
                }
            }
        }
    }
}
button {
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 14px;
    background: rgba(59, 85, 71, 1);
    color: rgb(223, 217, 217);
    border-radius: 10px;
    box-shadow: 1px 1px 2px 1px rgb(150, 147, 147);
    border: none;
    margin-left: 10px;
}
input {
    border: none;
    box-shadow: 1px 1px 2px 1px rgb(201, 199, 199);
    background: #f3f3f3;
    padding-left: 5px;
}
</style>