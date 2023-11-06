import "./App.css";
import Login from "./components/Login";
import Header from "./components/Header";
import Main01 from "./pages/Main01";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./components/Table";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      {/* <Login /> */}
      <Routes>
        {/* <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/header' element={<Header></Header>}></Route> */}
        <Route path='/main' element={<Table />}></Route>
        <Route path='/main01' element={<Main01 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
