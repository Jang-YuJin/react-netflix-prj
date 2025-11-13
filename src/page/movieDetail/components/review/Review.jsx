import React, { useEffect, useState } from 'react'
import './Review.style.css'
import { useReview } from '../../../../hooks/useReview'
import ReactPaginate from 'react-paginate';

const Review = ({id}) => {
  const [reviewPage, setReviewPage] = useState(1);
  const {data:review} = useReview(id, reviewPage);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    setReviewPage(1);
    setExpanded({});
  }, [id]);

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReviewPageClick = ({selected}) => {
    setReviewPage(selected + 1);
  };

  return (
    <div>
      <section className="reviews-block">
        <div className="reviews-header">
          <h3>리뷰</h3>
          <div className="reviews-meta">{review.total_results}개의 리뷰</div>
        </div>

        <div className="reviews-list">

          {review.results.length === 0
            ? '아직 등록된 리뷰가 없습니다.'
            : review.results.map((item) => 
            <article key={item.id} className="review-card">
                <div className={`review-text ${expanded[item.id] ? 'expanded' : ''}`}>
                {item.content}
                </div>
                {(item.content?.split('\n').join(' ').length > 630) && (
                  <button className="btn-more" onClick={() => toggleExpand(item.id)}>
                    {expanded[item.id] ? '접기' : '더보기'}
                  </button>
                )}
                <div className="review-author">{item.author}</div>
            </article>)
          }

        </div>

        <div className="reviews-pager">
        {review.total_pages > 1 &&
          <div className='page-container'>
              <ReactPaginate
              key={reviewPage}
              nextLabel=">"
              onPageChange={handleReviewPageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={review?.total_pages > 500 ? 500 : review.total_pages}
              previousLabel="<"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={reviewPage-1}
              ></ReactPaginate>
          </div>
        }
        </div>
      </section>
    </div>
  )
}

export default Review
