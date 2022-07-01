import { gql } from '@apollo/client';


const FETCH_POSTS_QUERY = gql`
  query FetchPosts {
    getPosts {
      id
      body
      createdAt
      username
      comments {
        id
        username
        createdAt
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


const FETCH_POST_QUERY = gql`
  query GetPost($postId: ID!) {
    getPost(postId: $postId) {
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


const FETCH_POST_COMMENTS1 = gql`
  query GetComments($postId: ID!) {
    getComments(postId: $postId) {
      id
      createdAt
      username
      body
    }
  }
`


export { FETCH_POSTS_QUERY, FETCH_POST_QUERY, FETCH_POST_COMMENTS1 };