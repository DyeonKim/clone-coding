import React from 'react';
import Contact from './Contact';
import Counter from './Counter';

class App extends React.Component {
    render(){
        return (
            <div>
                <Contact/>
                <hr/>
                <Counter/>
            </div>
        );
    }
}

export default App;
