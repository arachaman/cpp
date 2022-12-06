import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Card, Button,} from "react-bootstrap";
import CapitalizeLetter from "../../helper/CapitalizeLetter";
import { useNavigate } from "react-router-dom";


const CardCategoryLanding = ({id, title, description, link}) => {

    const navigate = useNavigate()

    function detailHandler(){
        navigate(
            `/category/${id}`,
            {
                state:
                {
                    id,
                    title,
                    description,
                    link
                }
            }
        )
    }

    return(
        <Col>
            <Card style={{ width: "18rem" }} className="mt-5">
            <Card.Img
                variant="top"
                src={link}
                style={{ width: "100%", height: "10rem", objectFit: "cover" }}
            />
            <Card.Body>
                <Card.Title>{CapitalizeLetter(title)}</Card.Title>
                <Card.Text className="text-truncate">{description}</Card.Text>
                <Button onClick={detailHandler} variant="primary">Details</Button>
            </Card.Body>
        </Card>
        </Col>
    )
}

export default CardCategoryLanding