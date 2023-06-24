/**
 * Created by Kip on 5/20/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.renewal.RenewGmpTCMeetingScheduling', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpTCMeetingScheduling',
    xtype: 'renewgmptcmeetingscheduling',
    items: [
        {
            xtype: 'renewgmptcmeetingschedulingpanel'
        }
    ]
});