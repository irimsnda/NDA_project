/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.AmendmentClinicalTrialRecommReview', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialRecommReview',
    xtype: 'amendmentclinicaltrialrecommreview',

    items: [
        {
            xtype: 'amendmentclinicaltrialrecommreviewpanel'
        }
    ]
});