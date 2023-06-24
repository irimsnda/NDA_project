/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.DeclaredOnlineImportExportPermitsProductsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'declaredonlineimportexportpermitsproductsgrid',
    itemId: 'declaredonlineimportexportpermitsproductsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var isregulated_product = record.get('isregulated_product');
            if (isregulated_product == 0 || isregulated_product === 0) {
               //  return 'invalid-row';
            }
            
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add Permit Products Details',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        hidden: true,
        ui: 'soft-green',
        childXtype: 'importexportpermitsproductsfrm',
        winTitle: 'Add Permit Products Details',
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
    export_title: 'Impor/Export Permits Products',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('declaredonlineimportexportpermitsproductsgrid').fireEvent('refresh', this);//
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype: 'summary',
        dock: 'bottom'
    }],
    listeners: {
        afterrender: {
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 100000,
                storeId: 'onlineimportexportpermitsproductsstr',
               groupField:'sub_module',
                proxy: {
                    url: 'importexportpermits/getDeclaredOnlImportexportpermitsproductsDetails'
                }
            },
            isLoad: true
        }
    },
    columns: [{
      xtype:'rownumberer'  
    },{
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Brand Name/Device Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'producths_code',
        text: ' Hs Code',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        text: 'Hs Code Description',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'quantity',
        text: 'Quantity',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'packaging_units',
        text: 'Packaging Units',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'total_weight',
        text: 'Total Weight Units',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'currency_name',
        text: 'Currency Name',
        flex: 1,
    },{
        
        xtype: 'gridcolumn',
        dataIndex: 'unit_price',
        text: 'Unit Price',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'total_value',
        text: 'Total Value',
        width: 200,
        summaryType: 'sum',
        renderer: function (val, meta, record) {
            return Ext.util.Format.number(val, '0,000.00');
        },
        summaryRenderer: function (val) {
            val = Ext.util.Format.number(val, '0,000.00');
            return 'Fob '+val
        }
    },  {
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
                    disabled: true,
                    childXtype: 'importexportpermitsproductsfrm',
                    winTitle: 'Import/Export Permit Products details',
                    winWidth: '90%',
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]'
                }]
            }
        }
    }]
});
