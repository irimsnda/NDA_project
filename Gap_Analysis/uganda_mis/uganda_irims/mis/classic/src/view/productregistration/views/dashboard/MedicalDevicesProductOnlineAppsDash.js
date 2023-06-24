/**
 * Created by Kip on 11/20/2018.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.MedicalDevicesProductOnlineAppsDash', {
    extend: 'Ext.Container',
    xtype: 'medicaldevicesproductonlineappsdash',
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
            value: 4
        },
        {
            xtype: 'onlineproductregistrationgrid',
            region: 'center',
            title: 'Online Application Submission',
            wizard_pnl: 'onlinemedicaldevicesreceivingwizard',
            
            alterationwizard_pnl: 'onlinealtmedicalproductreceivingwizard',
            
            withdrawalwizard_pnl: 'onlinewithdrawalmedicalproductreceivingwizard',
            margin: 2
        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }
    ]
});