/**
 * Created by Kip on 3/13/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.PmsSampleIngredientsGrid', {
    extend: 'Admin.view.clinicaltrial.views.grids.ImpProductIngredientsAbstractGrid',
    controller: 'surveillancevctr',
    xtype: 'pmssampleingredientsgrid',
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
    tbar: [
        {
            xtype: 'button',
            text: 'Add Ingredient',
            iconCls: 'x-fa fa-plus',
            action: 'add',
            ui: 'soft-green',
            winTitle: 'Sample Ingredient',
            winWidth: '35%',
            childXtype: 'sampleingredientsfrm',
            stores: '[]'
        },
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        }
    ],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'sample ingredients',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid'),
                pnl = grid.up('panel'),
                sample_id = pnl.down('form').down('hiddenfield[name=sample_id]').getValue(),
                store = this.getStore();
            store.getProxy().extraParams = {
                sample_id: sample_id
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
            fn: 'setSurveillanceGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'pmssampleingredientsstr',
                proxy: {
                    url: 'surveillance/getPmsSampleIngredients'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[action=add]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.widget.menu.items = [];
                widgetCol.setHidden(true);
            } else {
                add_btn.setVisible(true);
                widgetCol.widget.menu.items = [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    winTitle: 'Sample Ingredient',
                    winWidth: '35%',
                    childXtype: 'sampleingredientsfrm',
                    handler: function () {
                        var btn = this.up('button'),
                            record = btn.getWidgetRecord(),
                            grid = btn.up('grid');
                        grid.fireEvent('editRecord', this, record);
                    }
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_pmssample_ingredients',
                    storeID: 'pmssampleingredientsstr',
                    action_url: 'surveillance/deleteSurveillanceRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteSurveillanceWidgetParam',
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
