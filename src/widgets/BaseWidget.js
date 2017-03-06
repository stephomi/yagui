class BaseWidget {

  constructor() {}

  _getInitialValue(valOrObject, callbackOrKey) {
    if (typeof callbackOrKey !== 'string') return valOrObject;
    return valOrObject[callbackOrKey];
  }

  _getCheckCallback(valOrObject, callbackOrKey) {
    if (typeof callbackOrKey !== 'string') return callbackOrKey;
    return function (val) {
      valOrObject[callbackOrKey] = val;
    };
  }

  _setDomContainer(container) {
    this.domContainer = container;
  }

  setCallback(callback) {
    this.callback = callback;
  }

  setVisibility(visible) {
    if (!this.domContainer) return;
    this.domContainer.hidden = !visible;
  }
}

export default BaseWidget;
