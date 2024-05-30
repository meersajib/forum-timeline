import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Post from "./Post";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);

  const POSTS_PER_PAGE = 12;

  const fetchPostsAndUsers = useCallback(
    async (pageNum) => {
      if (allPostsLoaded) return;

      setLoading(true);
      try {
        const [postsRes, usersRes] = await Promise.all([
          axios.get("https://jsonplaceholder.typicode.com/posts"),
          axios.get("https://jsonplaceholder.typicode.com/users"),
        ]);

        const postsWithUsers = postsRes.data.map((post) => {
          return {
            ...post,
            user: usersRes.data.find((user) => user.id === post.userId),
          };
        });

        const newPosts = postsWithUsers.slice(
          (pageNum - 1) * POSTS_PER_PAGE,
          pageNum * POSTS_PER_PAGE
        );

        if (newPosts.length === 0) {
          setAllPostsLoaded(true);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    },
    [allPostsLoaded]
  );

  useEffect(() => {
    fetchPostsAndUsers(page);
  }, [fetchPostsAndUsers, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading ||
        allPostsLoaded
      )
        return;
      setPage((prevPage) => prevPage + 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, allPostsLoaded]);
  console.log(
    "Post IDs:",
    posts.map((post) => post.id)
  );

  return (
    <div className="container mx-auto p-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {loading && (
        <p className="text-center text-gray-700 dark:text-white">
          Loading more posts...
        </p>
      )}
      {allPostsLoaded && (
        <p className="text-center text-gray-700 dark:text-white">
          That's all for now.
        </p>
      )}
    </div>
  );
};

export default Timeline;
