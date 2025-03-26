import axios from "axios";


export const HandleLogin = async ({ email, password }) => {
  try {
    const response = await axios.post("http://192.168.1.105:5000/auth/login", {
      email,
      password,
    });

    if (response.status === 200) {
      const { user } = response.data; 
      const userValue = JSON.stringify(user);
        localStorage.setItem("user", userValue);
      return user;
    }
  } catch (error) {
    if (error.response) {
      console.error("Erreur serveur :", error.response.data);
      return { error: error.response.data.message };
    } else if (error.request) {
      console.error("Aucune réponse du serveur :", error.request);
      return { error: "Aucune réponse du serveur." };
    } else {
      console.error("Erreur lors de la requête :", error.message);
      return { error: "Une erreur inconnue est survenue." };
    }
  }
};


export const handleSignup = async ({email, password, first_name, last_name , role}) => {
    try{
        const response = await axios.post("http://192.168.1.105:5000/auth/register", {
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
        const response = await axios.post("http://192.168.1.105:5000/auth/verify-email", {
            otp
        });
        return response.data;
    }
    catch(error){
        console.log(error)
    }
}
