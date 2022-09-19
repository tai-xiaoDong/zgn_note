<template>
    <div class="wrapper">
        <transition name="login-ing">
            <div class="form" v-show="isShowLogin">
                <div class="logo">
                    <img src="@/assets/imgs/logo.jpg" />
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
                    <router-link to="/library">游客访问</router-link>
                    <span @click="showRegister">注册</span>
                </nav>
            </div>
        </transition>

        <transition name="register-ing">
            <div class="form" v-show="isShowRegister">
                <div class="logo">
                    <img src="@/assets/imgs/logo.jpg" />
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
                    <router-link to="/library">游客访问</router-link>
                    <span @click="showLogin">登录</span>
                </nav>
            </div>
        </transition>
    </div>
</template>
    
<script>
import request from "@/helpers/request";
import router from "@/router";
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
        };
    },
    methods: {
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
                window.alert(this.error.usernameErr);
                return;
            }
            if (!result2.isValid) {
                window.alert(this.error.passwordErr);
                return;
            }
            window.alert("登录成功");
            console.log(
                "账号：",
                this.login.username,
                "密码：",
                this.login.password
            );
            request("/auth/login", "post", {
                username: this.login.username,
                password: this.login.password,
            }).then((data) => {
                console.log(data);
            });
            this.$router.push("/library");
        },
        onRegister() {
            let result = this.checkUserName(this.register.username);
            let result2 = this.checkPassWord(this.register.password);
            if (!result.isValid) {
                window.alert(this.error.usernameErr);
                return;
            }
            if (!result2.isValid) {
                window.alert(this.error.passwordErr);
                return;
            }
            window.alert("注册成功");
            console.log(
                "账号：",
                this.register.username,
                "密码：",
                this.register.password
            );
            request("/auth/register", "post", {
                username: this.register.username,
                password: this.register.password,
            }).then((data) => {
                console.log(data);
            });
            this.$router.push("/library");
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
    > .form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-height: 550px;
        min-width: 400px;
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
        > input::-webkit-input-placeholder {
            padding-left: 10px;
            font-size: 14px;
        }
        > input:hover {
            background: rgb(219, 218, 218);
        }
        > button {
            background: #154453;
            color: rgb(250, 250, 250);
        }
        > .logo {
            margin-bottom: 40px;
            > img {
                width: 100px;
                height: 100px;
            }
        }
        > nav {
            display: flex;
            margin-top: 50px;

            > span,
            a {
                padding: 0 20px;
                color: rgb(4, 4, 128);
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