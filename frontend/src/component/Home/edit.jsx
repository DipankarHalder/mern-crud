import axios from 'axios';
import { useState } from 'react';
import { VscChromeClose } from "react-icons/vsc";
import { baseUrl, digiPh, onlyNum, fZeroNAllow, onlyEmail } from '../config';

export const Edit = (props) => {
  const [initValue, setInitValue] = useState({ name: props.editItem.name, email: props.editItem.email, phone: props.editItem.phone });
  const [initError, setInitError] = useState({ emailError: '', phoneError: '' });
  const [initMainError, setInitMainError] = useState('');

  const onChangeHandle = (event) => {
    event.preventDefault();
    setInitMainError('');
    setInitError({ emailError: '', phoneError: '' })
    setInitValue({ ...initValue, [event.target.name]: event.target.value });
  };

  const editNewItem = async (event) => {
    event.preventDefault();

    if (!initValue.email) { return setInitError({ emailError: 'Please enter your email address' }); }
    if (initValue.email !== "" && !onlyEmail.test(initValue.email)) { return setInitError({ emailError: 'Please enter valid email address' }); }
    if (!initValue.phone) { return setInitError({ phoneError: 'Please enter your phone number' }); }
    if (!onlyNum.test(initValue.phone)) { return setInitError({ phoneError: 'Please enter a valid phone number' }); }
    if (onlyNum.test(initValue.phone) && !digiPh.test(initValue.phone)) { return setInitError({ phoneError: 'Please enter a valid 10 digit mobile number' }); }
    if (onlyNum.test(initValue.phone) && !fZeroNAllow.test(initValue.phone)) { return setInitError({ phoneError: 'Please enter a valid phone number' }); }

    const payload = { name: initValue.name, email: initValue.email, phone: initValue.phone }
    console.log(payload);
    try {
      const res = await axios.put(`${baseUrl}/items/${props.editItem._id}`, payload);
      if(res.data.msg === "User successfully updated") {
        setInitError({ name: '', email: '', phone: '' });
        props.getFetchItem();
        props.handleClose();
      }
    } catch (err) { console.log(err) }
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-heading-add">
          <h5>Edit Contact</h5>
          <span onClick={props.handleClose}><VscChromeClose /></span>
        </div>
        <div className="popup-details">
          {initMainError && (<p className="app-error-lst">{initMainError}</p>)}
          <form onSubmit={editNewItem} className="app-frms">
            <div className="app-fileds">
              <span>Name</span>
              <input type="text" name="name" value={initValue.name} onChange={onChangeHandle} />
            </div>
            <div className="app-fileds">
              <span>Email <b>*</b></span>
              <input type="email" name="email" value={initValue.email}onChange={onChangeHandle} />
              {initError.emailError && (<p className="app-error-line">{initError.emailError}</p>)}
            </div>
            <div className="app-fileds">
              <span>Phone <b>*</b></span>
              <input type="text" name="phone" value={initValue.phone} onChange={onChangeHandle} />
              {initError.phoneError && (<p className="app-error-line">{initError.phoneError}</p>)}
            </div>
            <div className="app-action">
              <button className="add-btnDetails" type="submit">Edit Item</button>
              <button className="add-btnDetails" type="button" onClick={props.handleClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
