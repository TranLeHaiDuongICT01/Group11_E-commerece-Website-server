import React from "react";
import { Container } from "./style-component/Announcement";

const Announcement = ({ user }) => {
  return (
    <Container style={{ display: user ? "" : "none" }}>
      Super Deal! Free Shipping on Orders Over $50
    </Container>
  );
};

export default Announcement;
