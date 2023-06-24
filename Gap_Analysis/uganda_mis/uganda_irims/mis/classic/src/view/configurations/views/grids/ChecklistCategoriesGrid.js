/**
 * Created by Kip on 9/28/2018.
 */
Ext.define('Admin.view.configurations.views.grids.ChecklistCategoriesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'checklistcategoriesgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    title: 'Checklist Categories',
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
        text: 'Add Category',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'checklistcategoriesfrm',
        winTitle: 'Checklist Category',
        winWidth: '30%',
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
    export_title: 'TFDA Processes',
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
                storeId: 'checklistcategoriesstr',
                proxy: {
                    extraParams: {
                        model_name: 'ChecklistCategory'
                    }
                }
            },
            isLoad: true
        },
        itemdblclick: function (view, record) {
            var dash = this.up('checklists'),
                types_grid = dash.down('checklisttypesgrid'),
                types_store = types_grid.getStore();
            types_store.load({params: {checklist_category: record.get('id')}});
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'is_query',
        text: 'Is Query Checklist',
        flex: 0.3,
		renderer: function (value, metaData) {
                if(value === 1) {
                    metaData.tdStyle = 'color:white;background-color:green';
                    return "True";
                }
                metaData.tdStyle = 'color:white;background-color:red';
                return "False";
            }
		
    },  {
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
                    childXtype: 'checklistcategoriesfrm',
                    winTitle: 'Checklist Category',
                    winWidth: '30%',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                }, {
                    text: 'Disable',
                    iconCls: 'x-fa fa-repeat',
                    table_name: 'par_checklist_categories',
                    storeID: 'checklistcategoriesstr',
                    action_url: 'workflow/softDeleteWorkflowRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteConfigWidgetParam'
                }, {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'par_checklist_categories',
                    storeID: 'checklistcategoriesstr',
                    action_url: 'workflow/undoWorkflowSoftDeletes',
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
