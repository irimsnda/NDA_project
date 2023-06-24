/**
 * Created by Kip on 5/28/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.cancellation.CancelGmpOnlinePreviewPnl', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpOnlinePreviewPnl',
    xtype: 'cancelgmponlinepreviewpnl',
    items: [
        {
            xtype: 'cancelgmponlinepreviewwizard'
        }
    ]
});