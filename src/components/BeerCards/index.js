import React, { Component } from "react";

class BeerCards extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <li className="list-group-item" key={this.props.id}>
        <h5 className="card-title text-info">{this.props.name}</h5>
        <button
          type="button"
          value={this.props.likes}
          name={this.props.name}
          className="btn btn-primary btn-sm"
          onClick={this.props.likeClick.bind(null, this.props.id)}
        >
          Like This Beer : {this.props.likes}
        </button>
      </li>
    );
  }
}

export default BeerCards;
