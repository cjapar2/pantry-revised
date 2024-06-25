import './styles/App.css';
import { List } from './components/List';
// import { TopBar } from './components/TopBar';
import { LeftDrawer } from './components/LeftDrawer';

function App() {
  return (
    <div className="App">
      {/* <TopBar /> */}
      <LeftDrawer />
      <List />
    </div>
  );
}

export default App;
