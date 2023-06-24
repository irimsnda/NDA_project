/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.grids.OnlineApplicationStatusGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'onlineservicesconfVctr',
    xtype: 'onlineapplicationstatusgrid',
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
        childXtype: 'onlineapplicationstatusfrm',
        winTitle: 'Application Statuses',
        winWidth: '40%',
        handler: 'showAddConfigParamWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Application Statuses',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: 'Status: {[values.rows[0].data.status_name]} [{rows.length}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
	}],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'onlineapplicationstatusstr',
                grouper: {
                    groupFn: function (item) {
                        return item.get('status_name');
                    }
                },
                proxy: {
                   url: 'onlineservices/getapplicationstatus'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Status ',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'status_type',
        text: 'Status type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
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
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
                    childXtype: 'onlineapplicationstatusfrm', 
					winTitle: 'Application Statuses',
                    winWidth: '40%',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                },  {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'wb_statuses',
                    storeID: 'onlineapplicationstatusstr',
                    action_url: 'onlineservices/deleteConfigRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteConfigWidgetParam'
				}]
            }
        }
    }]
});
