
import LogoTicket from '../assets/logo-ticket.png';
import LogoLogin from '../assets/login_14018816.png';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { React, useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Dropdown } from 'react-bootstrap';

export function Navbar() {
    const [isTabOpen, setIsTabOpen] = useState(false);

    const handleManageHistoryClick = () => {
        setIsTabOpen(!isTabOpen);
    };
    return (
        <div className='navbar'>
            <div className='main'>
                <div className='leftSide'>
                    <img src={LogoTicket} alt='' />
                    <span className='brand'>BerfTicket</span>

                </div>

                <div className='mainLink'>
                    <div className='displayDüzen'>
                        <Link to="/" className='linkWithIcon'>
                            <HomeIcon className='homeIcon' />
                            <span className='linkText'> Home</span>
                        </Link>
                    </div>

                    <div className='displayDüzen'>
                        <Link to="/ticketPage" className='linkWithIcon'>
                            <DirectionsBusIcon className='ticketIcon' />

                            <span className='linkText'>  Ticket</span>
                        </Link>
                    </div>

                    <div className='displayDüzen'>
                        <Link to="/about" className='linkWithIcon'>
                            <SentimentSatisfiedAltIcon className='aboutIcon' />

                            <span className='linkText'>  About Us</span>
                        </Link>
                    </div>

                    <div className='displayDüzen'>
                        <Link to="/contact" className='linkWithIcon'>
                            <MailOutlineIcon className='contactIcon' />

                            <span className='linkText'>  Contact</span>
                        </Link>
                    </div>

                </div>

                <div className="rightSide">
                    <Dropdown>
                        <Dropdown.Toggle variant="success"  style={{backgroundColor:"#e49537", border:"2px solid #dd8626",width:"80px"}} className='dropdownSetting'>
                            <ManageHistoryIcon style={{backgroundColor:"#e49537"}}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#" style={{color:"white"}} >
                            <Link to="/historyTickets" style={{textDecoration:"none",color:"white"}}>
                            Inquire about travel
                            </Link>
                            
                            </Dropdown.Item>
                            
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>

    );

}
export default Navbar