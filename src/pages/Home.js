import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../queries/postQueries'
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/authContext';
import PostForm from '../components/PostForm';

// const FETCH_POSTS_QUERY = gql`
//   query FetchPosts {
//   getPosts {
//     id
//     body
//   }
// }
// `

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something Went Wrong</p>;

  // console.log({data})
  const { getPosts: posts } = data;
  // console.log({posts})

  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
      </Grid.Row>
      
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )} 

        <Transition.Group duration={2000}>
          {posts?.map(post => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  )
}

export default Home