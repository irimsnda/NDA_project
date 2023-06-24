/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.controldocument_management.views.dashboard.ControllledDocumentsAccessDashboard', {
    extend: 'Ext.Container',
    xtype: 'controllleddocumentsaccessdashboard',
    layout: 'border',
    items: [
        {
            xtype: 'controllleddocumentsaccessgrid',
            region: 'center',
            title: 'Approved Documents',
            margin: 2
        },{
            xtype: 'hiddenfield',
            name: 'section_id'
        }
    ]
});