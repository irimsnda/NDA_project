/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.VetImportExportPermitsDashwrapper', {
    extend: 'Ext.Container',
    xtype: 'vetimportexportpermitsdashwrapper',
	itemId:'importexportpermitsappswrapper',
    layout: 'fit',
    items: [{
            xtype: 'foodimportexportpermitsdash'
        }]
});