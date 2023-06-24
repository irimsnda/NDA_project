Ext.define('Admin.view.reports.appsreports.productreport.graph.ProductGraphicalRepresentationGraph', {
    extend: 'Ext.panel.Panel',
    controller: 'productreportctr',
    xtype: 'productgraphicalrepresentationgraph',
    layout: 'fit',
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
                    xtype: 'button',
                    ui: 'soft-green',
                    text: 'Download Chart',
                    handler:'func_downloadgraph',
                    FileName: 'Product Applications Summary Chart.png'
                }, {
                    xtype: 'button',
                    ui: 'soft-green',
                    text: 'Reload chart',
                    handler:'reloadProductCartesianFilters', 
                }]
            }],
           items: [{
                    xtype: 'cartesian',
                    listeners: {
                        beforerender: {
                            fn: 'func_setStore',
                            config: {
                                pageSize: 1000,
                                storeId: 'productReportCartesianStr',
                                proxy: {
                                   url: 'newreports/getProductSummaryCartesianReport',
                                    extraParams: {
                                       module_id: 1
                                    }
                                }
                            },
                            isLoad:false
                          }
                   },

                    reference: 'chart',
                    requires: ['Ext.chart.theme.Muted'],

                    legend: {
                        type: 'sprite',
                        docked: 'right',
                        padding:4
                        
                    },
                    insetPadding: {
                        top: 40,
                        left: 5,
                        right: 5,
                        bottom: 10
                    },
                    sprites: [{
                        type: 'text',
                        text: ' Product Applications Summary Report Chart',
                        fontSize: 16,
                        width: 100,
                        height: 30,
                        x: 40, // the sprite x position
                        y: 20  // the sprite y position
                    }],
                    axes: [{
                        type: 'numeric',
                        position: 'left',
                        adjustByMajorUnit: true,
                        grid: true,
                        fields: ['received_applications'],
                        renderer: 'onAxisLabelRender',
                        minimum: 0
                    }, {
                        type: 'category',
                        position: 'bottom',
                        grid: true,
                        fields: ['SubModule'],
                        label: {
                            display: 'middle',
                            'text-anchor': 'middle',
                            fontSize: 9,
                            orientation: 'horizontal'
                         },

                    }],
                   
                    series: [{
                        type: 'bar',
                        title: [ 'Brought Forward', 'Received ','Screened','Evaluated','Queried','Response of Request', 'Approved', 'Rejected', 'Carried Forward' ],
                        xField: ['SubModule'],
                        yField: ['brought_forward', 'received_applications','screened_applications','evaluated_applications','requested_for_additional_information', 'query_responses','approved_applications', 'rejected_applications', 'carried_forward'],
                        stacked: false,
                        style: {
                            opacity: 0.80,
                            minGapWidth: 20,
                            maxBarWidth: 300,
                        },
                        highlight: {
                            fillStyle: 'green',
                            opacity: 0.8
                        },

                        tooltip:{ 
                              trackMouse:true, 
                              scope: this, 
                              renderer:function(toolTip, storeItem, item){
                                toolTip.setHtml(storeItem.get(item.field).toFixed(1)+' '+item.field+ ' for '+storeItem.get('SubModule') );
                              }
                         }
                    }]
                }]
  
});