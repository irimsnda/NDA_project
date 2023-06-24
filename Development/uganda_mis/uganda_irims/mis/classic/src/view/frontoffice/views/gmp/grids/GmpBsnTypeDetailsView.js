 Ext.define('Admin.view.frontoffice.gmp.grids.GmpBsnTypeDetailsView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   width: '100%',
   collapsible: true,
   titleCollapse: true,
    xtype: 'gmpbsntypedetailsview',
   layout: 'fit',
   store: 'spreadsheetgmpbsntypedetailsstr',
    title: 'Business Type Details',
     viewConfig: {
            emptyText: 'No information found for the Business Type'
        },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'BsnType',
        name: 'BsnType',
        text: 'Business Type',
        width: 150,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'details',
        name: 'details',
        text: 'Details',
        width: 150,
        tbCls: 'wrap'
    }

    
    ]


  });