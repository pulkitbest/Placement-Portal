import React from 'react'
import { Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Paginate = ({pages, page, isAdmin = false, keyword = ''}) => {
    
    
    return pages > 1 && (
        <Pagination className="d-flex align-items-center justify-content-center">
            {[...Array(pages).keys()].map(x => (
                <Pagination.Item key={x + 1} active={x+1 === page}>
                    <Link to={keyword ? `/student/search/${keyword}/page/${x+1}` : `/student/page/${x+1}`} className={x+1 === page ? 'link-active' : 'link'} style={{ textDecoration: 'none' }}>
                        {x + 1}
                    </Link>
                </Pagination.Item>
                
            ))}
        </Pagination>
    )
}

export default Paginate
