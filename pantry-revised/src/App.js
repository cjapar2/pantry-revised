import './styles/App.css';
import { List } from './components/List';
import { TopBar } from './components/TopBar';

function App() {
  return (
    <div className="App">
      <TopBar />
      <List />
    </div>
  );
}

export default App;
