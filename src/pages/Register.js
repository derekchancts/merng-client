import { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom'

import { useForm } from '../utils/hooks';
import { AuthContext } from '../context/authContext';
// const { REGISTER_USER } = '../mutations/usersMutations.js'


// const REGISTER_USER = gql`
//   mutation Register($registerInput: RegisterInput) {
//     register(registerInput: $registerInput) {
//       id
//       email
//       username
//       createdAt
//       token
//     }
//   }
// `

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;


const Register = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  // const [values, setValues] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: ''
  // });


  // const [errors, setErrors] = useState([]);
  const [errors, setErrors] = useState({});


  // Javascript hoist - this will be read first
  function registerUser() {
    registerUser1();
  }

  // this will "Not" be hoisted
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })


  // const onChange = e => {
  //   setValues({
  //     ...values,
  //     [e.target.name]: e.target.value 
  //   })
  // };


  // const onSubmit = e => {
  //   e.preventDefault();
  //   registerUser1()
  // };


  const [ registerUser1, { data, loading, error } ] = useMutation(REGISTER_USER, {
    // variables: { username, email, password }
    // variables: { registerInput: values },
    variables: values,
    // update(proxy, result) {
    update(proxy, { data: { register: userData }}) {   // update is triggered if the mutation is successfully executed. "userData" is alias
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


  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Something Went Wrong</p>;  

  // if (errors) {
  //   errors.map((error, index) => (
  //     <p key={index}>{error.message}</p>
  //   ))
  // } 


  // if(Object.keys(errors).length > 0) console.log(errors)

  // if(data) console.log({data})


  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
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
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
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
        <Form.Input 
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
          autoComplete="off"
        />
        <Button type="submit" primary>
          Register
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

export default Register