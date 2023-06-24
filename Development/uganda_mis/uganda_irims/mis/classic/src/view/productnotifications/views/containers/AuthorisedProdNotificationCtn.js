/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.productnotifications.views.containers.AuthorisedProdNotificationCtn', {
    extend: 'Ext.Container',
    xtype: 'authorisedprodnotificationctn',
    controller: 'productnotificationsvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 6
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 4
        },
        {
            xtype: 'authorisedprodnotificationdashwrapper',
            region: 'center',
        },
        {
            xtype: 'authorisedprodnotificationctntb',
            region: 'south'
        }
    ]
});//medicaldevicesnoficationmanagerreview