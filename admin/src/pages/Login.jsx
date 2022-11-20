import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { resetError } from "../redux/userRedux";
import {
  Container,
  Wrapper,
  Title,
  Form,
  Input,
  Link,
  Error,
} from "./style-component/Login";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navi = useNavigate();
  useEffect(() => {
    if (error) dispatch(resetError());
  }, [dispatch]);

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, formData);
  };
  return (
    <Container>
      <Wrapper>
        <Title>LOG IN</Title>
        <Form>
          <Input
            placeholder="Email"
            name="email"
            value={formData.name}
            onChange={inputHandler}
            required
          />
          <Input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={inputHandler}
            required
          />
          <Button
            fullWidth
            variant="contained"
            style={{ backgroundColor: "teal", margin: "20px 0" }}
            onClick={handleClick}
          >
            LOG IN
          </Button>
          {error && <Error>{error}</Error>}
          <Link>DO YOU FORGET YOUR PASSWORD?</Link>
          <Link onClick={() => navi("/register")}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
