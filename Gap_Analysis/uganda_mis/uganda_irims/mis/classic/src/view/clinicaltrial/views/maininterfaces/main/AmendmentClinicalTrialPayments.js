/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.AmendmentClinicalTrialPayments', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialPayments',
    xtype: 'amendmentclinicaltrialpayments',

    items: [
        {
            xtype: 'amendmentclinicaltrialpaymentspanel'
        }
    ]
});