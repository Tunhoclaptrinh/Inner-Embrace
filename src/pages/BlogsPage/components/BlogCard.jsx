const BlogCard = ({ image, date, title, excerpt }) => {
  return (
    <div className="blog-card">
      <img src={image} alt={title} className="blog-image" />
      <div className="content">
        <p className="blog-date">{date}</p>
        <h3 className="blog-title">{title}</h3>
        <p className="blog-excerpt">{excerpt}</p>
      </div>
    </div>
  );
};

export default BlogCard;
