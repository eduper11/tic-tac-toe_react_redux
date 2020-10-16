import React from 'react';
import './styles/index.scss';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Provider } from 'react-redux';
import store from './store';

function App() {
    return (
        <Provider store={store}>
            <div className='app'>
                <Header />
                <Main />
                <Footer />
            </div>
        </Provider>
    );
}

export default App;
