import SignUp from './SignUp'
import LogIn from './LogIn'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import Dashboard from './Dashboard'
import PrivateRoute from './PrivateRoute'
import classes from './App.module.css';
import { useAuth } from '../Context/AuthContext'
import { BrowserRouter as Router, Switch} from 'react-router-dom'

function App() {

  const { currentUser } = useAuth()

  return (
    <div className={classes.Layout}>
      <div className= {classes.Container}>
        <Router>
            <Switch>
              <PrivateRoute redirectIf={!currentUser} redirectTo='/login' exact path= '/' component={Dashboard}/>
              <PrivateRoute redirectIf={!currentUser} redirectTo='/login' exact path= '/update-profile' component={UpdateProfile}/>
              <PrivateRoute redirectIf={currentUser} redirectTo='/' path="/signup" component={SignUp} />
              <PrivateRoute redirectIf={currentUser} redirectTo='/' path="/login" component={LogIn} />
              <PrivateRoute redirectIf={currentUser} redirectTo='/' path="/forgot-password" component={ForgotPassword} />
            </Switch>
        </Router>
      </div>
    </div>
  )
}

export default App;
