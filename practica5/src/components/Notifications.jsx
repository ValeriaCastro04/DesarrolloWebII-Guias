// components/Notifications.jsx
import { useAppStore } from '../store/useAppStore';
import { useEffect } from 'react';

const Notifications = () => {
  const notifications = useAppStore((state) => state.notifications);
  const removeNotification = useAppStore((state) => state.removeNotification);

  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        removeNotification(notification.id);
      }, 5000);

      return () => clearTimeout(timer);
    });
  }, [notifications, removeNotification]);

  return (
    <div className='fixed top-4 right-4 space-y-2'>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded shadow flex items-center justify-between ${
            notification.type === 'success' ? 'bg-green-200' : 'bg-red-200'
          }`}
        >
          <span>{notification.message}</span>
          <button
            onClick={() => removeNotification(notification.id)}
            className='ml-4 text-gray-600 hover:text-gray-800 font-bold'
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;