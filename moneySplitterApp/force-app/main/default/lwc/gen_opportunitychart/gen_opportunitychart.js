import { LightningElement, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/GEN_ChartController.getOpportunities';
 
export default class Gen_opportunitychart extends LightningElement {
    chartConfiguration;
 
    connectedCallback() {
        
    this.chartConfiguration = {
            type: 'bubble',
            data: {
                datasets: [{
                        label: 'Color1',
                        title: "dataTitle2",
                       
                        data: [{
                            
                            x: 40,y: 60,r: 100
                            } 
                            ],
                         backgroundColor: 'rgb(255, 99, 132)',
                        
                    // },{
                    //     label: 'Color2',
                    //         data: [{
                    //         x: 15,y: 40,r: 40
                    //         },{
                    //         x: 35,y: 15,r: 60
                    //         },{
                    //         x: 35,y: 32,r: 16
                    //         }],
                    //     backgroundColor: 'rgb(75, 192, 192)',
                        
                    }],
                
                // labels: chartLabel,
            },
            options: {
                // plugins: {
 
                //     datalabels: {
                //         anchor:'center',
                //         align: 'center',
                //         color: 'white',
                //         font: {
                //             weight: 'bold'
                //         },
                //         offset: 2,
                //         padding: 0,
                //         formatter:50
                        // labels: {
                        //     value: {},
                        //     title: {
                        //         color: 'blue'
                        //     }
                        // }
                    },
                // },
                // aspectRatio: 5 / 3,
                // layout: {
                //     padding: 2
                // },
                // elements: {
                //     point: {
                //         radius: 10
                //     }
                // },
                scales:
                {
                        yAxes: [{
                            title: '',
                        gridLines : {
                            drawBorder: false,
                            display: false,
                            drawOnChartArea: false
                        },
                        ticks:{
                            display:false
                        }
                        }],
                    xAxes: [{
                        title: '',
                        gridLines : {
                            drawBorder: false,
                            display: false,
                            drawOnChartArea: false
                        },
                        ticks:{
                            display:false
                        }
                    }],
                    
                }
            }
        };
    }
 

