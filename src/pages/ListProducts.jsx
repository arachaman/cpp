import React, { useEffect, useState } from "react"
import NavigationUser from "./user/NavigationUser"
import Navigation from "./Navigation"
import { UserAuth } from '../context/AuthContext'
import { collection, getDocs, query } from "firebase/firestore"
import { Container, Row } from "react-bootstrap"
import { db } from '../config/fb'
import ListProductLanding from "../components/LandingPage/ListProductLanding"



const ListProducts = () => {

    const { user } = UserAuth()

    const [products, setProducts] = useState([])

    useEffect(() => {
        const getCollection = async () => {

            const q = query(collection(db, "products"));

            const querySnapshot = await getDocs(q);
            setProducts(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))

        }
        getCollection()
    }, [])

    return (
        <div>
            {user != null ? <NavigationUser /> : <Navigation />}
            <h1 className="display-4 fw-bold text-center mt-1">Products</h1>
            <Container className="mb-2">
                <Row id="collection" className="justify-content-md-center">
                    {
                        products.map((prod) => (
                            <ListProductLanding
                                key={prod.id}
                                id={prod.id}
                                title={prod.data.title}
                                price={prod.data.price}
                                link={prod.data.link}
                                stock={prod.data.stock}
                                description={prod.data.description}
                                category={prod.data.category}
                            />
                        ))
                    }
                </Row>
            
            </Container>
        </div>
    )
}

export default ListProducts