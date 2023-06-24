/**

 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.disposalpermits.views.maininterfaces.DisposalPermitApproval', {
    extend: 'Ext.panel.Panel',
    xtype: 'disposalpermitapproval',
    controller: 'disposalpermitsvctr',
    viewModel: {
        type: 'disposalpermitsvm'
    },
    layout: 'fit',
    items: [
        {
            xtype: 'disposalpermitapprovalpnl',
            permitsdetails_panel: 'disposalapplicationspreviewpnl',
            permitsverification_panel: 'disposalpermitverificationwizard',
            itemId: 'main_processpanel'
        }
    ]

});