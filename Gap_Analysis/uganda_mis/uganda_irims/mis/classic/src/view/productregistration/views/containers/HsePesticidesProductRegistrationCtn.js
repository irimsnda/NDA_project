/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.productregistration.views.containers.HsePesticidesProductRegistrationCtn', {
    extend: 'Ext.Container',
    xtype: 'hsepesticidesProductRegistrationCtn',
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
            value: 17
        },
        {
            xtype: 'cosmeticsproductRegDashWrapper',
            region: 'center',
        },
        {
            xtype: 'cosmeticsProductRegTb',
            region: 'south'
        }
    ]
});