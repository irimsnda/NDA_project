/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.FoodImportExportPermitsDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'foodimportexportpermitsdashwrapper',
	itemId:'importexportpermitsappswrapper',
    layout: 'fit',
    items: [{
            xtype: 'foodimportexportpermitsdash'
        }]
});