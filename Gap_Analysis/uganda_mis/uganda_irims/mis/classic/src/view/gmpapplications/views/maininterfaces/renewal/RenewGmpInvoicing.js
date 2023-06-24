/**
 * Created by Kip on 12/25/2018.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.renewal.RenewGmpInvoicing', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpInvoicing',
    xtype: 'renewgmpinvoicing',
    items: [
        {
            xtype: 'renewgmpinvoicingpanel'
        }
    ]
});
