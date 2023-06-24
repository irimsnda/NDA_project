/**
 * Created by Kip on 5/23/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.alteration.AltGmpInvoicing', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpInvoicing',
    xtype: 'altgmpinvoicing',
    items: [
        {
            xtype: 'altgmpinvoicingpanel'
        }
    ]
});
