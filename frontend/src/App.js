import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './component/common/footer';
import Header from './component/common/header';
import Home from './component/Home';
import Add from './component/List/add';
import Edit from './component/List/edit';
import List from './component/List/list';
import Show from './component/List/show';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <section className="app-fwidth app-body">
                <div className="app-container">
                    <div className="app-fwidth">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/list" component={List} />
                            <Route exact path="/add" component={Add} />
                            <Route exact path="/show/:id" component={Show} />
                            <Route exact path="/edit/:id" component={Edit} />
                        </Switch>
                    </div>
                </div>
            </section>
            <Footer />
        </BrowserRouter>
    );
}
export default App;
