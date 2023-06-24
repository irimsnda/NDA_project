/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.ApplicationPermitsdeclarationsDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'applicationpermitsdeclarationsdashwrapper',
	itemId:'permitsdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'applicationpermitsdeclarationsdash'
        }
    ]
});