/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.NewClinicalTrialScreening', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialScreening',
    xtype: 'newclinicaltrialscreening',

    items: [
        {
            xtype: 'newclinicaltrialscreeningpanel'
        }
    ]
});