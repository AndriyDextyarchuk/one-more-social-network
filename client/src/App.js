import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css';

import {AuthRoute} from './utils/AuthRoute.js'
import {AuthProvider} from './context/auth.js'

import { MenuBar } from './components/MenuBar'
import {Home} from './pages/Home'
import {Login} from './pages/Login'
import {Register} from './pages/Register'
import {SinglePost} from './components/SinglePost'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar/>
          <Route exact path='/' component={Home}/>
          <AuthRoute exact path='/login' component={Login}/>
          <AuthRoute exact path='/register' component={Register}/>
          <Route exact path='/posts/:postID' component={SinglePost}/>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
