/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.NewClinicalTrialAuditing', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialAuditing',
    xtype: 'newclinicaltrialauditing',

    items: [
        {
            xtype: 'newclinicaltrialauditingpanel'
        }
    ]
});