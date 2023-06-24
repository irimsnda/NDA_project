/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.NewClinicalTrialManagerAssessment', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialManagerAssessment',
    xtype: 'newclinicaltrialmanagerassessment',

    items: [
        {
            xtype: 'newclinicaltrialmanagerassessmentpanel'
        }
    ]
});