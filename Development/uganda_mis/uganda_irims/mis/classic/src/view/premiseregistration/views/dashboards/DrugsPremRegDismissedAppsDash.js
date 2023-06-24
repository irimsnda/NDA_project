/**
 * Created by Kip on 6/6/2019.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.DrugsPremRegDismissedAppsDash', {
    extend: 'Ext.Container',
    xtype: 'drugspremregdismissedappsdash',
    layout:'border',
    items: [
        {
            xtype: 'premregdismissedappsgrid',
            region: 'center',
            title: 'Dismissed Applications',
            margin:2,
            section: 2
        },{
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }

    ]
});