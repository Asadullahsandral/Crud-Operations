import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import toast from "react-hot-toast";
// import { Link, useNavigate } from "react-router-dom";

function Add({ fetchData, setFilteredUsers, filteredUsers }) {
  const [users, setUsers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  // const navigate = useNavigate();
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/getall");
      setUsers(response.data);
    };

    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/create",
        user
      );
      toast.success(response.data.msg, { position: "top-right" });
      setOpen(false);
      // console.log(response.status);

      if (response.status === 200) {
        console.log("ok");

        setFilteredUsers((prev) =>
          prev.map((user) =>
            user.email === response.data.user ? response.data.user : user
          )
        );
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        className="addButton"
      >
        Add User
      </Button>

      {/* Dialog for adding a new user */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="fname"
            name="fname"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            value={user.fname}
            onChange={inputHandler}
          />
          <TextField
            margin="dense"
            id="lname"
            name="lname"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            value={user.lname}
            onChange={inputHandler}
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={user.email}
            onChange={inputHandler}
          />
          <TextField
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={user.password}
            onChange={inputHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Add;
