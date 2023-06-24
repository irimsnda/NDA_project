/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.NewClinicalTrialManagerAuditing', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialManagerAuditing',
    xtype: 'newclinicaltrialmanagerauditing',

    items: [
        {
            xtype: 'newclinicaltrialmanagerauditingpanel'
        }
    ]
});