
Ext.define('Admin.view.sampleinventory.views.grid.DisposeInventoryGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'disposeinventoryGrid',
    cls: 'dashboard-todo-list',
    itemId: 'disposedinventorygrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },

    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 50
    }, {
        xtype: 'combo',
        fieldLabel: 'Workflow Stage',
        valueField: 'id',
        name: 'workflow_stage_id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        width: 320,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
         listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'workflow/getProcessWorkflowStages',
                        extraParams: {
                            module_id: 19,
                            sub_module_id: 46
                        }
                        
                    }
                },
                isLoad: true
            },
            change: 'reloadParentGridOnChange'
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
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Inventory Disposal Requests',

    listeners: {
        beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 100,
                    storeId: 'disposeInventoryStr',
                    enablePaging: true,
                    remoteFilter: true,
                    proxy: {
                        url: 'sampleinventory/getDisposalApprovalRequests',
                    }
                },
                isLoad: true
            },

        itemdblclick: 'disposeInventoryDBClick'
    },
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: true,
       groupHeaderTpl: 'Process: {[values.rows[0].data.process_name]}, Stage: {[values.rows[0].data.workflow_stage]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
       
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    columns: [
    // {
    //     xtype: 'gridcolumn',
    //     dataIndex: 'tracking_no',
    //     text: 'Tracking Number',
    //     flex: 1
    // }, 
    {
        xtype: 'gridcolumn',
        dataIndex: 'process_id',
        text: 'process_id',
        hidden: true,
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'workflow_stage_id',
        text: 'workflow_stage_id',
        hidden: true,
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Ref Number',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'process_name',
        text: 'Process',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        text: 'From',
        dataIndex: 'from_user',
        flex: 1,
        tdCls: 'wrap'
    },
    {
        xtype: 'gridcolumn',
        text: 'To',
        dataIndex: 'to_user',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'requested_by',
        text: 'Requested By',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'workflow_stage',
        text: 'Workflow Stage',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Application Status',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        text: 'Date Received',
        dataIndex: 'date_received',
        flex: 1,
        tdCls: 'wrap-text',
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
    }],
     bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid'),
                store = grid.getStore(),
                workflow_stage_id = grid.down('combo[name = workflow_stage_id]').getValue();


            store.getProxy().extraParams = {
                        workflow_stage_id:workflow_stage_id
                }

        }
    }]
});
