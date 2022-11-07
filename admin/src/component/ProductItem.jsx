import React, { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Infor, Container, Image, Icon } from "./style-component/ProductItem";
import { deleteProduct } from "../redux/apiCalls";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ProductItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navi = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    deleteProduct(dispatch, id);
  };
  return (
    <Container>
      <Image src={item.images[0]?.url} />
      <Infor>
        <Icon>
          <DeleteOutlineOutlinedIcon onClick={handleOpen} />
        </Icon>

        <Icon onClick={() => navi(`/product/${item._id}`)}>
          <SearchIcon />
        </Icon>

        <Icon onClick={() => navi(`/product/edit/${item._id}`)}>
          <EditOutlinedIcon />
        </Icon>
      </Infor>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure to delete this product?
          </Typography>
          <div className="modal-delete-btn-container">
            <button onClick={handleClose}>Cancel</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        </Box>
      </Modal>
    </Container>
  );
};

export default ProductItem;
