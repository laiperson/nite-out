import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { navigate, graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

import Layout from "../components/Layout";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: "5%"
  },
  textField: {
    margin: "auto",
    background: "none",
    width: "80%",
    backgroundColor: "white"
  },
  button: {
    color: "white",
    backgroundColor: "#6B7A8F",
    width: "20%",
    margin: "auto"
  },
  dense: {
    marginTop: 19
  }
}));

export const IndexPageTemplate = ({ image, title, subheading, location }) => {
  const classes = useStyles();
  const [find, setFind] = useState("");
  const [nearLocation, setNearLocation] = useState("");

  const yelpToken = process.env.REACT_APP_YELP_API_KEY;

  function searchSubmit(event) {
    setFind("");
    setNearLocation("");
    console.log(`Find: ${find} and nearLocation: ${nearLocation}. Yelp token: ${yelpToken}`);

    fetchRestaurants();
  }

  function fetchRestaurants() {
    console.log(
      `searching for restaurants for: ${find} and near ${nearLocation} in index page`
    );

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term="${find}"&location="${nearLocation}"&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${yelpToken}`,
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(res => {
        var businesses = res.data.businesses;
        console.log("Yelp API Response for Restaurants: ");
        console.log(businesses);

        navigate("/restaurants/", {
          state: { businesses }
        });
      })
      .catch(error => {
        console.log("error in fetchRestaurants");
      });
  }

  return (
    <React.Fragment>
      <div>
        <div
          className="full-width-image margin-top-0"
          style={{
            backgroundImage: `url(${
              !!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`,
            backgroundPosition: `top left`,
            backgroundAttachment: `fixed`
          }}
        >
          <div
            style={{
              display: "flex",
              height: "150px",
              lineHeight: "1",
              justifyContent: "space-around",
              alignItems: "left",
              flexDirection: "column"
            }}
          >
            <h1
              className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
              style={{
                boxShadow: "#F7882F 0.5rem 0px 0px, #F7882F -0.5rem 0px 0px",
                backgroundColor: "#F7882F",
                color: "white",
                lineHeight: "1",
                padding: "0.25em"
              }}
            >
              {title}
            </h1>
            <br />
            <h3
              className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
              style={{
                boxShadow: "#F7882F 0.5rem 0px 0px, #F7882F -0.5rem 0px 0px",
                backgroundColor: "#F7882F",
                color: "white",
                lineHeight: "1",
                padding: "0.25em",
                textAlign: "center"
              }}
            >
              {subheading}
            </h3>
            <div className="home-input-container">
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="standard-name"
                  label="Search restaurants by name, cuisine, etc."
                  value={find}
                  className={classes.textField}
                  margin="normal"
                  variant="filled"
                  onInput={e => setFind(e.target.value)}
                />
                <TextField
                  id="standard-location"
                  label="Near"
                  value={nearLocation}
                  className={classes.textField}
                  margin="normal"
                  variant="filled"
                  onInput={e => setNearLocation(e.target.value)}
                />
              </form>
            </div>
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
              onClick={e => searchSubmit(e)}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  })
};

const IndexPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout location={location}>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
        location={location}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            text
          }
          heading
          description
        }
      }
    }
  }
`;
