import { Pagination } from "react-bootstrap";
import { useState } from "react";

const Paginator = (params) => {
    const [active, setActive] = useState(1);

    let items = [];
    // Solo 10 páginas porque no se sabe el total real
    for (let number = 1; number <= 10; number++) {
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

    return (
        <Pagination>
            <Pagination.Prev />
            {items}
            <Pagination.Next />
        </Pagination>
    );
};

export default Paginator;