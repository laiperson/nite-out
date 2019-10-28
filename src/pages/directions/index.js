import React from "react";
import PropTypes from "prop-types";
import Navbar from "../../components/Navbar";
import DirectionsList from "../../components/DirectionsList";
import axios from 'axios';

class Directions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: false,
      startAddress: null,
      business: null,
      directions: []
    };

    this.fetchDirections = this.fetchDirections.bind(this);
  }

  componentDidMount() {
    this.fetchDirections(this.props.location.state.startAddress, this.props.location.state.business);
    this.setState({ 
      startAddress: this.props.location.state.startAddress, 
      business: this.props.location.state.business
    });
  }

  // This data is fetched at run time on the client.
  fetchDirections(startAddress, business) {
    var addressString = `${business.location.display_address[0]}, ${business.location.display_address[1]}`;
    var bingToken = process.env.GATSBY_BING_API_KEY;
    this.setState({ loading: true });
    axios
      .get(
        `https://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=${startAddress}&waypoint.2=${addressString}&optimize=timeWithTraffic&distanceUnit=Mile&key=${bingToken}`
      )
      .then(res => {
        console.log("Response from Bing Maps: ");
        console.log(res);
        this.setState({
          loading: false,
          directions: res.data.resourceSets[0].resources[0]
        });
        console.log("directions state:");
        console.log(this.state.directions);
      })
      .catch(error => {
        this.setState({ loading: false, error: true });
      });
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
          <div
            style={{
              textAlign: "center",
              width: "600px",
              margin: "50px auto"
            }}
          >
            <div>
              {this.state.loading ? (
                <p>Please hold, searching for directions!</p>
              ) : (this.state.directions !== null) & (this.state.business !== null) ? (
                <>
                <h1
                  style={{
                    color: "white",
                    backgroundColor: "#F7882F",
                    fontWeight: 600,
                    fontSize: "30px",
                    width: "100%",
                    margin: "auto",
                    textAlign: "center",
                    padding: "10px"
                  }}
                >
                  Directions to { this.state.business.name }
                </h1>
                <DirectionsList directions={this.state.directions} />
                </>
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
