/**
 * Created by Kip on 10/14/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.cosmetics.new.CosmeticsReviewRecommendation', {
    extend: 'Ext.panel.Panel',
    xtype: 'cosmeticsreviewrecommendation',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'newProductTcReviewMeetingpnl',
            itemId:'main_processpanel',
            productdetails_panel: 'cosmeticsproductsdetailspanel',
        }
    ]
});