import { VscChromeClose } from "react-icons/vsc";

export const Delete = (props) => {
  return (
    <div className="popup">
      <div className="popup-inner del-props">
        <div className="popup-heading-add">
          <h5>Delete Contact</h5>
          <span onClick={props.handleClose}><VscChromeClose /></span>
        </div>
        <div className="popup-details">
          <div className="app-popup-inside">
            <div className="app-delete-details">
              <p>Are you sure you want to delete the contact:</p>
              <p className="app-del-item"><span>Name:</span> &nbsp;{props.delItem.name}</p>
              <p className="app-del-item"><span>Email:</span> &nbsp;{props.delItem.email}</p>
              <p className="app-del-item"><span>Phone:</span> &nbsp;{props.delItem.phone}</p>
            </div>
            <div className="app-action">
              <button className="add-btnDetails" type="button" onClick={props.handleClose}>Cancel</button>
              <button className="add-btnDetails" type="submit" onClick={props.deleteItem}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
