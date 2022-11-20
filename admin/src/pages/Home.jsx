import React from "react";
import CategoryList from "../component/CategoryList";
import Products from "../component/Products";
import Slider from "../component/Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <CategoryList />
      <Products category={""} filter={""} sort={""} />
    </div>
  );
};

export default Home;
