import React from 'react';

class Circle extends React.Component {

  constructor(props) {
    super(props);

    this.state ={
      clicked: false
    }
  }

  render() {
    return(
      <div className='circles'></div>
    )
  }

}

export default Circle;