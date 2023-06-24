/**
 * Created by Softclans
 * User robinson odhiambo
 * on 10/4/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductDossierUploadsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ApplicationDocUploadsGrid',
    xtype:'productDossierUploadsGrid',
    upload_tab:'productDossierUploadsGrid',
    document_type_id:3,
    table_name: 'tra_product_applications'
    
});
