import React from "react";
import "../styles/BlogCard.scss";

const BlogCard = ({blog}) => {
  //console.log("Blog",blog);
  return (
    <div className="blog-card">
      <div className="blog-image">
        <img
          src={blog.coverImage?blog.coverImage:""} // Replace with the actual image URL
          alt="Blog Thumbnail"
        />
      </div>
      <div className="blog-info">
        <p className="category">{blog.tags}</p>
        <h3 className="blog-title">{blog.title}</h3>
        <p className="description">
          {blog.description}
        </p>
        <div className="ratings">
          <span className="stars">⭐⭐⭐⭐⭐</span>
          <span className="score">3.2</span>
          <span className="reviews">96 reviews</span>
        </div>
        <div className="tags">
          <span>📍 {blog.author}</span>
          <span>{blog.category}</span>
          <span>📶 Free Wifi</span>
        </div>
      </div>
      <div className="read-more">
        <span>Read More</span>
      </div>
    </div>
  );
};

export default BlogCard;
