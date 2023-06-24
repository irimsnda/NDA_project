/**
 * Created by Kip on 11/20/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.LegalityOfStockPrdGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'legalityofstockprdgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    frame: true,
    width: '100%',
    childXtype: 'illegalitystockproductsfrm',
    winTitle: 'Illegal Products',
    winWidth: '55%',
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
            text: 'Add Ilegal Product Stocks',
            iconCls: 'x-fa fa-check',
            ui: 'soft-green',
            handler: 'addIllegalProductsSTocks',
            childXtype: 'illegalitystockproductsfrm',
            winTitle: 'Illegal Products',
            winWidth: '55%'
        },{text:'Double Click to edit Details'},{
            xtype:'hiddenfield',
            name:'application_id'
        }
    ],
    selModel: {
        selType: 'checkboxmodel',
    },
    export_title: 'Products',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid'),
                application_id = grid.down('hiddenfield[name=application_id]').getValue(),
                store = this.getStore();
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
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'legalityofstockprdgridstr',
                proxy: {
                    url: 'premiseregistration/getPremisesIllegalPrdStockDetails'
                }
            },
            isLoad: true
        },
        itemdblclick: 'onEditlegalityofstockprdDetails'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'type_of_illegality',
        text: 'Type of Illegality',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Product Name',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        text: 'Common Name',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        text: 'Common Name',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'manufacturer_name',
        text: 'Manufacturer Name',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'quantity',
        text: 'Quantity',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'packaging_units',
        text: 'Packaging',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'value',
        text: 'value',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'currency_name',
        text: 'Currency',
        flex: 1,
        tdCls: 'wrap'
    },{
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
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_premillegalstocked_products',
                    storeID: 'legalityofstockprdgridstr',
                    action_url: 'premiseregistration/deletePremiseRegRecord',
                    action: 'actual_delete',
                    handler: 'doDeletePremiseOtherDetailsWin'
                }
                ]
            }
        }
    }]
});
