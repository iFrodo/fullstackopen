import {gql} from "@apollo/client";


const CREATE_PERSON = gql`
    mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
        addPerson(
            name: $name,
            street: $street,
            city: $city,
            phone: $phone
        ) {
            name
            phone
            id
            address {
                street
                city
            }
        }
    }
`
 const DELETE_PERSON = gql`
mutation deletePerson($id:String!){
    deletePerson(id:$id){
        name
    }
}`
const FIND_PERSON = gql`
    query findPersonByName($nameToSearch: String!) {
        findPerson(name: $nameToSearch) {
            name
            phone
            id
            address {
                street
                city
            }
        }
    }
`
const ALL_PERSONS = gql`
    query {
        allPersons {
            name
            phone
            id
        }
    }
`
const EDIT_NUMBER = gql`
    mutation editNumber($name: String!, $phone: String!) {
        editNumber(name: $name, phone: $phone) {
            name
            phone
            address {
                street
                city
            }
            id
        }
    }
`
export {CREATE_PERSON,FIND_PERSON,ALL_PERSONS,EDIT_NUMBER,DELETE_PERSON}