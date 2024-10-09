import * as React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./user.css";
import Edit from "./Edit";
import Add from "./Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import Test from "./Test";

const User = () => {
  const [users, setUsers] = React.useState([]);
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [editOpen, setEditOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getall");
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = users.filter(
      (user) =>
        `${user.fname} ${user.lname}`.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
    setPage(0);
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/delete/${userId}`
      );
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      setFilteredUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
      toast.success(response.data.msg, { position: "top-right" });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleUpdate = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
    setFilteredUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
    setEditOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="userTable">
      {/* <Test style={{ display: "flex" }} /> */}
      <Add
        style={{ display: "flex" }}
        fetchData={fetchData}
        setFilteredUsers={setFilteredUsers}
        filteredUsers={filteredUsers}
      />

      <Box sx={{ marginBottom: 2, marginTop: 3 }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell style={{ textAlign: "left" }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell style={{ textAlign: "left" }}>
                    {user.fname} {user.lname}
                  </TableCell>
                  <TableCell style={{ textAlign: "left" }}>
                    {user.email}
                  </TableCell>
                  <TableCell align="center">
                    <button onClick={() => deleteUser(user._id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <button
                      onClick={() => handleEditClick(user)}
                      style={{ backgroundColor: "#4CAF50", marginLeft: "10px" }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {selectedUser && (
        <Edit
          user={selectedUser}
          open={editOpen}
          onClose={handleEditClose}
          onUpdate={handleUpdate}
          setEditOpen={setEditOpen}
        />
      )}
    </div>
  );
};

export default User;

// import * as React from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import './user.css';
// import Edit from './Edit';
// import Add from './Add';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';

// const User = () => {
//   const [users, setUsers] = React.useState([]);
//   const [filteredUsers, setFilteredUsers] = React.useState([]);
//   const [selectedUser, setSelectedUser] = React.useState(null);
//   const [editOpen, setEditOpen] = React.useState(false);
//   const [searchTerm, setSearchTerm] = React.useState('');
//   const fetchData = async () => {
//     const response = await axios.get("http://localhost:8000/api/getall");
//     setUsers(response.data);
//     setFilteredUsers(response.data);
//   };
//   React.useEffect(() => {

//     fetchData();
//   }, []);

//   const handleSearchChange = (event) => {
//     const value = event.target.value.toLowerCase();
//     setSearchTerm(value);
//     const filtered = users.filter(user =>
//       `${user.fname} ${user.lname}`.toLowerCase().includes(value) ||
//       user.email.toLowerCase().includes(value)
//     );
//     setFilteredUsers(filtered);
//   };

//   const deleteUser = async (userId) => {
//     await axios.delete(`http://localhost:8000/api/delete/${userId}`)
//       .then((response) => {
//         setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
//         setFilteredUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
//         toast.success(response.data.msg, { position: 'top-right' });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleEditClick = (user) => {
//     setSelectedUser(user);
//     setEditOpen(true);
//   };

//   const handleEditClose = () => {
//     setEditOpen(false);
//   };

//   const handleUpdate = (updatedUser) => {
//     setUsers((prevUsers) =>
//       prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
//     );
//     setFilteredUsers((prevUsers) =>
//       prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
//     );
//     setEditOpen(false);
//   };

//   return (
//     <div className='userTable'>
//       <Add fetchData={fetchData}/>

//       <Box sx={{ marginBottom: 2,marginTop:3 }}>
//         <TextField
//           label="Search"
//           variant="outlined"
//           fullWidth
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//       </Box>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="user table">
//           <TableHead>
//             <TableRow>
//               <TableCell>S.No.</TableCell>
//               <TableCell>User Name</TableCell>
//               <TableCell>User Email</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredUsers.map((user, index) => (
//               <TableRow key={user._id}>
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell style={{textAlign:'left'}}>{user.fname} {user.lname}</TableCell>
//                 <TableCell style={{textAlign:'left'}}>{user.email}</TableCell>
//                 <TableCell align="center">
//                   <button onClick={() => deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
//                   <button onClick={() => handleEditClick(user)} style={{ backgroundColor: '#4CAF50',marginLeft:'10px' }}>
//                     <i className="fa-solid fa-pen-to-square"></i>
//                   </button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {selectedUser && (
//         <Edit
//           user={selectedUser}
//           open={editOpen}
//           onClose={handleEditClose}
//           onUpdate={handleUpdate}
//           setEditOpen={setEditOpen}
//         />
//       )}
//     </div>
//   );
// };

// export default User;

// import * as React from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import './user.css';
// import Edit from './Edit';
// import Add from './Add';

// const User = () => {
//   const [users, setUsers] = React.useState([]);
//   const [selectedUser, setSelectedUser] = React.useState(null);
//   const [editOpen, setEditOpen] = React.useState(false);

//   React.useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get("http://localhost:8000/api/getall");
//       setUsers(response.data);
//     };
//     fetchData();
//   }, []);

//   const deleteUser = async (userId) => {
//     await axios.delete(`http://localhost:8000/api/delete/${userId}`)
//       .then((response) => {
//         setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
//         toast.success(response.data.msg, { position: 'top-right' });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleEditClick = (user) => {
//     setSelectedUser(user);
//     setEditOpen(true);
//   };

//   const handleEditClose = () => {
//     setEditOpen(false);
//   };

//   const handleUpdate = (updatedUser) => {

//     setUsers((prevUsers) =>
//       prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
//     );
//     setEditOpen(false);
//   };

//   return (
//     <div className='userTable'>
//         <Add />
//       <table border={1} cellPadding={10} cellSpacing={0}>
//         <thead>
//           <tr>
//             <th>S.No.</th>
//             <th>User Name</th>
//             <th>User Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={user._id}>
//               <td>{index + 1}</td>
//               <td>{user.fname} {user.lname}</td>
//               <td>{user.email}</td>
//               <td className='actionButtons'>
//                 <button onClick={() => deleteUser(user._id)} ><i className="fa-solid fa-trash"></i></button>
//                 <button onClick={() => handleEditClick(user)}
//                 style={{ backgroundColor: '#4CAF50'}}><i className="fa-solid fa-pen-to-square"></i></button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {selectedUser && (
//         <Edit
//           user={selectedUser}
//           open={editOpen}
//           onClose={handleEditClose}
//           onUpdate={handleUpdate}
//         />
//       )}
//     </div>
//   );
// };

// export default User;

// import * as React from 'react';
// import Add from './Add';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import './user.css';
// import { Link } from 'react-router-dom'

// const User = () => {
//   const [users, setUsers] = React.useState([]);
//   const [user, setUser] = React.useState({
//     fname: '',
//     lname: '',
//     email: '',
//     password: ''
//   });

//   React.useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get("http://localhost:8000/api/getall");
//       setUsers(response.data);
//     };

//     fetchData();
//   }, []);

//   const deleteUser = async (userId) => {
//     await axios.delete(`http://localhost:8000/api/delete/${userId}`)
//       .then((response) => {
//         setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
//         toast.success(response.data.msg, { position: 'top-right' });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div className='userTable'>
//       <Add />

//       <table border={1} cellPadding={10} cellSpacing={0}>
//         <thead>
//           <tr>
//             <th>S.No.</th>
//             <th>User name</th>
//             <th>User Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={user._id}>
//               <td>{index + 1}</td>
//               <td>{user.fname} {user.lname}</td>
//               <td>{user.email}</td>
//               <td className='actionButtons'>
//               <button onClick={()=> deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
//               <Link to={`/edit/`+user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
//                 {/* <Button onClick={() => deleteUser(user._id)}>Delete</Button> */}
//                 {/* Add any other buttons you need, such as edit */}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default User;

// import React, { useEffect, useState } from 'react'
// import axios from "axios";
// import toast from "react-hot-toast";
// import "./user.css";
// import { Link } from 'react-router-dom'

// const User = () => {

//   const [users, setUsers] = useState([]);

//   useEffect(()=>{

//     const fetchData = async()=>{
//         const response = await axios.get("http://localhost:8000/api/getall");
//         setUsers(response.data);
//     }

//     fetchData();

//   },[])

//   const deleteUser = async(userId) =>{
//       await axios.delete(`http://localhost:8000/api/delete/${userId}`)
//       .then((respones)=>{
//         setUsers((prevUser)=> prevUser.filter((user)=> user._id !== userId))
//         toast.success(respones.data.msg, {position: 'top-right'})
//       })
//       .catch((error) =>{
//         console.log(error);
//       })
//   }

//   return (
//     <div className='userTable'>
//         <Link to={"/add"} className='addButton'>Add User</Link>
//         <table border={1} cellPadding={10} cellSpacing={0}>
//             <thead>
//                 <tr>
//                     <th>S.No.</th>
//                     <th>User name</th>
//                     <th>User Email</th>
//                     <th>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     users.map((user, index)=>{
//                         return(
//                         <tr key={user._id}>
//                             <td>{index + 1}</td>
//                             <td>{user.fname} {user.lname}</td>
//                             <td>{user.email}</td>
//                             <td className='actionButtons'>
//                                 <button onClick={()=> deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
//                                 <Link to={`/edit/`+user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
//                             </td>
//                         </tr>
//                         )
//                     })
//                 }

//             </tbody>
//         </table>
//     </div>
//   )
// }

// export default User
