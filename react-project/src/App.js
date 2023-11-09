import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import Main01 from './pages/Main01.jsx'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Detailpage from './pages/Detailpage.jsx';
import GraphLine from './components/GraphLine.jsx';
import GraphLineOne from './components/GraphLineOne.jsx';
import GraphBar from './components/GraphBar.jsx';
import GraphBarOne from './components/GraphBarOne.jsx';
import GraphLineTwo from './components/GraphLineTwo.jsx'
import GraphLineThree from './components/GraphLineThree.jsx';
import Main02Right from './components/Main02Right.jsx';
import GraphDetailO2Sat from './components/GraphDetailO2Sat.jsx';
import GraphDetailHR from './components/GraphDetailHR.jsx';
import GraphDetailTemp from './components/GraphDetailTemp.jsx';
import GraphDetailSBP from './components/GraphDetailSBP.jsx'
import GraphDetailMAP from './components/GraphDetailMAP.jsx';
import GraphDetailDBP from './components/GraphDetailDBP.jsx';
import GraphDetailResp from './components/GraphDetailResp.jsx';
import DetailLeft from './components/DetailLeft.jsx';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Header /> */}
        {/* <Login /> */}
        <Routes>
          <Route path='/graphline' element={<GraphLine></GraphLine>}></Route>
          <Route path='/graphlineone' element={<GraphLineOne></GraphLineOne>}></Route>
          <Route path='/graphlinetwo' element={<GraphLineTwo></GraphLineTwo>}></Route>
          <Route path='/graphlinethree' element={<GraphLineThree></GraphLineThree>}></Route>
          <Route path='/graphbar' element={<GraphBar></GraphBar>}></Route>
          <Route path='/graphbarone' element={<GraphBarOne></GraphBarOne>}></Route>
          <Route path='/header' element={<Header></Header>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/main1' element={<Main01></Main01>}></Route>
          <Route path='/detailpage' element={<Detailpage></Detailpage>}></Route>
          <Route path='/main2right' element={<Main02Right></Main02Right>}></Route>
          <Route path='/detailhr' element={<GraphDetailHR></GraphDetailHR>}></Route>
          <Route path='/detailo2sat' element={<GraphDetailO2Sat></GraphDetailO2Sat>}></Route>
          <Route path='/detailtemp' element={<GraphDetailTemp></GraphDetailTemp>}></Route>
          <Route path='/detailmap' element={<GraphDetailMAP></GraphDetailMAP>}></Route>
          <Route path='/detailsbp' element={<GraphDetailSBP></GraphDetailSBP>}></Route>
          <Route path='/detaildbp' element={<GraphDetailDBP></GraphDetailDBP>}></Route>
          <Route path='/detailresp' element={<GraphDetailResp></GraphDetailResp>}></Route>
          <Route path='/detailleft' element={<DetailLeft></DetailLeft>}></Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
