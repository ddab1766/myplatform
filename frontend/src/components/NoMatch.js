import React from "react";
import {Container} from "reactstrap";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        textAlign: "center",
        padding: "50px"
    },
    heading: {
        fontSize: theme.typography.pxToRem(30),
        // fontWeight: theme.typography.fontWeightBold,
    },
    container:{
        marginBottom:'10px',
    }
}));



const NoMatch = () => {
    const classes = useStyles();
    return (
        <div className="content">
            <Container>
                <div className={classes.root}>
                    <i className="fa fa-exclamation-circle" style={{fontSize: "xx-large"}}/>
                    <Typography className={classes.heading}> 존재하지 않는 페이지입니다. </Typography>
                </div>
            </Container>
        </div>
    )
};


export default NoMatch;
