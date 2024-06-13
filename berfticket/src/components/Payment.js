import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Loader from './Loader.js';
import Grid from '@mui/material/Grid';
import { Height, RunCircle } from '@mui/icons-material';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Payment.css';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { Stepper2 } from './Stepper2.js';
import { setTcNo, setName, setSurname, setPhoneNo, setMail, setDeclaration, setMarketingAuthorization } from '../store/slices/personalInformationSlice.js'
import Alert from '@mui/material/Alert';
import axios from 'axios';

export function Payment() {
  const navigate = useNavigate();
  const [checkbox1Checked, setCheckbox1Checked] = useState(false);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);

  const [isLoading, setIsLoading] = useState(false);//loader spinner için

  const dispatch = useDispatch();

  const { tc_no, name_person, surname_person, phoneNo, mail_person, declaration_person, marketingAuthorization } = useSelector((state) => {

    return {
      tc_no: state.personalInformation.tc_no,
      name_person: state.personalInformation.name_person,
      surname_person: state.personalInformation.surname_person,
      phoneNo: state.personalInformation.phoneNo,
      mail_person: state.personalInformation.mail_person,
      declaration_person: state.personalInformation.declaration_person,
      marketingAuthorization: state.personalInformation.marketingAuthorization,
    };
  });
  const handleCheckbox1Change = (event) => {
    setCheckbox1Checked(event.target.checked);
    dispatch(setDeclaration(event.target.checked));
    console.log(declaration_person);

    // dispatch(setDeclaration(true));
  };
  const handleCheckbox2Change = (event) => {

    setCheckbox2Checked(event.target.checked);
    dispatch(setMarketingAuthorization(event.target.checked));
    console.log(marketingAuthorization);

    // dispatch(setMarketingAuthorization(true));
  };


  return (
    <div className="stepper">
      <div class="complementary_general-info__main">
        <div>

          <div style={{ paddingTop: "50px" }}>
            <Formik

              initialValues={{
                step: 1,
                lastStep: 2,
                isAccepted: false,//checkbox ın check edilip edilmediğini kontrol ediyoruz
                //step1
                tcNo: '',
                name: '',
                surname: '',
                phone_no: '',
                mail: '',

                declaration: '',//beyan
                marketing_authorization: '',//pazarlama izni


                //step2
                nameCart: '',
                surnameCart: '',
                numberCart: '',
                dateCart: '',
                paymentType: ''
              }}

              onSubmit={
                (values, actions) => {
                  //kullanıcının verileri göndermesi durumunda sunucuya gönderilmeden önce yapılması gereken işleri tannımlar.
                  //kullanıcı formu göndermek için Submit düğmesine tıkladığında veya formun gönderilmesi durumunda tetiklenir.
                  console.log('values', values)



                }


              }
            >

              {({ values, setFieldValue, isValid, dirty }) => {
                const prevHandle = e => {
                  setFieldValue('step', values.step - 1)

                }
                const nextHandle = e  => {

                  if (name_person != "" && surname_person != "" && tc_no != "" && phoneNo != "") {
                   
                    addTcNo();
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      setFieldValue('step', values.step + 1);
                    }, 3000);
  
                    console.log("tc no*:", tc_no, "*isim*:", name_person);


                   
                  }
                  else {
                    setAlertStatus(true);
                    setTimeout(() => {
                      setAlertStatus(false);
                    }, 5000);
                  }


                  

                }

                const addTcNo = async () => {
                  try {
                    const responseTc = await axios.get(`https://localhost:7224/api/customers/getcustomerbyid?id=${tc_no}`);
              
                    if (!responseTc.data.data) {
                      console.log("boş geliyorr")
                  
                      
                      const storeData = {
                        customerID: tc_no,
                        name: name_person,
                        surname: surname_person,
                        mail: mail_person,
                        phoneNo: phoneNo,
                        marketingAuthorization: marketingAuthorization,
                        declaration: declaration_person,
                       
                      };
              
                      const response = await axios.post('https://localhost:7224/api/customers/add', storeData);
                      console.log('Yeni kayıt oluşturuldu', response.data);
                    } else {
                      console.log('Kayıt zaten mevcut', responseTc.data);
                    }
              
                  } catch (error) {
                    console.error('Bir hata oluştu:', error);
              
                  }
                };
              


                return (
                  <div >
                    {/* //buraya header gelsin */}
                    <div class="insuranceprogress__main" style={{ display: '' }}>
                      <div className='insuranceprogress__container'>

                        <div className='insuranceprogress__circle_info_node'>
                          <div className={`insuranceprogress__circle${values.step === 1 || values.step === 2 || values.step === 3 || values.step === 4 || values.step === 5 || values.step === 6 ? ' active' : ''}`}></div>
                          <div className='insuranceprogress__info'>
                            <p>Information</p>
                          </div>
                        </div>
                        <div className={`insuranceprogress__line${values.step === 2 ? ' active' : ''}`}></div>



                        <div className='insuranceprogress__circle_info_node'>
                          <div className={`insuranceprogress__circle${values.step === 1 || values.step === 2 ? ' active' : ''}`}></div>
                          <div className='insuranceprogress__info'>
                            <p>Payment</p>
                          </div>
                        </div>




                      </div>
                    </div>



                    <Form >
                      {values.step == 1 && (

                        <div class='form-content-area'>
                          {isLoading && <div className='LoaderDiv'><Loader /></div>}



                          <Grid container spacing={0} className='css-1tz8m30'>
                            <Grid item xs={12} md={6} style={{ paddingTop: '15px' }}>
                              <div className='field-wrapper' >

                                <Field as={TextField} name="tcNo" classname="input" placeholder="ID Number"
                                  inputMode="numeric"
                                  id="tcNo"
                                  value={tc_no}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    dispatch(setTcNo(value));
                                    console.log("tc no in slice:", tc_no);
                                  }}
                                  onBlur={(e) => {
                                    const value = e.target.value;

                                    dispatch(setTcNo(value));
                                    //fetchData(value);


                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key !== 'Backspace' && e.key !== 'Delete' && e.target.value.length >= 11) {
                                      e.preventDefault();
                                    }
                                    if (!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                                      e.preventDefault();
                                    }
                                  }}
                                  label='ID Number'
                                  InputProps={{
                                    style: { background: 'white', height: '41.59px' },

                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                    style: {
                                      lineHeight: '1.4375em',
                                      letterSpacing: '0.00938em',
                                      padding: '0px 0.6rem 0px 0px',
                                      display: 'block',
                                      transformOrigin: 'left top',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      maxWidth: 'calc(133% - 24px)',
                                      position: 'absolute',
                                      left: '0px',
                                      top: '-7px',
                                      transform: 'translate(14px, -9px) scale(0.75)',
                                      transition: 'color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, maxWidth 200ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                                      zIndex: 1,
                                      pointerEvents: 'auto',
                                      userSelect: 'none',
                                      color: 'white',
                                      fontFamily: 'NunitoSans',
                                      fontWeight: 'bolder',


                                    },
                                  }} ></Field>
                                {/* <ErrorMessage name="tcNo" className='error-message' component="text" /> */}
                              </div>
                            </Grid>
                            <Grid item xs={6} sm={6} md={3} style={{ paddingTop: '15px' }} className='css-18tn63a'>
                              <div className='field-wrapper2'>
                                <Field as={TextField} name="name" classname="input" placeholder="Name"
                                  value={name_person}
                                  label='Name'
                                  onChange={(e) => {

                                    dispatch(setName(e.target.value));

                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                    style: {
                                      lineHeight: '1.4375em',
                                      letterSpacing: '0.00938em',
                                      padding: '0px 0.6rem 0px 0px',
                                      display: 'block',
                                      transformOrigin: 'left top',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      maxWidth: 'calc(133% - 24px)',
                                      position: 'absolute',
                                      left: '0px',
                                      top: '-7px',
                                      transform: 'translate(14px, -9px) scale(0.75)',
                                      transition: 'color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, maxWidth 200ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                                      zIndex: 1,
                                      pointerEvents: 'auto',
                                      userSelect: 'none',
                                      color: 'white',
                                      fontFamily: 'NunitoSans',
                                      fontWeight: 'bolder',


                                    },
                                  }}
                                  InputProps={{
                                    style: { background: 'white', height: '41.59px' },

                                  }}
                                ></Field>
                                {/* <ErrorMessage name="name" className='error-message' component="text" /> */}
                              </div>
                            </Grid>
                            <Grid item xs={6} sm={6} md={3} style={{ paddingTop: '15px' }} className='css-18tn63a'>
                              <div className='field-wrapper3'>
                                <Field as={TextField} name="surname" classname="input" placeholder="Surname"
                                  label='Surname'
                                  value={surname_person}
                                  onChange={(e) => {
                                    dispatch(setSurname(e.target.value));

                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                    style: {
                                      lineHeight: '1.4375em',
                                      letterSpacing: '0.00938em',
                                      padding: '0px 0.6rem 0px 0px',
                                      display: 'block',
                                      transformOrigin: 'left top',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      maxWidth: 'calc(133% - 24px)',
                                      position: 'absolute',
                                      left: '0px',
                                      top: '-7px',
                                      transform: 'translate(14px, -9px) scale(0.75)',
                                      transition: 'color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, maxWidth 200ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                                      zIndex: 1,
                                      pointerEvents: 'auto',
                                      userSelect: 'none',
                                      color: 'white',
                                      fontFamily: 'NunitoSans',
                                      fontWeight: 'bolder',


                                    },
                                  }}
                                  InputProps={{
                                    style: { background: 'white', height: '41.59px' },

                                  }}
                                ></Field>
                                <ErrorMessage name="surname" className='error-message' component="text" />
                              </div>
                            </Grid>



                            <Grid item xs={12} md={6} style={{ paddingTop: '15px' }}>
                              <div className='field-wrapper' >

                                <Field as={TextField} name="mail" classname="input" placeholder="Mail"
                                  value={mail_person}
                                  onChange={(e) => {
                                    dispatch(setMail(e.target.value));

                                  }}
                                  label='Mail'
                                  InputProps={{
                                    style: { background: 'white', height: '41.59px' },

                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                    style: {
                                      lineHeight: '1.4375em',
                                      letterSpacing: '0.00938em',
                                      padding: '0px 0.6rem 0px 0px',
                                      display: 'block',
                                      transformOrigin: 'left top',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      maxWidth: 'calc(133% - 24px)',
                                      position: 'absolute',
                                      left: '0px',
                                      top: '-7px',
                                      transform: 'translate(14px, -9px) scale(0.75)',
                                      transition: 'color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, maxWidth 200ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                                      zIndex: 1,
                                      pointerEvents: 'auto',
                                      userSelect: 'none',
                                      color: 'white',
                                      fontFamily: 'NunitoSans',
                                      fontWeight: 'bolder',


                                    },
                                  }} ></Field>

                              </div>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ paddingTop: '15px' }}>
                              <div className='field-wrapper' >

                                <Field as={TextField} name="phone_no" classname="input" placeholder="Phone Number"
                                  value={phoneNo}
                                  onChange={(e) => {
                                    dispatch(setPhoneNo(e.target.value));
                                    console.log("phoneno in slice:", phoneNo)
                                  }}
                                  inputMode="numeric"
                                  onKeyDown={(e) => {
                                    if (e.key !== 'Backspace' && e.key !== 'Delete' && e.target.value.length >= 10) {
                                      e.preventDefault();
                                    }
                                    if (!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                                      e.preventDefault();
                                    }
                                  }}
                                  label='Phone Number'
                                  InputProps={{
                                    style: { background: 'white', height: '41.59px' },

                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                    style: {
                                      lineHeight: '1.4375em',
                                      letterSpacing: '0.00938em',
                                      padding: '0px 0.6rem 0px 0px',
                                      display: 'block',
                                      transformOrigin: 'left top',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      maxWidth: 'calc(133% - 24px)',
                                      position: 'absolute',
                                      left: '0px',
                                      top: '-7px',
                                      transform: 'translate(14px, -9px) scale(0.75)',
                                      transition: 'color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, maxWidth 200ms cubic-bezier(0, 0, 0.2, 1) 0ms',
                                      zIndex: 1,
                                      pointerEvents: 'auto',
                                      userSelect: 'none',
                                      color: 'white',
                                      fontFamily: 'NunitoSans',
                                      fontWeight: 'bolder',


                                    },
                                  }} ></Field>
                                <ErrorMessage name="phone_no" className='error-message' component="text" />
                              </div>
                            </Grid>


                            <Grid item xs={24} md={12} style={{ paddingTop: '15px' }}>
                              <div className='field-wrapper'>
                                <Field
                                  type='checkbox'
                                  name='declaration'
                                  render={({ field }) => (
                                    <label style={{ width: '100%', height: '100%', display: 'inline-flex', gap: '8px', justifyContent: 'flexStart', alignItems: 'center' }}>
                                      <div class="form-check"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",


                                        }}>
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" style={{ borderRadius: "4px", width: "17px", height: "17px", border: "2px solid rgb(228, 149, 55)" }}

                                          onChange={handleCheckbox1Change}

                                        ></input>

                                      </div>
                                      <span style={{ letterSpacing: '0.02em', color: "black", fontSize: "16px" }}>
                                        Although I have not had any previous operations, I do not currently have any ongoing health problems. I declare that I am healthy.    </span>
                                    </label>
                                  )}
                                />
                              </div>
                            </Grid>

                            <Grid item xs={24} md={12} style={{ paddingTop: '15px' }}>
                              <div className='field-wrapper'>
                                <Field
                                  type='checkbox'
                                  name='marketing_authorization'

                                  render={({ field }) => (
                                    <label style={{ width: '100%', height: '100%', display: 'inline-flex', gap: '8px', justifyContent: 'flexStart', alignItems: 'center' }}>

                                      <div class="form-check"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",


                                        }}>
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" style={{ borderRadius: "4px", width: "17px", height: "17px", border: "2px solid rgb(228, 149, 55)" }}

                                          onChange={handleCheckbox2Change}

                                        ></input>

                                      </div>
                                      <span style={{ letterSpacing: '0.02em', color: "black", fontSize: "16px" }}>
                                        To contact me and inform me about products, services, campaigns and surveys.
                                        <a target="_blank" rel="noreferrer" style={{ color: 'white' }}> stated principles</a>
                                        I hereby give my consent.
                                      </span>
                                    </label>
                                  )}
                                />
                              </div>
                            </Grid>


                          </Grid>
                        </div>


                      )}

                    </Form>




                    <>
                      {values.step == 2 && (
                        <div>
                          {isLoading && <div className='LoaderDiv'><Loader /></div>}
                          <Stepper2 />

                        </div>


                      )}

                    </>



                    {/* buttonlar */}
                    {<div>
                      <div className='insurancebutton__container'>
                        {(values.step > 1) && (
                          //step 1 den büyükse (2.step,3.step vs.) geri butonu olsun
                          <button type='button' onClick={prevHandle} className='stepperPageButton'
                            style={{
                              borderColor: '#e49537',
                              width: '188px',
                              height: '45.36px',
                              borderRadius: '25px',
                              backgroundColor: '#e49537',
                              color: 'white',
                              fontSize: 'larger',
                              fontWeight: 'bold',
                            }}>
                            Geri
                          </button>
                        )}



                        {values.step == values.lastStep && (
                          //sonuncu step e gelince devam buttonu gri renk olsun
                          <div style={{ marginTop: "-140px", width: "200px", marginRight: "508px" }}>
                            <button className='PaymentPageButton' type='button'
                            // style={{
                            //   borderColor: approvalInformationForm == true && approvalSellingContract == true && approvalInformationalText == true ? '#e49537' : 'lightgray',
                            //   width: '184px',
                            //   height: '41.36px',
                            //   borderRadius: '25px',
                            //   backgroundColor: approvalInformationForm == true && approvalSellingContract == true && approvalInformationalText == true ? '#e49537' : 'white',
                            //   color: approvalInformationForm == true && approvalSellingContract == true && approvalInformationalText == true ? 'white' : 'lightgray',
                            //   fontSize: 'larger',
                            //   fontWeight: 'bold',
                            //   marginTop: "-152px",
                            //   marginRight: "532px"
                            // }}
                            >
                              Pay
                            </button>

                          </div>
                        ) || (
                            <div>
                              <button type='button' onClick={nextHandle}
                                style={{
                                  color: checkbox1Checked && checkbox2Checked ? 'white' : 'white',
                                  backgroundColor: checkbox1Checked && checkbox2Checked ? '#e49537' : 'rgb(189 179 179 / 50%)',
                                  borderColor: checkbox1Checked && checkbox2Checked ? '#e49537' : 'lightgray',
                                  width: '188px',
                                  height: '45.36px',
                                  borderRadius: '25px',
                                  fontSize: 'larger',
                                  fontWeight: 'bold'
                                }}

                                disabled={!checkbox1Checked || !checkbox2Checked}//checkboxların birinin false olması durumunda buttonun disable ı false olucak
                              >Devam</button>

                            </div>
                          )
                        }

                      </div>
                    </div>}

                    {alertStatus && (
                      <div className='alertDivStepper'>
                        <Alert severity="warning">Please enter all information completely.</Alert>
                      </div>
                    )}
                  </div>

                )

              }}



            </Formik>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Payment
