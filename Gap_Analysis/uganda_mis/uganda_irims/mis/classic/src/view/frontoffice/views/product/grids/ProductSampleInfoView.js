 Ext.define('Admin.view.frontoffice.product.grids.ProductSampleInfoView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   collapsible: true,
   titleCollapse: true,
   width: '100%',
    xtype: 'productsampleinfoview',
   layout: 'fit',
    store: 'spreadsheetproductsampleinfostr',
    title: 'Product Sample information',
      viewConfig: {
            emptyText: 'No information found for the product under creteria'
        },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'batch_no',
        name: 'batch_no',
        text: 'Batch No',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'manufacturing_date',
        name: 'manufacturing_date',
        text: 'Manufacturing Date',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'submission_date',
        name: 'submission_date',
        text: 'Submission Date',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'expiry_date',
        name: 'expiry_date',
        text: 'Expiry Date',
        width: 150,
        tbCls: 'wrap'
    }]


  });