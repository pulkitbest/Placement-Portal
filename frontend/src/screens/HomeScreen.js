import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Route } from "react-router-dom";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import SearchBox from "../components/SearchBox";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({ history, match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList); //works as usestate
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  var sortedProducts = products;
  sortedProducts.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
  );

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listProducts(keyword)); //this fills our state
    }
  }, [dispatch, keyword, userInfo, history]);

  return (
    <>
      <h1>Announcements</h1>
      <Route render={({ history }) => <SearchBox history={history} />} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          {sortedProducts.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
