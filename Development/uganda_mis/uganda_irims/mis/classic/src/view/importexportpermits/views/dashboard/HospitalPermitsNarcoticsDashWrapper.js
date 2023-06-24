/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.HospitalPermitsNarcoticsDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'hospitalpermitsnarcoticsdashwrapper',
	itemId:'permitsdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'hospitalpermitsnarcoticsdash'
        }
    ]
});