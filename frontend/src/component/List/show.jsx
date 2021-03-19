import axios from 'axios';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';

const Show = (props) => {
    const apiPath = 'http://localhost:8000/api/items';
    const [viewItems, setViewItems] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [deleteMsg, setDeleteMsg] = useState(false);
    useEffect(() => {
        setLoading(false);
        axios
            .get(`${apiPath}/${props.match.params.id}`)
            .then(res => {
                setViewItems(res.data.data);
                setLoading(false);
            })
            .catch(() => setLoading(true));
    }, [props.match.params.id]);

    const editItem = (id) => { props.history.push({ pathname: '/edit/' + id }) };
    const backItem = () => { props.history.push({ pathname: '/list' }) };
    const deleteItem = (id) => {
        setLoading(false);
        const { title, body, author, email, phone, website } = viewItems;
        const itemdelete = { title, body, author, email, phone, website };
        axios
            .delete(`${apiPath}/${props.match.params.id}`, itemdelete)
            .then(() => {
                setDeleteMsg(true);
                setTimeout(() => { props.history.push('/list') }, 2000);
            })
            .catch((error) => error);
    }

    return (
        <div className="app-fwidth app-DetailsList">
            {Loading && <div><span>Loading...</span></div>}
            {deleteMsg && <div><span>The Article is deleted successfully.</span></div>}
            {
                <Fragment>
                    <h3 className="app-Detailheading">{viewItems.title}</h3>
                    <div className="app-splInfo">
                        <div className="app-detailsId"><span>Article id &nbsp;-&nbsp; {viewItems._id}</span></div>
                        <div className="app-detailsPost"><span>Posted Date &nbsp;-&nbsp; {moment(viewItems.createdAt).format('ll')}</span></div>
                        <div className="app-detailsUpdate"><span>Updated Date &nbsp;-&nbsp; {moment(viewItems.updatedAt).format('ll')}</span></div>
                    </div>
                    <div className="app-fwidth app-shortDesc desc">
                        <h6>Description</h6>
                        <div className="app-fwidth app-descpt">{viewItems.body}</div>
                    </div>
                    <div className="app-fwidth app-authorinfo">
                        <span>Author information:</span>
                        <h6><b>Name&nbsp;:</b>&nbsp; {viewItems.author}</h6>
                        <p><b>Email&nbsp;:</b>&nbsp; {viewItems.email}</p>
                        <p><b>Phone&nbsp;:</b>&nbsp; {viewItems.phone}</p>
                        <p><b>Website&nbsp;:</b>&nbsp; {viewItems.website}</p>
                    </div>
                    <div className="app-fwidth app-action">
                        <span className="add-btnDetails" onClick={() => { editItem(viewItems._id) }}>Edit</span>
                        <span className="add-btnDetails" onClick={() => { deleteItem(viewItems._id) }}>Delete</span>
                        <span className="add-btnDetails" onClick={() => { backItem() }}>Back</span>
                    </div>
                </Fragment>
            }
        </div>
    )
}

export default Show;