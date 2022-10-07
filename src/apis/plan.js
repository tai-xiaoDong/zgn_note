import request from "@/helpers/request";

// 封装接口 登录，注销，注册，是否登录
const url = {
    getPlan: '/plan',
    getPlanh: '/planh',
    deletePlan: '/plan/delete',
    deletePlanh: '/planh/delete',
    createPlan: '/plan/create',
    createPlanh: '/planh/create',
};

export default {
    getPlan() {
        return (
            request(url.getPlan, 'get')
        )
    },
    getPlanh() {
        return (
            request(url.getPlanh, 'get')
        )
    },
    createPlan(content) {
        return (
            request(url.createPlan, 'post', content)
        )
    },
    createPlanh(content) {
        return (
            request(url.createPlanh, 'post', content)
        )
    },
    deletePlan(content) {
        return (
            request(url.deletePlan, 'post', content)
        )
    },
    deletePlanh(content) {
        return (
            request(url.deletePlanh, 'post', content)
        )
    },
}


