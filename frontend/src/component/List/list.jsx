import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';

const List = (props) => {
    const [items, setItems] = useState([]);
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
        axios
            .get("http://localhost:8000/api/items/")
            .then(res => {
                setItems(res.data.data);
                setLoading(false);
            })
            .catch(error => setLoading(true));
    }, []);
    const detailsItem = (id) => { props.history.push({ pathname: '/show/' + id }) }
    
    return (
        <div className="app-fwidth app-listContent">
            {Loading && (<div>Loading...</div>)}
            {items.reverse().map((item, i) => {
                let itemId = item._id.slice(16, 24);
                let itemTitle = item.title.slice(0, 70);
                let itemBody = item.body.slice(0, 250);
                return (
                    <div className="app-left app-itemsWrapper" key={i}>
                        <h3 className="app-fwidth app-heading">{item.title === itemTitle ? itemTitle : `${itemTitle}...`}</h3>
                        <div className="app-left app-itemWrapInfo">
                            <div className="app-wpinfo app-left">
                                <span>Article Id</span>
                                <p>{itemId}</p>
                            </div>
                            <div className="app-wpinfo app-left">
                                <span>Posted Date</span>
                                <p>{moment(item.createdAt).format('ll')}</p>
                            </div>
                            <div className="app-wpinfo app-left">
                                <span>Updated Date</span>
                                <p>{moment(item.updatedAt).format('ll')}</p>
                            </div>
                        </div>
                        <div className="app-fwidth app-shortDesc">
                            <h6>Description</h6>
                            <div className="app-fwidth app-descpt">
                                {item.body === itemBody ? itemBody : `${itemBody}...`}
                            </div>
                        </div>
                        <div className="app-fwidth app-authorinfo">
                            <span>Author information:</span>
                            <h6>{item.author}</h6>
                            <p>{item.email}</p>
                        </div>
                        <div className="app-fwidth app-action">
                            <span className="add-btnDetails" onClick={() => { detailsItem(item._id) }}>view more</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default List;