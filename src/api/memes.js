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

    nextMeme(userId, subjectId) {
        return handler.post(`${prefix}/next`, {
            userId: userId,
            subjectId: subjectId
        })
    }

    generateMeme(subjectId, caption) {
        return handler.post(`${prefix}/generate`, {
            subjectId: subjectId,
            caption: caption
        });
    }

    validateGeneratedImage(imageId, decision) {
        return handler.post(`${prefix}/validate`, {
            id: imageId,
            decision: decision
        })
    }

}