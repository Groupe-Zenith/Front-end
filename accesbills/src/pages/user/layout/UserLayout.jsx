import React from 'react'
import UserNavbar from './navbar/userNavbar'
import UserContent from './content/UserContent'
import './UserLayout.scss'

function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
       <UserNavbar />
       <UserContent />
    </div>
  )
}

export default UserLayout