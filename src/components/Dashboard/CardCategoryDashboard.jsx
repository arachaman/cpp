import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Card, Button,} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import CapitalizeLetter from '../../helper/CapitalizeLetter';

const CardCategoryDashboard = ({id, title, desc, link, onDeleteHandler}) => {

  const navigate = useNavigate()

  function deleteHandler(){
    onDeleteHandler(id);
  }

  function updateHandler(){
    navigate(
      '/dashboard/editcategory',
      { state: 
        { 
          id,
          title,
          desc,
          link
        } 
      }
    );
  }

  return (
    <Col className="">
      <Card style={{ width: "18rem" }} className="mt-5">
        <Card.Img
          variant="top"
          src={link}
          style={{ width: "100%", height: "10rem", objectFit: "cover" }}
          lazy="loading"
        />
        <Card.Body>
          <Card.Title>{CapitalizeLetter(title)}</Card.Title>
          <Card.Text className="text-truncate">{desc}</Card.Text>
          <Button onClick={updateHandler} variant="primary">Edit</Button>{' '}
          <Button onClick={deleteHandler} variant="danger">Delete</Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default CardCategoryDashboard