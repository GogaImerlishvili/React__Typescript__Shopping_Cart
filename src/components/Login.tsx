import {useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"

const initialState ={
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const Login = () => {
  const [formValue,setFormValue] = useState(initialState)
  const [showRegister,setShowRegister] = useState(false)
  return (
    <section className="vh-100 gradient-custom">
       <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                    <div className="card-body p-4 text-center">
                        <div className="mb-md-5 mt-md-4 pb-5">
                            <h2 className="fw-bold mb-2 text-uppercase">
                                {!showRegister ? "Login" : "Register"}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </div>
    </section>
  )
}

export default Login