import React, { createContext, useEffect, useState } from 'react';
import '../styles/Ticket.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import '../styles/TicketPage.css';
import FilterCart from './FilterCart';
import Home from './Home';
import { useContext } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setFrom, setTo, setDate, setTrips, setTripsId } from '../store/slices/ticketSlice';
import { format } from 'date-fns';


export function TicketPage() {
  const { from, to, date, trips, tripsId } = useSelector((state) => {

    return {
      from: state.ticket.from,
      to: state.ticket.to,
      date: state.ticket.date,
      trips: state.ticket.trips,
      tripsId: state.ticket.tripsId,

    };
  });

  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(date);
  const formattedDate = format(selectedDate, "yyyy-MM-dd'T'00:00:00");

  const dispatch = useDispatch();


  console.log("ticketPage");
  console.log(from, to, date);

  useEffect(() => {
    fetchData();
  }, []);



  const [id, setId] = useState(null);

  const handleDetailClick = (trip) => {
    setId(trip.tripID);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setSelectedDate(date);
    dispatch(setDate(date));
    const formattedDate = format(date, "yyyy-MM-dd'T'00:00:00");

  }

  const [dataCity, setDataCity] = useState([]);



  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7224/api/cities/getall');
      setDataCity(response.data.data);
    }
    catch (error) {
      console.error('Error fetching data', error);
    }

  };

  const searchTrips = async () => {


    try {
      //from,to ve date e göre trips leri getirsin, sonra da bunu slice daki trips e atsın
      const response = await axios.get(`https://localhost:7224/api/trips/GetTripsByCityIDAndDate?departureCityID=${from}&arrivalCityID=${to}&departureDate=${formattedDate}`);

      dispatch(setTrips(response.data.data));



  

    }
    catch (error) {
      console.error('Bir hata oluştu:', error);

    }
  }
  return (
    <>
      <div>
        <div style={{ paddingTop: "50px" }}>

          <div className='anaDiv'>
            <div className="itemContainer">
              <div className="ItemNereden">
                <div className="inputContainer">
                  <FormControl className="choiceBox">
                    <InputLabel id="nereden-label"

                    >
                      From</InputLabel>

                    <Select labelId="nereden-label" id="nereden-select" value={from} onChange={(event) => {
                      dispatch(setFrom(event.target.value));
                    }}>
                      {dataCity.length > 0 ? (
                        dataCity.map((datacity) => (
                          <MenuItem key={datacity.cityID} value={datacity.cityID}>
                            {datacity.cityName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No cities available</MenuItem>
                      )}

                    </Select>
                  </FormControl>
                  <TransferWithinAStationIcon className="icon" color="primary" sx={{ margin: 2 }} />
                </div>
              </div>
              <div className="ItemNereye">
                <div className="inputContainer">
                  <FormControl className="choiceBox">
                    <InputLabel id="nereye-label" >To</InputLabel>
                    <Select labelId="nereye-label" id="nereye-select" value={to}
                      onChange={(event) => {
                        dispatch(setTo(event.target.value));
                      }}>
                      {dataCity.length > 0 ? (
                        dataCity.map((datacity) => (
                          <MenuItem key={datacity.cityID} value={datacity.cityID}>
                            {datacity.cityName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No cities available</MenuItem>
                      )}

                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="ItemDate">
              <div className="inputContainer">
                <CalendarMonthIcon color="primary" className='calenderIcon' />
                <DatePicker
                  onChange={handleDateChange}
                  className='datePicker'
                  selected={selectedDate}
                  value={date}

                />

              </div>
            </div>
            <div className="ItemButton">
              <button className="searchButton" onClick={searchTrips}>
                <SearchIcon className="searchIcon" />
              </button>
            </div>
          </div>

        </div>



      </div>
      {/* <div>
        {trips.map((trip, index) => (
          <React.Fragment key={index}>
            <FilterCart trip={trip} />
            {index !== trips.length - 1 && <div style={{ marginBottom: '10px' }}></div>}
          </React.Fragment>
        ))}
        <div style={{ marginBottom: '500px' }}></div>
      </div> */}
      <div>
        {trips.map((trip, index) => (
          <React.Fragment key={index}>
            <FilterCart trip={trip}
            />
            {index !== trips.length - 1 && <div style={{ marginBottom: '10px' }}></div>}
          </React.Fragment>
        ))}
        <div style={{ marginBottom: '500px' }}></div>
      </div>
    </>
  );
}
export default TicketPage
