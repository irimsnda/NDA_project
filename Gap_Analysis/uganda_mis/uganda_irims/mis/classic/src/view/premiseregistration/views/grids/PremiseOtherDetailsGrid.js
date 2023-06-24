/**
 * Created by Kip on 9/25/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremiseOtherDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'premiseotherdetailsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    config: {
        isWin: 0,
        isOnline: 0,
        isCompare: 0
    },
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
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, {
        xtype: 'hiddenfield',
        name: 'is_temporal',
        value: 0
    }, {
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_details',
        //handler: 'showAddPremiseOtherDetails',
        winTitle: 'Premise Other Details',
        childXtype: 'premiseotherdetailsfrm',
        winWidth: '35%',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Premise Other Details',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'premiseotherdetailsstr',
                proxy: {
                    url: 'premiseregistration/getPremiseOtherDetails'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=add_details]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
            } else {
                add_btn.setVisible(true);
                widgetCol.setHidden(false);
                widgetCol.widget.menu.items = [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
                    childXtype: 'premiseotherdetailsfrm',
                    winTitle: 'Premise Other Details',
                    winWidth: '35%',
                    handler: 'showEditPremiseOtherDetails',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_premises_otherdetails',
                    storeID: 'premiseotherdetailsstr',
                    action_url: 'premiseregistration/deletePremiseRegRecord',
                    action: 'actual_delete',
                    handler: 'doDeletePremiseOtherDetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ];
            }
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'business_type_detail',
        text: 'Premise Type Details',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'business_type',
        text: 'Business Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'product_category',
        text: 'Product Category',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'product_category',
        text: 'Product Sub Category',
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
                    childXtype: 'premiseotherdetailsfrm',
                    winTitle: 'Premise Other Details',
                    winWidth: '35%',
                    handler: 'showEditPremiseOtherDetails',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_premises_otherdetails',
                    storeID: 'premiseotherdetailsstr',
                    action_url: 'premiseregistration/deletePremiseRegRecord',
                    action: 'actual_delete',
                    handler: 'doDeletePremiseOtherDetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }, onWidgetAttach: function (col, widget, rec) {
            var temporal = rec.get('is_temporal'),
                grid = widget.up('grid'),
                is_temporal = grid.down('hiddenfield[name=is_temporal]').getValue();
            if ((temporal === 0 || temporal == 0) && (is_temporal == 1 || is_temporal === 1)) {
                widget.down('menu menuitem[action=actual_delete]').setDisabled(true);
                widget.down('menu menuitem[action=edit]').setDisabled(true);
            } else {
                widget.down('menu menuitem[action=actual_delete]').setDisabled(false);
                widget.down('menu menuitem[action=edit]').setDisabled(false);
            }
        }
    }]
});
