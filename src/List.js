import { React, useState } from 'react'
import './style.css'

function List(props) {
    let count=0;

    return (
        <ul>
            {
            props.addressId.map( (addressId, count) => {
                    count++;
                    return (
                        count <= 6 ?
                        <button onClick={event => props.handleClick(event, addressId, props.from)}>{addressId}</button> 
                        :null
                    );

            })
        }
        </ul>
    )
}

export default List