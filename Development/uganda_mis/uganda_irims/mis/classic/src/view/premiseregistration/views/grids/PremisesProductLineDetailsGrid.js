/**
 * Created by Softclans on 12/18/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremisesProductLineDetailsGrid', {
    extend: 'Admin.view.premiseregistration.views.grids.PremisesProductLineAbstractGrid',
    controller: 'premiseregistrationvctr',
    xtype: 'premisesproductlinedetailsgrid',
    cls: 'dashboard-todo-list',
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
        winTitle: 'Manufacturing Site Product Line Details',
        childXtype: 'premisesproductlinedetailsfrm',
        winWidth: '35%',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
    }],
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
                mainTabPanel = grid.up('#contentPanel');
                if(grid.up('#contentPanel')){
                    activeTab = mainTabPanel.getActiveTab(),
                    premise_id = activeTab.down('premisedetailstabpnl').down('hiddenfield[name=premise_id]').getValue();

                }
                else{
                    var win = grid.up('window'),
                    premise_id = win.down('premisedetailstabpnl').down('hiddenfield[name=premise_id]').getValue();

                }
               
                store.getProxy().extraParams = {
                    premise_id: premise_id
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
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'productlinedetailsstr',
                proxy: {
                    url: 'premiseregistration/getPremisesInspectionLineDetails'
                }
            },
            isLoad: false
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=add_line]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [z];
            } else {
                add_btn.setVisible(true);
                widgetCol.setHidden(false);
                widgetCol.widget.menu.items = [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    stores: '[]',
                    handler: 'showEditGmpInspectionLineDetails',
                    winTitle: 'Product Line Details',
                    childXtype: 'premisesproductlinedetailsfrm',
                    winWidth: '35%'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    table_name: 'premises_productline_details',
                    storeID: 'productlinedetailsstr',
                    action_url: 'gmpapplications/deleteGmpApplicationRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteGmpApplicationWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }];
            }
        }
    },
    columns: [
        {
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
