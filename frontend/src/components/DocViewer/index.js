import React from "react";

// import DocViewer, {DocViewerRenderers} from "react-doc-viewer";


export function Viewer(props) {
    const pathname = props.location.pathname;
    const uri = pathname.replace('/Viewer/', '');
    console.log('uri:', uri);
    const docs = [
        { uri: uri },
    ];

    return (
        <>
            <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${uri}`}
                    width='100%' height='1000px' frameBorder='0'>
            </iframe>
            {/*<DocViewer*/}
            {/*    pluginRenderers={DocViewerRenderers}*/}
            {/*    documents={docs} />*/}
        </>
    )
}