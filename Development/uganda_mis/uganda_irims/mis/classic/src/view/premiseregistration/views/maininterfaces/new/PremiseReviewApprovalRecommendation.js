Ext.define('Admin.view.premiseregistration.views.maininterfaces.new.PremiseReviewApprovalRecommendation', {
    extend: 'Ext.panel.Panel',
    xtype: 'premisereviewapprovalrecommendation',//drugsreviewrecommendation
    controller: 'premiseregistrationvctr',
    viewModel: 'premiseregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'newPremiseTcapprovalReviewMeetingpnl',//newProductTcReviewMeetingpnl
            itemId:'main_processpanel'
        }
    ]
});