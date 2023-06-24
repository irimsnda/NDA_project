/**
 * Created by Kip on 6/7/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.dashboards.ClinicalTrialDismissedAppsDash', {
    extend: 'Ext.Container',
    xtype: 'clinicaltrialdismissedappsdash',
    layout: 'border',
    items: [
        {
            xtype: 'clinicaltrialdismissedappsgrid',
            region: 'center',
            title: 'Dismissed Applications',
            margin: 2,
            section: 1
        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }

    ]
});