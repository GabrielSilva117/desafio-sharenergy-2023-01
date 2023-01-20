import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import ClientList from './ClientList'

const Clients = () => {
  const cookies = new Cookies()
  const token = cookies.get('jwt-auth')
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [address, setAddress] = useState('')
  const [cpf, setCpf] = useState('')
  const [read, setRead] = useState(true)
  const [formSwitch, setFormSwitch] = useState(true)
  const [clientInfo, setClientInfo] = useState([])
  const [clientId, setClientId] = useState('')
  const [toggleForm, setToggleForm] = useState(false)

  useEffect(() => {
    if (!token) {
      window.alert(
        'Your session has either expired or you dont have a active cookie! Login again to start another session.'
      )
      return navigate('/')
    }
  }, [navigate, token])

  const getClients = () => {
    fetch('http://localhost:3001/client', {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then((res) =>
      res.json().then((data) => {
        if (res.status !== 200) {
          return window.alert(data.msg)
        }
        setClientInfo(data)
      })
    )
  }

  const postClient = (e) => {
    e.preventDefault()
    let method = 'POST'
    let route = 'http://localhost:3001/client'
    if (!formSwitch) {
      method = 'PUT'
      route = `http://localhost:3001/client/${clientId}`
    }

    fetch(route, {
      method: method,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        telefone,
        address,
        cpf
      })
    }).then((res) =>
      res.json().then((data) => {
        if (res.status !== 201) {
          return window.alert(data.msg)
        }
        setRead(!read)
        return window.alert(data.msg)
      })
    )
    setFirstName('')
    setLastName('')
    setEmail('')
    setTelefone('')
    setAddress('')
    setCpf('')
    setClientId('')
    if (!formSwitch) {
      setFormSwitch(true)
    }
  }

  const refreshPage = (val) => {
    setRead(val)
  }

  const clientUpdate = (id, first, last, email, tel, add, cpf) => {
    setFormSwitch(false)
    setClientId(id)
    setFirstName(first)
    setLastName(last)
    setEmail(email)
    setTelefone(tel)
    setAddress(add)
    setCpf(cpf)
  }

  useEffect(() => {
    getClients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [read])

  return (
    <div className="client-section">
      <div className="client-container">
        <h1>Welcome to the Client page!</h1>
        {toggleForm && (
          <div className="client-form">
            <form onSubmit={postClient}>
              <div>
                <label htmlFor="first_name">First Name:</label>
                <input
                  type="text"
                  name="first_name"
                  value={firstName}
                  className="form-control form-control-lg"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="last_name">Last Name:</label>
                <input
                  type="text"
                  name="last_name"
                  value={lastName}
                  className="form-control form-control-lg"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  className="form-control form-control-lg"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="telefone">Telefone:</label>
                <input
                  type="number"
                  name="telefone"
                  value={telefone}
                  className="form-control form-control-lg"
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  className="form-control form-control-lg"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="cpf">Cpf:</label>
                <input
                  type="number"
                  name="cpf"
                  value={cpf}
                  className="form-control form-control-lg"
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-outline-dark">
                Submit
              </button>
            </form>
          </div>
        )}
        <hr />
        <button
          onClick={() => setToggleForm(!toggleForm)}
          className="btn btn-outline-dark"
          style={{
            display: 'block',
            width: '550px'
          }}
        >
          {toggleForm ? 'Close' : 'Open'}
        </button>
        {clientInfo.msg ? (
          <div>{clientInfo.msg}</div>
        ) : (
          clientInfo.map((client) => {
            return (
              <div key={client._id} className="client-list">
                <ClientList
                  clientInfo={client}
                  token={token}
                  refreshPage={refreshPage}
                  readVal={read}
                  clientUpdate={clientUpdate}
                />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Clients
