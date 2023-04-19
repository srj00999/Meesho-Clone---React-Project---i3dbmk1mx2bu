import React, { useState } from "react";
import { useContext } from "react";
import { DataAppContext} from "../AppData";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './CheckOut.css';


export default function CheckOut() {

    const initialData = {
        cardname: '',
        cardnumber: '',
        date: '',
        cvv: '',
    }

    const [formdata, setFormdata] = useState(initialData);
    const [formerror, setFormerror] = useState({});

    const [paymentStatus, setPaymentStatus] = useState(false);

    const localContext = useContext(DataAppContext);
    const { appState } = localContext;
    const { baseFare, loginStatus } = appState;
    const navigate = useNavigate();

    const updateData = (e) => {

        let tempObj = {};
        tempObj[e.target.id] = e.target.value.trim();
        setFormdata({
            ...formdata, ...tempObj
        });
    }


    const payFn = () => {


        const ret = validationFn();

        if (ret) {

            setPaymentStatus(true);
        }
    }


    const validationFn = () => {

        let errorObj = {};

        if (formdata.cardname === '') {
            errorObj.cardname = 'Card Number is empty'
        }

        if (formdata.cardnumber === '') {
            errorObj.cardnumber = 'Card Number is empty'
        }
        if (formdata.date === '') {
            errorObj.date = 'Date is empty'
        }
        if (formdata.cvv === '') {
            errorObj.cvv = 'CVV is empty'
        }

        setFormerror(errorObj);

        if (Object.keys(errorObj).length > 0) {
            return false
        }
        else {
            return true
        }

    }

    useEffect(() => {
        if (!loginStatus) {

            navigate('/login');
        }
        else {
        }
    }, []);

    if (paymentStatus) {
        setTimeout(() => {
            navigate('/');
        }
            , 2000);
    }

    return (
        <div className="flightdatacontainer">
            {paymentStatus ?
                <>
                    <div className="paymentsuccesful">

                        <div><h1> Payment  Successful</h1></div>
                        <div><h1>Thanks for Shoping..</h1></div>
                    </div>
                </>
                :
                <div className="checkoutcontainer">

                    <div className="paymentbox">
                        <span>

                            <h1>Order Summary</h1>
                            <div>
                                <div className="faresummary">
                                    <span><label><h5>Product & price</h5></label></span>
                                    <span><h4>{baseFare}</h4></span>
                                </div>
                                <div class="line-1"></div>
                                <div className="faresummary">
                                    <span><label><h5>tax</h5></label></span>
                                    <span><h4>{(baseFare / 100) * 7}</h4></span>
                                </div>
                                <div class="line-1"></div>
                                <div className="faresummary">
                                    <span><label><h5>Total Amount</h5></label></span>
                                    <span><h4>{Number(baseFare) + Number((baseFare / 100) * 7)}</h4></span>
                                </div>
                                <div class="line-1"></div>
                            </div>

                        </span>
                    </div>


                    <div className="paymentbox">
                        <span>
                            <h1>Payment Method</h1>

                            <input className="inputbox" type="text" placeholder="Name on card" id="cardname" onChange={updateData} value={formdata.cardname} />
                            <div className='text-danger errormsg'>{formerror.cardname}</div>

                            <input className="inputbox" type="number" placeholder="Card Number" id="cardnumber" onChange={updateData} value={formdata.cardnumber} />
                            <div className='text-danger errormsg'>{formerror.cardnumber}</div>

                            <input className="inputbox" type="date" placeholder="Expiry Date" id="date" onChange={updateData} value={formdata.date} />
                            <div className='text-danger errormsg'>{formerror.date}</div>

                            <input className="inputbox" type="number" placeholder="CVV" id="cvv" onChange={updateData} value={formdata.cvv} />
                            <div className='text-danger errormsg'>{formerror.cvv}</div>

                            <button className="paymentbtn" onClick={payFn}>Pay</button>

                        </span>
                    </div>

                </div>

            }
        </div>
    )
}