import React from "react";
import Button from "@material-ui/core/Button";
import { navigate } from "@reach/router";
import axios from "axios";

class RestaurantList extends React.Component {
  constructor(props) {
    super(props);

    this.getDirections = this.getDirections.bind(this);
  }

  getDirections(business) {
    var startAddress = prompt("Please enter your starting address: ");

    while (startAddress === "") {
      startAddress = prompt("Please enter a none empty starting address: ");
    }

    navigate("/directions", {
      state: { startAddress, business }
    });
  }

  render() {
    if (this.props.businesses) {
      var businesses = this.props.businesses.map(business => {
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
        );
      });
    }

    return (
      <div style={{ textAlign: "center", width: "100%", margin: "50px auto" }}>
        <ul>{businesses}</ul>
      </div>
    );
  }
}

export default RestaurantList;
