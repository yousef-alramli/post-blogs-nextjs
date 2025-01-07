"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import ActionModal from "./actionsModal";
import CardWrapper from "./cardWrapper";
import { POST_INPUTS } from "../../constants/modal.const";
import styles from "../styles/blogs.module.scss";
import { Paginator } from "primereact/paginator";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLoading } from "../../redux/loadingReducer";
import { http } from "../../utils/http";
import { setPosts } from "../../redux/postsReducer";
import { toastError } from '../../utils/toast.js';
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-dark-purple/theme.css";

const Blogs = ({
  handleUpdatePost,
  handleDeletePost,
  allowEdit = false,
  myBlogs = false,
}) => {
  const posts = useAppSelector((state) => state.posts.value);
  const isLoading = useAppSelector((state) => state.isLoading.value);
  const dispatch = useAppDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [perPage, setPerPage] = useState(5);
  const [first, setFirst] = useState(0);
  const postToUpdate = useRef({});

  const onPageChange = async (event) => {
    try {
    dispatch(setLoading(true));
    setFirst(event.first);
    setPerPage(event.rows);
    const postsRes = await http({
      method: "GET",
      url: `posts?ownPosts=${myBlogs}&limit=${event.rows}&page=${event.page}`,
    });
    dispatch(setPosts(JSON.parse(postsRes)));
    dispatch(setLoading(false));
    } catch (error) {
      toastError(error?.message)
      dispatch(setLoading(false));
    }
  };

  const onPostEdit = ({ title, body, id }) => {
    postToUpdate.current = { title, body, id };
    setModalIsOpen(true);
  };

  const onSubmit = (values) => {
    handleUpdatePost(values);
    setModalIsOpen(false);
  };

  return (
    <>
      <div className={styles.blogsContainer}>
        {posts.rows?.map((post) => (
          <CardWrapper key={post.id}>
            {allowEdit && (
              <div className={styles.editHolder}>
                <i
                  className={`pi pi-trash ${styles.trashIcon}`}
                  onClick={() => handleDeletePost(post.id)}
                ></i>
                <i
                  className="pi pi-pen-to-square"
                  onClick={() => onPostEdit(post)}
                ></i>
              </div>
            )}

            <div>
              <Link className={styles.title} href={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
              </Link>
              <p className={styles.body}>{post.body}</p>
            </div>
            <div className={styles.postInfo}>
              <div className={styles.userHolder}>
                <p className={styles.userName}>
                  By {post.user.firstName} {post.user.lastName}
                </p>
              </div>
              <div className={styles.dateHolder}>
                <p>Date: </p>
                <p>{post.createdAt.split("T")[0]}</p>
              </div>
            </div>
          </CardWrapper>
        ))}
      </div>

      {!isLoading && posts.rows && (
        <Paginator
          rows={perPage}
          totalRecords={posts.count}
          rowsPerPageOptions={[5, 10, 15]}
          onPageChange={onPageChange}
          first={first}
        />
      )}

      <ActionModal
        isOpen={modalIsOpen}
        setOpen={setModalIsOpen}
        onSubmit={onSubmit}
        inputs={POST_INPUTS}
        initialValues={postToUpdate.current}
      />
    </>
  );
};

export default Blogs;
