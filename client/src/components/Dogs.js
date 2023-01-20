import React, { useEffect, useState } from 'react'
import { BiRefresh } from 'react-icons/bi'
import dog from '../assets/images/px657141-image-kwvxm781.jpg'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

const Dogs = () => {
  const cookies = new Cookies()
  const token = cookies.get('jwt-auth')
  const navigate = useNavigate()

  const [dogImg, setDogImg] = useState('')

  useEffect(() => {
    if (!token) {
      window.alert(
        'Your session has either expired or you dont have a active cookie! Login again to start another session.'
      )
      return navigate('/')
    }
  }, [navigate, token])

  const randomDog = () => {
    fetch('https://random.dog/woof.json?filter=mp4,webm,gif')
      .then((res) => res.json())
      .then((data) => setDogImg(data))
  }
  return (
    <div className="dog-section">
      <div className="dog-container">
        <h1>Welcome to the Dog page!</h1>
        <div className="dog-text">
          <p>Click the button to load a random dog image</p>
          <button onClick={randomDog} className="btn btn-outline-dark btn-lg">
            <BiRefresh />
          </button>
        </div>
        <div className="dog-img">
          <figure className="dog-figure">
            {dogImg ? (
              <img src={dogImg.url} alt="" />
            ) : (
              <img src={dog} alt="" />
            )}
          </figure>
        </div>
      </div>
    </div>
  )
}

export default Dogs
