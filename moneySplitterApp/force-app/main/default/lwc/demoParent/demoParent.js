import { LightningElement,track } from 'lwc';
import getAccounts from "@salesforce/apex/Testclass.getAccountData";

export default class LwcTester extends LightningElement {

  @track allaccounts = []

  connectedCallback(){
    this.handleGetAccounts();
  }

  handlerefreshrecords(event) {
    this.handleGetAccounts();
  }

  handleGetAccounts() {
    getAccounts({})
      .then((result) => {
        this.allaccounts = result.map(row => {return { ...row }});
      })
      .catch((error) => {this.allaccounts = undefined;})
  }
}