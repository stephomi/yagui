import BaseWidget from 'widgets/BaseWidget';

class MenuButton extends BaseWidget {

  constructor(callbackOrObject, shortcutOrKey, shortcut) {
    super();

    var callback = callbackOrObject;
    if (callback && typeof callback !== 'function') callback = callbackOrObject[shortcutOrKey].bind(callbackOrObject);
    else shortcut = shortcutOrKey;

    this.domSpan = document.createElement('span');
    this.domSpan.className = 'shortcut';
    this.domSpan.innerHTML = shortcut || '';

    this.setCallback(callback);
  }

  _setDomContainer(container) {
    this.domContainer = container;
    container.addEventListener('click', this._onClick.bind(this));
  }

  _onClick() {
    if (this.callback) this.callback();
  }
}

export default MenuButton;
