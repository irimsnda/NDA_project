Ext.define('Admin.view.frontoffice.survelliance.grids.SpreadSheetSurvellianceApplicationTypes', {
    extend: 'Ext.grid.Panel',  
    scroll: true,
    titleCollapse: true,
   width: '100%',
    xtype: 'spreadsheetsurvellianceapplicationtypes',
    layout: 'fit',
    store: 'spreadsheetapplicationtypesstr',
    title: 'Select Survelliance Application Sections',
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