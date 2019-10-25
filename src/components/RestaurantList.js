import React from "react";

class RestaurantList extends React.Component {
  render() {
    console.log(this.props.businesses.businesses);
    var businessArray = Array.from(this.props.businesses);
    console.log(businessArray);

    var businesses = this.props.businesses.businesses.map((business) => {
      return (
        <h1>{business.name}</h1>
      )
    });

    console.log("here");
    console.log(businesses);

    return (
      
      <div style={{ textAlign: "center", width: "80%", margin: "50px auto" }}>
        <ul>
          {businesses}
        </ul>
      </div>
    );
  }
}

export default RestaurantList;
