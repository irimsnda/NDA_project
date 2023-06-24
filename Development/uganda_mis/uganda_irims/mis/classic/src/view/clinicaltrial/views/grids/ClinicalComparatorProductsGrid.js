/**
 * Created by Kip on 1/17/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ClinicalComparatorProductsGrid', {
    extend: 'Admin.view.clinicaltrial.views.grids.ImpProductsAbstractGrid',
    controller: 'clinicaltrialvctr',
    xtype: 'clinicalcomparatorproductsgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    table_name: 'clinical_comparatorproducts',
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
            name: 'add_impproduct',
            table_name: 'clinical_comparatorproducts',
            winTitle: 'IMP Product',
            winWidth: '90%',
            childXtype: 'clinicalcomparatorproductsfrm'
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
                storeId: 'comparatorproductsstr',
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
                    winTitle: 'Comparator Product',
                    winWidth: '90%',
                    table_name: 'clinical_comparatorproducts',
                    childXtype: 'clinicalcomparatorproductsfrm'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'clinical_comparatorproducts',
                    storeID: 'comparatorproductsstr',
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
