import { LightningElement,track,api } from 'lwc';

export default class MoneySplitter extends LightningElement {
    @track amount;
    @api number ;
    @track interest;
    @api childvalue;

    
    handlechange(event)
{
    console.log('Clild number ' , this.childvalue);
    this.childvalue = event.target.value;
    
}
    handleAmount(event){
        this.amount=event.target.value
        console.log('This.Amount---->',this.amount);
    }

    handlechange(event){
        this.number=this.childvalue;

        console.log('This.Amount---->',this.number);
    }

    calculateMoney(){
        this.interest=(this.amount)/this.childvalue;
        console.log('This.Amount---->',this.interest);
    }
}