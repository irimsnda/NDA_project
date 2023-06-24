/**
 * Created by Kip on 9/28/2018.
 */
Ext.define('Admin.view.configurations.views.grids.ChecklistItemsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'checklistitemsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    title: 'Checklist Items',
    width: '15%',
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
        text: 'Add Item',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'checklistitemsfrm',
        winTitle: 'Checklist Item',
        winWidth: '40%',
        handler: 'showAddChecklistItemConfigParamWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    },{
        xtype: 'hiddenfield',
        name: 'checklist_type_id'
    },{
        xtype: 'hiddenfield',
        name: 'checklist_category_id'
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
        emptyMsg: 'No Records',
        beforeLoad: function() {
                var grid=this.up('grid'),
                       checklist_type = grid.down('hiddenfield[name=checklist_type_id]').getValue();
                
                var store=this.getStore();
                 store.getProxy().extraParams = {
                        checklist_type:checklist_type
                }
            }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: 'Type: {[values.rows[0].data.type_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                groupField: 'checklist_type_id',
                storeId: 'checklistitemsstr',
                proxy: {
                    url: 'configurations/getChecklistItems',
                    extraParams:{
                        model_name: 'ChecklistItem'
                    }
                }
            },
            isLoad: false
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        tdCls:'wrap-text',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'order_no',
        text: 'Order No',
        flex: 0.2
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
                    childXtype: 'checklistitemsfrm',
                    winTitle: 'Checklist Item',
                    winWidth: '40%',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                }, {
                    text: 'Disable',
                    iconCls: 'x-fa fa-repeat',
                    table_name: 'par_checklist_items',
                    storeID: 'checklistitemsstr',
                    action_url: 'workflow/softDeleteWorkflowRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteConfigWidgetParam'
                },
                //  {
                //     text: 'Unlink',
                //     iconCls: 'fa fa-unlink',
                //     tooltip: 'Delete Record',
                //     table_name: 'par_checklist_items',
                //     storeID: 'checklistitemsstr',
                //     action_url: 'workflow/unlinkWorkflowRecord',
                //     action: 'Unlink',
                //     column_array: 'checklist_type_id',
                //     handler: 'doUnlinkConfigWidgetParam',
                //     hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                // },
                 {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'par_checklist_items',
                    storeID: 'checklistitemsstr',
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
