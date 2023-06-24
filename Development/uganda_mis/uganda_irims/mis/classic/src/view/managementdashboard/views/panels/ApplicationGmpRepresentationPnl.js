Ext.define('Admin.view.managementdashboard.views.panels.ApplicationGmpRepresentationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationGmpRepresentationPnl',
    title: 'GMP Report',
    userCls: 'big-100 small-100',
    padding: '5 5 5 5',
    //height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'form'
    },
    border: true,
    items: [{
            xtype: 'cartesian',
            height: 300,
            listeners: {
                beforerender: {
                    fn: 'func_setStore',
                    config: {
                        pageSize: 1000,
                        storeId: 'gmpAppDashReportCartesianStr',
                        proxy: {
                            url: 'managementdashboard/getApplicationsCartesianDasboardReport',
                            extraParams: {
                               module_id: 3
                            }
                        }
                    },
                    isLoad: true
                  }
           },
            reference: 'chart',
            requires: ['Ext.chart.theme.Muted'],

            legend: {
                type: 'sprite',
                docked: 'top'
            },
            insetPadding: {
                top: 40,
                left: 0,
                right: 10,
                bottom: 40
            },
            sprites: [{
                type: 'text',
                text: 'Applications Report Chart',
                fontSize: 22,
                // width: 100,
                // height: 30,
                // x: 40, // the sprite x position
                // y: 20  // the sprite y position
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
                fields: ['section_name'],
                label: {
                    rotate: {
                        degrees: 20
                    }
                },
               style: {
                    estStepSize: 20  
                },

            }],
            series: [{
                type: 'bar',
                title: ['Received', 'Approved','Rejected'],
                xField: ['section_name'],
                yField: ['received_applications', 'approved',' rejected'],
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
                        toolTip.setHtml(storeItem.get(item.field).toFixed(1)+' '+item.field+ ' for '+storeItem.get('section_name') );
                      }
                 }
            }]
            
         },
          {
            xtype: 'gridpanel',
            height: 300,
            //width: '100%',
            title: 'Tabular Representation',
            listeners: {
                    beforerender: {
                        fn: 'setConfigGridsStore',
                        config: {
                            pageSize: 1000,
                            groupField: 'zone_name',
                            storeId: 'gmpAppDashReportCartesianStr',
                            proxy: {
                                url: 'managementdashboard/getApplicationsGridDasboardReport',
                                extraParams: {
                                        module_id: 3
                                    }
                            }
                        },
                        isLoad: true
                      }
                   },
            plugins: [{
                    ptype: 'gridexporter'
                }],
            features: [{
                 //groupHeaderTpl: 'SubModule: {SubModule}',
                 startCollapsed: true,
                 ftype: 'groupingsummary'
            }],
            columns: [{
                text: 'Section',
                sortable: false,
                width: 90,
                tbCls: 'wrap',
                dataIndex: 'section_name',
                summaryRenderer: function(){
                        return '<b>Grand Total:</b>';
                    }
            },{
                text: 'Received',
                flex: 1,
                dataIndex: 'received_applications',
                summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                  },
            },
            {
                text: 'Approved',
                flex: 1,
                dataIndex: 'approved',
                summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                  },
            },
            {
                text: 'Rejected',
                flex: 1,
                dataIndex: 'rejected',
                summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                  },
            }
        ],
        bbar: [{
                xtype: 'pagingtoolbar',
                width: '100%',
                displayInfo: true,
                hidden: false,
                displayMsg: 'Showing {0} - {1} out of {2}',
                emptyMsg: 'No Records',
                 beforeLoad: function() {
                        var grid=this.up('panel'),
                            form=grid.up('panel'),
                            pnl = form.up('panel'),
                            con=pnl.up('panel'),
                               section_id = con.down('combo[name=section_id]').getValue(),
                               zone_id = con.down('combo[name=zone_id]').getValue(),
                               from_date = con.down('datefield[name=from_date]').getValue(),
                               to_date = con.down('datefield[name=to_date]').getValue();

                         var store=this.getStore();
                         store.getProxy().extraParams = {
                                section_id: section_id,
                                module_id: 3,
                                zone_id: zone_id,
                                from_date: from_date,
                                to_date: to_date

                       }
                        
                    },
                
        
             }],
            
            
         }]
});
