import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Logout = () => {
  const navigate = useNavigate()
  const cookies = new Cookies()
  useEffect(() => {
    cookies.remove('jwt-auth')
    return navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default Logout
