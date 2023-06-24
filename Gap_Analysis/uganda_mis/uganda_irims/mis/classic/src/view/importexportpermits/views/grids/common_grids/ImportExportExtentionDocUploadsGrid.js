Ext.define('Admin.view.importexportpermits.views.grids.common_grids.ImportExportExtentionDocUploadsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ApplicationDocUploadsGrid',
    
    xtype: 'importexportextentiondocuploadsgrid',
    table_name: 'tra_importexport_applications',
    viewModel: {
        type: 'importexportpermitsvm'
    }
});