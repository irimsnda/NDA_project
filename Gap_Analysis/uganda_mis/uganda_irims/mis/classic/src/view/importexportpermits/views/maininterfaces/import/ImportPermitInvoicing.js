/**
 * Created by Kip on 10/12/2018.
 */

Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportPermitInvoicing', {
    extend: 'Ext.panel.Panel',
    xtype: 'importpermitinvoicing',
    layout: 'fit',
    items:[{
        xtype: 'importpermitinvoicingpnl'
    }]
});