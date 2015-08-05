var CharacterDispatcher = require('../dispatcher/character-dispatcher');
var CharacterConstants = require('../constants/character-constants');

var CharacterActions = {
  newCharacter: function() {
    CharacterDispatcher.dispatch({
      actionType: CharacterConstants.NEW_CHARACTER,
    });
  },
  update: function(data) {
    CharacterDispatcher.dispatch({
      actionType: CharacterConstants.UPDATE,
      data: data
    });
  }
};

export default CharacterActions;
