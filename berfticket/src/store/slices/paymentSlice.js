import { createSlice } from '@reduxjs/toolkit'


const paymentSlice = createSlice({
    name: 'paymentSlice',
    initialState: {
        //userId stepOneSlice dan gelicek
        ID:'',
        nameOnCart:'',
        surnameOnCart:'',
        cartNumber:'',
        dateCart:'',
        //totalAmount burası policySlice dan gelicek
        paymentType:'',
        approvalInformationForm:'false',
        approvalSellingContract:'false',
        approvalInformationalText:'false',
        

    },
    reducers: {
        setID: (state, action) => {
            //state önceki değer, action ise işlem yapan fonksiyon gibi düşünülebilinir, payload ise veridir
            state.policyID = action.payload;
        },
        setNameOnCart: (state, action) => {
            //state önceki değer, action ise işlem yapan fonksiyon gibi düşünülebilinir, payload ise veridir
            state.nameOnCart = action.payload;
        },
        setSurnameOnCart: (state, action) => {
            //state önceki değer, action ise işlem yapan fonksiyon gibi düşünülebilinir, payload ise veridir
            state.surnameOnCart = action.payload;
        },
        setCartNumber: (state, action) => {
            //state önceki değer, action ise işlem yapan fonksiyon gibi düşünülebilinir, payload ise veridir
            state.cartNumber = action.payload;
        },
        setDateCart: (state, action) => {
            //state önceki değer, action ise işlem yapan fonksiyon gibi düşünülebilinir, payload ise veridir
            state.dateCart = action.payload;
        },
        setPaymentType: (state, action) => {
            //state önceki değer, action ise işlem yapan fonksiyon gibi düşünülebilinir, payload ise veridir
            state.paymentType = action.payload;
        },
        setApprovalInformationForm: (state, action) => {
            //state önceki değer, action ise işlem yapan fonksiyon gibi düşünülebilinir, payload ise veridir
            state.approvalInformationForm = action.payload;
        },
        setApprovalSellingContract: (state, action) => {
            //state önceki değer, action ise işlem yapan fonksiyon gibi düşünülebilinir, payload ise veridir
            state.approvalSellingContract = action.payload;
        },
        setApprovalInformationalText: (state, action) => {
            //state önceki değer, action ise işlem yapan fonksiyon gibi düşünülebilinir, payload ise veridir
            state.approvalInformationalText = action.payload;
        },


    }


});

export const paymentReducer = paymentSlice.reducer;
export const { setID,setNameOnCart,setSurnameOnCart,setCartNumber,setDateCart,setPaymentType,setApprovalInformationForm,setApprovalSellingContract,setApprovalInformationalText } = paymentSlice.actions;