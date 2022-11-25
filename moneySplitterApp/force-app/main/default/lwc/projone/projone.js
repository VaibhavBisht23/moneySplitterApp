import { LightningElement,api,track } from 'lwc';
import findRecords from '@salesforce/apex/lookupController.findRecords'
export default class CustomLookup2 extends LightningElement {
 
    @api iconname = 'standard:account';
    @track records;
    @track errors;
    @track selectedRecord;
    HandleChange2(event){
        const searchValue = event.target.value;
       
        findRecords({
           
            searchValue : searchValue,
           
        })
        .then( result => {
            console.log(' Records Are ', result);
            this.records  = result;
            this.errors = undefined;
        })
        .catch(error => {
            this.errors = error;
            this.records = undefined;
        });
    }
    handleSelect(event){
        const recordId = event.detail;
        const selectedRec = this.records.find(
            record => record.Id === recordId
        );
        console.log(' Selected Record ', selectedRec);
        this.selectedRecord = selectedRec;
    }
    handleRemove(){
        this.selectedRecord = undefined;
        this.errors = undefined;
        this.records = undefined;
    }
}