'use client';

import styles from './login.module.scss'
import { ErrorMessage, Field, Formik } from 'formik'
import { object, string } from 'yup';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import { http } from '../../utils/http';
import { useAppDispatch } from '../../redux/hooks';
import { setLoading } from '../../redux/loadingReducer';

const Login = () => {
  const cookies = useCookies();
  const router = useRouter();
  const dispatch = useAppDispatch()

  const signupSchema = object().shape({
    firstName: string().required().min(2),
    lastName: string().required().min(2),
    email: string().required().email(),
    password: string().required().min(8)
  });

  const loginSchema = object().shape({
    email: string().required().email(),
    password: string().required()
  });

  const onLogin = async (body) => {
    try {
      dispatch(setLoading(true));
      const user = await http({
        method: 'POST',
        url: 'auth/login',
        data: body
      });
      cookies.set('user', user);
      router.push('/posts');
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  }

  const onSignup = async (body) => {
    try {
      dispatch(setLoading(true));
      const user = await http({
        method: 'POST',
        url: 'auth/register',
        data: body
      });
      cookies.set('user', user);
      router.push('/posts');
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <input type='checkbox' id='hidden-input' className={styles.hiddenInput} aria-hidden='true' />

        <div className={styles.signup}>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            }}
            validationSchema={signupSchema}
            onSubmit={onSignup}
          >
            {({ handleSubmit, errorMessage }) => (
              <>
                <label htmlFor='hidden-input' className={styles.label} aria-hidden='true'>Sign up</label>
                <Field className={styles.input} name='firstName' type='text' placeholder='First Name' />
                <p className='validation-error'>
                  <ErrorMessage name='firstName' render={errorMessage} />
                </p>

                <Field className={styles.input} name='lastName' type='text' placeholder='Last Name' />
                <p className='validation-error'>
                  <ErrorMessage name='lastName' render={errorMessage} />
                </p>

                <Field className={styles.input} name='email' type='email' placeholder='Email' />
                <p className='validation-error'>
                  <ErrorMessage name='email' render={errorMessage} />
                </p>

                <Field className={styles.input} name='password' type='password' placeholder='Password' />
                <p className='validation-error'>
                  <ErrorMessage name='password' render={errorMessage} />
                </p>

                <button className={styles.button} type='submit' onClick={handleSubmit}>Sign up</button>
              </>
            )}
          </Formik>
        </div>

        <div className={styles.login}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginSchema}
            onSubmit={onLogin}
          >
            {({ handleSubmit, errorMessage }) => (
              <>
                <label htmlFor='hidden-input' className={styles.label} aria-hidden='true'>Login</label>
                <Field className={styles.input} name='email' type='email' placeholder='Email' />
                <p className='validation-error'>
                  <ErrorMessage name='email' render={errorMessage} />
                </p>

                <Field className={styles.input} name='password' type='password' placeholder='Password' />
                <p className='validation-error'>
                  <ErrorMessage name='password' render={errorMessage} />
                </p>

                <button className={styles.button} type='submit' onClick={handleSubmit}>Login</button>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}


export default Login