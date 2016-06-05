define(function (require, exports, module) {

  'use strict';

  var GuiMain = require('GuiMain');

  var yagui = {};
  yagui.GuiMain = GuiMain;
  window.yagui = yagui;

  module.exports = yagui;
});
