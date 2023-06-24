/**
 * Created by Kip on 11/24/2018.
 */
Ext.define('Admin.view.administration.views.grids.FormFieldsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'formfieldsgrid',
    cls: 'dashboard-todo-list',
    header: false,
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
        text: 'Back',
        iconCls: 'x-fa fa-backward',
        action: 'back',
        containerType: 'grid',
        currentPnlXtype: 'formfieldsgrid',
        containerPnlXtype: 'keyformspnl',
        hiddenCompXtype: 'keyformsgrid',
        ui: 'soft-green',
        handler: 'backToFormsGrid'
    }, {
        xtype: 'button',
        text: 'Add Field',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'formfieldsfrm',
        winTitle: 'Add Form Field',
        winWidth: '35%',
        handler: 'showAddFormFieldWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'hiddenfield',
        name: 'form_id'
    }],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            width: '100%',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            beforeLoad: function () {
                var store = this.getStore(),
                    grid = this.up('grid'),
                    form_id = grid.down('hiddenfield[name=form_id]').getValue();
                store.getProxy().extraParams = {
                    form_id: form_id
                };
            }
        }
    ],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Form Fields',
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setAdminGridsStore',
            config: {
                pageSize: 100000,
                storeId: 'formfieldsstr',
                proxy: {
                    url: 'administration/getFormFields'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'rownumberer'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'field_name',
        text: 'Field Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'field_type',
        text: 'Field Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
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
                    childXtype: 'formfieldsfrm',
                    winTitle: 'Edit Form Field',
                    winWidth: '35%',
                    handler: 'showEditAdminParamWinFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'par_key_form_fields',
                    storeID: 'formfieldsstr',
                    action_url: 'administration/deleteAdminRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteAdminWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }]
});
