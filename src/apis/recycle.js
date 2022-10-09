import request from "@/helpers/request";

const url = {
    GET: '/recycle',
    Recover: '/recycle/recover',
    DEL: '/recycle/delete',
}

export default {
    getAll() {
        return (
            request(url.GET, 'get')
        )
    },
    recoverNotes(notebooksName) {
        return (
            request(url.Recover, 'post', notebooksName)
        )
    },
    delete(notebooksName) {
        return (
            request(url.DEL, 'post', notebooksName)
        )
    }

}