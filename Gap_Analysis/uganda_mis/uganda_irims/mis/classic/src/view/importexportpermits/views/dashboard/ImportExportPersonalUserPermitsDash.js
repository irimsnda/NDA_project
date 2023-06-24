/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.ImportExportPersonalUserPermitsDash', {
    extend: 'Ext.Container',
    xtype: 'importexportpersonaluserpermitsdash',
    layout: 'border',
    items: [
        {
            xtype: 'importexportpersonaluserpermitsdashgrid',
            region: 'center',
            title: 'Declared Personal Use Permits',
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