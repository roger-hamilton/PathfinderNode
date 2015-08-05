var React = require('react');
var CharacterStore = require('./stores/character-store');

export default class CharacterSheet extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      character: CharacterStore.getCharacter()
    };
  }

  render(){
    console.log(this.state);
    return (
      <div className="row">
        <div className="col-xs-12">
          Character Sheet
        </div>
      </div>
    );
  }
}
