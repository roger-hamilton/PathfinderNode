var React = require('react');

var CharacterSheet = require('./character-sheet');

class App extends React.Component {
  render(){
    return (
      <div className="container">
        <CharacterSheet />
      </div>
    );
  }
}

React.render(<App />, document.body);
