// App.js
import React from 'react';
import './App.css';
import UserComponent from './UserComponent';

function App() {
    return (
        <div className="App">
              <h1>Welcome to My React App</h1>
              <h3>Halo test</h3>
            <main>
                <UserComponent />
            </main>
        </div>
    );
}

export default App;
