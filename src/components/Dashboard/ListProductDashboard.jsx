import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Button,} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const ListProductDashboard = (
    {
        id,
        index, 
        title, 
        category,
        stock,
        price,
        link, 
        onDeleteHandler,
        categories
    }) => {

  const navigate = useNavigate()

  function deleteHandler(){
    onDeleteHandler(id);
  }

  function updateHandler(){
    navigate(
        '/dashboard/editproduct',
        { state: 
          { 
            id,
            title,
            category,
            stock,
            price,
            link,
            categories
          } 
        }
    );
  }

  return (
    <tr>
        <td>{index + 1}</td>
        <td>{title}</td>
        <td>{category}</td>
        <td>{price}</td>
        <td>{stock}</td>
        <td>{link}</td>
        <td>
            <Button variant="warning" onClick={updateHandler}>Edit</Button>
            <Button variant="danger" onClick={deleteHandler}>Delete</Button>
        </td>
    </tr>
  )
}

export default ListProductDashboard