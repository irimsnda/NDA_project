Ext.define('Admin.view.premiseregistration.views.maininterfaces.new.PremiseReviewRecommendation', {
    extend: 'Ext.panel.Panel',
    xtype: 'premisereviewrecommendation',//drugsreviewrecommendation
    controller: 'premiseregistrationvctr',
    viewModel: 'premiseregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'newPremiseTcReviewMeetingpnl',//newProductTcReviewMeetingpnl
            itemId:'main_processpanel'
        }
    ]
});