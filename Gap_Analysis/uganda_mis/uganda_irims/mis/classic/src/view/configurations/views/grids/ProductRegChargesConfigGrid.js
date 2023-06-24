
Ext.define('Admin.view.configurations.views.grids.ProductRegChargesConfigGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'productregChargesConfigGrid',
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
        childXtype: 'productregChargesConfigFrm',
        winTitle: 'Product Registration Charges Config',
        winWidth: '75%',
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
    export_title: 'productregChargesConfig',
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
                storeId: 'productregChargesConfigStr',
                proxy: {
                    url: 'configurations/getProductInvoiceChargesConfig',
                    extraParams:{
                        table_name: 'tra_productregcharge_config'
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
        dataIndex: 'module_name',
        text: 'Module',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sub_module_name',
        text: 'Sub-Module',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'section_name',
        text: 'Section',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'prodclass_category_name',
        text: 'Product Class Category',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'classification_name',
        text: 'Classification',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_type_name',
        text: 'Product Type',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'fee_type_name',
        text: 'Fee Type',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'element_cost_name',
        text: 'Element Cost',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'cost_amount',
        text: 'Cost Amount',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        width: 200,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'is_enabled',
        text: 'Enable',
        width: 75,
        tbCls: 'wrap',
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
                    childXtype: 'productregChargesConfigFrm',
                    winTitle: 'Product Registration Charges Config',
                    winWidth: '75%',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                }, {
                    text: 'Disable',
                    iconCls: 'x-fa fa-repeat',
                    table_name: 'tra_productregcharge_config',
                    storeID: 'productregChargesConfigStr',
                    action_url: 'configurations/softDeleteConfigRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteConfigWidgetParam'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_productregcharge_config',
                    storeID: 'productregChargesConfigStr',
                    action_url: 'configurations/deleteConfigRecord',  
                    action: 'actual_delete',
                    handler: 'doDeleteConfigWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }, {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'tra_productregcharge_config',
                    storeID: 'productregChargesConfigStr',
                    action_url: 'configurations/undoConfigSoftDeletes',
                    action: 'enable',
                    disabled: true,
                    handler: 'doDeleteConfigWidgetParam'
                }
                ]
            }
        }, onWidgetAttach: function (col, widget, rec) {
            var is_enabled = rec.get('is_enabled');
            if (is_enabled === 0 || is_enabled == 0) {
                widget.down('menu menuitem[action=enable]').setDisabled(false);
                widget.down('menu menuitem[action=soft_delete]').setDisabled(true);
            } else {
                widget.down('menu menuitem[action=enable]').setDisabled(true);
                widget.down('menu menuitem[action=soft_delete]').setDisabled(false);
            }
        }
    }]
});
