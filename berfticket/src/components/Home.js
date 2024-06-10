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
import { setFrom, setTo, setDate, setTrips } from '../store/slices/ticketSlice';
import { format } from 'date-fns';

export function Home() {
  const dispatch = useDispatch();

  const { from, to, date, trips } = useSelector((state) => {

    return {
      from: state.ticket.from,
      to: state.ticket.to,
      date: state.ticket.date,
      trips: state.ticket.trips
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
  const [selectedDate, setSelectedDate] = useState(startDate);

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

  const formattedDate = format(selectedDate, "yyyy-MM-dd'T'00:00:00");

  const navigate = useNavigate()
  const goToPage = async () => {
    navigate("./ticketPage/");

    try {
      //from,to ve date e göre trips leri getirsin, sonra da bunu slice daki trips e atsın
      const response = await axios.get(`https://localhost:7224/api/trips/GetTripsByCityIDAndDate?departureCityID=${from}&arrivalCityID=${to}&departureDate=${formattedDate}`);

      dispatch(setTrips(response.data.data));
      console.log("trips değerleri----------------------", response.data.data);
      console.log("slice trips değeri*************", trips);

    }
    catch (error) {
      console.error('Bir hata oluştu:', error);

    }
  }



  return (

    <div className='container'>
      <div className='titleContainer'>
        <h1 className='title' style={{textShadow:"0 0 10px red"}}>
          The address of safe and cheap tickets
        </h1>
        <h1 className='subtitle' style={{textShadow:"0 0 10px red"}}>
          Have a nice trip...
        </h1>
      </div>
      <div className='ticketContainer'>
        {/* Burada Ticket aracınızı ekleyebilirsiniz */}
        <div style={{paddingTop:"50px",paddingBottom:"250px",width:"985px"}}>

          <div className='anaDiv'>
            <div className="itemContainer">
              <div className="ItemNereden">
                <div className="inputContainer">
                  <FormControl className="choiceBox">
                    <InputLabel id="nereden-label"

                    >From</InputLabel>

                    <Select
                      labelId="nereden-label" id="nereden-select"
                      onChange={(event) => {
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
                  <TransferWithinAStationIcon className="icon"  sx={{ margin: 2 }} />
                </div>
              </div>
              <div className="ItemNereye">
                <div className="inputContainer">
                  <FormControl className="choiceBox">
                    <InputLabel id="nereye-label"

                    >To</InputLabel>
                    <Select

                      labelId="nereye-label" id="nereye-select"
                      onChange={(event) => {
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
                <CalendarMonthIcon  className='calenderIcon' />
                <DatePicker

                  className='datePicker'
                  selected={selectedDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={handleDateChange}
                  value={formattedDate}
                />

              </div>
            </div>

            {/* bu buttona basıldığında slice daki trip değerine value eklesin */}
            <div className="ItemButton">
              <button className="searchButtonn" onClick={goToPage}>
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