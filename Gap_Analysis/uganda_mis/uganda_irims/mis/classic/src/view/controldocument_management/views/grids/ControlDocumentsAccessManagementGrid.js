
Ext.define('Admin.view.controldocument_management.views.grids.ControlDocumentsAccessManagementGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'controldocumentmanagementvctr',
    xtype: 'controldocumentsaccessmanagementgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
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
        childXtype: 'controldocumentsaccessmanagementfrm',
        winTitle: 'Control Document Access Management',
        winWidth: '40%',
        handler: 'showAddControlDocAccessManagement',//showAddConfigParamWinFrm
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'controldocumentmasterlist',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {

            this.up('controldocumentsaccessmanagementgrid').fireEvent('refresh', this);

        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: 'Directorate: {[values.rows[0].data.directorate]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'controldocumentsaccessmanagementstr',
                proxy: {
                    url: 'controldocumentsmng/getControlDocumentsAccessDetails',
                }
            },
            isLoad: true
        }
    },
    columns: [{
        header: 'Directorate',
        dataIndex:'directorate_name',
        flex:1
    },{
        header: 'Directorate Unit',
        dataIndex:'directorate_unitname',
        flex:1
    },{
        header: 'Remarks',
        dataIndex:'remarks',
        flex:1
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
                    tooltip: 'Edit Record',
                    action: 'edit',
                    childXtype: 'controldocumentsaccessmanagementfrm',
                    winTitle: 'Control Document Access Management',
                    winWidth: '40%',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                },{
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_doccontrolaccess_management',
                    storeID: 'controldocumentsaccessmanagementstr',
                    action_url: 'configurations/deleteConfigRecord',  
                    action: 'actual_delete',
                    handler: 'doDeleteConfigWidgetParam'
                }]
            }
        }
    }]
});
