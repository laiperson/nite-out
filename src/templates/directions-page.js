import React from 'react'
import { useState } from "react"
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const DirectionsPageTemplate = ({ location }) => {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);

  const bingToken = process.env.REACT_APP_BING_API_KEY;
  /*
  function fetchDirections() {
    console.log("here in fetchDirections in direction page with token: " + bingToken);
    var addressString = `${location.business.location.display_address[0]}, ${location.business.location.display_address[1]}`;
    setLoading(true);
    axios
      .get(
        `http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=${location.state.startAddress}&waypoint.2=${addressString}&optimize=timeWithTraffic&distanceUnit=Mile&key=${bingToken}`
      )
      .then(res => {
        console.log("Response from Bing Maps: ");
        console.log(res);
        setDirections(res.data.resourceSets[0].resources[0]);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(true);
      });
  };
  */
  
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
              {(loading & (directions === null)) ? (
                <p>Please hold, searching for directions!</p>
              ) : (!error & (directions != null)) ? (
                <DirectionsList directions={location.state.directions} />
              ) : (
                <p>Error trying to fetch directions from the Bing Maps API</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

DirectionsPageTemplate.propTypes = {
  location: PropTypes.object.isRequired()
}

const DirectionsPage = ({ data, location }) => {
  const { markdownRemark: post } = data

  return (
    <Layout location={this.props.location}>
      <DirectionsPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        location={location}
      />
    </Layout>
  )
}

DirectionsPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default DirectionsPage;
