/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.productregistration.views.dashboards.MedicalDevicesRegDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'medicaldevicesregdashWrapper',
	itemId:'productRegDashWrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'medicaldevicesproductregdash'
        }
    ]
});