import { RootState } from './index';

// Auth selectors
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsTokenExpired = (state: RootState) => {
  if (!state.auth.expiresAt) return false;
  return Date.now() >= state.auth.expiresAt;
};

// User selectors
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserLoading = (state: RootState) => state.user.isLoading;
export const selectUserError = (state: RootState) => state.user.error;

// App selectors
export const selectCurrentRoute = (state: RootState) => state.app.currentRoute;
export const selectSidebarOpen = (state: RootState) => state.app.sidebarOpen;
export const selectNotifications = (state: RootState) => state.app.notifications;
export const selectUnreadNotificationsCount = (state: RootState) =>
  state.app.notifications.filter((notif) => !notif.read).length;
export const selectAppLoading = (state: RootState) => state.app.isLoading;

