import axios from 'axios';

// post 请求的解析方式
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 服务器地址，每次路径前会自动加上这个地址
// axios.defaults.baseURL = "http://note-server.hunger-valley.com";
axios.defaults.baseURL = "http://43.140.205.84:80";
// axios.defaults.withCredentials = true;


//封装的函数接受三个参数，路径，请求方式（默认get）,请求体（默认空）
function request(url, type = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        // 配置项目  
        let option = {
            url,
            method: type,
            // 如果服务器响应的的状态码不满足这个条件，直接报错执行 catch
            validateStatus(status) {
                return (status >= 200 && status < 300 || status === 400)
            },
            headers: { token: localStorage.getItem("token") }
        };
        // 如果请求方式是get 那么设置params为data，否则设置请求体都为data
        if (type.toLowerCase() === 'get') {
            option.params = data
        } else {
            option.data = data
        }

        //发送请求
        axios(option).then(res => {
            if (res.status === 200) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch((err) => {
            reject(
                console.log(err)
            )

        })
    })
}

export default request;