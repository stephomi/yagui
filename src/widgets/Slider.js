import BaseWidget from 'widgets/BaseWidget';

class Slider extends BaseWidget {

  constructor(valOrObject, callbackOrKey, min, max, step) {
    super();

    var value = this._getInitialValue(valOrObject, callbackOrKey);
    var callback = this._getCheckCallback(valOrObject, callbackOrKey);
    value = value !== undefined ? value : 100;
    min = min !== undefined ? min : 0;
    max = max !== undefined ? max : 200;
    step = step !== undefined ? step : 1;

    // slider
    this.domSlider = document.createElement('div');
    this.domSlider.className = 'gui-slider';
    this.domSliderFill = document.createElement('div');
    this.domSlider.appendChild(this.domSliderFill);

    // text input
    this.domInputText = document.createElement('input');
    this.domInputText.className = 'gui-input-number';
    this.domInputText.type = 'number';
    this.min = this.domInputText.min = min;
    this.max = this.domInputText.max = max;
    this.step = this.domInputText.step = step;

    this.domInputText.addEventListener('keydown', this._onKeyDown.bind(this));
    this.domInputText.addEventListener('change', this._onInputText.bind(this));
    this.domInputText.addEventListener('blur', this._onInputText.bind(this));
    this.domSlider.addEventListener('mousedown', this._onMouseDown.bind(this));
    window.addEventListener('mouseup', this._onMouseUp.bind(this), true);
    window.addEventListener('mousemove', this._onMouseMove.bind(this));

    this.lastValue = value;
    this.isDown = false;
    this.setValue(value);
    this.setCallback(callback);
  }

  _onInputText(ev) {
    var val = parseFloat(ev.target.value);
    if (val !== val || val === this.lastValue) return;
    this.setValue(val);
  }

  _onKeyDown(ev) {
    ev.stopPropagation();
    if (ev.which === 13) // enter
      this.domInputText.blur();
  }

  _onMouseMove(ev) {
    ev.preventDefault();
    if (!this.isDown)
      return;
    var rect = this.domSlider.getBoundingClientRect();
    var val = this.min + (this.max - this.min) * ((ev.clientX - rect.left) / rect.width);
    this.setValue(val);
  }

  _onMouseDown(ev) {
    this.isDown = true;
    this._onMouseMove(ev);
  }

  _onMouseUp() {
    this.isDown = false;
  }

  _setDomContainer(container) {
    this.domContainer = container;
  }

  getValue() {
    return parseFloat(this.domInputText.value);
  }

  setValue(val, ignoreCB) {
    this.lastValue = val;
    val = Math.max(Math.min(val, this.max), this.min);
    val = Math.round(val / this.step) * this.step;
    this.domInputText.value = val;
    var per = this.min;
    if (this.max !== this.min) per = (val - this.min) / (this.max - this.min);
    this.domSliderFill.style.width = 100 * per + '%';
    if (!ignoreCB && this.callback) this.callback(val);
  }

  setMax(max) {
    this.domInputText.max = this.max = max;
    return this;
  }

  setMin(min) {
    this.min = min;
    return this;
  }
}

export default Slider;
