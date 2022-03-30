import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register({ setShowRegister }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("https://mappinlocation.herokuapp.com/api/users/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <>
      <div className="registerContainer">
        <div className="logo">
          <Room className="logoIcon" />
          <span>RESIGTER</span>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <form onSubmit={handleSubmit}>
          <input autoFocus placeholder="username" ref={usernameRef} />
          <input type="email" placeholder="email" ref={emailRef} />
          <input
            type="password"
            min="6"
            placeholder="password"
            ref={passwordRef}
          />
          <button className="registerBtn" type="submit">
            Register
          </button>
          {success &&
            (toast.success("Successfully Registered", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }),
            (<span className="success">YOU CAN LOGIN NOW</span>))}
          {error && (toast.error("Something went wrong", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }), (<span className="failure">TRY AGAIN</span>))}
        </form>
        <ToastContainer />
        <Cancel
          className="registerCancel"
          onClick={() => setShowRegister(false)}
        />
      </div>
    </>
  );
}
