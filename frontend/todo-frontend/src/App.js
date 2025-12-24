import React, {useEffect, useState} from 'react';
import Login from './Login';
import TodoList from './TodoList';
import API, { setAuthToken } from './Api';
import './App.css';  

function App(){
  const [logged, setLogged] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){ setAuthToken(token); setLogged(true); }
  },[]);

  if(!logged) return <Login onLogin={()=>setLogged(true)} />;

  return (
    <div className="App">
      <h2>My Todo App</h2>
      <button onClick={()=>{
        localStorage.removeItem('token');
        setAuthToken(null);
        window.location.reload();
      }}>Logout</button>
      <TodoList />
    </div>
  );
}

export default App;
