define(function (require, exports, module) {

  'use strict';

  var GuiUtils = require('utils/GuiUtils');
  var BaseWidget = require('widgets/BaseWidget');

  var Checkbox = function (valOrObject, callbackOrKey) {
    var value = this._getInitialValue(valOrObject, callbackOrKey);
    var callback = this._getCheckCallback(valOrObject, callbackOrKey);
    this.domCheckbox = document.createElement('input');
    this.domCheckbox.className = 'gui-input-checkbox';
    this.domCheckbox.type = 'checkbox';

    this.domLabelCheckbox = document.createElement('label');

    this.setValue(value === undefined ? true : value);
    this.setCallback(callback);
  };

  Checkbox.prototype = {
    _onMouseDown: function () {
      this.setValue(!this.domCheckbox.checked);
    },
    setValue: function (val, ignoreCB) {
      this.domCheckbox.checked = val;
      if (!ignoreCB && this.callback) this.callback(val);
    },
    getValue: function () {
      return this.domCheckbox.checked;
    }
  };

  GuiUtils.makeProxy(BaseWidget, Checkbox);

  module.exports = Checkbox;
});