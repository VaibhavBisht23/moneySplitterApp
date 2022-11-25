import { LightningElement } from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';
import {fireEvent} from 'c/pubsub';


export default class ButtonClickTOAddNewRow extends LightningElement {
    @wire (CurrentPageReference) pageRef;

    calEvent(event){
        var eventParam = {'firstname': 'KnowledgePredator'};
        fireEvent(this.pageRef,'pubsubevent',eventParam);

    }

}