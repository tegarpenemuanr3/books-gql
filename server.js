const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const app = express();

const schema = buildSchema(`
    type Todo {
        id: ID!
        title: String!,
        description: String!,
        author: String!,
        finish: Boolean!
    }

    input TodoInputData {
        id: ID!
        title: String!,
        description: String!,
        author: String!,
        finish: Boolean!
    }

    type RootQuery {
        todo: Todo!
    }

    type RootMutation {
        addTodo(todoInput: TodoInputData!): Todo!
    }

    schema {
        query: RootQuery,
        mutation: RootMutation
    }
`);

const resolver = {
  todo: () => {
    const todoData = {
      id: "T001",
      title: "Belajar Android Native Kotlin",
      description: "Belajar MVVM, Coroutine, ROOMDB",
      author: "Tegar Penemuan",
      finish: false,
    };
    return todoData;
  },

  // resolver untuk addBook
  addTodo: ({ todoInput }) => {
    // mengambil input dari bookInput
    const createdBook = {
      id: todoInput.id,
      title: todoInput.title,
      description: todoInput.description,
      author: todoInput.author,
      finish: todoInput.finish,
    };
    // mengembalikan data buku yang telah diinput
    return createdBook;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  })
);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000/graphql");
});
