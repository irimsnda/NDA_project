/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.InspectedPoePermitsProductsDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'inspectedpoepermitsproductsdashwrapper',
	itemId:'inspectedpoepermitsproductsdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'inspectedpoepermitsproductsdash'
        }
    ]
});