import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./bootstrap.css";
import Base from "./Components/Base";
import Login from "./Components/Login";
import AddBook from "./Components/ADMIN/AddBook";
import EditBook from "./Components/ADMIN/EditBook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReaderSelectedBook from "./Components/READER/ReaderSelectedBook";
import AdminSelectedBook from "./Components/ADMIN/AdminSelectedBook";
import AdminBooksList from "./Components/ADMIN/AdminBooksList";
import ReaderBooksList from "./Components/READER/ReaderBooksList";

function App() {
  const [Data_visible, setData_visible] = useState(true);
  const [Animate_visible, setAnimate_visible] = useState(true);
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login setAnimate_visible={setAnimate_visible} />}
          />
          <Route
            path="/dashboard"
            element={
              <Base
                Animate_visible={Animate_visible}
                setAnimate_visible={setAnimate_visible}
              />
            }
          >
            <Route path="AddBook" element={<AddBook />} />
            <Route path="EditBook/:BookId" element={<EditBook />} />
            <Route
              path="Reader-BooksList"
              element={
                <ReaderBooksList
                  Data_visible={Data_visible}
                  setData_visible={setData_visible}
                />
              }
            />
            <Route
              path="Admin-BooksList"
              element={
                <AdminBooksList
                  Data_visible={Data_visible}
                  setData_visible={setData_visible}
                />
              }
            />
            <Route
              path="Admin-SelectedBook/:BookId"
              element={
                <AdminSelectedBook
                  Data_visible={Data_visible}
                  setData_visible={setData_visible}
                />
              }
            />
            <Route
              path="Reader-SelectedBook/:BookId"
              element={
                <ReaderSelectedBook
                  Data_visible={Data_visible}
                  setData_visible={setData_visible}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;