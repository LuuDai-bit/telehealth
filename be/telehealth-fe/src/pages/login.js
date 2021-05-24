import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./login/login.scss";
import { navigate } from "gatsby"

import Layout from "../components/layout";
import SEO from "../components/seo";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const user = {
      email: email,
      password: password
    }
    Axios.post(`/api/v1/auth/login`, user)
    .then(res => {
      if(res.data.jwt_token) {
        console.log("Redirecting...");

        navigate("/");
      }
      toast.error(res.data.message);
    })
    .catch(error => {
      toast.error(error.message);
    })
  }

  return (
    <Layout>
      <SEO title="Login page" />
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    </Layout>
  );
}

export default Login
