import Signup from "../../components/Auth/Signup";
import { useEffect } from "react";

function SignupPage() {

  //  useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch('http://localhost:5000/auth/signup');
  //     const data = await response.json();
  //     console.log(data);
  //   }
  //   fetchData();
  //  }, []);
  
  return (
    <Signup />
  )
}

export default SignupPage