import Sidebar from 'containers/Sidebar';
import Topbar from 'containers/Topbar';

class GuiMain {

  constructor(viewport, callbackResize) {
    this.domMain = document.createElement('div');
    this.viewport = viewport;

    this.callbackResize = callbackResize;
    if (this.viewport) {
      this.viewport.style.width = document.documentElement.clientWidth + 'px';
      this.viewport.style.height = document.documentElement.clientHeight + 'px';
    }
    this.cbResize_ = this._onWindowResize.bind(this);

    document.body.appendChild(this.domMain);
    this.leftSidebar = undefined;
    this.rightSidebar = undefined;
    this.topbar = undefined;

    window.addEventListener('resize', this._onWindowResize.bind(this), false);
  }

  _onWindowResize() {
    if (this.viewport) {
      this.viewport.style.width = document.documentElement.clientWidth + 'px';
      this.viewport.style.height = document.documentElement.clientHeight + 'px';
      this.viewport.style.left = '0px';
      this.viewport.style.top = '0px';
      if (this.leftSidebar)
        this.leftSidebar._updateViewportPosition(this.viewport);
      if (this.rightSidebar)
        this.rightSidebar._updateViewportPosition(this.viewport);
      if (this.topbar)
        this.topbar._updateViewportPosition(this.viewport);
    }
    this._updateSidebarsPosition();
    if (this.callbackResize)
      this.callbackResize();
  }

  _updateSidebarsPosition() {
    if (!this.topbar) return;
    var off = this.topbar.domTopbar.offsetHeight;
    if (this.leftSidebar)
      this.leftSidebar._setTop(off);
    if (this.rightSidebar)
      this.rightSidebar._setTop(off);
  }

  addLeftSidebar() {
    this.leftSidebar = new Sidebar(this.cbResize_);
    var domSide = this.leftSidebar.domSidebar;
    this.domMain.appendChild(domSide);
    this.domMain.appendChild(this.leftSidebar.domResize);

    this._updateSidebarsPosition();
    this.leftSidebar._updateViewportPosition(this.viewport);
    return this.leftSidebar;
  }

  addRightSidebar() {
    this.rightSidebar = new Sidebar(this.cbResize_);
    var domSide = this.rightSidebar.domSidebar;
    this.domMain.appendChild(domSide);
    this.domMain.appendChild(this.rightSidebar.domResize);

    this.rightSidebar._onTheRight();
    this._updateSidebarsPosition();
    this.rightSidebar._updateViewportPosition(this.viewport);
    return this.rightSidebar;
  }

  addTopbar() {
    this.topbar = new Topbar(this.cbResize_);
    this.domMain.appendChild(this.topbar.domTopbar);

    this._updateSidebarsPosition();
    this.topbar._updateViewportPosition(this.viewport);
    return this.topbar;
  }

  setVisibility(visible) {
    this.domMain.hidden = !visible;
    this._onWindowResize();
  }
}

export default GuiMain;
