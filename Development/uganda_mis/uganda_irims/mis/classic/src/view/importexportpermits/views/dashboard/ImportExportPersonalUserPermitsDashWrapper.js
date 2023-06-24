/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.ImportExportPersonalUserPermitsDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'importexportpersonaluserpermitsdashwrapper',
	itemId:'permitsdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'importexportpersonaluserpermitsdash'
        }
    ]
});