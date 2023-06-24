/**
 * Created by Softclans on 10/12/2018.
 */

Ext.define('Admin.view.importexportpermits.views.maininterfaces.controlleddrugspermits.ControlledDrugsLicPaymentVerification', {
    extend: 'Ext.panel.Panel',
    xtype: 'controlleddrugslicpaymentverification',
    layout: 'fit',
    items:[{
        xtype: 'controlleddrugspaymentverificationpnl',
        permitsdetails_panel: 'previewcontroldrugslicpermitdetails',
        itemId: 'main_processpanel'
    }]
});