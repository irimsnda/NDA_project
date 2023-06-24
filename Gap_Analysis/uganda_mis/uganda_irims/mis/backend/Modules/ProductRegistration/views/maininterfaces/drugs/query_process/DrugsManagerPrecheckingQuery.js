/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.query_process.DrugsManagerPrecheckingQuery', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugsmanagerprecheckingquery',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',    
    items: [
        {
            xtype: 'managerprecheckingqueryprocesspnl',
            itemId:'main_processpanel',
            productdetails_panel: 'drugsProductsDetailsPanel',
            productqueriespanel: 'allqueriesgrid'
        }
    ]
});