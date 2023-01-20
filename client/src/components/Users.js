import React from 'react'

const Users = ({ userInfo }) => {
  return (
    <div className="user-section">
      <div className="user-container">
        <div className="user-img">
          <figure className="user-figure">
            <img src={userInfo.picture.large} alt="" />
          </figure>
          <p>
            {userInfo.name.first} {userInfo.name.last}
          </p>
        </div>
        <div className="user-information">
          <h3 style={{ fontWeight: 'bold', fontSize: '33px' }}>
            Additional information:
          </h3>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p>
            <strong> Username:</strong> {userInfo.login.username}
          </p>
          <p>
            <strong>Age:</strong> {userInfo.dob.age}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Users
