import React, { useState, useEffect } from "react";
import axios from "axios";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
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
        setPosts(postsWithUsers.sort((a, b) => b.id - a.id));
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchPostsAndUsers();
    console.log("first");
  }, []);

  return (
    <div className="container mx-auto p-4">
      {posts.map((post) => console.log("post", post))}
    </div>
  );
};

export default Timeline;
