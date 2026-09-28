import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const STORAGE_KEY = 'selectedCity';
const DEFAULT_CITY = 'Bangalore';

interface CityContextValue {
  city: string;
  setCity: (city: string) => void;
}

const CityContext = createContext<CityContextValue>({
  city: DEFAULT_CITY,
  setCity: () => {},
});

export function CityProvider({ children }: { children: ReactNode }) {
  const [city, setCityState] = useState<string>(() => {
    if (typeof window === 'undefined') return DEFAULT_CITY;
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_CITY;
    } catch {
      return DEFAULT_CITY;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, city);
    } catch {
      /* noop */
    }
  }, [city]);

  const setCity = (next: string) => setCityState(next);

  return <CityContext.Provider value={{ city, setCity }}>{children}</CityContext.Provider>;
}

export function useCity() {
  return useContext(CityContext);
}