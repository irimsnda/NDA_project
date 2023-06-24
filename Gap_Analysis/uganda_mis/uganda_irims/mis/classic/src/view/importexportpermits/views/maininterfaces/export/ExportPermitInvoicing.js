/**
 * Created by Kip on 10/12/2018.
 */

Ext.define('Admin.view.importexportpermits.views.maininterfaces.export.ExportPermitInvoicing', {
    extend: 'Ext.panel.Panel',
    xtype: 'exportpermitinvoicing',
    layout: 'fit',
    items:[{
        xtype: 'exportpermitinvoicingpnl'
    }]
});