/**
 * Created by Kip on 1/28/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ImpProductsWinGrid', {
    extend: 'Admin.view.clinicaltrial.views.grids.ImpProductsGrid',
    xtype: 'impproductswingrid',
    config: {
        isCompare: 0
    },
    tbar: [
        {
            xtype: 'button',
            text: 'Add Product',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-green',
            name: 'add_impproduct_win',
            winTitle: 'IMP Product',
            winWidth: '90%',
            childXtype: 'impproductspnl',
            handler: 'showAddImpProductFromWin'
        },
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.store,
                grid = this.up('grid'),
                isCompare = grid.getIsCompare(),
                pnlXtype = 'clinicaltrialappmoredetailswizard';
            if (isCompare == 1 || isCompare === 1) {
                pnlXtype = 'clinicaltrialmiscomparepreviewpnl';
            }
            var pnl = grid.up(pnlXtype),
                application_id = pnl.down('hiddenfield[name=application_id]').getValue(),
                application_code = pnl.down('hiddenfield[name=application_code]').getValue();
            store.getProxy().extraParams = {
                application_id: application_id,
                application_code: application_code
            };
        }
    }],
    listeners: {
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=add_impproduct_win]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
            } else {
                add_btn.setVisible(true);
                widgetCol.widget.menu.items = [
                    {
                        text: 'Edit/Details',
                        iconCls: 'x-fa fa-edit',
                        handler: 'showImpProductDetailsFromWin',
                        winTitle: 'IMP Product',
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
                ];
            }
        }
    }
});