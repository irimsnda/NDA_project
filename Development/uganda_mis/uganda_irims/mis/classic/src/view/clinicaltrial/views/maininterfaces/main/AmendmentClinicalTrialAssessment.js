/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.AmendmentClinicalTrialAssessment', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialAssessment',
    xtype: 'amendmentclinicaltrialassessment',

    items: [
        {
            xtype: 'amendmentclinicaltrialassessmentpanel'
        }
    ]
});