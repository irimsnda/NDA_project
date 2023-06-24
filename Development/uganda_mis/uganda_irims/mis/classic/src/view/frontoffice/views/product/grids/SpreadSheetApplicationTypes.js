Ext.define('Admin.view.frontoffice.product.grids.SpreadSheetApplicationTypes', {
    extend: 'Ext.grid.Panel',  
    scroll: true,
    titleCollapse: true,
   width: '100%',
    xtype: 'spreadsheetapplicationtypes',
    layout: 'fit',
    store: 'spreadsheetapplicationtypesstr',
    title: 'Select app Application Section',
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'section_id',
        name: 'id',
        hidden: true
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'name',
        name: 'name',
        flex:1
    }],
     listeners:{
        select: 'loadApplicationColumns'
     }
});