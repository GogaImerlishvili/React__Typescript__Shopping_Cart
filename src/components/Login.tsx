import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MDBInput } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../services/authApi";
import { useAppDispatch } from "../hooks/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../features/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { firstName, lastName, email, password, confirmPassword } = formValue;
  const [showRegister, setShowRegister] = useState(false);
  const dispatch = useAppDispatch();

  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();
  const navigate = useNavigate();

  const [registerUser,
    {
    data: registerData,
    isSuccess: isRegisterSUcces,
    isError: isRegisterError,
    error: registerError,
  },
] = useRegisterUserMutation()

  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (email && password) {
      await loginUser({ email, password });
    } else {
      toast.error("Please fill all Input field");
    }
  };

  const handleRegister =async () => {
    if(password !== confirmPassword){
        return toast.error("Password don't match")
    }
    if(firstName && lastName && password && email){
        await registerUser({firstName,lastName,email,password})
    }
  }

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("User Login Successfully", {
        icon: "🚀",
      });
      dispatch(
        setUser({ name: loginData.result.name, token: loginData.token })
      );
      navigate("/dashboard");
    }

    if (isRegisterSUcces) {
        toast.success("User Register Successfully", {
          icon: "🚀",
        });
        dispatch(
          setUser({ name: registerData.result.name, token: registerData.token })
        );
        navigate("/dashboard");
      }
  }, [isLoginSuccess,isRegisterSUcces]);

  useEffect(() => {
    if(isLoginError){
        toast.error((loginError as any).data.message)
    }

    if(isRegisterError){
        toast.error((registerError as any).data.message)
    }

  },[isLoginError,isRegisterError])
  return (
    <section className="vh-120 gradient-custom">
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-4 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">
                    {!showRegister ? "Login" : "Register"}
                  </h2>
                  <p className="text-white-50 mt-4">
                    {!showRegister
                      ? "Please enter your Email & Password"
                      : "Please enter User detail"}
                  </p>
                  {showRegister && (
                    <>
                      <div className="form-outline form-white mb-4">
                        <label htmlFor="first-name" className="firstName-label">
                          First Name
                        </label>
                        <MDBInput
                          type="text"
                          id="first-name"
                          name="firstName"
                          value={firstName}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-outline form-white mb-4">
                        <label htmlFor="last-name" className="password-label">
                          Last Name
                        </label>
                        <MDBInput
                          type="text"
                          id="last-name"
                          name="lastName"
                          value={lastName}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </>
                  )}
                  <div className="form-outline form-white mb-4">
                    <label htmlFor="form1" className="email-label">
                      Email
                    </label>
                    <MDBInput
                      type="email"
                      id="form1"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-outline form-white mb-4">
                    <label htmlFor="form2" className="password-label">
                      Password
                    </label>
                    <MDBInput
                      type="password"
                      id="form2"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  {showRegister && (
                    <div className="form-outline form-white mb-4">
                      <label htmlFor="confirm" className="confirm-label">
                        Confirm Password
                      </label>
                      <MDBInput
                        type="password"
                        id="confirm"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  )}
                  {!showRegister ? (
                    <Button
                      variant="primary"
                      className="mt-4"
                      size="lg"
                      style={{ width: "12rem" }}
                      onClick={() => handleLogin()}
                    >
                      Login
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      className="mt-4"
                      size="lg"
                      style={{ width: "12rem" }}
                      onClick={() => handleRegister()}
                    >
                      Register
                    </Button>
                  )}
                </div>
                <div>
                  <h5 className="mb-0">
                    {!showRegister ? (
                      <>
                        Don't have an account?
                        <p
                          className="text-white-50 fw-bold"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowRegister(true)}
                        >
                          Sing up
                        </p>
                      </>
                    ) : (
                      <>
                        Already have an account ?
                        <p
                          className="text-white-50 fw-bold"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowRegister(false)}
                        >
                          Sing in
                        </p>
                      </>
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
