/**
 * Created by Kip on 1/17/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ImpProductsGrid', {
    extend: 'Admin.view.clinicaltrial.views.grids.ImpProductsAbstractGrid',
    controller: 'clinicaltrialvctr',
    xtype: 'impproductsgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    table_name: 'clinical_trial_products',
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
            text: 'Add Product',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-green',
            table_name: 'clinical_trial_products',
            name: 'add_impproduct',
            winTitle: 'IMP Product',
            winWidth: '90%',
            childXtype: 'impproductspnl'
        },
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },{
            xtype: 'hiddenfield',
            name: 'application_id'
        }
    ],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Clinical trial applications',
     bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                wizzard=grid.up('panel'),
                mainPnl=wizzard.up('panel'),
                application_id = mainPnl.down('hiddenfield[name=active_application_id]').getValue();
            store.getProxy().extraParams = {
                application_id: application_id
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
            fn: 'setClinicalTrialGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'impproductsstr',
                proxy: {
                    url: 'clinicaltrial/getImpProducts'
                }
            },
            isLoad: true
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
                items: [{
                    text: 'Edit/Details',
                    iconCls: 'x-fa fa-edit',
                    handler: 'showImpProductDetails',
                    winTitle: 'IP Product',
                    table_name: 'clinical_trial_products',
                    winWidth: '90%',
                    childXtype: 'impproductspnl'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'clinical_trial_products',
                    storeID: 'impproductsstr',
                    action_url: 'clinicaltrial/deleteClinicalTrialRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteClinicalTrialWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }]
});
