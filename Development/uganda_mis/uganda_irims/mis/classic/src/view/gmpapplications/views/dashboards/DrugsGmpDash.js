/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.dashboards.DrugsGmpDash', {
    extend: 'Ext.Container',
    xtype: 'drugsgmpdash',
    layout:'border',
    items: [
        {
            xtype: 'drugsgmpgrid',
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