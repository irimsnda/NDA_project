/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.NewClinicalTrialCommunication', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialCommunication',
    xtype: 'newclinicaltrialcommunication',

    items: [
        {
            xtype: 'newclinicaltrialcommunicationpanel'
        }
    ]
});