import {configureStore} from '@reduxjs/toolkit'
import { ticketReducer } from './slices/ticketSlice'
import { paymentReducer } from './slices/paymentSlice';
import { personalInformationReducer } from './slices/personalInformationSlice';

export const store=configureStore({
reducer: {
ticket:ticketReducer,
payment:paymentReducer,
personalInformation:personalInformationReducer
},
});
