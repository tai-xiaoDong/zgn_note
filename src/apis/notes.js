import request from "@/helpers/request";

const url = {
    GET: '/notebooks/notes',
    ADD: '/notes',
    SET: '/update/notes',
    DEL: '/delete/notes',
    read: '/content',
}

export default {

    getNotes(noteName) {
        return (
            request(url.GET, 'post', noteName)
        )
    },
    addNotes(noteName) {
        return (
            request(url.ADD, 'post', noteName)
        )
    },
    updateNotes(notebooksName) {
        return (
            request(url.SET, 'post', notebooksName)
        )
    },
    deleteNotes(notebooksName) {
        return (
            request(url.DEL, 'post', notebooksName)
        )
    },

    getContent(content) {
        return (
            request(url.read, 'post', content)
        )
    },

}