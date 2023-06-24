/**
 * Created by Kip on 3/7/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.structured.StructuredPmsReceiving', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.main.PmsReceiving',
    xtype: 'structuredpmsreceiving',

    items: [
        {
            xtype: 'structuredpmsreceivingwizard'
        }
    ]
});