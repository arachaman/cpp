import React from 'react'
import { Button } from "react-bootstrap";

const UserOrderList = ({
    key,
    id,
    index,
    bookingId,
    dateOrder,
    title,
    status,
    amount,
    onCancelHandler
}) => {

    let colorStatus

    if(status === "completed"){
        colorStatus = {
            color: "green"
        }
    } else if(status === "canceled" || status === "pending"){
        colorStatus = {
            color: "red"
        }
    }

    const formattedDate = new Date(dateOrder.seconds*1000);

    return(
        <tr>
            <td>{index + 1}</td>
            <td>{bookingId}</td>
            <td>{title}</td>
            <td>{formattedDate.toDateString()}</td>
            <td>{amount}</td>
            <td style={colorStatus}>{status}</td>
            <td>
                <Button onClick={()=>onCancelHandler(id)} variant="danger">Cancel</Button>{' '}
            </td>
        </tr>
    )
}

export default UserOrderList