import React, { useState } from "react";
import axios from "axios";
import Comments from "./Comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Post = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const toggleComments = async () => {
    if (!isCommentsVisible) {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    }
    setIsCommentsVisible(!isCommentsVisible);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center">
        <FontAwesomeIcon
          icon={faUserCircle}
          className="text-blue-900 dark:text-blue-500 text-3xl mr-2"
        />
        <div>
          <p className="text-blue-900 dark:text-blue-400 font-semibold">
            {post.user.name}
          </p>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
            <span>{post.user.email}</span>
          </div>
        </div>
      </div>
      <div className="ml-8">
        <h2 className="text-xl font-semibold mt-2 text-blue-900 dark:text-blue-400">
          {post.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mt-2">{post.body}</p>
        <button
          className="mt-4 text-blue-500 dark:text-blue-300"
          onClick={toggleComments}
        >
          {isCommentsVisible ? "Hide Comments" : "Show Comments"}
        </button>
        {isCommentsVisible && <Comments comments={comments} />}
      </div>
    </div>
  );
};

export default Post;
