 Ext.define('Admin.view.frontoffice.gmp.grids.DisposalProductView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   width: '100%',
   collapsible: true,
   titleCollapse: true,
   xtype: 'disposalproductview', 
   layout: 'fit',
    //store: 'spreadsheetgmpmansitestr',
    //title: 'Disposal Product Details',
    listeners: {
        beforerender: {
            fn: 'setConfigCombosStore',
            config: {
                pageSize: 1000,
                storeId: 'disposalproductstr',
                proxy: {
                    url: 'openoffice/getdisposalproductdetails'
                }
            },
            isLoad: false
        }
    },
     viewConfig: {
            emptyText: 'No information found for the product under creteria'
        },
     columns: [
     {
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        name: 'brand_name',
        text: 'Brand Name',
        width: 150,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_description',
        name: 'product_description',
        text: 'Product Description',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'packaging_unit',
        name: 'packaging_unit',
        text: 'Packaging Unit',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'quantity',
        name: 'quantity',
        text: 'Quantity',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'estimated_value',
        name: 'estimated_value',
        text: 'Estimated Value',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'currency',
        name: 'currency',
        text: 'Currency',
        width: 150,
        tbCls: 'wrap'
    }
    ]


  });