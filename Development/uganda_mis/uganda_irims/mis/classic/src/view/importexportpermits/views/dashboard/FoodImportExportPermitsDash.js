/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.FoodImportExportPermitsDash', {
    extend: 'Ext.Container',
    xtype: 'foodimportexportpermitsdash',
    layout: 'border',
    items: [
        {
            xtype: 'foodimportexportpermitsdashgrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2
        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }
    ]
});