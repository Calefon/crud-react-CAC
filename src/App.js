import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Show from "./components/Show.jsx"

import './App.css';
import Create from './components/Create.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Show/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/edit/:id" element="Edit "/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
