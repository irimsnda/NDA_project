/**
 * Created by Kip on 10/12/2018.
 */

Ext.define('Admin.view.disposalpermits.views.maininterfaces.import.DisposalPermitReceipting', {
    extend: 'Ext.panel.Panel',
    xtype: 'disposalpermitReceipting',
    layout: 'fit',
    items:[{
        xtype: 'disposalpermitreceiptingpnl',permitsdetails_panel: 'disposalapplicationspreviewpnl',
    }]
});