import { useState } from "react";
import { Button, Icon, Confirm, Popup } from "semantic-ui-react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from 'react-router-dom'

import { DELETE_POST_MUTATION } from '../mutations/postMutations'
import { FETCH_POSTS_QUERY, FETCH_POST_QUERY, FETCH_POST_COMMENTS1 } from '../queries/postQueries'
import { DELETE_COMMENT_MUTATION } from '../mutations/commentMutations'
import { FETCH_POST_COMMENTS } from '../queries/commentQueries'

import MyPopup from '../utils/MyPopup'



const DeleteButton = ({ postId, commentId, callback }) => {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  // const [deletePost] = useMutation(DELETE_POST_MUTATION, {
  const [deletePostorComment] = useMutation(mutation, {
    variables: { postId, commentId },
    // onCompleted: () => navigate('/'),
    // refetchQueries: [{ query: FETCH_POSTS_QUERY }],
    update(cache) {
      setConfirmOpen(false);

      if (!commentId) {
        let { getPosts } = cache.readQuery({ query: FETCH_POSTS_QUERY });
        getPosts = getPosts.filter(p => p.id !== postId); 
        cache.writeQuery({ 
          query: FETCH_POSTS_QUERY, 
          data: { getPosts }
        })
      };

      
      // if (postId && commentId) {
      //   console.log({postId})
      //   console.log(typeof(postId))

      //   let { getPost } = cache.readQuery({
      //     // query: FETCH_POST_COMMENTS,
      //     query: FETCH_POST_QUERY,
      //     variables: { postId }
      //   })

      //   console.log({getPost})
      //   let { comments } = getPost;
      //   console.log({comments})
        

      //   let filteredComments = comments?.filter(comment => {
      //     console.log("id" , comment.id)
      //     console.log("commentId" , commentId)
      //     return comment.id !== commentId
      //   });
      //   console.log({filteredComments})

      //   cache.writeQuery({
      //     query: FETCH_POST_QUERY,
      //     variables: { postId },
      //     data: { 
      //       getPost: {
      //         ...getPost,
      //         comments
      //       }
      //     }
      //   })
      // };


      if (callback) callback();
    },
    // onCompleted: () => navigate('/'),
  })


  return (
    <>
      {/* <Popup 
        content={commentId ? "Delete comment" : "Delete post"}
        inverted
        trigger={
          <Button
            as="div"
            color="red"
            floated="right"
            // onClick={() => deletePost()}
            onClick={() => setConfirmOpen(true)}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        }
      /> */}

      <MyPopup content={commentId ? "Delete comment" : "Delete post"}>
        <Button
          as="div"
          color="red"
          floated="right"
          // onClick={() => deletePost()}
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
        

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        // onConfirm={deletePost}
        onConfirm={deletePostorComment}
      />
    </>
  );
};

export default DeleteButton;
