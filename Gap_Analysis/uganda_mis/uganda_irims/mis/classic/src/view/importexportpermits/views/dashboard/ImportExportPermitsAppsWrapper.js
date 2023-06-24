Ext.define('Admin.view.productregistration.views.dashboards.ImportExportPermitsAppsWrapper', {
    extend: 'Ext.Container',
    xtype: 'importexportpermitsappswrapper',
	itemId:'importexportpermitsappswrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'importexportpermitsapps'
        }
    ]
});