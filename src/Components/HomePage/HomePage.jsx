import Network from "../../assets/Videos/Network.webm";
import Button from '@mui/material/Button';

import {NavLink} from "react-router-dom";


const HomePage = () => {
  return (
    <>  
        <video autoPlay loop muted width="100%" className="absolute -z-10">
            <source src={Network} type="video/webm" />
        </video>  
        <div className="flex flex-col justify-center items-center gap-5 w-full h-screen">
            <h1 className="text-5xl text-white font-extrabold w-[70%] text-center">
                Predictive insights in Health Care:
            </h1>
            <h2 className="text-3xl text-white font-extrabold w-[70%] text-center">
                Advancing disease prediction with machine learning approach
            </h2>
            {/* <NavLink to="/login">
                <Button
                    color="secondary"
                    size="large"
                    variant="contained"
                >
                    Get Started
                </Button>
            </NavLink> */}
            <NavLink to="/disease">
                <Button
                    color="secondary"
                    size="large"
                    variant="contained"
                >
                    Disease
                </Button>
            </NavLink>
            {/* <NavLink to="http://localhost:3000">
                <Button
                    color="secondary"
                    size="large"
                    variant="contained"
                >
                    Chat with our AI
                </Button>
            </NavLink> */}
        </div>
    </>
  )
}

export default HomePage