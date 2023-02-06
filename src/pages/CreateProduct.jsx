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
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckGroup from "../component/CheckGroup";
import { uploadImage } from "../redux/apiCalls";
import TransitionsModal from "../component/Modal";
const categoryList = ["man", "woman", "tshirt", "jeans", "shoes"];
const colorList = ["black", "red", "blue", "white", "yellow"];
const sizeList = ["XS", "S", "M", "L", "XL"];
const CreateProduct = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { isFetching } = useSelector((state) => state.product);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({
    title: "",
    price: "",
    description: "",
    images: [],
    categories: [],
    size: [],
    color: [],
  });
  const [clear, setClear] = useState(false);
  const [fileImages, setFileImages] = useState([]);
  const [images, setImages] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.categories.length === 0)
      return alert("Please one choose category");
    if (data.size.length === 0) return alert("Please one choose size");
    if (data.color.length === 0) return alert("Please one choose color");
    uploadImage(dispatch, fileImages, currentUser?.token, data);

    // const { data: imageData } = await axios.post(`${baseURL}/api/upload`, formData, {
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //     Authorization: 'Bearer ' + auth?.token
    //   }
    // })
    // dispatch(createProduct({ ...data, images: imageData }))
    handleClear();
    setOpenModal(true);
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleChangeFile = async (e) => {
    e.preventDefault();
    const files = e.target?.files;
    if (!files || files.length === 0) {
      document.getElementById("file_up").value = "";
      return window.alert("File does not exist");
    }
    for (let i = 0; i < files.length; i++) {
      if (files[i]?.size > 1024 * 1024) {
        document.getElementById("file_up").value = "";
        return window.alert("File is too large");
      }
      if (
        files[i]?.type !== "image/jpg" &&
        files[i]?.type !== "image/jpeg" &&
        files[i]?.type !== "image/png"
      ) {
        document.getElementById("file_up").value = "";
        return window.alert("File is not an image");
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((oldArr) => [...oldArr, e.target.result]);
      };
      reader.readAsDataURL(files[i]);
      setFileImages((oldArr) => [...oldArr, files[i]]);
    }
  };
  const handleDeleteImage = (e) => {
    if (e) e.preventDefault();
    setImages([]);
    setFileImages([]);
    document.getElementById("file_up").value = "";
  };

  const handleClear = (e) => {
    if (e) e.preventDefault();
    handleDeleteImage();
    setData({
      title: "",
      price: "",
      description: "",
      images: [],
      categories: [],
      size: [],
      color: [],
    });
    setClear(true);
  };
  if (isFetching) return <CircularProgress />;
  return (
    <Container sx={{ marginTop: "20px" }}>
      <TransitionsModal
        text="Create product successfully"
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
              clear={clear}
              setClear={setClear}
            />
            <CheckGroup
              list={sizeList}
              name="size"
              data={data}
              setData={setData}
              clear={clear}
              setClear={setClear}
            />
            <CheckGroup
              list={colorList}
              name="color"
              data={data}
              setData={setData}
              clear={clear}
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
                    height: "200px",
                    border: "1px solid #ccc",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: "100%", objectFit: "cover", height: "100%" }}
                    id="imageSeen"
                    image={image}
                    alt=""
                  />
                  {images && images.length > 0 && (
                    <button
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        cursor: "pointer",
                      }}
                      onClick={handleDeleteImage}
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
            </div>
            <input
              style={{
                width: "100%",
              }}
              type="file"
              name="file"
              id="file_up"
              onChange={handleChangeFile}
              multiple
              required
            />
            <Button variant="contained" type="submit" color="primary" fullWidth>
              Submit
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

export default CreateProduct;
