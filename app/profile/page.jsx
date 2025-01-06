"use client";
import { useCookies } from "next-client-cookies";
import { http } from "../../utils/http";
import Blogs from "../components/blogs";
import CardWrapper from "../components/cardWrapper";
import { useEffect, useState } from "react";
import ActionsModal from "../components/actionsModal";
import { POST_INITIAL, POST_INPUTS, USER_INPUTS } from "../../constants/modal.const";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLoading } from "../../redux/loadingReducer";
import { setPosts } from "../../redux/postsReducer";
import styles from "./profile.module.scss";

const Profile = () => {
  const cookies = useCookies();
  const posts = useAppSelector(state => state.posts.value);
  const dispatch = useAppDispatch();

  const [user, setUser] = useState({});
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(cookies.get("user")));
    initData();
  }, []);

  const initData = async () => {
    dispatch(setLoading(true));
    const postsRes = await http({
      method: "GET",
      url: "posts?ownPosts=true",
    });
    dispatch(setPosts(JSON.parse(postsRes)));
    console.log(JSON.parse(postsRes));
    dispatch(setLoading(false));
  };

  const createBlog = async (data) => {
    dispatch(setLoading(true));
    await http({
      method: "POST",
      url: "posts",
      data,
    });
    await initData();
    setOpenCreateModal(false);
    dispatch(setLoading(false));
  };

  const handleUpdatePost = async (newData) => {
    dispatch(setLoading(true));
    await http({
      method: "PUT",
      url: `posts/${newData.id}`,
      data: newData,
    });
    await initData();
    setOpenCreateModal(false);
    dispatch(setLoading(false));
  };

  const handleDeletePost = async (id) => {
    dispatch(setLoading(true));
    await http({
      method: "DELETE",
      url: `posts/${id}`,
    });
    await initData();
    dispatch(setLoading(false));
  }

  const editUser = async (data) => {
    dispatch(setLoading(true));

    const updatedUser = await http({
      method: "PUT",
      url: `users/${user.id}`,
      data,
    });
    cookies.set("user", updatedUser);
    setUser(updatedUser)
    setOpenUserModal(false);
    dispatch(setLoading(false));
  }

  return (
    <div className={styles.container}>
      <CardWrapper>
        <div className={styles.cardInfo}>
          <div className={styles.editHolder} onClick={() => setOpenUserModal(true)}>
            <i className='pi pi-pen-to-square'></i>
          </div>
          <div className={styles.avatar}>
            <p>{user?.firstName?.[0]}</p>
          </div>
          <p className={styles.name}>
            {user.firstName} {user.lastName}
          </p>
          <p className={styles.email}>email: {user.email}</p>
          <p>{posts.count} Posts</p>
        </div>
      </CardWrapper>

      <div className={styles.myPosts}>
        <p className={styles.myPostsTitle}>My Blogs</p>

        <button
          className={styles.addButton}
          onClick={() => setOpenCreateModal(true)}
        >
          Create Post Blog
        </button>

        <Blogs
          handleUpdatePost={handleUpdatePost}
          handleDeletePost={handleDeletePost}
          allowEdit={true}
          myBlogs={true}
        />

        <ActionsModal
          isOpen={openUserModal}
          setOpen={setOpenUserModal}
          inputs={USER_INPUTS}
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
          }}
          onSubmit={editUser}
          title={'Edit Profile'}
        />

        <ActionsModal
          isOpen={openCreateModal}
          setOpen={setOpenCreateModal}
          inputs={POST_INPUTS}
          initialValues={POST_INITIAL}
          onSubmit={createBlog}
          title={'Edit Post'}
        />
      </div>
    </div>
  );
};

export default Profile;
