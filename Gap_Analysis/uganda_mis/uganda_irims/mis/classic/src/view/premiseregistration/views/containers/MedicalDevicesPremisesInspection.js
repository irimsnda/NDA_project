/**
 * Created by Kip on 11/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.containers.MedicalDevicesPremisesInspection', {
    extend: 'Ext.Container',
    xtype: 'medicaldevicespremisesinspection',
    controller: 'premiseregistrationvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 2
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 4
        },
        {
            xtype: 'medicaldevicespremisesinspectiondashwrapper',
            region: 'center'
        },
        {
            xtype: 'medicaldevicespremisesinspectiontb',
            region: 'south'
        }
    ]
});