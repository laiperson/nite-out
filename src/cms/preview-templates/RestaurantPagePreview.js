import React from 'react'
import PropTypes from 'prop-types'
import { RestaurantPageTemplate } from '../../templates/restaurant-page'

const RestaurantPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <RestaurantPageTemplate />
    )
  } else {
    return <div>Loading...</div>
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default RestaurantPagePreview
