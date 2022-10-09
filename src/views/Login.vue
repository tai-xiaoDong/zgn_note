<template>
    <div class="wrapper">
        <Alert :message="message" v-show="AlertShow">
            <template v-slot:yes><div>提示</div></template>
        </Alert>
        <div class="text">
            <div class="big-title">Mark</div>
            <div class="left-title">
                <div class="small-title">
                    <div class="online">online</div>
                    <div class="simple">simple</div>
                </div>
                <div class="down">down</div>
            </div>
        </div>
        <transition name="login-ing">
            <div class="form" v-show="isShowLogin">
                <div class="logo">
                    <img src="@/assets/imgs/logo.png" />
                </div>
                <input
                    type="text"
                    placeholder="用户名"
                    v-model="login.username"
                />
                <input
                    type="password"
                    placeholder="密码"
                    v-model="login.password"
                />
                <button @click="onLogin">登录</button>
                <nav>
                    <span @click="tourist">游客访问</span>
                    <span @click="showRegister">注册</span>
                </nav>
            </div>
        </transition>

        <transition name="register-ing">
            <div class="form" v-show="isShowRegister">
                <div class="logo">
                    <img src="@/assets/imgs/logo.png" />
                </div>
                <input
                    type="text"
                    placeholder="用户名"
                    v-model="register.username"
                />
                <input
                    type="password"
                    placeholder="密码"
                    v-model="register.password"
                />
                <button @click="onRegister">注册</button>
                <nav>
                    <span @click="tourist">游客访问</span>
                    <span @click="showLogin">登录</span>
                </nav>
            </div>
        </transition>
    </div>
</template>
    
<script>
import Auth from "@/apis/auth";
import Alert from "@/components/pop-ups/Alert.vue";
import notebooks from "@/apis/notebooks";
import axios from "axios";
import request from "@/helpers/request";
import d from "@/assets/icons/setting/logout.svg";

export default {
    name: "Login",
    data() {
        return {
            isShowLogin: true,
            isShowRegister: false,
            login: {
                username: "",
                password: "",
            },
            register: {
                username: "",
                password: "",
            },
            error: {
                usernameErr: "用户名必须是3-15个字符,仅限字母数字下划线中文",
                passwordErr: "请输入正确的密码",
                nullError: "用户名或者密码不能为空",
            },
            AlertShow: false,
            message: "",
        };
    },
    components: { Alert },
    methods: {
        tourist() {
            Auth.login({
                username: "游客",
                password: 123456,
            })
                .then((data) => {
                    this.onAlert("登录成功");
                    localStorage.setItem("token", data);
                    this.$router.push("/");
                })
                .catch((data) => {
                    this.onAlert("请输入正确的账号密码");
                });
        },
        onAlert(name) {
            this.AlertShow = true;
            this.message = name;
            setTimeout(() => {
                this.AlertShow = false;
            }, 1000);
        },
        showRegister() {
            this.isShowLogin = false;
            this.isShowRegister = true;
        },
        showLogin() {
            this.isShowLogin = true;
            this.isShowRegister = false;
        },
        onLogin() {
            let result = this.checkUserName(this.login.username);
            let result2 = this.checkPassWord(this.login.password);
            if (!result.isValid) {
                this.onAlert(this.error.usernameErr);
                return;
            }
            if (!result2.isValid) {
                this.onAlert(this.error.passwordErr);
                return;
            }
            Auth.login({
                username: this.login.username,
                password: this.login.password,
            })
                .then((data) => {
                    this.onAlert("登录成功");
                    localStorage.setItem("token", data);
                    this.$router.push("/");
                })
                .catch((data) => {
                    this.onAlert("请输入正确的账号密码");
                });
        },
        onRegister() {
            let result = this.checkUserName(this.register.username);
            let result2 = this.checkPassWord(this.register.password);
            if (!result.isValid) {
                this.onAlert(this.error.usernameErr);
                return;
            }
            if (!result2.isValid) {
                this.onAlert(this.error.passwordErr);
                return;
            }
            Auth.register({
                username: this.register.username,
                password: this.register.password,
            }).then((data) => {
                this.onAlert("注册成功");
                localStorage.setItem("token", data);
                this.$router.push("/");
            });
        },
        checkUserName(username) {
            return {
                isValid: /^[a-zA-Z_0-9\u4e00-\u9fa5]{2,15}$/.test(username),
                isError: "用户名必须是3-15个字符,仅限字母数字下划线中文",
            };
        },
        checkPassWord(password) {
            return {
                isValid: /^.{6,16}$/.test(password),
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    > .text {
        display: flex;
        color: rgb(26, 25, 25);
        margin-right: 50px;
        padding-top: 20px;
        line-height: 1;
        > .big-title {
            font-size: 160px;
        }
        > .left-title {
            display: flex;
            flex-direction: column;
            align-items: end;
            justify-content: center;
            > .down {
                font-size: 120px;
            }
            > .small-title {
                display: flex;
                font-size: 30px;
                > .online,
                .simple {
                    margin-left: 20px;
                    margin-right: 10px;
                }
                > .online {
                    color: #caae5b;
                }
                > .simple {
                    color: #3f5f4e;
                }
            }
        }
    }
    > .form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-height: 500px;
        min-width: 380px;
        background: white;
        border-radius: 10px;
        box-shadow: 2px 2px 3px 3px gray;
        > input,
        button {
            display: block;
            margin-top: 20px;
            border: none;
            min-width: 300px;
            min-height: 40px;
            background: #e3e6e9;
            color: #010a0e;
            border-radius: 10px;
        }
        > input {
            padding-left: 10px;
            font-size: 14px;
        }
        > input:hover {
            background: rgb(219, 218, 218);
        }
        > button {
            background: #1c2e4e;
            color: rgb(224, 221, 221);
        }
        > .logo {
            margin-bottom: 40px;
            > img {
                width: 80px;
                height: 80px;
            }
        }
        > nav {
            display: flex;
            margin-top: 50px;
            > span {
                padding: 0 20px;
                color: rgb(3, 3, 87);
            }
        }
    }

    .login-ing-enter-active,
    .register-ing-enter-active {
        transition: all 0.5s ease-in;
    }
    .login-ing-enter {
        transform: translateX(-50px);
        opacity: 0.5;
    }
    .login-ing-leave,
    .register-ing-leave {
        display: none;
    }
    .register-ing-enter {
        transform: translateX(50px);
        opacity: 0.5;
    }
}
</style>