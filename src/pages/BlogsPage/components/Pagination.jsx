const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <div
          className="page-item p-content"
          onClick={() => onPageChange(currentPage - 1)}
        >
          ‹
        </div>
      )}

      {[...Array(totalPages)].map((_, index) => (
        <div
          key={index + 1}
          className={`page-item p-content ${
            currentPage === index + 1 ? "active" : ""
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </div>
      ))}

      {currentPage < totalPages && (
        <div
          className="page-item next p-content"
          onClick={() => onPageChange(currentPage + 1)}
        >
          ›
        </div>
      )}
    </div>
  );
};

export default Pagination;
