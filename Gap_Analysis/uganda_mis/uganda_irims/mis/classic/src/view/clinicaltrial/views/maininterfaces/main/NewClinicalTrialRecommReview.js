/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.NewClinicalTrialRecommReview', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialRecommReview',
    xtype: 'newclinicaltrialrecommreview',

    items: [
        {
            xtype: 'newclinicaltrialrecommreviewpanel'
        }
    ]
});