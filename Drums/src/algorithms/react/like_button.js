'use strict';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { n_state: 0 };
  }

  render() {
    return React.createElement(
      'button',
      { onClick: () => this.setState({ n_state: this.state.n_state + 1 }) },
      'Like'
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(React.createElement(LikeButton), domContainer);