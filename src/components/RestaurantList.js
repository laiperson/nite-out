import React from "react";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";
import axios from "axios";

class RestaurantList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      businesses: this.props.businesses
    }

    this.getDirections = this.getDirections.bind(this);
    this.fetchDirections = this.fetchDirections.bind(this);
  }

  getDirections(business) {
    const startAddress = prompt('Please enter your starting address: ');
    
    this.fetchDirections(startAddress, business);
  }

  fetchDirections(startAddress, business) {
    var bingToken = process.env.REACT_APP_BING_API_KEY;
    var addressString = `${business.location.display_address[0]}, ${business.location.display_address[1]}`;
    console.log("here in fetchDirections in restaurant list page with token: " + bingToken);
    var connectionString = `http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=${startAddress}&waypoint.2=${addressString}&optimize=timeWithTraffic&distanceUnit=Mile&key=${bingToken}`;
    console.log("connection string is: " + connectionString);
    axios
      .get(
        connectionString
      )
      .then(res => {
        console.log("Response from Bing Maps: ");
        console.log(res);

        var directions = res.data.resourceSets[0].resources[0];

        navigate("/directions", 
        {
          state: { startAddress, business, directions }
        });
      })
      .catch(error => {
        console.log("error in fetchDirections: " + error);
        return null;
      });
  }

  render() {

    console.log("Props.businesses in RestaurantList.js: ");
    console.log(this.props);

    if (this.state.businesses) {
    
      var businesses = this.state.businesses.map(business => {
        return (
          <div
            style={{
              backgroundColor: "white",
              witdh: "90%",
              height: "300px",
              padding: "5%",
              margin: "5% 0",
              boxShadow:
                "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"
            }}
          >
            <div className="restaurant-heading" style={{ height: "150px" }}>
              <div
                id="image-col"
                style={{ float: "left", width: "30%", minWidth: "155px" }}
              >
                <a href={business.url}>
                  <img
                    src={business.image_url}
                    alt={business.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%"
                    }}
                  />
                </a>
              </div>
              <div
                id="descr-col"
                style={{
                  float: "left",
                  width: "70%",
                  paddingLeft: "5%",
                  transform: "translateY(25%)"
                }}
              >
                <h1>
                  <strong
                    className="restaurant-name"
                    style={{
                      color: "#F7882F",
                      fontWeight: "600",
                      fontSize: "24px",
                      float: "left",
                      display: "block"
                    }}
                  >
                    <a href={business.url} style={{ color: "#F7882F" }}>
                    {business.name}
                    </a>
                  </strong>
                </h1>
                <br />
                <h3
                  className="descr-entity"
                  style={{ float: "left", textAlign: "left" }}
                >
                  Address: {business.location.display_address[0]},{" "}
                  {business.location.display_address[1]}
                </h3>
                <br />
                <h3 className="descr-entity" style={{ float: "left" }}>
                  Rating: {business.rating}
                </h3>
              </div>
            </div>
            <Button
              type="submit"
              variant="contained"
              style={{
                marginBlockStart: "5%",
                width: "100%",
                color: "white",
                backgroundColor: "#6B7A8F"
              }}
              onClick={e => this.getDirections(business)}
            >
              Get Directions
            </Button>
          </div>
      )});
    }

    return (
      <div style={{ textAlign: "center", width: "100%", margin: "50px auto" }}>
        <ul>{businesses}</ul>
      </div>
    );
  }
}

export default RestaurantList;
