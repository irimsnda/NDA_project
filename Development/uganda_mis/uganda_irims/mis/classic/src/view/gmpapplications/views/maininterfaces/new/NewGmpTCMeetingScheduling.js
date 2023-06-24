/**
 * Created by Kip on 5/20/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.new.NewGmpTCMeetingScheduling', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpTCMeetingScheduling',
    xtype: 'newgmptcmeetingscheduling',
    items: [
        {
            xtype: 'newgmptcmeetingschedulingpanel'
        }
    ]
});