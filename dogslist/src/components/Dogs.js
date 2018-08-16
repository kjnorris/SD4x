import React, { Component } from 'react';
import DogItem from './DogItem';

class Dogs extends Component {
  deleteDog(name) {
    this.props.onDelete(name);
  }

  render() {
    let dogItem;
    if(this.props.dogs) {
      dogItem = this.props.dogs.map(dog => {
        return (
          <DogItem onDelete={this.deleteDog.bind(this)} key={dog.name} dog={dog} />
        );
      });
    }
    return (
      <div className="Dogs">
        <h1>Good Dogs</h1>
        {dogItem}
      </div>
    );
  }
}

export default Dogs;