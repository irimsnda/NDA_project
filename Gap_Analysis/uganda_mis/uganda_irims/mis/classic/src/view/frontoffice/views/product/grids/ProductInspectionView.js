 Ext.define('Admin.view.frontoffice.product.grids.ProductInspectionView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   width: '100%',
   collapsible: true,
   titleCollapse: true,
    xtype: 'productinspectionview',
   layout: 'fit',
    store: 'spreadsheetproductinspectionstr',
    title: 'GMP Inspection Details',
     viewConfig: {
            emptyText: 'No information found for the product under creteria'
        },
     columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'gmp_certificate_no',
        name: 'certificate_no',
        text: 'Certificate no',
        width: 150,
        tbCls: 'wrap'
     },
     {
        xtype: 'gridcolumn',
        dataIndex: 'manufacturer_name',
        name: 'Manufacturer',
        text: 'Manufacturer',
        width: 150,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        name: 'physical_address',
        text: 'physical address',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'postal_address',
        name: 'postal_address',
        text: 'postal address',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'email_address',
        name: 'email_address',
        text: 'email address',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'gmp_product_line',
        name: 'ProductLine',
        text: 'Product Line',
        width: 150,
        tbCls: 'wrap'
    }
    ]


  });