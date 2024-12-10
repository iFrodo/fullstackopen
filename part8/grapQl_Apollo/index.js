const {ApolloServer} = require('@apollo/server');
const {makeExecutableSchema} = require('@graphql-tools/schema'); // Import makeExecutableSchema
const {graphqlHTTP} = require('express-graphql');
const express = require('express');
const {v1: uuid} = require('uuid');
const cors = require('cors');
const {GraphQLError} = require('graphql')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
mongoose.set('strictQuery', false)
const Person = require('./Schemas/schema')
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI).then(() => {
    console.log('mongodb connected')
}).catch((error) => {
    console.error('error connection to mongodb', error.message)
})

let persons = [
    {
        name: "Arto Hellas",
        phone: "040-123543",
        street: "Tapiolankatu 5 A",
        city: "Espoo",
        id: "3d594650-3436-11e9-bc57-8b80ba54c431"
    },
    {
        name: "Matti Luukkainen",
        phone: "040-432342",
        street: "Malminkaari 10 A",
        city: "Helsinki",
        id: '3d599470-3436-11e9-bc57-8b80ba54c431'
    },
    {name: "Venla Ruuska", street: "Nallemäentie 22 C", city: "Helsinki", id: '3d599471-3436-11e9-bc57-8b80ba54c431'},
];
//схемы
const typeDefs = `
type User {
  username: String!
  friends: [Person!]!
  id: ID!
}

type Token {
  value: String!
}

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address
    id: ID!
  }
enum YesNo {
  YES
  NO
}
  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
     me: User
  }

  type Mutation {
  
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    
     editNumber(
    name: String!
    phone: String!
  ): Person
  
  deletePerson(
  id:String!):Person
  
    
   createUser(
    username: String!
  ): User
  
  login(
    username: String!
    password: String!
  ): Token
  }

  
`;

const resolvers = {

    //резолверы запросов
    Query: {
        personCount: () => async () => Person.collection.countDocuments(),
        allPersons: async (root, args) => {
            if(!args.phone){
            return Person.find({})
                }
            return Person.find({ phone: { $exists: args.phone === 'YES' } })

        },
        findPerson: (root, args) => Person.findOne({name: args.name}),
    },
    //резолверы схем
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.street
            }
        }
    },
    //резолверы мутаций(добавлений)
    Mutation: {
        createUser: async (root, args) => {
            const user = new User({ username: args.username })

            return user.save()
                .catch(error => {
                    throw new GraphQLError('Creating the user failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.username,
                            error
                        }
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if ( !user || args.password !== 'secret' ) {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
        addPerson: async (root, args) => {
            const person = new Person({...args})
            try {
                return person.save()
            }catch (error) {
                throw new GraphQLError('Saving person failed',{
                    extensions:{
                        code:'BAD_USER_INPUT',
                        invalidArgs:args.name,
                        error
                    }
                })
            }
        },
        editNumber: async (root, args) => {
            const person = await Person.findOne({name: args.name})
            person.phone = args.phone;
            try {
                return person.save()
            }catch (error) {
                throw new GraphQLError('Saving number failed',{
                    extensions:{
                        code:'BAD_USER_INPUT',
                        invalidArgs:args.name,
                        error
                    }
                })
            }
        },
        deletePerson: async (root,args) => {
            console.log(args.id)
            try{
                const person = await Person.findByIdAndDelete(args.id)
                return person
            }catch (error){
                throw new GraphQLError('Deleting was failed',{extensions:{
                    error
                    }})
            }

        }
    }
};

// Create executable schema
const schema = makeExecutableSchema({typeDefs, resolvers});

const app = express();

// Apply CORS middleware
app.use(cors({
    origin: '*',
    credentials: true,
}));

// Use graphqlHTTP middleware
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET
            )
            const currentUser = await User
                .findById(decodedToken.id).populate('friends')
            return { currentUser }
        }
    },
}));

// Start the server
app.listen(4000, () => {
    console.log('Server ready at http://localhost:4000/graphql');
});
