<template>
    <nav :class="change">
        <div>
            <router-link to="/library" class="logo">
                <img src="@/assets/imgs/logo.jpg" />
            </router-link>
            <router-link to="/library" class="item" active-class="selected">
                <div class="wrap">
                    <svg>
                        <use xlink:href="#library"></use>
                    </svg>
                    <div class="txt">文件夹</div>
                </div>
            </router-link>
            <router-link to="/recycle" class="item" active-class="selected">
                <div class="wrap">
                    <svg>
                        <use xlink:href="#recycle"></use>
                    </svg>
                    <div class="txt">回收站</div>
                </div>
            </router-link>
            <router-link to="/plan" class="item" active-class="selected">
                <div class="wrap">
                    <svg>
                        <use xlink:href="#plan"></use>
                    </svg>
                    <div class="txt">计划</div>
                </div>
            </router-link>
            <router-link to="/setting" class="item" active-class="selected">
                <div class="wrap">
                    <svg>
                        <use xlink:href="#setting"></use>
                    </svg>
                    <div class="txt">设置</div>
                </div>
            </router-link>
            <div class="item">
                <div class="rim" @click="navChange1">
                    <svg class="big">
                        <use xlink:href="#narrow"></use>
                    </svg>
                    <div class="txt">收起</div>
                </div>
            </div>
            <div class="item">
                <div class="rim2" @click="navChange2">
                    <svg class="small">
                        <use xlink:href="#wide"></use>
                    </svg>
                </div>
            </div>
            <div class="logout" @click="logout">
                <div class="wrap">
                    <svg>
                        <use xlink:href="#login"></use>
                    </svg>
                    <div class="txt">注销</div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import a from "@/assets/icons/library.svg";
import b from "@/assets/icons/plan.svg";
import c from "@/assets/icons/setting.svg";
import d from "@/assets/icons/login.svg";
import e from "@/assets/icons/recycle.svg";
import f from "@/assets/icons/wide.svg";
import g from "@/assets/icons/narrow.svg";
import request from "@/helpers/request";

export default {
    name: "NavBar",
    data() {
        return { change: "wide" };
    },

    methods: {
        navChange1() {
            this.change = "narrow";
        },
        navChange2() {
            this.change = "wide";
        },
        logout() {
            request("/auth/logout").then((data) => {
                console.log(data);
            });
            this.$router.push("/login");
        },
    },
};
</script>

<style lang="scss" scoped>
.wide,
.narrow {
    display: Flex;
    flex-direction: column;
    justify-content: center;
    color: rgb(42, 49, 59);
    margin: 10px;
    margin-top: 40px;
    > div {
        min-height: 90vh;
        box-shadow: 0px 2px 4px 1px rgb(155, 154, 154);
        border-radius: 20px;
        > .selected {
            background: rgb(59, 85, 71);
            border-radius: 10px;
            color: rgb(223, 217, 217);
            box-shadow: 1px 1px 2px 2px rgb(201, 199, 199);
        }
        > .item,
        .logout,
        .logo {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 0 10px;
            margin-bottom: 10px;
            > .wrap,
            .rim,
            .rim2 {
                display: flex;
                flex-direction: row;
                font-size: 16px;
                > svg {
                    fill: currentColor;
                    margin: 20px;
                    margin-left: 30px;
                    min-width: 23px;
                    min-height: 23px;
                    max-width: 23px;
                    max-height: 23px;
                }
            }
            .wrap:hover,
            .wrapper:hover,
            .rim:hover,
            .rim2:hover {
                border-radius: 10px;
                box-shadow: 1px 1px 2px 2px gray;
            }
        }
        .logo {
            > img {
                width: 60px;
                height: 60px;
            }
        }
    }
}
.wide {
    min-width: 170px;
    max-width: 170px;
    > div {
        > .item,
        .logout,
        .logo {
            > .rim {
                display: flex;
                > .big {
                    fill: currentColor;
                    margin: 20px;
                    margin-left: 30px;
                }
                > .txt {
                    margin-top: 22px;
                    height: 23px;
                }
            }
            > .rim2 {
                display: none;
            }
            > .wrap {
                max-width: 180px;
                > .txt {
                    margin-top: 22px;
                    height: 23px;
                }
                .small {
                    display: none;
                }
            }
        }
        .logo {
            > img {
                margin: 50px;
                margin-bottom: 150px;
            }
        }
    }
}
.narrow {
    min-width: 90px;
    max-width: 90px;
    > div {
        > .item,
        .logout,
        .logo {
            > .rim {
                display: none;
            }
            > .rim2 {
                > svg {
                    fill: currentColor;
                    margin-left: 25px;
                }
            }

            > .wrap {
                > .txt {
                    display: none;
                }
                > svg {
                    margin-left: 25px;
                }
            }
        }
        .logo {
            > img {
                margin: 50px;
                margin-left: 8px;
                margin-bottom: 150px;
            }
        }
    }
}
</style>