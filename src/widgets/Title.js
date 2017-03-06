import BaseWidget from 'widgets/BaseWidget';

class Title extends BaseWidget {

  constructor(name) {
    super();

    this.domText = document.createElement('div');
    this.domText.innerHTML = name || '';
    this.domText.className = 'group-title';
  }

  setText(text) {
    this.domText.innerHTML = text;
  }

  setVisibility(visible) {
    this.domText.hidden = !visible;
  }
}

export default Title;
