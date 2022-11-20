import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Container,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckGroup from "../component/CheckGroup";
import TransitionsModal from "../component/Modal";
import { useLocation, useParams } from "react-router-dom";
import { Error } from "./style-component/Login";
import { resetError } from "../redux/productRedux";
import { updateProduct } from "../redux/apiCalls";
const categoryList = ["man", "woman", "tshirt", "jeans", "shoes"];
const colorList = ["black", "red", "blue", "white", "yellow"];
const sizeList = ["XS", "S", "M", "L", "XL"];
const EditProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { isFetching, products, error } = useSelector((state) => state.product);
  const findProduct = products?.find((p) => p._id === id);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    ...findProduct,
  });
  const [clear, setClear] = useState(false);
  const [images, setImages] = useState([
    ...data?.images?.map((image) => image.url),
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.categories.length === 0)
      return alert("Please one choose category");
    if (data.size.length === 0) return alert("Please one choose size");
    if (data.color.length === 0) return alert("Please one choose color");
    updateProduct(dispatch, data._id, data, setOpenModal);
  };
  useEffect(() => {
    if (error) dispatch(resetError());
  }, [location]);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClear = (e) => {
    if (e) e.preventDefault();
    setData({
      ...findProduct,
    });
    setClear(true);
  };
  if (isFetching) return <CircularProgress />;
  return (
    <Container sx={{ marginTop: "20px" }}>
      <TransitionsModal
        text="Update product successfully"
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
          padding: "20px",
        }}
      >
        {error && <Error>{error}</Error>}
        <Typography variant="h5">Create Product</Typography>
        <Box sx={{ width: "100%" }}>
          <form
            onSubmit={handleSubmit}
            component={FormControl}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              gap: "20px",
            }}
          >
            <TextField
              name="title"
              variant="outlined"
              label="Title"
              fullWidth={true}
              value={data.title}
              onChange={handleChange}
              required
            />
            <TextField
              className="price-input"
              type="number"
              name="price"
              variant="outlined"
              label="Price(Number only)"
              fullWidth={true}
              value={data.price}
              onChange={handleChange}
              required
            />
            <TextField
              multiline
              rows={4}
              name="description"
              variant="outlined"
              label="Description"
              fullWidth={true}
              value={data.description}
              onChange={handleChange}
              required
            />
            <CheckGroup
              list={categoryList}
              name="category"
              data={data}
              setData={setData}
              setClear={setClear}
            />
            <CheckGroup
              list={sizeList}
              name="size"
              data={data}
              setData={setData}
              setClear={setClear}
            />
            <CheckGroup
              list={colorList}
              name="color"
              data={data}
              setData={setData}
              setClear={setClear}
            />
            <div
              style={{
                position: "relative",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              {images?.map((image, i) => (
                <div
                  key={i}
                  style={{
                    maxWidth: "200px",
                    border: "1px solid #ccc",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: "100%",
                      objectFit: "cover",
                      maxHeight: "700px",
                      height: "100%",
                    }}
                    id="imageSeen"
                    image={image}
                    alt=""
                  />
                </div>
              ))}
            </div>
            <Button variant="contained" type="submit" color="primary" fullWidth>
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleClear}
              fullWidth
            >
              Clear
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditProduct;
