import { LightningElement,track,api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import csvFileRead from '@salesforce/apex/CSVFileReadLWCCntrl.csvFileRead';

const columnsAccount = [
    { label: 'Name', fieldName: 'Name' }, 
    { label: 'AccountNumber', fieldName: 'AccountNumber' },
    { label: 'Rating', fieldName: 'Rating'}, 
    { label: 'Type', fieldName: 'Type'}, 
    // { label: 'Employees', fieldName: 'Employees',}
];

export default class UploadCSV extends LightningElement {
    @api recordId;
    // @track error1;
    @track columnsAccount = columnsAccount;
    @track data;
    // @track showLoadingSpinner = false;
    file;

    // accepted parameters
    get acceptedCSVFormats() {
        return ['.csv'];
    }
    
    uploadFileHandler(event) {
        // Get the list of records from the uploaded files
        const uploadedFiles = event.detail.files;
        this.file = this.uploadedFiles[0];
        console.log(this.file.size());

        // calling apex class csvFileread method
        this.showLoadingSpinner = true;
        csvFileRead({contentDocumentId : uploadedFiles[0].documentId})
        .then(result => {
            //console.log('result ===> '+result);
            this.data = result;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success!!',
                    message: 'Accounts are created according to the CSV file upload!!!',
                    variant: 'Success',
                }),
            );
        })
        .catch(error => {
            console.log(error);
            // this.error = error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error!!',
                    message: JSON.stringify(error),
                    variant: 'error',
                }),
            );     
        })

    }
}