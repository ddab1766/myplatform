import React, {useState} from "react";
import {Pagination} from "rsuite";

const CustomPagination = ({postsPerPage, totalPosts, paginate}) => {
    const [activePage, setActivePage] = useState(1);
    const onHandleSelect = (eventKey) => setActivePage(eventKey);

    const pages = () => {
        return Math.ceil(totalPosts / postsPerPage)
    };

    return (
        <div className="text-center">
            <hr />
            <Pagination
                prev={true}
                next={true}
                first={true}
                last={true}
                ellipsis={true}
                boundaryLinks={true}
                size="lg"
                pages={pages()}
                maxButtons={5}
                activePage={activePage}
                onSelect={(eventKey)=>{
                    paginate(eventKey);
                    onHandleSelect(eventKey);
                    window.scrollTo(0, 0)
                }}
            />
        </div>
    )
}


export default CustomPagination;
