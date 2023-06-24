Ext.define('Admin.view.commoninterfaces.grids.CapaDocumentUploadGenericGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ApplicationDocUploadsGrid',
    xtype: 'capaDocumentUploadGenericGrid',
    document_type_id: 39,
    table_name: 'tra_application_query_reftracker',
    listeners: {
        afterrender: function(grid){
            var pnl = grid.up('panel'),
            inspection_capa_id = pnl.down('hiddenfield[name=inspection_capa_id]').getValue();
            grid.down('hiddenfield[name=inspection_capa_id]').setValue(inspection_capa_id);
            
        }
    }
});