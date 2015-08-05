var CharacterDispatcher = require('../dispatcher/character-dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CharacterConstants = require('../constants/character-constants');

var CHANGE_EVENT = 'change';

var _characterData = null;

function init(){
  return {info: {}, stats:{}}
}

function newCharacter(){
  _characterData = init();
}

function loadCharacter(){
  var lsData = localStorage['character'];
  _characterData = lsData ? JSON.parse(lsData) : init();
}

function saveCharacter(){
  localStorage = JSON.stringify(_characterData);
}

function update(data){
  _characterData = assign(_characterData, data);
}

var CharacterStore = assign({}, EventEmitter.prototype, {
  getCharacter(){
    return _characterData || init();
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

CharacterDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case CharacterConstants.NEW_CHARACTER:
      newCharacter();
      CharacterStore.emitChange();
      break;

    case CharacterConstants.UPDATE:
      update(action.data);
      CharacterStore.emitChange();
      break;

    default:
      // no op
  }
});

export default CharacterStore;
