import axios from "axios";

export const handleSignup = async ({email, password, first_name, last_name , role}) => {
    try{
        const response = await axios.post("http://192.168.137.1:5000/auth/register", {
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
export const handleOTP = async ({ email, otp }) => {
    try{
        const response = await axios.post("http://192.168.137.1:5000/auth/verify", {
            email,
            otp
        });
        return response.data;
    }
    catch(error){
        console.log(error)
    }
}
