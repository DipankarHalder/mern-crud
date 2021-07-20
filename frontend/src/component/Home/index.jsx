import axios from 'axios';
import moment from 'moment';
import { useEffect, useState, Fragment } from 'react';
import { baseUrl } from '../config';
import { VscSync, VscTrash, VscEdit } from "react-icons/vsc";
import { FiPlusCircle } from "react-icons/fi";
import { Add } from './add';
import { Edit } from './edit';
import { Delete } from './delete';

export const Home = () => {

  // fetch contact items
  const [items, isItems] = useState(null);
  const [loading, isLoading] = useState(false);
  const [showAdd, isShowAdd] = useState(false);
  const getFetchItem = async () => {
    try {
      const res = await axios(`${baseUrl}/items/`);
      const data = await res.data;
      isLoading(true);
      isItems(data);
    } catch (err) { 
      isLoading(false); 
    }
  }
  useEffect(() => getFetchItem(), []);


  // add contact item
  const openAddPopupBox = () => {
    isShowAdd(true);
  }

  // edit contact item
  const [editShow, isEditShow] = useState(false);
  const [editItem, isEditItem] = useState(null);
  const handleEdit = (item) => {
    isEditItem(item);
    isEditShow(true);
  }

  // delete contact item
  const [delShow, isDelShow] = useState(false);
  const [delItem, isDelItem] = useState(null);
  const deleteItem = async () => {
    try {
      const res = await axios.delete(`${baseUrl}/items/${delItem._id}`);
      if(res.data.msg === "User successfully deleted") {
        getFetchItem();
        isDelShow(false);
      }
    } catch (err) { 
      isDelShow(true);
    }
  }
  const handleDelete = (item) => {
    isDelItem(item);
    isDelShow(true);
  }

  // close all item
  const handleClose = () => {
    isShowAdd(false);
    isEditShow(false);
    isDelShow(false);    
  }

  return (
    <Fragment>
      {!loading ? (
        <div className="app-loading-div">
          <VscSync /> &nbsp;Loading, Please wait....
        </div>
      ) : (
        <div className="app-fwidth">
          <div className="app-itemList">
            {items && items.data.length ? (
              <Fragment>
                <div className="app-items headingTable">
                  <div className="app-item-postdate">Created Date</div>
                  <div className="app-item-updatedate">Last Update</div>
                  <div className="app-item-name">Name</div>
                  <div className="app-item-email">Email</div>
                  <div className="app-item-phone">Phone</div>
                  <div className="app-item-edit">&nbsp;</div>
                  <div className="app-item-delete">&nbsp;</div>
                </div>
                {items.data.map(item => {
                  let itemName = item.name.slice(0, 70);
                  let itemEmail = item.email.slice(0, 30);

                  return (
                    <div className="app-items" key={item._id}>
                      <div className="app-item-postdate">
                        {moment(item.updatedAt).format('ll')}
                      </div>
                      <div className="app-item-updatedate">
                        {moment(item.updatedAt).format('lll')}
                      </div>
                      <div className="app-item-name">
                        {item.name === itemName ? 
                          itemName : 
                          `${itemName}...`}
                      </div>
                      <div className="app-item-email">
                        {item.email === itemEmail ? 
                          itemEmail : 
                          `${itemEmail}...`}
                      </div>
                      <div className="app-item-phone">
                        {item.phone}
                      </div>
                      <div 
                        className="app-item-edit" 
                        onClick={() => handleEdit(item)}>
                          <VscEdit />
                      </div>
                      <div 
                        className="app-item-delete" 
                        onClick={() => handleDelete(item)}>
                          <VscTrash />
                      </div>
                    </div>
                  )})
                }
                <span 
                  className="app-add-new-contact" 
                  onClick={openAddPopupBox}>
                    <FiPlusCircle /> &nbsp;&nbsp;Add New Contact
                </span>
              </Fragment>
            ) : (
              <div className="app-add-screen">
                <div className="app-empty-icon">
                  <svg x="0px" y="0px" viewBox="0 0 384 384"><path d="M339,384c-26,0-52,0-78,0c-5.5-3.8-7.1-8.7-3.3-12.2c1.8-1.6,4.9-2.6,7.4-2.7c22.9-0.2,45.7-0.1,68.6-0.1c7.8,0,14.2-4.4,15.2-11.7c0.8-5.9,0.2-12.1,0.2-18c-81.4,0-162.7,0-244,0c-0.5,10.1,1.5,20.2-4.1,29.7c15.6,0,30.4,0,45.3,0c16.2,0,32.5,0,48.7,0c4.1,0,7,2.1,7.9,5.6c0.9,3.2-0.5,6.4-3.8,8.6c-0.4,0.3-0.8,0.6-1.2,0.9c-42.5,0-85,0-127.5,0c-19.5-4.9-25.8-19-25.7-36.7C45.2,258.2,45,169.1,45,80.1c0-1.6,0-3.2,0-5.1c-11.9,0-23.3-0.2-34.8,0.1c-4.6,0.1-8-1.3-10.2-5.3C0,55,0,40.3,0,25.5c0.2-0.4,0.5-0.9,0.6-1.3C4.2,9.1,15.6,0,31.1,0c83.4,0,166.7-0.1,250.1,0c15.8,0,27.4,7.4,34.6,21.5c0.9,1.8,1.9,2.5,3.9,2.5c8.5,0.1,17-0.1,25.5,0.9c10.9,1.2,21.7,3.3,32.5,5.3c4.9,0.9,7.3,5.2,5.9,9.6c-0.5,1.6-1.4,3.2-2.2,4.8c-17.2,33.1-37.1,64.5-59.6,94.3c-1.3,1.7-2.2,4.2-2.2,6.4c-0.1,58.2-0.1,116.5-0.1,174.7c0,1.3,0,2.6,0,4.1c12.5,0,24.5,0,36.5,0c5.5,0,8.4,2.9,8.5,8.2c0.1,7.5,0.1,15,0,22.5c-0.3,12.8-8.7,23.9-20.9,27.8C342.1,383,340.5,383.5,339,384z M57.5,15c0.9,6.2,2.4,12.3,2.4,18.4C60.1,78.3,60,123.1,60,168c0,61.6,0,123.2,0,184.9c0,9.4,6.3,16.2,15,16.1c8.7,0,14.9-6.8,14.9-16.2c0-6.1,0-12.2,0-18.4c0-8.2,2.2-10.4,10.5-10.4c66.5,0,133,0,199.5,0c1.4,0,2.9,0,4.3,0c0-54.6,0-108.6,0-163.2c-4.6,5.1-9.1,9.6-13.1,14.4c-3.1,3.7-6.7,5-11.5,4.9c-10-0.3-19.9-0.1-30.5-0.1c2.8,5.7,5.4,10.9,8,16.1c2.9,5.9,2.4,8.5-2.8,12.6c-20.6,16.5-42.4,31.3-65.5,44.1c-1.1,0.6-2.6,1.6-2.7,2.6c-0.6,4.7-0.7,9.4-1.1,14.4c1.6,0.1,2.8,0.2,4,0.2c6,0,12-0.1,18,0.1c4.3,0.1,7.4,3.4,7.4,7.4c0,4-3.1,7.2-7.4,7.5c-0.7,0.1-1.5,0-2.2,0c-40.1,0-80.2,0-120.4,0c-1,0-2,0-3-0.1c-3.5-0.5-6.2-3.4-6.4-6.8c-0.3-3.4,1.9-6.7,5.3-7.7c1.4-0.4,3-0.4,4.4-0.4c26.9,0,53.7,0,80.6,0c1.5,0,2.9,0,4.7,0c0.4-7.5,1.6-14.7,1-21.7c-2.8-29.7-2.9-59.4,1.4-89c3.4-23.2,9.5-45.7,20.8-66.5c18.7-34.3,48.3-54,85.4-63.6c7-1.8,14.3-2.9,21.8-4.4c-5.2-7-11.9-9.9-20.2-9.9c-73.5,0-147,0-220.5,0C58.8,15,57.7,15,57.5,15z M296.9,75c6.1,0,11.2,0,16.3,0c5.3,0,8.5,2.9,8.6,7.3c0.1,4.7-3.2,7.6-8.7,7.7c-7.9,0-15.7,0-23.6,0c-16,0-16.1-0.1-28,10.7c-6.5,5.9-12.6,12.3-19.6,19.3c2.3,0,3.5,0,4.7,0c11.9,0,23.7,0,35.6,0c5.2,0,8.5,3.6,8,8.2c-0.4,4.1-3.6,6.7-8.4,6.7c-16.2,0-32.5,0.1-48.7,0c-2.2,0-3.6,0.5-5,2.4c-17.5,24.2-29.8,50.7-36.6,79.8c-1.4,6-2.3,12.1-3.7,19.1c19.6-11.3,37.3-23.3,54.3-36.7c-3.8-7.6-7.5-15-11.1-22.3c-3.3-6.8-0.1-12,7.5-12.1c12.4,0,24.7-0.2,37.1,0.1c3.5,0.1,5.7-1.1,8-3.6c24.8-27.6,46.1-57.8,65.2-89.5c4.6-7.7,9-15.5,13.6-23.5C348.8,49.8,312.2,64.5,296.9,75z M222.8,78.2c-18.5,13.9-41.6,80-37.1,106c0.6-1.4,1.1-2.5,1.6-3.6c5.7-14.3,12.3-28.2,21.3-40.7c6.2-8.6,10.2-17.5,10.3-28.1c0-1.9,0.4-3.7,0.6-5.6C220.5,96.9,221.6,87.7,222.8,78.2z M15,59.8c10.2,0,19.9,0,29.9,0c0-10.6,0.3-21-0.1-31.3c-0.3-7.8-7.5-13.7-15.3-13.4c-7.6,0.2-14.2,6.3-14.4,14C14.8,39.2,15,49.3,15,59.8z M234.7,105.3c0.7-0.4,1.1-0.6,1.3-0.8c8-7.4,15.9-14.7,23.9-22.1c0.7-0.7,1.3-1.5,1.7-2.4c5-10.6,10-21.2,15-31.8c0.4-0.8,0.6-1.7,1-3c-13.4,3.8-25.3,9.2-36.3,16.7c-1.1,0.7-1.7,2.7-1.9,4.1c-0.8,5.7-1.4,11.4-2.1,17.1C236.4,90.4,235.6,97.6,234.7,105.3z M286.6,62.3c16.6-7.8,33.1-15.5,49.6-23.3c-12.4,0.1-24.8,0.8-37.2,1.7c-1,0.1-2.5,0.9-2.9,1.8C292.7,49.1,289.6,55.9,286.6,62.3z"/><path d="M227.3,384c-0.6-0.4-1.2-0.8-1.8-1.3c-2.9-2.1-4.2-4.9-3.1-8.4c1.1-3.4,3.6-5.3,7.3-5.3c3.5,0.1,5.9,2,6.9,5.3c1.1,3.5-0.2,6.3-3.1,8.4c-0.6,0.4-1.2,0.8-1.8,1.3C230.3,384,228.8,384,227.3,384z"/><path d="M122.3,45c24.8,0,45,20.4,44.9,45.2c-0.1,24.7-20.4,44.9-45.2,44.8c-24.5-0.1-44.7-20.4-44.7-45C77.2,65.3,97.6,45,122.3,45z M122.3,60c-16.5,0-30,13.5-30,30.1c0,16.4,13.4,29.8,29.8,29.9c16.6,0.1,30.2-13.4,30.2-29.9C152.3,73.6,138.8,60,122.3,60z"/><path d="M114.4,255c-10.1,0-20.2,0-30.3,0c-5.5,0-8.9-2.8-9-7.3c-0.1-4.6,3.4-7.7,9-7.7c20.5,0,40.9,0,61.4,0c5.5,0,8.9,2.8,9,7.3c0.1,4.6-3.4,7.7-9,7.7C135.1,255,124.7,255,114.4,255z"/></svg>
                </div>
                <span onClick={openAddPopupBox}>
                  <FiPlusCircle /> &nbsp;&nbsp;Add New Contact
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {showAdd && (
        <Add 
          getFetchItem={getFetchItem} 
          handleClose={handleClose} />
      )}
      {editShow && (
        <Edit 
          editItem={editItem} 
          getFetchItem={getFetchItem} 
          handleClose={handleClose} />
      )}
      {delShow && (
        <Delete 
          delItem={delItem} 
          deleteItem={deleteItem} 
          handleClose={handleClose} />
      )}
    </Fragment>
  )
}
