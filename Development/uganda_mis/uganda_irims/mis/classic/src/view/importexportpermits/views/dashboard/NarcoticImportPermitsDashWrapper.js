
Ext.define('Admin.view.importexportpermits.views.dashboard.NarcoticImportPermitsDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'narcoticimportpermitsdashwrapper',
	itemId:'permitsdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'narcoticimportpermitsdash'
        }
    ]
});