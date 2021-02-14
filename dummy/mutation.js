var addSchema = require('./addSchema.js').addQuestion
var saveAnswer = require('./saveAnswer.js').saveUserAnswer
var postQuestion = require('./postQuestion.js').postQuestion
var addCategory = require('./saveCategory.js').addCategory
module.exports = {
    addSchema,
    saveAnswer,
    postQuestion,
    addCategory
}