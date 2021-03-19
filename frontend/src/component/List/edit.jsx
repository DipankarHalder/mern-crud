import axios from 'axios';
import { useEffect, useState } from 'react';

const Edit = (props) => {
    const apiPath = 'http://localhost:8000/api/items';
    const [addItem, setAddItem] = useState({ title: '', body: '', author: '', email: '', phone: '', website: '' });
    const [Loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(false);
        axios
            .get(`${apiPath}/${props.match.params.id}`)
            .then(res => {
                setAddItem(res.data.data);
                setLoading(false);
            })
            .catch(error => setLoading(true));
    }, [props.match.params.id]);
    const handleChange = (e) => {
        e.persist();
        setAddItem({ ...addItem, [e.target.name]: e.target.value });
    }
    const updateItem = (e) => {
        e.preventDefault();
        setLoading(true);
        const { title, body, author, email, phone, website } = addItem;
        const newData = { title, body, author, email, phone, website };
        axios
            .put(`${apiPath}/${props.match.params.id}`, newData)
            .then((result) => {
                setLoading(false);
                props.history.push('/show/' + result.data.data._id);
            })
            .catch((error) => setLoading(false));
    };
    const backItem = (id) => { props.history.push({ pathname: '/show/' + id }) }

    return (
        <div className="app-allForms">
            <div className="app-frmContainer">
                {Loading && <div><span>Loading...</span></div>}
                <form onSubmit={updateItem} className="app-fwidth app-frms">
                    <h3>Add Article</h3>
                    <div className="app-fwidth app-fileds">
                        <span>Title</span>
                        <input type="text" name="title" value={addItem.title} onChange={handleChange} />
                    </div>
                    <div className="app-fwidth app-fileds">
                        <span>Body</span>
                        <textarea name="body" value={addItem.body} onChange={handleChange}></textarea>
                    </div>
                    <div className="app-fwidth app-fileds">
                        <span>Author</span>
                        <input type="text" name="author" value={addItem.author} onChange={handleChange} />
                    </div>
                    <div className="app-fwidth app-fileds">
                        <span>Email</span>
                        <input type="email" name="email" value={addItem.email} onChange={handleChange} />
                    </div>
                    <div className="app-fwidth app-fileds">
                        <span>Phone</span>
                        <input type="text" name="phone" value={addItem.phone} onChange={handleChange} />
                    </div>
                    <div className="app-fwidth app-fileds">
                        <span>Website</span>
                        <input type="text" name="website" value={addItem.website} onChange={handleChange} />
                    </div>
                    <div className="app-fwidth app-action">
                        <button className="add-btnDetails" type="submit">Update Article</button>
                        <button className="add-btnDetails" type="button" onClick={() => { backItem(addItem._id) }}>Back</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Edit;