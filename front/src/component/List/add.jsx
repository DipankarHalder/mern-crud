import React, { useState } from 'react';
import axios from 'axios';

const Add = (props) => {

    const [addItem, setAddItem] = useState({ title: '', body: '', author: '', email: '', phone: '', website: '' });
    const [Loading, setLoading] = useState(false);

    const handleChange = (e) => {
        e.persist();
        setAddItem({ ...addItem, [e.target.name]: e.target.value });
    }

    const addNewItem = (e) => {
        e.preventDefault();
        setLoading(true);

        const { title, body, author, email, phone, website } = addItem;
        const newData = { title, body, author, email, phone, website };
        axios
            .post("http://localhost:8000/api/items/", newData)
            .then((result) => {
                setLoading(false);
                setAddItem(result);
                props.history.push('/show/' + result.data.data._id)
            })
            .catch((error) => setLoading(false));
    }

    const backItem = (id) => { props.history.push({ pathname: '/list' }) }

    return (
        <div className="app-allForms">
            <div className="app-frmContainer">
                {Loading && <div><span>Loading...</span></div>}
                <form onSubmit={addNewItem} className="app-fwidth app-frms">
                    <div className="app-fwidth app-fileds">
                        <span>Title</span>
                        <input type="text" name="title" value={addItem.title || ""} onChange={handleChange} />
                    </div>
                    <div className="app-fwidth app-fileds">
                        <span>Body</span>
                        <textarea name="body" value={addItem.body || ""} onChange={handleChange}></textarea>
                    </div>
                    <div className="app-fwidth app-fileds">
                        <span>Author</span>
                        <input type="text" name="author" value={addItem.author || ""} onChange={handleChange} />
                    </div>
                    <div className="app-fwidth app-fileds">
                        <span>Email</span>
                        <input type="email" name="email" value={addItem.email || ""} onChange={handleChange} />
                    </div>
                    <div className="app-fwidth app-fileds">
                        <span>Phone</span>
                        <input type="text" name="phone" value={addItem.phone || ""} onChange={handleChange} />
                    </div>
                    <div className="app-fwidth app-fileds">
                        <span>Website</span>
                        <input type="text" name="website" value={addItem.website || ""} onChange={handleChange} />
                    </div>
                    <div className="app-fwidth app-action">
                        <button className="add-btnDetails" type="submit">Add Item</button>
                        <button className="add-btnDetails" type="button" onClick={() => { backItem(addItem._id) }}>Back</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Add;