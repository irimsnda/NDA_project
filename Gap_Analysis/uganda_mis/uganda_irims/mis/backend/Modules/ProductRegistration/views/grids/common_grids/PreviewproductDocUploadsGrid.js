/**
 * Created by Softclans
 * User robinson odhiambo
 * on 10/4/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.PreviewproductDocUploadsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ApplicationPrevDocUploadsGrid',
    xtype: 'previewproductDocUploadsGrid',
    upload_tab: 'previewproductDocUploadsGrid',
    table_name: 'tra_product_applications',
    viewModel: {
        type: 'productregistrationvm'
    }
});
