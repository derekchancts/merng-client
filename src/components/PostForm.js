import { Button, Form } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

import { useForm } from '../utils/hooks';
import { FETCH_POSTS_QUERY } from '../queries/postQueries'
import { CREATE_POST_MUTATION } from '../mutations/postMutations'


// const CREATE_POST_MUTATION = gql`
//   mutation CreatePost($body: String!) {
//     createPost(body: $body) {
//       id
//       body
//       createdAt
//       username
//       likes {
//         id
//         username
//         createdAt
//       }
//       likeCount
//       comments {
//         username
//         id
//         createdAt
//         body
//       }
//       commentCount
//     }
//   }
// `


const PostForm = () => {

  function createPostCallback() {
    createPost();
  };

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  });


  // const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
  //   variables: values,

  //   // refetchQueries:[{ query: FETCH_POSTS_QUERY }],  // refetch by making a "FETCH_POSTS_QUERY" call 

  //   update(proxy, { data: { createPost } }) {  // destructure to get the post.  proxy = cache
  //     console.log({createPost})

  //     const { getPosts: posts } = proxy.readQuery({ query: FETCH_POSTS_QUERY });  // destructure to get the existing posts
  //     // console.log({posts})
  //     // const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });  
  //     // console.log({data})

  //     proxy.writeQuery({ 
  //       query: FETCH_POSTS_QUERY, 
  //       data: { getPosts: [ createPost, ...posts ] }
  //       // data: { getPosts: [  createPost, ...data.getPosts, ] }
  //     });

  //     values.body = '';
  //   }
  // });


  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,

    update(proxy, result) {
      // let data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      // data.getPosts = [result.data.createPost, ...data.getPosts];

      // let { getPosts } = data;
      let { getPosts } = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      // getPosts = [result.data.createPost, ...data.getPosts];
      getPosts = [result.data.createPost, ...getPosts];
      // console.log({getPosts})

      proxy.writeQuery({ 
        query: FETCH_POSTS_QUERY, 
        data: {
          getPosts
        }
      });

      values.body = '';
    }
  });


  // console.log({error})

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>

        <Form.Field>
          <Form.Input
            placeholder="add post..."
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>

      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
      
    </>
  )
}

export default PostForm