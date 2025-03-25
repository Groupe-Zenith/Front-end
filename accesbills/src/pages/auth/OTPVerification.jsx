import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "antd";
import { toast } from "sonner"
import { Toaster } from "sonner";
import { ChevronRight, Shield, Code, FileText } from "lucide-react";
import "./Auth.scss";

const OTPVerification = () => {
    const [otp, setOtp] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (otp.trim().length < 6) {
            setErrorMessage("Le code OTP doit contenir 6 chiffres.");
            toast.error("Le code OTP doit contenir 6 chiffres.")
            return;
        }
        else if (otp.trim().length == "") {
            toast.warning("Veuillez complétez l'otp a 6 chiffres")
        }
        else {
            setErrorMessage("Le code OTP doit contenir 6 chiffres.");
        }
        setErrorMessage("");
        console.log("Code OTP soumis:", otp);
    };
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
            <Toaster />
            <motion.div
                className="main-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >

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


                    <motion.div
                        className="footer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        © 2025 Access-Bills. Tous droits réservés.
                    </motion.div>
                </motion.div>
                <motion.div
                    className="otp-container"
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
                            <h2 className="title">Vérification du code a 6 chiffre</h2>
                            <p className="subtitle">Entrez le code reçu par email</p>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="otp-form">
                            <Input.OTP
                                length={6}
                                mask="🔒"
                                value={otp}
                                onChange={(text) => setOtp(text)}
                                required
                                variant="filled"
                              
                            />
                            <motion.div variants={itemVariants}>
                                <motion.button
                                    type="submit"
                                    className="OTP-buttons"
                                    disabled={isLoading}
                                >
    
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
                                            <span>Vérifier</span>
                                            <ChevronRight size={18} className="button-icon" />
                                        </>
                                    )}
                                </motion.button>
                            </motion.div>

                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default OTPVerification;
