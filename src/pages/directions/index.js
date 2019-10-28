import React from "react";
import PropTypes from "prop-types";
import Navbar from "../../components/Navbar";
import DirectionsList from "../../components/DirectionsList";

class Directions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: false,
      startAddress: "",
      business: "",
      directions: ""
    };
  }

  componentDidMount() {
    if (typeof window === "undefined") {
      return;
    }
    this.setState(() => ({
      directions: this.props.location.state.directions,
      business: this.props.location.state.business,
      startAddress: this.props.location.state.startAddress
    }));
  }

  render() {
    console.log("directions props");
    console.log(this.props.location);

    return (
      <div>
        <Navbar />
        <div
          className="margin-top-0"
          style={{
            backgroundColor: `#DCC7AA`,
            minHeight: "95vh",
            padding: "5%"
          }}
        >
          <h1
            style={{
              color: "white",
              backgroundColor: "#F7882F",
              fontWeight: 600,
              fontSize: "30px",
              width: "40%",
              margin: "auto",
              textAlign: "center",
              padding: "10px"
            }}
          >
            Directions to {this.state.business.name}
          </h1>
          <div
            style={{
              textAlign: "center",
              width: "600px",
              margin: "50px auto"
            }}
          >
            <div>
              {this.state.loading & this.state.directions ? (
                <p>Please hold, searching for directions!</p>
              ) : this.state.directions ? (
                <DirectionsList directions={this.state.directions} />
              ) : (
                <p>Error trying to fetch directions from the Bing Maps API</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Directions.propTypes = {
  location: PropTypes.object.isRequired
};

export default Directions;
