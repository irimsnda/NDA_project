Ext.define('Admin.view.administration.views.grids.ApplicationAssignmentProcessListGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'applicationassignmentprocesslistgrid',
    itemId: 'applicationassignmentprocesslistid',
    cls: 'dashboard-todo-list',
    header: false,
    controller: 'administrationvctr',
    height: Ext.Element.getViewportHeight() - 118,
    autoScroll: true,
    autoHeight: true,
    width: '50%',

    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    tbar: [{
        xtype: 'tbspacer',
        width: 5
    }, {
        xtype: 'combo',
        emptyText: 'SECTION',
        labelWidth: 80,
        width: 200,
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
    }, {
        xtype: 'combo',
        emptyText: 'MODULE',
        labelWidth: 80,
        width: 200,
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
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {
            var grid = this.up('grid'),
                group_id = grid.down('hiddenfield[name=group_id]').getValue(),
                module_id = grid.down('combo[name=module_id]').getValue(),
                section_id = grid.down('combo[name=section_id]').getValue(),
                store = grid.getStore();

         store.getProxy().extraParams = {
                    group_id:group_id,
                    module_id:module_id,
                    section_id:section_id
                }      
            
        },
     },'->',{
        xtype: 'button',
        text: 'Sync',
        width: 100,
        action: 'sync',
        disabled: true,
        ui: 'soft-purple',
        handler: 'syncApplicationAssignmentSetup'
    },{
        xtype: 'hiddenfield',
        name: 'group_id'
    }
    ],

    selModel:{
        selType: 'checkboxmodel'
    },
    features: [{
        ftype:'grouping',
        startCollapsed: true
    }],
    listeners: {
        beforerender: {
            fn: 'setAdminGridsStore',
            config: {
                pageSize: 100,
                storeId: 'applicationassignmentprocesslistStr',
                enableGrouping: true,
                groupField: 'module',
                proxy: {
                    url: 'administration/getApplicationAssignmentProcessList',
                }
            },
            isLoad: false
        },
        select: function (sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[action=sync]').setDisabled(false);
            }
        },
        afterrender: function () {
            var grid = this,
                sm = grid.getSelectionModel();
                
                
            grid.store.on('load', function (store, records, options) {
                Ext.each(records, function (record) {
                 
                    var rowIndex = store.indexOf(record);
                    if (record.data.has_access > 0 ) {
                        sm.select(rowIndex, true);
                    }
                });
            })
        },
        deselect: function (sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[action=sync]').setDisabled(false);
            }
        }
    },
    columns: [
    {
        xtype: 'gridcolumn',
        dataIndex: 'process_id',
        hidden: true,
        text: 'process_id',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'process_name',
        text: 'Process',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'module',
        text: 'Module',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'section',
        text: 'Section',
        flex: 1,
    }]
});
