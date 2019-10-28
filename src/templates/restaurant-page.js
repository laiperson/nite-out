import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";
import RestaurantList from "../components/RestaurantList";

export const RestaurantPageTemplate = ({ location }) => {

  return (
    <React.Fragment>
    </React.Fragment>
  );
};

RestaurantPageTemplate.propTypes = {
  location: PropTypes.object.isRequired
};

const RestaurantPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout location={this.props.location}>
      <RestaurantPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  );
};

RestaurantPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default RestaurantPage;
