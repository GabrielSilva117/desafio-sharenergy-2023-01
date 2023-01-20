import React, { useState } from 'react'

const ClientList = ({
  clientInfo,
  token,
  readVal,
  refreshPage,
  formSwitch,
  clientUpdate
}) => {
  const [addInfo, setAddInfo] = useState(false)
  const deleteClient = (id) => {
    fetch(`http://localhost:3001/client/${id}`, {
      method: 'DELETE',
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
        refreshPage(!readVal)
        return window.alert(data.msg)
      })
    )
  }

  const updateClient = () => {
    clientUpdate(
      clientInfo._id,
      clientInfo.first_name,
      clientInfo.last_name,
      clientInfo.email,
      clientInfo.telefone,
      clientInfo.address,
      clientInfo.cpf
    )
  }
  return (
    <>
      <h3>
        {clientInfo.first_name} {clientInfo.last_name}
      </h3>
      <p>Email: {clientInfo.email}</p>
      {addInfo && (
        <>
          <p>Telefone: {clientInfo.telefone}</p>
          <p>Address: {clientInfo.address}</p>
          <p>Cpf: {clientInfo.cpf}</p>
        </>
      )}
      <div className="btn-group ">
        <button
          onClick={() => setAddInfo((prevAddInfo) => !prevAddInfo)}
          className="btn btn-outline-dark"
        >
          Show More Info
        </button>
        <button onClick={() => updateClient()} className="btn btn-outline-dark">
          Update
        </button>
        <button
          onClick={() => deleteClient(clientInfo._id)}
          className="btn btn-outline-dark"
        >
          Delete
        </button>
      </div>
    </>
  )
}

export default ClientList
