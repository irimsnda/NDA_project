/**
 * Created by Kip on 10/14/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.common_interfaces.new.DrugProductMeeting', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugproductmeeting',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'newProductTcMeetingpnl',
            itemId:'main_processpanel',
            productdetails_panel: 'drugsProductsDetailsPanel',
        }
    ]
});