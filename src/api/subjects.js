import handler from 'src/util/request'

const prefix = "/subjects";

export default class SubjectsApi {


    getSubject(id) {
        return handler.get(`${prefix}/${id}`)
    }

    listSubjects() {
        return handler.get(prefix)
    }

}