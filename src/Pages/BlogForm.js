import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/BlogForm.module.scss";
import JoditEditor from "jodit-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const BlogForm = ({ updateContainer }) => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    description: "",
    content: "",
    category: "",
    coverImage: "https://via.placeholder.com/1200x500", // Default image
    isOnCoverTop: "no", // Default to "no"
    userImage: '',
    author: ""
  });

  // Handle text input and dropdown changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = async (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      
      // ImgBB API upload
      const API_KEY = "6491fac1a39baab688feaecfdc4523b3"; // Replace with your actual ImgBB API key
      const url = `https://api.imgbb.com/1/upload?key=${API_KEY}`;
      const imageData = new FormData();
      imageData.append("image", file);

      try {
        // If a cover image already exists, you can remove it from the state (if you want)
        if (formData.coverImage && formData.coverImage !== "https://via.placeholder.com/1200x500") {
          // Optional: you could add logic here to delete the previous image from the state
        }

        const response = await fetch(url, {
          method: "POST",
          body: imageData,
        });
        const data = await response.json();

        if (data.status === 200 && data.data.url) {
          setFormData((prevData) => ({
            ...prevData,
            coverImage: data.data.url,
          }));
          toast.success("Cover image uploaded successfully!");
        } else {
          toast.error("Failed to upload image.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationMessages = {
      title: "Title is required.",
      tags: "Tag is required.",
      description: "Description is required.",
      content: "Content is required.",
      category: "Category is required.",
      isOnCoverTop: "Please select if it should be on top.",
    };
  
    let isValid = true;
  
    Object.keys(validationMessages).forEach((key) => {
      const value = formData[key];
      if (value === "" || value === null || value === undefined) {
        toast.error(validationMessages[key]);
        isValid = false;
      }
    });
  
    if (isValid) {
      try {
        // Ensure coverImage has the ImgBB URL
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("tags", formData.tags);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("content", formData.content);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("isOnCoverTop", formData.isOnCoverTop);
        formDataToSend.append("author", formData.author);
        console.log(formData);
        // Submit to backend
        const response = await fetch("https://server-lmhc.onrender.com/BlogPost", {
          method: "POST",
          body: JSON.stringify(formData),
          headers:{
            'Content-Type':'application/json'
          }
        });
  
        const result = await response.json();
  
        if (response.ok) {
          toast.success("Blog posted successfully!");
          // Reset form
          setFormData({
            title: "",
            tags: "",
            description: "",
            content: "",
            category: "",
            coverImage: "https://via.placeholder.com/1200x500", // Reset to default image
            isOnCoverTop: "no", // Default to "no"
            userImage: '',
            author: ""
          });
          navigate("/Blogs");
          updateContainer("Blogs");
        } else {
          toast.error(result.message || "Error posting blog.");
        }
      } catch (error) {
        toast.error("Error posting blog.");
      }
    }
  };
  
  
  useEffect(() => {
    const currentUser = async () => {
      const currentMobile = localStorage.getItem("loggedInUserMobileNumber");
      if (currentMobile) {
        try {
          const userResponse = await fetch(
            `https://server-lmhc.onrender.com/user/${currentMobile}`
          );
          const user = await userResponse.json();

          if (user) {
            setFormData((prevData) => ({
              ...prevData,
              author: user.name,
              userImage: user.userImage,
            }));
          }
          console.log("inside useEffect");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    currentUser(); // Call the async function
  }, []);

  // Navigation handler
  const handleNavigate = () => {
    navigate("/Blogs");
    updateContainer("Blogs");
  };

  return (
    <div className={styles["blog-form"]}>
      <div className="blog-form-header">
        <button onClick={handleNavigate}>{"<-"} page</button>
        <h2>Create Blog</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-container"]}>
          <div className={styles["form-left"]}>
            {/* Title Input */}
            <div className={styles["form-section"]}>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
              />
            </div>

            {/* Description Input */}
            <div className={styles["form-section"]}>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                rows="5"
              ></textarea>
            </div>

            {/* Content Editor */}
            <div className={styles["form-section"]} style={{maxWidth:850}}>
              <label>Blog Content</label>
              <JoditEditor
                ref={editor}
                value={formData.content}
                onChange={(content) =>
                  setFormData((prevData) => ({ ...prevData, content }))
                }
              />
            </div>

            {/* Cover Image Upload */}
            <div className={styles["form-section"]}>
              <label>Cover Image</label>
              <input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={handleFileChange}
              />
              {formData.coverImage && (
                <img 
                  src={formData.coverImage} 
                  alt="Cover" 
                  style={{ 
                    maxWidth: '200px', 
                    marginTop: '10px',
                    borderRadius: '8px'
                  }} 
                />
              )}
            </div>

            {/* Top Cover Option */}
            <div className={styles["form-section"]}>
              <label>Show on top of blog page?</label>
              <div className={styles["form-inner-section"]}>
                <label htmlFor="yes">Yes</label>
                <input
                  type="radio"
                  id="yes"
                  name="isOnCoverTop"
                  value="yes"
                  checked={formData.isOnCoverTop === "yes"}
                  onChange={handleInputChange}
                />
                <label htmlFor="no">No</label>
                <input
                  type="radio"
                  id="no"
                  name="isOnCoverTop"
                  value="no"
                  checked={formData.isOnCoverTop === "no"}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className={styles["form-right"]}>
            {/* Tags Dropdown */}
            <div className={styles["form-section"]}>
              <label>Tag</label>
              <select
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
              >
                <option value="">Select Blog Tags</option>
                <option value="draft">Latest</option>
                <option value="published">Famous</option>
              </select>
            </div>

            {/* Category Dropdown */}
            <div className={styles["form-section"]}>
              <label>Blog Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Select a Category</option>
                <option value="technology">Technology</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="education">Education</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className={styles["form-buttons"]}>
          <button type="submit">Save Blog</button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default BlogForm;
