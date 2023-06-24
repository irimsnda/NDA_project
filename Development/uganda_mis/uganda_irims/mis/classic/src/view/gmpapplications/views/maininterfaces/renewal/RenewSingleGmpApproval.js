/**
 * Created by Kip on 5/14/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.renewal.RenewSingleGmpApproval', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.SingleGmpApproval',
    xtype: 'renewsinglegmpapproval',
    items: [
        {
            xtype: 'renewsinglegmpapprovalpanel'
        }
    ]
});