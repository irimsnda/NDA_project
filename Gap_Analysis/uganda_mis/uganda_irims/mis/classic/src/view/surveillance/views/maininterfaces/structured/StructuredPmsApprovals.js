/**
 * Created by Kip on 3/19/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.structured.StructuredPmsApprovals', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.main.PmsApprovals',
    xtype: 'structuredpmsapprovals',

    items: [
        {
            xtype: 'structuredpmsapprovalswizard'
        }
    ]
});