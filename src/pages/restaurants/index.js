import React from "react";
import RestaurantList from "../../components/RestaurantList";
import Navbar from "../../components/Navbar";
import axios from 'axios';

class Restaurants extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: false,
      term: null,
      location: null,
      businesses: []
    }

    this.fetchRestaurants = this.fetchRestaurants.bind(this);
  }

  componentDidMount() {
    this.setState({
      term: this.props.location.state.find,
      location: this.props.location.state.nearLocation,
    });

    this.fetchRestaurants(this.props.location.state.find, this.props.location.state.nearLocation);
  }

  fetchRestaurants(find, location) {
    this.setState({ loading: true });
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="${find}"&location="${location}"&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GATSBY_YELP_API_KEY}`,
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(res => {
        var businesses = res.data.businesses;
        console.log("Yelp API Response for Restaurants: ");
        console.log(businesses);
        this.setState({
          loading: false,
          businesses: businesses
        });
      })
      .catch(error => {
        this.setState({ loading: false, error: true });
      });
  };

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
              {this.state.loading ? (
                <p>Please hold, searching for your new favorite restaurants!</p>
              ) : !this.state.error & this.state.businesses.length > 0 ? (
                <RestaurantList businesses={this.state.businesses} />
              ) : (
                <p>Error trying to fetch restaurants from the Yelp API</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
    );
  }
}

export default Restaurants;
