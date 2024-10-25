const {ApolloServer} = require('@apollo/server');
const {makeExecutableSchema} = require('@graphql-tools/schema'); // Import makeExecutableSchema
const {graphqlHTTP} = require('express-graphql');
const express = require('express');
const {v1: uuid} = require('uuid');
const cors = require('cors');
const { GraphQLError } = require('graphql')
let authors = [{
    name: 'Robert Martin', id: "afa51ab0-344d-11e9-a414-719c6709cf3e", born: 1952,
}, {
    name: 'Martin Fowler', id: "afa5b6f0-344d-11e9-a414-719c6709cf3e", born: 1963
}, {
    name: 'Fyodor Dostoevsky', id: "afa5b6f1-344d-11e9-a414-719c6709cf3e", born: 1821
}, {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
}, {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
},]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

let books = [{
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
}, {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
}, {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
}, {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
}, {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
}, {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
}, {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
},]

/*
  you can remove the placeholder query once your first one has been implemented
*/

const typeDefs = `

type Author {
    name:String!
    id:ID!
    born:Int
}

type Book {
    title:String!
    published:Int!
    author:String!
    id:ID!
    genres:[String!]!
}
type Query {
    showBooksCount:Int!
    showAuthorsCount:Int!
    showAuthors:[Author!]!
    showBooks(author:String,genre:String):[Book!]!
}
type Mutation{
addBook(
  title:String!
  published:Int!
  author:String!
  genres:[String!]!
):Book
editAuthorBorn(
name:String!
born:Int!
):Author
}
`

const resolvers = {
    Query: {
        showBooksCount: (root) => {
            return books.length
        },
        showAuthorsCount: (root) => {
            return authors.length
        },
        showAuthors: (root) => {
            return authors
        },
        showBooks: (root, args) => {
            if (args.author) {
                return books.filter(book => book.author === args.author)
            }
            else if(args.genre){
                return books.filter(book=>book.genres.includes(args.genre))
            }
            return books
        }
    },
    Mutation: {
        addBook:(root,args)=>{
            if (books.find(book => book.title === args.title)) {
                throw new GraphQLError('Name must be unique', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title
                    }
                })
            }
            const existingAuthor = authors.find(author=>author.name === args.author)
            if(!existingAuthor){
                const author = {name:args.author,id:uuid(),born:null}
                authors.push(author)
            }
            const book = {...args,id:uuid()}
            books.push(book)
            return book
        },
        editAuthorBorn:(root,args)=>{
            const authorToEdit = authors.find(author=>author.name === args.name)
            if(!authorToEdit){
                return null
            }
            const editedAuthor = {...authorToEdit,born:args.born}
            authors = authors.map(author=> author.name === args.name ? editedAuthor:author)
            return editedAuthor
        }
    }
}

const server = new ApolloServer({
    typeDefs, resolvers,
})
const schema = makeExecutableSchema({typeDefs, resolvers});


const app = express();

// Apply CORS middleware
app.use(cors({
    origin: '*', credentials: true,
}));

// Use graphqlHTTP middleware
app.use('/graphql', graphqlHTTP({
    schema, graphiql: true,
}));

// Start the server
app.listen(4000, () => {
    console.log('Server ready at http://localhost:4000/graphql');
});
