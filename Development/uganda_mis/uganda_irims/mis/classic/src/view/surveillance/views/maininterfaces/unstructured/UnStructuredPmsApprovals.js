/**
 * Created by Kip on 6/24/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.unstructured.UnStructuredPmsApprovals', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.main.PmsApprovals',
    xtype: 'unstructuredpmsapprovals',

    items: [
        {
            xtype: 'unstructuredpmsapprovalswizard'
        }
    ]
});