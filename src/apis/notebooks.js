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
            request(url.GET)
        )
    },
    addNotebook(notebooksName) {
        return (
            request(url.ADD, notebooksName)
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