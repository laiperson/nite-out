import React from "react";
import RestaurantList from "../../components/RestaurantList";
import Navbar from "../../components/Navbar";

class Restaurants extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      businesses: this.props.location.state.businesses
    }

    this.state = {
      loading: false,
      error: false,
      businesses: this.props.location.state.businesses
    };

    console.log("this.props in Restaurants comp: ");
    console.log(this.props);
  }

  componentDidMount() {
    this.setState({ businesses: this.props.location.state.businesses });
  }

  render() {
    return (
      <React.Fragment>
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
          <h1 style={{
            color: "white", 
            backgroundColor: "#F7882F", 
            fontWeight: 600, 
            fontSize: "30px", 
            width: "200px", 
            margin: "auto",
            textAlign: "center",
            padding: "10px"}}>
            Restaurants
          </h1>
          <div
            style={{ textAlign: "center", width: "600px", margin: "50px auto" }}
          >
            
            <div>
              <RestaurantList businesses={this.state.businesses} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
    );
  }
}

export default Restaurants;
