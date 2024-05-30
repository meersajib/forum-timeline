import axios from "axios";

const POSTS_PER_PAGE = 12;

export const fetchPostsAndUsers = async (
  pageNum,
  setPosts,
  setAllPostsLoaded,
  setLoading,
  setLoadingMore // Add setLoadingMore as a parameter
) => {
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
    if (typeof setLoadingMore === "function") {
      setLoadingMore(false); // Set loadingMore to false after fetching posts
    }
  }
};

export const fetchCommentsForPost = async (postId) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments", error);
    return [];
  }
};
