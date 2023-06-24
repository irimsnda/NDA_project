/**
 * Created by Kip on 6/7/2019.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.CosmeticsPremRegDismissedAppsDash', {
    extend: 'Ext.Container',
    xtype: 'cosmeticspremregdismissedappsdash',
    layout:'border',
    items: [
        {
            xtype: 'premregdismissedappsgrid',
            region: 'center',
            title: 'Dismissed Applications',
            margin:2,
            section: 3
        },{
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }

    ]
});