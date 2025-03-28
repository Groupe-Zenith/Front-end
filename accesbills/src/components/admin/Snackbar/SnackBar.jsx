import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { notification } from 'antd';

const SnackbarComponent = ({ notifications = [] }) => {
  const currentTime = new Date().toLocaleTimeString();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (notifications.length > 0) {
      const key = 'updatable';
      api.open({
        key,
        message: 'Notifications',
        description: `Vous avez ${notifications.length} demande(s) d'achat.`,
        showProgress: true,
        pauseOnHover: true,
      });

      setTimeout(() => {
        api.open({
          key,
          message: 'Mise à jour des Notifications',
          description: `Toujours ${notifications.length} demande(s) d'achat en attente.`,
          showProgress: true,
          pauseOnHover: true,
        });
      }, 1000);
    }
  }, [notifications, api]);

  return (
    <>
      {contextHolder}
      <div className="snackbar-container">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`snackbar ${notification.read ? 'read' : 'unread'} enter`}
          >
            <div className="snackbar-icon">{notification.icon}</div>
            <div className="snackbar-content">
              <h3>{notification.title}</h3>
              <p>Vous avez {notification?.purchaseRequests?.length || 0} notification(s).</p>
              <div className="snackbar-meta">
                <Clock className="icon" size={14} />
                <span>{currentTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SnackbarComponent;
