/**
 * Created by Kip on 2/4/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.ProductLineDetailsWinGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.ProductLineAbstractGrid',
    controller: 'gmpapplicationsvctr',
    xtype: 'productlinedetailswingrid',
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
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, {
        xtype: 'button',
        text: 'Add Product Line',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_line',
        winTitle: 'GMP Product Line Details',
        childXtype: 'productlinedetailsfrm',
        winWidth: '35%',
        stores: '[]',
        handler: 'showAddGmpProductLineDetailsFromWin'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Product line Details',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                pnl = grid.up('panel'),
                site_id = pnl.down('mansitedetailsfrm').down('hiddenfield[name=manufacturing_site_id]').getValue();
            store.getProxy().extraParams = {
                site_id: site_id
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
            fn: 'setGmpApplicationGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'productlinedetailsstr',
                proxy: {
                    url: 'gmpapplications/getGmpInspectionLineDetails'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=add_line]'),
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
                    stores: '[]',
                    handler: 'showEditGmpInspectionLineDetailsFromWin',
                    winTitle: 'GMP Product Line Details',
                    childXtype: 'productlinedetailsfrm',
                    winWidth: '35%'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    table_name: 'gmp_productline_details',
                    storeID: 'productlinedetailsstr',
                    action_url: 'gmpapplications/deleteGmpApplicationRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteGmpApplicationWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ];
            }
        }
    },
    columns: [{
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
                items: []
            }
        }
    }]
});
