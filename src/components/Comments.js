import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Comments = ({ comments }) => {
  return (
    <div className="mt-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border-t pt-2 mt-2 border-gray-300 dark:border-gray-700"
        >
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-blue-900 dark:text-blue-500 text-xl mr-2"
            />
            <div>
              <p className="text-blue-900 dark:text-blue-400 font-semibold">
                {comment.name}
              </p>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
                <span>{comment.email}</span>
              </div>
            </div>
          </div>
          <p className="ml-8 text-gray-800 dark:text-gray-300">
            {comment.body}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
