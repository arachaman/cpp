import React from "react"
import { Button } from "react-bootstrap";
import CapitalizeLetter from "../../helper/CapitalizeLetter";
import FormattedPrice from "../../helper/FormattedPrice";

const CartItem = ({ 
    id, 
    index, 
    title, 
    price, 
    amount, 
    onDeleteHandler, 
    onIncreamentHandler, 
    onDecreamentHandler 
}) => {

    function deleteHandler(){
        onDeleteHandler(id)
    }

    function increamentHandler(){
        const item={
            id,
            title,
            price,
            amount
        }
        onIncreamentHandler(item)
    }

    function decreamentHandler(){
        onDecreamentHandler(id)
    }

    return(
        <tr>
            <td>{index}</td>
            <td>{CapitalizeLetter(title)}</td>
            <td>{FormattedPrice(price)}</td>
            <td style={{gap:"24px"}} className="d-flex align-items-center">
                <Button 
                    style={{width:"36px"}} 
                    className="btn btn-primary"
                    onClick={decreamentHandler}
                >
                    -
                </Button>
                <span>{amount}</span>
                <Button 
                    className="btn btn-primary"
                    onClick={increamentHandler}
                >+
                </Button>
            </td>
            <td>
                <Button variant="danger" onClick={deleteHandler}>Delete</Button>
            </td>
        </tr>
    )
}

export default CartItem