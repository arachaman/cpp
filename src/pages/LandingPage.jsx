import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../css/landingPage.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navigation from './Navigation'
import NavigationUser from './user/NavigationUser'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../config/fb'
import ListProductLanding from "../components/LandingPage/ListProductLanding";
import { UserAuth } from '../context/AuthContext';
import CardCategoryLanding from "../components/LandingPage/CardCategoryLanding";
import Footer from "./Footer";


const LandingPages = () => {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getCollection = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    }
    getCollection()
  }, [])

  useEffect(() => {
    const getCollection = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
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
      <div className={`${styles.banner} text-white `}>
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <h1>
            WELCOME TO <br /> C-WAREHOUSE
          </h1>
          <h3 className="fw-normal">

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ipsa
            quaerat soluta quod! Minus hic ad maxime soluta iure magnam.
          </h3>
        </div>
      </div>
      <Container>
        <Row id="collection">
          <Col className="text-center mt-4">
            <h1 >COLLECTION</h1>
            <Row className="justify-content-md-center">
              {
                products.map((prod, i) => {
                  return i <= 3
                    ? (
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
                    )
                    : null
                })
              }
            </Row>
            <Button
              style={{ width: "18rem" }}
              className=" mt-3 px-5"
              size="lg"
              variant="primary"
              onClick={() => navigate('/listproducts')}
            >
              See More Products
            </Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row id="category">
          <Col className="text-center mt-4">
            <h1 >CATEGORY</h1>
            <Row>
              {
                categories.map((cat, i) => {
                  return i <= 3
                    ? (
                      <CardCategoryLanding
                        key={cat.id}
                        id={cat.id}
                        title={cat.data.title}
                        description={cat.data.description}
                        link={cat.data.link}
                      />
                    )
                    : null
                })
              }
            </Row>
            <Button
              style={{ width: "18rem" }}
              className=" mt-3 px-5"
              size="lg"
              variant="primary"
              onClick={() => navigate('/listcategories')}
            >
              See More Categories
            </Button>
          </Col>
        </Row>
      </Container>
      <Container id="about" className="text-center mt-5">
        <h1>About Us</h1>
        <div>
          <Row>
            <Col md={{ span: 6 }} sm={12}>
              <img src="https://eslbrains.com/wp-content/uploads/2022/01/Im-afraid-thats-outside-the-scope-of-this-meeting-473x381.png" alt="" />
            </Col>
            <Col className="align-self-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta magnam laborum in aliquam? Minima, reprehenderit nesciunt est pariatur magnam natus deleniti ad labore dolorum distinctio nostrum vero facilis et suscipit enim vel ratione ducimus consequatur facere nam aspernatur? Maiores minus officia, animi cumque nobis fugiat modi, quam perspiciatis tempora vero quos temporibus omnis quae recusandae magnam deserunt? Eos ab corrupti labore eaque alias, consequuntur ullam quasi. Inventore aspernatur consectetur quod est alias illo, sapiente enim deserunt a. Recusandae aliquid minus tempore! Nihil a at ipsam accusantium aliquid, eaque, est expedita esse, culpa possimus excepturi placeat rerum nobis amet incidunt non!
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </div>

  );
};

export default LandingPages;
