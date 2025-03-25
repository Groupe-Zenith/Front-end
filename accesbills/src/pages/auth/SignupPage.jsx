import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Auth.scss";
import { Lock, Mail, ChevronRight, Shield, Code, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { handleSignup } from "../../services/ApiUser";
import { toast } from "sonner"
import { Toaster } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name , setName] = useState("");
  const [lastName , setlastName] = useState("");
  const [role, setRole] = useState("");
  const [scan, setScan] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptcha = (value) => {
    setCaptchaValue(value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!email || !password || !name || !lastName || !role) {
      setIsLoading(false);
      return;
    }
    else if (password.length < 6) {
      setIsLoading(false);
      toast.warning("Le mot de passe est trop court. Merci de reessayer")
    }
    else if (!captchaValue) {
      alert("Veuillez valider le reCAPTCHA");
      return;
    }
    else if (password !== confirmPassword) {
      setIsLoading(false);
      toast.warning("Les mots de passe ne correspondent pas. Merci de reessayer")
    }
   else {
      handleSignup({ email, password, first_name: name, last_name: lastName, role })
        .then((data) => {
            if (data.success) {
            toast.success(data.message);
            setScan(true);
            } else {
            toast.error(data.message);
            }
            setIsLoading(false);
        })

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };}

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };
  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const features = [
      { icon: <Code size={20} />, text: "API des services d'achats" },
        { icon: <Shield size={20} />, text: "Conformité & protection des données" },
        { icon: <FileText size={20} />, text: "Facilitation  des gestions" },
  ];

  return (
    <div className="page-container">
        <Toaster/>
      {/* Container principal */}
      <motion.div
        className="main-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Section gauche (présentation) */}

        <motion.div
          className="card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Accent design element */}
          <motion.div
            className="accent-circle"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="header">
              <motion.div
                className="icon-wrapper"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Shield />
              </motion.div>
              <h1>Access-Bills</h1>
            </div>
            <motion.h2 variants={fadeInUp} initial="hidden" animate="visible">
            For Company
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
             Portail exclusif de gestion au sein des entreprises pour
             des achats des biens communs 
            </motion.p>
          </motion.div>

          {scan ? (
            <ScanComponent />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="features"
            >
              <motion.p variants={itemVariants} className="features-title">
              Avantages et maintenabilite
              </motion.p>

              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="feature-item"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <p>{feature.text}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            className="footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >    © 2025 Access-Bills. Tous droits réservés.
          </motion.div>
        </motion.div>

        {/* Section droite (formulaire) */}
        <motion.div
          className="login-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="form-wrapper">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h2 className="title">Inscription</h2>
              <p className="subtitle">Accédez à votre espace API et services sur les achats</p>
            </motion.div>

            <form onSubmit={handleSubmit}>
              <motion.div
                className="form-fields"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="field">
                  <label htmlFor="email" className="label">
                    Email professionnel
                  </label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <Mail size={18} />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input"
                      placeholder="votre@email.com"
                      required
                    />
                    <motion.div
                      className="input-focus-line"
                      initial={{ width: 0 }}
                      whileFocus={{ width: "100%" }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="field">
                  <label htmlFor="name" className="label">
                    Nom complet
                  </label>
                  <div className="input-wrapper">
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input"
                      placeholder="votre nom"
                      required
                    />
                    <motion.div
                      className="input-focus-line"
                      initial={{ width: 0 }}
                      whileFocus={{ width: "100%" }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="field">
                  <label htmlFor="name" className="label">
                   Votre prenom
                  </label>
                  <div className="input-wrapper">
                    <input
                      id="lname"
                      type="text"
                      value={lastName}
                      onChange={(e) => setlastName(e.target.value)}
                      className="input"
                      placeholder="votre prenom"
                      required
                    />
                    <motion.div
                      className="input-focus-line"
                      initial={{ width: 0 }}
                      whileFocus={{ width: "100%" }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="field">
                  <div className="password-header">
                    <label htmlFor="password" className="label">
                      Mot de passe
                    </label>
                  </div>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <Lock size={18} />
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input"
                      placeholder="••••••••••"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="field">
                  <div className="password-header">
                    <label htmlFor="password" className="label">
                      Confirmer votre mot de passe
                    </label>
                  </div>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <Lock size={18} />
                    </div>
                    <input
                      id="confirmpassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setconfirmPassword(e.target.value)}
                      className="input"
                      placeholder="••••••••••"
                      required
                    />
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="field">
                  <label htmlFor="role" className="label">
                    Rôle
                  </label>
                  <div className="input-wrapper">
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="input"
                      required
                    >
                      <option value="">Sélectionnez votre rôle</option>
                      <option value="user">Employee utilisateur</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Administrateur</option>
                    </select>
                    <motion.div
                      className="input-focus-line"
                      initial={{ width: 0 }}
                      whileFocus={{ width: "100%" }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </motion.div>
                <ReCAPTCHA
                sitekey="6Lc29S0qAAAAABuR00MS7tL0RgDzvoUyaejbyhrO"
                onChange={handleCaptcha}
              />
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    className="submit-button"
                    disabled={isLoading}
                  >
                    <motion.span
                      className="ripple-effect"
                      whileTap={{
                        opacity: 0.2,
                        scale: [0, 1.5],
                        transition: { duration: 0.4 },
                      }}
                    />
                    {isLoading ? (
                      <svg
                        className="spinner"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="spinner-circle"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="spinner-path"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <>
                        <span>S'inscrire</span>
                        <ChevronRight size={18} className="button-icon" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.div>
            </form>

            <motion.div
              className="signup-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
                <Link to="/login">
                <p className="signup-text">
                    Deja un compte?
                </p>
                </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
