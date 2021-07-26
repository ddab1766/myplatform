import React, {useEffect, useState} from "react";
import {Table} from "reactstrap";
import {Link} from "react-router-dom";

const FAQ = (props) => {
    const {faq, gubun} = props;
    const [list, setList] = useState([]);

    useEffect(()=>{
        setList(faq.filter( v => v.faq_gubun === gubun))
    },[faq]);

    return (
        <>
            <Table className="table table-hover text-left">
                <tbody>
                {list.map((v,index)=>(
                    <tr>
                        <td>
                            <Link to={{
                                pathname: `/HelpCenter/comments/${v.id}`,
                                state: {
                                    faq: v
                                }
                            }}>{v.faq_title}</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    )
};

export default FAQ;

