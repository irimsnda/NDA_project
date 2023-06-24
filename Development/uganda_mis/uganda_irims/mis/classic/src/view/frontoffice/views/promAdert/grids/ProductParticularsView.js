 Ext.define('Admin.view.frontoffice.promadvert.grids.ProductParticularsView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   width: '100%',
   collapsible: true,
   titleCollapse: true,
    xtype: 'productparticularsview',
   layout: 'fit',
    store: 'spreadsheetpromotionmaterialproductsstr',
    title: 'Product Particulars',
     viewConfig: {
            emptyText: 'No information found for the product under creteria'
        },
     columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        name: 'brand_name',
        text: 'Brand Name',
        width: 150,
        tbCls: 'wrap'
     },
     {
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        name: 'common_name',
        text: 'Common Name',
        width: 150,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'registration_no',
        name: 'registration_no',
        text: 'Registration No.',
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
        dataIndex: 'registrant_name',
        name: 'registrant_name',
        text: 'Registrant',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_category_name',
        name: 'product_category_name',
        text: 'Product Category',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_subcategory_name',
        name: 'product_subcategory_name',
        text: 'Product SubCategory',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'type_of_advertisement_name',
        name: 'type_of_advertisement_name',
        text: 'Type of advertisement',
        width: 150,
        tbCls: 'wrap'
    }
    ]


  });