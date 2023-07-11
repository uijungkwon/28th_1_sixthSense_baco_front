import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Mypage from "./Routes/Mypage";
import Header from "./Routes/Header";
import Road from "./Routes/Road";
import Enroll from "./Routes/Enroll";
import Login from "./Routes/Login";
import Update from "./Routes/Update";
function App(){
  return (
    <Router>
      <Header />
      <Switch>
        <Route path = "/Road"><Road/></Route>
        <Route path = "/Mypage"><Mypage /></Route>
        <Route path = "/Enroll"><Enroll/></Route>
        <Route path = "/Login"><Login /></Route>
        <Route path="/"><Home/></Route>
        
      </Switch>
    </Router>
  );
}
export default App;