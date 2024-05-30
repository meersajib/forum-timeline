import React, { useState, useEffect, useCallback } from "react";
import { fetchPostsAndUsers } from "../api"; // Adjust the path as needed
import Post from "./Post";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);

  const handleFetchPosts = useCallback((pageNum) => {
    fetchPostsAndUsers(pageNum, setPosts, setAllPostsLoaded, setLoading);
  }, []);

  useEffect(() => {
    handleFetchPosts(page);
  }, [handleFetchPosts, page]);

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

  return (
    <div className="container mx-auto p-4">
      {posts.map((post, index) => (
        <Post key={`${post.id}-${post.userId}-${index}`} post={post} />
      ))}
      {loading && (
        <p className="text-center text-gray-700 dark:text-gray-300">
          Loading more posts...
        </p>
      )}
      {allPostsLoaded && (
        <p className="text-center text-gray-700 dark:text-gray-300">
          That's all for now.
        </p>
      )}
    </div>
  );
};

export default Timeline;
