/**
 * Created by Softclans
 * User robinson odhiambo
 * on 10/4/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.OnlineImportExportDocUploadsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ApplicationPrevDocUploadsGrid',
    xtype: 'onlineimportexportdocuploadsgrid',
    table_name: 'tra_importexport_applications',
    portal_uploads: 1,
    viewModel: {
        type: 'importexportpermitsvm'
    }
});
