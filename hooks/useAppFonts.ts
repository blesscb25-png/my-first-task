import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';

export function useAppFonts() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return loaded;
}
