/**
 * Created by Kip on 5/28/2019.
 */
Ext.define('Admin.view.premiseregistration.views.maininterfaces.alteration.AltPremiseOnlinePreviewPnl', {
    extend: 'Admin.view.premiseregistration.views.sharedinterfaces.main.PremiseOnlinePreviewPnl',
    xtype: 'altpremiseonlinepreviewpnl',
    items: [
        {
            xtype: 'altpremiseonlinepreviewwizard'
        }
    ]
});