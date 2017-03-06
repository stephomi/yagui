import Folder from 'containers/Folder';

class Sidebar {

  constructor(callbackResize) {
    this.domSidebar = document.createElement('div');
    this.domSidebar.className = 'gui-sidebar';

    this.domResize = document.createElement('div');
    this.domResize.className = 'gui-resize';

    this.isDragging = false;
    this.mouseX = 0;
    this.domResize.addEventListener('mousedown', this._onMouseDown.bind(this));
    window.addEventListener('mousemove', this._onMouseMove.bind(this));
    window.addEventListener('mouseup', this._onMouseUp.bind(this));

    this.callbackResize = callbackResize;
    this.isOnTheRight = false;
  }

  _setTop(nb) {
    this.domSidebar.style.top = this.domResize.style.top = nb + 'px';
  }

  _onTheRight() {
    this.isOnTheRight = true;
    this.domSidebar.style.right = 0;
    this.domSidebar.style.borderRight = 0;
    this.domSidebar.style.borderLeft = 'double';
    this.domSidebar.style.borderColor = 'rgba(255,255,255,0.3)';
    this.domResize.style.left = 'auto';
    this.domResize.style.right = this.domSidebar.offsetWidth + 'px';
    this.domResize.style.marginRight = '-3px';
  }

  _onMouseDown(ev) {
    this.isDragging = true;
    this.mouseX = ev.clientX;
  }

  _updateViewportPosition(viewport) {
    var w = this.domSidebar.hidden ? 0 : this.domSidebar.offsetWidth;
    if (this.isOnTheRight) {
      viewport.style.width = (viewport.clientWidth - w) + 'px';
    } else {
      viewport.style.left = (this.domSidebar.offsetLeft + w) + 'px';
      viewport.style.width = (viewport.clientWidth - w) + 'px';
    }
  }

  _onMouseMove(ev) {
    if (this.isDragging === false) return;
    var mouseX = ev.clientX;
    var delta = mouseX - this.mouseX;
    if (this.isOnTheRight) delta = -delta;
    var widthBar = Math.max(50, this.domSidebar.offsetWidth + delta);

    var val = widthBar + 'px';
    this.domSidebar.style.width = val;
    if (this.isOnTheRight) this.domResize.style.right = this.domSidebar.offsetWidth + 'px';
    else this.domResize.style.left = val;

    this.mouseX = mouseX;
    this.callbackResize();
  }

  _onMouseUp() {
    this.isDragging = false;
  }

  addMenu(name) {
    var folder = new Folder(name);
    this.domSidebar.appendChild(folder.domUl);
    return folder;
  }

  setVisibility(visible) {
    this.domSidebar.hidden = !visible;
    this.domResize.hidden = !visible;
    this.callbackResize();
  }
}

export default Sidebar;
