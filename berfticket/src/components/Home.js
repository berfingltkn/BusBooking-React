import { React, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Ticket } from './Ticket';
import '../styles/Home.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setFrom, setTo, setDate } from '../store/slices/ticketSlice';

export function Home() {
  const dispatch = useDispatch();

  const { from, to, date } = useSelector((state) => {

    return {
      from: state.ticket.from,
      to: state.ticket.to,
      date: state.ticket.date
    };
  });
  console.log(from, to, date);
  const [startDate, setStartDate] = useState(new Date());
  const handleDateChange = (date) => {
    setStartDate(date);
    setSelectedDate(date);
    dispatch(setDate(date));
  }

  const [dataCity, setDataCity] = useState([]);
  const [selectedDate,setSelectedDate]=useState(startDate);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7224/api/cities/getall');
      setDataCity(response.data.data);
    }
    catch (error) {
      console.error('Error fetching data', error);
    }

  };


  const navigate = useNavigate()
  const goToPage = () => {
    navigate("./ticketPage/");
  }



  return (

    <div className='container'>
      <div className='titleContainer'>
        <h1 className='title'>
          The address of safe and cheap tickets
        </h1>
        <h1 className='subtitle'>
          Have a nice trip...
        </h1>
      </div>
      <div className='ticketContainer'>
        {/* Burada Ticket aracınızı ekleyebilirsiniz */}
        <div>

          <div className='anaDiv'>
            <div className="itemContainer">
              <div className="ItemNereden">
                <div className="inputContainer">
                  <FormControl className="choiceBox">
                    <InputLabel id="nereden-label"
                    
                    >From</InputLabel>

                    <Select 
                    labelId="nereden-label" id="nereden-select" 
                    onChange={(event)=>{
                      dispatch(setFrom(event.target.value));
                    }}
                    value={from}
                    >
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
                    <InputLabel id="nereye-label"
                    
                    >To</InputLabel>
                    <Select 
                    
                    labelId="nereye-label" id="nereye-select"  
                    onChange={(event)=>{
                      dispatch(setTo(event.target.value));
                    }}
                    value={to}
                    >
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

                  className='datePicker'
                  selected={selectedDate}
                  
                  onChange={handleDateChange}
                  value={date}
                />

              </div>
            </div>
            <div className="ItemButton">
              <button className="searchButton" onClick={goToPage}>
                <SearchIcon className="searchIcon" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;