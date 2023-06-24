Ext.define('Admin.view.premiseregistration.views.maininterfaces.common_interfaces.new.PremiseApplicationMeeting', {
    extend: 'Ext.panel.Panel',
    xtype: 'premiseapplicationmeeting',//drugproductmeeting
    controller: 'premiseregistrationvctr',
    viewModel: 'premiseregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'newPremiseTcMeetingpnl',//newProductTcMeetingpnl
            itemId:'main_processpanel',
            // productdetails_panel: 'drugsProductsDetailsPanel',
        }
    ]
});