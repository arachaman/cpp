import React, { useEffect, useState } from "react"
import NavigationUser from "./user/NavigationUser"
import Navigation from "./Navigation"
import { UserAuth } from '../context/AuthContext'
import { collection, getDocs, query } from "firebase/firestore"
import { Container, Row } from "react-bootstrap"
import { db } from '../config/fb'
import CardCategoryLanding from "../components/LandingPage/CardCategoryLanding"



const ListCategories = () => {

    const { user } = UserAuth()

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getCollection = async () => {

            const q = query(collection(db, "categories"));

            const querySnapshot = await getDocs(q);
            setCategories(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))

        }
        getCollection()
    }, [])

    return (
        <div>
            {user != null ? <NavigationUser /> : <Navigation />}
            <h1 className="display-4 fw-bold text-center mt-1">Categories</h1>
            <Container className="mb-2">
                <Row id="collection" className="justify-content-md-center">
                    {
                        categories.map((cat) =>
                        (
                            <CardCategoryLanding
                                key={cat.id}
                                id={cat.id}
                                title={cat.data.title}
                                description={cat.data.description}
                                link={cat.data.link}
                            />
                        ))
                    }
                </Row>
            
            </Container>
        </div>
    )
}

export default ListCategories