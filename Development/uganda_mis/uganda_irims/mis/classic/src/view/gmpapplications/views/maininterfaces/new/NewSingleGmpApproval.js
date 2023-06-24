/**
 * Created by Kip on 5/14/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.new.NewSingleGmpApproval', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.SingleGmpApproval',
    xtype: 'newsinglegmpapproval',
    items: [
        {
            xtype: 'newsinglegmpapprovalpanel'
        }
    ]
});