
Ext.define('Admin.view.onlineservices_configuration.views.grids.OnlineFormTypeFieldsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'onlineservicesconfVctr',
    xtype: 'onlineformTypeFieldsGrid',
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
        ui: 'soft-blue',
        childXtype: 'onlineformTypeFieldFrm',
        winTitle: 'Add Form Field',
        has_params: true,
        param_name: 'form_field_id',
        param_name: 'app_formsdefination_id',
        winWidth: '40%',
        handler: 'showAddConfigParamWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    },{
        xtype: 'hiddenfield',
        name: 'form_field_id'
    },{
        xtype: 'hiddenfield',
        name: 'app_formsdefination_id'
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
                //form_field_id = grid.down('hiddenfield[name=form_field_id]').getValue(),
                app_formsdefination_id = grid.down('hiddenfield[name=app_formsdefination_id]').getValue(),

                store = grid.getStore();
            
            store.getProxy().extraParams = {
                filters:JSON.stringify({
                'app_formsdefination_id': app_formsdefination_id}),
                table_name: 'wb_formfields_definations'
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
                    url: 'onlineservices/getOnlineFormsParams',
                    extraParams: {
                        table_name: 'wb_formfields_definations'
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
        dataIndex: 'form_field',
        text: 'Field',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'form_name',
        text: 'Name',
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
                    param_name: 'form_field_id',
                    childXtype: 'onlineformTypeFieldFrm',
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
                    table_name: 'wb_formfields_definations',
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
