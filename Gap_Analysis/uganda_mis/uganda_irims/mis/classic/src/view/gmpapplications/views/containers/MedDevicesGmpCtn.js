/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.containers.MedDevicesGmpCtn', {
    extend: 'Ext.Container',
    xtype: 'meddevicesgmpctn',
    controller: 'gmpapplicationsvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 3
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 4
        },
        {
            xtype: 'meddevicesgmpdashwrapper',
            region: 'center'
        },
        {
            xtype: 'meddevicesgmptb',
            region: 'south'
        }
    ]
});