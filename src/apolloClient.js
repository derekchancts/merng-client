import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'



const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getPosts: {
          merge(existing, incoming) {
            return incoming;
            // return { ...existing, ...incoming };
          },
        },
        getPost: {
          merge(existing, incoming) {
            return incoming;
            // return { ...existing, ...incoming };
          },

          // merge: true,
          
          // merge(existing, incoming, { mergeObjects }) {
          //   return mergeObjects(existing, incoming);
          // },
        },
        getComments: {
          merge(existing, incoming) {
            return incoming;
          },
        }

      },
    },
  },
});




const httpLink = createHttpLink({
  uri: "http://localhost:5000/"
});


// const authLink = setContext( (_, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//       authorization: localStorage.getItem("jwtToken") || ""
//     }
//   }
// });

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  
  return {
    headers: {
      // Authorization: token ? `Bearer ${token}` : ''
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // cache: new InMemoryCache()
  cache
});


export default client;