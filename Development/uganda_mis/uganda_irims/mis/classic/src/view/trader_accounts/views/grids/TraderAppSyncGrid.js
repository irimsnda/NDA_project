Ext.define('Admin.view.trader_accounts.views.panels.TraderAppSyncGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'traderappsyncgrid',
    autoScroll: true,
    width: '100%',
    height: 400,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    controller: 'traderaccountsvctr',
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
    selModel: {
        selType: 'checkboxmodel',
        //showHeaderCheckbox: false,
        mode: 'MULTI'
    },
    tbar: [{
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'traderappsyncFrm',
        winTitle: 'Traders Synchronized Applications',
        winWidth: '70%',
        handler: 'showAddTraderSyncAppWinFrm',
        stores: '[]'
    },{
        xtype: 'button',
        text: 'Merge All',
        name: 'merge_selected',
        disabled: true,
        handler: 'submitSelectedSyncRequest'
    },{
        xtype: 'hiddenfield',
        name: 'trader_id',
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'traderappsyncStr',
                groupField: 'status_name',
                proxy: {
                    url: 'tradermanagement/gettraderSyncApplicationsDetails'
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=merge_selected]').setDisabled(false);
            }
            if(record.get('status_id') != 1){
              //  toastr.warning('Only Applications pending merge are selectable!!', 'Notice');
                grid.getSelectionModel().deselect(record, true);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=merge_selected]').setDisabled(true);
            }
        }
    },
    columns: [
    {
        header: 'id',
        dataIndex: 'main_id',
        hidden: true
    },
    {
        header: 'Module',
        dataIndex: 'module_name',
        flex: 1
    }, {
        header: 'Registration No',
        dataIndex: 'registration_no',
        flex: 1
    }, {
        header: 'Reference No',
        dataIndex: 'reference_no',
        flex: 1
    }, {
        header: 'Status',
        dataIndex: 'status_name',
        flex: 1
    },{
        header: 'Year of Registration',
        dataIndex: 'year_of_registration',
        flex: 1
    },
    {
        header: 'Remarks',
        dataIndex: 'remarks',
        flex: 1
    },{
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
                    text: 'Merge',
                    iconCls: 'x-fa fa-merge',
                    tooltip: 'Merge Record',
                    action: 'merge',
                    winWidth: '40%',
                    handler: 'mergeTraderApplication',
                    stores: '[]'
                },
                {
                    text: 'Reject',
                    iconCls: 'x-fa fa-merge',
                    tooltip: 'Reject Record',
                    action: 'reject',
                    winWidth: '40%',
                    handler: 'mergeTraderApplication',
                    stores: '[]'
                },
                 {
                    text: 'Reinitiate merge process',
                    iconCls: 'x-fa fa-merge',
                    tooltip: 'Reject Record',
                    hidden: true,
                    name: 'Reinitiate',
                    action: 'merge',
                    winWidth: '40%',
                    handler: 'mergeTraderApplication',
                    stores: '[]'
                },
                {
                    text: 'contact Applicant',
                    iconCls: 'x-fa fa-mail',
                    tooltip: 'contact Applicant',
                    childXtype: 'contactApplicantforSyncRequestForm',
                    winTitle: 'Send Email to Applicant On the Application',
                    winWidth: '40%',
                    action: 'contact',
                    handler: 'func_loadSyncContactForm',
                    stores: '[]'
                }
                ]
            }
        },onWidgetAttach: function (col, widget, rec) {
            var status_id = rec.get('status_id');
            if (status_id == 1 || status_id === 1 ) {
                widget.down('menu menuitem[action=merge]').setDisabled(false);
                widget.down('menu menuitem[action=reject]').setDisabled(false);
                widget.down('menu menuitem[action=contact]').setDisabled(false);
            } else if(status_id == 3) {
                widget.down('menu menuitem[action=merge]').setVisible(false);
                widget.down('menu menuitem[action=reject]').setVisible(false);
                widget.down('menu menuitem[action=contact]').setDisabled(false);
                widget.down('menu menuitem[name=Reinitiate]').setVisible(true);
            }else{
                widget.down('menu menuitem[action=merge]').setDisabled(true);
                widget.down('menu menuitem[action=reject]').setDisabled(true);
                widget.down('menu menuitem[action=contact]').setDisabled(false);
            }
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Traders Synchronized Applications',
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype:'grouping',
        startCollapsed: true,
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        store: '',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {
            var grid=this.up('grid'),
                trader_id=grid.down('hiddenfield[name=trader_id]').getValue(),
                store=grid.getStore();

                store.getProxy().extraParams = {
                        trader_id:trader_id
                }
        }
    }]
});