/**
 * Created by Kip on 10/12/2018.
 */

Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.PermitDeclarationReceipting', {
    extend: 'Ext.panel.Panel',
    
    xtype: 'permitdeclarationreceipting',

    layout: 'fit',

    items:[{
        xtype: 'importexportpermitreceiptingpnl'
    }]
});