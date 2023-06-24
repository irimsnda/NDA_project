/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.HospitalPermitsNarcoticsDash', {
    extend: 'Ext.Container',
    xtype: 'hospitalpermitsnarcoticsdash',
	itemId:'permitsdashwrapper',
    layout: 'border',
    items: [
        {
            xtype: 'hospitalpermitsnarcoticsdashgrid',
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