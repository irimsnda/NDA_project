Ext.define('Admin.view.trader_accounts.views.panels.TraderAccountsInfoGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'traderaccountsinfogrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    scroll: true,
    autoHeight: true,
    width: '100%',
    requires: [
        'Ext.button.Button',
        'Ext.menu.Menu',
        'Ext.toolbar.Paging',
        'Admin.view.plugins.Searching',
        'Ext.grid.*'
    ],
    tbar: [{
        text: 'Trader Registration',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        form: 'traderaccountsinfofrm',
        handler: 'showTraderRegistrationfrm',
        stores: '["countriesstr"]'
    }, '->', {
        text: 'Pending Approval',
        scale: 'medium',
        ui: 'soft-green',
        margin: 5
    }, {
        text: 'Registered Traders',
        scale: 'medium',
        ui: 'soft-green',
        margin: 5
    }, {
        text: 'Rejected Traders',
        scale: 'medium',
        ui: 'soft-green',
        margin: 5
    }
    ],
    listeners: {
        beforerender: {
            fn: '',
            config: {
                pageSize: 100,
                storeId: '',
                proxy: {
                    extraParams: {
                        model_name: ''
                    }
                }
            },
            isLoad: true
        }
    },
    columns: [{
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
                    text: 'Edit Trader Info',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
                    form: 'genderfrm',
                    handler: 'showEditUserParamGridFrm',
                    stores: '[]'
                },  {
                    text: 'Approve Trader Account',
                    iconCls: 'x-fa fa-save',
                    status_id: 1,
                    tooltip: 'Approved Trader Account',
                    childXtype: 'traderAccountApprovalFrm',
                    handler: 'funcTraderAccountApproval'
                }, {
                    text: 'Deactivate Trader Account',
                    iconCls: 'x-fa fa-save',
                    status_id: 4,
                    tooltip: 'Block Trader Account',
                    handler: 'funcTraderAccountApproval'
                },{
                    text: 'Notify Trader',
                    iconCls: 'x-fa fa-envelope',
                    tooltip: 'Send Notification',
                }, {
                    text: 'Print Trader Info',
                    iconCls: 'x-fa fa-print',
                    tooltip: 'Edit Record',
                }, {
                    text: 'View Registered Products',
                    iconCls: 'x-fa fa-search',
                    tooltip: 'View Registered Products',
                    handler: ''
                }, {
                    text: 'View Registered Premises',
                    iconCls: 'x-fa fa-search',
                    tooltip: 'View Registered Premises',
                    handler: ''
                }, {
                    text: 'View Approved GMP Inspection Premises',
                    iconCls: 'x-fa fa-search',
                    tooltip: 'View GMP Inspection Premises',
                    handler: ''
                }]
            }
        }
    },
    {
        header: 'Trader Name',
        dataIndex: 'trader_name',
        flex: 1
    }, {
        header: 'Account No',
        dataIndex: 'identification_no',
        flex: 1
    }, {
        header: 'TIN No',
        dataIndex: 'tin_no',
        flex: 1
    }, {
        header: 'Contact Person',
        dataIndex: 'contact_person',
        flex: 1
    }, {
        header: 'Email Address',
        dataIndex: 'email_address',
        flex: 1
    }, {
        header: 'Country',
        dataIndex: 'country_name',
        flex: 1
    }, {
        header: 'Region',
        dataIndex: 'region_name',
        flex: 1
    }, {
        header: 'Physical Address',
        dataIndex: 'physical_address',
        flex: 1
    }, {
        header: 'Account Status',
        dataIndex: 'account_name',
        flex: 1
    }, {
        header: 'Is Approved',
        dataIndex: 'is_approved',
        flex: 1
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Trader Information',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        store: '',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }],
    features: [{
        ftype: 'searching',
        minChars: 3,
        mode: 'remote'
    }],

});