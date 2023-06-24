/**
 * Created by Kip on 5/28/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.alteration.AltGmpOnlinePreviewPnl', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpOnlinePreviewPnl',
    xtype: 'altgmponlinepreviewpnl',
    items: [
        {
            xtype: 'altgmponlinepreviewwizard'
        }
    ]
});