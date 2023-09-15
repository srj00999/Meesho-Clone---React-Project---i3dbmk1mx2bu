import React, { useContext, useEffect, useState } from "react";
import { DataAppContext } from "../AppData";
import "../StyleComp/CheckOut.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const Address = () => {

  const initialData = {
    name: "",
    contactno: "",
    house: "",
    area: "",
    pincode: "",
    city: "",
    state: "",
    optional: "",
  };

  const navigate = useNavigate();
  const [clss, setClass] = useState();
  const [address, setAddress] = useState([]);
  const [saveindex, setSaveindex] = useState();
  const [showedit, setShowedit] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [editAddData, seteditAddData] = useState();
  const [paycart, setPaycart] = useState({
    totalPayprice: "",
    id: "",
  });

  const localContext = useContext(DataAppContext);
  const { appState , setAppState } = localContext;
  const { loginStatus, id, price, totalprice , deliveryAdd} = appState;
  const totalProductPrice = paycart.totalPayprice;
  const totaldiscount = ((totalProductPrice / 100) * 18).toFixed(2);

  const updateData = (e) => {
    let tempObj = {};
    tempObj[e.target.id] = e.target.value;
    setFormData({
      ...formData,
      ...tempObj,
    });
  };


  const saveAddressFn = (e) => {
    e.preventDefault();
    let temp = JSON.parse(localStorage.getItem("address")) || [];
    localStorage.setItem("address", JSON.stringify([...temp, formData]));
    setFormData(initialData);
    setClass(false);
  };


  const updateAdd = (address) => {
    localStorage.setItem("address", JSON.stringify(address));
    setAddress(address);
  };


  const editData = (e) => {
    let tempObj = {};
    tempObj[e.target.id] = e.target.value;
    seteditAddData({
      ...editAddData,
      ...tempObj,
    });
  };

  const saveEditAdd = (e) => {
    e.preventDefault();
    address[saveindex] = editAddData;
    const newAdd = [...address];
    newAdd.splice(saveindex, 1 , editAddData);
    updateAdd(newAdd);
    setFormData(initialData);
    setShowedit(false);
  };


  useEffect(() => {
    setPaycart({
      ...paycart,
      totalPayprice: appState.price || appState.totalprice,
      id: appState.id,
    });
    if (!loginStatus) {
      navigate("/login");
    } else {
      let temp = JSON.parse(localStorage.getItem("address")) || [];
      setAddress(temp);
    }
  }, [formData,editAddData]);


  const editAdress = (index) => {
    setShowedit(true);
    setSaveindex(index);
    seteditAddData(address[index]);

  };


  const callClass = () => {
    setClass(true);
  };


  const cancelEdit = () => {
    setClass(false);
  };


  const selectAddFn = (index)=>{
    setAppState({
      ...appState,
      deliveryAdd : address[index],
      discount:totaldiscount,
    })
    navigate('/checkout');
  }
  

  useEffect(()=>{
    setAppState({
      ...appState, showSearch:false,
      showProCart:false
    })
  },[]);  

  return (
    <>
      <div className="checkout_page">
        <div className="checkoutmaincont">
          <div className="paymentContainer">
            <div className="paymentmethod">
              <span className="selcectmethod">Select Payment Method</span>
              <span className="addnewContaienr">
                <button onClick={callClass}> + ADD NEW ADDRESS</button>
              </span>
            </div>
            { address && address.length>0 && address != undefined ? address.map((item,index) => (
              <div key={index}>
                <div className="address_container">
                  <div className="nameconatiner">
                    <h2 >{item.name}</h2>
                    <button
                      className="editbtncntainer" key={index}
                      onClick={() => editAdress(index)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="main_address_container">
                    <p>{item.house}</p>
                    <p>{item.area}</p>
                    <p>{item.optional}</p>
                    <p>{item.city}</p>
                    <p>
                      {item.state} {item.pincode}
                    </p>
                    <p>{item.contactno}</p>
                  </div>
                  <div className="deliver_btn_container">
                      <button onClick={()=>selectAddFn(index)}>Deliver to this Address</button>
                  </div>
                </div>
              </div>
            )):<h1>No Address Found!</h1>}

          </div>
          <div>
            <div className="prcedetailpage">
              <div className="pricesubcontainer">
                <div className="pcontainer">
                  <div className="pricedetailcontainerbox">Price Details</div>
                  <div className="priceProductContainer">
                    <span className="totalprdprice">Total Product Price</span>
                    <span className="pricetagfont">
                      +{Number(totalProductPrice).toFixed(2)}
                    </span>
                  </div>
                  <div className="priceProductContainer ">
                    <span className="totldiscount">Total Discounts</span>
                    <span className="totldiscountprice">
                      -₹{Number(totaldiscount).toFixed(2)}
                    </span>
                  </div>
                  <div className="hrlinepricecontainer"></div>
                  <div className="priceProductContainer">
                    <span className="orderttl">Order Total</span>
                    <span className="pricetagfont">
                      ₹{Number(totalProductPrice - totaldiscount).toFixed(2)}
                    </span>
                  </div>
                  <div className="discountcontainer">
                    <span>
                      <FontAwesomeIcon icon={faPercent} />
                    </span>
                    <span className="pricetagfont">
                      Yah! Your total discount is ₹
                      {Number(totaldiscount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {clss && (
        <div className="slideEditContainer">
          <div className="slideEdit">
            <div className="AddrsContainer">
              <div className="add_address_cont">
                <span>ADD ADDRESS</span>
                <span>
                  <button className="croxbtn" onClick={() => setClass(false)}>X</button>
                </span>
              </div>
              <form className="addAddressForm" onSubmit={saveAddressFn}>
                <div className="contact_details_container">
                  <FontAwesomeIcon icon={faPhone} className="slideIcons" />
                  <span>Contact Details</span>
                </div>
                <div className="frminput">
                  <input
                    className="formName"
                    placeholder="Name"
                    type="text"
                    id="name"
                    required
                    onChange={updateData}
                    value={formData.name}
                  />
                  <input
                    placeholder="Contact Number"
                    type="number"
                    id="contactno"
                    required
                    onChange={updateData}
                    value={formData.contactno}
                  />
                  <span>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="slideIcons"
                    />
                    <span className="addressbox">Address</span>
                  </span>
                  <input
                    placeholder="House no /Building Name"
                    type="text"
                    id="house"
                    required
                    onChange={updateData}
                    value={formData.house}
                  />
                  <input
                    placeholder="Road Name / Area / Colony"
                    type="text"
                    id="area"
                    required
                    onChange={updateData}
                    value={formData.area}
                  />
                  <input
                    placeholder="Pincode"
                    type="number"
                    id="pincode"
                    required
                    onChange={updateData}
                    value={formData.pincode}
                  />
                  <div className="cityStatebox">
                    <input
                      placeholder="City"
                      type="text"
                      id="city"
                      required
                      onChange={updateData}
                      value={formData.city}
                    />{" "}
                    <input
                      placeholder="state"
                      type="text"
                      id="state"
                      required
                      onChange={updateData}
                      value={formData.state}
                    />
                  </div>
                  <input
                    placeholder="Nearby Famous Place/Shop/School,etc (optional)"
                    type="text"
                    id="optional"
                    onChange={updateData}
                    value={formData.optional}
                  />
                </div>
                <button className="saveAddandContbtn" type="submit">
                  Save Address and Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {showedit && (
        <div className="slideEditContainer">
          <div className="slideEdit">
            <div className="AddrsContainer">
              <div className="add_address_cont">
                <span>EDIT ADDRESS</span>
                <span>
                  <button onClick={() => setShowedit(false)}>X</button>
                </span>
              </div>
              { (
                <form className="addAddressForm" onSubmit={saveEditAdd}>
                  <div></div>
                  <div className="contact_details_container">
                    <FontAwesomeIcon icon={faPhone} className="slideIcons" />
                    <span>Contact Details</span>
                  </div>
                  <div className="frminput">
                    <input
                      className="formName"
                      placeholder="Name"
                      type="text"
                      id="name"
                      onChange={editData}
                      value={editAddData && editAddData.name}
                    />
                     <input
                      placeholder="Contact Number"
                      type="number"
                      id="contactno"
                      onChange={editData}
                       value={editAddData && editAddData.contactno}
                    />
                    <span>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="slideIcons"
                      />
                      <span className="addressbox">Address</span>
                    </span>
                    <input
                      placeholder="House no /Building Name"
                      type="text"
                      id="house"
                      onChange={editData}
                      value={editAddData && editAddData.house}
                    />
                    <input
                      placeholder="Road Name / Area / Colony"
                      type="text"
                      id="area"
                      onChange={editData}
                      value={editAddData && editAddData.area}
                    />
                    <input
                      placeholder="Pincode"
                      type="number"
                      id="pincode"
                      onChange={editData}
                      value={editAddData && editAddData.pincode}
                    />
                    <input
                      placeholder="Pincode"
                      type="number"
                      id="contactno"
                      onChange={editData}
                      value={editAddData && editAddData.contactno}
                    />
                    <div className="cityStatebox">
                      <input
                        placeholder="City"
                        type="text"
                        id="city"
                        onChange={editData}
                      value={editAddData && editAddData.contactno}
                      />
                      <input
                        placeholder="state"
                        type="text"
                        id="state"
                        onChange={editData}
                        value={editAddData && editAddData.state }
                       />
                    </div>
                    <input
                      placeholder="Nearby Famous Place/Shop/School,etc (optional)"
                      type="text"
                      id="optional"
                      onChange={editData}
                      value={editAddData && editAddData.optional}
                    /> 
                  </div>
                  <button className="saveAddandContbtn" type="submit">
                    Save Address and Continue
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Address;
