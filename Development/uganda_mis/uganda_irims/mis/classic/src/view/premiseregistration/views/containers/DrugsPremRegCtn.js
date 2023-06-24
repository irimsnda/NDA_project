
Ext.define('Admin.view.premiseregistration.views.containers.DrugsPremRegCtn', {
    extend: 'Ext.Container',
    xtype: 'drugspremregctn',
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
            value: 1
        },
        {
            xtype: 'drugspremregdashwrapper',
            region: 'center'
        },
        {
            xtype: 'drugspremregtb',
            region: 'south'
        }
    ]
});