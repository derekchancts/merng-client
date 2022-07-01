import { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom'

import { useForm } from '../utils/hooks';
import { AuthContext } from '../context/authContext';


const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`


const Login = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});


  function loginUser() {
    loginUser1()
  };


  const { onChange, onSubmit, values } = useForm(loginUser, {
    username: '',
    password: ''
  });


  const [ loginUser1, { data, loading, error } ] = useMutation(LOGIN_USER, {
    variables: values,
    // update(proxy, result) {  
                                                    // destructure to get the post.  proxy = cache
    update(proxy, { data: { login: userData }}) {   // update is triggered if the mutation is successfully executed. "userData" is alias
      // console.log({userData})
      context.login(userData); 
      navigate('/') 
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors[0].extensions.errors)
    },
    // onError(err) {
    //   console.log({err})
    //   setErrors(err.graphQLErrors[0].extensions.errors);
    // },
  });


  // if(Object.keys(errors).length > 0) console.log(errors)

  // if(data) console.log({data})


  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input 
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
          autoComplete="off"
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>

      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  )
}

export default Login