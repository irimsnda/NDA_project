/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.NewClinicalTrialAssessment', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialAssessment',
    xtype: 'newclinicaltrialassessment',

    items: [
        {
            xtype: 'newclinicaltrialassessmentpanel'
        }
    ]
});