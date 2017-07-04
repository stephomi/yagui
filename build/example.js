'use strict';

// when adding a widget the signature is usually
// [name, initvalue, callbackOnChange]
//         or
// [name, object, key]

var viewport = document.getElementById('viewport'); // optional

///// example callback - compute gradient on a canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var computeGradient = function (color) {
  color = window.lastColor = color || window.lastColor;
  ctx.rect(0, 0, canvas.width, canvas.height);
  var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  var r = parseInt(color[0] * 255, 10);
  var g = parseInt(color[1] * 255, 10);
  var b = parseInt(color[2] * 255, 10);
  grd.addColorStop(0, 'rgb(' + r + ',' + g + ',' + b + ')');
  grd.addColorStop(1, '#004CB3');
  ctx.fillStyle = grd;
  ctx.fill();
};
var cbResizeCanvas = computeGradient; // optional

var main = new window.yagui.GuiMain(viewport, cbResizeCanvas); // main gui

//////// TOP BAR /////////
var topbar = main.addTopbar(); // top bar
var menutopbar1 = topbar.addMenu('Named widgets'); // menu
menutopbar1.addTitle('Title1');
menutopbar1.addSlider('Slider' /*initValueOrObject, callbackOrKey, min, max, step*/ );
menutopbar1.addCombobox('Combo' /*, initValueOrObject, callbackOrKey, options*/ );
menutopbar1.addCheckbox('Tick me' /*initValueOrObject, callbackOrKey */ );
menutopbar1.addButton('A topbar button !' /*,callbackOrObject, key*/ );
menutopbar1.addColor('Color' /*initValueOrObject, callbackOrKey */ , null, computeGradient);

var menutopbar2 = topbar.addMenu('Unnamed widgets'); // no margin if the widgets has no name + topbar
menutopbar2.addTitle();
menutopbar2.addSlider(null, null, null, -50, 50, 2);
menutopbar2.addCombobox(null, null, null, ['one', 2, 'three']);
menutopbar2.addColor(null, null, computeGradient);

//////// RIGHT SIDEBAR /////////
var rightbar = main.addRightSidebar(cbResizeCanvas); // right bar
var menuright1 = rightbar.addMenu('sidebar menu');
menuright1.addTitle('Title 1');
menuright1.addSlider('Slider');
menuright1.addCombobox('Combo', 1, null, ['one', 2, 'three']);
menuright1.addTitle('Title 2');
menuright1.addCheckbox('Tick me');
menuright1.addButton('One button !');

var menuright2 = rightbar.addMenu('Another sidebar menu');
menuright2.addTitle('Another title');
menuright2.addColor('Blue', [0.5, 0.5, 1.0], computeGradient);
menuright2.addDualButton('button1', 'button2' /*, callbackOrObject1, callbackOrObject2, key1, key2*/ );

//////// EXTRA //////
topbar.addExtra(); // useless extra custom ui
// var leftbar = main.addLeftSidebar(cbResizeCanvas); // add a left sidebar

computeGradient([1.0, 1.5, 1.0]);