import './App.css';
import './fonts.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AddTask from './components/AddTask'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='container'>
    <p>To Do List</p>
    <div className='app'>
    <BrowserRouter>
    <Routes>
      <Route path = '/' element ={<AddTask/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
