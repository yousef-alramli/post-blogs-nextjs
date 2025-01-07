'use client';
import { useEffect } from 'react'
import { http } from '../../utils/http'
import { setPosts } from '../../redux/postsReducer';
import Blogs from '../components/blogs';
import { useAppDispatch } from '../../redux/hooks';
import { setLoading } from '../../redux/loadingReducer';
import { toastError } from '../../utils/toast.js';
import styles from './posts.module.scss'

const Posts = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      dispatch(setLoading(true));
      const postsData = await http({ method: 'GET', url: 'posts' });
      dispatch(setPosts(JSON.parse(postsData)));
      dispatch(setLoading(false));
    } catch (error) {
      toastError(error?.message)
      dispatch(setLoading(false));
    }
  }

  return (
    <div className={styles.container}>
      <Blogs />
    </div>
  )
}

export default Posts