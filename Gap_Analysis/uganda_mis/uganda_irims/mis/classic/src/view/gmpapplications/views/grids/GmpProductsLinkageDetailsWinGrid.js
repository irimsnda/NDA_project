/**
 * Created by Kip on 4/2/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpProductsLinkageDetailsWinGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.GmpProductsLinkageDetailsAbstractGrid',
    controller: 'gmpapplicationsvctr',
    xtype: 'gmpproductslinkagedetailswingrid',
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
    plugins: [{
        ptype: 'gridexporter'
    }, {
        ptype: 'rowexpander',
        rowBodyTpl: new Ext.XTemplate(
            '<p>' +
            '<b>Product Line:</b> {product_line_name} <br>' +
            '<b>Product Line Category:</b> {product_line_category}<br> ' +
            '<b>Product Line Description:</b> {product_line_description}<br> ' +
            '<b>Block:</b> {block} ' +
            '</p>'
        )
    }],
    tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, {
        xtype: 'button',
        text: 'Add Product',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        action: 'search_product',
        winTitle: 'Product Selection',
        childXtype: 'gmpproductsselectiongrid',
        storeID: 'gmpproductslinkagedetailsstr',
        winWidth: '80%',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    },{
        xtype: 'tbspacer',
        width: 20
    },{
        xtype: 'displayfield',
        value: 'Expand to view product line details',
        fieldStyle: {
            'color':'green'
        }
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid');
               
                if(grid.up('window')){
                    win = grid.up('window');
                    site_id = win.down('hiddenfield[name=manufacturing_site_id]').getValue();
                    store.getProxy().extraParams = {
                        site_id: site_id
                    };

                }else{
                   
                    var mainTabPanel = grid.up('#contentPanel'),
                    activeTab = mainTabPanel.getActiveTab(),
                    site_id = activeTab.down('mansitedetailstabpnl').down('hiddenfield[name=manufacturing_site_id]').getValue();
                    store.getProxy().extraParams = {
                        site_id: site_id
                    };

                }
                            

               
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setGmpApplicationGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'gmpproductslinkagedetailsstr',
                proxy: {
                    url: 'gmpapplications/getGmpProductInfoLinkage'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[action=search_product]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
            } else {
                add_btn.setVisible(true);
                widgetCol.setHidden(false);
                widgetCol.widget.menu.items = [
                    {
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash',
                        table_name: 'tra_product_gmpinspectiondetails',
                        storeID: 'gmpproductslinkagedetailsstr',
                        action_url: 'gmpapplications/deleteGmpApplicationRecord',
                        action: 'actual_delete',
                        handler: 'doDeleteGmpApplicationWidgetParam',
                        hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                    }
                ];
            }
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
                items: []
            }
        }
    }
    ]
});
