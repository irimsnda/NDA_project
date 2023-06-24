/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.productregistration.views.containers.DrugProductRegistrationCtn', {
    extend: 'Ext.Container',
    xtype: 'drugProductRegistrationCtn',
    controller: 'productregistrationvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 1
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 1
        },
        {
            xtype: 'drugsproductRegDashWrapper',
            region: 'center'
        },
        {
            xtype: 'drugproductregtb',
            region: 'south'
        }
    ]
});