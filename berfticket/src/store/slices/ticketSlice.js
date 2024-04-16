import {createSlice} from '@reduxjs/toolkit'

const ticketSlice=createSlice({
name:'ticket',
initialState:{
from:'',
to:'',
date:'',
},
reducers:{
setFrom:(state,action)=>{
    
    state.from=action.payload; //Redux store da bulunan from alanını, action.payload değeriyle günceller.
//state i güncelliyoruz. //değiştirdiğimiz değer action.payloud un içerisine geliyor.
},
setTo:(state,action)=>{
    state.to=action.payload; //Redux store da bulunan to alanını, action.payload değeriyle günceller.
},
setDate:(state,action)=>{
    
    state.date=action.payload; //Redux store da bulunan date alanını, action.payload değeriyle günceller.
},
}
});

export const {setFrom,setTo,setDate} = ticketSlice.actions;
export const ticketReducer= ticketSlice.reducer;