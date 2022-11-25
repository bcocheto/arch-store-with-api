import { createContext, ReactNode } from 'react';
import { useLocalStorage } from '~/hooks/useLocalstorage';
import { CartItem } from '~/types/CartItem';

type CartProviderProps = {
  children: ReactNode;
};

type CartContextProps = {
  getItemQuantity: (id: string) => number;
  increaseItem: (id: string) => void;
  decreaseItem: (id: string) => void;
  removeItem: (id: string) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

export const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', []);

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  function getItemQuantity(id: string) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseItem(id: string) {
    setCartItems((currentItems: any) => {
      if (currentItems.find((item: CartItem) => item.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }];
      } else {
        return currentItems.map((item: CartItem) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            console.log(item);
            return item;
          }
        });
      }
    });
  }

  function decreaseItem(id: string) {
    setCartItems((currentItems: CartItem[]) => {
      if (currentItems.find((item: CartItem) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item: CartItem) => item.id !== id);
      } else {
        return currentItems.map((item: CartItem) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeItem(id: string) {
    setCartItems((currentItems: CartItem[]) => {
      return currentItems.filter((item: CartItem) => item.id !== id);
    });
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseItem,
        decreaseItem,
        removeItem,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
