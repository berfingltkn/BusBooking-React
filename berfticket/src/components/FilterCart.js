import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import '../styles/FilterCart.css';
import cartBus from '../assets/cartBus.jpg';
import direksiyon5 from '../assets/direksiyon5.jpg';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PushPinIcon from '@mui/icons-material/PushPin';

export function FilterCart({ trip }) {
    const [nameOfFrom, setNameFrom] = useState("");
    const [nameOfTo, setNameTo] = useState("");

    const { from, to } = useSelector((state) => {

        return {
            from: state.ticket.from,
            to: state.ticket.to,

        };
    });
    const {
        arrivalCityID,
        arrivalTime,
        busID,
        departureCityID,
        departureDate,
        departureTime,
        price,
        tripID
    } = trip;

    const fetchData = async () => {
        try {
            const responseFromName = await axios.get(`https://localhost:7224/api/cities/GetCityById?id=${from}`);
            setNameFrom(responseFromName.data.data.cityName)
            const responseToName = await axios.get(`https://localhost:7224/api/cities/GetCityById?id=${to}`);
            setNameTo(responseToName.data.data.cityName);
        }
        catch (error) {
            console.error('Error fetching data', error);
        }

    };

    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const handleButtonClick = () => {
        setIsDetailVisible(!isDetailVisible);
    };

    const numberOfRows = 6;
    const numberOfColumns = 2;

    const renderSeatButton = () => {
        const seatButtons = [];
        let seatNumber = 1;

        for (let row = 1; row <= numberOfRows; row++) {
            const rowButtons = [];
            for (let column = 1; column <= numberOfColumns; column++) {
                rowButtons.push(
                    <button key={seatNumber} className="seat-button">
                        {seatNumber}
                    </button>
                );
                seatNumber++;
            }
            seatButtons.push(
                <div key={row} className="seat-row">
                    {rowButtons}
                </div>
            );
        }

        return <div className="seat-container">{seatButtons}</div>;
    };
    useEffect(() => {
        fetchData();
      }, [from,to]);
    return (
        <div className='ana'>
            <div className='Main'>
                <ul id="list" className='list'>
                    <li className='listCart'>

                        <div className='infoTrip'>
                            <div className='image'>
                                <img src={cartBus} alt='' className='imageBus' />
                            </div>
                            <div className='time'>
                                <div className='timeMain'>
                                    <DepartureBoardIcon />
                                    <div className='textTime'>{departureTime}</div>
                                </div>
                            </div>
                            <div className='from'>
                                <div className='fromMain'>
                                    <PushPinIcon />
                                    <div className='textFrom'>{nameOfFrom}</div>
                                </div>
                            </div>
                            <div className='to'>
                                <div className='toMain'>
                                    <LocationOnIcon />
                                    <div className='textTo'>{nameOfTo}</div>
                                </div>
                            </div>
                            <div className='price'>
                                <div className='priceMain'>
                                    <AttachMoneyIcon />
                                    <div className='textPrice'>{price}</div>
                                </div>
                            </div>
                            <div className='buttonDiv'>
                                <button className='DetailsButton' onClick={handleButtonClick}>Details</button>
                            </div>
                        </div>

                        {isDetailVisible && (
                            <>
                                <div className='line'></div>

                                <div className='detailTrip'>
                                    <div className='seats'>
                                        <img src={direksiyon5} alt='' className='direksiyon' />
                                        <div className='seat-button-container'>
                                            {renderSeatButton()}
                                        </div>
                                    </div>

                                    <div className='Continue'>
                                        <div className='seatSelectedNumber'>
                                            <h3>Selected Seat: </h3>
                                            <div className='selectedSeatTEXT'>3.</div>
                                        </div>

                                    </div>
                                    <div className='Buy'>
                                        <button className='buttonBuy'>
                                            Buy Ticket
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default FilterCart