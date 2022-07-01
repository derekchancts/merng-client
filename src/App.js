import { Routes, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css';

// import AuthRoute from './utils/AuthRoute';
import ProtectedRoute from './utils/AuthRoute'

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';


function App() {
  return (
    <>
      <Container>
      {/* <div className='ui container'> */}
        <MenuBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={ <ProtectedRoute><Login /></ProtectedRoute> } />
          <Route path="/register" element={ <ProtectedRoute><Register /></ProtectedRoute>  } />
          <Route path="/posts/:postId" element={<SinglePost />} />
        </Routes>
      {/* </div> */}
      </Container>
    </>
  );
}

export default App;
