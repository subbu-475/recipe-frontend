import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Recipe from './pages/Recipe';
import Searchrecipes from './pages/Searchrecipes';
import SignUp from './pages/SignUp';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/recipe/:id' element={<Recipe/>}/>
          <Route path='/search/:keyword' element={<Searchrecipes/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
