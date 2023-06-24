/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.systemadministrationprocess.views.dashboards.ApplicationOwnershipAmmendmentsDash', {
    extend: 'Ext.Container',
    xtype: 'applicationownershipammendmentsdash',
    layout: 'fit',
    items: [
        {
            xtype: 'applicationownershipammendmentsgrid',
            region: 'center',
            title: 'Changed Applications Ownership(Change Applicant)',
            margin: 2
        }
    ]
});