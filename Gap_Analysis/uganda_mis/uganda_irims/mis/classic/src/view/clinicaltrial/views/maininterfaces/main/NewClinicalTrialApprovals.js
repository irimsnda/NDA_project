/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.NewClinicalTrialApprovals', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialApprovals',
    xtype: 'newclinicaltrialapprovals',

    items: [
        {
            xtype: 'newclinicaltrialapprovalspanel'
        }
    ]
});