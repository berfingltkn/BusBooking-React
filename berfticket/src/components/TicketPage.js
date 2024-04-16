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
import { setFrom, setTo, setDate } from '../store/slices/ticketSlice';


//deneme
export function TicketPage() {
  

  const dispatch = useDispatch();

  const { from, to, date } = useSelector((state) => {

    return {
      from: state.ticket.from,
      to: state.ticket.to,
      date: state.ticket.date
    };
  });
  console.log("ticketPage");
  console.log(from, to, date);

  useEffect(() => {
    fetchData();
  }, []);

  const [startDate, setStartDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(date);
  const handleDateChange = (date) => {
    setStartDate(date);
    setSelectedDate(date);
    dispatch(setDate(date));

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


  return (
    <>
      <div>
        <div>

          <div className='anaDiv'>
            <div className="itemContainer">
              <div className="ItemNereden">
                <div className="inputContainer">
                  <FormControl className="choiceBox">
                    <InputLabel id="nereden-label"
                      
                    >
                      From</InputLabel>

                    <Select labelId="nereden-label" id="nereden-select" value={from} onChange={(event)=>{
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
                    <Select labelId="nereye-label" id="nereye-select"  value={to} onChange={(event)=>{
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
              <button className="searchButton" >
                <SearchIcon className="searchIcon" />
              </button>
            </div>
          </div>

        </div>



      </div>
      <div>
        <FilterCart />
      </div>
    </>
  );
}
export default TicketPage
