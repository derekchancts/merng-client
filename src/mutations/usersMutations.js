import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation Register($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
      id
      email
      username
      createdAt
      token
    }
  }
`

// const REGISTER_USER = gql`
//   mutation Register(
//     $username: String!
//     $email: String!
//     $password: String!
//     $confirmPassword: String!
//   ) {
//     register(
//       registerInput: {
//         username: $username
//         email: $email
//         password: $password
//         confirmPassword: $confirmPassword
//       }
//     ) {
//       id
//       email
//       username
//       createdAt
//       token
//     }
//   }
// `;

export { REGISTER_USER };
