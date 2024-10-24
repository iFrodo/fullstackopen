const { ApolloServer } = require('@apollo/server');
const { makeExecutableSchema } = require('@graphql-tools/schema'); // Import makeExecutableSchema
const { graphqlHTTP } = require('express-graphql');
const express = require('express');
const { v1: uuid } = require('uuid');
const cors = require('cors');
const { GraphQLError } = require('graphql')

let persons = [
    { name: "Arto Hellas", phone: "040-123543", street: "Tapiolankatu 5 A", city: "Espoo", id: "3d594650-3436-11e9-bc57-8b80ba54c431" },
    { name: "Matti Luukkainen", phone: "040-432342", street: "Malminkaari 10 A", city: "Helsinki", id: '3d599470-3436-11e9-bc57-8b80ba54c431' },
    { name: "Venla Ruuska", street: "Nallemäentie 22 C", city: "Helsinki", id: '3d599471-3436-11e9-bc57-8b80ba54c431' },
];
//схемы
const typeDefs = `
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
  }
`;

const resolvers = {

    //резолверы запросов
    Query: {
        personCount: () => persons.length,
        allPersons: (root, args) => {
            if (!args.phone) {
                return persons
            }
            const byPhone = (person) =>
                args.phone === 'YES' ? person.phone : !person.phone
            return persons.filter(byPhone)
        },
        findPerson: (root, args) => persons.find(p => p.name === args.name),
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
        addPerson: (root, args) => {
            if (persons.find(p => p.name === args.name)) {
                throw new GraphQLError('Name must be unique', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name
                    }
                })
            }
            const person = { ...args, id: uuid() };
            persons = persons.concat(person);
            return person;
        },
        editNumber: (root, args) => {
            const person = persons.find(p => p.name === args.name)
            if (!person) {
                return null
            }

            const updatedPerson = { ...person, phone: args.phone }
            persons = persons.map(p => p.name === args.name ? updatedPerson : p)
            return updatedPerson
        }
    }
};

// Create executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

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
}));

// Start the server
app.listen(4000, () => {
    console.log('Server ready at http://localhost:4000/graphql');
});
