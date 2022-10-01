import request from "@/helpers/request";

const url = {
    GET: '/notebooks',
    ADD: '/notebooks',
    SET: '/notebooks/:notebook',
    DEL: '/notebooks/:notebook',
}

export default {
    getAll() {
        return (
            request(url.GET, 'get')
        )
    },
    addNotebook(notebooksName) {
        return (
            request(url.ADD, 'post', notebooksName)
        )
    },
    updateNotebook(notebooksName) {
        return (
            request(url.ADD, notebooksName)
        )
    },
    deleteNotebook(notebooksName) {
        return (
            request(url.ADD, notebooksName)
        )
    }

}