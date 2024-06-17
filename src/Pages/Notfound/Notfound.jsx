import React from 'react'
import notFoundImg from "../../assets/images/error.svg"
import { Helmet } from 'react-helmet'

export default function Notfound() {
  return (
    <>
        <Helmet>
        <title>Not foound</title>
        <meta name="description" content="wrong path " />

    </Helmet>
          <img src={notFoundImg} className='block mx-auto mt-12' alt="" />
      </>
  )
}
