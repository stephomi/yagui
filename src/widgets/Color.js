define([
  'utils/GuiUtils',
  'widgets/BaseWidget'
], function (GuiUtils, BaseWidget) {

  'use strict';

  var vendors = ['-moz-', '-o-', '-webkit-', '-ms-', ''];
  var urlAlpha = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAChJREFUeNpiPHPmDAMMGBsbw9lMDDgA6RKM%2F%2F%2F%2Fh3POnj1LCzsAAgwAQtYIcFfEyzkAAAAASUVORK5CYII%3D")';

  var Color = function (valOrObject, callbackOrKey) {
    var value = this._getInitialValue(valOrObject, callbackOrKey);
    var callback = this._getCheckCallback(valOrObject, callbackOrKey);
    if (value) this.color = GuiUtils.getValidColor(value.slice());
    else this.color = [1.0, 0.0, 0.0];

    // container
    this.domColor = document.createElement('div');
    this.domColor.className = 'gui-widget-color';

    // input text
    this.domInputColor = document.createElement('input');
    this.domPopup = document.createElement('div');

    // hue picker
    this.domHue = document.createElement('div');
    this.domHue.className = 'gui-color-hue';
    this.domHueKnob = document.createElement('div');
    this.domHueKnob.className = 'gui-knob-hue';

    // saturation picker
    this.domSaturation = document.createElement('div');
    this.domSaturation.className = 'gui-color-saturation';
    var zAlphaSat = document.createElement('div');
    this.domSaturation.appendChild(zAlphaSat);
    this.domSaturationKnob = document.createElement('div');
    this.domSaturationKnob.className = 'gui-knob-saturation';

    this.domHue.appendChild(this.domHueKnob);
    this.domPopup.appendChild(this.domSaturationKnob);
    this.domPopup.appendChild(this.domSaturation);
    this.domPopup.appendChild(this.domHue);
    this.domColor.appendChild(this.domInputColor);
    this.domColor.appendChild(this.domPopup);

    this._hueGradient(this.domHue);
    this._linearGradient(zAlphaSat, 'top', 'rgba(0,0,0,0)', '#000');

    this.domColor.addEventListener('keydown', this._onInputDown.bind(this));
    this.domSaturation.addEventListener('mousedown', this._onSaturationDown.bind(this));
    this.domHue.addEventListener('mousedown', this._onHueDown.bind(this));
    window.addEventListener('mouseup', this._onMouseUp.bind(this));
    window.addEventListener('mouseout', this._onMouseUp.bind(this));
    window.addEventListener('mousemove', this._onMouseMove.bind(this));

    // alpha picker
    this.hasAlpha = this.color.length === 4;
    this.alpha = 1.0;
    if (this.hasAlpha) {
      this.domPopup.style.width = '142px';
      this.domAlpha = document.createElement('div');
      this.domAlpha.className = 'gui-color-alpha';
      this.domAlphaKnob = document.createElement('div');
      this.domAlphaKnob.className = 'gui-knob-alpha';

      this._alphaGradient(this.domAlpha, 'top', 'rgba(0,0,0,1.0)', 'rgba(0,0,0,0.0)');

      this.domAlpha.addEventListener('mousedown', this._onAlphaDown.bind(this));
      this.domAlpha.appendChild(this.domAlphaKnob);
      this.domPopup.appendChild(this.domAlpha);
    }

    this.editHue = this.editSaturation = this.editAlpha = false;
    this.widgetHeight = this.widgetWidth = 100;
    this.setValue(this.color);
    this.setCallback(callback);
  };

  Color.prototype = {
    _onInputDown: function (ev) {
      ev.stopPropagation();
      if (ev.keyCode === 13)
        this.setValue(GuiUtils.hexToRgb(ev.target.value));
    },
    _onUpdateSaturation: function (ev) {
      var rect = this.domSaturation.getBoundingClientRect();
      var hsv = GuiUtils.rgbToHsv(this.getValue());
      hsv[1] = Math.min(1.0, Math.max(0.0, (ev.clientX - rect.left) / rect.width));
      hsv[2] = Math.min(1.0, Math.max(0.0, 1.0 - (ev.clientY - rect.top) / rect.width));
      this.setValue(GuiUtils.hsvToRgb(hsv), false, true);
      this._updateGui();
    },
    _onUpdateHue: function (ev) {
      var rect = this.domHue.getBoundingClientRect();
      var hsv = GuiUtils.rgbToHsv(this.getValue());
      hsv[0] = Math.min(1.0, Math.max(0.0, 1.0 - (ev.clientY - rect.top) / rect.height));
      this.setValue(GuiUtils.hsvToRgb(hsv), false, true);
      this._updateGui();
    },
    _onUpdateAlpha: function (ev) {
      var rect = this.domAlpha.getBoundingClientRect();
      var col = this.getValue();
      col[3] = this.alpha = Math.min(1.0, Math.max(0.0, 1.0 - (ev.clientY - rect.top) / rect.height));
      this.setValue(col, false, true);
      this._updateGui();
    },
    _updateGui: function () {
      var color = this.getValue();
      var hsv = GuiUtils.rgbToHsv(color);

      this.domSaturationKnob.style.marginLeft = this.widgetWidth * hsv[1] - 7 + 'px';
      this.domSaturationKnob.style.marginTop = this.widgetHeight * (1.0 - hsv[2]) - 7 + 'px';

      hsv[1] = hsv[2] = 1.0;
      this._linearGradient(this.domSaturation, 'left', '#fff', GuiUtils.getStrColor(GuiUtils.hsvToRgb(hsv)));

      this.domHueKnob.style.marginTop = (1.0 - hsv[0]) * this.widgetHeight + 'px';

      if (this.hasAlpha && color[3] !== undefined)
        this.domAlphaKnob.style.marginTop = (1.0 - this.alpha) * this.widgetHeight + 'px';
    },
    _onMouseMove: function (ev) {
      if (!this.editSaturation && !this.editHue && !this.editAlpha) return;
      if (this.editSaturation) return this._onUpdateSaturation(ev);
      if (this.editHue) return this._onUpdateHue(ev);
      if (this.editAlpha) return this._onUpdateAlpha(ev);
    },
    _onSaturationDown: function (ev) {
      this.editSaturation = true;
      this._onMouseMove(ev);
    },
    _onHueDown: function (ev) {
      this.editHue = true;
      this._onMouseMove(ev);
    },
    _onAlphaDown: function (ev) {
      this.editAlpha = true;
      this._onMouseMove(ev);
    },
    _onMouseUp: function () {
      this.editHue = this.editSaturation = this.editAlpha = false;
    },
    _hueGradient: function (dom) {
      dom.style.background = '';
      for (var i = 0, l = vendors.length; i < l; ++i)
        dom.style.cssText += 'background: ' + vendors[i] + 'linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
    },
    _alphaGradient: function (dom, dir, col1, col2) {
      dom.style.background = '';
      for (var i = 0, l = vendors.length; i < l; ++i)
        dom.style.cssText += 'background: ' + vendors[i] + 'linear-gradient(' + dir + ', ' + col1 + ',' + col2 + '),' + urlAlpha + ';';
    },
    _linearGradient: function (dom, dir, col1, col2) {
      dom.style.background = '';
      for (var i = 0, l = vendors.length; i < l; ++i)
        dom.style.cssText += 'background: ' + vendors[i] + 'linear-gradient(' + dir + ', ' + col1 + ' 0%, ' + col2 + ' 100%);';
    },
    setValue: function (color, ignoreCB, ignoreUI) {
      var c = this.color;
      for (var i = 0, nbC = color.length; i < nbC; ++i)
        c[i] = color[i];

      var hex = GuiUtils.rgbToHex(color);
      this.domInputColor.value = hex;
      if (this.hasAlpha) {
        if (color.length >= 4) this.alpha = color[3];
        else color.push(this.alpha);
        var col = 'rgba(' + parseInt(color[0] * 255, 10) + ',' + parseInt(color[1] * 255, 10) + ',' + parseInt(color[2] * 255, 10) + ',' + this.alpha + ')';
        this._alphaGradient(this.domInputColor, '0deg', col, col);
      } else {
        this.domInputColor.style.background = hex;
      }

      // color of text
      var hsv = GuiUtils.rgbToHsv(color);
      this.domSaturationKnob.style.borderColor = (hsv[2] < 0.5 || hsv[1] > 0.5) ? '#fff' : '#000';
      this.domInputColor.style.color = (this.alpha > 0.2 && (hsv[2] < 0.5 || hsv[1] > 0.5)) ? '#fff' : '#000';
      if (!ignoreUI) this._updateGui();
      if (!ignoreCB && this.callback) this.callback(color);
    },
    getValue: function () {
      return this.color;
    }
  };

  GuiUtils.makeProxy(BaseWidget, Color);

  return Color;
});