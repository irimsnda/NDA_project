Ext.define('Admin.view.frontoffice.gmp.grids.SpreadSheetGmpApplicationTypes', {
    extend: 'Ext.grid.Panel',  
    scroll: true,
    titleCollapse: true,
   width: '100%',
    xtype: 'spreadsheetgmpapplicationtypes',
    layout: 'fit',
    store: 'spreadsheetapplicationtypesstr',
    title: 'Select Gmp Application Sections',
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