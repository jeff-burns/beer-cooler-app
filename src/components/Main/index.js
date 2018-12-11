import React from "react";
import BeerCards from "../BeerCards/index";

const Main = props => {
  const beerSections = props.beers.map(beer => {
    return <BeerCards 
        id={beer.id} 
        name={beer.name} 
        likes={beer.likes} 
        likeClick={props.likeClick}
    />;
  });
  return (
    <main className="container">
      <section className=" column">
        <div className="card mb-3">
          <h2 className="card-header">Beer Cooler</h2>
          <div className="card-body">
            <h3 className="card-title">Beers</h3>
          </div>
          <ul className="list-group list-group-flush">{beerSections}</ul>
        </div>
      </section>
      <section className=" column">
        <div className="card mb-3">
          <div className="card-body">
            <div className="form-group">
              <label
                className="col-form-label col-form-label-sm"
                for="inputSmall"
              >
                Add A Beer!
              </label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Budweiser"
                id="inputSmall"
              />
              <button type="button" class="btn btn-primary btn-sm">Add Beer!</button>                
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;

// <main className="container">
//           <section className="row">
//           {beerSections}
//           </section>
//         </main>
