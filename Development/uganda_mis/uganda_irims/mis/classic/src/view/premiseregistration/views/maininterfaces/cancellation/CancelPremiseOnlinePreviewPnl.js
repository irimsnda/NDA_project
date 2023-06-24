/**
 * Created by Kip on 5/28/2019.
 */
Ext.define('Admin.view.premiseregistration.views.maininterfaces.cancellation.CancelPremiseOnlinePreviewPnl', {
    extend: 'Admin.view.premiseregistration.views.sharedinterfaces.main.PremiseOnlinePreviewPnl',
    xtype: 'cancelpremiseonlinepreviewpnl',
    items: [
        {
            xtype: 'cancelpremiseonlinepreviewwizard'
        }
    ]
});