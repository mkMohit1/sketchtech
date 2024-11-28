import './App.css';
import MainContainer from './components/MainContainer';
import SideBar from './components/Sidebar';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <div className="App">
      <SideBar/>
      <MainContainer />
    </div>
  );
}

export default App;
