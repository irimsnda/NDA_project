
Ext.define('Admin.view.drugshopregistration.views.containers.DrugShopRegCtn', {
    extend: 'Ext.Container',
    xtype: 'drugshopregctn',
    controller: 'premiseregistrationvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 29
        },
        // {
        //     xtype: 'hiddenfield',
        //     name: 'section_id',
        //     value: 1
        // },
        {
            xtype: 'drugshopregdashwrapper',
            region: 'center'
        },
        {
            xtype: 'drugshopregtb',
            region: 'south'
        }
    ]
});