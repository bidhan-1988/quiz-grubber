var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
const db = require('./dbPool.js');

const categoryInputType = new GraphQLObjectType({
    name: 'Category',
    fields: {
        user_id: { type: GraphQLString },
        category_id: { type: GraphQLString },
    }
})
exports.addCategory = {
    type: categoryInputType,
    args: { user: { type: GraphQLString }, category: { type: GraphQLString } },
    resolve: (value, args) => {
        let inputData = '';
        let idList = args.category.split(',');
        for (let i = 0; i < idList.length; i++) {
            if (i === idList.length - 1)
                inputData = inputData + `('${args.user}', '${idList[i]}')`;
            else
                inputData = inputData + `('${args.user}', '${idList[i]}'),`;
        }
        const insertQuery = 'INSERT INTO user_category_table(username, category_id) VALUES ' + inputData;
        return db.conn.none(insertQuery)
            .then(data => {
                return data;
            }).catch(ex => {
                return ex;
            });
    },
};