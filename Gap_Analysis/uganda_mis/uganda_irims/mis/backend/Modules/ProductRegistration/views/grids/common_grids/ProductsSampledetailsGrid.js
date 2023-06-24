
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductsSampledetailsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'productsSampledetailsGrid',
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
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'productsSampledetailsFrm',
        winTitle: 'Product Sample Details',
        winWidth: '70%',
        handler: 'showAddProductOtherdetailsWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'hiddenfield',
        name: 'isReadOnly'

    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('productsSampledetailsGrid').fireEvent('refresh', this);
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'productsSampledetailsStr',
                proxy: {
                    url: 'productregistration/onLoadProductsSampledetails'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Brand Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'batch_no',
        text: 'Batch No',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'submission_date',
        text: 'Submission Date',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'quantity',
        text: 'Quantity',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'quantity_unit',
        text: 'Quantity Unit',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'sample_status',
        text: 'sample Status',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'mode_of_delivery',
        text: 'Mode of delivery',
        flex: 1,
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'sample_tracking_no',
        text: 'Sample Tracking No',
        flex: 1,
    }, {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
                    childXtype: 'productsSampledetailsFrm',
                    winTitle: 'Product Sample Details',
                    winWidth: '40%', bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_sample_information',
                    storeID: 'productsSampledetailsStr',
                    action_url: 'productregistration/onDeleteProductOtherDetails',
                    action: 'actual_delete', bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    handler: 'doDeleteProductOtherdetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }]
            }
        }
    }]
});

