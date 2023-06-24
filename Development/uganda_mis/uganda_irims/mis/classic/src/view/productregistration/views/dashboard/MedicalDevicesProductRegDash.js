/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.productregistration.views.dashboards.MedicalDevicesProductRegDash', {
    extend: 'Ext.Container',
    xtype: 'medicaldevicesproductregdash',

    layout: 'border',
    items: [
        {
            xtype: 'medicaldeviceproductregistrationgrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2,

        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }
    ]
});