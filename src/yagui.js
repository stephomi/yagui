define([
  'GuiMain',
], function (GuiMain) {

  'use strict';

  var yagui = {};
  yagui.GuiMain = GuiMain;
  window.yagui = yagui;

  return yagui;
});