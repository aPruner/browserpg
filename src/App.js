import React from 'react';

// Wrapper React component to which other components can be added
// outside of the game canvas element (chat, login, etc)
function App(props) {
  return (
    <div className="game">
      {props.game}
    </div>
  );
}

export default App;