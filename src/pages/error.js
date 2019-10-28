import React from 'react'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'

const ErrorPage = () => (
  <Layout>
    <Navbar/>
    <div>
      <h1>ERROR</h1>
      <p>You just hit a route that caused an error... Please go to the home page and try again.</p>
    </div>
  </Layout>
)

export default ErrorPage