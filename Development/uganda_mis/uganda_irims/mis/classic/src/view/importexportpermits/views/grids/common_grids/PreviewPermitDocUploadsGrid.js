/**
 * Created by Softclans
 * User robinson odhiambo
 * on 10/4/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.PreviewPermitDocUploadsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ApplicationPrevDocUploadsGrid',
    xtype: 'previewpermitdocuploadsgrid',
    upload_tab: 'previewpermitdocuploadsgrid',
    table_name: 'tra_importexport_applications',
    viewModel: {
        type: 'importexportpermitsvm'
    }
});
