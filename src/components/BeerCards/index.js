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

//   likeClick() {
//     // this.setState({ selectedBeerId: this.props.id, selectedBeerLikes: this.props.likes })
//     this.updateLikes();
//   }

  likeClick() {
    const currentLikes = this.state.selectedBeerLikes;
    const newLikes = (currentLikes + 1);
    const addingLikePutBody = {
        "id": this.state.selectedBeerId,
        "likes": newLikes
    }
    console.log(currentLikes, newLikes, addingLikePutBody)

    fetch((proxyURL + `https://beer.fluentcloud.com/v1/beer/${this.state.selectedBeerId}`)
    , {
      method: 'PUT',
      headers: new Headers({
        "content-type": "application/json"
      }),
      body: JSON.stringify(addingLikePutBody)
    })
    .then(response => {
        console.log(response);
        if(response.ok) {
          return response.json();
        } else {
          const contentType = response.headers.get('content-type');
          if (contentType.startsWith('application/json')) {
            return response.json().then(json => {
              const error = new Error(json.error.message);
              throw error;
            });
          } else {
            const error = new Error(response.statusText);
            throw error;
          }
        }
      })
      .then(json => {
        console.log(json);
        
      })
      .catch(error => {
        console.error('error', error.message);
        // show an error message
      });
  }
  render() {
      console.log(this.state)
    return (
      <li className="list-group-item" key={this.props.id}>
        <h5 className="card-title">{this.props.name}</h5>
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

// onClick= { props.likeClick.bind(null, this.props.name) }

//   <div className="card col-xs-12 col-sm-6 col-md-4" key={props.id}>
//             <div className="card-body">
//               <h5 className="card-title">{props.name}</h5>
//               <p className="card-text">{props.likes}</p>
//             </div>
//           </div>
//         <a className="card-text">Like This Beer {props.likes}</a>
