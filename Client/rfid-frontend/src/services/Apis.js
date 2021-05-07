import Api from './index.js'


export default {
    get(url) {
        return Api.get(url)
    },
    create(path, body) {
        return Api.post(`/${path}`, body)
    },

    

}