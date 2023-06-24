/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.AmendmentClinicalTrialManagerMeeting', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialManagerMeeting',
    xtype: 'amendmentclinicaltrialmanagermeeting',

    items: [
        {
            xtype: 'amendmentclinicaltrialmanagermeetingpanel'
        }
    ]
});