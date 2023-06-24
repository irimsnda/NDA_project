Ext.define('Admin.view.frontoffice.importexport.grids.SpreadSheetIEApplicationSections', {
    extend: 'Ext.grid.Panel',  
    scroll: true,
    titleCollapse: true,
   width: '100%',
    xtype: 'spreadsheetieapplicationsections',
    layout: 'fit',
    store: 'spreadsheetapplicationtypesstr',
    title: 'Select Application Section',
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