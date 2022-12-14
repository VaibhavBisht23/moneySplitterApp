import { LightningElement, api } from 'lwc';
import chartjs from '@salesforce/resourceUrl/ChartJS';
// import ChartDataLabels from '@salesforce/resourceUrl/ChartJSPlugin';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 
export default class Gen_barchart extends LightningElement {
    @api chartConfig;
 
    isChartJsInitialized ;
    renderedCallback() {
        if (this.isChartJsInitialized) {
            return;
        }
        // load chartjs from the static resource
        Promise.all([loadScript(this, chartjs)])
            .then(() => {
                this.isChartJsInitialized = true;
                const ctx = this.template.querySelector('canvas.bubbleChart').getContext('2d');
                this.chart = new window.Chart(ctx, JSON.parse(JSON.stringify(this.chartConfig)));
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading Chart',
                        message: error,
                        variant: 'error',
                    })
                );
            });
            // Promise.all([loadScript(this, ChartDataLabels)])
            // .then(() => {
            //     this.isChartJsInitialized = true;
            //     const ctx = this.template.querySelector('canvas.bubbleChart').getContext('2d');
            //     this.chart = new window.Chart(ctx, JSON.parse(JSON.stringify(this.chartConfig)));
            // })
            // .catch(error => {
            //     this.dispatchEvent(
            //         new ShowToastEvent({
            //             title: 'Error loading Chart',
            //             message: error,
            //             variant: 'error',
            //         })
            //     );
            // });
    }
}
