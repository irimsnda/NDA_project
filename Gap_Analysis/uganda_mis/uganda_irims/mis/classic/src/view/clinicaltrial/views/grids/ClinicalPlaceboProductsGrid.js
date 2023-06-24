/**
 * Created by Kip on 1/17/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ClinicalPlaceboProductsGrid', {
    extend: 'Admin.view.clinicaltrial.views.grids.ImpProductsAbstractGrid',
    controller: 'clinicaltrialvctr',
    xtype: 'clinicalplaceboproductsgrid',
    autoScroll: true,
    autoHeight: true,
    table_name: 'clinical_placebaproducts',
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
            text: 'Add Product',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-green',
            table_name: 'clinical_placebaproducts',
            name: 'add_impproduct',
            winTitle: 'IMP Product',
            winWidth: '90%',
            childXtype: 'impproductspnl'
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
    export_title: 'Clinical trial applications',
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
            fn: 'setClinicalTrialGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'placeboproductsstr',
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
                    winTitle: 'Placebo Product',
                    winWidth: '90%',
                    table_name: 'clinical_placebaproducts',
                    childXtype: 'impproductspnl'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'clinical_placebaproducts',
                    storeID: 'placeboproductsstr',
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
