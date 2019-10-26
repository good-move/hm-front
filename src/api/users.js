import handler from 'src/util/request'

const prefix = "/users";

export default class UserApi {


    getUser(id) {
        return handler.get(`${prefix}/${id}`)
    }

    listUsers() {
        return handler.get(prefix)
    }

}