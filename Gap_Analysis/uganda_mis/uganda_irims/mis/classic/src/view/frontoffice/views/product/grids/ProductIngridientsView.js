 Ext.define('Admin.view.frontoffice.product.grids.ProductIngridientsView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   titleCollapse: true,
   width: '100%',
   collapsible: true,
    xtype: 'productingridientsview',
    layout:'fit',
    store: 'spreadsheetproductingridientsstr',
    title: 'Product Ingredient Details',
     viewConfig: {
            emptyText: 'No information found for the product under creteria'
        },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'Ingredient',
        name: 'Ingredient',
        text: 'Ingredient',
        width: 150,
        tbCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'IngredientType',
        name: 'IngredientType',
        text: 'IngredientType',
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
        dataIndex: 'InclutionReason',
        name: 'InclutionReason',
        text: 'InclutionReason',
        width: 150,
        tbCls: 'wrap'
    }]


  });