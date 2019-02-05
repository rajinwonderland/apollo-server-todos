const { ApolloServer } = require('apollo-server');
const { GraphQLDateTime } = require('@targos/graphql-iso-date');
const { importSchema } = require('graphql-import');
const path = require('path');
const TodosModel = require('./todo');
const Todos = new TodosModel();
// Construct a schema, using GraphQL schema language
const typeDefs = importSchema(path.join(__dirname, './schema.graphql'));

// Provide resolver functions for your schema fields
const resolvers = {
	DateTime: GraphQLDateTime,
	Query: {
		todo: (root, args, context) => Todos.findOne(args.id),
		allTodos: (root, args, context) => Todos.findAll(),
	},
	Mutation: {
		createTodo: (root, args, context) =>
			Todos.create({
				name: args.input.name,
				isComplete: args.input.isComplete,
			}),
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
