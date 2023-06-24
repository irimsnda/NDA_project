/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.cosmetics.CosmeticsIngredientsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'cosmeticsingredientsgrid',
    itemId: 'cosmeticsingredientsgrid',
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
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'cosmeticsingredientsfrm',
        winTitle: 'Product Ingredients Details',
        winWidth: '40%',
        handler: 'showAddProductOtherdetailsWinFrm',
        stores: '[]',
        bind: {
            hidden: '{isReadOnly}'  // negated
        }
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'hiddenfield',
        name: 'isReadOnly',
        bind: {
            value: '{isReadOnly}'  // negated
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],

    export_title: 'Cosmetics Ingredients',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('cosmeticsingredientsgrid').fireEvent('refresh', this);
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
  
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'ingredient_name',
        text: 'Ingredient',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'cas_number',
        text: 'CAS Number',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'inci_name',
        text: 'INCI NAME',
        flex: 1,
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'proportion',
        text: 'Proportion',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'si_units',
        text: 'Si-Units',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'ingredient_function',
        text: 'Ingredient Function',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'reason_for_inclusion',
        text: 'Reason for Inclusion',
        flex: 1,
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
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    childXtype: 'cosmeticsingredientsfrm',
                    winTitle: 'Product Ingredients',
                    winWidth: '40%',
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_product_ingredients',
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    storeID: 'cosmeticsproductingredientsstr', disabled: '{disableNameField}',
                    action_url: 'productregistration/onDeleteProductOtherDetails',
                    action: 'actual_delete',
                    handler: 'doDeleteProductOtherdetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }]
            }
        }
    }]
});
