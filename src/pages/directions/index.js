import React from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import DirectionsList from "../../components/DirectionsList";

class Directions extends React.Component {
  state = {
    loading: false,
    error: false,
    startAddress: this.props.location.state.startAddress,
    business: this.props.location.state.business,
    directions: null
  };

  // This data is fetched at run time on the client.
  fetchDirections = () => {
    var addressString = `${this.state.business.location.display_address[0]}, ${this.state.business.location.display_address[1]}`;
    this.setState({ loading: true });
    axios
      .get(
        `http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=${this.state.startAddress}&waypoint.2=${addressString}&optimize=timeWithTraffic&distanceUnit=Mile&key=${process.env.BING_API_KEY}`
      )
      .then(res => {
        console.log("Response from Bing Maps: ");
        console.log(res);
        this.setState({
          loading: false,
          directions: res.data.resourceSets[0].resources[0]
        });
      })
      .catch(error => {
        this.setState({ loading: false, error: true });
      });
  };

  componentDidMount() {
    console.log(this.props);
    this.fetchDirections();
  }

  render() {
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
            Directions to { this.state.business.name }
          </h1>
          <div
            style={{ textAlign: "center", width: "600px", margin: "50px auto" }}
          >
            <div>
              {this.state.loading ? (
                <p>Please hold, searching for directions!</p>
              ) : !this.state.error ? (
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

export default Directions;
