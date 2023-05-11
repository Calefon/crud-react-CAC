import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Show from "./components/Show.jsx"
import Edit from './components/Edit.jsx';
import Create from './components/Create.jsx';
import './App.css';

function App() {
  return (
    <div className="App min-vh-100 w-100 d-flex flex-column justify-content-start align-items-center">     
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><NavBar/><Show/></>}/>
          <Route path="/create" element={<><NavBar/><Create/></>}/>
          <Route path="/edit/:bookId" element={<><NavBar/><Edit/></>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
