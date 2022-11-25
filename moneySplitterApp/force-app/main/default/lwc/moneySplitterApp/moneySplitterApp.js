import { LightningElement, track , api} from 'lwc';
import getAccountData from '@salesforce/apex/contactClass.getAccountData';

export default class CustomRecordSearch extends LightningElement {
    searchKey;
    sample;
    @track accounts;
    @track passvalue=false; 
    @track showsearch=false;
    @api parentvalue;
    @track counter=0;
    //This Funcation will get the value from Text Input.
    handelSearchKey(event){
        this.searchKey = event.target.value;
    }

    //This funcation will fetch the Account Name on basis of searchkey
    SearchAccountHandler(){
        //call Apex method.
        getAccountData({textkey: this.searchKey})
        .then(result => {
                this.accounts = result;
        })
        .catch( error=>{
            this.accounts = null;
        });


    }
    cols = [
        {label:'Account Name', fieldName:'Name' , type:'text'} ,
        {label:'Phone', fieldName:'Phone' , type:'Phone'} ,
        {label:'Industry', fieldName:'Industry' , type:'text'}
              
    ]
    connectedCallback()
    {

    }
    getSelectedRec() {
        var selectedRecords =  this.template.querySelector("lightning-datatable").getSelectedRows();
        this.passvalue=true;
        this.showsearch=true;
        this.counter += selectedRecords.length;
        console.log('i m called');
        console.log('elfjn' ,this.counter);
        this.sample= this.counter;
        this.parentvalue= this.counter;
        this.connectedCallback();
        if(selectedRecords.length > 0){
            console.log('selectedRecords are ', JSON.stringify(selectedRecords));
   
            let ids = '';
            selectedRecords.forEach(currentItem => {
                ids = ids + ',' + currentItem.Id;
            });
            this.selectedIds = ids.replace(/^,/, '');
            this.lstSelectedRecords = selectedRecords;
            //alert(this.selectedIds);
        }  
    } 
}