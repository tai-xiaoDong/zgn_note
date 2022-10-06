<template>
    <nav :class="change">
        <div class="navbar">
            <router-link to="/library" class="logo">
                <img src="@/assets/imgs/logo.png" />
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
                    <div class="txt">折叠</div>
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
        <Confirm :message="message" v-show="showMessage">
            <template v-slot:yes>
                <div @click="isLogout">确定</div>
            </template>
            <template v-slot:no>
                <div @click="noLogout">取消</div>
            </template>
        </Confirm>
    </nav>
</template>

<script>
import a from "@/assets/icons/navbar/library.svg";
import b from "@/assets/icons/navbar/plan.svg";
import c from "@/assets/icons/navbar/setting.svg";
import d from "@/assets/icons/navbar/login.svg";
import e from "@/assets/icons/navbar/recycle.svg";
import f from "@/assets/icons/navbar/wide.svg";
import g from "@/assets/icons/navbar/narrow.svg";
import request from "@/helpers/request";
import Confirm from "@/components/pop-ups/Confirm.vue";

export default {
    name: "NavBar",
    data() {
        return {
            change: "narrow",
            message: "确认注销？",
            showMessage: false,
        };
    },
    components: { Confirm },
    methods: {
        navChange1() {
            this.change = "narrow";
        },
        navChange2() {
            this.change = "wide";
        },
        logout() {
            this.showMessage = true;
        },
        isLogout() {
            localStorage.setItem("token", "");
            this.$router.push("/login");
        },
        noLogout() {
            this.showMessage = false;
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
    > .navbar {
        height: 100vh;
        > .selected {
            background: rgb(59, 85, 71);
            border-radius: 10px;
            color: rgb(223, 217, 217);
            box-shadow: 1px 1px 2px 2px rgb(201, 199, 199);
        }
        > .item,
        .logout {
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
            /* margin-bottom: 10px; */
            > img {
                width: 70px;
                height: 70px;
            }
        }
    }
}
.wide {
    min-width: 170px;
    max-width: 170px;
    > .navbar {
        > .item,
        .logout {
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
                margin: 20px;
                margin-left: 50px;
                margin-bottom: 150px;
            }
        }
    }
}
.narrow {
    min-width: 90px;
    max-width: 90px;
    > .navbar {
        > .item,
        .logout {
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
                margin: 20px;
                margin-left: 15px;
                margin-bottom: 150px;
            }
        }
    }
}
</style>