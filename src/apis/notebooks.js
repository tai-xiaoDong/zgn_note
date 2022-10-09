import request from "@/helpers/request";

const url = {
    GET: '/notebooks',
    ADD: '/notebooks',
    SET: '/update/notebooks',
    DEL: '/delete/notebooks',
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
            request(url.SET, 'post', notebooksName)
        )
    },
    deleteNotebook(notebooksName) {
        return (
            request(url.DEL, 'post', notebooksName)
        )
    }

}