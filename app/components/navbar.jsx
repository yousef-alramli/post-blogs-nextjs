'use client'
import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/navbar.module.scss';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import 'primeicons/primeicons.css';

const Navbar = () => {
  const router = useRouter();
  const cookiesStore = useCookies();
  const user = cookiesStore.get('user');

  const [openBar, setOpenBar] = useState(false)

  const logout = () => {
    cookiesStore.remove('user');
    router.push('/login');
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.bars} onClick={() => setOpenBar(!openBar)}>
        <i className="pi pi-bars"></i>
      </div>
      <ul className={`${styles.menuItems} ${openBar && styles.openMenu}`}>
        <div className={styles.menuGroup}>
          <li className={styles.item}>
            <Link className={styles.link} href='/' data-item='Home'>Home</Link>
          </li>
          {user &&
            <>
              <li className={styles.item}>
                <Link className={styles.link} href='/posts' data-item='Blogs'>Blogs</Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} href='/profile' data-item='Profile'>Profile</Link>
              </li>
            </>
          }
        </div>

        <div className={styles.menuGroup}>
          {!user ?
            <li className={styles.item}>
              <Link className={styles.link} href='/login' data-item='Login'>Login</Link>
            </li> :
            <li className={styles.item}>
              <span className={styles.link} onClick={logout} data-item='Logout'>Logout</span>
            </li>
          }
        </div>
      </ul>
    </nav>
  )
}

export default Navbar