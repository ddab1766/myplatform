import {Link} from "react-router-dom";
import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";


const UserUrl = (props) => {
    const {info} = props;

    return (
        <>
            <tr>
                <td>{info.jobadvertise.jobadvertise_end_dt}</td>
                <td><Link to={`/User/List/${info.jobadvertise.id}`}>{info.jobadvertise.jobadvertise_title}</Link>
                </td>
                <td>{info.url} {' '}
                    <CopyToClipboard text={info && info.url} onCopy={()=>{
                        alert('URL 복사되었습니다!')
                    }}>
                        <button><i className="fa fa-clipboard"/></button>
                    </CopyToClipboard>
                </td>

            </tr>
        </>
    )
};

export default UserUrl;