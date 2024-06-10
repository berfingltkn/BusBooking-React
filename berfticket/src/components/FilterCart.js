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
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Grid from '@mui/material/Grid';
import { Height, RunCircle } from '@mui/icons-material';

export function FilterCart({ trip }) {
    const [nameOfFrom, setNameFrom] = useState("");
    const [nameOfTo, setNameTo] = useState("");
    const [selectedSeat, setSelectedSeat] = useState();
    const [seats, setSeats] = useState([]);

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
    const navigate = useNavigate();
    const getBuyPage = () => {
        navigate("/payment");

    }

    const fetchTicketData = async () => {

        try {
            console.log(tripID);
            const response = await axios.get(`https://localhost:7224/api/tickets/getticketbytripid?tripId=${tripID}`);
            console.log(response.data.data);

            if (response.data.success) {
                const seatIDs = response.data.data.map(ticket => ticket.seatID);
                setSeats(seatIDs);
                console.log("-***--**-*-**--->", seatIDs);
            } else {
                setSeats([]);
            }
        } catch (error) {
            console.error('Veri alınırken hata oluştu', error);
            setSeats([]);
        }
    };


    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const handleButtonClick = async () => {
        setIsDetailVisible(!isDetailVisible);
        fetchTicketData();


    };

    const numberOfRows = 6;
    const numberOfColumns = 2;

    const renderSeatButton = () => {
        const seatButtons = [];
        let seatNumber = 1;

        for (let row = 1; row <= numberOfRows; row++) {
            const rowButtons = [];
            for (let column = 1; column <= numberOfColumns; column++) {

                let numberSelect = seatNumber;
                rowButtons.push(
                    <button key={`${row}-${column}`}
                        className={`seat-button ${seats.includes(seatNumber) ? 'selected' : ''}`}
                        onClick={(event) => {
                            setSelectedSeat(numberSelect);
                        }}

                    >

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
    }, [from, to]);
    useEffect(() => {
        console.log(selectedSeat, "aaaaaaaaaaaaaaaaaa");
    }, [selectedSeat]);
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
                                    <DepartureBoardIcon style={{ color: "#8888e7" }} />
                                    <div className='textTime' style={{ color: "#8888e7" }}>{departureTime}</div>
                                </div>
                            </div>
                            <div className='from'>
                                <div className='fromMain'>
                                    <PushPinIcon style={{ color: "#8888e7" }} />
                                    <div className='textFrom' style={{ color: "#8888e7" }}>{nameOfFrom}</div>
                                </div>
                            </div>
                            <div className='to'>
                                <div className='toMain'>
                                    <LocationOnIcon style={{ color: "#8888e7" }} />
                                    <div className='textTo' style={{ color: "#8888e7" }}>{nameOfTo}</div>
                                </div>
                            </div>
                            <div className='price'>
                                <div className='priceMain'>
                                    <AttachMoneyIcon style={{ color: "#8888e7" }} />
                                    <div className='textPrice' style={{ color: "#8888e7" }}>{price}</div>
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
                                            <h3 style={{ color: "#8888e7", fontSize: "20px" }}>Selected Seat: </h3>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <AirlineSeatReclineExtraIcon style={{ width: "50px", height: "38px", color: "#8888e7" }} />
                                                <div className='selectedSeatTEXT'>{selectedSeat}</div>

                                            </div>
                                        </div>

                                    </div>
                                    <div className='Buy'>
                                        <button className='buttonBuy' onClick={ getBuyPage }>
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