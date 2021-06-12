import React from 'react';
import { Pagination } from "react-bootstrap";

export default function GeneratePagination({ ...props }) {

    let items = [];
    for (let page = 1; page <= props.pageCount; page++) {
        items.push(
            <Pagination.Item key={page} active={page === props.pageActive} onClick={() => props.setPageActive(page)}>
                {page}
            </Pagination.Item>
        );
    }

    const pagination = (
        <div>
            <Pagination>{items}</Pagination>
        </div>
    );

    return pagination;
}