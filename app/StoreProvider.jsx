'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { reducerStore } from '../redux/store';

const StoreProvider = ({ children }) => {
  const storeRef = useRef()
  if (!storeRef.current) {
    storeRef.current = reducerStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider;
