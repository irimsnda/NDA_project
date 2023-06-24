 Ext.define('Admin.view.frontoffice.gmp.grids.GmpManufacturingLineView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   titleCollapse: true,
   width: '100%',
   collapsible: true,
    xtype: 'gmpmanufucturinglineview',
   layout: 'fit',
   store: 'spreadsheetgmpmanlinestr',
    title: 'Manufacturing Product Line Details',
     viewConfig: {
            emptyText: 'No information found for the product Line under creteria'
        },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'productline',
        name: 'productline',
        text: 'Product Line',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'category',
        name: 'category',
        text: 'Category',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'productlinedescription',
        name: 'productlinedescription',
        text: 'Product Line Description',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'mansiteblock',
        name: 'mansiteblock',
        text: 'Manufacting Site Block',
        width: 150,
        tbCls: 'wrap'
    }]


  });