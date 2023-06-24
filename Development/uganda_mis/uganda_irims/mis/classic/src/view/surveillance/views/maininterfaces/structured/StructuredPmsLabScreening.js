/**
 * Created by Kip on 3/14/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.structured.StructuredPmsLabScreening', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.main.PmsLabScreening',
    xtype: 'structuredpmslabscreening',
    items: [
        {
            xtype: 'structuredpmslabscreeningwizard'
        }
    ]
});