import request from "@/helpers/request";

// 封装接口 登录，注销，注册，是否登录
const url = {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    get_info: '/auth',
};

export default {
    register({ username, password }) {
        return (
            request(url.register, "post", { username, password })
        );
    },
    login({ username, password }) {
        return (
            request(url.login, "post", { username, password })
        );
    },
    logout() {
        return (
            request(url.logout)
        );
    },
    getInfo() {
        return (
            request(url.get_info)
        );
    }
}


