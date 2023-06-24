/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.NewClinicalTrialManagerMeeting', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialManagerMeeting',
    xtype: 'newclinicaltrialmanagermeeting',

    items: [
        {
            xtype: 'newclinicaltrialmanagermeetingpanel'
        }
    ]
});