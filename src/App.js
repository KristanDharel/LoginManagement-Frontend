import logo from "./logo.svg";
import "./App.css";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Myroute from "./component/Myroute";
import Mynavlink from "./component/Mynavlink";

function App() {
  return (
    <div>
      <Mynavlink></Mynavlink>
      <Myroute></Myroute>

      {/* <Login></Login> */}
      {/* <Signup></Signup> */}
    </div>
  );
}

export default App;
