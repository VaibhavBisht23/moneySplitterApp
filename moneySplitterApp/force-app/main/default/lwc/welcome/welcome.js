// import { LightningElement } from 'lwc';
// import { NavigationMixin } from 'lightning/navigation';

// export default class Welcome extends NavigationMixin(LightningElement) {
//     handleNavigate() {
//         var compDetails = {
//             componentDef: "c:submitted",
//             attributes: {
//                 //Value you want to pass to the next lwc component
//                 propertyValue: "500"
//             }
//         };
//         // Base64 encode the compDefinition JS object
//         var encodedCompDetails = btoa(JSON.stringify(compDetails));
//         this[NavigationMixin.Navigate]({
//             type: 'standard__webPage',
//             attributes: {
//                 url: '/one/one.app#' + encodedCompDetails
//             }
//         });
      
//     }
   
//  }
import { LightningElement,track,api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import csvFileRead from '@salesforce/apex/UploadCSVFileRecords.csvFileRead';

const columnsAccount = [
    { label: 'Name', fieldName: 'Name' }, 
    { label: 'AccountNumber', fieldName: 'AccountNumber' },
    { label: 'Rating', fieldName: 'Rating'}, 
    { label: 'Type', fieldName: 'Type'}, 
    // { label: 'Employees', fieldName: 'Employees',}
];

export default class Welcome extends LightningElement {
    @api recordId;
    @track error;
    @track columnsAccount = columnsAccount;
    @track data;
    @track showLoadingSpinner = false;

    // accepted parameters
    get acceptedCSVFormats() {
        return ['.csv'];
    }
    
    uploadFileHandler(event) {
        // Get the list of records from the uploaded files
        const uploadedFiles = event.detail.files;
       

        // calling apex class csvFileread method
        this.showLoadingSpinner = true;
        csvFileRead({contentDocumentId : uploadedFiles[0].documentId})
        
        .then(result => {
            this.showLoadingSpinner = false;
            console.log('result ===> '+result);
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
            this.error = error;
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

