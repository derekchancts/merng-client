import { gql } from "@apollo/client";


const CREATE_POST_MUTATION = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        username
        id
        createdAt
        body
      }
      commentCount
    }
  }
`


const LIKE_POST_MUTATION = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
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


const DELETE_POST_MUTATION = gql`
  mutation Mutation($postId: ID!) {
    deletePost(postId: $postId)
}
`


export { CREATE_POST_MUTATION, LIKE_POST_MUTATION, DELETE_POST_MUTATION }