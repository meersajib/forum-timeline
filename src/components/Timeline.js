import React, { useState, useEffect, useCallback } from "react";
import { fetchPostsAndUsers } from "../api";
import Post from "./Post";
import Loader from "./Loader"; // Import Loader component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingInitial, setLoadingInitial] = useState(true); // Set initial loading state to true
  const [loadingMore, setLoadingMore] = useState(false); // State for loading more posts
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [fetchingData, setFetchingData] = useState(false); // State for tracking data fetching

  const handleFetchPosts = useCallback((pageNum) => {
    setFetchingData(true); // Set fetchingData to true when starting to fetch data
    setLoadingMore(true); // Set loading more state when fetching more posts
    fetchPostsAndUsers(
      pageNum,
      setPosts,
      setAllPostsLoaded,
      setLoadingInitial,
      setLoadingMore // Pass setLoadingMore
    );
  }, []);

  useEffect(() => {
    handleFetchPosts(page);
  }, [handleFetchPosts, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loadingMore ||
        allPostsLoaded
      )
        return;
      setPage((prevPage) => prevPage + 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, allPostsLoaded]);

  // UseEffect to handle initial fetch completion
  useEffect(() => {
    if (posts.length > 0) {
      setLoadingInitial(false);
    }
  }, [posts]);

  // UseEffect to handle data fetching
  useEffect(() => {
    if (!fetchingData) {
      return;
    }
    const timer = setTimeout(() => {
      setFetchingData(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchingData]);

  return (
    <div className="container mx-auto p-4 relative">
      {loadingInitial && <Loader />}{" "}
      {/* Render Loader component only for initial loading */}
      {posts.map((post, index) => (
        <Post key={`${post.id}-${post.userId}-${index}`} post={post} />
      ))}
      {loadingMore && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-4xl text-gray-700 animate-spin"
          />
          <p className="text-center text-gray-700 dark:text-gray-300">
            Loading more posts...
          </p>
        </div>
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
