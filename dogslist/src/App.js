import React, { Component } from 'react';
import Dogs from './components/Dogs';
import AddDog from './components/AddDog';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      dogs: []
    };
  }

  getDogs() {
    var defaultDogs = {dogs: [
      {
        name: 'Princess',
        breed: 'Corgi',
        image: 'https://s-media-cache-ak0.pinimg.com/originals/51/ae/30/51ae30b78696b33a64661fa3ac205b3b.jpg'
      },
      {
        name: 'Riley',
        breed: 'Husky',
        image: 'http://portland.ohsohandy.com/images/uploads/93796/m/nice-and-sweet-siberian-husky-puppies-for-free-adoption.jpg'
      },
    ]};
    this.setState(defaultDogs);
  }

  componentWillMount() {
    this.getDogs();
  }

  handleAddDog(dog) {
    let dogs = this.state.dogs;
    dogs.push(dog);
    this.setState({dogs:dogs});
  }

  handleDeleteDog(name) {
    let dogs = this.state.dogs;
    let index = dogs.findIndex(x => x.name === name);
    dogs.splice(index, 1);
    this.setState({dogs:dogs});
  }

  render() {
    return (
      <div className="App">
        <Dogs dogs={this.state.dogs} onDelete={this.handleDeleteDog.bind(this)} />
        <AddDog addDog={this.handleAddDog.bind(this)} />
        <hr />
      </div>
    );
  }
}

export default App;
