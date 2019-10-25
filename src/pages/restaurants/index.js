import React from "react";
import axios from "axios";
import RestaurantList from "../../components/RestaurantList";
import Navbar from "../../components/Navbar";

class Restaurants extends React.Component {
  state = {
    loading: false,
    error: false,
    term: this.props.location.state.find,
    location: this.props.location.state.nearLocation,
    businesses: []
  };

  // This data is fetched at run time on the client.
  fetchRestaurants = () => {
    this.setState({ loading: true });
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="${this.state.term}"&location="${this.state.location}"&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${process.env.YELP_API_KEY}`,
            "Access-Control-Allow-Origin":"*"
          }
        }
      )
      .then(res => {
        var businesses = res.data.businesses;
        console.log(businesses);
        this.setState({
          loading: false,
          businesses: {
            ...this.state.businesses,
            businesses
          }
        })
      })
      .catch(error => {
        this.setState({ loading: false, error });
      });
  }

  componentDidMount() {
    this.fetchRestaurants();
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div style={{ textAlign: "center", width: "600px", margin: "50px auto" }}>
          <h1>Restaurants</h1>
          <p>
            Rick & Morty API data loads at build time. Dog API data loads at run
            time.
          </p>
          <div>
            {this.state.loading ? (
              <p>Please hold, searching for your new favorite restaurants!</p>
            ) :  this.state.businesses.businesses.length > 0 ? (
              <>
                <p>Got the restaurants</p>
                <RestaurantList businesses={this.state.businesses} />
              </>
            ) : (
              <>
              <p>Error trying to fetch restaurants from the Yelp API</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Restaurants;
