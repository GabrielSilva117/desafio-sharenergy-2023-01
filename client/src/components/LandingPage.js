import React, { useEffect, useState } from 'react'
import Users from './Users'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const cookies = new Cookies()
  const token = cookies.get('jwt-auth')
  const navigate = useNavigate()

  const [userList, setUserList] = useState([])

  useEffect(() => {
    if (!token) {
      window.alert(
        'Your session has either expired or you dont have a active cookie! Login again to start another session.'
      )
      return navigate('/')
    }
  }, [navigate, token])

  const scrollTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  const users = (seed) => {
    fetch(
      `https://randomuser.me/api/?page=3&results=5&seed=${seed}&nat=br,us&inc=picture,name,email,login,dob`
    )
      .then((res) => res.json())
      .then((data) => {
        setUserList(data.results)
      })
    scrollTop()
  }
  console.log(userList)

  useEffect(() => {
    fetch(
      'https://randomuser.me/api/?page=3&results=5&seed=abc&nat=br,us&inc=picture,name,email,login,dob'
    )
      .then((res) => res.json())
      .then((data) => {
        setUserList(data.results)
      })
    scrollTop()
  }, [])

  return (
    <div className="landing-page-section">
      <div className="landing-page-container">
        <h1>Welcome to the Landing Page!</h1>
        {userList.map((user) => {
          return (
            <div key={user.email}>
              <Users userInfo={user} />
            </div>
          )
        })}
        <div
          className="btn-toolbar"
          style={{
            'margin-top': '10px;',
            display: 'flex',
            'justify-content': 'center'
          }}
        >
          <div className="btn-group">
            <button
              onClick={() => users('abc')}
              className="btn btn-outline-dark btn-"
            >
              1
            </button>
            <button
              onClick={() => users('cba')}
              className="btn btn-outline-dark"
            >
              2
            </button>
            <button
              onClick={() => users('bca')}
              className="btn btn-outline-dark"
            >
              3
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
