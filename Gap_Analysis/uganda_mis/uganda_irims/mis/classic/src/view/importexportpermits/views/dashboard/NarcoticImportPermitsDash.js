/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.NarcoticImportPermitsDash', {
    extend: 'Ext.Container',
    xtype: 'narcoticimportpermitsdash',
 
    layout: 'border',
    items: [
        {
            xtype: 'narcoticimportpermitsdashgrid',
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