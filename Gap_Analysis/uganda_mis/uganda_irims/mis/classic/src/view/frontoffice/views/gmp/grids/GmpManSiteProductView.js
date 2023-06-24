 Ext.define('Admin.view.frontoffice.gmp.grids.GmpManSiteProductView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   width: '100%',
   collapsible: true,
   titleCollapse: true,
    xtype: 'gmpmansiteproductview',
   layout: 'fit',
    store: 'spreadsheetgmpmansitestr',
    title: 'GMP Manufacturing Site Product Details',
     viewConfig: {
            emptyText: 'No information found for the Gmp product under creteria'
        },
     columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        name: 'reference_no',
        text: 'Reference no',
        width: 150,
        tbCls: 'wrap'
     },
     {
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        name: 'brand_name',
        text: 'Brand Name',
        width: 150,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        name: 'common_name',
        text: 'Common Name',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'classification',
        name: 'classification',
        text: 'Classification',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Trader',
        name: 'Trader',
        text: 'Trader Name',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderPostalA',
        name: 'TraderPostalA',
        text: 'Trader Postal Address',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderTell',
        name: 'TraderTell',
        text: 'Trader Tell',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_line',
        name: 'ProductLine',
        text: 'Product Line',
        width: 150,
        tbCls: 'wrap'
    }
    ]


  });