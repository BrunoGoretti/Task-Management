import React from 'react';
import './App.css';
import TaskList from './components/TaskList.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TaskList />
      </header>
    </div>
  );
}

export default App;