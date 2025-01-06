
import { http } from '../../../utils/http';
import styles from './pageDetails.module.scss'

const PostDetails = async ({ params }) => {
  const id = (await params).id;
  const postData = await http({ method: 'GET', url: `posts/${id}` });
  const postDetails = JSON.parse(postData);

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div>
          <p className={styles.userName}><b>Name:</b> {postDetails.user.firstName} {postDetails.user.lastName}</p>
          <p className={styles.detail}><b>Email:</b> {postDetails.user.email}</p>
        </div>
        <div className={styles.postData}>
          <p className={styles.detail}>Date created: {postDetails.createdAt.split('T')[0]}</p>
          <p className={styles.detail}>Last Update Date : {postDetails.updatedAt.split('T')[0]}</p>
          <p className={styles.detail}>Title : {postDetails.title}</p>
        </div>
      </div>
    </div>
  )
}

export default PostDetails