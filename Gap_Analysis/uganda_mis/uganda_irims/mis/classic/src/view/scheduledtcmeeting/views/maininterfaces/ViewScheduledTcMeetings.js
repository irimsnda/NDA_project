/**
 * Created by Kip on 10/18/2018.
 */
Ext.define('Admin.view.scheduledtcmeeting.views.maininterfaces.ViewScheduledTcMeetings', {
    extend: 'Ext.panel.Panel',
    xtype: 'viewscheduledtcmeetings',
    controller: 'scheduledtcmeetingsvctr',
    viewModel: 'scheduledtcmeetingsvm',
    layout: 'fit',
    items: [
        {
            xtype: 'viewscheduledtcmeetingsgrid',
            title:'Scheduled TC Meeting'
        }
    ]
});

