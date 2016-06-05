define(function (require, exports, module) {

  'use strict';

  var GuiUtils = require('utils/GuiUtils');
  var BaseContainer = require('containers/BaseContainer');
  var MenuButton = require('widgets/MenuButton');

  var Menu = function () {
    this.domUl = document.createElement('ul');
  };

  Menu.prototype = {
    addButton: function (name, callbackOrObject, shortcutOrKey, shortcut) {
      var widget = new MenuButton(callbackOrObject, shortcutOrKey, shortcut);
      var domLine = this._addLine(name);
      domLine.appendChild(widget.domSpan);
      widget._setDomContainer(domLine);
      return widget;
    },
    addSlider: function (name, valOrObject, callbackOrKey, min, max, step) {
      var wid = BaseContainer.prototype.addSlider.call(this, name, valOrObject, callbackOrKey, min, max, step);
      // label 36% + slider ?% + 2% + input 18%
      wid.domInputText.style.width = '18%';
      wid.domSlider.style.width = name ? '44%' : '80%';
      return wid;
    }
  };

  GuiUtils.makeProxy(BaseContainer, Menu);

  module.exports = Menu;
});
