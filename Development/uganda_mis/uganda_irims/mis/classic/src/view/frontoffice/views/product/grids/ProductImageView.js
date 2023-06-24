 Ext.define('Admin.view.frontoffice.product.grids.ProductImageView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   titleCollapse: true,
   width: '100%',
   collapsible: true,
    xtype: 'productImageview',
    layout:'fit',
    store: 'productimageviewstr',
    title: 'Product Images',
     viewConfig: {
            emptyText: 'No information found for the product under creteria'
        },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'initial_file_name',
        name: 'initial_file_name',
        text: 'Image Name',
        width: 150,
        tbCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'remarks',
        name: 'remarks',
        text: 'Remarks',
        width: 150,
        tbCls: 'wrap'
    }]


  });