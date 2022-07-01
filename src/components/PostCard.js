import { useContext } from 'react';
import { Button, Card, Icon, Label, Image, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/authContext';
import DeleteButton from './DeleteButton';
import LikeButton from './LikeButton';


const PostCard = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes }}) => {
  const { user } = useContext(AuthContext);

  function likePost() {
    console.log('like post')
  }

  // function commentOnPost() {
  //   console.log('Comment on post')
  // }

  return (
  // <div className="ui cards">
  //   <div className="card">

  //     <div className="content">
  //       <img className="right floated mini ui image" src="/images/avatar/large/elliot.jpg" />
  //       <div className="header">
  //         Elliot Fu
  //       </div>
  //       <div className="meta">
  //         Friends of Veronika
  //       </div>
  //       <div className="description">
  //         Elliot requested permission to view your contact details
  //       </div>
  //     </div>

  //     <div className="extra content">
  //       <div className="ui two buttons">
  //         <div className="ui basic green button">Approve</div>
  //         <div className="ui basic red button">Decline</div>
  //       </div>
  //     </div>

  //   </div>
  // </div>

    <Card fluid>

      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {/* {moment(createdAt).fromNow(true) + " ago"} */}
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        {/* <Button as='div' labelPosition='right' onClick={likePost}>
          <Button color='teal' basic>
            <Icon name='heart' />
          </Button>
          <Label basic color='teal' pointing='left'>
            {likeCount}
          </Label>
        </Button> */}

        <LikeButton user={user} post={{ id, likes, likeCount }} />

        <Popup 
          content="Comment on post"
          inverted
          trigger={
            <Button as={Link} labelPosition='right' to={`/posts/${id}`}>
              <Button color='blue' basic>
                <Icon name='comments' />
              </Button>
              <Label basic color='blue' pointing='left'>
                {commentCount}
              </Label>
            </Button>
          }/>
        
        {/* {user && user.username === username && <DeleteButton postId={id} />} */}

        {user && user.username === username && (
          // <Button as="div" color="red" floated='right' onClick={() => console.log("Delete post")}>
          //   <Icon name="trash" style={{ margin: 0 }} />
          // </Button>
          <DeleteButton postId={id} />
        )}

      </Card.Content>

    </Card>

  )
}

export default PostCard