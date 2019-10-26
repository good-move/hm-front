import handler from 'src/util/request'

const prefix = "/memes";

export default class MemesApi {

    answer(memeId, userId, feedbackValue, answerValue) {
        return handler.post(`${prefix}/answer`, {
            userId: userId,
            memeId: memeId,
            feedback: answerValue,
            answer: answerValue,
        })
    }

    nextMeme(userId) {
        return handler.post(`${prefix}/generate`, {
            userId: userId
        })
    }

}