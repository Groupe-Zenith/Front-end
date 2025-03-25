import axios from "axios";

export const handleSignup = async ({email, password, first_name, last_name , role}) => {
    try{
        const response = await axios.post("http://localhost:5000/auth/register", {
            email,
            password,
            first_name,
            last_name,
            role
        });
        return response.data;
    }
    catch(error){
        console.log(error)
    }

}
export const handleOTP = async ({ otp }) => {
    try{
        const response = await axios.post("http://localhost:5000/auth/verify", {
            otp
        });
        return response.data;
    }
    catch(error){
        console.log(error)
    }
}

