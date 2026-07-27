import { create } from "zustand";

type ToastType = "success" | "error";

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface UiState {
  filterModalOpen: boolean;
  mobileMenuOpen: boolean;
  toasts: Toast[];
  openFilterModal: () => void;
  closeFilterModal: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  pushToast: (type: ToastType, message: string) => void;
  dismissToast: (id: number) => void;
}

let toastCounter = 0;

export const useUiStore = create<UiState>()((set, get) => ({
  filterModalOpen: false,
  mobileMenuOpen: false,
  toasts: [],
  openFilterModal: () => set({ filterModalOpen: true }),
  closeFilterModal: () => set({ filterModalOpen: false }),
  toggleMobileMenu: () =>
    set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  pushToast: (type, message) => {
    const id = ++toastCounter;
    set((s) => ({ toasts: [...s.toasts, { id, type, message }] }));
    setTimeout(() => get().dismissToast(id), 4000);
  },
  dismissToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
