import BaseContainer from 'containers/BaseContainer';

class Folder extends BaseContainer {

  constructor(name) {
    super();

    this.domUl = document.createElement('ul');
    this.domUl.setAttribute('opened', true);

    var domTitle = document.createElement('label');
    domTitle.innerHTML = name || '';

    domTitle.addEventListener('mousedown', this._onMouseDown.bind(this));

    this.domUl.appendChild(domTitle);
    this.isOpen = true;
  }

  _onMouseDown() {
    this.isOpen = !this.isOpen;
    this.domUl.setAttribute('opened', this.isOpen);
  }

  open() {
    this.isOpen = true;
    this.domUl.setAttribute('opened', true);
  }

  close() {
    this.isOpen = false;
    this.domUl.setAttribute('opened', false);
  }

  setVisibility(visible) {
    if (!visible) this.domUl.setAttribute('opened', false);
    else if (this.isOpen) this.domUl.setAttribute('opened', true);
    this.domUl.style.height = visible ? 'auto' : '0px';
  }
}

export default Folder;
