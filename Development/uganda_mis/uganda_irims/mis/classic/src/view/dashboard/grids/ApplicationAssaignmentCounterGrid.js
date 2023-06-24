
Ext.define('Admin.view.dashboard.grids.ApplicationAssaignmentCounterGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'applicationassaignmentcountergrid',
    controller: 'dashboardvctr',
    viewConfig: {
        deferEmptyText: false,
        preserveScrollOnReload: true,
        enableTextSelection: true,
        emptyText: 'No Details Available'
    },
    margin: 3,
    tbar: [{
        xtype: 'tbspacer',
        width: 5
    }, {
        xtype: 'combo',
        emptyText: 'MODULE',
        labelWidth: 80,
        width: 300,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'module_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'darkblue',
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
                var grid = cmbo.up('grid'),
                    process_id = grid.down('combo[name=process_id]'),
                    process_id_str = process_id.getStore(),
                    filters = JSON.stringify({'module_id':newVal});
                    
                process_id_str.removeAll();
                process_id_str.load({params: {filters: filters}});
                grid.getStore().load();
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
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'process_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'darkblue',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'wf_tfdaprocesses'
                        }
                       }
                    },
                    isLoad: true
                },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid');
                grid.getStore().load();
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
    }],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            width: '60%',
            beforeLoad: function () {
                var store = this.getStore(),
                    grid = this.up('grid'),
                    process_id = grid.down('combo[name=process_id]').getValue(),
                    module_id = grid.down('combo[name=module_id]').getValue();
                    store.getProxy().extraParams = {
                        process_id: process_id,
                        module_id: module_id
                    };
            }
        },
        '->',,'->',
        {
            xtype: 'exportbtn'
        }
    ],
    listeners: {
         beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 500,
                storeId: 'applicationassaignmentcounterStr',
                groupField: 'user_name',
                proxy: {
                    url: 'dashboard/getApplicationAssaignmentCount'
                }
            },
            isLoad: true
        }
    },
  
    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    features: [
        {
            ftype: 'groupingsummary',
            groupHeaderTpl: 'User: {[values.rows[0].data.user_name]},[{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
            //groupHeaderTpl: 'Process: {[values.rows[0].data.process_name]},Stage: {[values.rows[0].data.stage_name]}, User: {[values.rows[0].data.user_name]},[{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
            enableGroupingMenu: false,
            startCollapsed: true
        },{
            ftype: 'searching',
            minChars: 3,
            mode: 'local'
        }
    ],
    export_title: 'applicationassaignmentcounter',
    columns: [{
        xtype: 'gridcolumn',
        text: 'User',
        dataIndex: 'user_name',
        flex: 1,
        tdCls: 'wrap'
    },{
            xtype: 'gridcolumn',
            text: 'Process Name',
            dataIndex: 'process_name',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Stage',
            dataIndex: 'stage_name',
            flex: 1,
            tdCls: 'wrap',
            summaryRenderer: function(value){
             return "<font color='green'>Total Applications<font>"; 

          }
        },
        {
            xtype: 'gridcolumn',
            text: 'Application Counter',
            dataIndex: 'application_counter',
            flex: 1,
            tdCls: 'wrap',
            summaryType: 'sum',
            summaryRenderer: function(value){
                 return "<font color='green'>"+value+"<font>";
              }
            
        },
        {
            text: 'Options',
            xtype: 'widgetcolumn',
            width: 200,
            widget: {
                width: 170,
                textAlign: 'left',
                xtype: 'button',
                ui: 'soft-green',
                text: 'View Applications',
                handler: 'viewAssaignedApplications'
            }
        }
    ]
});