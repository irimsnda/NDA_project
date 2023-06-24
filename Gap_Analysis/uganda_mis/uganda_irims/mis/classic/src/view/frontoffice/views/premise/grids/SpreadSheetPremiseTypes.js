Ext.define('Admin.view.frontoffice.premise.grids.SpreadSheetPremiseTypes', {
    extend: 'Ext.grid.Panel',  
    scroll: true,
    titleCollapse: true,
    width: '100%',
    xtype: 'spreadsheetpremisetypes',
    layout: 'fit',
    store: 'spreadsheetapplicationtypesstr',
    title: 'Select premise Application Sections',
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