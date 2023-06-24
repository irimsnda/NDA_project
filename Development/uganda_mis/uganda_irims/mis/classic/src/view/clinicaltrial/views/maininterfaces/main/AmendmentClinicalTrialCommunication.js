/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.AmendmentClinicalTrialCommunication', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialCommunication',
    xtype: 'amendmentclinicaltrialcommunication',

    items: [
        {
            xtype: 'amendmentclinicaltrialcommunicationpanel'
        }
    ]
});