import {useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import { MDBModal,MDBModalDialog,MDBModalContent } from 'mdb-react-ui-kit';

const LoadingToRedirect = () => {
    const [count,setCount] = useState(3)
    const navigate = useNavigate()

    useEffect(() => {
const interval = setInterval(() => {
    setCount((currentCount) => currentCount - 1)
},300)

count === 0 && navigate("/register")

return () => clearInterval(interval);
    },[count,navigate])
  return (
    <div className="vh-100 gradient-custom">
        <MDBModal show={true}>
            <MDBModalDialog centered>
                <MDBModalContent>
                    <p className="mt-3">Redirectiong you in {count} sec</p>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    </div>
  )
}

export default LoadingToRedirect