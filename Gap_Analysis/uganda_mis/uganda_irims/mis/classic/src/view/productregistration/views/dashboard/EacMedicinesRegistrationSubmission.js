/**
 * Created by Kip on 11/20/2018.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.EacMedicinesRegistrationSubmission', {
    extend: 'Ext.Container',
    xtype: 'eacmedicinesregistrationsubmission',
    
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
            value: 2
        },
        {
            xtype: 'eacmedicinesregistrationgrid',
            region: 'center',
            title: 'Online Application Submission',
            wizard_pnl: 'onlinedrugproductreceivingwizard',
            alterationwizard_pnl: 'onlinealtdrugproductreceivingwizard',
            withdrawalwizard_pnl: 'onlinewithdrawaldrugproductreceivingwizard',
           
        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }
    ]
});