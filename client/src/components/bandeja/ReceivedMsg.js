import React, { useState, useEffect, useContext } from 'react'

export const Msg = ({ msg }) => {

    return (
        <div key={msg._id}>
            <li>"{msg.content}"</li>
            <br/>
        </div>
    )
}

export default Msg;