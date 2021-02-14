const QuestionType = new GraphQLObjectType({
  name: 'Question',
  fields: () => ({
     question_id: { type: GraphQLID },
     question: { type: GraphQLString },
     category: { type: GraphQLString },
     correct_option: { type: GraphQLString },
     options: { type: GraphQLList(GraphQLString) },
  })
})