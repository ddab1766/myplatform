import React from "react";
import {reduxForm} from 'redux-form'
import {Card} from "reactstrap";
import {Link} from "react-router-dom";
import {Breadcrumb, Container, Content, FlexboxGrid,} from 'rsuite';

const PagyeonForm = (props) => {
    const { handleSubmit } = props
const NavLink = props => <Breadcrumb.Item componentClass={Link} {...props} />;
    return (
        <>
            <Container>

                <Content>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={12}>
                            <Card>
                                 <Breadcrumb>
                                    <NavLink to="/en/">Home</NavLink>
                                    <NavLink to="/en/components/overview">Components</NavLink>
                                  </Breadcrumb>
                            </Card>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>

            </Container>
        </>
    )
};

export default reduxForm({
    form: 'PagyeonForm', // a unique identifier for this form
    enableReinitialize: true,
})(PagyeonForm)