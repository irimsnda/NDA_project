/**
 * Created by Kip on 5/7/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpProductLineSelectionGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.ProductLineAbstractGrid',
    controller: 'gmpapplicationsvctr',
    xtype: 'gmpproductlineselectiongrid',
    autoScroll: true,
    autoHeight: true,
    height: 500,
    frame: true,
    width: '100%',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
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
        name: 'manufacturing_site_id'
    }, {
        xtype: 'hiddenfield',
        name: 'reg_site_id'
    }, {
        xtype: 'hiddenfield',
        name: 'product_id'
    },{
        xtype: 'hiddenfield',
        name: 'reg_product_id'
    }, {
        xtype: 'tbspacer',
        width: 50
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Product line Details',
    bbar: [
        {
            xtype: 'pagingtoolbar',
            width: '60%',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            beforeLoad: function () {
                var store = this.getStore(),
                    grid = this.up('grid'),
                    site_id = grid.down('hiddenfield[name=manufacturing_site_id]').getValue();
                store.getProxy().extraParams = {
                    site_id: site_id
                };
            }
        },
        '->',
        {
            xtype: 'button',
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-green',
            name: 'save_details',
            disabled: true
        },
        {
            xtype: 'button',
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-green',
            name: 'save_details_one',
            disabled: true,
            hidden: true,
            handler: 'saveEditGmpProductLinkageDetails'
        }
    ],
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
                storeId: 'gmpproductlineselectionstr',
                proxy: {
                    url: 'gmpapplications/getGmpInspectionLineDetails'
                }
            },
            isLoad: false
        },
        select: function (sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=save_details]').setDisabled(false);
                grid.down('button[name=save_details_one]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=save_details]').setDisabled(true);
                grid.down('button[name=save_details_one]').setDisabled(true);
            }
        }
    },
    columns: []
});
