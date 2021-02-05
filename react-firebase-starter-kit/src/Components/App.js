import SignUp from './SignUp'
import LogIn from './LogIn'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import Dashboard from './Dashboard'
import DataBase from './DataBase'
import PrivateRoute from './PrivateRoute'
import classes from './App.module.css';
import { useCurrentUser } from '../customHooks/hooks'
import { BrowserRouter as Router, Switch} from 'react-router-dom'

function App() {

  const currentUser = useCurrentUser()

  return (
    <div className={classes.Layout}>
      <div style={{width: '90%', maxWidth: '400px'}}>
          <Router>
              <Switch>
                <PrivateRoute redirectIf={!currentUser.auth} redirectTo='/login' exact path= '/' component={Dashboard}/>
                <PrivateRoute redirectIf={!currentUser.auth} redirectTo='/login' exact path= '/update-profile' component={UpdateProfile}/>
                <PrivateRoute redirectIf={currentUser.auth} redirectTo='/' path="/signup" component={SignUp} />
                <PrivateRoute redirectIf={currentUser.auth} redirectTo='/' path="/login" component={LogIn} />
                <PrivateRoute redirectIf={currentUser.auth} redirectTo='/' path="/forgot-password" component={ForgotPassword} />
                <PrivateRoute redirectIf={false} redirectTo='/' path="/data-base" component={DataBase} />
              </Switch>
          </Router>
        </div>
    </div>
  )
}

export default App;
