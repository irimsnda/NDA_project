/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.AmendmentClinicalTrialApprovals', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialApprovals',
    xtype: 'amendmentclinicaltrialapprovals',

    items: [
        {
            xtype: 'amendmentclinicaltrialapprovalspanel'
        }
    ]
});