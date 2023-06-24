Ext.define('Admin.view.frontoffice.importexport.grids.SpreadSheetIEPermitApplicationSections', {
    extend: 'Ext.grid.Panel',  
    scroll: true,
    titleCollapse: true,
   width: '100%',
    xtype: 'spreadsheetiepermitapplicationsections',
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