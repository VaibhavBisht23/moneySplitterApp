import { LightningElement, api, track } from 'lwc';

const COLUMNS = [
  { label: 'Name', fieldName: 'Name' },
  { label: 'Website', fieldName: 'Website', type: 'url' },
  { label: 'Phone', fieldName: 'Phone', type: 'phone' }
];

export default class LwcTestTable extends LightningElement {

  columns = COLUMNS;
  @api records;

  handleRefresh(event){
    this.dispatchEvent( new CustomEvent('refreshrecords', {detail:event.detail}));
  }

}