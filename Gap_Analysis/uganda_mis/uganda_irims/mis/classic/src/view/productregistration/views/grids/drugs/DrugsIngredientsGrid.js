/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.drugs.DrugsIngredientsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'drugsIngredientsGrid',
    itemId: 'productIngredientsGrid',
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
        childXtype: 'drugsIngredientsFrm',
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

    export_title: 'Drugs Ingredients',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('drugsIngredientsGrid').fireEvent('refresh', this);
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
        text: 'Name of Immunogen(s)',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'ingredient_specification',
        text: 'Reference/Monograph standard',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'quantity',
        text: 'Quantity /dosage unit',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'si_unit',
        text: 'SI Units',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'excipient_name',
        text: 'Name of Excipient(s)',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reason_for_inclusion',
        hidden:true,
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
                   /*  bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    */
                    childXtype: 'drugsIngredientsFrm',
                    winTitle: 'Product Ingredients',
                    winWidth: '40%',
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_product_ingredients',
                  /*  bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    */
                    storeID: 'drugproductIngredientsstr', 
                    action_url: 'productregistration/onDeleteProductOtherDetails',
                    action: 'actual_delete',
                    handler: 'doDeleteProductOtherdetails'
                }]
            }
        }
    }]
});
