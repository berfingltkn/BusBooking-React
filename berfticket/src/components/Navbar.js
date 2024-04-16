import React from 'react';
import LogoTicket from '../assets/logo-ticket.png';
import LogoLogin from '../assets/login_14018816.png';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export function Navbar() {
    return (
        <div className='navbar'>
            <div className='main'>
                <div className='leftSide'>
                    <img src={LogoTicket} alt='' />
                    <span className='brand'>BerfTicket</span>

                </div>

                <div className='mainLink'>
                    <div>
                    <Link to="/" className='linkWithIcon'>
                       <HomeIcon className='homeIcon' />
                       <span className='linkText'> Home</span> 
                    </Link>
                    </div>
                   
                    <div>
                    <Link to="/ticketPage" className='linkWithIcon'>
                        <DirectionsBusIcon className='ticketIcon' />
                        
                       <span className='linkText'>  Ticket</span>
                       </Link>
                    </div>
                    
                    <div>
                    <Link to="/about" className='linkWithIcon'>
                   <SentimentSatisfiedAltIcon className='aboutIcon'/>
                   
                       <span className='linkText'>  About Us</span>
                        </Link>
                    </div>
                    
                    <div>
                    <Link to="/contact" className='linkWithIcon'>
                        <MailOutlineIcon className='contactIcon'/>
                        
                       <span className='linkText'>  Contact</span>
                        </Link>
                    </div>
                    
                </div>
                
                <div className='rightSide'>
                    <a href="/login" className='logoButton'>
                        <img src={LogoLogin} alt='' />
                    </a>


                </div>

            </div>
        </div>

    );

}
export default Navbar