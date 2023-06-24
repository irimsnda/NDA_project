/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.PoeInspectionPermitsProductsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'poeinspectionpermitsproductsgrid',
    itemId: 'poeinspectionpermitsproductsgrid',
    
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
        text: 'Product(Consignment) Inspection Recommendation',
        iconCls: 'x-fa fa-plus',
        name: 'update_allproducts',
        ui: 'soft-purple',
        childXtype: 'importexportpermitsproductspnl',
        winTitle: 'Update Permit Products Details',
        winWidth: '40%',
    },{
        text: 'Product(Consignment) Inspection Recommendation',
       viewXtype: 'inspectionproductsrecommendationfrm',
       winTitle: 'Inspection Permits Recommendation',
       winWidth: '40%',
        handler: 'funcPermitsProductRecommendationWin',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-red',
    },'->',{
        xtype: 'button',
        text: 'Update Inspection Details',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-purple',
       // hidden: true,
        winWidth: '40%',
        name: 'update_products',
        stores: '[]',
      
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'hiddenfield',
        name: 'isReadOnly',
        bind: {
            value: '{isReadOnly}'  // negated
        }
    }],

    plugins: [{
        ptype: 'gridexporter'
    }, {
        ptype: 'cellediting',
        clicksToEdit: 1
    }],
    export_title: 'Import/Export Permits Products',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '70%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('poeinspectionpermitsproductsgrid').fireEvent('refresh', this);//
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        position:'bottom',
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
                remoteFilter: true,
                storeId: 'poeinspectionpermitsproductsstr',
                    proxy: {
                        url: 'importexportpermits/getPoeInspectionPermitsProducts',
                        
                    }
            },
            isLoad: true
        }
    },selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        allowDeselect: true
    },
    columns: [{
        xtype:'rownumberer'  
      },{
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Brand Name/Device Name',
        flex: 2,
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
		hidden: true,
        text: 'Common/Generic Name',
        flex: 1,
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_batch_no',
        text: 'Batch Number(Comma Seperator)',
        flex: 1.5,
        tdCls:'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_manufacturing_date',
        text: 'Manufacturing Date',
        flex: 1.5,
        tdCls:'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_expiry_date',
        text: 'Expiry Date',
        flex: 1.5,
        tdCls:'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'unit_price',
        text: 'Unit Value',
        flex: 0.5,
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'total_value',
        text: 'Total Value',
        flex: 1,hidden: true,
        summaryType: 'sum',
        renderer: function (val, meta, record) {
            return Ext.util.Format.number(val, '0,000.00');
        },
        summaryRenderer: function (val) {
            val = Ext.util.Format.number(val, '0,000.00');
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'consignment_quantity',
        text: 'Permit Quantity',
        flex: 0.5,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'poe_prod_quantity',
        text: 'Inspected Consignment',
        flex: 1,
        editor: {
            xtype: 'textfield'
        },renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
            var textVal = '';
                balance = record.get('balance');
                consignment_quantity = record.get('consignment_quantity');
                if(val > balance && val != consignment_quantity ){
                        val = 0;
                        toastr.error('The entered Qty exceeds the allowed permit quantity(Balance)', 'Failure Response');
                }
                return val;
        }

    },  {
        xtype: 'gridcolumn',
        dataIndex: 'balance',
        text: 'Balance',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'remarks',
        text: 'Remarks',
        flex: 1,
		editor: {
            xtype: 'textarea'
        }
    },{   
        xtype: 'gridcolumn',
        dataIndex: 'prodinspection_recommendation',
        tdCls:'wrap-text',
        text: 'Product Inspection Recommendation',
        flex: 1,
            renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                var textVal = '';
               
                if (val == 1) {
                    textVal = "Product released(Accepted)";
                    meta.tdStyle = 'color:white;background-color:green';
                    
                }else if(val == 2){
                    meta.tdStyle = 'color:white;background-color:red';
                    textVal = "Rejected (Recommended for Disposal)";
                }else if(val == 3){
                    meta.tdStyle = 'color:white;background-color:yellow';
                    textVal = "Released Under Seal";
                    
                   // meta.tdStyle = 'color:white;background-color:blue';
                }else{
                    meta.tdStyle = 'color:white;background-color:#ccc';
                    textVal = "No Recommendation";

                }
                return textVal;
            }
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
                    text: 'Remove the Inspected Quantities',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_poe_permitsdata',
                    storeID: 'poeinspectionpermitsproductsstr', 
                    action_url: 'productregistration/onDeleteProductOtherDetails',
                    action: 'actual_delete',
                    handler: 'doDeletePermitOtherdetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }]
            }
        }
    }]
});
