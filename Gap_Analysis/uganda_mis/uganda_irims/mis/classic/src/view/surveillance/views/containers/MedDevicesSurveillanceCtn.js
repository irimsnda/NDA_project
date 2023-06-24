/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.view.surveillance.views.containers.MedDevicesSurveillanceCtn', {
    extend: 'Ext.Container',
    xtype: 'meddevicessurveillancectn',
    controller: 'surveillancevctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 5
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 4
        },
        {
            xtype: 'meddevicessurveillancedashwrapper',
            region: 'center'
        },
        {
            xtype: 'meddevicessurveillancetb',
            region: 'south'
        }
    ]
});