
Ext.define('Admin.view.onlineservices_configuration.views.grids.OnlinePortalProcessesGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'onlineportalprocessesGrid',
    controller: 'onlineservicesconfVctr',
    height: Ext.Element.getViewportHeight() - 118,
    width: '100%',
	 tbar: [{
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'onlineportalprocessesFrm',
        winTitle: 'Online Portal Process',
        winWidth: '40%',
        handler: 'showAddConfigParamWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
     features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'onlineportalprocessesStr',
                proxy: {
                    url: 'onlineservices/getOnlineProcesdetails',
                    extraParams:{
                        table_name: 'wb_tfdaprocesses'
                    }
                }
            },
            isLoad: true
        }
    },
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'module_name',
            text: 'Module Name',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'sub_module_name',
            text: 'Sub Module',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'section_name',
            text: 'Section',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'status_name',
            text: 'Status',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'prodclass_category',
            text: 'ProdClass Category',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'permit_type',
            text: 'Import/Export Permit Type',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'name',
            text: 'Name',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'router_link',
            text: 'Router Link',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            text: 'Is Enabled',
            flex: 1,
            sortable: true,
            dataIndex: 'is_enabled',
            renderer: function (value, metaData) {
                if (value) {
                    metaData.tdStyle = 'color:white;background-color:green';
                    return "True";
                }

                metaData.tdStyle = 'color:white;background-color:red';
                return "False";
            }
        },{
            text: 'Options',
            xtype: 'widgetcolumn',
            width: 90,
            widget: {
                textAlign: 'left',
                xtype: 'splitbutton',
                ui: 'gray',
                width: 75,
                iconCls: 'x-fa fa-th-list',
                menu: {
                    xtype: 'menu',
                    items: [{
						text: 'Edit',
						iconCls: 'x-fa fa-edit',
						tooltip: 'Edit Record',
						action: 'edit',
						childXtype: 'onlineportalprocessesFrm', 
						winTitle: 'Online Portal Process',
						winWidth: '40%',
						handler: 'showEditConfigParamWinFrm',
						stores: '[]'
					},{
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Delete Record',
                        table_name: 'wb_tfdaprocesses',
                        storeID: 'onlineportalprocessesStr',
                        action_url: 'onlineservices/deleteSystemProcess',  
                        action: 'actual_delete',
                        handler: 'doDeleteConfigWidgetParam',
                        hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                    }]
                }
            }
        }]
});
