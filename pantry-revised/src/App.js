import './styles/App.css';
import { List } from './components/List';
// import { TopBar } from './components/TopBar';
import { LeftDrawer } from './components/LeftDrawer';
import { ListTabs } from './components/ListTabs';

function App() {
  return (
    <div className="App">
      {/* <TopBar /> */}
      {/* <ListTabs /> */}
      <LeftDrawer />
      <List />
    </div>
  );
}

export default App;
