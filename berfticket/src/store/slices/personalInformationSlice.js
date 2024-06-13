import { createSlice } from '@reduxjs/toolkit'

const personalInformationSlice = createSlice({
    name: 'personalInformation',
    initialState: {
        //başlangıç durumu
        tc_no: '',
        name_person: '',
        surname_person: '',
        phoneNo: '',
        mail_person: '',
        declaration_person: false,//beyan
        marketingAuthorization: false
    },
    reducers: {
        //uygulama durumunun(state) güncellenmesinden sorumlu
        setTcNo: (state, action) => {
            //state önceki değer, action ise işlem yapan fonksiyon gibi düşünülebilinir, payload ise veridir
            state.tc_no = action.payload;
        },
        setName: (state, action) => {
            
            state.name_person= action.payload;
        },
        setSurname: (state, action) => {
            
            state.surname_person = action.payload;
        },
        setPhoneNo: (state, action) => {
            
            state.phoneNo = action.payload;
        },
        setMail: (state, action) => {
            
            state.mail_person = action.payload;
        },
        setDeclaration: (state, action) => {
            
            state.declaration_person = action.payload;
        },
        setMarketingAuthorization: (state, action) => {
            
            state.marketingAuthorization = action.payload;
        },

    }
});

export const {setTcNo,setName,setSurname,setPhoneNo,setMail,setDeclaration,setMarketingAuthorization}=personalInformationSlice.actions;
export const personalInformationReducer = personalInformationSlice.reducer;