/**
 * Created by Softclans
 * User robinson odhiambo
 * on 10/4/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductAuditingUploadsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ApplicationDocUploadsGrid',
    xtype:'productAuditingUploadsGrid',
    upload_tab:'productAuditingUploadsGrid',
    document_type_id:9,
    table_name: 'tra_product_applications'
});
