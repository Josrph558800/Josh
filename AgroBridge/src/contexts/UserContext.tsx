import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../pages/firebaseConfig';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'household' | 'business';
  location: string;
  phone?: string;
  avatar?: string;
  farmName?: string;
  companyName?: string;
  rating?: number;
  verified?: boolean;
  memberShip?: string;
  monthlySales?: number;
  totalProducts?: number;
  accountType?: string;
  favoriteFarmers?: boolean;
  totalSpent?: number;
  ordersPlaced?: number;
  activeOrders?: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, 'AgroBridge', firebaseUser.uid);

        const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setUser(docSnap.data() as User);
          } else {
            setUser(null);
          }
        });

        return () => unsubscribeSnapshot();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
