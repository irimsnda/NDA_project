Ext.define('Admin.view.sampleinventory.views.panel.InventoryApprovedDisposalGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'sampleinventoryvctr',
    xtype: 'inventoryapproveddisposalgrid',
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
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
  
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                {
                    text: 'Back',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-home',
                    name: 'backHome',
                    hidden: true,
                    handler: 'Backhome'
                },  {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    table_name: '',
                    beforeLoad: function () {
                        var grid = this.up('grid'),
                            store =  grid.getStore(),
                            panel = grid.up('panel'),
                            application_code = panel.down('hiddenfield[name=active_application_code]').getValue();
                        store.getProxy().extraParams = {
                            application_code: application_code,
                        }
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    handler: 'submit_selected',
                    disabled: false,
                    storeID: '',
                    table_name: 'tra_inventorydisposal_applications',
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    // tbar: [{
    //     xtype: 'button',
    //     text: 'Approve All',
    //     iconCls: 'x-fa fa-check',
    //     ui: 'soft-purple',
    //     handler: 'approveAllRequests',
    // }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'inventoryapproveddisposalitemsSstr',
                proxy: {
                    url: 'sampleinventory/getDisposalApprovalRequestsItems'//
                }
            },
            isLoad: true
        }, 
    }, 
   
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'item_reference_no',
        text: 'Item Ref Number',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'item_type',
        text: 'Item Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'disposal_reason',
        text: 'Disposal Reason',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'disposal_quantity',
        text: 'Disposal Quantity',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'quantity_units',
        text: 'Quantity Units',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'recommendation',
        text: 'Approval Recommendation',
        flex: 1
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
                    text: 'Print Issuance Document',
                    iconCls: 'x-fa fa-chevron-circle-up',
                    approval_frm: 'disposalapprovalrecommfrm',
                    handler: 'print_issuance',
                    stores: '[]',
                    table_name: 'tra_inventory_applications'
                }, {
                    text: 'Preview Disposal Request',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Preview Record',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Disposal Information',
                    winWidth: '50%',
                    isReadOnly: 1,
                    handler: 'viewDisposalRequestDetails'
                }]
            }
        }
    }]
});
