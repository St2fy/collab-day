import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Doc from './pages/doc'
import Home from './pages/home'
import { CalendarProvider } from './calendarContext';
import Navigation from './components/Navbar';

function App() {
  return (
    <div className="App">
      <CalendarProvider>
        <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/doc' element={<Doc/>}/>
        </Routes>
      </BrowserRouter>
      </CalendarProvider>
      

    </div>
  );

}

export default App;
