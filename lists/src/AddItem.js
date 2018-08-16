import React, { Component } from 'react';

class AddItem extends Component {

  constructor() {
    super();
    this.state = {
      newItem:{}
    }
  }

  handleSubmit(e) {
      e.preventDefault(); // this prevents the page from reloading -- do not delete this line!
      if(this.refs.id.value === '') {
        alert('An item name is required');
      } else {
        let myName = this.props.idName;
        let myItem = this.refs.id.value;
        this.setState({newItem: [myName, myItem]},function() {
          //console.log(this.state);
          this.props.addItem(this.state.newItem);
        });
      }
      // Implement the rest of this function here!
  }
    

  render() {
    var divName = 'add' + this.props.idName;
    return (
      <div className='addItemDiv'>
      <h4>Add {this.props.idName}</h4>
      <form ref='form' onSubmit={this.handleSubmit.bind(this)}>
      <div id={divName} ref={divName}>
        <label>Name</label><br />
        <input type='text' ref='id' />
        </div>
        <br />
        <input type='submit' value='Submit' />
        <br />
      </form>
      </div>
    );
  }

}

export default AddItem;
