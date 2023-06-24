/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.AmendmentClinicalTrialManagerAuditing', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialManagerAuditing',
    xtype: 'amendmentclinicaltrialmanagerauditing',

    items: [
        {
            xtype: 'amendmentclinicaltrialmanagerauditingpanel'
        }
    ]
});