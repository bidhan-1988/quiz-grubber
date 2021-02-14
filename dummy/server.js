const { ApolloServer, gql } = require('apollo-server');
const { listQuestion } = require('./schema/resolvers/question');
const { listCategory } = require('./schema/resolvers/category');
const { registerAnswer } = require('./schema/resolvers/answer');
const { postQuestion } = require('./schema/resolvers/postQuestion');
const { saveCategory } = require('./schema/resolvers/saveCategory');
const { getUserCategory } = require('./schema/resolvers/getUserCategory');
const { getUserScoreCard } = require('./schema/resolvers/getUserScoreCard');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    type Answer {
        user_id: String,
        question_id: ID,
        correct_answer: Boolean,
    }

    type Options {
        option1: String,
        option2: String,
        option3: String,
        option4: String,
    }

    type Question {
        question_id: ID,
        question: String,
        category: String,
        correctoption: String,
        options: Options,
    }

    type Category {
        id: String,
        name: String,
    }

    type ScoreCard {
        correct: String,
        incorrect: String,
        posted: String,
        score: String,
        incorrectAnswers: String,
    }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getQuestions(username: String): [Question]
    getCategory(username: String): [Category]
    getUserCategory(username: String): [Category]
    getUserScoreCard(username: String): ScoreCard
  }
  type Mutation {
    saveAnswer( user_id: String, question_id: ID, correct_answer: Boolean): [ID]
    postQuestion(question: String, category: Int, correct_option: String, option_1: String, option_2: String, option_3: String, option_4: String, username: String): [ID]
    saveCategory(user: String, category: String): Boolean
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        getQuestions: (parent, args, context, info) => listQuestion(args),
        getCategory: (parent, args, context, info) => listCategory(args),
        getUserCategory: (parent, args, context, info) => getUserCategory(args),
        getUserScoreCard: (parent,args, context, info) => getUserScoreCard(args),
    },
    Mutation: {
        saveAnswer: (parent, args, context, info) => registerAnswer(args),
        postQuestion: (parent, args, context, info) => postQuestion(args),
        saveCategory: (parent, args, context, info) => saveCategory(args),
    }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
