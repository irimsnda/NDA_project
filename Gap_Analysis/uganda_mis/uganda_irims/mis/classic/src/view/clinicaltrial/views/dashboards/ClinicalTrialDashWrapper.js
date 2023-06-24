/**
 * Created by Kip on 1/15/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.dashboards.ClinicalTrialDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'clinicaltrialdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'clinicaltrialdash'
        }
    ]
});