const Pagination = (props) => {
  const { currentPage, pageSize, total, onSelectPage } = props;

  function renderListItems() {
    const listItems = [];
    const paginateLength =
      total % pageSize === 0
        ? total / pageSize
        : Math.floor(total / pageSize) + 1;

    // if paginateLength is equal 1 then it don't need to display paginate
    if (paginateLength > 1) {
      for (let i = 0; i + 1 <= paginateLength; i++) {
        const activePageClass = i === currentPage ? "active" : "";
        listItems.push(
          <li
            key={i}
            className={"page-item " + activePageClass}
            onClick={() => onSelectPage(i)}
          >
            <a className="page-link">{i + 1}</a>
          </li>
        );
      }
    }

    return listItems;
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">{renderListItems()}</ul>
    </nav>
  );
};

export default Pagination;
