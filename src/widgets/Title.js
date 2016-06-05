define(function (require, exports, module) {

  'use strict';

  var GuiUtils = require('utils/GuiUtils');
  var BaseWidget = require('widgets/BaseWidget');

  var Title = function (name) {
    this.domText = document.createElement('div');
    this.domText.innerHTML = name || '';
    this.domText.className = 'group-title';
  };

  Title.prototype = {
    setText: function (text) {
      this.domText.innerHTML = text;
    },
    setVisibility: function (visible) {
      this.domText.hidden = !visible;
    }
  };

  GuiUtils.makeProxy(BaseWidget, Title);

  module.exports = Title;
});
