import axios from "axios";


export const HandleLogin = async ({ email, password }) => {
  try {
    const response = await axios.post("http://localhost:5000/auth/login", {
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
        const response = await axios.post("http://localhost:5000/auth/verify-email", {
            otp
        });
        return response.data;
    }
    catch(error){
        console.log(error)
    }
}
export const handleGetUsers = async (role) => {
    try{
        const response = await axios.get(`http://localhost:5000/auth/users/${role}`);
        return response.data;
    }
    catch(error){
        console.log(error)
    }
}

// Fonction pour mettre à jour un utilisateur
// export const handleUpdateUser = async ({ userId, email, password, first_name, last_name, role }) => {
//   try {
//     const response = await axios.put(`http://localhost:5000/auth/user/${userId}`, {
//       email,
//       password,
//       first_name,
//       last_name,
//       role,
//       tel,
//       photo
//     });

//     if (response.status === 200) {
//       const { updatedUser } = response.data;
//       return updatedUser;
//     }
//   } catch (error) {
//     if (error.response) {
//       console.error("Erreur serveur :", error.response.data);
//       return { error: error.response.data.message };
//     } else if (error.request) {
//       console.error("Aucune réponse du serveur :", error.request);
//       return { error: "Aucune réponse du serveur." };
//     } else {
//       console.error("Erreur lors de la requête :", error.message);
//       return { error: "Une erreur inconnue est survenue." };
//     }
//   }
// };

export const handleUpdateUser = async (userData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put("http://localhost:5000/user/me", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error.response?.data || error.message);
    return { status: "error", message: error.response?.data?.message || error.message }; // Retourner un message d'erreur structuré
  }
};
