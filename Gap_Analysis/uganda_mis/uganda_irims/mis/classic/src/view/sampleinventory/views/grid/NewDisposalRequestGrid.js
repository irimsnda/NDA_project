
Ext.define('Admin.view.sampleinventory.views.grid.NewDisposalRequestGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'newdisposalrequestGrid',
    cls: 'dashboard-todo-list',
    itemId: 'newdisposalrequestGrid',
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
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    export_title: 'Inventory Disposal Requests',

    listeners: {
        beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 100,
                    storeId: 'newdisposeInventoryStr',
                    enablePaging: true,
                    remoteFilter: true,
                    proxy: {
                        url: 'sampleinventory/getNewDisposalRequests',
                    }
                },
                isLoad: true
            },

        itemdblclick: 'opennewInventoryDBClick'
    },
    
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'module_id',
        text: 'module_id',
        hidden: true,
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sub_module_id',
        text: 'sub_module_id',
        hidden: true,
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'process_id',
        text: 'process_id',
        hidden: true,
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'requested_by',
        text: 'requested_by',
        hidden: true,
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'disposal_reason_id',
        text: 'disposal_reason_id',
        hidden: true,
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'disposal_method_id',
        text: 'disposal_method_id',
        hidden: true,
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'disposal_date',
        text: 'disposal_date',
        hidden: true,
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'active_application_id',
        text: 'application_id',
        hidden: true,
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'active_application_code',
        text: 'Application Code',
        flex: 1,
        hidden: true
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
    },{
        xtype: 'gridcolumn',
        dataIndex: 'requested_by',
        text: 'Requested By',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Application Status',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        text: 'Date Received',
        dataIndex: 'created_on',
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

            this.up('newdisposalrequestGrid').fireEvent('refresh', this);

        }
    }]
});
