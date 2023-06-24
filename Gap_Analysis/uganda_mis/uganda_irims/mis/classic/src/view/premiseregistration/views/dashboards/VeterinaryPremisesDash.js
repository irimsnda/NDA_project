/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.VeterinaryPremisesDash', {
    extend: 'Ext.Container',
    xtype: 'veterinarypremisesdash',
    layout:'border',
    items: [
        {
            xtype: 'drugspremreggrid',
            region: 'center',
            title: 'Active Tasks',
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