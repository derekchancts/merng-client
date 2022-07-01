import { gql } from "@apollo/client";


const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      body
      createdAt
      username
      comments {
        id
        createdAt
        username
        body
      }
      likeCount
      likes {
        id
        createdAt
        username
      }
      commentCount
    }
  }
`


const SUBMIT_COMMENT_MUTATION = gql`
  mutation CreateComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
      createdAt
      username
      comments {
        id
        createdAt
        username
        body
      }
      likes {
        id
        createdAt
        username
      }
      likeCount
      commentCount
    }
  }
`


export { DELETE_COMMENT_MUTATION, SUBMIT_COMMENT_MUTATION }