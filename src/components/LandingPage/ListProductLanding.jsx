import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Card, Button,} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import CapitalizeLetter from "../../helper/CapitalizeLetter";
import FormattedPrice from "../../helper/FormattedPrice";

const ListProductLanding = (
    {  
        id,
        title, 
        price, 
        link,
        stock,
        category,
        description
    }) => {

    const navigate = useNavigate()
    
    function detailHandler(){
        navigate(
            `/product/${id}`,
            { state: 
              { 
                id,
                title,
                price,
                link,
                stock,
                category,
                description
              } 
            }
        );
    }

    return(
        <Col>
            <Card style={{ width: "18rem", border: 0 }} className="mt-5">
            <Card.Img
                variant="top"
                src={link}
                style={{ width: "100%", height: "28rem", objectFit: "cover"}}
            />
            <Card.Body>
                <Card.Title className="text-truncate">{CapitalizeLetter(title)}</Card.Title>
                <Card.Text>{FormattedPrice(price)}</Card.Text>
                <Button variant="primary" onClick={detailHandler}>Details</Button>
            </Card.Body>
            </Card>
        </Col>
    )
}

export default ListProductLanding