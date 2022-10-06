<template>
    <div class="wrapper">
        <aside>
            <h2>设置</h2>
            <div class="option" tabindex="1" @click="userIsShow">
                <svg>
                    <use xlink:href="#user" />
                </svg>
                <div>账户资料</div>
            </div>
            <div class="option" tabindex="2">
                <svg>
                    <use xlink:href="#conceal" />
                </svg>
                <div>隐私设置</div>
            </div>
            <div class="option" tabindex="3">
                <svg>
                    <use xlink:href="#style" />
                </svg>
                <div>样式设置</div>
            </div>
            <div class="option" tabindex="4">
                <svg>
                    <use xlink:href="#home" />
                </svg>
                <router-link to="/library"> 返回主页 </router-link>
            </div>
        </aside>
        <main>
            <div class="user" v-show="userShow">
                <div class="wrap">
                    <div class="photo" :style="'background:' + background">
                        {{ user.portrait }}
                    </div>
                    <div class="name">
                        <strong>{{ user.name }}</strong>
                        <div class="zero">
                            <div class="green"></div>
                            <div class="content">已登录</div>
                        </div>
                    </div>
                </div>
                <div class="logout" @click="logout">
                    <svg>
                        <use xlink:href="#logout" />
                    </svg>
                    <div>注销登录</div>
                </div>
            </div>
            <div class="sign" v-show="userShow">
                <div>
                    简介：<input
                        v-model="user.sign"
                        placeholder="请在此处输入简介"
                    />
                </div>
                <button @click="setSign">确定</button>
            </div>
        </main>
        <Confirm :message="message" v-show="showMessage">
            <template v-slot:yes>
                <div @click="isLogout">确定</div>
            </template>
            <template v-slot:no>
                <div @click="noLogout">取消</div>
            </template>
        </Confirm>
    </div>
</template>
  
<script>
import auth from "@/apis/auth";
import a from "@/assets/icons/setting/conceal.svg";
import b from "@/assets/icons/setting/user.svg";
import c from "@/assets/icons/setting/home.svg";
import d from "@/assets/icons/setting/logout.svg";
import f from "@/assets/icons/setting/style.svg";
import Confirm from "@/components/pop-ups/Confirm.vue";

export default {
    name: "Setting",
    data() {
        return {
            user: {
                name: "",
                portrait: "",
                sign: "",
            },
            message: "确认注销？",
            showMessage: false,
            background: "black",

            userShow: false,
            styleShow: false,
            concealShow: false,
        };
    },
    components: { Confirm },
    created() {
        //检查是否登录
        auth.getInfo()
            .then((data) => {
                this.user.name = data.username;
                this.user.portrait = this.user.name.slice(0, 1);
            })
            .catch((data) => {
                console.log(data);
                this.$router.push("/login");
            });
        if (localStorage.getItem("sign") === null) {
            this.user.sign = "未创建个性签名";
        } else {
            this.user.sign = localStorage.getItem("sign");
        }
    },
    methods: {
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
        setSign() {
            console.log(this.user.sign);
            localStorage.setItem("sign", this.user.sign);
        },
        userIsShow() {
            this.userShow = true;
            this.styleShow = false;
            this.concealShow = false;
        },
        styleIsShow() {
            this.userShow = false;
            this.styleShow = true;
            this.concealShow = false;
        },
        concealIsShow() {
            this.userShow = false;
            this.styleShow = false;
            this.concealShow = true;
        },
    },
};
</script>
<style lang="scss"scoped>
.wrapper {
    display: flex;
    white-space: nowrap;
    > aside {
        width: 350px;
        height: 100vh;
        border-right: 1px solid black;
        padding: 40px;
        > h2 {
            margin-bottom: 40px;
        }
        > .option {
            display: flex;
            padding: 5px;
            font-size: 14px;
            &:hover {
                background: rgb(224, 223, 223);
            }
            &:focus {
                background: rgb(219, 217, 217);
            }
        }
    }
    > main {
        padding: 20px;
        margin: 50px;
        width: 800px;
        .user {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: white;
            padding: 20px;
            > .wrap {
                display: flex;
                > .photo {
                    font-size: 30px;
                    text-align: center;
                    line-height: 60px;
                    width: 60px;
                    height: 60px;
                    border-radius: 30px;
                    box-shadow: 2px 1px 1px 1px rgb(170, 169, 169);
                    background: rgb(105, 28, 28);
                    color: rgb(238, 234, 234);
                    margin-right: 20px;
                }
                > .name {
                    > strong {
                        font-size: 18px;
                    }
                    > .zero {
                        margin-top: 5px;
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                        color: green;
                        > .green {
                            background: green;
                            width: 6px;
                            height: 6px;
                            border-radius: 3px;
                            margin-right: 5px;
                        }
                    }
                }
            }
            > .logout {
                border: 1px solid rgb(218, 214, 214);
                padding: 15px;
                padding-bottom: 5px;
                padding-top: 5px;
                font-size: 14px;
                display: flex;
                margin-left: 20px;
                > svg {
                    height: 1.2em;
                    width: 1.2em;
                    margin-left: 0px;
                }
            }
        }
        > .sign {
            display: flex;
            justify-content: space-between;
            background: white;
            margin-top: 20px;
            padding: 10px;
            padding-right: 20px;
            padding-left: 20px;
        }
    }
}
button {
    padding: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    background: rgb(59, 85, 71);
    color: rgb(223, 217, 217);
    border-radius: 10px;
    box-shadow: 1px 0px 0px 1px rgb(150, 147, 147);
    border: none;
}
input {
    padding: 5px;
    border: none;
    width: 300px;
}
svg {
    height: 1em;
    width: 1em;
    margin-right: 10px;
    margin-left: 10px;
}
</style>