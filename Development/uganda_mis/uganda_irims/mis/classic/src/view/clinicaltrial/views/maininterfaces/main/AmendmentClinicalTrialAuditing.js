/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.AmendmentClinicalTrialAuditing', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialAuditing',
    xtype: 'amendmentclinicaltrialauditing',

    items: [
        {
            xtype: 'amendmentclinicaltrialauditingpanel'
        }
    ]
});