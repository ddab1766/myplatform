import { observable } from 'mobx';

const counter = observable({

  number: [],
  data:[],
  put(){
    this.number.sugub_title = 5;
  },
  print(){
    console.log('print',this.number.sugub_title)
  },
  increase() {
    this.number++;
  },
  decrease() {
    this.number--;
  },
});

export { counter };