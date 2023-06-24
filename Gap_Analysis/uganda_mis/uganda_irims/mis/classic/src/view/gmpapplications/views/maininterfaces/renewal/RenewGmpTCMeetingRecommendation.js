/**
 * Created by Kip on 5/13/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.renewal.RenewGmpTCMeetingRecommendation', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpTCMeetingRecommendation',
    xtype: 'renewgmptcmeetingrecommendation',
    items: [
        {
            xtype: 'renewgmptcmeetingrecommendationpanel'
        }
    ]
});