/**
 * Created by Kip on 10/19/2018.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.OnlinePremRegistrationDash', {
    extend: 'Ext.Container',
    xtype: 'onlinepremregistrationdash',
    layout:'border',
    items: [
        {
            xtype: 'onlinepremregistrationgrid',
            region: 'center',
            title: 'Submitted Applications',
            margin:2
        },{
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }

    ]
});