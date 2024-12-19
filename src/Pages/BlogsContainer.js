import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/Search";
import "../styles/BlogContainer.scss";
import BlogCard from "../components/BlogCard";

const BlogsContainer = ({ updateContainer }) => {
  const [blogs, setBlogs] = useState([]); // All blogs
  const [filteredBlogs, setFilteredBlogs] = useState([]); // Filtered blogs based on search
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const allBlogsResponse = await fetch('https://server-lmhc.onrender.com/blogs');
        const allBlogs = await allBlogsResponse.json();
       // console.log(allBlogs); // Log blogs to check the coverImage path
        setBlogs(allBlogs);
        setFilteredBlogs(allBlogs);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleSearch = async (term) => {
    if (!term) {
      setFilteredBlogs(blogs); // Reset to all blogs when search is cleared
      return;
    }

    try {
      const response = await fetch(`https://server-lmhc.onrender.com/blogs/search?query=${term}`);
      if (response.ok) {
        const results = await response.json();
        setFilteredBlogs(results);
      } else {
        setFilteredBlogs([]);
        console.log("No blogs found for this search.");
      }
    } catch (error) {
      console.log("Error searching blogs:", error);
    }
  };

  const handleAddBlog = () => {
    navigate("blogs/BlogForm");
    updateContainer("BlogForm");
  };

  const blogsPerPage = 10;
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = filteredBlogs>0?filteredBlogs.slice(startIndex, endIndex):'';

  const totalPages = filteredBlogs>0? Math.ceil(filteredBlogs.length / blogsPerPage): 0;

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="blogContainers">
      <div className="blog-header">
        <div className="blog-head-title">
          <h3>Blogs</h3>
        </div>
        <button onClick={handleAddBlog}>+ Add</button>
      </div>
      <SearchBar onSearch={handleSearch} />
      {loading?<h1>Loading...</h1>: 
      <>
      <div className="blogs">
        {currentBlogs.length>0?currentBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} updateContainer={updateContainer} />
        )):""}
      </div>

      {filteredBlogs.length > blogsPerPage && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      </>
    }
    </div>
  );
};

export default BlogsContainer;
