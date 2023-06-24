/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.query_process.DrugsManagerQueryProcess', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugsmanagerqueryprocess',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',    
    items: [{
            xtype: 'managerqueryprocesspnl',
            itemId:'main_processpanel',
            productdetails_panel: 'drugsProductsDetailsPanel',
            productqueriespanel: 'allqueryresponsesgrid'
        }
    ]
});