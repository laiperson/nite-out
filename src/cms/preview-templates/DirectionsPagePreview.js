import React from 'react'
import PropTypes from 'prop-types'
import { DirectionsPage, DirectionsPageTemplate } from '../../templates/directions-page'

const DirectionsPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <DirectionsPageTemplate />
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

export default DirectionsPagePreview
