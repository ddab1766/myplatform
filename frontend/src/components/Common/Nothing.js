import React from 'react';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        textAlign: "center",
        padding: "50px"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        // fontWeight: theme.typography.fontWeightBold,
    },
    container:{
        marginBottom:'10px',
    }
}));

export default function Nothing(props) {
    const {text, sugubs} = props
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <i className="fa fa-exclamation-circle" style={{fontSize: "xx-large"}}/>
            <Typography className={classes.heading}> {text} 내역이 없습니다.</Typography>
            {/*{sugubs && sugubs.length === 0 && (
                <div className="centered">
                    <SugubDrawer/>
                </div>
            )}*/}
        </div>
    );
}

