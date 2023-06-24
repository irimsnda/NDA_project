/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.productappeal.MedDevicesProductAppealRequest', {
    extend: 'Ext.panel.Panel',
    xtype: 'meddevicesproductappealrequest',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'meddeviceproductappealrequestwizard'
        }
    ]
});