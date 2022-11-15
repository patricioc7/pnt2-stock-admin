import { Pagination } from "react-bootstrap";
import { useState } from "react";

const Paginator = (params) => {
  const [active, setActive] = useState(1);

  let items = [];
  // Solo 10 páginas porque no se sabe el total real
  for (let number = 1; number <= params.pageQty; number++) {
    items.push(
      <Pagination.Item
        onClick={() => {
          params.handlePageChange(number - 1);
          setActive(number);
        }}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handlePrev = () => {
    params.handlePageChange(active - 2);
    setActive(active - 1);
  };

  const handleNext = () => {
    params.handlePageChange(active);
    setActive(active + 1);
  };

  return (
    <Pagination>
      <Pagination.Prev onClick={handlePrev} />
      {items}
      <Pagination.Next onClick={handleNext} />
    </Pagination>
  );
};

export default Paginator;
