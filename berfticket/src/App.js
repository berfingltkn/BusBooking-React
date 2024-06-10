import './App.css';
import Navbar from './components/Navbar';
import {Route, Routes} from 'react-router-dom'
import { Home } from './components/Home';
import { TicketPage } from './components/TicketPage';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { HistoryTickets } from './components/HistoryTickets';
import BackImage from './assets/background-berfTicket.jpg';
import {FilterCart} from './components/FilterCart';
import {Payment} from './components/Payment';

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
        <Route path="/historyTickets" exact element={<HistoryTickets />} />
        <Route path="/payment" exact element={<Payment />} />
      </Routes>
      
    </div>
    <Footer />
    </div>

  );
}

export default App;
