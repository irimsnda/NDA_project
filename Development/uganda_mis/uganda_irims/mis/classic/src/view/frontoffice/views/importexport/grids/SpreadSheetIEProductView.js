 Ext.define('Admin.view.frontoffice.importexport.grids.SpreadSheetIEProductView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   titleCollapse: true,
   width: '100%',
   collapsible: true,
    xtype: 'spreadsheetieproductView',
    layout:'fit',
    store: 'spreadsheetieproductstr',
    title: 'Permit Product Details',
     viewConfig: {
            emptyText: 'No information found for the product under creteria'
        },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        name: 'brand_name',
        text: 'Brand Name'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'quantity',
        name: 'quantity',
        text: 'Quantity'
    
    },{
        xtype: 'gridcolumn',
        dataIndex: 'total_weight',
        name: 'total_weight',
        text: 'Total Weight'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'weightunit',
        name: 'weightunit',
        text: 'Weight unit'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'packageunit',
        name: 'packageunit',
        text: 'packaging unit'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'unit_price',
        name: 'unit_price',
        text: 'unit Price'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'currency',
        name: 'currency',
        text: 'Currency'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'total',
        name: 'total',
        text: 'Total Value'
    }]


  });