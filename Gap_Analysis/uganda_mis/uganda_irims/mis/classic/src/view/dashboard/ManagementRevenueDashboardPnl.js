Ext.define('Admin.view.dashboard.ManagementRevenueDashboardPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'managementrevenuedashboardpnl',
    xtype: 'grid-column-stacked',
    requires: [
        'Ext.chart.CartesianChart', 
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.theme.Midnight',
        'Ext.chart.series.Bar', 'Ext.chart.axis.Numeric',
         'Ext.chart.axis.Category',
         'Ext.ux.layout.ResponsiveColumn'
    ],
    controller: {
        type: 'dashboardvctr',
        defaultVisibleRange: {
            bottom: [0, 0.5]
        }
    },

    viewModel: {
        type: 'dashboard'
    },
    layout: 'border',
    shadow: true,
    tbar:[{
        xtype: 'toolbar',
        width: '100%',
        ui: 'footer',
        defaults:{
            labelAlign:'top',
        },
        items:[{
            xtype: 'tbfill'
        }, {
            xtype: 'combo',
            emptyText: 'SECTION',
            labelWidth: 80,
            width: 300,
            labelAlign:'top',
            fieldLabel:'Section',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            name: 'section_id',
            queryMode: 'local',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            extraParams: {
                                model_name: 'Section'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function (cmbo, newVal) {
                  //  var grid = cmbo.up('grid');
                    //    grid.getStore().load();
                }
            },
            triggers: {
                clear: {
                    type: 'clear',
                    hideWhenEmpty: true,
                    hideWhenMouseOut: false,
                    clearOnEscape: true
                }
            }
        }, {
            xtype: 'combo',
            emptyText: 'Process',
            labelWidth: 80,
            width: 300,
            fieldLabel:'Process',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            name: 'module_id',
            queryMode: 'local',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setWorkflowCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                model_name: 'Module'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function (cmbo, newVal) {
                    var panel = cmbo.up('panel')
                    sub_module = panel.down('combo[name=sub_module_id]'),
                        sub_module_str = sub_module.getStore();
                    sub_module_str.removeAll();
                    sub_module_str.load({params: {module_id: newVal}});
                  //  grid.getStore().load();
                }
            },
            triggers: {
                clear: {
                    type: 'clear',
                    hideWhenEmpty: true,
                    hideWhenMouseOut: false,
                    clearOnEscape: true
                }
            }
        }, {
            xtype: 'combo',
            emptyText: 'Sub Process',
            labelWidth: 80,
            width: 300,
            fieldLabel:'Sub-Process',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            name: 'sub_module_id',
            queryMode: 'local',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setWorkflowCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'workflow/getSystemSubModules',
                            extraParams: {
                                model_name: 'SubModule'
                            }
                        }
                    },
                    isLoad: false
                }
            },
            triggers: {
                clear: {
                    type: 'clear',
                    hideWhenEmpty: true,
                    hideWhenMouseOut: false,
                    clearOnEscape: true
                }
            }
        },,{
            xtype:'datefield',
            format:'Y-m-d',
            fieldLabel:'Date From',
            name:'date_from'
        },{
            xtype:'datefield',
            format:'Y-m-d',
            fieldLabel:'Date To',
            name:'date_to'
        },{
            text:'Filter',
            iconCls:'x-fa fa-search',
            graph_store: 'managementgraphrevenuegridstr',
            grid_store: 'managementrevenuedashboardgridstr',
            handler:'funcFilterManagementProcessDetails' 
        },{
            text:'Clear',
            iconCls:'x-fa fa-cancel',
            handler:'funcClearManagementProcessDetails'
        }]
    }],
    bbar:[{
        xtype: 'toolbar',
        width: '100%',
        ui: 'footer',
        items:[{
            xtype: 'tbfill'
        }, {
            iconCls: 'x-fa fa-picture-o',
            text: 'Theme',
            handler: 'onThemeChange'
        }, {
            iconCls: 'x-fa fa-bars',
            text: 'Group',
            handler: function(button) {
                var chart = this.up('panel').down('cartesian'),
                    series = chart.getSeries()[0];
                    
                button.setText(series.getStacked() ? 'Stack' : 'Group');
                series.setStacked(!series.getStacked());
                chart.redraw();
    
            }
        }]
    }], 
    
    items: [{
        xtype: 'cartesian',region:'west',
        width: 450,
        collapsible: true, 
            collapsed: true,
        listeners: {
            beforerender: {
                fn: 'func_setStore',
                config: {
                    pageSize: 1000,
                    storeId: 'managementgraphrevenuegridstr',
                    proxy: {
                        url: 'dashboard/getDashRevenueGraphSummaryDetails',
                        
                    }
                },
                isLoad: true
              }
        },
        legend: {
            type: 'sprite',
            docked: 'right'
        },
        innerPadding: '0 3 0 3',
        insetPadding: '30 10 10 10',
        
        series: [{
            type: 'bar',
            xField: 'name',
            yField: ['2', '4', '5'],
            title: ['Medicines', 'Medical Devices', 'Clinical Trial'],
            stacked: false,
            style: {
                lineWidth: 2,
                maxBarWidth: 50
            }
        }],
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['2', '4', '5'],
            label: {
                rotate: {
                    degrees: -30
                }
            }
        }, {
            type: 'category',
            position: 'bottom',
            fields: 'name',
            grid: true,
            //visibleRange: [0, 0.2], 
            label: {
                rotate: {
                    degrees: 20
                }
            },
           style: {
                estStepSize: 20  
            },
        }]
    },{
            xtype:'managementrevenuedashboardgrid',
            region: 'center',
            collapsible: true, 
            collapsed: false,
            width: 600,
            split: true,
            title:'Revenue Details Represenatation'

    }],

    initialize: function() {
        this.callParent();
        
        var toolbar = Ext.ComponentQuery.query('toolbar', this)[0],
            interaction = Ext.ComponentQuery.query('interaction', this)[0];
        
        if (toolbar && interaction) {
            toolbar.add(interaction.getModeToggleButton());
        }
    }
});
