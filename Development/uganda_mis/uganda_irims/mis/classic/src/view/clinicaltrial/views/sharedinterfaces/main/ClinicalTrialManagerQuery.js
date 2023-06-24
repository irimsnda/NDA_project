/**
 * Created by Kip on 6/5/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.main.ClinicalTrialManagerQuery', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicaltrialmanagerquery',
    controller: 'clinicaltrialvctr',
    viewModel: 'clinicaltrialvm',
    layout: 'fit',
    
    items: [
        {
            xtype: 'clinicaltrialmanagerquerypanel'
        }
    ]
});