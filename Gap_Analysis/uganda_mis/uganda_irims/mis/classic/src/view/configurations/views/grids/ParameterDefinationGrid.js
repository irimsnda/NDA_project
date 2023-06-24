
Ext.define('Admin.view.configurations.views.grids.ParameterDefinationGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'parameterdefinationGrid',
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
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add',
        ui: 'soft-green',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        name: 'config_btn',
        handler: 'setConfigForm'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'parameterDefination',
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
                storeId: 'parameterDefinationStr',
                proxy: {
                    url: 'commonparam/getCommonParamFromTable',
                    extraParams:{
                    	is_config: 1,
                        table_name: 'par_parameter_definations'
                    }
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
        dataIndex: 'param_name',
        text: 'Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'param_title',
        text: 'Title',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'table_name',
        text: 'Table',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'no_joins',
        text: 'Joins',
        flex: 1
    },{
        xtype: 'widgetcolumn',
        width: 120,
        widget:{
            xtype: 'button',
            text: 'Config',
            name: 'config_btn',
            action: 'view',
            ui: 'soft-green',
            iconCls: 'fa fa-cog',
            handler: 'setConfigForm'
        }
    },{
        xtype: 'widgetcolumn',
        width: 120,
        widget:{
            xtype: 'button',
            text: 'Launch',
            iconCls: 'fa fa-desktop',
            handler: 'renderParameterGrid'
        }
    }]
});
