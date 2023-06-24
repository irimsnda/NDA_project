/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.PersonalUsePermitsProductsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'personalusepermitsproductsgrid',
    itemId: 'importexportpermitsproductsgrid',
    
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
               // return 'invalid-row';
            }
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add Permit Products Details',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'personalusepermitsproductsfrm',
        winTitle: 'Add Permit Products Details',
        winWidth: '40%',
        handler: 'showPersonalPermitProductsWinFrm',
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
    export_title: 'Permits Products',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('personalusepermitsproductsgrid').fireEvent('refresh', this);//
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
                storeId: 'personalusepermitsproductsgridstr',
                    proxy: {
                        url: 'importexportpermits/getPersonalUsepermitsproductsDetails',
                        
                    }
            },
            isLoad: true
        }
    },
    columns: [{
      xtype:'rownumberer'  
    },{
        xtype: 'gridcolumn',
        dataIndex: 'permitbrand_name', tdCls:'wrap-text',
        text: 'Brand Name/Device Name',
        flex: 1
    },{
        xtype: 'gridcolumn', tdCls:'wrap-text',
        dataIndex: 'permitcommon_name',
        text: 'Common Name',
        tdCls:'wrap-text',
        flex: 1,
    }, {
        
        xtype: 'gridcolumn',
        dataIndex: 'batch_numbers',
        text: 'Batch Numbers',
        flex: 1,
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
        dataIndex: 'currency_name',
        text: 'Currency Name',
        flex: 1,
    },{
        
        xtype: 'gridcolumn',
        dataIndex: 'unit_price',
        text: 'Unit Price',
        flex: 1,
    },   {
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
                    childXtype: 'personalusepermitsproductsfrm',
                    winTitle: 'Permit Products details',
                    winWidth: '40%',
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_personalusepermits_products',
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    storeID: 'personalusepermitsproductsgridstr', 
                    action_url: 'productregistration/onDeleteProductOtherDetails',
                    action: 'actual_delete',
                    handler: 'doDeletePermitOtherdetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }]
            }
        }
    }]
});
