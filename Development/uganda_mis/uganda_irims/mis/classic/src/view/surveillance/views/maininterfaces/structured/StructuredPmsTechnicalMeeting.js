/**
 * Created by Kip on 3/20/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.structured.StructuredPmsTechnicalMeeting', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.main.PmsTechnicalMeeting',
    xtype: 'structuredpmstechnicalmeeting',

    items: [
        {
            xtype: 'structuredpmstmeetingpnl'
        }
    ]
});