Ext.define('Admin.view.trader_accounts.views.panels.TraderAccountsManagementGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'traderAccountsManagementGrid',
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
        emptyText: 'Trader Statuses',
        name: 'status_id',
        valueField: 'id',
        xtype: 'combo', queryMode: 'local',
        displayField: 'name',
        allowBlank: false,
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        extraParams: {
                            model_name: 'AccountStatuses'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        text: 'Filter Details',
        name: 'filter_traders',
        ui: 'soft-green',
        margin: 5,
        iconCls: 'fa fa-search',
        handler: 'func_filtertradersdata'
    }, {
        text: 'Reset Details',
        name: 'filter_traders',
        ui: 'soft-red',
        margin: 5,
        handler: 'func_Resettradersdata'
    }, {
        text: 'Print Details',
        name: 'filter_traders',
        ui: 'soft-green',
        margin: 5,
        iconCls: 'fa fa-search',
        handler: 'func_Printtradersdata'
    }, { xtype: 'tbfill' }, {
        text: 'Pending Approval',
        name: 'pending_approval',
        ui: 'soft-green',
        margin: 5
    }, {
        text: 'Active Account',
        name: 'registered_traders',
        ui: 'soft-green',
        margin: 5
    }, {
        text: 'Rejected Traders',
        name: 'rejected_traders',
        ui: 'soft-green',
        margin: 5
    }, {
        text: 'Dormant Traders',
        name: 'dormant_account',
        ui: 'soft-green',
        margin: 5
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                remoteFilter: true,
                storeId: 'traderAccountsManagementStr',
                proxy: {
                    url: 'tradermanagement/gettraderAccountsManagementDetails'
                }
            },
            isLoad: true
        },
        afterrender: 'funcgetTraderStatusesCounter'
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
                    form: 'traderAccountsManagementFrm',
                    handler: 'showEditConfigParamGridFrm',
                    stores: '[]'
                },  {
                    text: 'Approve Trader Account',
                    iconCls: 'x-fa fa-save',
                    status_id: 1,
                    tooltip: 'Approve Trader Account',
                    childXtype: 'traderAccountApprovalFrm',
                    winTitle: 'Approve Trader Account',
                    winWidth: '30%',
                    handler: 'funcTraderAccountApproval'
                }, {
                    text: 'Deactivate Trader Account',
                    iconCls: 'x-fa fa-save',
                    status_id: 4,
                    childXtype: 'traderAccountApprovalFrm',
                    tooltip: 'Deactivate Trader Account',
                    winTitle: 'Deactivate Trader Account',
                    winWidth: '30%',
                    handler: 'funcTraderAccountApproval'
                }, {
                    text: 'Print Trader Info',
                    iconCls: 'x-fa fa-print',
                    handler: 'funcPrintTraderInformationGrid',
                    report_url: 'tradermanagement/printtraderAccountsManagementDetails',
                    tooltip: 'Print Trader Account Information',
                }, {
                    text: 'Sync Trader Applications',
                    iconCls: 'x-fa fa-unlink',
                    tooltip: 'View Synchronization Requests',
                    winTitle: 'Trader Synchronization Requests',
                    winWidth: '70%',
                    grid: 'traderappsyncgrid',
                    handler: 'funcViewCommonGridWindow'
                }, {
                    text: 'View Registered Products',
                    iconCls: 'x-fa fa-search',
                    tooltip: 'View Registered Products',
                    grid: 'traderregisteredproductsgrid',
                    winTitle: 'Trader Registered Products',
                    winWidth: '70%',
                    handler: 'funcViewCommonGridWindow'
                }, {
                    text: 'View Registered Premises',
                    iconCls: 'x-fa fa-search',
                    tooltip: 'View Registered Premises',
                    grid: 'traderregisteredpremisesgrid',
                    winTitle: 'Trader Registered Premises',
                    winWidth: '70%',
                    handler: 'funcViewCommonGridWindow'
                }, {
                    text: 'View Approved GMP Inspection GMP',
                    iconCls: 'x-fa fa-search',
                    tooltip: 'View GMP Inspection GMP',
                    grid: 'traderapprovedgmpgrid',
                    winTitle: 'Trader Approved GMP',
                    winWidth: '70%',
                    handler: 'funcViewCommonGridWindow'
                }, {
                    text: 'View Authorised Products',
                    iconCls: 'x-fa fa-search',
                    tooltip: 'View Authorised Products',
                    grid: 'traderauthorisedproductsgrid',
                    winTitle: 'Trader Authorised Products',
                    winWidth: '70%',
                    handler: 'funcViewCommonGridWindow'
                }, {
                    text: 'View  Account Users',
                    iconCls: 'x-fa fa-search',
                    tooltip: 'View Account Users',
                    grid: 'traderAccountsUsersGrid',
                    winTitle: 'Trader Account Users',
                    winWidth: '70%',
                    handler: 'funcViewCommonGridWindow'
                }]
            }
        }
    },
    {
        header: 'Trader Id',
        dataIndex: 'id',
        name: 'trader_id',
        hidden: true
    },
    {
        header: 'Trader Name',
        dataIndex: 'name',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        header: 'Account No',
        dataIndex: 'identification_no',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        header: 'TIN No',
        dataIndex: 'tin_no',
        flex: 1
    }, {
        header: 'Contact Person',
        dataIndex: 'contact_person',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        header: 'Email Address',
        dataIndex: 'email',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        header: 'Country',
        dataIndex: 'country_name',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        header: 'Region',
        dataIndex: 'region_name',
        flex: 1
    }, {
        header: 'Physical Address',
        dataIndex: 'physical_address',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        header: 'Account Status',
        dataIndex: 'account_status',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }],
    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    export_title: 'Trader Information',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }]
});