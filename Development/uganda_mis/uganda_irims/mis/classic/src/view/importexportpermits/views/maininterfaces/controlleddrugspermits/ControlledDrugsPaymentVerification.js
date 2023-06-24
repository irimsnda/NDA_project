/**
 * Created by Softclans on 10/12/2018.
 */

Ext.define('Admin.view.importexportpermits.views.maininterfaces.controlleddrugspermits.ControlledDrugsPaymentVerification', {
    extend: 'Ext.panel.Panel',
    xtype: 'controlleddrugspaymentverification',
    layout: 'fit',
    items:[{
        xtype: 'controlleddrugspaymentverificationpnl',
        permitsdetails_panel: 'previewcontroldrugsimppermitdetails',
        itemId: 'main_processpanel'
   
    }]
});