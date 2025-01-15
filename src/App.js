import './App.css';
import Combs from './components/combs/combs';
import Stopwatch from './components/stopwatch/stopwatch';
import { useState } from 'react';

function App() {
  const [difficulty, setDifficulty] = useState('basic');
  const [showCombs, setShowCombs] = useState(false);

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
          <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '20px', 
              margin: '20px 0' }}>
            <label>
              <input 
                type="radio" 
                name="difficulty" 
                value="basic"
                checked={difficulty === 'basic'}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              Basic
            </label>
            <label>
              <input 
                type="radio" 
                name="difficulty" 
                value="intermediate"
                checked={difficulty === 'intermediate'} 
                onChange={(e) => setDifficulty(e.target.value)}
              />
              Intermediate  
            </label>
            <label>
              <input 
                type="radio" 
                name="difficulty" 
                value="advanced"
                checked={difficulty === 'advanced'}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              Advanced
            </label>
          </div>
          <button onClick={() => {
            setShowCombs(false); // Reset first
            setTimeout(() => setShowCombs(true), 0); // Then show new combos
          }}>Generate Combos</button>
          {showCombs && <Combs diff={difficulty} />}
        </div>
        <Stopwatch />
      </div>
      <footer className='App-footer'>
        created by Azmayen Murshid
      </footer>
    </div>
  );
}

export default App;
