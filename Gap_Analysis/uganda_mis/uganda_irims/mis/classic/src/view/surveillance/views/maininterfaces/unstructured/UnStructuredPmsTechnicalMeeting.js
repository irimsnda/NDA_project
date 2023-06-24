/**
 * Created by Kip on 6/24/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.unstructured.UnStructuredPmsTechnicalMeeting', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.main.PmsTechnicalMeeting',
    xtype: 'unstructuredpmstechnicalmeeting',

    items: [
        {
            xtype: 'unstructuredpmstmeetingpnl'
        }
    ]
});