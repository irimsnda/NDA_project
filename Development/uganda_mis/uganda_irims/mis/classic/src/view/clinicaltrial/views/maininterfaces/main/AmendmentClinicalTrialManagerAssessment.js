/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.AmendmentClinicalTrialManagerAssessment', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialManagerAssessment',
    xtype: 'amendmentclinicaltrialmanagerassessment',

    items: [
        {
            xtype: 'amendmentclinicaltrialmanagerassessmentpanel'
        }
    ]
});