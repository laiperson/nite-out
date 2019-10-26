import React from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

class Directions extends React.Component {
  state = {
    loading: false,
    error: false,
    startAddress: this.props.location.state.startAddress,
    business: this.props.location.state.business,
    directions: ""
  };

  // This data is fetched at run time on the client.
  fetchDirections = () => {
    var addressString = `${this.state.business.location.display_address[0]}, ${this.state.business.location.display_address[1]}`;
    this.setState({ loading: true });
    console.log(process);
    axios
      .get(
        `http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=${this.state.startAddress}&waypoint.2=${addressString}&optimize=timeWithTraffic&distanceUnit=Mile&key=${process.env.BING_API_KEY}`
      )
      .then(res => {
        var directions = res.data.resourceSets[0].resources[0];
        console.log(directions);
        this.setState({
          loading: false,
          directions: directions
        });
      })
      .catch(error => {
        this.setState({ loading: false, error });
      });
  };

  componentDidMount() {
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
              width: "200px",
              margin: "auto",
              textAlign: "center",
              padding: "10px"
            }}
          >
            Directions
          </h1>
          <div
            style={{ textAlign: "center", width: "600px", margin: "50px auto" }}
          >
            <div>
              {this.state.loading ? (
                <p>Please hold, searching for your new favorite restaurants!</p>
              ) : !this.state.error ? (
                <p>Here for directions</p>
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
