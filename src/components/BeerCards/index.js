import React, { Component } from "react";

const proxyURL = "https://cors-anywhere.herokuapp.com/";

class BeerCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBeerId: this.props.id,
      selectedBeerLikes: this.props.likes
    };

    this.likeClick = this.likeClick.bind(this);
  }

  likeClick() {
    const currentLikes = this.state.selectedBeerLikes;
    const newLikes = currentLikes + 1;
    const addingLikePutBody = {
      id: this.state.selectedBeerId,
      likes: newLikes
    };

    fetch(
      proxyURL +
        `https://beer.fluentcloud.com/v1/beer/${this.state.selectedBeerId}`,
      {
        method: "PUT",
        headers: new Headers({
          "content-type": "application/json"
        }),
        body: JSON.stringify(addingLikePutBody)
      }
    )
      .then(this.props.handleErrors)
      .then(json => {
        console.log(json);
      })
      .catch(error => {
        console.error(error);
        // show an error message
      });
  }
  render() {
    return (
      <li className="list-group-item" key={this.props.id}>
        <h5 className="card-title text-info">{this.props.name}</h5>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={this.likeClick}
        >
          Like This Beer : {this.props.likes}
        </button>
      </li>
    );
  }
}

export default BeerCards;
