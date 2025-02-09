import { create } from "zustand";

const useStore = create((set) => ({
  alertsSlice: {
    loading: false,
    showLoading: () =>
      set((state) => ({
        alertsSlice: { ...state.alertsSlice, loading: true },
      })),
    hideLoading: () =>
      set((state) => ({
        alertsSlice: { ...state.alertsSlice, loading: false },
      })),
  },
  busesSlice: {
    buses: [],
    setBusesInStore: (newBuses) =>
      set((state) => ({
        busesSlice: { ...state.busesSlice, buses: newBuses },
      })),
  },
  usersSlice: {
    user: null,
    setUser: (newUser) =>
      set((state) => ({
        usersSlice: { ...state.usersSlice, user: newUser },
      })),
  },
}));

export default useStore;
