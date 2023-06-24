/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.NarcoticsDrugsPermitsProductsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'narcoticsdrugspermitsproductsgrid',
    itemId: 'narcoticsdrugspermitsproductsgrid',
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
        text: 'Add Permit Products Details',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'narcoticsdrugspermitsproductsfrm',
        winTitle: 'Add Permit Products Details',
        winWidth: '40%',
        handler: 'showAddImpPermitProductsWinFrm',
        stores: '[]',
       /* bind: {
            hidden: '{isReadOnly}'  // negated
        }*/
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
    export_title: 'Controlled Drugs Permits Products',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('narcoticsdrugspermitsproductsgrid').fireEvent('refresh', this);//
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
                storeId: 'narcoticspermitsproductsstr',
                    proxy: {
                        url: 'importexportpermits/getNarcoticspermitsproductsDetails'
                    }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype:'rownumberer'  
      },{
        xtype: 'gridcolumn',
        dataIndex: 'narcotic_product',
        text: 'Narcotic Products',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'specification_type',
        text: 'Specification Type',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'dosage_form',
        text: 'Dsage Form',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'strength',
        text: 'Strength',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'authority_yearlyquantity',
        text: 'Authorised Per Year',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'quantity',
        text: 'Quantity',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'packaging_units',
        text: 'Packaging Units',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'currency_name',
        text: 'Currency Name',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'total_value',
        text: 'Total Value',
        flex: 1,
        summaryType: 'sum',
        renderer: function (val, meta, record) {
            return Ext.util.Format.number(val, '0,000.00');
        },
        summaryRenderer: function (val) {
            val = Ext.util.Format.number(val, '0,000.00');
        }
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
                   /* bind: {
                        hidden: '{isReadOnly}'  // negated
                    },*/
                    childXtype: 'narcoticsdrugspermitsproductsfrm',
                    winTitle: 'Edit Permit Products Details',
                    winWidth: '60%',
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_narcoticimport_products',
                    /* bind: {
                        hidden: '{isReadOnly}'  // negated
                    },*/
                    storeID: 'narcoticspermitsproductsstr', 
                    action_url: 'productregistration/onDeleteProductOtherDetails',
                    action: 'actual_delete',
                    handler: 'doDeletePermitOtherdetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }]
            }
        }
    }]
});
