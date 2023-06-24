/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.NewClinicalTrialInvoicing', {
    extend: 'Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialInvoicing',
    xtype: 'newclinicaltrialinvoicing',
    items: [
        {
            xtype: 'newclinicaltrialinvoicingpanel'
        }
    ]
});