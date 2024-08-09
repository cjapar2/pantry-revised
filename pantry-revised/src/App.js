import './styles/App.css';
import { List } from './components/List';
// import { TopBar } from './components/TopBar';
import { LeftDrawer } from './components/LeftDrawer';
import { ListTabs } from './components/ListTabs';
import { ItemsProvider } from './components/contexts/ItemsContext';
import { SidePanel } from './components/sidePanelComponents/SidePanel';

function App() {
  return (
    <div className="App">
      {/* <TopBar /> */}
      <ListTabs />
      <LeftDrawer />
      <ItemsProvider>
        <List />
      </ItemsProvider>
    </div>
  );
}

export default App;
