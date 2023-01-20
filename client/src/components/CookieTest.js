import React from 'react'
import Cookies from 'universal-cookie'

const CookieTest = () => {
  const cookies = new Cookies()
  const token = cookies.get('jwt-auth')
  console.log(token)
  return <h1>Landing Page, Your token is {token}</h1>
}

export default CookieTest
