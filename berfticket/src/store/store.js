import {configureStore} from '@reduxjs/toolkit'
import { ticketReducer } from './slices/ticketSlice'

export const store=configureStore({
reducer: {
ticket:ticketReducer
},
});
