import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from './component/common/header';
import { Footer } from './component/common/footer';
import { Home } from './component/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <section className="app-fwidth app-body">
        <div className="app-container">
          <div className="app-fwidth">
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </div>
        <Footer />
      </section>
    </BrowserRouter>
  );
}
export default App;
