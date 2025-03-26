import UserNavbar from "../../navbar/UserNavbar";
import { Bell, Check, Clock, AlertTriangle } from "lucide-react";
import "./NotificationsPage.scss";
import { useEffect } from "react";
import useSocket from "../../../../../services/notificationService";

export default function NotificationsPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { getPurchaseRequestByIdUser, purchaseRequests } = useSocket();
  console.log(purchaseRequests);
  

  useEffect(() => {
    if (user?._id) {
      getPurchaseRequestByIdUser(user._id);
    }
  }, [user, getPurchaseRequestByIdUser]);

  // Si aucune demande n'est reçue, on affiche des notifications statiques par défaut
  const notifications =
    purchaseRequests && purchaseRequests.length > 0
      ? purchaseRequests
      : [
          {
            id: 1,
            type: "info",
            title: "Nouvelle demande approuvée",
            message: "Votre demande d'achat #PR-2023-015 a été approuvée",
            time: "Il y a 2 heures",
            read: false,
          },
          {
            id: 2,
            type: "warning",
            title: "Équipement en retard",
            message:
              "La livraison de votre commande #CMD-2023-042 est retardée",
            time: "Il y a 1 jour",
            read: false,
          },
          {
            id: 3,
            type: "success",
            title: "Signalement résolu",
            message: "Votre signalement #ER-2023-008 a été résolu",
            time: "Il y a 3 jours",
            read: true,
          },
        ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "info":
        return <Bell className="icon" size={16} />;
      case "warning":
        return <AlertTriangle className="icon" size={16} />;
      case "success":
        return <Check className="icon" size={16} />;
      default:
        return <Bell className="icon" size={16} />;
    }
  };

  return (
    <div className="notifications-page">
      <UserNavbar />

      <main className="notifications-container">
        <div className="notifications-header">
          <h1>
            <Bell className="icon" size={24} />
            Notifications
          </h1>
        </div>

        <div className="notifications-list">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${
                notification.read ? "read" : "unread"
              }`}
            >
              <div className="notification-icon">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <div className="notification-meta">
                  <Clock className="icon" size={14} />
                  <span>{notification.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
