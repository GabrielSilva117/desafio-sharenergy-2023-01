import React, { useEffect, useState } from 'react'
import cat from '../assets/images/funny-cat-871298226790TvQ.jpg'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

const Cats = () => {
  const cookies = new Cookies()
  const token = cookies.get('jwt-auth')
  const navigate = useNavigate()
  const [catUrl, setCatUrl] = useState('')
  const [httpCode, setHttpCode] = useState('')

  useEffect(() => {
    if (!token) {
      window.alert(
        'Your session has either expired or you dont have a active cookie! Login again to start another session.'
      )
      return navigate('/')
    }
  }, [navigate, token])

  const fetchCat = (e) => {
    e.preventDefault()
    setHttpCode(catUrl)
    setCatUrl('')
  }

  return (
    <div className="cat-section">
      <div className="cat-container">
        <div className="cat-text">
          <h1>Welcome to the HTTP Cat page!</h1>
          <p>Write a http request status below and see what happens</p>
        </div>
        <div className="cat-form-section">
          <form onSubmit={fetchCat} className="cat-form">
            <input
              type="text"
              value={catUrl}
              placeholder="HTTP status code"
              className="form-control form-control-lg"
              onChange={(e) => setCatUrl(e.target.value)}
              style={{
                width: '500px'
              }}
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-outline-dark btn-lg"
              style={{
                width: '200px'
              }}
            />
          </form>
        </div>

        <div className="cat-img">
          <figure className="cat-img-figure">
            {httpCode ? (
              <img src={`https://http.cat/${httpCode}`} alt="" />
            ) : (
              <img src={cat} alt="" />
            )}
          </figure>
        </div>
      </div>
    </div>
  )
}

export default Cats
