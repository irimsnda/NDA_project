Ext.define('Admin.view.productregistration.views.dashboards.DrugsImportExportPermitsAppsWrapper', {
    extend: 'Ext.Container',
    xtype: 'drugsimportexportpermitsappsWrapper',
	itemId:'importexportpermitsappswrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'drugsimportexportpermitsapps'
        }
    ]
});