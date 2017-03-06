import BaseWidget from 'widgets/BaseWidget';

class Checkbox extends BaseWidget {

  constructor(valOrObject, callbackOrKey) {
    super();

    var value = this._getInitialValue(valOrObject, callbackOrKey);
    var callback = this._getCheckCallback(valOrObject, callbackOrKey);
    this.domCheckbox = document.createElement('input');
    this.domCheckbox.className = 'gui-input-checkbox';
    this.domCheckbox.type = 'checkbox';

    this.domLabelCheckbox = document.createElement('label');

    this.setValue(value === undefined ? true : value);
    this.setCallback(callback);
  }

  _onMouseDown() {
    this.setValue(!this.domCheckbox.checked);
  }

  setValue(val, ignoreCB) {
    this.domCheckbox.checked = val;
    if (!ignoreCB && this.callback) this.callback(val);
  }

  getValue() {
    return this.domCheckbox.checked;
  }
}

export default Checkbox;
