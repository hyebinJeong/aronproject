import "./App.css";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Main01 from "./pages/Main01";

function App() {
  return (
    <div>
      <div className='space'>
        <NavBar></NavBar>
      </div>
      <hr />
      <div className='space'>
        <Main01></Main01>
      </div>
    </div>
  );
}

export default App;
