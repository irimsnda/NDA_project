 Ext.define('Admin.view.frontoffice.gmp.grids.GmpManufacturingBlockView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   width: '100%',
   collapsible: true,
   titleCollapse: true,
    xtype: 'gmpmanufacturingblockview',
   layout: 'fit',
   store: 'spreadsheetgmpmanblockstr',
    title: 'Product Manufacturing Block Details',
     viewConfig: {
            emptyText: 'No information found for the manufacturing block under this'
        },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        name: 'name',
        text: 'Name',
        width: 150,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'activities',
        name: 'activities',
        text: 'Activity',
        width: 150,
        tbCls: 'wrap'
    }

    
    ]


  });