import { Switch, Route } from "react-router-dom";
import SignInAccount from "./SignInAccount";
import SignUpAccount from "./SignUpAccount";
import ProtectedRoutes from "./ProtectedRoutes";
import Products from './components/Products/Products'
import Profile from './Profile'
import Bio from './Bio'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={SignInAccount} />
      <Route  path="/signup" component={SignUpAccount} />
      <ProtectedRoutes path="/bio" component={Bio} />
      <ProtectedRoutes path="/profile" component={Profile} />
      <ProtectedRoutes path="/products" component={Products} />

    </Switch>
  );
}

export default App;
