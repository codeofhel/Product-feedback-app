import logo from './logo.svg';
import './App.css';
import { Outlet } from "react-router-dom";
import Datacontext from './context/Datacontext';

function App() {
  return (
    <div className="App">
      <Datacontext>
        <Outlet></Outlet>
      </Datacontext>
    </div>
  );
}

export default App;
