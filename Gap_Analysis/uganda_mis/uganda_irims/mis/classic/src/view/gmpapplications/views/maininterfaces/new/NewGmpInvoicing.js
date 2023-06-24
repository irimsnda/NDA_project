/**
 * Created by Kip on 12/25/2018.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.new.NewGmpInvoicing', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpInvoicing',
    xtype: 'newgmpinvoicing',
    items: [
        {
            xtype: 'newgmpinvoicingpanel'
        }
    ]
});
