/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.disposalpermits.views.grids.DisposalPermitsProductsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'disposalpermitsvctr',
    xtype: 'disposalpermitsproductsgrid',
    itemId: 'disposalpermitsproductsgrid',
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
                 return 'invalid-row';
            }
            
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add Disposal Products Details',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'disposalpermitsproductsfrm',
        winTitle: 'Disposal Products Details',
        winWidth: '75%',
        handler: 'showAddPermitsOtherdetailsWinFrm',
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
    export_title: 'Disposal Products',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('disposalpermitsproductsgrid').fireEvent('refresh', this);//
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Brand Name/Item Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        text: 'Common Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_strength',
        text: 'Product Strength',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'dosage_form',
        text: 'Product/Dosage Form',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'pack_size',
        text: 'Pack Sizes',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'batch_no',
        text: 'Batch Nos',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reason_for_disposal',
        text: 'Reason for Disposal',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_description',
        text: 'Product Description',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'quantity',
        text: 'Quantity',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'estimated_value',
        text: 'Estimated Value',
        flex: 1,
    }]
});
