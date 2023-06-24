/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.InspectedPoePermitsDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'inspectedpoepermitsdashwrapper',
	itemId:'inspectedpoepermitsdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'inspectedpoepermitsdash'
        }
    ]
});