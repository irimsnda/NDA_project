Ext.define('Admin.view.reports.appsreports.controlleddrugsreport.graph.LocalSupplyGraphicalRepresentationGraph', {
    extend: 'Ext.panel.Panel',
    controller: 'productreportctr',
    xtype: 'localsupplygraphicalrepresentationgraph',
    layout: 'fit',
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
                    xtype: 'button',
                    text: 'Download Chart',
                    ui: 'soft-green',
                    handler:'func_downloadgraph',
                    FileName: 'Order_for_supply_of_Dangerous_Drugs_Applications_Summary_Chart.png'
                }, {
                    xtype: 'button',
                    ui: 'soft-green',
                    text: 'Reload chart',
                    handler:'reloadLocalSupplyCartesianFilters', 
                }]
                }],
             items: [{
                    xtype: 'cartesian',
                    listeners: {
                        beforerender: {
                            fn: 'func_setStore',
                            config: {
                                pageSize: 1000,
                                storeId: 'LocalSupplyReportCartesianStr',
                                proxy: {
                                   url: 'newreports/getCertificateOrderSummaryCartesianReport',
                                    extraParams: {
                                       module_id: 12
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
                        docked: 'right'
                    },
                    insetPadding: {
                        top: 40,
                        left: 5,
                        right: 5,
                        bottom: 10
                    },
                    sprites: [{
                        type: 'text',
                        text: 'Order for Suuply of Dangerous Drugs Summary Report Chart',
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
                        fields: ['submodule'],
                         label: {
                            display: 'middle',
                            'text-anchor': 'middle',
                            fontSize: 9,
                            orientation: 'horizontal'
                         },

                    }],
                    series: [{
                        type: 'bar',
                        title: [ 'Brought Forward', 'Received Applications', 'Screened','Queried','Query Response', 'Permits Reviewed','Permits Released', 'Permits Rejected', 'Carried Forward' ],
                        xField: ['submodule'],
                        yField: ['brought_forward', 'received_applications','screened_applications', 'requested_for_additional_information','query_responses', 'permit_reviewed',' permit_release', 'permit_rejection', 'carried_forward'],
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
                                toolTip.setHtml(storeItem.get(item.field).toFixed(1)+' '+item.field+ ' for '+storeItem.get('submodule') );
                              }
                         }
                    }]
                }]
  
});
