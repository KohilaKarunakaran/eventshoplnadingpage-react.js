import './App.css';
import Home from './Components/Home';
import About from './Components/About';
import Events from './Components/Events';
import Contact from './Components/Contact';
import { Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </div>
  );
}

export default App;
