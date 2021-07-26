import React, {useState} from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

const Paginations = ({ current, postsPerPage, totalPosts, paginate }) => {
  // const [current, setCurrent] = useState(current);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div >
      <nav >
        <Pagination listClassName="justify-content-end">
          {pageNumbers.map(number => (
            <PaginationItem key={number} className={"page-item" + (current===number ? ' active' : 'a')}>
              <PaginationLink onClick={() => {paginate(number); paginate(number);  window.scrollTo(0, 0);}} className="page-link">
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}
        </Pagination>
      </nav>
    </div>
  );
};

export default Paginations;