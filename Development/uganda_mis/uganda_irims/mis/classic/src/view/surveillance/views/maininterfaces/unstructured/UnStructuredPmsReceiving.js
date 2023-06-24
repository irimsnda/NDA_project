/**
 * Created by Kip on 6/24/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.unstructured.UnStructuredPmsReceiving', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.main.PmsReceiving',
    xtype: 'unstructuredpmsreceiving',

    items: [
        {
            xtype: 'unstructuredpmsreceivingwizard'
        }
    ]
});