Ext.define('Admin.view.reports.appsreports.disposalreport.graph.DisposalGraphicalRepresentationGraph', {
    extend: 'Ext.panel.Panel',
    controller: 'productreportctr',
    xtype: 'disposalgraphicalrepresentationgraph',
    layout: 'fit',
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
                    xtype: 'button',
                    ui: 'soft-green',
                    text: 'Download Chart',
                    handler:'func_downloadgraph',
                    FileName: 'Disposal Applications Summary Chart.png'
                }, {
                    xtype: 'button',
                    ui: 'soft-green',
                    text: 'Reload chart',
                    handler:'reloadDisposalCartesianFilters', 
                }]
            }],
           items: [{
                    xtype: 'cartesian',
                    listeners: {
                        beforerender: {
                            fn: 'func_setStore',
                            config: {
                                pageSize: 1000,
                                storeId: 'disposalReportCartesianStr',
                                proxy: {
                                   url: 'newreports/getDisposalSummaryCartesianReport',
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
                        docked: 'right'
                    },
                    insetPadding: {
                        top: 40,
                        left: 0,
                        right: 10,
                        bottom: 40
                    },
                    sprites: [{
                        type: 'text',
                        text: 'Disposal Applications Report Chart',
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
                            fontSize: 10,
                            orientation: 'horizontal'
                         },

                    }],
                    series: [{
                        type: 'bar',
                        title: [ 'Brought Forward', 'Received Applications','Screened','Evaluated','Request for Additional Information','Response of Request', 'Approved', 'Rejected', 'Carried Forward' ],
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