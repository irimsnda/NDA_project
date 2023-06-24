/**
 * Created by Softclans on 11/27/2018.
 */
Ext.define('Admin.view.commoninterfaces.grids.OnlineQueriesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'onlinequeriesgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    frame: true,
    height: 500,
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
        text: 'Add Query',
        ui: 'soft-green',
        handler: 'onAddOnlineQuery',
        iconCls: 'x-fa fa-plus',
        action: 'add_query'
    }, {
        xtype: 'button',
        text: 'Submit Application',
        ui: 'soft-green',
        iconCls: 'x-fa fa-check',
        action: 'submit_app'
    }, {
        xtype: 'hiddenfield',
        name: 'application_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_code'
    }, {
        xtype: 'hiddenfield',
        name: 'module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'sub_module_id'
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
            var store = this.getStore(),
                grid = this.up('grid'),
                application_id = grid.down('hiddenfield[name=application_id]').getValue(),
                application_code = grid.down('hiddenfield[name=application_code]').getValue();
            store.getProxy().extraParams = {
                application_id: application_id,
                application_code: application_code
            };
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 100000,
                storeId: 'onlinequeriesstr',
                proxy: {
                    url: 'premiseregistration/getOnlineApplicationQueries'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && isReadOnly > 0) {
                grid.columns[grid.columns.length - 1].setHidden(true);
                grid.columns[grid.columns.length - 1].widget.menu.items = [];
            } else {
                grid.columns[grid.columns.length - 1].setHidden(false);
                grid.columns[grid.columns.length - 1].widget.menu.items = [
                    {
                        text: 'Edit',
                        iconCls: 'x-fa fa-edit',
                        handler: 'onEditOnlineQuery',
                        stores: '[]'
                    }, {
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash',
                        //disabled: true,
                        handler: 'onDeleteOnlineQuery',
                        stores: '[]'
                    }];
            }
        }
    },
    columns: [{
        xtype: 'rownumberer',
        text: 'SN'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'query_txt',
        text: 'Query',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'mis_created_on',
        text: 'Query Date',
        tdCls: 'wrap',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'query_status',
        text: 'Status',
        tdCls: 'wrap',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'response_txt',
        text: 'Query Response',
        tdCls: 'wrap',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'responded_on',
        text: ' Response Date',
        tdCls: 'wrap',
        flex: 1
    },{
        xtype:'actioncolumn',
        width:50,
        items: [{
            iconCls: 'x-fa fa-check',
            tooltip: 'Close Query',
            text: 'Accept and Close Query',
            handler: 'onActionCloseInitialQuery'
        },{
            iconCls: 'x-fa fa-folder-open',
            tooltip: 'Open Query',
            text: 'Open Query',
            handler: 'onActionOpenInitialQuery'

        }]
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
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    handler: 'onEditOnlineQuery',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    //disabled: true,
                    handler: 'onDeleteOnlineQuery',
                    stores: '[]'
                }
                ]
            }
        }
    }]
});
