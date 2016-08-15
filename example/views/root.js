
import React from 'react';

require('../css/index.css');

import Header from './header';
import Footer from './footer';
import TodoApp from './todoApp';

export default class Root extends React.Component{
    render(){
        return (
            <div className='app'>
                <Header />
                <TodoApp />
                <Footer />
            </div>
        )
    }
}