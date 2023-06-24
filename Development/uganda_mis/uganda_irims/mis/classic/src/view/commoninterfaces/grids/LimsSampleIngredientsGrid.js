/**
 * Created by Kip on 3/27/2019.
 */
Ext.define('Admin.view.commoninterfaces.grids.LimsSampleIngredientsGrid', {
    extend: 'Admin.view.clinicaltrial.views.grids.ImpProductIngredientsAbstractGrid',
    controller: 'commoninterfacesVctr',
    xtype: 'limssampleingredientsgrid',
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
            disabled: true,
            ui: 'soft-green',
            winTitle: 'Sample Ingredient',
            winWidth: '35%',
            childXtype: 'sampleingredientsfrm',
            stores: '[]'
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
                tabPnl = grid.up('tabpanel'),
                sample_id = tabPnl.down('form').down('hiddenfield[name=limssample_id]').getValue(),
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
            fn: 'setCommonGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'limssampleingredientsstr',
                proxy: {
                    url: 'sampleanalysis/getLimsSampleIngredients'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        text: 'Options',
        xtype: 'widgetcolumn',
        hidden: true,
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
                ]
            }
        }
    }]
});
