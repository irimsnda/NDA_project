/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.grids.ApplicationProcessGuidelinesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'onlineservicesconfVctr',
    xtype: 'applicationprocessguidelinesgrid',
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
        childXtype: 'applicationprocessguidelinesfrm',
        winTitle: 'Application Process Guidelines',
        winWidth: '60%',
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
    export_title: 'Online Portal Services',
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

        ftype:'grouping'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'onlineportalservicesstr',
                grouper: {
                    groupFn: function (item) {
                        return item.get('module_name');
                    }
                },
                proxy: {
                   url: 'onlineservices/getApplicationprocessguidelines'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'module_name',
        text: 'Module Name ',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sub_module_name',
        text: 'Sub Module Name ',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'step',
        text: 'Step Defination',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'guideline',
        text: 'Guideline Application Process',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'other_details',
        text: 'Other Details',
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
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
					childXtype: 'applicationprocessguidelinesfrm',
					winTitle: 'Application Process Guidelines',
                    winWidth: '60%',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                }]
            }
        }
    }]
});
