import './App.css';
import Combs from './components/combs';
import Stopwatch from './components/stopwatch/stopwatch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>TRAIN SMARTER &nbsp;&nbsp;&nbsp;&nbsp; FIGHT HARDER</p>
      </header>
      <div className="App-body">
        <div>
          <h2>Welcome to MACC &nbsp;&nbsp;|&nbsp;&nbsp; Generate unique combat combinations</h2>
          <p>
            Helps martial artists enhance their training by generating dynamic
            striking combinations. Whether you're a beginner learning the basics or
            an experienced fighter looking to add variety to your training, MACC
            provides customized combinations to help you:
          </p>
          <ul>
            <li>Improve your technique through varied combinations</li>
            <li>Develop muscle memory and flow</li>
            <li>Practice realistic fighting scenarios</li>
            <li>Keep your training fresh and challenging</li>
          </ul>
          <p>
            Get started below to generate your personalized striking combinations!
          </p>
          <button
            onClick={() => <Combs />}>Generate Combos</button>
        </div>
        <div className='Combination-display'>Generated combinationes will go here! coming soon!</div>
        <Stopwatch />
      </div>
      <footer className='App-footer'>
        created by Azmayen Murshid
      </footer>
    </div>
  );
}

export default App;
