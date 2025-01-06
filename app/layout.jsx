import StoreProvider from "./StoreProvider";
import { CookiesProvider } from 'next-client-cookies/server';
import Navbar from './components/navbar'
import Loading from './loading'
import { PrimeReactProvider } from 'primereact/api';

import "./styles/global.scss";

export default function RootLayout({ children }) {
  return (
    <CookiesProvider>
      <StoreProvider>
        <PrimeReactProvider>
          <html lang="en" id="root">
            <body>
              <Navbar />
              {children}
              <Loading />
            </body>
          </html>
        </PrimeReactProvider>
      </StoreProvider>
    </CookiesProvider>
  );
}
