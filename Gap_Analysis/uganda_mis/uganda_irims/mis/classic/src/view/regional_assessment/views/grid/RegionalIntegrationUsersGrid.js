Ext.define('Admin.view.regional_assessment.views.grids.RegionalIntegrationUsersGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'regionalintegrationusersGrid',
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
        childXtype: 'regionalintegrationusersFrm',
        winTitle: 'Regional Integration Users',
        winWidth: '70%',
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
    export_title: 'Regional integration Users',
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
    }],
    
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'regionalintegrationusersStr',
                proxy: {
                    url: 'usermanagement/getRegionalIntegrationUsers',
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'Ref ID',
        width: 100
    },{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'country_name',
        text: 'Country',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'gmpassessment_procedure',
        text: 'GMP Assessment Procedure',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'assessment_procedure',
        text: 'Assessment Procedure',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'regional_authority',
        text: 'Regional Authority',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'postal_address',
        text: 'Postal Address',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'telephone_no',
        text: 'Telephone',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'email',
        text: 'Email',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'status_id',
        text: 'status',
        flex: 1,
        tdCls: 'wrap-text',
        renderer: function (value, metaData) {
            if (value) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "Active";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "Disabled";
        }
    },
	{
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
                    childXtype: 'regionalintegrationusersFrm',
                    winTitle: 'Edit Advertisement Type',
                    winWidth: '40%',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'par_advertisement_types',
                    storeID: 'advertisementgridStr',
                    action_url: 'usermanagement/deleteRegionalIntegratedUsers',
                    action: 'actual_delete',
                    handler: 'doDeleteConfigWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }]
});
