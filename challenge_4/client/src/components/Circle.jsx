import React from 'react';

class Circle extends React.Component {

  constructor(props) {
    super(props);

    this.state ={
      clicked: false,
      color: {'backgroundColor': 'white'}
    };

    this.addDisc = this.addDisc.bind(this);
  }

  addDisc() {
    if (!this.state.clicked) {
      var color = this.props.player === 1 ? 'red' : 'yellow';
      var style = {'backgroundColor': color};
      this.setState({
        clicked: true,
        color:style
      });
    }
  }

  render() {
    return(
      <div style={this.state.color} className={'circles '+ 'row'+ this.props.row} onClick={() => {this.addDisc(); this.props.click()}}>
      </div>
    )
  }

}

export default Circle;