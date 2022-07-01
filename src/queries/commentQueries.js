import { gql } from '@apollo/client';


const FETCH_POST_COMMENTS = gql`
  query GetComments($postId: ID!) {
    getComments(postId: $postId) {
      id
      createdAt
      username
      body
    }
  }
`


export { FETCH_POST_COMMENTS };