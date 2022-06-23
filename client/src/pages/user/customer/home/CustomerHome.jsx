import React from 'react'
import {useSelector} from 'react-redux'

function CustomerHome() {
    const {user} = useSelector((state) => state.auth)
    return (
        <h1 className="text-center mt-5">Welcome back, {user.userInfo.firstName}!</h1>
    )
}

export default CustomerHome