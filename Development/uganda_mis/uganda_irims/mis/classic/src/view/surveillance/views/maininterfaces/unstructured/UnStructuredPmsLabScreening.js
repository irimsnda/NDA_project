/**
 * Created by Kip on 6/24/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.unstructured.UnStructuredPmsLabScreening', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.main.PmsLabScreening',
    xtype: 'unstructuredpmslabscreening',

    items: [
        {
            xtype: 'unstructuredpmslabscreeningwizard'
        }
    ]
});