 Ext.define('Admin.view.frontoffice.promadvert.grids.PromotionMaterialDetailsView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   width: '100%',
   collapsible: true,
   titleCollapse: true,
    xtype: 'promotionmaterialdetailsview',
   layout: 'fit',
    store: 'spreadsheetpromotionmaterialdetailsstr',
    title: 'Promotion Materials Details',
     viewConfig: {
            emptyText: 'No information found for the product under creteria'
        },
     columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'material',
        name: 'material',
        text: 'Material Name',
        width: 150,
        tbCls: 'wrap'
     },
     {
        xtype: 'gridcolumn',
        dataIndex: 'remarks',
        name: 'remarks',
        text: 'Remarks',
        width: 150,
        tbCls: 'wrap'
       
    }]
});