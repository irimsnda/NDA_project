 Ext.define('Admin.view.frontoffice.product.grids.ProductNutrientsView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   collapsible: true,
   titleCollapse: true,
   width: '100%',
    xtype: 'productnutrientsview',
   layout: 'fit',
    store: 'spreadsheetproductnutrientsstr',
    title: 'Product Nutrients Details',
      viewConfig: {
            emptyText: 'No information found for the product under creteria'
        },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'Nutrients',
        name: 'Nutrients',
        text: 'Nutrients',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Category',
        name: 'Category',
        text: 'Category',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'proportion',
        name: 'proportion',
        text: 'proportion',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'siUnit',
        name: 'siUnit',
        text: 'siUnit',
        width: 150,
        tbCls: 'wrap'
    }]


  });