import BaseContainer from 'containers/BaseContainer';
import MenuButton from 'widgets/MenuButton';

class Menu extends BaseContainer {

  constructor() {
    super();

    this.domUl = document.createElement('ul');
  }

  addButton(name, callbackOrObject, shortcutOrKey, shortcut) {
    var widget = new MenuButton(callbackOrObject, shortcutOrKey, shortcut);
    var domLine = this._addLine(name);
    domLine.appendChild(widget.domSpan);
    widget._setDomContainer(domLine);
    return widget;
  }

  addSlider(name, valOrObject, callbackOrKey, min, max, step) {
    var wid = super.addSlider(name, valOrObject, callbackOrKey, min, max, step);
    // label 36% + slider ?% + 2% + input 18%
    wid.domInputText.style.width = '18%';
    wid.domSlider.style.width = name ? '44%' : '80%';
    return wid;
  }
}

export default Menu;
