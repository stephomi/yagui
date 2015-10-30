define(function (require, exports, module) {

  'use strict';

  var Menu = require('containers/Menu');
  var EditStyle = require('utils/EditStyle');

  var Topbar = function (callbackResize) {
    this.domTopbar = document.createElement('div');
    this.domTopbar.className = 'gui-topbar';

    this.domUl = document.createElement('ul');
    this.domTopbar.appendChild(this.domUl);

    this.callbackResize = callbackResize;
    this.uiExtra = {};
  };

  Topbar.prototype = {
    _updateViewportPosition: function (viewport) {
      var h = this.domTopbar.hidden ? 0 : this.domTopbar.offsetHeight;
      viewport.style.top = h + 'px';
      viewport.style.height = (viewport.clientHeight - h) + 'px';
    },
    _onChangeColor: function (callback, color) {
      callback(color);
      this.uiExtra.overallColor.setValue(EditStyle._curWidgetColor, true);
      this.uiExtra.widgetColor.setValue(EditStyle._curWidgetColor, true);
      this.uiExtra.backColor.setValue(EditStyle._curBackgroundColor, true);
      this.uiExtra.textColor.setValue(EditStyle._curTextColor, true);
    },
    addMenu: function (name) {
      var menu = new Menu();
      var li = document.createElement('li');
      li.innerHTML = name || '';
      this.domUl.appendChild(li);
      li.appendChild(menu.domUl);
      menu._setDomContainer(li);
      return menu;
    },
    addExtra: function () {
      var cb = this._onChangeColor;
      var menu = this.addMenu('Extra UI');
      var ext = this.uiExtra;
      menu.addTitle('Overall');
      ext.overallColor = menu.addColor('', EditStyle._curWidgetColor, cb.bind(this, EditStyle.changeOverallColor));

      menu.addTitle('Advanced');
      ext.widgetColor = menu.addColor('Widget', EditStyle._curWidgetColor, cb.bind(this, EditStyle.changeWidgetsColor));
      ext.backColor = menu.addColor('Back', EditStyle._curBackgroundColor, cb.bind(this, EditStyle.changeBackgroundColor));
      ext.textColor = menu.addColor('Text', EditStyle._curTextColor, cb.bind(this, EditStyle.changeTextColor));
      ext.showBorder = menu.addCheckbox('Border', EditStyle._curShowBorder, EditStyle.changeDisplayBoorder);
      return menu;
    },
    setVisibility: function (visible) {
      this.domTopbar.hidden = !visible;
      this.callbackResize();
    }
  };

  module.exports = Topbar;
});