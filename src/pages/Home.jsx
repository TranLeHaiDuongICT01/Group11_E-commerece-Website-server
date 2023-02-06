import React from "react";
import CategoryList from "../component/CategoryList";
import Newsletter from "../component/Newsletter";
import Products from "../component/Products";
import Slider from "../component/Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <CategoryList />
      <Products category={""} filter={""} sort={""} />
      <Newsletter />
    </div>
  );
};

export default Home;
