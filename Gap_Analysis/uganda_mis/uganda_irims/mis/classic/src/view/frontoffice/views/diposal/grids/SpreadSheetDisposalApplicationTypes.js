Ext.define('Admin.view.frontoffice.disposal.grids.SpreadSheetDisposalApplicationTypes', {
    extend: 'Ext.grid.Panel',  
    scroll: true,
   width: '100%',
    xtype: 'spreadsheetdisposalapplicationtypes',
    layout: 'fit',
    store: 'spreadsheetapplicationtypesstr',
    title: 'Select Application Sections',
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