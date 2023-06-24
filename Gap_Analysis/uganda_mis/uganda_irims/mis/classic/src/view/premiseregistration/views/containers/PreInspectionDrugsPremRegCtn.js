
Ext.define('Admin.view.premiseregistration.views.containers.PreInspectionDrugsPremRegCtn', {
    extend: 'Ext.Container',
    xtype: 'preinspectiondrugspremregctn',
    controller: 'premiseregistrationvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 2
        },
        // {
        //     xtype: 'hiddenfield',
        //     name: 'section_id',
        //     value: 1
        // },
        {
            xtype: 'preinspectiondrugspremregdashwrapper',
            region: 'center'
        },
        {
            xtype: 'preinspectiondrugspremregtb',
            region: 'south'
        }
    ]
});