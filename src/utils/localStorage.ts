import type { CartItem } from "../types/cart";
import type { User } from "../types/user";

const CART_KEY = "cart";
const USER_KEY = "user";

export const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const loadCartFromLocalStorage = (): CartItem[] => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUserToLocalStorage = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const loadUserFromLocalStorage = (): User | null => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearUserFromLocalStorage = () => {
  localStorage.removeItem(USER_KEY);
};
