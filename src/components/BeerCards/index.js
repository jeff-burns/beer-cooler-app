import React from "react";

const BeerCards = props => {
  return (
      <li className="list-group-item" key={props.id}>
        <h5 className="card-title">{props.name}</h5>
        <button type="button" className="btn btn-primary btn-sm" >Like This Beer : {props.likes}</button>                

      </li>
  );
};

export default BeerCards;

// onClick= { this.props.likeClick.bind(null, this.props.name) }




//   <div className="card col-xs-12 col-sm-6 col-md-4" key={props.id}>
//             <div className="card-body">
//               <h5 className="card-title">{props.name}</h5>
//               <p className="card-text">{props.likes}</p>
//             </div>
//           </div>
//         <a className="card-text">Like This Beer {props.likes}</a>

