import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './routes/notfound';
import Home from './routes/home';
import Preview from './routes/preview';
import Submit from './routes/submit';
import '@styles/style.scss';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/preview" element={<Preview />}></Route>
          <Route path="/submit" element={<Submit />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
