import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Welcome extends NavigationMixin(LightningElement) {
    handleNavigate() {
        var compDetails = {
            componentDef: "c:moneySplitterApp",
            attributes: {
                //Value you want to pass to the next lwc component
                propertyValue: "500"
            }
        };
        // Base64 encode the compDefinition JS object
        var encodedCompDetails = btoa(JSON.stringify(compDetails));
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/one/one.app#' + encodedCompDetails
            }
        });
      
    }
   
 }

