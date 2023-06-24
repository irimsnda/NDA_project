/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.AmendmentClinicalTrialInvoicing', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialInvoicing',
    xtype: 'amendmentclinicaltrialinvoicing',
    items: [
        {
            xtype: 'amendmentclinicaltrialinvoicingpanel'
        }
    ]
});