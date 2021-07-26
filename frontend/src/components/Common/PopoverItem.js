import React, {useEffect, useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import {Popover, PopoverBody, PopoverHeader} from "reactstrap";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    container: {
        background:'#4c4c4c',
        color:'#ffffff',
        "&:hover": {
            backgroundColor: '#272727'
        }
    },
});

const PopoverItem = props => {
  const classes = useStyles();
  const { id, item, data } = props;
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverRef = useRef();
  const toggle = () => setPopoverOpen(!popoverOpen);

  useEffect(()=>{
        // if(popoverRef.current) setPopoverOpen(true);
        setPopoverOpen(true);
    },[]);


  return (
    <span>
      <Button
          className={classes.container}
        variant="contained"
        // color="secondary"
        id={"Popover-" + id}
        ref={popoverRef}
        type="button"
          size="small"
      >
        {item.text}
      </Button>
      <Popover
        placement={item.placement}
        isOpen={popoverOpen}
        target={"Popover-" + id}
        toggle={toggle}
      >
        <PopoverHeader style={{color: 'black', fontSize: '15px'}}>
            {item.title}{' '}
            <span style={{color: 'blue', fontWeight: 'bold'}}>{data.percentage} %</span>
        </PopoverHeader>
        <PopoverBody>
          완성도가 높을수록 채용 확률이 올라가요 !
        </PopoverBody>
      </Popover>
    </span>
  );
};

export default PopoverItem;