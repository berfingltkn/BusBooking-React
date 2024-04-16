import './App.css';
import Navbar from './components/Navbar';
import {Route, Routes} from 'react-router-dom'
import { Home } from './components/Home';
import { TicketPage } from './components/TicketPage';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import BackImage from './assets/background-berfTicket.jpg';
import {FilterCart} from './components/FilterCart';

function App() {
  return (
<div>
    <div className="App" style={{backgroundImage:`url(${BackImage})`}}>
     
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/ticketPage" exact element={<TicketPage />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/contact" exact element={<Contact />} />
        <Route path="/login" exact element={<Login />} />
        
      </Routes>
      
    </div>
    <Footer />
    </div>

  );
}

export default App;
