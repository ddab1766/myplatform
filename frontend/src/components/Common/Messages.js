import React from 'react';
import {Message} from "rsuite";

export default function Messages({type, showIcon, title, description}) {
    return (
        <div className="mt-4 mb-4">
            {/*<Message showIcon type="info" description="Informational" />
            <Message showIcon type="success" description="Success" />
            <Message showIcon type="warning" description="Warning" />
            <Message showIcon type="error" description="Error" />*/}

            <Message
                showIcon={showIcon}
                type={type}
                title={title}
                description={description}
            />


            {/*
            <Message
                showIcon
                type="success"
                title="Success"
                description="Detailed description and advices about successful copywriting."
            />

            <Message
                showIcon
                type="warning"
                title="Warning"
                description="This is a warning notice about copywriting."
            />

            <Message
                showIcon
                type="error"
                title="Error"
                description="This is an error message about copywriting."
            />*/}
        </div>
    )
}
