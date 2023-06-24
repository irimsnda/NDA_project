
Ext.define('Admin.view.configurations.views.grids.FormTypeFieldsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'formTypeFieldsGrid',
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
        xtype: 'button',bind: {
            disabled: '{isReadOnly}'
        },
        text: 'Add Field',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'formTypeFieldMappingFrm',
        winTitle: 'Add Form Field',
        has_params: true,
        param_name: 'form_category_id',
        winWidth: '40%',
        handler: 'showAddConfigParamWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    },{
        xtype: 'hiddenfield',
        name: 'form_category_id'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'FormTypeFields',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid'),
                form_category_id = grid.down('hiddenfield[name=form_category_id]').getValue(),
                store = grid.getStore();
            
            store.getProxy().extraParams = {
                filters:JSON.stringify({'form_category_id': form_category_id}),
                table_name: 'par_formtype_fields'
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
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'FormTypeFieldsStr',
                proxy: {
                    url: 'commonparam/getCommonParamFromTable',
                    extraParams: {
                        table_name: 'par_formtype_fields'
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
        hidden: true,
        width: 100
    },{
        xtype: 'rownumberer'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'field_name',
        text: 'Field',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'is_mandatory',
        text: 'Mandatory',
        flex: 1,
        renderer: function (value, metaData) {
            if (value) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "True";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "False";
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'is_readOnly',
        text: 'Read Only',
        flex: 1,
        renderer: function (value, metaData) {
            if (value) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "True";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "False";
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'is_enabled',
        text: 'Enable',
        flex: 1,
        renderer: function (value, metaData) {
            if (value) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "True";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "False";
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'is_hidden',
        text: 'Is hidden',
        flex: 1,
        renderer: function (value, metaData) {
            if (value) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "True";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "False";
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'default_value',
        text: 'Default Value',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'order_no',
        text: 'Order',
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
                    has_params: true,
                    param_name: 'form_category_id',
                    childXtype: 'formTypeFieldMappingFrm',
                    winTitle: 'Add Field',
                    winWidth: '40%',
                    handler: 'showEditConfigParamWinFrm',
                    bind: {
                        disabled: '{isReadOnly}'
                    },
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'par_formtype_fields',
                    storeID: 'FormTypeFieldsStr',
                    action_url: 'configurations/deleteConfigRecord',  
                    action: 'actual_delete',
                    handler: 'doDeleteConfigWidgetParam',
                    // bind: {
                    //     disabled: '{hideDeleteButton}'
                    // }
                }
                ]
            }
        }
    }]
});
