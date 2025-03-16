// store/notificationSlice.js
const createNotificationSlice = (set) => ({
    notifications: [],
    addNotification: (message, type = 'success') => {
      set((state) => ({
        notifications: [...state.notifications, { message, type, id: Date.now() }],
      }));
    },
    removeNotification: (id) => {
      set((state) => ({
        notifications: state.notifications.filter((notification) => notification.id !== id),
      }));
    },
  });
  
  export default createNotificationSlice;