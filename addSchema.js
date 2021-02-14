var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
const GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLNumeric = require('graphql').GraphQLInt;
const db = require('./dbPool.js');

const QuestionType = new GraphQLObjectType({
    name: 'QuestionType',
    fields: {
        question: { type: GraphQLString },
        question_id: { type: GraphQLID },
        category: { type: GraphQLNumeric },
        option_1: { type: GraphQLString },
        option_2: { type: GraphQLString },
        option_3: { type: GraphQLString },
        option_4: { type: GraphQLString },
        correct_option: { type: GraphQLString },
        username: { type: GraphQLString }
    }
})
exports.addQuestion = {
    type: QuestionType,
    /* define the arguments that we should pass to the mutation
       here we require both book name and the author name 
       the id will be generated automatically 
    */
    args: {
        question: { type: GraphQLString },
        //   question_id: { type: GraphQLID },
        category: { type: GraphQLNumeric },
        option_1: { type: GraphQLString },
        option_2: { type: GraphQLString },
        option_3: { type: GraphQLString },
        option_4: { type: GraphQLString },
        correct_option: { type: GraphQLString },
        username: { type: GraphQLString }

    },
    resolve: (value, args) => {
        const options = [args.option_1, args.option_2, args.option_3, args.option_4];
        options.sort(() => Math.random() - 0.5);
        const insertQuery = `INSERT INTO question_bank(question, category, option_1, option_2, option_3, 
                option_4, correct_option, user_id) VALUES ('${args.question}', '${args.category}','${options[0]}', '${options[1]}',
                '${options[2]}', '${options[3]}','${args.correct_option}','${args.username}');`
        console.log(" query  :  ", insertQuery);
        return db.conn.query(insertQuery).then(data => {
            return data;
        }).catch(ex => {
            return ex;
        });
    }
}