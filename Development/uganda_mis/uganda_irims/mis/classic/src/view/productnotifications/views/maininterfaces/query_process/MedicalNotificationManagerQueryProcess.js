/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productnotification.views.maininterfaces.query_process.MedicalNotificationManagerQueryProcess', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicalnotificationmanagerqueryprocess',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',    
    items: [{
            xtype: 'mednotificationmanagerqueryprocesspnl',
            itemId:'main_processpanel',
            productdetails_panel: 'medicaldevicesnotificationdetailspanel',
            productqueriespanel: 'allqueryresponsesgrid'
    }]
    
});