import React, { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../adduser/add.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import toast from "react-hot-toast";

const Edit = ({ user, open, onClose, onUpdate, setEditOpen }) => {
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  // const navigate = useNavigate();

  useEffect(() => {
    setUpdatedUser({ ...user });
  }, [user]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/update/${user._id}`,
        updatedUser
      );
      toast.success(response.data.msg, { position: "top-right" });
      setEditOpen(false);
      onUpdate(response.data.updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
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
          value={updatedUser.fname}
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
          value={updatedUser.lname}
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
          value={updatedUser.email}
          onChange={inputHandler}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>
          Update User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Edit;

// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import axios from "axios";
// import "../adduser/add.css";
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import toast from 'react-hot-toast';

// const Edit = () => {

//  const users = {
//     fname: "",
//     lname: "",
//     email: ""
//  }

//  const {id} = useParams();
//  const navigate = useNavigate();
//  const [user, setUser] = useState(users);
//  const [open, setOpen] = React.useState(false);

//  const inputHandler = (e) =>{
//     const {name, value} = e.target;
//     setUser({...user, [name]:value});
//     console.log(user);
//  }

//  useEffect(()=>{
//     axios.get(`http://localhost:8000/api/getone/${id}`)
//     .then((response)=>{
//         setUser(response.data)
//     })
//     .catch((error)=>{
//         console.log(error);
//     })
//  },[id])

//  const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//  const handleSubmit = async(e)=>{
//     e.preventDefault();
//     await axios.put(`http://localhost:8000/api/update/${id}`, user)
//     .then((response)=>{
//        toast.success(response.data.msg, {position:"top-right"})
//        navigate("/")
//     })
//     .catch(error => console.log(error))
//  }

//   return (
//     <div className='addUser'>
//         <Button variant="outlined" onClick={handleClickOpen} className='addButton'>
//         <i className="fa-solid fa-pen-to-square"></i>
//       </Button>

//       {/* Dialog for adding a new user */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add New User</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="fname"
//             name="fname"
//             label="First Name"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={user.fname}
//             onChange={inputHandler}
//           />
//           <TextField
//             margin="dense"
//             id="lname"
//             name="lname"
//             label="Last Name"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={user.lname}
//             onChange={inputHandler}
//           />
//           <TextField
//             margin="dense"
//             id="email"
//             name="email"
//             label="Email Address"
//             type="email"
//             fullWidth
//             variant="standard"
//             value={user.email}
//             onChange={inputHandler}
//           />

//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button type="submit" onClick={handleSubmit}>Update User</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   )
// }

// export default Edit
